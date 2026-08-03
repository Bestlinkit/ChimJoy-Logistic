'use client';

import React, { useState, useEffect } from 'react';
import { Car, Plus, Edit3, Trash2, Check, Users, Briefcase, Star } from 'lucide-react';
import { Vehicle } from '@/types';
import { getVehicles, saveVehicle, deleteVehicle } from '@/lib/firebase/services/fleet-service';
import { formatCurrency } from '@/lib/utils';
import { GlassCard } from '@/components/ui/glass-card';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { LuxuryBadge } from '@/components/ui/luxury-badge';
import { ModalDrawer } from '@/components/ui/modal-drawer';

export default function AdminFleetManagerPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Partial<Vehicle>>({
    name: '',
    brand: '',
    model: '',
    year: 2024,
    category: 'rental',
    categoryName: 'Luxury SUV',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    passengers: 5,
    luggage: 4,
    transmission: 'Automatic',
    pricePerDay: 100000,
    isAvailable: true,
    isFeatured: true,
    maintenanceStatus: 'Active',
    description: '',
  });

  useEffect(() => {
    loadFleet();
  }, []);

  const loadFleet = async () => {
    const data = await getVehicles();
    setVehicles(data);
  };

  const handleOpenAddModal = () => {
    setEditingVehicle({
      id: `v_${Date.now()}`,
      name: '',
      brand: '',
      model: '',
      year: 2024,
      category: 'rental',
      categoryName: 'Executive SUV',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      passengers: 4,
      luggage: 3,
      transmission: 'Automatic',
      amenities: ['Chauffeur Included', 'Full AC'],
      pricePerDay: 120000,
      isAvailable: true,
      isFeatured: true,
      maintenanceStatus: 'Active',
      displayOrder: vehicles.length + 1,
      description: 'Handcrafted executive vehicle.',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (v: Vehicle) => {
    setEditingVehicle(v);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle.name || !editingVehicle.pricePerDay) return;
    await saveVehicle(editingVehicle as Vehicle);
    setIsModalOpen(false);
    loadFleet();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this vehicle from CMS?')) {
      await deleteVehicle(id);
      loadFleet();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold">Fleet CMS & Inventory</h2>
          <p className="text-xs text-slate-400">Add, edit rates, toggle availability, and update vehicle specs.</p>
        </div>
        <LuxuryButton variant="gold" size="sm" onClick={handleOpenAddModal} icon={<Plus className="w-4 h-4" />}>
          Add New Vehicle
        </LuxuryButton>
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((v) => (
          <GlassCard key={v.id} variant="dark" className="p-0 overflow-hidden border border-white/15">
            <div className="relative h-48 w-full bg-slate-900">
              <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <LuxuryBadge variant="gold" className="bg-slate-950/80">
                  {v.categoryName}
                </LuxuryBadge>
              </div>
              <div className="absolute top-3 right-3">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                  v.isAvailable ? 'bg-emerald-500/80 text-white' : 'bg-red-500/80 text-white'
                }`}>
                  {v.isAvailable ? 'Available' : 'Reserved'}
                </span>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <h3 className="font-display text-lg font-bold text-white">{v.name}</h3>
                <span className="text-base font-extrabold text-[#F5D061]">{formatCurrency(v.pricePerDay)}/day</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#D4AF37]" /> {v.passengers} Pass</span>
                <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-[#06D6A0]" /> {v.luggage} Bags</span>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => handleOpenEditModal(v)}
                  className="px-3 py-1.5 bg-[#00509D] hover:bg-blue-600 text-white rounded-lg font-bold text-xs flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit CMS
                </button>
                <button
                  onClick={() => handleDelete(v.id)}
                  className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* EDIT/ADD VEHICLE MODAL */}
      <ModalDrawer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingVehicle.id ? 'Edit Vehicle Specifications' : 'Add New Fleet Vehicle'}
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs text-slate-900">
          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-slate-700">Vehicle Name</label>
            <input
              type="text"
              required
              value={editingVehicle.name || ''}
              onChange={(e) => setEditingVehicle({ ...editingVehicle, name: e.target.value })}
              placeholder="e.g. Toyota Prado TX-L"
              className="w-full p-3 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-[#00509D]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider text-slate-700">Brand</label>
              <input
                type="text"
                value={editingVehicle.brand || ''}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, brand: e.target.value })}
                placeholder="e.g. Toyota"
                className="w-full p-3 border border-slate-300 rounded-xl font-medium focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider text-slate-700">Category Tag</label>
              <input
                type="text"
                value={editingVehicle.categoryName || ''}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, categoryName: e.target.value })}
                placeholder="e.g. Executive SUV"
                className="w-full p-3 border border-slate-300 rounded-xl font-medium focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider text-slate-700">Daily Rate (₦ NGN)</label>
              <input
                type="number"
                required
                value={editingVehicle.pricePerDay || 0}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, pricePerDay: Number(e.target.value) })}
                className="w-full p-3 border border-slate-300 rounded-xl font-medium focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider text-slate-700">Airport Flat Rate (₦ NGN)</label>
              <input
                type="number"
                value={editingVehicle.airportFlatRate || 0}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, airportFlatRate: Number(e.target.value) })}
                className="w-full p-3 border border-slate-300 rounded-xl font-medium focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-slate-700">Image Asset URL</label>
            <input
              type="text"
              value={editingVehicle.image || ''}
              onChange={(e) => setEditingVehicle({ ...editingVehicle, image: e.target.value })}
              className="w-full p-3 border border-slate-300 rounded-xl font-medium focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-slate-700">Description</label>
            <textarea
              rows={2}
              value={editingVehicle.description || ''}
              onChange={(e) => setEditingVehicle({ ...editingVehicle, description: e.target.value })}
              className="w-full p-3 border border-slate-300 rounded-xl font-medium focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 font-bold cursor-pointer">
              <input
                type="checkbox"
                checked={editingVehicle.isAvailable || false}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, isAvailable: e.target.checked })}
                className="w-4 h-4 accent-[#06D6A0]"
              />
              <span>Available for Hire</span>
            </label>

            <label className="flex items-center gap-2 font-bold cursor-pointer">
              <input
                type="checkbox"
                checked={editingVehicle.isFeatured || false}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, isFeatured: e.target.checked })}
                className="w-4 h-4 accent-[#D4AF37]"
              />
              <span>Feature on Homepage</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#00509D] hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl"
            >
              Save Vehicle to CMS
            </button>
          </div>
        </form>
      </ModalDrawer>
    </div>
  );
}
