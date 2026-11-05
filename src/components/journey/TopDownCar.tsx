"use client";

import { motion } from "framer-motion";

interface TopDownCarProps {
  className?: string;
  isDriving?: boolean;
}

/**
 * Photorealistic 2D Top-Down Sports Car (7oskaaa / elgemmy style)
 * Designed for highway navigation and night discovery exploration.
 * Features dual long-range glowing LED high-beams casting forward into the dark,
 * neon underglow, racing stripes, and dual red taillights.
 */
export default function TopDownCar({ className = "", isDriving = true }: TopDownCarProps) {
  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* ── High-Beam Dual Headlight Cones (Casting Forward into the Dark Highway) ── */}
      <div
        className="absolute -bottom-56 left-1/2 -translate-x-1/2 w-80 h-64 pointer-events-none"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 0%, var(--car-beam, rgba(34, 211, 238, 0.8)) 0deg, var(--car-beam-conic, rgba(254, 243, 199, 0.45)) 30deg, transparent 65deg, transparent 295deg, var(--car-beam-conic, rgba(254, 243, 199, 0.45)) 330deg, var(--car-beam, rgba(34, 211, 238, 0.8)) 360deg)",
          filter: "blur(14px)",
          opacity: 0.95,
        }}
      />

      {/* ── Intense Core Headlight Discovery Beam ── */}
      <div
        className="absolute -bottom-36 left-1/2 -translate-x-1/2 w-48 h-44 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.95), var(--car-underglow, rgba(56, 189, 248, 0.6)) 50%, transparent 80%)",
          filter: "blur(8px)",
        }}
      />

      {/* ── Nitro Exhaust Thruster Flames (behind the car / top side) ── */}
      {isDriving && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-5 pointer-events-none">
          <motion.div
            className="w-2 h-5 rounded-full"
            style={{
              background: "linear-gradient(to top, var(--car-stripe, #38bdf8), var(--car-body-3, #6366f1), transparent)",
              filter: "blur(2px)",
            }}
            animate={{ scaleY: [0.8, 1.4, 0.8], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="w-2 h-5 rounded-full"
            style={{
              background: "linear-gradient(to top, var(--car-stripe, #38bdf8), var(--car-body-3, #6366f1), transparent)",
              filter: "blur(2px)",
            }}
            animate={{ scaleY: [0.8, 1.4, 0.8], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
          />
        </div>
      )}

      {/* ── Compact Sleek Top-Down Car Body ── */}
      <svg
        viewBox="0 0 76 136"
        className="w-12 sm:w-14 h-auto drop-shadow-[0_12px_24px_rgba(6,182,212,0.45)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Body Gradient */}
          <linearGradient id="bodyGradTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--car-body-1, #1e1b4b)" />
            <stop offset="35%" stopColor="var(--car-body-2, #4338ca)" />
            <stop offset="70%" stopColor="var(--car-body-3, #6366f1)" />
            <stop offset="100%" stopColor="var(--car-body-4, #06b6d4)" />
          </linearGradient>

          {/* Roof / Windshield Glass */}
          <linearGradient id="windshieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0a0d18" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="var(--car-stripe, #38bdf8)" stopOpacity="0.8" />
          </linearGradient>

          {/* Tire Tread */}
          <linearGradient id="tireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* ── Underglow Neon Aura ── */}
        <ellipse cx="38" cy="68" rx="34" ry="58" fill="var(--car-underglow, #06b6d4)" opacity="0.45" filter="blur(6px)" />

        {/* ── 4 Wheels / Tires ── */}
        {/* Front Left */}
        <rect x="3" y="88" width="9" height="24" rx="4" fill="url(#tireGrad)" stroke="#475569" strokeWidth="0.75" />
        {/* Front Right */}
        <rect x="64" y="88" width="9" height="24" rx="4" fill="url(#tireGrad)" stroke="#475569" strokeWidth="0.75" />
        {/* Rear Left */}
        <rect x="3" y="24" width="9" height="24" rx="4" fill="url(#tireGrad)" stroke="#475569" strokeWidth="0.75" />
        {/* Rear Right */}
        <rect x="64" y="24" width="9" height="24" rx="4" fill="url(#tireGrad)" stroke="#475569" strokeWidth="0.75" />

        {/* ── Aerodynamic Chassis Silhouette ── */}
        <path
          d="
            M22 10
            C26 8, 50 8, 54 10
            C60 12, 64 20, 64 36
            C64 48, 62 60, 64 80
            C66 94, 62 116, 56 126
            C50 133, 44 135, 38 135
            C32 135, 26 133, 20 126
            C14 116, 10 94, 12 80
            C14 60, 12 48, 12 36
            C12 20, 16 12, 22 10
            Z
          "
          fill="url(#bodyGradTop)"
          stroke="var(--car-stripe, #38bdf8)"
          strokeWidth="1.2"
        />

        {/* ── Dual Racing Stripes ── */}
        <line x1="35" y1="12" x2="35" y2="133" stroke="var(--car-stripe, #22d3ee)" strokeWidth="1.5" opacity="0.8" />
        <line x1="41" y1="12" x2="41" y2="133" stroke="var(--car-stripe, #22d3ee)" strokeWidth="1.5" opacity="0.8" />

        {/* ── Front Windshield ── */}
        <path
          d="M20 78 C25 74, 51 74, 56 78 L53 96 C48 99, 28 99, 23 96 Z"
          fill="url(#windshieldGrad)"
          stroke="var(--car-stripe, #38bdf8)"
          strokeWidth="0.8"
        />

        {/* ── Cabin Roof ── */}
        <rect x="23" y="52" width="30" height="26" rx="4" fill="#080a14" stroke="var(--car-body-2, #4338ca)" strokeWidth="0.75" />

        {/* ── Rear Windshield ── */}
        <path
          d="M23 48 C28 50, 48 50, 53 48 L55 36 C50 34, 26 34, 21 36 Z"
          fill="#0c101c"
          stroke="var(--car-body-3, #6366f1)"
          strokeWidth="0.8"
        />

        {/* ── Side Mirrors ── */}
        <path d="M12 76 L6 73 L6 80 Z" fill="var(--car-body-2, #4338ca)" stroke="var(--car-stripe, #38bdf8)" strokeWidth="0.5" />
        <path d="M64 76 L70 73 L70 80 Z" fill="var(--car-body-2, #4338ca)" stroke="var(--car-stripe, #38bdf8)" strokeWidth="0.5" />

        {/* ── Rear Spoiler ── */}
        <rect x="15" y="12" width="46" height="5" rx="2" fill="var(--car-body-3, #06b6d4)" stroke="var(--car-stripe, #22d3ee)" strokeWidth="0.75" />

        {/* ── Dual Glowing Front Headlights (LED White) ── */}
        <ellipse cx="22" cy="128" rx="4.5" ry="3" fill="#ffffff" filter="drop-shadow(0 0 6px var(--car-underglow, #22d3ee))" />
        <ellipse cx="54" cy="128" rx="4.5" ry="3" fill="#ffffff" filter="drop-shadow(0 0 6px var(--car-underglow, #22d3ee))" />

        {/* ── Dual Red LED Taillights ── */}
        <rect x="18" y="10" width="7" height="2.5" rx="1" fill="#ef4444" filter="drop-shadow(0 0 5px #ef4444)" />
        <rect x="51" y="10" width="7" height="2.5" rx="1" fill="#ef4444" filter="drop-shadow(0 0 5px #ef4444)" />
      </svg>
    </div>
  );
}
