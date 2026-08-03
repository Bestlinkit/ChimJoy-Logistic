'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plus, Trash2, CheckCircle2, Home, Building2, Hotel, Plane } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { SavedLocation } from '@/types';

export default function SavedLocationsPage() {
  const [locations, setLocations] = useState<SavedLocation[]>([
    { id: 'loc_1', label: 'Home', title: 'Residence in Owerri', address: 'Plot 45 Executive Estate, New Owerri, Imo State', isDefault: true },
    { id: 'loc_2', label: 'Airport', title: 'Sam Mbakwe Airport (QOW)', address: 'VIP Arrival Terminal, QOW Airport Corridor, Owerri', isDefault: false },
    { id: 'loc_3', label: 'Office', title: 'Port Harcourt Regional Hub', address: 'GRA Phase 2, Port Harcourt, Rivers State', isDefault: false },
    { id: 'loc_4', label: 'Hotel', title: 'Protea Hotel Owerri', address: 'Plot 4 Concorde Boulevard, Owerri, Imo State', isDefault: false },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newLabel, setNewLabel]       = useState<'Home' | 'Office' | 'Hotel' | 'Airport' | 'Custom'>('Home');
  const [newTitle, setNewTitle]       = useState('');
  const [newAddress, setNewAddress]   = useState('');

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAddress) return;
    const newLoc: SavedLocation = {
      id: `loc_${Date.now()}`,
      label: newLabel,
      title: newTitle,
      address: newAddress,
      isDefault: false,
    };
    setLocations([...locations, newLoc]);
    setNewTitle('');
    setNewAddress('');
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    setLocations(locations.filter(l => l.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setLocations(locations.map(l => ({ ...l, isDefault: l.id === id })));
  };

  const getLabelIcon = (label: string) => {
    switch (label) {
      case 'Home': return <Home className="w-4 h-4 text-[#9BC800]" />;
      case 'Office': return <Building2 className="w-4 h-4 text-[#003366]" />;
      case 'Hotel': return <Hotel className="w-4 h-4 text-[#9BC800]" />;
      case 'Airport': return <Plane className="w-4 h-4 text-[#003366]" />;
      default: return <MapPin className="w-4 h-4 text-[#9BC800]" />;
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B192C]/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-4 py-1.5 rounded-full border border-[#003366]/15">
            CLIENT PREFERENCES
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0E1726] mt-2">
            Saved Locations
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] font-medium">
            Save your home, office, hotel, and airport addresses for 1-click booking.
          </p>
        </div>

        <LuxuryButton
          onClick={() => setShowAddForm(!showAddForm)}
          variant="lemon"
          size="md"
          icon={<Plus className="w-4 h-4" />}
        >
          Add New Location
        </LuxuryButton>
      </div>

      {/* Add Location Form Drawer */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 border-2 border-[#9BC800] shadow-md space-y-4"
        >
          <h3 className="font-display font-black text-base text-[#0E1726]">Add Saved Address</h3>
          <form onSubmit={handleAddLocation} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-[#003366]">Label Type</label>
                <select
                  value={newLabel}
                  onChange={(e: any) => setNewLabel(e.target.value)}
                  className="w-full bg-[#F4F6F9] border border-[#0B192C]/15 rounded-xl p-3 text-xs font-bold text-[#0E1726]"
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Airport">Airport</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-[#003366]">Address Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. My Residence"
                  className="w-full bg-[#F4F6F9] border border-[#0B192C]/15 rounded-xl p-3 text-xs font-bold text-[#0E1726]"
                />
              </div>

              <div className="space-y-1 sm:col-span-1">
                <label className="text-[10px] font-black uppercase text-[#003366]">Full Address</label>
                <input
                  type="text"
                  required
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="e.g. Plot 10 Concorde Ave, Owerri"
                  className="w-full bg-[#F4F6F9] border border-[#0B192C]/15 rounded-xl p-3 text-xs font-bold text-[#0E1726]"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <LuxuryButton type="submit" variant="lemon" size="sm">Save Address</LuxuryButton>
              <LuxuryButton type="button" onClick={() => setShowAddForm(false)} variant="outline" size="sm">Cancel</LuxuryButton>
            </div>
          </form>
        </motion.div>
      )}

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className={`bg-white rounded-3xl p-6 border transition-all duration-200 flex flex-col justify-between space-y-4 ${
              loc.isDefault ? 'border-2 border-[#9BC800] shadow-md' : 'border-[#0B192C]/10 shadow-sm'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2.5 rounded-xl bg-[#0B192C] text-white">
                    {getLabelIcon(loc.label)}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#003366]">{loc.label}</span>
                    <h3 className="font-display font-black text-base text-[#0E1726]">{loc.title}</h3>
                  </div>
                </div>

                {loc.isDefault ? (
                  <span className="text-[10px] font-black uppercase bg-[#9BC800] text-[#0B192C] px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Default Pickup
                  </span>
                ) : (
                  <button
                    onClick={() => handleSetDefault(loc.id)}
                    className="text-[10px] font-bold text-[#003366] hover:underline cursor-pointer"
                  >
                    Set as Default
                  </button>
                )}
              </div>

              <p className="text-xs text-[#475569] font-medium leading-relaxed bg-[#F4F6F9] p-3 rounded-xl border border-[#0B192C]/5">
                {loc.address}
              </p>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => handleDelete(loc.id)}
                className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
