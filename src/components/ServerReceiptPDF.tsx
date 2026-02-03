import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

// Server-compatible version of ReceiptPDF (no 'use client' directive)

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
      email: 'Bookings@barracabanas.com'
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
      email: 'Bookings@barracabanas.com'
    }
  }
}

// PDF Styles - Compact for server generation
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  logoSection: {
    width: '40%',
  },
  logoText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  titleSection: {
    width: '60%',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  receiptNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  companyInfo: {
    fontSize: 10,
    lineHeight: 1.3,
    textAlign: 'right',
  },
  detailsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  customerSection: {
    width: '50%',
  },
  receiptDetailsSection: {
    width: '45%',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  customerInfo: {
    fontSize: 10,
    lineHeight: 1.3,
  },
  customerName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  receiptDetails: {
    fontSize: 10,
    lineHeight: 1.4,
  },
  paymentTable: {
    width: '100%',
    marginBottom: 15,
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
    width: '70%',
    padding: 6,
    borderRight: '1px solid #000',
  },
  tableColAmount: {
    width: '30%',
    padding: 6,
    textAlign: 'right',
  },
  tableCellHeader: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 8,
  },
  amountSection: {
    alignSelf: 'flex-end',
    width: '40%',
    marginBottom: 15,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    borderBottom: '2px solid #000',
    marginBottom: 3,
  },
  amountLabel: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  amountValue: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  bankingSection: {
    border: '1px solid #000',
    padding: 8,
    marginTop: 10,
  },
  bankingTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  bankingRow: {
    fontSize: 7,
    marginBottom: 2,
    flexDirection: 'row',
  },
  bankingLabel: {
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 8,
    color: '#666',
  }
})

// Create Document Component
const ServerReceiptPDF = ({ receiptData }: { receiptData: ReceiptData }) => {
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
        {/* Header */}
        <View style={styles.header}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Text style={styles.logoText}>
              {receiptType === 'whale-house' ? 'WHALE HOUSE' : 'MANTA HOUSE'}
            </Text>
          </View>

          {/* Title and Company Info */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>PAYMENT RECEIPT</Text>
            <Text style={styles.receiptNumber}>Receipt #{payment.receiptNumber}</Text>
            <View style={styles.companyInfo}>
              <Text>{businessInfo.name}</Text>
              <Text>{businessInfo.tradingAs}</Text>
              <Text>{businessInfo.address}</Text>
              <Text>{businessInfo.location}</Text>
              <Text>{businessInfo.city}</Text>
              <Text>{businessInfo.province}</Text>
              <Text>Reg No - {businessInfo.regNo}</Text>
            </View>
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
          </View>

          {/* Receipt Details */}
          <View style={styles.receiptDetailsSection}>
            <Text style={styles.sectionTitle}>Receipt Details:</Text>
            <View style={styles.receiptDetails}>
              <Text>Date: {formatDate(payment.paymentDate)}</Text>
              <Text>Invoice: {payment.invoice?.invoiceNumber}</Text>
              <Text>Method: {getPaymentMethodLabel(payment.paymentMethod)}</Text>
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
                Payment for Invoice {payment.invoice?.invoiceNumber}
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
            <Text style={styles.amountLabel}>Total Received:</Text>
            <Text style={styles.amountValue}>{formatCurrency(payment.amount)}</Text>
          </View>
        </View>

        {/* Banking Details */}
        <View style={styles.bankingSection}>
          <Text style={styles.bankingTitle}>Banking Details</Text>
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
          <Text style={[styles.bankingRow, { marginTop: 4 }]}>
            Email proof of payment to - {businessInfo.email}
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

export default ServerReceiptPDF
