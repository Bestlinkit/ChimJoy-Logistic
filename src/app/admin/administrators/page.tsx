'use client';

import React, { useState } from 'react';
import { ShieldCheck, UserPlus, Lock, Shield, CheckCircle2, XCircle } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { AdminRole, AdminUser } from '@/types/admin';

export default function AdminAdministratorsPage() {
  const { adminUser } = useAdminAuth();

  const [adminsList, setAdminsList] = useState<AdminUser[]>([
    {
      uid: 'super-admin-01',
      email: 'chimjoylimited@gmail.com',
      name: 'Super Administrator',
      role: 'Super Admin',
      status: 'Active',
      createdAt: '2025-01-01',
      lastLogin: new Date().toISOString(),
      ipAddress: '127.0.0.1',
    },
    {
      uid: 'admin-02',
      email: 'ayodele@chimjoylogistics.com.ng',
      name: 'Ayodele Dispatch Admin',
      role: 'Admin',
      status: 'Active',
      createdAt: '2025-02-15',
      lastLogin: new Date().toISOString(),
      ipAddress: '102.89.23.14',
    },
  ]);

  if (adminUser?.role !== 'Super Admin') {
    return (
      <div className="bg-red-950/60 p-8 rounded-3xl border border-red-500/30 text-red-200 text-center space-y-2">
        <ShieldCheck className="w-12 h-12 text-red-400 mx-auto" />
        <h2 className="font-display text-xl font-black">Super Admin Access Only</h2>
        <p className="text-xs">Only Super Administrators have permission to manage staff accounts and roles.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-3 py-1 rounded-full border border-[#003366]/15">
            SUPER ADMIN PRIVILEGES
          </span>
          <h1 className="font-display text-2xl font-black text-[#0E1726] mt-2">
            Administrator Account Management
          </h1>
          <p className="text-xs text-[#475569] font-medium mt-0.5">
            Manage admin users, assign roles (Super Admin, Admin, Operations Staff), and inspect login IPs.
          </p>
        </div>

        <button
          onClick={() => alert('To invite a new admin, enter their email address and set their role.')}
          className="px-4 py-2.5 rounded-xl bg-[#9BC800] hover:bg-[#8ab300] text-[#0B192C] text-xs font-black uppercase tracking-wider shadow-lemon flex items-center gap-2 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite New Admin</span>
        </button>
      </div>

      {/* Admin Table */}
      <div className="bg-white rounded-3xl border border-[#0B192C]/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0B192C] text-white uppercase text-[10px] tracking-wider font-extrabold">
                <th className="p-4">Administrator</th>
                <th className="p-4">Email</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Last Login</th>
                <th className="p-4">IP Address</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {adminsList.map((a) => (
                <tr key={a.uid} className="hover:bg-slate-50">
                  <td className="p-4 font-black text-[#0E1726]">{a.name}</td>
                  <td className="p-4 font-bold text-slate-700">{a.email}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-[#003366]/15 text-[#003366] font-black text-[10px] uppercase">
                      {a.role}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 font-semibold">{a.lastLogin ? new Date(a.lastLogin).toLocaleString() : 'N/A'}</td>
                  <td className="p-4 font-mono text-slate-600">{a.ipAddress || '127.0.0.1'}</td>
                  <td className="p-4 font-bold text-emerald-700">{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
