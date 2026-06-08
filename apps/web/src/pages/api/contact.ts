import type { APIRoute } from 'astro'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData()

  const name    = (data.get('name')    as string)?.trim()
  const email   = (data.get('email')   as string)?.trim()
  const company = (data.get('company') as string)?.trim() ?? ''
  const subject = (data.get('subject') as string)?.trim() ?? ''
  const message = (data.get('message') as string)?.trim()
  const honey   = (data.get('_honey')  as string)?.trim()

  // Honeypot check
  if (honey) return new Response(JSON.stringify({ ok: true }), { status: 200 })

  // Validation
  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email address' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Send email via Resend
  const RESEND_API_KEY = import.meta.env.RESEND_API_KEY
  const TO_EMAIL       = import.meta.env.CONTACT_EMAIL_TO || 'support@desk365.io'

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not set')
    return new Response(JSON.stringify({ error: 'Email service not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const emailBody = {
    from: 'Desk365 Contact <noreply@desk365.io>',
    to: [TO_EMAIL],
    reply_to: email,
    subject: `[Contact] ${subject || 'New message'} — ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || '—'}</p>
      <p><strong>Subject:</strong> ${subject || '—'}</p>
      <hr/>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailBody)
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Resend error:', err)
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
