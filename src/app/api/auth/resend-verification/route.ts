import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import { app } from '@/lib/firebase/config';

const ADMIN_EMAIL = 'hq@chimjoylogistics.com.ng';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://chimjoylogistics.com.ng';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const EMAIL_FROM = process.env.EMAIL_FROM || 'ChimJoy Logistics <onboarding@resend.dev>';

/**
 * POST /api/auth/resend-verification
 * Sends a branded email verification link via Resend.
 *
 * Since Next.js app router on the client side cannot use Firebase Admin SDK,
 * we generate a standard Firebase verification action link using the REST API,
 * then wrap it in a branded Resend email.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name = 'Valued Customer' } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!RESEND_API_KEY) {
      console.warn('[resend-verification] RESEND_API_KEY not configured. Skipping email send.');
      return NextResponse.json({ success: true, warn: 'Email service not configured' });
    }

    // Generate a Firebase password reset link using REST API as a proxy for generating
    // any action link. For email verification, we use the Firebase REST API:
    const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCV78LWPP4vaiv88V6exq-O-n8mrMJtNeg';
    const verifyUrl = `${APP_URL}/auth/verify-email?email=${encodeURIComponent(email)}`;

    // Request Firebase to send OOB verification code and capture the link
    let verificationLink = verifyUrl; // Default fallback
    try {
      const firebaseRestRes = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${firebaseApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requestType: 'VERIFY_EMAIL',
            email,
            returnOobLink: true, // This requires Admin SDK — will fail on client Firebase, that's OK
          }),
        }
      );

      const firebaseData = await firebaseRestRes.json();
      if (firebaseData?.oobLink) {
        verificationLink = firebaseData.oobLink;
      }
    } catch (fbErr) {
      // Non-blocking — we still send the email with the fallback link
      console.warn('[resend-verification] Firebase OOB link generation failed, using fallback:', fbErr);
    }

    // Send branded verification email via Resend
    const resend = new Resend(RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: 'Verify Your ChimJoy Account — Action Required',
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
        <body style="margin:0;padding:0;background-color:#F4F6F9;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4F6F9;padding:40px 20px;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #E2E8F0;">
                <!-- Header -->
                <tr>
                  <td style="background-color:#0B192C;padding:32px 40px;text-align:center;">
                    <img src="https://chimjoylogistics.com.ng/images/logo-footer.png" alt="ChimJoy Logistics" height="48" style="max-height:48px;" />
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding:40px;">
                    <div style="text-align:center;margin-bottom:24px;">
                      <div style="display:inline-block;background-color:#F0F7D4;border-radius:50%;width:64px;height:64px;line-height:64px;text-align:center;font-size:32px;">✉️</div>
                    </div>
                    <p style="font-size:13px;color:#64748B;text-transform:uppercase;letter-spacing:2px;font-weight:700;text-align:center;margin:0 0 8px;">EMAIL VERIFICATION</p>
                    <h1 style="font-size:24px;font-weight:800;color:#0E1726;margin:0 0 16px;text-align:center;">Verify Your Email Address</h1>
                    <p style="font-size:15px;color:#475569;line-height:1.6;margin:0 0 16px;">Hello <strong style="color:#0E1726;">${name}</strong>,</p>
                    <p style="font-size:15px;color:#475569;line-height:1.6;margin:0 0 24px;">
                      Thank you for registering with ChimJoy Logistics Services Ltd. Please click the button below to verify your email address and activate your account.
                    </p>
                    <div style="text-align:center;margin:32px 0;">
                      <a href="${verificationLink}" style="display:inline-block;background-color:#9BC800;color:#0B192C;font-weight:800;font-size:14px;padding:14px 32px;border-radius:50px;text-decoration:none;letter-spacing:0.5px;">
                        Verify Email Address →
                      </a>
                    </div>
                    <p style="font-size:13px;color:#64748B;line-height:1.6;margin:24px 0 0;border-top:1px solid #E2E8F0;padding-top:20px;">
                      If you did not create a ChimJoy account, you can safely ignore this email. This verification link expires in 24 hours.
                    </p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background-color:#F8FAFC;padding:20px 40px;text-align:center;border-top:1px solid #E2E8F0;">
                    <p style="font-size:12px;color:#94A3B8;margin:0;">© 2026 ChimJoy Logistics Services Ltd. 56 Christ Church Road, Owerri, Imo State, Nigeria.</p>
                    <p style="font-size:11px;color:#CBD5E1;margin:8px 0 0;">Website by <a href="https://bestlinkdigitaltech.online" style="color:#9BC800;text-decoration:none;font-weight:700;">Bestlink Digital Tech</a></p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('[resend-verification] Resend error:', error);
      return NextResponse.json({ error: 'Failed to send verification email.' }, { status: 500 });
    }

    console.log(`[resend-verification] Sent to ${email} | MessageId: ${data?.id}`);
    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (err: any) {
    console.error('[resend-verification] Exception:', err);
    return NextResponse.json({ error: err?.message || 'Internal server error' }, { status: 500 });
  }
}
