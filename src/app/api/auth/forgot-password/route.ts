import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const EMAIL_FROM = process.env.EMAIL_FROM || 'ChimJoy Logistics <onboarding@resend.dev>';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://chimjoylogistics.com.ng';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCV78LWPP4vaiv88V6exq-O-n8mrMJtNeg';
    let resetLink = `${APP_URL}/auth/reset-password`;

    // Attempt to generate Firebase reset link via REST API
    try {
      const fbRes = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${firebaseApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ requestType: 'PASSWORD_RESET', email, returnOobLink: true }),
        }
      );
      const fbData = await fbRes.json();
      if (fbData?.oobLink) resetLink = fbData.oobLink;
    } catch {
      // Fallback to app reset page
    }

    if (!RESEND_API_KEY) {
      return NextResponse.json({ success: true, warn: 'Email service not configured' });
    }

    const resend = new Resend(RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: 'Reset Your ChimJoy Account Password',
      html: `
        <!DOCTYPE html><html>
        <body style="margin:0;padding:0;background:#F4F6F9;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F6F9;padding:40px 20px;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E2E8F0;">
                <tr><td style="background:#0B192C;padding:32px 40px;text-align:center;">
                  <img src="https://chimjoylogistics.com.ng/images/logo-footer.png" alt="ChimJoy" height="48" />
                </td></tr>
                <tr><td style="padding:40px;">
                  <p style="font-size:13px;color:#64748B;text-transform:uppercase;letter-spacing:2px;font-weight:700;text-align:center;margin:0 0 8px;">PASSWORD RESET</p>
                  <h1 style="font-size:24px;font-weight:800;color:#0E1726;text-align:center;margin:0 0 16px;">Reset Your Password</h1>
                  <p style="font-size:15px;color:#475569;line-height:1.6;margin:0 0 24px;">
                    We received a request to reset the password for your ChimJoy account. Click the button below to set a new password.
                  </p>
                  <div style="text-align:center;margin:32px 0;">
                    <a href="${resetLink}" style="display:inline-block;background:#9BC800;color:#0B192C;font-weight:800;font-size:14px;padding:14px 32px;border-radius:50px;text-decoration:none;">
                      Reset Password →
                    </a>
                  </div>
                  <p style="font-size:13px;color:#64748B;margin:24px 0 0;border-top:1px solid #E2E8F0;padding-top:20px;">
                    If you did not request a password reset, please ignore this email. This link expires in 1 hour.
                  </p>
                </td></tr>
                <tr><td style="background:#F8FAFC;padding:20px 40px;text-align:center;border-top:1px solid #E2E8F0;">
                  <p style="font-size:12px;color:#94A3B8;margin:0;">© 2026 ChimJoy Logistics Services Ltd. Owerri, Imo State, Nigeria.</p>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </body></html>
      `,
    });

    if (error) return NextResponse.json({ error: 'Failed to send reset email.' }, { status: 500 });
    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Internal server error' }, { status: 500 });
  }
}
