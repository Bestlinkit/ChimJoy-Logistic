import { NextResponse } from 'next/server';
import { sendTransactionalEmail } from '@/lib/email/sendEmail';
import { EmailTemplateName } from '@/lib/email/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, subject, template, html, text, metadata } = body;

    if (!to || !subject) {
      return NextResponse.json({ error: 'Missing required parameters: to, subject' }, { status: 400 });
    }

    const templateName: EmailTemplateName = template || 'welcome';

    console.log(`[API Send Email Route] Dispatching ${templateName} to ${to}`);
    const result = await sendTransactionalEmail({
      to,
      subject,
      template: templateName,
      html,
      text,
      metadata,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to dispatch email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, messageId: result.messageId });
  } catch (err: any) {
    console.error('[API Send Email Exception]:', err);
    return NextResponse.json({ error: err?.message || 'Internal Server Error' }, { status: 500 });
  }
}
