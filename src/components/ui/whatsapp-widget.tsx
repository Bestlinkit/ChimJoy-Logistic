'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mb-4 w-80 bg-white rounded-3xl p-6 shadow-2xl border border-[#0B2545]/10 text-[#0E1726] space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#0B2545]/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#16A34A] animate-pulse" />
                <span className="font-display font-extrabold text-sm text-[#0B2545]">Chat with ChimJoy</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-bold text-[#0B2545] text-sm">Need help with your booking?</p>
              <p className="text-slate-500 font-medium">Usually replies within a few minutes.</p>
            </div>

            <a
              href="https://wa.me/2348077880262?text=Hello%20ChimJoy,%20I%20need%20assistance%20with%20booking%20a%20ride."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold rounded-full flex items-center justify-center gap-2 text-xs shadow-md transition-transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start WhatsApp Chat</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 rounded-full bg-[#25D366] text-white shadow-2xl hover:shadow-green-500/30 flex items-center justify-center border-2 border-white"
        aria-label="WhatsApp Support"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
      </motion.button>
    </div>
  );
};
