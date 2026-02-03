'use client'

import React, { useRef, useState } from 'react'
import { Send, Download } from 'lucide-react'
import Image from 'next/image'

interface Payment {
  id: string
  amount: number
  paymentDate: string
  referenceNumber?: string
  description?: string
  paymentMethod: string
  receiptNumber?: string
  invoice?: {
    id: string
    invoiceNumber: string
    total: number
    status: string
    invoiceType?: string
    customer: {
      id: string
      firstName: string
      lastName: string
      email: string
      phone?: string
      isCompany: boolean
      companyName?: string
      vatNumber?: string
      address?: string
      city?: string
      country?: string
      postalCode?: string
    }
  }
}

interface ReceiptTemplateProps {
  payment: Payment
  onSendEmail?: () => void
  onDownloadPDF?: () => void
  emailLoading?: boolean
  downloadLoading?: boolean
}

export default function ReceiptTemplate({ 
  payment, 
  onSendEmail, 
  onDownloadPDF,
  emailLoading = false,
  downloadLoading = false
}: ReceiptTemplateProps) {
  const receiptRef = useRef<HTMLDivElement>(null)

  const formatCurrency = (amount: number) => {
    return `R ${Math.abs(amount).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getCustomerName = () => {
    const customer = payment.invoice?.customer
    if (!customer) return 'Unknown Customer'
    if (customer.isCompany && customer.companyName) {
      return customer.companyName
    }
    return `${customer.firstName} ${customer.lastName}`
  }

  const getPaymentMethodLabel = (method: string) => {
    switch (method?.toLowerCase()) {
      case 'bank_transfer':
        return 'Bank Transfer'
      case 'credit_card':
        return 'Credit Card'
      case 'cash':
        return 'Cash'
      default:
        return method || 'Unknown'
    }
  }

  // Determine receipt type from invoice or payment data
  const receiptType = payment.invoice?.invoiceNumber?.includes('M') ? 'manta-house' : 'whale-house'
  
  const getBusinessInfo = () => {
    if (receiptType === 'whale-house') {
      return {
        name: 'Turbolink Property Investment Pty Ltd',
        tradingAs: 'Whale House @ Barra Cabanas',
        address: 'T/A Whale House @ Barra Cabanas',
        location: 'XP Square, Shop No 9',
        city: 'Ngel, 1400',
        province: 'Gauteng',
        country: 'South Africa',
        regNo: '2016/192275/07',
        email: 'Bookings@barracabanas.com',
        logo: '/whale-house-logo.png'
      }
    } else {
      return {
        name: 'Turbolink Property Investment Pty Ltd',
        tradingAs: 'Manta House @ Barra Cabanas',
        address: 'T/A Manta House @ Barra Cabanas',
        location: 'XP Square, Shop No 9',
        city: 'Ngel, 1400',
        province: 'Gauteng',
        country: 'South Africa',
        regNo: '2016/192275/07',
        email: 'Bookings@barracabanas.com',
        logo: '/manta-house-logo.png'
      }
    }
  }

  const businessInfo = getBusinessInfo()

  return (
    <div className="bg-white">
      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 mb-6 print:hidden">
        {onSendEmail && (
          <button
            onClick={onSendEmail}
            disabled={emailLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {emailLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{emailLoading ? 'Sending...' : 'Send Receipt'}</span>
          </button>
        )}
        {onDownloadPDF && (
          <button
            onClick={onDownloadPDF}
            disabled={downloadLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {downloadLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{downloadLoading ? 'Generating...' : 'Download PDF'}</span>
          </button>
        )}
      </div>

      {/* Receipt Content */}
      <div ref={receiptRef} className="max-w-4xl mx-auto bg-white border border-gray-300 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-start p-8 border-b border-gray-200">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 relative">
              <Image
                src={businessInfo.logo}
                alt={`${receiptType === 'whale-house' ? 'Whale House' : 'Manta House'} Logo`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Title and Company Info */}
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">PAYMENT RECEIPT</h1>
            <p className="text-lg font-semibold text-gray-700 mb-4">Receipt #{payment.receiptNumber}</p>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-semibold">{businessInfo.name}</p>
              <p>{businessInfo.tradingAs}</p>
              <p>{businessInfo.address}</p>
              <p>{businessInfo.location}</p>
              <p>{businessInfo.city}</p>
              <p>{businessInfo.province}</p>
              <p>Reg No - {businessInfo.regNo}</p>
            </div>
          </div>
        </div>

        {/* Customer and Receipt Details */}
        <div className="flex justify-between p-8 border-b border-gray-200">
          {/* Customer Info */}
          <div className="w-1/2">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Received From:</h3>
            <div className="text-gray-700 space-y-1">
              <p className="font-semibold text-lg">{getCustomerName()}</p>
              <p>{payment.invoice?.customer?.email}</p>
              {payment.invoice?.customer?.phone && (
                <p>{payment.invoice?.customer?.phone}</p>
              )}
              {payment.invoice?.customer?.address && (
                <p>{payment.invoice?.customer?.address}</p>
              )}
              {payment.invoice?.customer?.city && (
                <p>{payment.invoice?.customer?.city}, {payment.invoice?.customer?.postalCode}</p>
              )}
              {payment.invoice?.customer?.country && (
                <p>{payment.invoice?.customer?.country}</p>
              )}
            </div>
          </div>

          {/* Receipt Details */}
          <div className="w-1/2 text-right">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Receipt Details:</h3>
            <div className="text-gray-700 space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{formatDate(payment.paymentDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Invoice:</span>
                <span>{payment.invoice?.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Method:</span>
                <span>{getPaymentMethodLabel(payment.paymentMethod)}</span>
              </div>
              {payment.referenceNumber && (
                <div className="flex justify-between">
                  <span className="font-medium">Reference:</span>
                  <span>{payment.referenceNumber}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Payment Details Table */}
        <div className="p-8">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-300">
                <th className="text-left p-4 font-semibold text-gray-900 border-r border-gray-300">Description</th>
                <th className="text-right p-4 font-semibold text-gray-900">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="p-4 border-r border-gray-300">
                  Payment for Invoice {payment.invoice?.invoiceNumber}
                  {payment.description && ` - ${payment.description}`}
                </td>
                <td className="p-4 text-right font-semibold">{formatCurrency(payment.amount)}</td>
              </tr>
            </tbody>
          </table>

          {/* Total Amount */}
          <div className="flex justify-end mt-6">
            <div className="w-64">
              <div className="flex justify-between items-center p-4 bg-gray-50 border-2 border-gray-900 font-bold text-lg">
                <span>Total Received:</span>
                <span>{formatCurrency(payment.amount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Banking Details */}
        <div className="p-8 border-t border-gray-200">
          <div className="border border-gray-300 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Banking Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Account:</span> Turbolink Property Pty Ltd
              </div>
              <div>
                <span className="font-semibold">Bank:</span> First National Bank (FNB)
              </div>
              <div>
                <span className="font-semibold">A/C No:</span> 63007987019
              </div>
              <div>
                <span className="font-semibold">Branch:</span> 251042
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Email proof of payment to - {businessInfo.email}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 text-center border-t border-gray-200">
          <p className="text-gray-600">Thank you for your payment!</p>
        </div>
      </div>
    </div>
  )
}
