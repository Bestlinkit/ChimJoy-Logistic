export type EmailTemplateName =
  | 'welcome'
  | 'verify-email'
  | 'forgot-password'
  | 'password-changed'
  | 'booking-received'
  | 'booking-confirmed'
  | 'driver-assigned'
  | 'driver-arrived'
  | 'trip-reminder'
  | 'trip-started'
  | 'booking-completed'
  | 'receipt'
  | 'invoice'
  | 'booking-cancelled'
  | 'contact-form'
  | 'newsletter'
  | 'corporate-approved'
  | 'admin-booking-alert'
  | 'new-customer-alert'
  | 'review-submitted'
  | 'vehicle-added'
  | 'driver-added'
  | 'system-alert';

export type EmailStatus = 'queued' | 'sent' | 'failed' | 'retrying';

export interface EmailLogRecord {
  id?: string;
  recipient: string;
  template: EmailTemplateName;
  subject: string;
  status: EmailStatus;
  provider: 'resend';
  messageId?: string;
  error?: string;
  attemptCount: number;
  maxRetries: number;
  durationMs?: number;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  template: EmailTemplateName;
  reactComponent?: React.ReactElement;
  html?: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
  metadata?: Record<string, any>;
  bypassPreferenceCheck?: boolean;
}

export interface UserEmailPreferences {
  marketing: boolean;
  tripReminders: boolean;
  receipts: boolean;
  newsletters: boolean;
  bookingUpdates: boolean;
  systemAlerts: boolean;
}
