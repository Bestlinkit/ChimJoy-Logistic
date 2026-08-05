'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Search, Mail, Phone, Send, Eye } from 'lucide-react';
import { subscribeToMessages } from '@/lib/firebase/services/admin-db-service';
import { ContactMessage } from '@/types/admin';
import { db } from '@/lib/firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    const unsub = subscribeToMessages((data) => {
      setMessages(data);
      if (data.length > 0 && !selectedMessage) setSelectedMessage(data[0]);
    });
    return () => unsub();
  }, []);

  const handleSelectMessage = async (m: ContactMessage) => {
    setSelectedMessage(m);
    // Mark as read in Firestore if unread
    if (!m.isRead) {
      try {
        await updateDoc(doc(db, 'contact_messages', m.id), { isRead: true, status: 'read' });
      } catch (e) {
        console.warn('[Mark read error]:', e);
      }
    }
  };

  const unreadCount = messages.filter(m => !m.isRead).length;


  const filtered = messages.filter(
    (m) =>
      m.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.senderEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-3 py-1 rounded-full border border-[#003366]/15">
            COMMUNICATIONS INBOX
          </span>
          <h1 className="font-display text-2xl font-black text-[#0E1726] mt-2">
            Website Contact Enquiries
          </h1>
          <p className="text-xs text-[#475569] font-medium mt-0.5">
            Manage inquiries, corporate ride requests, and customer feedback.
          </p>
        </div>
        {unreadCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#003366]/10 border border-[#003366]/20">
            <span className="w-2 h-2 rounded-full bg-[#003366] animate-pulse" />
            <span className="text-xs font-black text-[#003366]">{unreadCount} Unread</span>
          </div>
        )}
      </div>

      {/* Inbox Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl border border-[#0B192C]/10 shadow-sm overflow-hidden p-6">
        {/* Left Message List */}
        <div className="lg:col-span-5 border-r border-slate-100 pr-4 space-y-4">
          <div className="flex items-center gap-3 bg-[#F4F6F9] border border-slate-300 rounded-2xl px-3.5 py-2.5">
            <Search className="w-4 h-4 text-[#003366] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full bg-transparent font-medium text-[#0E1726] focus:outline-none placeholder:text-slate-400 text-xs"
            />
          </div>

          <div className="space-y-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs font-bold">No messages in inbox.</div>
            ) : (
              filtered.map((m) => (
                <div
                  key={m.id}
                  onClick={() => handleSelectMessage(m)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1 ${
                    selectedMessage?.id === m.id
                      ? 'bg-[#003366] text-white border-[#003366]'
                      : 'bg-[#F4F6F9] hover:bg-slate-100 text-[#0E1726] border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-extrabold text-xs block flex-1 truncate">{m.senderName}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {!m.isRead && selectedMessage?.id !== m.id && (
                        <span className="w-2 h-2 rounded-full bg-[#003366]" />
                      )}
                      <span className="text-[10px] opacity-75">{new Date(m.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className="font-bold text-xs block truncate">{m.subject || 'General Enquiry'}</span>
                  <p className="text-[11px] opacity-80 line-clamp-1 font-normal">{m.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-7 pl-2 space-y-5">
          {selectedMessage ? (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-4 space-y-2">
                <span className="text-[10px] font-black uppercase text-[#003366] bg-[#003366]/10 px-2.5 py-1 rounded-full">
                  {selectedMessage.status} MESSAGE
                </span>
                <h2 className="font-display text-xl font-black text-[#0E1726]">{selectedMessage.subject}</h2>
                <div className="flex flex-wrap items-center gap-4 text-slate-600 font-medium">
                  <span className="flex items-center gap-1 font-bold text-[#0E1726]">
                    <Mail className="w-3.5 h-3.5 text-[#003366]" /> {selectedMessage.senderEmail}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-[#0E1726]">
                    <Phone className="w-3.5 h-3.5 text-[#003366]" /> {selectedMessage.senderPhone}
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F4F6F9] border border-slate-200 text-sm font-medium leading-relaxed text-[#0E1726] whitespace-pre-wrap">
                {selectedMessage.message}
              </div>

              {/* Reply Box */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="font-extrabold text-[#0E1726]">Send Official Response via Email</h4>
                <textarea
                  rows={4}
                  placeholder={`Write response email to ${selectedMessage.senderEmail}...`}
                  className="w-full p-3.5 rounded-2xl bg-[#F4F6F9] border border-slate-300 font-medium text-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => alert(`Reply sent to ${selectedMessage.senderEmail}`)}
                  className="px-5 py-3 rounded-xl bg-[#0B192C] hover:bg-[#003366] text-white font-black uppercase text-xs tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4 text-[#9BC800]" />
                  <span>Send Response</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-slate-400 font-bold text-xs">
              Select a message from the left list to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
