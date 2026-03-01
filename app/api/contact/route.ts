import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { apiRatelimit } from '@/app/lib/ratelimit'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous'
  const { success } = await apiRatelimit.limit(ip)
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required' }, { status: 400 })
    }

    // Email to admin
    await resend.emails.send({
      from: 'Essential <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL!,
      subject: `New Contact Form: ${subject || 'No subject'}`,
      html: `
        <div style="font-family: serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 28px; color: #000; margin-bottom: 8px;">New Message</h1>
          <p style="color: #888; margin-bottom: 32px;">Someone submitted the contact form on your site.</p>
          
          <div style="border: 1px solid #eee; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #888; font-size: 14px; width: 100px;">Name</td>
                <td style="padding: 10px 0; color: #000; font-size: 14px; font-weight: 500;">${name}</td>
              </tr>
              <tr style="border-top: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #888; font-size: 14px;">Email</td>
                <td style="padding: 10px 0; color: #000; font-size: 14px; font-weight: 500;">${email}</td>
              </tr>
              <tr style="border-top: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #888; font-size: 14px;">Subject</td>
                <td style="padding: 10px 0; color: #000; font-size: 14px; font-weight: 500;">${subject || 'No subject'}</td>
              </tr>
            </table>
          </div>

          <div style="border: 1px solid #eee; border-radius: 12px; padding: 24px;">
            <p style="color: #888; font-size: 13px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
            <p style="color: #000; font-size: 15px; line-height: 1.7; margin: 0;">${message}</p>
          </div>

          <p style="color: #aaa; font-size: 12px; margin-top: 32px;">
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
      replyTo: email,
    })

    // Confirmation email to user
    await resend.emails.send({
      from: 'Essential <onboarding@resend.dev>',
      to: email,
      subject: 'We received your message!',
      html: `
        <div style="font-family: serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 28px; color: #000; margin-bottom: 8px;">Thank you, ${name}!</h1>
          <p style="color: #888; font-size: 15px; line-height: 1.7; margin-bottom: 32px;">
            We've received your message and will get back to you as soon as possible. 
            Usually within 24–48 hours.
          </p>

          <div style="border: 1px solid #eee; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
            <p style="color: #888; font-size: 13px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">Your message</p>
            <p style="color: #000; font-size: 15px; line-height: 1.7; margin: 0;">${message}</p>
          </div>

          <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yoursite.com'}/store" 
             style="display: inline-block; background: #000; color: #fff; text-decoration: none; padding: 14px 28px; border-radius: 100px; font-size: 14px; font-family: sans-serif;">
            Browse Our Store →
          </a>

          <p style="color: #aaa; font-size: 12px; margin-top: 40px;">
            Essential Beauty · If you did not submit this form, please ignore this email.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
