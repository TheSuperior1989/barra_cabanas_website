'use client'

import React from 'react'

export interface PaymentData {
  paymentDate: string
  amount: number
  referenceNumber?: string
  description?: string
  paymentMethod: string
}

interface PaymentRecordDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (paymentData: PaymentData) => Promise<void>
  invoice: {
    id: string
    invoiceNumber: string
    total: number
    totalPaid?: number
    remainingBalance?: number
    customer?: {
      firstName: string
      lastName: string
      email: string
    }
  }
}

const PaymentRecordDialog: React.FC<PaymentRecordDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  invoice
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <h2 className="text-lg font-semibold">Record Payment</h2>
          <p>Payment dialog for invoice: {invoice.invoiceNumber}</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentRecordDialog
