'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Search, Mail, Phone, Send, Trash2, CheckSquare, Square, ChevronLeft, ChevronRight } from 'lucide-react';
import { subscribeToMessages } from '@/lib/firebase/services/admin-db-service';
import { ContactMessage } from '@/types/admin';
import { db } from '@/lib/firebase/config';
import { doc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { LuxuryButton } from '@/components/ui/luxury-button';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // Pagination & Bulk Select State
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);
  const itemsPerPage = 10;

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

  const toggleSelectId = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === paginatedMessages.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedMessages.map(m => m.id)));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedIds.size} message(s)?`);
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const batch = writeBatch(db);
      selectedIds.forEach(id => {
        batch.delete(doc(db, 'contact_messages', id));
      });
      await batch.commit();
      
      setSelectedIds(new Set());
      if (selectedMessage && selectedIds.has(selectedMessage.id)) {
        setSelectedMessage(null);
      }
    } catch (e) {
      console.error('[Bulk Delete Error]:', e);
      alert('Failed to delete messages.');
    } finally {
      setIsDeleting(false);
    }
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  const filtered = messages.filter(
    (m) =>
      m.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.senderEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedMessages = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset page if search changes
  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds(new Set());
  }, [searchQuery]);

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
        <div className="lg:col-span-5 border-r border-slate-100 pr-4 flex flex-col h-[70vh]">
          {/* Search & Bulk Actions */}
          <div className="space-y-3 mb-4">
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

            {/* Bulk Action Bar */}
            <div className="flex items-center justify-between px-2 py-1">
              <button 
                onClick={handleSelectAll}
                className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#003366] transition-colors"
                disabled={paginatedMessages.length === 0}
              >
                {selectedIds.size > 0 && selectedIds.size === paginatedMessages.length ? (
                  <CheckSquare className="w-4 h-4 text-[#003366]" />
                ) : (
                  <Square className="w-4 h-4" />
                )}
                <span>Select All on Page</span>
              </button>

              {selectedIds.size > 0 && (
                <button
                  onClick={handleBulkDelete}
                  disabled={isDeleting}
                  className="flex items-center gap-1.5 text-[10px] font-black uppercase text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {isDeleting ? 'Deleting...' : `Delete (${selectedIds.size})`}
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2 overflow-y-auto custom-scrollbar flex-1 pr-1">
            {paginatedMessages.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs font-bold">No messages in inbox.</div>
            ) : (
              paginatedMessages.map((m) => (
                <div
                  key={m.id}
                  onClick={() => handleSelectMessage(m)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1 relative group ${
                    selectedMessage?.id === m.id
                      ? 'bg-[#003366] text-white border-[#003366]'
                      : 'bg-[#F4F6F9] hover:bg-slate-100 text-[#0E1726] border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button 
                      onClick={(e) => toggleSelectId(e, m.id)}
                      className="mt-0.5 text-slate-400 hover:text-[#003366] shrink-0"
                    >
                      {selectedIds.has(m.id) ? (
                        <CheckSquare className={`w-4 h-4 ${selectedMessage?.id === m.id ? 'text-white' : 'text-[#003366]'}`} />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-extrabold text-xs block flex-1 truncate">{m.senderName}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {!m.isRead && selectedMessage?.id !== m.id && (
                            <span className="w-2 h-2 rounded-full bg-[#003366]" />
                          )}
                          <span className={`text-[10px] opacity-75 ${selectedMessage?.id === m.id ? 'text-white' : 'text-slate-500'}`}>
                            {new Date(m.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-xs block truncate mt-0.5">{m.subject || 'General Enquiry'}</span>
                      <p className="text-[11px] opacity-80 line-clamp-1 font-normal mt-1">{m.message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-black uppercase text-slate-500">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-7 pl-2 space-y-5 flex flex-col h-[70vh] overflow-y-auto custom-scrollbar">
          {selectedMessage ? (
            <div className="space-y-4 text-xs pr-4">
              <div className="border-b border-slate-100 pb-4 space-y-2">
                <span className="text-[10px] font-black uppercase text-[#003366] bg-[#003366]/10 px-2.5 py-1 rounded-full">
                  {selectedMessage.status} MESSAGE
                </span>
                <h2 className="font-display text-xl font-black text-[#0E1726]">{selectedMessage.subject || 'General Enquiry'}</h2>
                <div className="flex flex-wrap items-center gap-4 text-slate-600 font-medium pt-1">
                  <span className="flex items-center gap-1 font-bold text-[#0E1726]">
                    <Mail className="w-3.5 h-3.5 text-[#003366]" /> {selectedMessage.senderEmail || 'No email provided'}
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
                  placeholder={`Write response email to ${selectedMessage.senderEmail || 'Customer'}...`}
                  className="w-full p-3.5 rounded-2xl bg-[#F4F6F9] border border-slate-300 font-medium text-xs focus:outline-none"
                  disabled={!selectedMessage.senderEmail}
                />
                <button
                  type="button"
                  disabled={!selectedMessage.senderEmail}
                  onClick={() => alert(`Reply sent to ${selectedMessage.senderEmail}`)}
                  className="px-5 py-3 rounded-xl bg-[#0B192C] hover:bg-[#003366] text-white font-black uppercase text-xs tracking-wider flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 text-[#9BC800]" />
                  <span>Send Response</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-slate-400 font-bold text-xs h-full flex items-center justify-center">
              Select a message from the left list to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

