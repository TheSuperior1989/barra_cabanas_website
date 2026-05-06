import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM_EMAIL ?? 'Barra Cabanas <onboarding@resend.dev>'
const BOOKINGS_EMAIL = 'bookings@barracabanas.com'
const JIGALOUW_EMAIL = 'jigalouw@barracabanas.com'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    name, email, phone, subject, message, service,
    type, company, services, totalAmount,
  } = req.body ?? {}

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email and message are required.' })
  }

  const isFishing = service === 'fishing-enquiry'
  const isQuote = type === 'quote'
  const adminTo = isFishing ? JIGALOUW_EMAIL : BOOKINGS_EMAIL

  const adminSubject = isFishing
    ? `Fishing Charter Enquiry — ${name}`
    : isQuote
      ? `Quote Request from ${name}`
      : `New Enquiry: ${subject ?? 'Website Contact Form'} — ${name}`

  const adminHtml = isFishing
    ? fishingAdminHtml({ name, email, phone, subject, message })
    : isQuote
      ? quoteAdminHtml({ name, email, phone, company, message, services, totalAmount })
      : contactAdminHtml({ name, email, phone, subject, message, service })

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: adminTo,
      replyTo: email,
      subject: adminSubject,
      html: adminHtml,
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(500).json({
        success: false,
        message: 'Failed to send email. Please contact us at bookings@barracabanas.com or call +27 66 205 7229.',
      })
    }

    await resend.emails.send({
      from: FROM,
      to: email,
      subject: isFishing
        ? 'We received your fishing charter enquiry — Barra Cabanas'
        : isQuote
          ? 'We received your quote request — Barra Cabanas'
          : 'We received your message — Barra Cabanas',
      html: autoReplyHtml(name, isFishing ? 'fishing' : isQuote ? 'quote' : 'contact'),
    }).catch(err => console.error('Auto-reply failed (non-fatal):', err))

    return res.status(200).json({
      success: true,
      message: isQuote ? 'Quote request sent successfully!' : 'Message sent successfully!',
    })
  } catch (err) {
    console.error('Contact API error:', err)
    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Please contact us at bookings@barracabanas.com or call +27 66 205 7229.',
    })
  }
}

// ─── HTML helpers ────────────────────────────────────────────────────────────

function shell(title: string, accent: string, body: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">
<div style="max-width:600px;margin:32px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08)">
  <div style="background:${accent};padding:24px 32px">
    <h1 style="margin:0;color:#fff;font-size:20px">${title}</h1>
    <p style="margin:4px 0 0;color:rgba(255,255,255,.75);font-size:13px">Barra Cabanas — website notification</p>
  </div>
  <div style="padding:24px 32px">${body}</div>
  <div style="padding:16px 32px;background:#f9f9f9;font-size:12px;color:#888;text-align:center">
    Barra Cabanas &bull; Barra Beach, Inhambane, Mozambique &bull; +27 66 205 7229 &bull; bookings@barracabanas.com
  </div>
</div></body></html>`
}

function row(label: string, value: string | undefined | null): string {
  if (!value) return ''
  return `<tr>
    <td style="padding:6px 12px;font-weight:600;width:130px;vertical-align:top;color:#555;white-space:nowrap">${label}</td>
    <td style="padding:6px 12px;color:#333">${value.replace(/\n/g, '<br>')}</td>
  </tr>`
}

function table(rows: string): string {
  return `<table style="border-collapse:collapse;width:100%;border:1px solid #eee;border-radius:6px">${rows}</table>`
}

function contactAdminHtml(d: any): string {
  return shell('New Contact Enquiry', '#1a6b4a', table(
    row('Name', d.name) +
    row('Email', d.email) +
    row('Phone', d.phone) +
    row('Subject', d.subject) +
    row('Accommodation', d.service) +
    row('Message', d.message)
  ))
}

function quoteAdminHtml(d: any): string {
  const serviceList = Array.isArray(d.services)
    ? d.services.map((s: any) => `${s.name} &times;${s.quantity} — R${(s.price * s.quantity).toLocaleString()}`).join('<br>')
    : undefined
  return shell('New Quote Request', '#1a6b4a', table(
    row('Name', d.name) +
    row('Email', d.email) +
    row('Phone', d.phone) +
    row('Company', d.company) +
    row('Services', serviceList) +
    row('Total', d.totalAmount != null ? `R${Number(d.totalAmount).toLocaleString()}` : undefined) +
    row('Message', d.message)
  ))
}

function fishingAdminHtml(d: any): string {
  return shell('New Fishing Charter Enquiry', '#0e4f7a', table(
    row('Name', d.name) +
    row('Email', d.email) +
    row('Phone', d.phone) +
    row('Subject', d.subject) +
    row('Details', d.message)
  ))
}

function autoReplyHtml(name: string, kind: 'contact' | 'quote' | 'fishing'): string {
  const lines: Record<string, string[]> = {
    contact: [
      `Thank you for reaching out, ${name}!`,
      `We've received your message and will get back to you within 24 hours.`,
      `For urgent queries call <strong>+27 66 205 7229</strong> or email <a href="mailto:bookings@barracabanas.com">bookings@barracabanas.com</a>.`,
    ],
    quote: [
      `Thank you for your quote request, ${name}!`,
      `We've received your enquiry and will respond within 24 hours.`,
      `For urgent queries call <strong>+27 66 205 7229</strong>.`,
    ],
    fishing: [
      `Thank you for your fishing charter enquiry, ${name}!`,
      `We've forwarded your request to the Jigalouw team and they will be in touch shortly.`,
      `For urgent queries contact us on <strong>+27 66 205 7229</strong>.`,
    ],
  }
  const accent = kind === 'fishing' ? '#0e4f7a' : '#1a6b4a'
  const body = lines[kind]
    .map(l => `<p style="margin:0 0 14px;color:#333;line-height:1.7">${l}</p>`)
    .join('')
  return shell('We received your enquiry', accent, body)
}
