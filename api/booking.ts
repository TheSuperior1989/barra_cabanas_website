import { Resend } from 'resend'

const BOOKINGS_EMAIL = 'bookings@barracabanas.com'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return res.status(500).json({ success: false, message: 'Email service not configured.' })
  }

  const resend = new Resend(apiKey)
  const FROM = process.env.RESEND_FROM_EMAIL ?? 'Barra Cabanas <onboarding@resend.dev>'

  let body: any = {}
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body ?? {})
  } catch {
    return res.status(400).json({ success: false, message: 'Invalid request body.' })
  }

  const { bookingData, customerData } = body

  if (!customerData?.email || !bookingData?.checkIn || !bookingData?.checkOut) {
    return res.status(400).json({ success: false, message: 'Missing required booking fields.' })
  }

  const fullName = `${customerData.firstName ?? ''} ${customerData.lastName ?? ''}`.trim()
  const bookingRef = `BC-${Date.now()}`

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: BOOKINGS_EMAIL,
      replyTo: customerData.email,
      subject: `New Booking Request — ${fullName}`,
      html: adminHtml({ bookingData, customerData, bookingRef }),
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(500).json({
        success: false,
        message: 'Failed to send booking request. Please contact us at bookings@barracabanas.com or call +27 66 205 7229.',
      })
    }

    resend.emails.send({
      from: FROM,
      to: customerData.email,
      subject: 'Booking Request Received — Barra Cabanas',
      html: customerHtml({ bookingData, customerData, bookingRef }),
    }).catch(err => console.error('Customer confirmation failed (non-fatal):', err))

    return res.status(200).json({
      success: true,
      message: 'Booking request submitted! You will receive a confirmation email shortly.',
    })
  } catch (err) {
    console.error('Booking API error:', err)
    return res.status(500).json({
      success: false,
      message: 'Failed to submit booking. Please contact us at bookings@barracabanas.com.',
    })
  }
}

function shell(title: string, body: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">
<div style="max-width:600px;margin:32px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08)">
  <div style="background:#1a6b4a;padding:24px 32px">
    <h1 style="margin:0;color:#fff;font-size:20px">${title}</h1>
    <p style="margin:4px 0 0;color:rgba(255,255,255,.75);font-size:13px">Barra Cabanas — website notification</p>
  </div>
  <div style="padding:24px 32px">${body}</div>
  <div style="padding:16px 32px;background:#f9f9f9;font-size:12px;color:#888;text-align:center">
    Barra Cabanas &bull; Barra Beach, Inhambane, Mozambique &bull; +27 66 205 7229 &bull; bookings@barracabanas.com
  </div>
</div></body></html>`
}

function row(label: string, value: string | number | undefined | null): string {
  if (value == null || value === '') return ''
  return `<tr>
    <td style="padding:6px 12px;font-weight:600;width:140px;vertical-align:top;color:#555;white-space:nowrap">${label}</td>
    <td style="padding:6px 12px;color:#333">${String(value)}</td>
  </tr>`
}

function adminHtml({ bookingData: b, customerData: c, bookingRef }: any): string {
  const guestStr = [
    b.adults && `${b.adults} adult${b.adults > 1 ? 's' : ''}`,
    b.children && `${b.children} child${b.children > 1 ? 'ren' : ''}`,
    b.infants && `${b.infants} infant${b.infants > 1 ? 's' : ''}`,
  ].filter(Boolean).join(', ')

  return shell('New Booking Request', `
    <table style="border-collapse:collapse;width:100%;border:1px solid #eee">
      <tr><td colspan="2" style="padding:8px 12px;background:#f0f7f4;font-weight:700;color:#1a6b4a">Booking Details</td></tr>
      ${row('Reference', bookingRef)}
      ${row('Property', b.propertyName)}
      ${row('Check-in', b.checkIn)}
      ${row('Check-out', b.checkOut)}
      ${row('Nights', b.nights)}
      ${row('Guests', guestStr)}
      ${row('Total', b.totalAmount ? `R${Number(b.totalAmount).toLocaleString()}` : undefined)}
      ${row('Notes', b.specialRequests || b.notes)}
      <tr><td colspan="2" style="padding:8px 12px;background:#f0f7f4;font-weight:700;color:#1a6b4a">Customer Details</td></tr>
      ${row('Name', `${c.firstName ?? ''} ${c.lastName ?? ''}`.trim())}
      ${row('Email', c.email)}
      ${row('Phone', c.phone)}
      ${row('Country', c.country)}
    </table>
  `)
}

function customerHtml({ bookingData: b, customerData: c, bookingRef }: any): string {
  return shell('Booking Request Received', `
    <p style="color:#333;line-height:1.7">Dear ${c.firstName},</p>
    <p style="color:#333;line-height:1.7">Thank you for your booking request at Barra Cabanas! We have received your enquiry and will confirm availability within 24 hours.</p>
    <table style="border-collapse:collapse;width:100%;border:1px solid #eee;margin:16px 0">
      ${row('Property', b.propertyName)}
      ${row('Check-in', b.checkIn)}
      ${row('Check-out', b.checkOut)}
      ${row('Nights', b.nights)}
      ${row('Estimated Total', b.totalAmount ? `R${Number(b.totalAmount).toLocaleString()}` : undefined)}
      ${row('Reference', bookingRef)}
    </table>
    <p style="color:#555;font-size:13px;line-height:1.7"><strong>Note:</strong> This is a booking request, not a confirmed reservation. No payment is required until your booking is confirmed.</p>
    <p style="color:#333;line-height:1.7">Questions? Email <a href="mailto:bookings@barracabanas.com">bookings@barracabanas.com</a> or call <strong>+27 66 205 7229</strong>.</p>
  `)
}
