'use client'

import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'

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

interface ReceiptData {
  payment: Payment
}

// Business info helper function
const getBusinessInfo = (receiptType: string) => {
  const isWhaleHouse = receiptType === 'whale-house' || receiptType?.includes('W')
  
  if (isWhaleHouse) {
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
      logoPath: '/images/whale-house-logo.png'
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
      logoPath: '/images/manta-house-logo.png'
    }
  }
}

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  // Page border
  pageBorder: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    bottom: 15,
    border: '2px solid #000000',
  },
  // Header section
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
    marginTop: 20,
  },
  logoSection: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Company info - RIGHT ALIGNED
  companyInfo: {
    textAlign: 'right',
    fontSize: 10,
  },
  receiptTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  companyName: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  companyDetails: {
    fontSize: 10,
    marginBottom: 1,
  },
  // Customer and Receipt Details section
  detailsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  customerSection: {
    width: '50%',
  },
  receiptDetailsSection: {
    width: '40%',
    textAlign: 'left',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  customerInfo: {
    fontSize: 10,
    lineHeight: 1.4,
  },
  customerName: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  receiptDetails: {
    fontSize: 10,
    lineHeight: 1.6,
  },
  // Payment details table
  paymentTable: {
    width: '100%',
    marginBottom: 30,
    border: '1px solid #000',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottom: '1px solid #000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #000',
  },
  tableColDescription: {
    width: '60%',
    padding: 8,
    borderRight: '1px solid #000',
  },
  tableColAmount: {
    width: '40%',
    padding: 8,
    textAlign: 'right',
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 10,
  },
  // Amount section
  amountSection: {
    alignSelf: 'flex-end',
    width: '45%',
    marginBottom: 30,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottom: '2px solid #000',
    marginBottom: 4,
  },
  amountLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  amountValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Banking details
  bankingSection: {
    border: '2px solid #000',
    padding: 15,
    marginTop: 20,
  },
  bankingTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bankingRow: {
    fontSize: 10,
    marginBottom: 3,
    flexDirection: 'row',
  },
  bankingLabel: {
    fontWeight: 'bold',
  },
  // Footer
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#666',
  }
})

// Create Document Component
const ReceiptPDF = ({ receiptData }: { receiptData: ReceiptData }) => {
  const { payment } = receiptData

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
  const businessInfo = getBusinessInfo(receiptType)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Page Border */}
        <View style={styles.pageBorder} />

        {/* Header */}
        <View style={styles.header}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Text style={styles.logoText}>
              {receiptType === 'whale-house' ? 'WHALE HOUSE' : 'MANTA HOUSE'}
            </Text>
          </View>

          {/* Company Info */}
          <View style={styles.companyInfo}>
            <Text style={styles.receiptTitle}>PAYMENT RECEIPT</Text>
            <Text style={styles.companyName}>{businessInfo.name}</Text>
            <Text style={styles.companyDetails}>{businessInfo.tradingAs}</Text>
            <Text style={styles.companyDetails}>{businessInfo.address}</Text>
            <Text style={styles.companyDetails}>{businessInfo.location}</Text>
            <Text style={styles.companyDetails}>{businessInfo.city}</Text>
            <Text style={styles.companyDetails}>{businessInfo.province}</Text>
            <Text style={styles.companyDetails}>{businessInfo.country}</Text>
            <Text style={styles.companyDetails}>Reg No - {businessInfo.regNo}</Text>
          </View>
        </View>

        {/* Customer and Receipt Details */}
        <View style={styles.detailsSection}>
          {/* Customer Info */}
          <View style={styles.customerSection}>
            <Text style={styles.sectionTitle}>Received From:</Text>
            <Text style={styles.customerName}>{getCustomerName()}</Text>
            <Text style={styles.customerInfo}>{payment.invoice?.customer?.email}</Text>
            {payment.invoice?.customer?.phone && (
              <Text style={styles.customerInfo}>{payment.invoice?.customer?.phone}</Text>
            )}
            {payment.invoice?.customer?.address && (
              <Text style={styles.customerInfo}>{payment.invoice?.customer?.address}</Text>
            )}
            {payment.invoice?.customer?.city && (
              <Text style={styles.customerInfo}>
                {payment.invoice?.customer?.city}
                {payment.invoice?.customer?.postalCode && `, ${payment.invoice?.customer?.postalCode}`}
              </Text>
            )}
          </View>

          {/* Receipt Details */}
          <View style={styles.receiptDetailsSection}>
            <View style={styles.receiptDetails}>
              <Text>Receipt #: {payment.receiptNumber}</Text>
              <Text>Receipt Date: {formatDate(payment.paymentDate)}</Text>
              <Text>Invoice #: {payment.invoice?.invoiceNumber}</Text>
              <Text>Payment Method: {getPaymentMethodLabel(payment.paymentMethod)}</Text>
              {payment.referenceNumber && (
                <Text>Reference: {payment.referenceNumber}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Payment Details Table */}
        <View style={styles.paymentTable}>
          {/* Header */}
          <View style={styles.tableHeaderRow}>
            <View style={styles.tableColDescription}>
              <Text style={styles.tableCellHeader}>Description</Text>
            </View>
            <View style={styles.tableColAmount}>
              <Text style={styles.tableCellHeader}>Amount</Text>
            </View>
          </View>
          
          {/* Payment Row */}
          <View style={styles.tableRow}>
            <View style={styles.tableColDescription}>
              <Text style={styles.tableCell}>
                Payment received for Invoice {payment.invoice?.invoiceNumber}
                {payment.description && ` - ${payment.description}`}
              </Text>
            </View>
            <View style={styles.tableColAmount}>
              <Text style={styles.tableCell}>{formatCurrency(payment.amount)}</Text>
            </View>
          </View>
        </View>

        {/* Total Amount */}
        <View style={styles.amountSection}>
          <View style={styles.amountRow}>
            <Text style={styles.amountLabel}>Total Amount Received:</Text>
            <Text style={styles.amountValue}>{formatCurrency(payment.amount)}</Text>
          </View>
        </View>

        {/* Banking Details */}
        <View style={styles.bankingSection}>
          <Text style={styles.bankingTitle}>Banking Details</Text>
          <Text style={styles.bankingRow}>Please make deposit into the following bank account</Text>
          <View style={styles.bankingRow}>
            <Text style={styles.bankingLabel}>Account - </Text>
            <Text>Turbolink Property Pty Ltd</Text>
          </View>
          <View style={styles.bankingRow}>
            <Text style={styles.bankingLabel}>Bank - </Text>
            <Text>First National Bank (FNB)</Text>
          </View>
          <View style={styles.bankingRow}>
            <Text style={styles.bankingLabel}>A/C No - </Text>
            <Text>63007987019</Text>
          </View>
          <View style={styles.bankingRow}>
            <Text style={styles.bankingLabel}>Branch - </Text>
            <Text>251042</Text>
          </View>
          <Text style={[styles.bankingRow, { marginTop: 8 }]}>
            Please email proof of payment to - {businessInfo.email}
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Thank you for your payment!</Text>
        </View>
      </Page>
    </Document>
  )
}

export default ReceiptPDF
