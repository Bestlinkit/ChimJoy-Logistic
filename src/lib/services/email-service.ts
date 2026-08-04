import React from 'react';
import { Resend } from 'resend';

// Import all 15 React Email templates
import WelcomeEmail from '@/emails/templates/WelcomeEmail';
import VerifyEmail from '@/emails/templates/VerifyEmail';
import LoginVerificationEmail from '@/emails/templates/LoginVerificationEmail';
import ForgotPasswordEmail from '@/emails/templates/ForgotPasswordEmail';
import PasswordChangedEmail from '@/emails/templates/PasswordChangedEmail';
import BookingReceivedEmail from '@/emails/templates/BookingReceivedEmail';
import BookingConfirmedEmail from '@/emails/templates/BookingConfirmedEmail';
import DriverAssignedEmail from '@/emails/templates/DriverAssignedEmail';
import TripReminderEmail from '@/emails/templates/TripReminderEmail';
import DriverArrivedEmail from '@/emails/templates/DriverArrivedEmail';
import BookingCompletedEmail from '@/emails/templates/BookingCompletedEmail';
import BookingCancelledEmail from '@/emails/templates/BookingCancelledEmail';
import ContactFormNotificationEmail from '@/emails/templates/ContactFormNotificationEmail';
import NewsletterSubscriptionEmail from '@/emails/templates/NewsletterSubscriptionEmail';
import CorporateAccountApprovedEmail from '@/emails/templates/CorporateAccountApprovedEmail';

const SENDER_EMAIL = 'ChimJoy Logistics <onboarding@resend.dev>';

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY || 're_placeholder_key_for_build';
  return new Resend(apiKey);
}

export async function sendReactEmail(to: string, subject: string, reactComponent: React.ReactElement) {
  try {
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: SENDER_EMAIL,
      to,
      subject,
      react: reactComponent,
    });

    if (error) {
      console.error('[Resend Email Error]:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('[Resend Email Exception]:', err);
    return { success: false, error: err };
  }
}

// 1. Welcome Email
export async function sendWelcomeEmail(to: string, name: string) {
  return sendReactEmail(
    to,
    'Welcome to ChimJoy Logistics — Premier Mobility',
    React.createElement(WelcomeEmail, { name })
  );
}

// 2. Verify Email Link
export async function sendVerifyEmail(to: string, name: string, verifyUrl: string) {
  return sendReactEmail(
    to,
    'Verify Your ChimJoy Account Email',
    React.createElement(VerifyEmail, { name, verifyUrl })
  );
}

// 3. Login Verification OTP Code
export async function sendLoginVerificationEmail(to: string, name: string, otpCode: string) {
  return sendReactEmail(
    to,
    `Your Login Verification Code: ${otpCode} — ChimJoy`,
    React.createElement(LoginVerificationEmail, { name, code: otpCode })
  );
}

// 4. Forgot Password Reset Link
export async function sendForgotPasswordEmail(to: string, name: string, resetUrl: string) {
  return sendReactEmail(
    to,
    'Reset Your ChimJoy Account Password',
    React.createElement(ForgotPasswordEmail, { name, resetUrl })
  );
}

// 5. Password Changed Confirmation
export async function sendPasswordChangedEmail(to: string, name: string) {
  return sendReactEmail(
    to,
    'Password Changed Successfully — ChimJoy Logistics',
    React.createElement(PasswordChangedEmail, { name })
  );
}

// 6. Booking Request Received
export async function sendBookingReceivedEmail(
  to: string,
  name: string,
  refCode: string,
  serviceType: string,
  pickupLocation: string,
  pickupDate: string,
  estimatedTotal: number
) {
  return sendReactEmail(
    to,
    `Booking Request Received [Ref #${refCode}] — ChimJoy Logistics`,
    React.createElement(BookingReceivedEmail, {
      name,
      refCode,
      serviceType,
      pickupLocation,
      pickupDate,
      estimatedTotal,
    })
  );
}

// 7. Booking Confirmed
export async function sendBookingConfirmedEmail(
  to: string,
  name: string,
  refCode: string,
  vehicleName: string,
  pickupLocation: string,
  pickupDate: string,
  driverName: string,
  driverPhone: string,
  totalPrice: number
) {
  return sendReactEmail(
    to,
    `Booking Confirmed! [Ref #${refCode}] — ChimJoy Logistics`,
    React.createElement(BookingConfirmedEmail, {
      name,
      refCode,
      vehicleName,
      pickupLocation,
      pickupDate,
      driverName,
      driverPhone,
      totalPrice,
    })
  );
}

