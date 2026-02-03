'use client'

import React from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Download } from 'lucide-react'
import ReceiptPDF from './ReactPDFReceipt'

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

interface ReactPDFReceiptDownloadProps {
  payment: Payment
  className?: string
  children?: React.ReactNode
}

export const ReactPDFReceiptDownload: React.FC<ReactPDFReceiptDownloadProps> = ({ 
  payment, 
  className = "flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
  children 
}) => {
  const receiptData = { payment }
  const filename = `Receipt-${payment.receiptNumber || payment.id}.pdf`

  return (
    <PDFDownloadLink
      document={<ReceiptPDF receiptData={receiptData} />}
      fileName={filename}
      className={className}
    >
      {({ blob, url, loading, error }) => {
        if (loading) {
          return (
            <span className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Generating PDF...</span>
            </span>
          )
        }

        if (error) {
          return (
            <span className="flex items-center space-x-2 text-red-500">
              <span>Error generating PDF</span>
            </span>
          )
        }

        return (
          children || (
            <span className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download Receipt</span>
            </span>
          )
        )
      }}
    </PDFDownloadLink>
  )
}

export default ReactPDFReceiptDownload
