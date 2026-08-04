'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, Plus, Search, Phone, Shield, Star, Edit, Trash2, Award } from 'lucide-react';
import { subscribeToDrivers, saveDriverToDb } from '@/lib/firebase/services/admin-db-service';
import { logAdminAction } from '@/lib/firebase/services/admin-audit-service';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { AdminDriver } from '@/types/admin';

export default function AdminDriversPage() {
  const { adminUser } = useAdminAuth();
  const [drivers, setDrivers] = useState<AdminDriver[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Partial<AdminDriver> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsub = subscribeToDrivers((data) => setDrivers(data));
    return () => unsub();
  }, []);

  const handleOpenAddModal = () => {
    setEditingDriver({
      name: '',
      phone: '+234 ',
      licenseNumber: 'IMO-DRV-',
      licenseExpiry: '2028-12-31',
      status: 'Available',
      rating: 5.0,
      completedTripsCount: 0,
      employmentStatus: 'Full Time',
      emergencyContact: '+234 ',
    });
    setIsModalOpen(true);
  };

  const handleSaveDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDriver || !adminUser) return;
    setIsSubmitting(true);

    try {
      const docId = await saveDriverToDb(editingDriver);
      await logAdminAction(
        adminUser.email,
        adminUser.role,
        editingDriver.id ? 'UPDATE_DRIVER' : 'CREATE_DRIVER',
        'Drivers',
        `Saved driver ${editingDriver.name} (${docId})`
      );
      setIsModalOpen(false);
      setEditingDriver(null);
    } catch (err) {
      console.error('[Save Driver Error]:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = drivers.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#003366] bg-[#003066]/10 px-3 py-1 rounded-full border border-[#003366]/15">
            CHAUFFEUR MANAGEMENT
          </span>
          <h1 className="font-display text-2xl font-black text-[#0E1726] mt-2">
            Driver & Chchauffeur Roster
          </h1>
          <p className="text-xs text-[#475569] font-medium mt-0.5">
            Manage executive drivers, license validity, assigned vehicles, and performance ratings.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-[#9BC800] hover:bg-[#8ab300] text-[#0B192C] text-xs font-black uppercase tracking-wider shadow-lemon flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Driver</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#0B192C]/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 bg-[#F4F6F9] border border-slate-300 rounded-2xl px-3.5 py-2.5 w-full sm:w-80">
          <Search className="w-4 h-4 text-[#003366] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search driver by name, phone, license..."
            className="w-full bg-transparent font-medium text-[#0E1726] focus:outline-none placeholder:text-slate-400 text-xs"
          />
        </div>

        <span className="text-xs font-bold text-[#003366] bg-[#003366]/10 px-3.5 py-2 rounded-xl">
          Total Drivers: <strong>{drivers.length}</strong>
        </span>
      </div>

      {/* Driver Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((d) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm space-y-4 hover:shadow-md transition-all relative"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0B192C] text-[#9BC800] font-black flex items-center justify-center text-lg shadow">
                  {d.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-display text-base font-extrabold text-[#0E1726]">{d.name}</h3>
                  <span className="text-[11px] font-bold text-slate-500">{d.phone}</span>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                  d.status === 'Available'
                    ? 'bg-emerald-500/15 text-emerald-700'
                    : d.status === 'On Trip'
                    ? 'bg-purple-500/15 text-purple-700'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {d.status}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 font-medium pt-2 border-t border-slate-100">
              <div className="flex justify-between">
                <span>License Number:</span>
                <strong className="text-[#0E1726] font-mono">{d.licenseNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span>License Expiry:</span>
                <strong className="text-[#0E1726]">{d.licenseExpiry}</strong>
              </div>
              <div className="flex justify-between">
                <span>Completed Trips:</span>
                <strong className="text-[#003366]">{d.completedTripsCount || 0} Trips</strong>
              </div>
              <div className="flex justify-between">
                <span>Driver Rating:</span>
                <span className="font-black text-amber-600 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" /> {d.rating || 5.0} / 5.0
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                {d.employmentStatus}
              </span>
              <button
                type="button"
                onClick={() => {
                  setEditingDriver(d);
                  setIsModalOpen(true);
                }}
                className="p-2 rounded-xl bg-slate-100 hover:bg-[#003366] hover:text-white transition-colors text-xs font-bold flex items-center gap-1"
              >
                <Edit className="w-3.5 h-3.5" /> Edit Profile
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ADD / EDIT DRIVER MODAL */}
      <AnimatePresence>
        {isModalOpen && editingDriver && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-3xl p-6 border border-[#0B192C]/15 shadow-2xl w-full max-w-md space-y-4 z-10 text-[#0E1726]"
            >
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-display text-xl font-black text-[#0E1726]">
                  {editingDriver.id ? 'Edit Driver Details' : 'Register New Chauffeur Driver'}
                </h3>
              </div>

              <form onSubmit={handleSaveDriver} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-extrabold text-[#0E1726]">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editingDriver.name || ''}
                    onChange={(e) => setEditingDriver({ ...editingDriver, name: e.target.value })}
                    placeholder="Chinedu Okeke"
                    className="w-full p-3 rounded-xl bg-[#F4F6F9] border border-slate-300 font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-extrabold text-[#0E1726]">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={editingDriver.phone || ''}
                      onChange={(e) => setEditingDriver({ ...editingDriver, phone: e.target.value })}
                      placeholder="+234 807 788 0262"
                      className="w-full p-3 rounded-xl bg-[#F4F6F9] border border-slate-300 font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-extrabold text-[#0E1726]">Status</label>
                    <select
                      value={editingDriver.status || 'Available'}
                      onChange={(e) => setEditingDriver({ ...editingDriver, status: e.target.value as any })}
                      className="w-full p-3 rounded-xl bg-[#F4F6F9] border border-slate-300 font-bold"
                    >
                      <option value="Available">Available</option>
                      <option value="On Trip">On Trip</option>
                      <option value="Off Duty">Off Duty</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-extrabold text-[#0E1726]">License Number</label>
                    <input
                      type="text"
                      required
                      value={editingDriver.licenseNumber || ''}
                      onChange={(e) => setEditingDriver({ ...editingDriver, licenseNumber: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#F4F6F9] border border-slate-300 font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-extrabold text-[#0E1726]">License Expiry</label>
                    <input
                      type="date"
                      required
                      value={editingDriver.licenseExpiry || ''}
                      onChange={(e) => setEditingDriver({ ...editingDriver, licenseExpiry: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#F4F6F9] border border-slate-300 font-bold"
                    />
                  </div>
                </div>

                <div className="pt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-1/2 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0E1726] font-extrabold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-1/2 py-3 rounded-xl bg-[#0B192C] hover:bg-[#003366] text-white font-black cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? 'Saving...' : 'Save to Firestore'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
