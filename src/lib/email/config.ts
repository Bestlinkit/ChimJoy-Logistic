export interface EmailEnvConfig {
  apiKey: string;
  from: string;
  replyTo: string;
  appUrl: string;
}

export function getEmailConfig(): EmailEnvConfig {
  const apiKey = process.env.RESEND_API_KEY || '';
  const from = process.env.EMAIL_FROM || 'ChimJoy Logistics <onboarding@resend.dev>';
  const replyTo = process.env.EMAIL_REPLY_TO || 'hq@chimjoylogistics.com.ng';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://chimjoylogistics.com.ng';

  return {
    apiKey,
    from,
    replyTo,
    appUrl,
  };
}
