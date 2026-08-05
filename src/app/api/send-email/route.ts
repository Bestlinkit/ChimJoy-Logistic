import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, subject, html, text } = body;

    if (!to || !subject) {
      return NextResponse.json({ error: 'Missing required parameters: to, subject' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('[API Send Email Warning] RESEND_API_KEY environment variable not set.');
      return NextResponse.json({ error: 'RESEND_API_KEY environment variable not configured.' }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const senderEmail = process.env.RESEND_FROM_EMAIL || 'ChimJoy Logistics <onboarding@resend.dev>';

    console.log(`[API Send Email] Sending email to: ${to} | Subject: ${subject}`);
    const { data, error } = await resend.emails.send({
      from: senderEmail,
      to: Array.isArray(to) ? to : [to],
      subject,
      html: html || `<p>${text || subject}</p>`,
    });

    if (error) {
      console.error('[API Send Email Error]:', error);
      return NextResponse.json({ error: error.message || error }, { status: 500 });
    }

    console.log('[API Send Email Success]:', data);
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('[API Send Email Exception]:', err);
    return NextResponse.json({ error: err.message || 'Internal Email API Error' }, { status: 500 });
  }
}
