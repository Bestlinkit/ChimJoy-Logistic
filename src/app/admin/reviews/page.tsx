'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, XCircle, Sparkles, MessageSquare, ThumbsUp } from 'lucide-react';
import { subscribeToReviews, updateReviewStatusInDb } from '@/lib/firebase/services/admin-db-service';
import { logAdminAction } from '@/lib/firebase/services/admin-audit-service';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { ReviewItem } from '@/types/admin';

export default function AdminReviewsPage() {
  const { adminUser } = useAdminAuth();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  useEffect(() => {
    const unsub = subscribeToReviews((data) => setReviews(data));
    return () => unsub();
  }, []);

  const handleAction = async (review: ReviewItem, status: 'Approved' | 'Rejected', isFeatured = false) => {
    if (!adminUser) return;
    await updateReviewStatusInDb(review.id, status, isFeatured);
    await logAdminAction(adminUser.email, adminUser.role, 'MODERATE_REVIEW', 'Reviews', `Updated review by ${review.customerName} to ${status}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#003366] bg-[#003366]/10 px-3 py-1 rounded-full border border-[#003366]/15">
            MODERATION QUEUE
          </span>
          <h1 className="font-display text-2xl font-black text-[#0E1726] mt-2">
            Customer Reviews Moderation
          </h1>
          <p className="text-xs text-[#475569] font-medium mt-0.5">
            Approve or reject customer testimonials before publishing to the public homepage.
          </p>
        </div>

        <span className="text-xs font-bold text-[#003366] bg-[#003366]/10 px-4 py-2.5 rounded-xl">
          Total Reviews: <strong>{reviews.length}</strong>
        </span>
      </div>

      {/* Reviews Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white p-6 rounded-3xl border border-[#0B192C]/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-extrabold text-[#0E1726]">{r.customerName}</h3>
                <span className="text-[11px] text-slate-500 font-bold">{r.serviceType}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-500 font-black text-sm">
                <Star className="w-4 h-4 fill-current" />
                <span>{r.rating}.0</span>
              </div>
            </div>

            <p className="text-xs text-[#475569] font-medium leading-relaxed bg-[#F4F6F9] p-4 rounded-2xl border border-slate-200">
              "{r.comment}"
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${r.status === 'Approved' ? 'bg-emerald-500/15 text-emerald-700' : r.status === 'Rejected' ? 'bg-red-500/15 text-red-700' : 'bg-amber-500/15 text-amber-700'}`}>
                {r.status}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAction(r, 'Approved', true)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold hover:bg-emerald-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Feature
                </button>
                <button
                  type="button"
                  onClick={() => handleAction(r, 'Rejected', false)}
                  className="px-3 py-1.5 rounded-xl bg-red-100 text-red-700 text-xs font-extrabold hover:bg-red-200 transition-colors cursor-pointer"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
