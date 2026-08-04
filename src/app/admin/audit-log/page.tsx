'use client';

import React, { useState, useEffect } from 'react';
import { History, ShieldCheck, Search, Filter, Terminal, User } from 'lucide-react';
import { subscribeToAuditLogs } from '@/lib/firebase/services/admin-audit-service';
import { AuditLog } from '@/types/admin';

export default function AdminAuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsub = subscribeToAuditLogs(100, (data) => setLogs(data));
    return () => unsub();
  }, []);

  const filtered = logs.filter(
    (l) =>
      l.adminEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-3 py-1 rounded-full border border-[#003366]/15">
            IMMUTABLE SECURITY AUDIT
          </span>
          <h1 className="font-display text-2xl font-black text-[#0E1726] mt-2">
            System Audit & Activity Logs
          </h1>
          <p className="text-xs text-[#475569] font-medium mt-0.5">
            Permanent, unalterable record of administrative actions, status updates, and configuration edits.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#0B192C]/10 shadow-sm flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 bg-[#F4F6F9] border border-slate-300 rounded-2xl px-3.5 py-2.5 w-full sm:w-80">
          <Search className="w-4 h-4 text-[#003366] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search audit logs by admin email, action, details..."
            className="w-full bg-transparent font-medium text-[#0E1726] focus:outline-none placeholder:text-slate-400 text-xs"
          />
        </div>
        <span className="text-xs font-bold text-[#003366] bg-[#003366]/10 px-3.5 py-2 rounded-xl">
          Total Logs: <strong>{logs.length}</strong>
        </span>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-3xl border border-[#0B192C]/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0B192C] text-white uppercase text-[10px] tracking-wider font-extrabold">
                <th className="p-4">Timestamp</th>
                <th className="p-4">Administrator</th>
                <th className="p-4">Role</th>
                <th className="p-4">Action</th>
                <th className="p-4">Module</th>
                <th className="p-4">Details</th>
                <th className="p-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-bold">
                    No security audit logs found.
                  </td>
                </tr>
              ) : (
                filtered.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50 font-mono">
                    <td className="p-4 text-slate-500 font-bold">{new Date(l.timestamp).toLocaleString()}</td>
                    <td className="p-4 font-black text-[#003366]">{l.adminEmail}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded bg-slate-100 text-[#0E1726] font-bold text-[10px]">
                        {l.adminRole}
                      </span>
                    </td>
                    <td className="p-4 font-black text-[#0E1726]">{l.action}</td>
                    <td className="p-4 text-slate-700">{l.module}</td>
                    <td className="p-4 text-slate-600 font-sans">{l.details}</td>
                    <td className="p-4 text-slate-400 font-bold">{l.ipAddress || '127.0.0.1'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
