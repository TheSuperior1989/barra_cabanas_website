// Payment service for handling invoice payments
import { requireSupabaseAdmin } from '@/lib/supabase'
import { Database } from '@/types/supabase'

type Payment = Database['public']['Tables']['payments']['Row']
type PaymentInsert = Database['public']['Tables']['payments']['Insert']
type CustomerCredit = Database['public']['Tables']['customer_credits']['Row']
type Invoice = Database['public']['Tables']['invoices']['Row']

export interface PaymentResult {
  payment: Payment
  invoice: Invoice
  creditCreated?: CustomerCredit
  overpaymentAmount?: number
}

export interface PaymentSummary {
  totalPaid: number
  remainingBalance: number
  status: 'DRAFT' | 'SENT' | 'PAID' | 'PARTIALLY_PAID' | 'OVERDUE' | 'CANCELLED'
  payments: Payment[]
}

export class PaymentService {
  private supabase = requireSupabaseAdmin()

  /**
   * Record a new payment for an invoice
   */
  async recordPayment(paymentData: {
    invoiceId: string
    customerId: string
    paymentDate: string
    amount: number
    referenceNumber?: string
    description?: string
    paymentMethod?: string
  }): Promise<PaymentResult> {
    const { invoiceId, customerId, paymentDate, amount, referenceNumber, description, paymentMethod = 'bank_transfer' } = paymentData

    // Validate payment amount
    if (amount <= 0) {
      throw new Error('Payment amount must be greater than 0')
    }

    // Get current invoice details
    const { data: invoice, error: invoiceError } = await this.supabase
      .from('invoices')
      .select('*')
      .eq('id', invoiceId)
      .single()

    if (invoiceError || !invoice) {
      throw new Error('Invoice not found')
    }

    // Validate customer matches
    if (invoice.customerId !== customerId) {
      throw new Error('Customer ID does not match invoice')
    }

    // Calculate current payment totals
    const currentTotalPaid = invoice.totalPaid || 0
    const newTotalPaid = currentTotalPaid + amount
    const remainingBalance = invoice.total - newTotalPaid

    // Insert the payment record
    const { data: payment, error: paymentError } = await this.supabase
      .from('payments')
      .insert({
        invoiceId,
        customerId,
        paymentDate,
        amount,
        referenceNumber,
        description,
        paymentMethod
      })
      .select()
      .single()

    if (paymentError) {
      throw new Error(`Failed to record payment: ${paymentError.message}`)
    }

    // The database triggers will automatically update the invoice totals and status
    // But we need to fetch the updated invoice to return current state
    const { data: updatedInvoice, error: updateError } = await this.supabase
      .from('invoices')
      .select('*')
      .eq('id', invoiceId)
      .single()

    if (updateError) {
      throw new Error('Failed to retrieve updated invoice')
    }

    const result: PaymentResult = {
      payment,
      invoice: updatedInvoice
    }

    // Handle overpayment - create customer credit
    if (remainingBalance < 0) {
      const overpaymentAmount = Math.abs(remainingBalance)
      
      const { data: credit, error: creditError } = await this.supabase
        .from('customer_credits')
        .insert({
          customerId,
          creditAmount: overpaymentAmount,
          description: `Overpayment from invoice ${invoice.invoiceNumber}`,
          sourceInvoiceId: invoiceId
        })
        .select()
        .single()

      if (creditError) {
        console.error('Failed to create customer credit:', creditError)
        // Don't throw error here as the payment was successful
      } else {
        result.creditCreated = credit
        result.overpaymentAmount = overpaymentAmount
      }
    }

    return result
  }

  /**
   * Get payment summary for an invoice
   */
  async getPaymentSummary(invoiceId: string): Promise<PaymentSummary> {
    // Get invoice details
    const { data: invoice, error: invoiceError } = await this.supabase
      .from('invoices')
      .select('*')
      .eq('id', invoiceId)
      .single()

    if (invoiceError || !invoice) {
      throw new Error('Invoice not found')
    }

    // Get all payments for this invoice
    const { data: payments, error: paymentsError } = await this.supabase
      .from('payments')
      .select('*')
      .eq('invoiceId', invoiceId)
      .order('paymentDate', { ascending: false })

    if (paymentsError) {
      throw new Error(`Failed to retrieve payments: ${paymentsError.message}`)
    }

    const totalPaid = invoice.totalPaid || 0
    const remainingBalance = invoice.total - totalPaid

    return {
      totalPaid,
      remainingBalance,
      status: invoice.status as any,
      payments: payments || []
    }
  }

  /**
   * Get all payments for a customer
   */
  async getCustomerPayments(customerId: string): Promise<Payment[]> {
    const { data: payments, error } = await this.supabase
      .from('payments')
      .select(`
        *,
        invoice:invoices(invoiceNumber, total)
      `)
      .eq('customerId', customerId)
      .order('paymentDate', { ascending: false })

    if (error) {
      throw new Error(`Failed to retrieve customer payments: ${error.message}`)
    }

    return payments || []
  }

  /**
   * Get customer credit balance
   */
  async getCustomerCreditBalance(customerId: string): Promise<number> {
    const { data: credits, error } = await this.supabase
      .from('customer_credits')
      .select('remainingAmount')
      .eq('customerId', customerId)
      .eq('isActive', true)

    if (error) {
      throw new Error(`Failed to retrieve customer credits: ${error.message}`)
    }

    return credits?.reduce((total, credit) => total + credit.remainingAmount, 0) || 0
  }

  /**
   * Apply customer credit to an invoice
   */
  async applyCreditToInvoice(customerId: string, invoiceId: string, creditAmount: number): Promise<PaymentResult> {
    // Validate credit amount available
    const availableCredit = await this.getCustomerCreditBalance(customerId)
    
    if (creditAmount > availableCredit) {
      throw new Error(`Insufficient credit balance. Available: ${availableCredit}`)
    }

    // Record the credit application as a payment
    const result = await this.recordPayment({
      invoiceId,
      customerId,
      paymentDate: new Date().toISOString(),
      amount: creditAmount,
      description: 'Applied customer credit balance',
      paymentMethod: 'credit_balance'
    })

    // Update customer credits to mark the used amount
    // This is a simplified approach - in a more complex system, you'd track which specific credits were used
    const { error: creditUpdateError } = await this.supabase
      .rpc('use_customer_credit', {
        customer_id: customerId,
        amount_to_use: creditAmount
      })

    if (creditUpdateError) {
      console.error('Failed to update customer credit usage:', creditUpdateError)
      // The payment was recorded, so we don't throw an error here
    }

    return result
  }

  /**
   * Delete a payment (admin function)
   */
  async deletePayment(paymentId: string): Promise<void> {
    const { error } = await this.supabase
      .from('payments')
      .delete()
      .eq('id', paymentId)

    if (error) {
      throw new Error(`Failed to delete payment: ${error.message}`)
    }

    // The database triggers will automatically update the invoice totals
  }

  /**
   * Update a payment record
   */
  async updatePayment(paymentId: string, updates: Partial<PaymentInsert>): Promise<Payment> {
    const { data: payment, error } = await this.supabase
      .from('payments')
      .update(updates)
      .eq('id', paymentId)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update payment: ${error.message}`)
    }

    return payment
  }
}

// Explicit export for better TypeScript resolution
export default PaymentService
