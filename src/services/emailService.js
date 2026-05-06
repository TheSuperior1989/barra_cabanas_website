const FALLBACK_MSG = 'Please contact us directly at bookings@barracabanas.com or call +27 66 205 7229.'

export const sendContactForm = async (formData) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error sending contact form:', error)
    return { success: false, message: `Failed to send message. ${FALLBACK_MSG}` }
  }
}

export const sendQuoteRequest = async (selectedServices, contactInfo) => {
  try {
    const total = selectedServices.reduce((sum, s) => sum + (s.price * s.quantity), 0)
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...contactInfo,
        type: 'quote',
        services: selectedServices,
        totalAmount: total,
      }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error sending quote request:', error)
    return { success: false, message: `Failed to send quote request. ${FALLBACK_MSG}` }
  }
}
