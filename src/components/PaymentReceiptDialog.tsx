'use client'

import React, { useState, useEffect } from 'react'
import { X, Eye, Send, Download, Printer } from 'lucide-react'
import PaymentReceiptTemplate from './PaymentReceiptTemplate'

interface PaymentReceiptDialogProps {
  isOpen: boolean
  onClose: () => void
  payment: any
  onSendEmail?: (emailData: any) => void
}

export default function PaymentReceiptDialog({
  isOpen,
  onClose,
  payment,
  onSendEmail
}: PaymentReceiptDialogProps) {
  const [activeTab, setActiveTab] = useState<'view' | 'email'>('view')
  const [companySettings, setCompanySettings] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [emailData, setEmailData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: ''
  })

  useEffect(() => {
    if (isOpen && payment) {
      fetchCompanySettings()
      setupEmailData()
    }
  }, [isOpen, payment])

  const fetchCompanySettings = async () => {
    try {
      const response = await fetch('/api/settings/company')
      if (response.ok) {
        const data = await response.json()
        setCompanySettings(data)
      }
    } catch (error) {
      console.error('Error fetching company settings:', error)
    }
  }

  const setupEmailData = () => {
    if (!payment?.invoice?.customer) return

    const customer = payment.invoice.customer
    const customerName = customer.isCompany 
      ? customer.companyName 
      : `${customer.firstName} ${customer.lastName}`

    const receiptType = payment.receiptNumber?.includes('M') ? 'manta-house' : 'whale-house'
    const businessName = receiptType === 'manta-house' ? 'Manta House' : 'Whale House'

    setEmailData({
      to: customer.email || '',
      cc: '',
      bcc: '',
      subject: `Payment Receipt ${payment.receiptNumber} - ${businessName}`,
      body: `Dear ${customerName},

Thank you for your payment! Please find attached your payment receipt.

Payment Details:
- Receipt Number: ${payment.receiptNumber}
- Payment Date: ${new Date(payment.paymentDate).toLocaleDateString()}
- Amount Received: R ${payment.amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
- Invoice Number: ${payment.invoice?.invoiceNumber}

We appreciate your business and look forward to serving you again.

Best regards,
${businessName} Team
Bookings@barracabanas.com`
    })
  }

  const handleSendEmail = async () => {
    if (!onSendEmail) return

    setLoading(true)
    try {
      await onSendEmail({
        ...emailData,
        attachments: [{
          filename: `Receipt-${payment.receiptNumber}.pdf`,
          content: 'payment-receipt-pdf-content', // This would be generated PDF content
          contentType: 'application/pdf'
        }]
      })
      onClose()
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Error sending email')
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // This would generate and download a PDF
    alert('PDF download functionality would be implemented here')
  }

  if (!isOpen || !payment) return null

  const receiptType = payment.receiptNumber?.includes('M') ? 'manta-house' : 'whale-house'

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Eye className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Payment Receipt {payment.receiptNumber}
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            {/* Action Buttons */}
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              title="Print Receipt"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('view')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'view'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              View Receipt
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'email'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Send Email
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'view' && (
            <div className="p-6">
              <PaymentReceiptTemplate
                payment={payment}
                companySettings={companySettings}
                receiptType={receiptType}
              />
            </div>
          )}

          {activeTab === 'email' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>
                  <input
                    type="email"
                    value={emailData.to}
                    onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="recipient@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CC
                  </label>
                  <input
                    type="email"
                    value={emailData.cc}
                    onChange={(e) => setEmailData(prev => ({ ...prev, cc: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="cc@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Email subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={emailData.body}
                  onChange={(e) => setEmailData(prev => ({ ...prev, body: e.target.value }))}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Email message"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendEmail}
                  disabled={loading || !emailData.to || !emailData.subject}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Sending...' : 'Send Email'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