// 8. Driver Assigned Notification
export async function sendDriverAssignedEmail(
  to: string,
  name: string,
  refCode: string,
  driverName: string,
  driverPhone: string,
  vehicleName: string,
  pickupTime: string
) {
  return sendReactEmail(
    to,
    `Driver Assigned for Booking #${refCode} — ChimJoy Logistics`,
    React.createElement(DriverAssignedEmail, {
      name,
      refCode,
      driverName,
      driverPhone,
      vehicleModel: vehicleName,
      pickupTime,
    })
  );
}

// 9. Trip Reminder Email (24h or 2h before)
export async function sendTripReminderEmail(
  to: string,
  name: string,
  refCode: string,
  pickupLocation: string,
  pickupTime: string,
  driverName: string,
  driverPhone: string
) {
  return sendReactEmail(
    to,
    `Upcoming Trip Reminder [Ref #${refCode}] — ChimJoy Logistics`,
    React.createElement(TripReminderEmail, {
      name,
      refCode,
      pickupLocation,
      pickupTime,
      driverName,
      driverPhone,
    })
  );
}

// 10. Driver Arrived Notification
export async function sendDriverArrivedEmail(
  to: string,
  name: string,
  refCode: string,
  driverName: string,
  driverPhone: string,
  vehicleName: string
) {
  return sendReactEmail(
    to,
    `Your Driver Has Arrived! [Ref #${refCode}] — ChimJoy Logistics`,
    React.createElement(DriverArrivedEmail, {
      name,
      driverName,
      driverPhone,
      vehicleDetails: vehicleName,
    })
  );
}

// 11. Booking Completed & Receipt Email
export async function sendBookingCompletedEmail(
  to: string,
  name: string,
  refCode: string,
  vehicleName?: string,
  totalPrice?: number,
  receiptUrl?: string
) {
  return sendReactEmail(
    to,
    `Trip Completed & Official Receipt [Ref #${refCode}] — ChimJoy`,
    React.createElement(BookingCompletedEmail, {
      name,
      refCode,
    })
  );
}

// 12. Booking Cancelled
export async function sendBookingCancelledEmail(
  to: string,
  name: string,
  refCode: string,
  reason: string
) {
  return sendReactEmail(
    to,
    `Booking Cancelled [Ref #${refCode}] — ChimJoy Logistics`,
    React.createElement(BookingCancelledEmail, {
      name,
      refCode,
      reason,
    })
  );
}

// 13. Contact Form Submission Admin Alert
export async function sendContactFormNotificationEmail(
  adminEmail: string,
  senderName: string,
  senderEmail: string,
  senderPhone: string,
  subject: string,
  message: string
) {
  return sendReactEmail(
    adminEmail,
    `New Contact Form Submission: ${subject}`,
    React.createElement(ContactFormNotificationEmail, {
      senderName,
      senderEmail,
      senderPhone,
      subject,
      message,
    })
  );
}

// 14. Newsletter Subscription Welcome
export async function sendNewsletterSubscriptionEmail(to: string) {
  return sendReactEmail(
    to,
    'Welcome to ChimJoy Executive Insiders',
    React.createElement(NewsletterSubscriptionEmail, { email: to })
  );
}

// 15. Corporate Account Approved
export async function sendCorporateAccountApprovedEmail(to: string, companyName: string, contactName: string) {
  return sendReactEmail(
    to,
    `Corporate Account Approved for ${companyName} — ChimJoy Logistics`,
    React.createElement(CorporateAccountApprovedEmail, { companyName, contactName })
  );
}

export async function sendBookingConfirmationEmail(data: {
  to: string;
  customerName: string;
  referenceCode: string;
  serviceType: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  vehicleName: string;
  estimatedPrice: number;
}) {
  return sendBookingReceivedEmail(
    data.to,
    data.customerName,
    data.referenceCode,
    data.serviceType,
    data.pickupLocation,
    `${data.pickupDate} at ${data.pickupTime}`,
    data.estimatedPrice
  );
}
