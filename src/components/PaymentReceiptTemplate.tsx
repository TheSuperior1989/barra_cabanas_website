'use client'

import React from 'react'
import { formatCurrency } from '@/lib/currency'

interface PaymentReceiptProps {
  payment: {
    id: string
    receiptNumber: string
    paymentDate: string
    amount: number
    referenceNumber?: string
    description?: string
    paymentMethod: string
    invoice?: {
      invoiceNumber: string
      total: number
      customer?: {
        firstName: string
        lastName: string
        email: string
        phone?: string
        isCompany: boolean
        companyName?: string
        address?: string
        city?: string
        country?: string
        postalCode?: string
      }
    }
  }
  companySettings?: {
    companyName: string
    email: string
    phone: string
    address: string
    city: string
    country: string
    postalCode: string
    website: string
    bankName: string
    accountName: string
    accountNumber: string
    branchCode: string
  }
  receiptType?: 'whale-house' | 'manta-house'
}

export default function PaymentReceiptTemplate({ 
  payment, 
  companySettings,
  receiptType = 'whale-house' 
}: PaymentReceiptProps) {
  const customer = payment.invoice?.customer
  const customerName = customer?.isCompany 
    ? customer.companyName 
    : `${customer?.firstName} ${customer?.lastName}`

  const businessName = receiptType === 'manta-house' ? 'Manta House' : 'Whale House'
  const logoSrc = receiptType === 'manta-house'
    ? '/manta-house-logo.svg'
    : '/whale-house-logo.svg'

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center space-x-4">
          <img 
            src={logoSrc} 
            alt={`${businessName} Logo`}
            className="w-16 h-16 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{businessName}</h1>
            <p className="text-gray-600">Payment Receipt</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-semibold text-gray-900">RECEIPT</h2>
          <p className="text-gray-600">#{payment.receiptNumber}</p>
          <p className="text-sm text-gray-500">
            Date: {new Date(payment.paymentDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Company and Customer Info */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* From */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">From:</h3>
          <div className="text-sm text-gray-600">
            <p className="font-medium">{companySettings?.companyName || 'Barra Cabanas'}</p>
            <p>{companySettings?.address || '123 Beach Road'}</p>
            <p>{companySettings?.city || 'Inhambane'}, {companySettings?.country || 'Mozambique'}</p>
            <p>{companySettings?.postalCode || '1234'}</p>
            <p className="mt-2">
              <span className="font-medium">Email:</span> {companySettings?.email || 'Bookings@barracabanas.com'}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {companySettings?.phone || '+27 66 205 7229'}
            </p>
          </div>
        </div>

        {/* To */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Payment Received From:</h3>
          <div className="text-sm text-gray-600">
            <p className="font-medium">{customerName}</p>
            {customer?.address && <p>{customer.address}</p>}
            {customer?.city && (
              <p>
                {customer.city}
                {customer.country && `, ${customer.country}`}
                {customer.postalCode && ` ${customer.postalCode}`}
              </p>
            )}
            {customer?.email && (
              <p className="mt-2">
                <span className="font-medium">Email:</span> {customer.email}
              </p>
            )}
            {customer?.phone && (
              <p>
                <span className="font-medium">Phone:</span> {customer.phone}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Payment Details</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Invoice Number:</span>
              <span className="ml-2 text-gray-900">{payment.invoice?.invoiceNumber}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Payment Method:</span>
              <span className="ml-2 text-gray-900 capitalize">{payment.paymentMethod.replace('_', ' ')}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Payment Date:</span>
              <span className="ml-2 text-gray-900">{new Date(payment.paymentDate).toLocaleDateString()}</span>
            </div>
            {payment.referenceNumber && (
              <div>
                <span className="font-medium text-gray-700">Reference:</span>
                <span className="ml-2 text-gray-900">{payment.referenceNumber}</span>
              </div>
            )}
          </div>
          {payment.description && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <span className="font-medium text-gray-700">Description:</span>
              <p className="mt-1 text-gray-900">{payment.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Amount */}
      <div className="mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-900">Amount Received:</span>
            <span className="text-2xl font-bold text-blue-600">
              {formatCurrency(payment.amount)}
            </span>
          </div>
        </div>
      </div>

      {/* Banking Details */}
      {companySettings && (
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Banking Details</h3>
          <div className="bg-gray-50 rounded-lg p-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium text-gray-700">Bank:</span>
                <span className="ml-2 text-gray-900">{companySettings.bankName}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Account Name:</span>
                <span className="ml-2 text-gray-900">{companySettings.accountName}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Account Number:</span>
                <span className="ml-2 text-gray-900">{companySettings.accountNumber}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Branch Code:</span>
                <span className="ml-2 text-gray-900">{companySettings.branchCode}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
        <p>Thank you for your payment!</p>
        <p className="mt-2">
          This receipt was generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
        </p>
        {companySettings?.website && (
          <p className="mt-1">
            Visit us at: <span className="text-blue-600">{companySettings.website}</span>
          </p>
        )}
      </div>
    </div>
  )
}
