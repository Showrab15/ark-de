"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const STORAGE_KEY = "arkade_boishakh_2025_seen";

export default function BoishakhPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const hasSeen = localStorage.getItem(STORAGE_KEY);
    if (!hasSeen) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Force play as soon as popup becomes visible
  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked — silently ignore, video will still be muted/ready
      });
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  return (
    <>
      {/*
        Hidden video preloader — loads the video in the background
        the moment the component mounts, before the popup is even shown.
      */}
      <video
        ref={videoRef}
        src="/boishak.mp4"
        preload="auto"
        muted
        loop
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        style={{ display: "none" }}
      />

      <AnimatePresence>
        {isVisible && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            {/* Popup */}
            <motion.div
              key="popup"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 24 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            >
              <div
                className="relative w-full max-w-sm pointer-events-auto rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  background: "#0f0000",
                  border: "1px solid rgba(180,60,60,0.35)",
                  boxShadow: "0 0 60px rgba(142,27,27,0.4), 0 25px 50px rgba(0,0,0,0.7)",
                }}
              >
                {/* Top gradient line */}
                <div
                  className="h-[2px] w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, #dc2626 30%, #f97316 50%, #dc2626 70%, transparent 100%)",
                  }}
                />

                {/* Header */}
                <div className="pt-5 pb-3 px-5 text-center">
                  <p
                    className="text-[10px] uppercase tracking-[0.45em] mb-2"
                    style={{ color: "rgba(220,150,150,0.55)" }}
                  >
                    A wish from Arkade
                  </p>
                  <motion.h2
                    className="font-bn text-[30px] md:text-[34px] font-semibold text-white leading-tight tracking-wide"
                    style={{
                      textShadow: "0 0 18px rgba(220,38,38,0.6)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    শুভ নববর্ষ ১৪৩৩ 🌼
                  </motion.h2>
                  <motion.p
                    className="font-bn text-xs mt-2 tracking-wide"
                    style={{ color: "rgba(220,180,180,0.55)" }}
                  >
                    নতুনের আহ্বান
                  </motion.p>
                </div>

                {/* Divider */}
                <div className="mx-5 mb-3 h-px" style={{ background: "rgba(180,60,60,0.2)" }} />

                {/* Video — reuses the same preloaded element via srcObject trick */}
                <motion.div
                  className="mx-4 rounded-xl overflow-hidden"
                  style={{ aspectRatio: "1 / 1", background: "#000" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {/*
                    We clone the src here. The hidden video above has already
                    buffered the file, so the browser serves it from cache instantly.
                  */}
                  <video
                    src="/boishak.mp4"
                    autoPlay
                  
                    loop
                    playsInline
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      pointerEvents: "none",
                    }}
                  />
                </motion.div>

                {/* Footer */}
                <div className="px-5 pt-3 pb-4 flex items-center justify-between">
                  <p
                    className="text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: "rgba(200,120,120,0.35)" }}
                  >
                    For the Few
                  </p>
                  <button
                    onClick={handleClose}
                    className="text-[11px] transition-colors"
                    style={{
                      color: "rgba(220,160,160,0.45)",
                      letterSpacing: "0.05em",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "rgba(255,200,200,0.85)")}
                    onMouseLeave={(e) => (e.target.style.color = "rgba(220,160,160,0.45)")}
                  >
                    Continue to site →
                  </button>
                </div>

                {/* Bottom gradient line */}
                <div
                  className="h-[1px] w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(180,60,60,0.3) 50%, transparent 100%)",
                  }}
                />

                {/* Close (X) button */}
                <motion.button
                  onClick={handleClose}
                  className="absolute top-3 right-3 flex items-center justify-center rounded-full"
                  style={{
                    width: 28,
                    height: 28,
                    background: "rgba(0,0,0,0.6)",
                    border: "1px solid rgba(180,60,60,0.4)",
                  }}
                  whileHover={{ scale: 1.15, background: "rgba(142,27,27,0.7)" }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close"
                >
                  <X size={12} className="text-red-300" />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}