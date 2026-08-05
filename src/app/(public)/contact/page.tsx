'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, PhoneCall, Mail, Clock, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { db } from '@/lib/firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const ADMIN_EMAIL = 'hq@chimjoylogistics.com.ng';

export default function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName || !phone || !message) {
      setErrorMessage('Please fill in your name, phone number, and message.');
      return;
    }

    setIsSubmitting(true);

    try {
      const messageSubject = subject.trim() || 'General Enquiry';
      const now = new Date().toISOString();

      // 1. Save message to Firestore contact_messages collection
      const msgRef = await addDoc(collection(db, 'contact_messages'), {
        senderName: fullName,
        senderEmail: email || '',
        senderPhone: phone,
        subject: messageSubject,
        message,
        status: 'unread',
        isRead: false,
        replyStatus: 'pending',
        createdAt: now,
      });

      // 2. Create admin notification (non-blocking)
      addDoc(collection(db, 'admin_notifications'), {
        title: 'New Contact Message',
        message: `${fullName} sent a message: "${messageSubject}"`,
        type: 'message',
        isRead: false,
        relatedId: msgRef.id,
        createdAt: now,
      }).catch((e) => console.warn('[Contact notification warning]:', e));

      // 3. Send email notification to admin via Resend (non-blocking)
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: ADMIN_EMAIL,
          subject: `New Contact Message: ${messageSubject}`,
          template: 'contact_notification',
          text: `New contact message received:\n\nName: ${fullName}\nEmail: ${email || 'Not provided'}\nPhone: ${phone}\nSubject: ${messageSubject}\nMessage:\n${message}\n\nSubmitted: ${new Date(now).toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })}`,
        }),
      }).catch((e) => console.warn('[Contact admin email warning]:', e));

      // 4. Send auto-reply to customer if email provided (non-blocking)
      if (email) {
        fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: email,
            subject: 'We Received Your Message — ChimJoy Logistics',
            template: 'contact_notification',
            text: `Hello ${fullName},\n\nThank you for contacting ChimJoy Logistics Services Ltd. Our dispatch concierge team has received your message and will get back to you shortly.\n\nYour message reference: ${msgRef.id}\n\nBest regards,\nChimJoy Logistics Concierge Team\nhq@chimjoylogistics.com.ng | +234 807 788 0262`,
          }),
        }).catch((e) => console.warn('[Contact auto-reply warning]:', e));
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('[Contact Form Error]:', err);
      setErrorMessage('Failed to send your message. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[#0B192C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-black text-[#9BC800] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#9BC800] animate-pulse" />
            <span>24/7 OPERATIONS & CONCIERGE DISPATCH</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Get in Touch with <span className="text-[#9BC800]">ChimJoy Operations</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg">
            Have a custom inquiry, corporate contract request, or VIP escort requirement? Reach our dispatch team instantly.
          </p>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/15 space-y-6 shadow-xl">
              <h3 className="font-display text-xl font-bold text-[#9BC800]">Owerri Operational Hub</h3>
              <div className="space-y-4 text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#9BC800] shrink-0 mt-1" />
                  <span>Office: 56 Christ Church Road, Owerri, Imo State, Nigeria.</span>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-5 h-5 text-[#9BC800] shrink-0" />
                  <a href="tel:+2348077880262" className="hover:text-[#9BC800] transition-colors font-bold">
                    +234 807 788 0262
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#9BC800] shrink-0" />
                  <a href="mailto:hq@chimjoylogistics.com.ng" className="hover:text-[#9BC800] transition-colors font-bold">
                    hq@chimjoylogistics.com.ng
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#9BC800] shrink-0" />
                  <span>24 Hours Daily Operational Dispatch</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/15 space-y-6 shadow-xl">
              <h3 className="font-display text-xl font-bold text-white">Send Direct Message</h3>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-500/20 border border-red-400/30 text-red-200 font-bold text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-slate-300">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full p-3.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#9BC800] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-slate-300">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+234 803 000 0000"
                        className="w-full p-3.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#9BC800] transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold uppercase tracking-wider text-slate-300">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="name@domain.ng"
                        className="w-full p-3.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#9BC800] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-slate-300">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      placeholder="e.g. Airport Pickup, Corporate Booking..."
                      className="w-full p-3.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#9BC800] transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-slate-300">Message / Inquiry</label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="How can ChimJoy assist your mobility needs?"
                      className="w-full p-3.5 bg-white/10 border border-white/15 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#9BC800] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <LuxuryButton
                      type="submit"
                      variant="lemon"
                      size="lg"
                      className="w-full justify-center"
                      disabled={isSubmitting}
                      icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    >
                      {isSubmitting ? 'Sending Message...' : 'Send Concierge Message'}
                    </LuxuryButton>
                  </div>
                </form>
              ) : (
                <div className="p-6 text-center space-y-4 bg-white/10 rounded-2xl border border-[#9BC800]/40">
                  <div className="w-12 h-12 rounded-full bg-[#9BC800]/20 text-[#9BC800] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-black text-xl text-white">Message Sent!</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Thank you, {fullName}! Our dispatch concierge team has received your message and will contact you shortly. A confirmation has been sent to your email if provided.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
