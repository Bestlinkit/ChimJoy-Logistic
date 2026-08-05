import * as React from 'react';
import { NextResponse } from 'next/server';
import { sendTransactionalEmail } from '@/lib/email/sendEmail';
import { EmailTemplateName } from '@/lib/email/types';

// Import templates
import WelcomeEmail from '@/emails/templates/WelcomeEmail';
import VerifyEmail from '@/emails/templates/VerifyEmail';
import ForgotPasswordEmail from '@/emails/templates/ForgotPasswordEmail';
import BookingReceivedEmail from '@/emails/templates/BookingReceivedEmail';
import BookingConfirmedEmail from '@/emails/templates/BookingConfirmedEmail';
import DriverAssignedEmail from '@/emails/templates/DriverAssignedEmail';
import ContactFormNotificationEmail from '@/emails/templates/ContactFormNotificationEmail';
import AdminNewBookingAlertEmail from '@/emails/templates/AdminNewBookingAlertEmail';

function getReactComponent(templateName: EmailTemplateName, metadata: any) {
  switch (templateName) {
    case 'welcome':
      return React.createElement(WelcomeEmail, { name: metadata?.name || 'Valued Client' });
    case 'verify-email':
      return React.createElement(VerifyEmail, { name: metadata?.name || 'Customer', link: metadata?.link || '#' });
    case 'forgot-password':
      return React.createElement(ForgotPasswordEmail, { name: metadata?.name || 'Customer', resetLink: metadata?.resetLink || '#' });
    case 'booking-received':
      return React.createElement(BookingReceivedEmail, {
        customerName: metadata?.customerName || 'Customer',
        bookingRef: metadata?.bookingRef || '',
        pickupAddress: metadata?.pickupAddress || '',
        destination: metadata?.destination || '',
        pickupDate: metadata?.pickupDate || '',
        pickupTime: metadata?.pickupTime || ''
      });
    case 'booking-confirmed':
      return React.createElement(BookingConfirmedEmail, {
        customerName: metadata?.customerName || 'Customer',
        bookingRef: metadata?.bookingRef || '',
        pickupAddress: metadata?.pickupAddress || '',
        destination: metadata?.destination || '',
        pickupDate: metadata?.pickupDate || '',
        pickupTime: metadata?.pickupTime || '',
        vehicleRequested: metadata?.vehicleRequested || '',
        totalAmount: metadata?.totalAmount || '0'
      });
    case 'driver-assigned':
      return React.createElement(DriverAssignedEmail, {
        customerName: metadata?.customerName || 'Customer',
        bookingRef: metadata?.bookingRef || '',
        driverName: metadata?.driverName || '',
        driverPhone: metadata?.driverPhone || '',
        vehicleDetails: metadata?.vehicleDetails || '',
        licensePlate: metadata?.licensePlate || '',
        pickupTime: metadata?.pickupTime || ''
      });
    case 'contact-form':
      return React.createElement(ContactFormNotificationEmail, {
        senderName: metadata?.senderName || '',
        senderEmail: metadata?.senderEmail || '',
        senderPhone: metadata?.senderPhone || '',
        subject: metadata?.subject || '',
        message: metadata?.message || ''
      });
    case 'admin-new-booking':
      return React.createElement(AdminNewBookingAlertEmail, {
        bookingRef: metadata?.bookingRef || '',
        customerName: metadata?.customerName || '',
        serviceType: metadata?.serviceType || '',
        pickupDate: metadata?.pickupDate || '',
        pickupTime: metadata?.pickupTime || ''
      });
    default:
      return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, subject, template, html, text, metadata } = body;

    if (!to || !subject) {
      return NextResponse.json({ error: 'Missing required parameters: to, subject' }, { status: 400 });
    }

    const templateName: EmailTemplateName = template || 'welcome';
    const reactComponent = getReactComponent(templateName, metadata);

    console.log(`[API Send Email Route] Dispatching ${templateName} to ${to}`);
    const result = await sendTransactionalEmail({
      to,
      subject,
      template: templateName,
      html: reactComponent ? undefined : html, // Prefer react component if exists
      text,
      metadata,
      reactComponent: reactComponent || undefined,
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
