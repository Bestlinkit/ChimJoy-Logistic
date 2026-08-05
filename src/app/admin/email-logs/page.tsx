'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, RefreshCw, CheckCircle2, AlertCircle, Clock, Filter, Search, RotateCcw } from 'lucide-react';
import { db } from '@/lib/firebase/config';
import { collection, query, orderBy, limit, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { EmailLogRecord } from '@/lib/email/types';
import { GlassCard } from '@/components/ui/glass-card';
import { LuxuryBadge } from '@/components/ui/luxury-badge';

export default function AdminEmailLogsPage() {
  const [logs, setLogs] = useState<EmailLogRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isRetryingId, setIsRetryingId] = useState<string | null>(null);

  useEffect(() => {
    const logsRef = collection(db, 'emailLogs');
    const q = query(logsRef, orderBy('createdAt', 'desc'), limit(50));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const list: EmailLogRecord[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<EmailLogRecord, 'id'>),
        }));
        setLogs(list);
      },
      (err) => {
        console.error('[Admin Email Logs Error]:', err);
      }
    );

    return () => unsub();
  }, []);

  const handleRetryEmail = async (logItem: EmailLogRecord) => {
    if (!logItem.id) return;
    setIsRetryingId(logItem.id);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: logItem.recipient,
          subject: logItem.subject,
          template: logItem.template,
          text: `Manual retry for ${logItem.subject}`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        await updateDoc(doc(db, 'emailLogs', logItem.id), {
          status: 'sent',
          attemptCount: (logItem.attemptCount || 1) + 1,
          updatedAt: new Date().toISOString(),
        });
        alert('✓ Email successfully re-sent!');
      } else {
        alert(`Retry failed: ${data.error}`);
      }
    } catch (err: any) {
      console.error('[Retry Exception]:', err);
      alert(`Retry Exception: ${err.message}`);
    } finally {
      setIsRetryingId(null);
    }
  };

  const filteredLogs = logs.filter((item) => {
    const matchesSearch =
      item.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.template.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 sm:p-6 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#9BC800] block mb-1">
            ENTERPRISE EMAIL LOGS & AUDIT TRAIL
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-black">Transactional Email Audit Log</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#9BC800]" />
            <span>Total Logged: {logs.length}</span>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <GlassCard variant="dark" className="p-4 sm:p-6 border border-white/15">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by recipient email, subject, or template..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-medium focus:outline-none focus:border-[#9BC800]"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-[#9BC800]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-bold focus:outline-none focus:border-[#9BC800]"
            >
              <option value="all" className="bg-[#0B192C]">All Statuses</option>
              <option value="sent" className="bg-[#0B192C]">Sent</option>
              <option value="failed" className="bg-[#0B192C]">Failed</option>
              <option value="queued" className="bg-[#0B192C]">Queued</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* Table */}
      <GlassCard variant="dark" className="p-0 border border-white/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-white/5 border-b border-white/10 uppercase text-[10px] font-black tracking-wider text-slate-400">
              <tr>
                <th className="p-4">Recipient</th>
                <th className="p-4">Template</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Status</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 font-medium">
              {filteredLogs.map((item) => (
                <tr key={item.id || item.createdAt} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold text-white">{item.recipient}</td>
                  <td className="p-4 text-[#9BC800] font-mono">{item.template}</td>
                  <td className="p-4 truncate max-w-xs">{item.subject}</td>
                  <td className="p-4">
                    <LuxuryBadge variant={item.status === 'sent' ? 'emerald' : item.status === 'failed' ? 'dark' : 'gold'}>
                      {item.status}
                    </LuxuryBadge>
                  </td>
                  <td className="p-4 text-slate-400">{new Date(item.createdAt).toLocaleString()}</td>
                  <td className="p-4 text-right">
                    {item.status === 'failed' && (
                      <button
                        onClick={() => handleRetryEmail(item)}
                        disabled={isRetryingId === item.id}
                        className="px-3 py-1.5 bg-[#9BC800] hover:bg-[#8ab300] text-[#0B192C] font-black text-[11px] rounded-lg transition-all flex items-center gap-1.5 ml-auto cursor-pointer disabled:opacity-50"
                      >
                        <RotateCcw className={`w-3 h-3 ${isRetryingId === item.id ? 'animate-spin' : ''}`} />
                        <span>{isRetryingId === item.id ? 'Retrying...' : 'Retry'}</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400 font-medium">
                    No email audit logs found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
