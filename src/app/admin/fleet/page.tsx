'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Plus, Search, Edit, Trash2, ShieldCheck, CheckCircle2, XCircle, Wrench, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { subscribeToFleet, saveVehicleToDb, deleteVehicleFromDb } from '@/lib/firebase/services/admin-db-service';
import { logAdminAction } from '@/lib/firebase/services/admin-audit-service';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { uploadVehicleImage } from '@/lib/firebase/services/storage-service';
import { Vehicle } from '@/types';
import { MOCK_VEHICLES } from '@/lib/mock-data';

export default function AdminFleetPage() {
  const { adminUser } = useAdminAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Partial<Vehicle> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsub = subscribeToFleet((data) => {
      setVehicles(data);
      if (data.length === 0) {
        MOCK_VEHICLES.forEach((v) => {
          saveVehicleToDb(v as any).catch(() => null);
        });
      }
    });
    return () => unsub();
  }, []);

  const handleSyncFleet = async () => {
    setIsSubmitting(true);
    try {
      for (const v of MOCK_VEHICLES) {
        await saveVehicleToDb(v as any);
      }
      alert('✓ Authentic fleet vehicles synced successfully!');
    } catch (err: any) {
      alert(`Sync Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingVehicle({
      name: '',
      categoryName: 'SUVs',
      categoryId: 'cat-suv',
      image: '',
      coverImage: '',
      pricePerDay: 85000,
      passengers: 7,
      luggage: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      features: ['Chauffeur Included', 'Air Conditioning', 'Leather Seats', 'Full Tint'],
      description: 'Executive vehicle for transport across Owerri and South-East Nigeria.',
      isAvailable: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (v: Vehicle) => {
    setEditingVehicle(v);
    setIsModalOpen(true);
  };

  const handleSaveVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle || !editingVehicle.name) return;
    setIsSubmitting(true);

    try {
      const docId = await saveVehicleToDb(editingVehicle);
      if (adminUser) {
        await logAdminAction(
          adminUser.email,
          adminUser.role,
          editingVehicle.id ? 'UPDATE_VEHICLE' : 'CREATE_VEHICLE',
          'Fleet',
          `Saved vehicle ${editingVehicle.name} (${docId})`
        ).catch(() => {});
      }
      alert('✓ Vehicle saved successfully!');
      setIsModalOpen(false);
      setEditingVehicle(null);
    } catch (err: any) {
      console.error('[Save Vehicle Error]:', err);
      alert(`[FIRESTORE WRITE FAILED] Code: ${err.code || 'UNKNOWN'}\nMessage: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (vehicle: Vehicle) => {
    if (!adminUser || !confirm(`Are you sure you want to delete ${vehicle.name}?`)) return;
    try {
      await deleteVehicleFromDb(vehicle.id);
      await logAdminAction(adminUser.email, adminUser.role, 'DELETE_VEHICLE', 'Fleet', `Deleted vehicle ${vehicle.name}`);
    } catch (err) {
      console.error('[Delete Error]:', err);
    }
  };

  const itemsPerPage = 9;
  const filteredVehicles = vehicles.filter(
    (v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.categoryName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredVehicles.length / itemsPerPage));
  const paginatedVehicles = filteredVehicles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-3 py-1 rounded-full border border-[#003366]/15">
            FLEET & ASSET MANAGEMENT
          </span>
          <h1 className="font-display text-2xl font-black text-[#0E1726] mt-2">
            Vehicle Fleet Manager
          </h1>
          <p className="text-xs text-[#475569] font-medium mt-0.5">
            Add, update pricing, toggle availability, and control published status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSyncFleet}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-xl bg-[#0B192C] hover:bg-[#003366] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer border border-white/10 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-[#9BC800] ${isSubmitting ? 'animate-spin' : ''}`} />
            <span>Sync Authentic Vehicles</span>
          </button>
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-xl bg-[#9BC800] hover:bg-[#8ab300] text-[#0B192C] text-xs font-black uppercase tracking-wider shadow-lemon flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Vehicle</span>
          </button>
        </div>
      </div>

      {/* Search & Grid Stats */}
      <div className="bg-white p-4 rounded-3xl border border-[#0B192C]/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 bg-[#F4F6F9] border border-slate-300 rounded-2xl px-3.5 py-2.5 w-full sm:w-80">
          <Search className="w-4 h-4 text-[#003366] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search fleet by name or category..."
            className="w-full bg-transparent font-medium text-[#0E1726] focus:outline-none placeholder:text-slate-400 text-xs"
          />
        </div>

        <div className="flex items-center gap-3 text-xs font-extrabold text-[#0E1726]">
          <span>Total: <strong>{vehicles.length}</strong></span>
          <span>Available: <strong className="text-emerald-600">{vehicles.filter((v) => v.isAvailable).length}</strong></span>
        </div>
      </div>

      {/* Vehicle Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedVehicles.map((v) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-[#0B192C]/10 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all"
          >
            <div>
              <div className="relative h-48 w-full bg-[#0B192C]">
                <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3">
                  {v.isAvailable ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500 text-white font-black text-[10px] uppercase shadow">
                      Available
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-white font-black text-[10px] uppercase shadow">
                      On Hire / Maintenance
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <span className="text-[10px] font-black text-[#9BC800] bg-[#0B192C] px-2.5 py-1 rounded-full uppercase">
                  {v.categoryName || 'SUV'}
                </span>
                <h3 className="font-display text-lg font-black text-[#0E1726]">
                  {v.name}
                </h3>
                <p className="text-xs text-[#475569] font-medium line-clamp-2">
                  {v.description}
                </p>
                <div className="pt-1 flex items-center justify-between border-t border-slate-100 text-xs font-black text-[#003366]">
                  <span>Daily Rate:</span>
                  <span className="text-base text-[#0E1726]">₦{v.pricePerDay.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleOpenEditModal(v)}
                className="px-3 py-1.5 rounded-xl bg-[#003366] hover:bg-[#0B192C] text-white text-xs font-extrabold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Vehicle</span>
              </button>

              <button
                type="button"
                onClick={() => handleDelete(v)}
                className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                title="Delete Vehicle"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#0B192C]/10 shadow-sm flex items-center justify-between text-xs font-bold text-slate-600">
        <span>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> ({filteredVehicles.length} Total Vehicles)
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 cursor-pointer font-bold"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3.5 py-2 rounded-xl bg-[#003366] text-white hover:bg-[#0B192C] disabled:opacity-40 cursor-pointer font-bold"
          >
            Next
          </button>
        </div>
      </div>

      {/* EDIT / ADD VEHICLE MODAL */}
      <AnimatePresence>
        {isModalOpen && editingVehicle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-3xl p-6 border border-[#0B192C]/15 shadow-2xl w-full max-w-lg space-y-4 z-10 text-[#0E1726] my-8"
            >
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-display text-xl font-black text-[#0E1726]">
                  {editingVehicle.id ? 'Edit Vehicle Details' : 'Add New Fleet Vehicle'}
                </h3>
              </div>

              <form onSubmit={handleSaveVehicle} className="space-y-4 text-xs max-h-[70vh] overflow-y-auto pr-1 custom-scrollbar">
                <div className="space-y-1">
                  <label className="font-extrabold text-[#0E1726]">Vehicle Name & Model</label>
                  <input
                    type="text"
                    required
                    value={editingVehicle.name || ''}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, name: e.target.value })}
                    placeholder="Toyota Land Cruiser Prado TX-L"
                    className="w-full p-3 rounded-xl bg-[#F4F6F9] border border-slate-300 font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-extrabold text-[#0E1726]">Category Name</label>
                    <select
                      value={editingVehicle.categoryName || 'SUVs'}
                      onChange={(e) => setEditingVehicle({ ...editingVehicle, categoryName: e.target.value })}
                      className="w-full p-3 rounded-xl bg-[#F4F6F9] border border-slate-300 font-bold"
                    >
                      <option value="Economy">Economy</option>
                      <option value="SUVs">SUVs</option>
                      <option value="Executive Cars">Executive Cars</option>
                      <option value="Luxury Vehicles">Luxury Vehicles</option>
                      <option value="Mini Bus / HiAce">Mini Bus / HiAce</option>
                      <option value="Logistics Vans">Logistics Vans</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-extrabold text-[#0E1726]">Daily Rate (₦)</label>
                    <input
                      type="number"
                      required
                      value={editingVehicle.pricePerDay || 85000}
                      onChange={(e) => setEditingVehicle({ ...editingVehicle, pricePerDay: Number(e.target.value) })}
                      className="w-full p-3 rounded-xl bg-[#F4F6F9] border border-slate-300 font-bold"
                    />
                  </div>
                </div>

                {/* Cover Image Upload */}
                <div className="space-y-1.5">
                  <label className="font-extrabold text-[#0E1726]">Cover Image</label>
                  <div className="flex items-center gap-3">
                    {editingVehicle.image || editingVehicle.coverImage ? (
                      <img
                        src={editingVehicle.image || editingVehicle.coverImage}
                        alt="Cover Preview"
                        className="w-16 h-12 object-cover rounded-xl border border-slate-300 shrink-0"
                      />
                    ) : null}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const localPreview = URL.createObjectURL(file);
                        setEditingVehicle((prev) => ({
                          ...prev,
                          image: localPreview,
                          coverImage: localPreview,
                        }));
                        try {
                          const tempId = editingVehicle.id || `v_${Date.now()}`;
                          const { downloadURL, storagePath } = await uploadVehicleImage(file, tempId, false);
                          setEditingVehicle((prev) => ({
                            ...prev,
                            image: downloadURL,
                            coverImage: downloadURL,
                            storagePath,
                          }));
                        } catch (err) {
                          console.error('[Upload Error]:', err);
                        }
                      }}
                      className="w-full text-xs font-bold bg-[#F4F6F9] p-2.5 rounded-xl border border-slate-300 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-black file:bg-[#0B192C] file:text-white cursor-pointer"
                    />
                  </div>
                </div>

                {/* Multiple Gallery Images Upload */}
                <div className="space-y-1.5">
                  <label className="font-extrabold text-[#0E1726]">Gallery Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={async (e) => {
                      const files = Array.from(e.target.files || []);
                      if (!files.length) return;
                      try {
                        const tempId = editingVehicle.id || `v_${Date.now()}`;
                        const currentGallery = editingVehicle.gallery || [];
                        const uploadedUrls: string[] = [];

                        for (const file of files) {
                          const { downloadURL } = await uploadVehicleImage(file, tempId, true);
                          uploadedUrls.push(downloadURL);
                        }

                        setEditingVehicle((prev) => ({
                          ...prev,
                          gallery: [...currentGallery, ...uploadedUrls],
                        }));
                      } catch (err) {
                        console.error('[Gallery Upload Error]:', err);
                      }
                    }}
                    className="w-full text-xs font-bold bg-[#F4F6F9] p-2.5 rounded-xl border border-slate-300 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-black file:bg-[#003366] file:text-white cursor-pointer"
                  />
                  {editingVehicle.gallery && editingVehicle.gallery.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {editingVehicle.gallery.map((url, idx) => (
                        <div key={idx} className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 group">
                          <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editingVehicle.gallery?.filter((_, i) => i !== idx);
                              setEditingVehicle({ ...editingVehicle, gallery: updated });
                            }}
                            className="absolute inset-0 bg-red-950/70 text-white font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px]"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* YouTube Video Links (Requirement 7) */}
                <div className="space-y-1.5">
                  <label className="font-extrabold text-[#0E1726]">YouTube Video Links (Comma separated URLs)</label>
                  <input
                    type="text"
                    value={(editingVehicle.youtubeVideos || []).join(', ')}
                    onChange={(e) => {
                      const links = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                      setEditingVehicle({ ...editingVehicle, youtubeVideos: links });
                    }}
                    placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ, https://youtu.be/..."
                    className="w-full p-3 rounded-xl bg-[#F4F6F9] border border-slate-300 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-[#0E1726]">Description</label>
                  <textarea
                    rows={3}
                    value={editingVehicle.description || ''}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, description: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#F4F6F9] border border-slate-300 font-bold"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isAvail"
                    checked={editingVehicle.isAvailable ?? true}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, isAvailable: e.target.checked })}
                    className="w-4 h-4 text-[#003366] rounded cursor-pointer"
                  />
                  <label htmlFor="isAvail" className="font-extrabold text-[#0E1726] cursor-pointer">
                    Vehicle Available for Bookings
                  </label>
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
                    {isSubmitting ? 'Saving...' : 'Save'}
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
