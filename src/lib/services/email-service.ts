import { Resend } from 'resend';
import { generateOtpEmailHtml, generateBookingConfirmedEmailHtml } from './email-templates';

const resendApiKey = process.env.RESEND_API_KEY || '';
export const resend = new Resend(resendApiKey);

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'ChimJoy Logistics <onboarding@resend.dev>',
      to,
      subject,
      html,
    });

    if (error) {
      console.error('[Resend Error]:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('[Resend Exception]:', err);
    return { success: false, error: err };
  }
}

export async function sendOtpEmail(to: string, name: string, code: string) {
  const html = generateOtpEmailHtml(name, code);
  return sendEmail({
    to,
    subject: `Verification Code: ${code} - ChimJoy Logistics`,
    html,
  });
}

export async function sendBookingConfirmationEmail(
  to: string,
  name: string,
  refCode: string,
  vehicle: string,
  pickup: string,
  date: string,
  price: number
) {
  const html = generateBookingConfirmedEmailHtml(name, refCode, vehicle, pickup, date, price);
  return sendEmail({
    to,
    subject: `Booking Confirmed [${refCode}] - ChimJoy Logistics`,
    html,
  });
}
