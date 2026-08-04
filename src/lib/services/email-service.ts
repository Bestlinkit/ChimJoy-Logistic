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

const resendApiKey = process.env.RESEND_API_KEY || '';
export const resend = new Resend(resendApiKey);

const SENDER_EMAIL = 'ChimJoy Logistics <onboarding@resend.dev>';

export async function sendReactEmail(to: string, subject: string, reactComponent: React.ReactElement) {
  try {
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
    'Welcome to ChimJoy Logistics — Executive Mobility & Car Hire',
    React.createElement(WelcomeEmail, { name })
  );
}

// 2. Verify Email
export async function sendVerifyEmail(to: string, name: string, code: string) {
  return sendReactEmail(
    to,
    `Verify Your Email Address: ${code} — ChimJoy Logistics`,
    React.createElement(VerifyEmail, { name, code })
  );
}

// 3. Login Verification OTP
export async function sendLoginVerificationEmail(to: string, name: string, code: string, device?: string) {
  return sendReactEmail(
    to,
    `Authorize Sign In: ${code} — ChimJoy Security`,
    React.createElement(LoginVerificationEmail, { name, code, device })
  );
}

// 4. Forgot Password
export async function sendForgotPasswordEmail(to: string, name: string, resetUrl: string) {
  return sendReactEmail(
    to,
    'Reset Your Password — ChimJoy Logistics',
    React.createElement(ForgotPasswordEmail, { name, resetUrl })
  );
}

// 5. Password Changed
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

// 8. Driver Assigned
export async function sendDriverAssignedEmail(
  to: string,
  name: string,
  refCode: string,
  driverName: string,
  driverPhone: string,
  vehicleModel: string,
  plateNumber: string,
  pickupTime: string
) {
  return sendReactEmail(
    to,
    `Chauffeur Assigned: ${driverName} (${plateNumber}) — Ref #${refCode}`,
    React.createElement(DriverAssignedEmail, {
      name,
      refCode,
      driverName,
      driverPhone,
      vehicleModel,
      plateNumber,
      pickupTime,
    })
  );
}

// 9. Trip Reminder
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
    `Upcoming Trip Reminder: ${pickupTime} — Ref #${refCode}`,
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

// 10. Driver Has Arrived
export async function sendDriverArrivedEmail(
  to: string,
  name: string,
  driverName: string,
  driverPhone: string,
  vehicleDetails: string,
  plateNumber: string,
  pickupLocation: string
) {
  return sendReactEmail(
    to,
    `Your Chauffeur ${driverName} Has Arrived! — ChimJoy Logistics`,
    React.createElement(DriverArrivedEmail, {
      name,
      driverName,
      driverPhone,
      vehicleDetails,
      plateNumber,
      pickupLocation,
    })
  );
}

// 11. Booking Completed
export async function sendBookingCompletedEmail(to: string, name: string, refCode: string) {
  return sendReactEmail(
    to,
    `Thank You for Traveling with ChimJoy [Ref #${refCode}]`,
    React.createElement(BookingCompletedEmail, { name, refCode })
  );
}

// 12. Booking Cancelled
export async function sendBookingCancelledEmail(to: string, name: string, refCode: string, reason?: string) {
  return sendReactEmail(
    to,
    `Booking Cancellation Confirmation [Ref #${refCode}] — ChimJoy Logistics`,
    React.createElement(BookingCancelledEmail, { name, refCode, reason })
  );
}

// 13. Contact Form Notification (Admin)
export async function sendContactFormAdminNotification(
  adminEmail: string,
  senderName: string,
  senderEmail: string,
  senderPhone: string,
  subject: string,
  message: string
) {
  return sendReactEmail(
    adminEmail,
    `New Enquiry from ${senderName}: ${subject}`,
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
