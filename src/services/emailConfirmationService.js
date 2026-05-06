const FALLBACK_MSG = 'Please contact us directly at bookings@barracabanas.com or call +27 66 205 7229.'

export const sendBookingEmails = async (bookingData, customerData) => {
  try {
    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingData, customerData }),
    })
    const data = await response.json()
    return {
      success: data.success,
      customer: { success: data.success },
      admin: { success: data.success },
    }
  } catch (error) {
    console.error('Error sending booking emails:', error)
    return {
      success: false,
      customer: { success: false, message: `Failed to send confirmation. ${FALLBACK_MSG}` },
      admin: { success: false, message: 'Failed to send admin notification.' },
    }
  }
}
