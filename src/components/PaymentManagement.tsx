'use client'

import React, { useState, useEffect } from 'react'
import { Search, Filter, Download, Eye, DollarSign, Calendar, CreditCard, FileText, Send, Plus } from 'lucide-react'
import { formatCurrency } from '@/lib/currency'
import PaymentReceiptDialog from './PaymentReceiptDialog'

interface Payment {
  id: string
  invoiceId: string
  customerId: string
  paymentDate: string
  amount: number
  referenceNumber?: string
  description?: string
  paymentMethod: string
  createdAt: string
  invoice?: {
    invoiceNumber: string
    total: number
    customer?: {
      firstName: string
      lastName: string
      email: string
      isCompany: boolean
      companyName?: string
    }
  }
}

interface PaymentFilters {
  search: string
  paymentMethod: string
  dateFrom: string
  dateTo: string
  minAmount: string
  maxAmount: string
}

export default function PaymentManagement() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<PaymentFilters>({
    search: '',
    paymentMethod: '',
    dateFrom: '',
    dateTo: '',
    minAmount: '',
    maxAmount: ''
  })
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [showReceiptDialog, setShowReceiptDialog] = useState(false)
  const [showPaymentReceiptDialog, setShowPaymentReceiptDialog] = useState(false)

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/payments')
      if (response.ok) {
        const data = await response.json()
        setPayments(data.payments || [])
      } else {
        setError('Failed to fetch payments')
      }
    } catch (err) {
      setError('Error fetching payments')
      console.error('Error fetching payments:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = !filters.search || 
      payment.invoice?.invoiceNumber?.toLowerCase().includes(filters.search.toLowerCase()) ||
      payment.invoice?.customer?.firstName?.toLowerCase().includes(filters.search.toLowerCase()) ||
      payment.invoice?.customer?.lastName?.toLowerCase().includes(filters.search.toLowerCase()) ||
      payment.invoice?.customer?.companyName?.toLowerCase().includes(filters.search.toLowerCase()) ||
      payment.referenceNumber?.toLowerCase().includes(filters.search.toLowerCase())

    const matchesPaymentMethod = !filters.paymentMethod || payment.paymentMethod === filters.paymentMethod

    const matchesDateFrom = !filters.dateFrom || new Date(payment.paymentDate) >= new Date(filters.dateFrom)
    const matchesDateTo = !filters.dateTo || new Date(payment.paymentDate) <= new Date(filters.dateTo)

    const matchesMinAmount = !filters.minAmount || payment.amount >= parseFloat(filters.minAmount)
    const matchesMaxAmount = !filters.maxAmount || payment.amount <= parseFloat(filters.maxAmount)

    return matchesSearch && matchesPaymentMethod && matchesDateFrom && matchesDateTo && matchesMinAmount && matchesMaxAmount
  })

  const totalPayments = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0)

  const handleViewReceipt = (payment: Payment) => {
    setSelectedPayment(payment)
    setShowPaymentReceiptDialog(true)
  }

  const handleSendReceipt = async (emailData: any) => {
    try {
      const response = await fetch('/api/payments/send-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId: selectedPayment?.id,
          ...emailData
        })
      })

      if (response.ok) {
        alert('Receipt email sent successfully!')
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to send receipt')
      }
    } catch (error) {
      console.error('Error sending receipt:', error)
      alert('Error sending receipt')
    }
  }

  const handleDownloadReceipt = async (payment: Payment) => {
    try {
      // Use the same PDF API endpoint approach as invoices and quotes
      const response = await fetch(`/api/payments/${payment.id}/pdf`)
      if (response.ok) {
        // Create blob and download
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)

        // Create download link
        const link = document.createElement('a')
        link.href = url
        link.download = `Receipt-${payment.receiptNumber || payment.id}.pdf`
        document.body.appendChild(link)
        link.click()

        // Cleanup
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } else {
        throw new Error('Failed to generate receipt PDF')
      }
    } catch (error) {
      console.error('Error downloading receipt:', error)
      alert('Failed to download receipt PDF. Please try again.')
    }
  }

  const getCustomerName = (payment: Payment) => {
    const customer = payment.invoice?.customer
    if (!customer) return 'Unknown Customer'
    
    if (customer.isCompany && customer.companyName) {
      return customer.companyName
    }
    
    return `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'Unknown Customer'
  }

  const getPaymentMethodDisplay = (method: string) => {
    const methods: Record<string, string> = {
      'bank_transfer': 'Bank Transfer',
      'credit_card': 'Credit Card',
      'cash': 'Cash',
      'check': 'Check',
      'other': 'Other'
    }
    return methods[method] || method
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">{error}</p>
        <button 
          onClick={fetchPayments}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <DollarSign className="w-8 h-8 text-green-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
            <p className="text-gray-600">Track and manage all payment records</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm text-gray-500">Total Payments</div>
            <div className="text-lg font-semibold text-green-600">{formatCurrency(totalPayments)}</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by invoice number, customer name, or reference..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 border rounded-md ${
              showFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700'
            } hover:bg-blue-50`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select
                value={filters.paymentMethod}
                onChange={(e) => setFilters(prev => ({ ...prev, paymentMethod: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Methods</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="credit_card">Credit Card</option>
                <option value="cash">Cash</option>
                <option value="check">Check</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={filters.minAmount}
                onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={filters.maxAmount}
                onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setFilters({
                  search: '',
                  paymentMethod: '',
                  dateFrom: '',
                  dateTo: '',
                  minAmount: '',
                  maxAmount: ''
                })}
                className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg font-medium">No payments found</p>
                    <p className="text-sm">Payments will appear here once they are recorded</p>
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-green-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            Payment #{payment.id.slice(-8)}
                          </div>
                          {payment.referenceNumber && (
                            <div className="text-sm text-gray-500">
                              Ref: {payment.referenceNumber}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {payment.invoice?.invoiceNumber || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">
                        Total: {formatCurrency(payment.invoice?.total || 0)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {getCustomerName(payment)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {payment.invoice?.customer?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">
                        {formatCurrency(payment.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <CreditCard className="w-3 h-3 mr-1" />
                        {getPaymentMethodDisplay(payment.paymentMethod)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewReceipt(payment)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="View Receipt"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadReceipt(payment)}
                          className="text-purple-600 hover:text-purple-900 p-1 rounded"
                          title="Download Receipt PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleSendReceipt(payment)}
                          className="text-green-600 hover:text-green-900 p-1 rounded"
                          title="Send Receipt"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Receipt Dialog - TODO: Implement */}
      {showReceiptDialog && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Payment Receipt</h2>
              <button 
                onClick={() => setShowReceiptDialog(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                ×
              </button>
            </div>
            <div className="p-6">
              <p className="text-center text-gray-600">
                Payment receipt template will be implemented here
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900">Payment Details:</h3>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <div>Payment ID: {selectedPayment.id}</div>
                  <div>Amount: {formatCurrency(selectedPayment.amount)}</div>
                  <div>Date: {new Date(selectedPayment.paymentDate).toLocaleDateString()}</div>
                  <div>Method: {getPaymentMethodDisplay(selectedPayment.paymentMethod)}</div>
                  {selectedPayment.referenceNumber && (
                    <div>Reference: {selectedPayment.referenceNumber}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 p-6 border-t">
              <button
                onClick={() => setShowReceiptDialog(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => handleSendReceipt(selectedPayment)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Send Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Receipt Dialog */}
      <PaymentReceiptDialog
        isOpen={showPaymentReceiptDialog}
        onClose={() => setShowPaymentReceiptDialog(false)}
        payment={selectedPayment}
        onSendEmail={handleSendReceipt}
      />
    </div>
  )
}
