/**
 * Currency and decimal arithmetic utilities to handle floating-point precision issues
 */

/**
 * Rounds a number to 2 decimal places using proper rounding
 * Fixes floating-point precision issues like 1499.9999999 -> 1500.00
 */
export function roundToTwoDecimals(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

/**
 * Adds two numbers with proper decimal precision
 */
export function addDecimals(a: number, b: number): number {
  return roundToTwoDecimals(a + b)
}

/**
 * Subtracts two numbers with proper decimal precision
 */
export function subtractDecimals(a: number, b: number): number {
  return roundToTwoDecimals(a - b)
}

/**
 * Multiplies two numbers with proper decimal precision
 */
export function multiplyDecimals(a: number, b: number): number {
  return roundToTwoDecimals(a * b)
}

/**
 * Divides two numbers with proper decimal precision
 */
export function divideDecimals(a: number, b: number): number {
  if (b === 0) return 0
  return roundToTwoDecimals(a / b)
}

/**
 * Calculates VAT amount (15%) with proper precision
 */
export function calculateVAT(amount: number, rate: number = 0.15): number {
  return multiplyDecimals(amount, rate)
}

/**
 * Calculates line item total (quantity × unit price) with proper precision
 */
export function calculateLineItemTotal(quantity: number, unitPrice: number): number {
  return multiplyDecimals(quantity, unitPrice)
}

/**
 * Calculates invoice subtotal from line items with proper precision
 */
export function calculateSubtotal(lineItems: Array<{ quantity: number; unitPrice: number }>): number {
  return lineItems.reduce((sum, item) => {
    const itemTotal = calculateLineItemTotal(item.quantity, item.unitPrice)
    return addDecimals(sum, itemTotal)
  }, 0)
}

/**
 * Calculates invoice totals with proper precision
 */
export function calculateInvoiceTotals(
  lineItems: Array<{ quantity: number; unitPrice: number }>,
  vatEnabled: boolean = true,
  vatRate: number = 0.15
): {
  subtotal: number
  vatAmount: number
  total: number
} {
  const subtotal = calculateSubtotal(lineItems)
  const vatAmount = vatEnabled ? calculateVAT(subtotal, vatRate) : 0
  const total = addDecimals(subtotal, vatAmount)

  return {
    subtotal,
    vatAmount,
    total
  }
}

/**
 * Formats currency for display (South African Rand)
 */
export function formatCurrency(amount: number): string {
  const roundedAmount = roundToTwoDecimals(Math.abs(amount))
  return `R ${roundedAmount.toLocaleString('en-ZA', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`
}

/**
 * Parses a string to a number with proper decimal handling
 * Useful for form inputs
 */
export function parseDecimal(value: string | number): number {
  if (typeof value === 'number') return roundToTwoDecimals(value)
  const parsed = parseFloat(String(value)) || 0
  return roundToTwoDecimals(parsed)
}

/**
 * Validates that a number is a valid currency amount
 */
export function isValidCurrencyAmount(amount: number): boolean {
  return !isNaN(amount) && isFinite(amount) && amount >= 0
}

/**
 * Converts cents to currency amount (if needed for database storage)
 */
export function centsToAmount(cents: number): number {
  return divideDecimals(cents, 100)
}

/**
 * Converts currency amount to cents (if needed for database storage)
 */
export function amountToCents(amount: number): number {
  return Math.round(multiplyDecimals(amount, 100))
}
