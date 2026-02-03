'use client'

import React, { useState, useEffect } from 'react'
import { DollarSign, Calendar, FileText, User, Building, CreditCard, Search, RefreshCw, Eye } from 'lucide-react'
import { formatCurrency } from '@/lib/currency'

interface Payment {
  id: string
  amount: number
  paymentDate: string
  referenceNumber?: string
  description?: string
  paymentMethod: string
  receiptNumber?: string
  createdAt: string
  invoice: {
    id: string
    invoiceNumber: string
    total: number
    status: string
    customer: {
      id: string
      firstName: string
      lastName: string
      email: string
      phone?: string
      isCompany: boolean
      companyName?: string
      vatNumber?: string
    }
  }
}

interface PaymentSummary {
  totalAmount: number
  totalCount: number
  averageAmount: number
}

const PaymentManagement = () => {
  const [payments, setPayments] = useState<Payment[]>([])
  const [summary, setSummary] = useState<PaymentSummary>({ totalAmount: 0, totalCount: 0, averageAmount: 0 })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

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
        setSummary(data.summary || { totalAmount: 0, totalCount: 0, averageAmount: 0 })
      } else {
        console.error('Failed to fetch payments')
      }
    } catch (error) {
      console.error('Error fetching payments:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getCustomerName = (customer: Payment['invoice']['customer']) => {
    if (customer.isCompany && customer.companyName) {
      return customer.companyName
    }
    return `${customer.firstName} ${customer.lastName}`
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'bank_transfer':
        return <Building className="w-4 h-4" />
      case 'credit_card':
        return <CreditCard className="w-4 h-4" />
      case 'cash':
        return <DollarSign className="w-4 h-4" />
      default:
        return <CreditCard className="w-4 h-4" />
    }
  }

  const getPaymentMethodLabel = (method: string) => {
    switch (method.toLowerCase()) {
      case 'bank_transfer':
        return 'Bank Transfer'
      case 'credit_card':
        return 'Credit Card'
      case 'cash':
        return 'Cash'
      default:
        return method
    }
  }

  const filteredPayments = payments.filter(payment => {
    const searchLower = searchTerm.toLowerCase()
    const customerName = getCustomerName(payment.invoice.customer).toLowerCase()
    const invoiceNumber = payment.invoice.invoiceNumber.toLowerCase()
    const referenceNumber = payment.referenceNumber?.toLowerCase() || ''
    
    return customerName.includes(searchLower) || 
           invoiceNumber.includes(searchLower) || 
           referenceNumber.includes(searchLower)
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Payment Management</h2>
            <p className="text-gray-600">Track and manage all payment records</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading payments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Management</h2>
          <p className="text-gray-600">Track and manage all payment records</p>
        </div>
        <button
          onClick={fetchPayments}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Payments</p>
              <p className="text-2xl font-bold text-gray-900">{summary.totalCount}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.totalAmount)}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Payment</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.averageAmount)}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by customer name, invoice number, or reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
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
                    {searchTerm ? 'No payments found matching your search.' : 'No payments recorded yet.'}
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        {payment.referenceNumber && (
                          <div className="font-medium text-gray-900">
                            Ref: {payment.referenceNumber}
                          </div>
                        )}
                        {payment.description && (
                          <div className="text-gray-500">{payment.description}</div>
                        )}
                        {!payment.referenceNumber && !payment.description && (
                          <div className="text-gray-400">No reference</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {payment.invoice.customer.isCompany ? (
                          <Building className="w-4 h-4 text-gray-400 mr-2" />
                        ) : (
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {getCustomerName(payment.invoice.customer)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {payment.invoice.customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {payment.invoice.invoiceNumber}
                      </div>
                      <div className="text-sm text-gray-500">
                        Total: {formatCurrency(payment.invoice.total)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-green-600">
                        {formatCurrency(payment.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getPaymentMethodIcon(payment.paymentMethod)}
                        <span className="text-sm text-gray-900">
                          {getPaymentMethodLabel(payment.paymentMethod)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {formatDate(payment.paymentDate)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          title="View Receipt"
                        >
                          <Eye className="w-4 h-4" />
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
    </div>
  )
}

export default PaymentManagement
