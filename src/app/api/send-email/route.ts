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
      return React.createElement(VerifyEmail, { name: metadata?.name || 'Customer', verifyUrl: metadata?.link || '#' });
    case 'forgot-password':
      return React.createElement(ForgotPasswordEmail, { name: metadata?.name || 'Customer', resetUrl: metadata?.resetLink || '#' });
    case 'booking-received':
      return React.createElement(BookingReceivedEmail, {
        name: metadata?.customerName || metadata?.name || 'Customer',
        refCode: metadata?.bookingRef || metadata?.refCode || '',
        serviceType: metadata?.serviceType || 'Car Hire',
        pickupLocation: metadata?.pickupAddress || metadata?.pickupLocation || '',
        pickupDate: metadata?.pickupDate || '',
        estimatedTotal: Number(metadata?.totalAmount) || Number(metadata?.estimatedTotal) || 0,
        bookingUrl: metadata?.bookingUrl || ''
      });
    case 'booking-confirmed':
      return React.createElement(BookingConfirmedEmail, {
        name: metadata?.customerName || metadata?.name || 'Customer',
        refCode: metadata?.bookingRef || metadata?.refCode || '',
        vehicleName: metadata?.vehicleRequested || metadata?.vehicleName || '',
        pickupLocation: metadata?.pickupAddress || metadata?.pickupLocation || '',
        pickupDate: metadata?.pickupDate || '',
        driverName: metadata?.driverName || '',
        driverPhone: metadata?.driverPhone || '',
        totalPrice: Number(metadata?.totalAmount) || Number(metadata?.totalPrice) || 0,
        bookingUrl: metadata?.bookingUrl || ''
      });
    case 'driver-assigned':
      return React.createElement(DriverAssignedEmail, {
        name: metadata?.customerName || metadata?.name || 'Customer',
        refCode: metadata?.bookingRef || metadata?.refCode || '',
        driverName: metadata?.driverName || '',
        driverPhone: metadata?.driverPhone || '',
        vehicleModel: metadata?.vehicleDetails || metadata?.vehicleModel || '',
        plateNumber: metadata?.licensePlate || metadata?.plateNumber || '',
        pickupTime: metadata?.pickupTime || '',
        whatsAppUrl: metadata?.whatsAppUrl || ''
      });
    case 'contact-form':
      return React.createElement(ContactFormNotificationEmail, {
        senderName: metadata?.senderName || '',
        senderEmail: metadata?.senderEmail || '',
        senderPhone: metadata?.senderPhone || '',
        subject: metadata?.subject || '',
        message: metadata?.message || ''
      });
    case 'admin-booking-alert':
      return React.createElement(AdminNewBookingAlertEmail, {
        refCode: metadata?.bookingRef || metadata?.refCode || '',
        customerName: metadata?.customerName || '',
        customerPhone: metadata?.customerPhone || '',
        serviceType: metadata?.serviceType || '',
        pickupLocation: metadata?.pickupLocation || metadata?.pickupAddress || '',
        dropoffLocation: metadata?.dropoffLocation || metadata?.destination || '',
        pickupDate: metadata?.pickupDate || '',
        estimatedPrice: Number(metadata?.estimatedPrice) || Number(metadata?.totalAmount) || 0
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
