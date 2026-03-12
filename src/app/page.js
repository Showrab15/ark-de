"use client"

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Instagram, MessageCircle, X, Ruler } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [sizeChartOpen, setSizeChartOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4">

      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.15]"
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
      />

      <div className="relative z-20 w-full max-w-xl p-8 text-center">

        <div className="flex justify-center mb-6">
          <Image src="/arkade-logo-removebg-preview.png" alt="Arkade" width={160} height={110} className="object-contain" />
        </div>

        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-12 bg-[#8e1b1b]/30" />
          <motion.span animate={{ scale: [1, 1.3, 1, 1.15, 1] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#8e1b1b">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.span>
          <span className="h-px w-12 bg-[#8e1b1b]/30" />
        </div>

        <h1 className="text-5xl font-bold text-[#8e1b1b] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          Thank You
        </h1>

        <p className="text-sm text-[#5a3a2a] leading-relaxed mb-6 font-light">
          We're truly grateful for your interest.<br />
          <span className="font-medium text-[#8e1b1b]">Arkade is officially live</span> — shop our latest drop right now on our Facebook page.
        </p>

        <div className="h-px w-3/5 bg-[#8e1b1b]/15 mx-auto mb-6" />

        <p className="text-[10px] uppercase tracking-[0.2em] text-[#8e1b1b]/50 mb-4">
          Where would you like to go?
        </p>

        <div className="flex flex-col gap-3 mb-7">
          <a href="https://www.facebook.com/weararkade" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 px-6 bg-[#8e1b1b] text-[#efe2cf] rounded-lg text-sm font-medium hover:opacity-90 transition">
            <Facebook size={16} />
            Shop on Facebook
          </a>
          {/* <a href="https://m.me/weararkade" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 px-6 border border-[#8e1b1b] text-[#8e1b1b] rounded-lg text-sm font-medium hover:bg-[#8e1b1b]/5 transition">
            <MessageCircle size={16} />
            Chat with us on Messenger
          </a> */}
          <button onClick={() => setSizeChartOpen(true)} className="flex items-center justify-center gap-2 py-3 px-6 border border-[#8e1b1b]/40 text-[#8e1b1b]/70 rounded-lg text-sm font-medium hover:bg-[#8e1b1b]/5 hover:border-[#8e1b1b] hover:text-[#8e1b1b] transition">
            <Ruler size={16} />
            Size Chart
          </button>
        </div>

        <div className="flex justify-center gap-5">
          <a href="https://www.instagram.com/weararkade?igsh=MXN2Y2VqbTk1dGZ5Yw==" target="_blank" rel="noopener noreferrer" className="text-[#8e1b1b]/50 hover:text-[#8e1b1b] hover:scale-110 transition">
            <Instagram size={16} />
          </a>
          <a href="https://www.facebook.com/weararkade" target="_blank" rel="noopener noreferrer" className="text-[#8e1b1b]/50 hover:text-[#8e1b1b] hover:scale-110 transition">
            <Facebook size={16} />
          </a>
        </div>
      </div>

      {/* Floating Messenger button */}
      <a href="https://m.me/weararkade" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#8e1b1b] text-[#efe2cf] px-4 py-3 rounded-full shadow-lg hover:opacity-90 transition">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.908 1.438 5.504 3.688 7.2V22l3.374-1.854c.9.25 1.853.384 2.838.384 5.523 0 10-4.144 10-9.243S17.523 2 12 2zm1.024 12.443l-2.55-2.72-4.977 2.72 5.475-5.812 2.612 2.72 4.914-2.72-5.474 5.812z"/>
        </svg>
        <span className="text-sm font-medium">Chat with us</span>
      </a>

      {/* Size Chart Modal */}
      <AnimatePresence>
        {sizeChartOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSizeChartOpen(false)} />

            {/* Modal box */}
            <motion.div
              className="relative z-10 bg-[#efe2cf] rounded-2xl shadow-2xl w-full max-w-sm p-6"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Ruler size={18} className="text-[#8e1b1b]" />
                  <h2 className="text-lg font-semibold text-[#8e1b1b]" style={{ fontFamily: 'Georgia, serif' }}>
                    Size Chart
                  </h2>
                </div>
                <button onClick={() => setSizeChartOpen(false)} className="text-[#8e1b1b]/50 hover:text-[#8e1b1b] transition rounded-full hover:bg-[#8e1b1b]/10 p-1">
                  <X size={20} />
                </button>
              </div>

              <div className="h-px w-full bg-[#8e1b1b]/15 mb-4" />

              {/* 👇 Replace the src below with your actual size chart image path */}
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/size-chart.jpg"
                  alt="Arkade Size Chart"
                  width={400}
                  height={200}
                  className="w-full h-auto object-contain"
                />
              </div>

            
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}