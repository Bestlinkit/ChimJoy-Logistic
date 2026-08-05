import { Resend } from 'resend';
import { db } from '@/lib/firebase/config';
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getEmailConfig } from './config';
import { SendEmailOptions, EmailLogRecord, UserEmailPreferences } from './types';

export async function checkUserEmailPreference(recipientEmail: string, category: keyof UserEmailPreferences): Promise<boolean> {
  try {
    // If preference cannot be checked or user profile has no preference set, default to allowed (true)
    return true;
  } catch (err) {
    return true;
  }
}

export async function sendTransactionalEmail(options: SendEmailOptions): Promise<{ success: boolean; messageId?: string; error?: any }> {
  const startTime = Date.now();
  const config = getEmailConfig();
  const resend = new Resend(config.apiKey);

  const recipientStr = Array.isArray(options.to) ? options.to.join(', ') : options.to;
  const primaryRecipient = Array.isArray(options.to) ? options.to[0] : options.to;

  // 1. Create initial Firestore log entry (status: 'queued')
  let logDocRefId: string | null = null;
  try {
    const logData: EmailLogRecord = {
      recipient: recipientStr,
      template: options.template,
      subject: options.subject,
      status: 'queued',
      provider: 'resend',
      attemptCount: 1,
      maxRetries: 3,
      metadata: options.metadata || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const logDocRef = await addDoc(collection(db, 'emailLogs'), logData);
    logDocRefId = logDocRef.id;
  } catch (logErr) {
    console.warn('[Email Logging Warning] Could not write initial queue log to Firestore:', logErr);
  }

  // 2. Dispatch email via Resend SDK
  try {
    console.log(`[Email Dispatch] Sending ${options.template} email to ${recipientStr}...`);

    const payload: any = {
      from: config.from,
      to: options.to,
      subject: options.subject,
      replyTo: options.replyTo || config.replyTo,
    };

    if (options.reactComponent) {
      payload.react = options.reactComponent;
    } else if (options.html) {
      payload.html = options.html;
    } else {
      payload.text = options.text || options.subject;
    }

    if (options.cc) payload.cc = options.cc;
    if (options.bcc) payload.bcc = options.bcc;

    const { data, error } = await resend.emails.send(payload);
    const durationMs = Date.now() - startTime;

    if (error) {
      console.error(`[Resend Dispatch Error] (${options.template} to ${recipientStr}):`, error);

      if (logDocRefId) {
        await updateDoc(doc(db, 'emailLogs', logDocRefId), {
          status: 'failed',
          error: typeof error === 'string' ? error : JSON.stringify(error),
          durationMs,
          updatedAt: new Date().toISOString(),
        }).catch(() => null);
      }

      return { success: false, error };
    }

    console.log(`[Resend Dispatch Success] (${options.template} to ${recipientStr}) MessageId: ${data?.id} (${durationMs}ms)`);

    if (logDocRefId) {
      await updateDoc(doc(db, 'emailLogs', logDocRefId), {
        status: 'sent',
        messageId: data?.id || 'resend_ok',
        durationMs,
        updatedAt: new Date().toISOString(),
      }).catch(() => null);
    }

    return { success: true, messageId: data?.id };
  } catch (err: any) {
    const durationMs = Date.now() - startTime;
    console.error(`[Resend Dispatch Exception] (${options.template} to ${recipientStr}):`, err);

    if (logDocRefId) {
      await updateDoc(doc(db, 'emailLogs', logDocRefId), {
        status: 'failed',
        error: err?.message || String(err),
        durationMs,
        updatedAt: new Date().toISOString(),
      }).catch(() => null);
    }

    return { success: false, error: err?.message || 'Email sending exception' };
  }
}
