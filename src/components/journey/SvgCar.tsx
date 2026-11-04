"use client";

import { motion } from "framer-motion";

interface SvgCarProps {
  className?: string;
  isDriving?: boolean;
}

/**
 * High-definition 2D Sports Car with glowing neon headlights,
 * detailed chassis, spinning wheel rims, and active nitro thruster.
 */
export default function SvgCar({ className = "", isDriving = false }: SvgCarProps) {
  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      {/* ── Powerful Headlight Beam (facing right) ── */}
      <div
        className="absolute -right-24 top-1/2 -translate-y-1/2 w-36 h-20 pointer-events-none opacity-85"
        style={{
          background:
            "radial-gradient(ellipse at left, rgba(34, 211, 238, 0.7) 0%, rgba(99, 102, 241, 0.3) 45%, transparent 80%)",
          filter: "blur(6px)",
        }}
      />

      {/* ── Nitro Exhaust Thruster Flame (behind car) ── */}
      {isDriving && (
        <motion.div
          className="absolute -left-12 top-1/2 -translate-y-1/2 w-14 h-8 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at right, #38bdf8 0%, #6366f1 40%, #ef4444 75%, transparent 90%)",
            filter: "blur(4px)",
          }}
          animate={{
            scale: [0.9, 1.4, 0.9],
            opacity: [0.7, 1, 0.7],
            x: [0, -8, 0],
          }}
          transition={{
            duration: 0.25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* ── SVG 2D Car Body ── */}
      <svg
        viewBox="0 0 160 65"
        className="w-44 sm:w-52 h-auto drop-shadow-[0_12px_24px_rgba(99,102,241,0.5)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Car Body Gradient */}
          <linearGradient id="carBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4338ca" />
            <stop offset="45%" stopColor="#6366f1" />
            <stop offset="85%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>

          {/* Roof & Cabin Gradient */}
          <linearGradient id="cabinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e2f" />
            <stop offset="100%" stopColor="#0a0a14" />
          </linearGradient>

          {/* Window Glass Tint */}
          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.6" />
          </linearGradient>

          {/* Rim Metallic Gradient */}
          <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#1e293b" />
          </radialGradient>
        </defs>

        {/* ── Ground Neon Glow ── */}
        <ellipse cx="80" cy="56" rx="65" ry="6" fill="#06b6d4" opacity="0.6" filter="blur(4px)" />

        {/* ── Racing Spoiler ── */}
        <path d="M10 22 L24 22 L20 28 L8 28 Z" fill="#06b6d4" stroke="#22d3ee" strokeWidth="0.75" />
        <rect x="14" y="27" width="5" height="7" fill="#1e1e2f" />

        {/* ── Main Chassis ── */}
        <path
          d="M8 46 L24 46 Q28 41 36 41 Q44 41 48 46 L108 46 Q112 41 120 41 Q128 41 132 46 L150 46 Q157 46 155 39 L146 33 L118 31 L88 19 L42 19 L22 32 L8 37 Q4 39 8 46 Z"
          fill="url(#carBodyGrad)"
          stroke="#818cf8"
          strokeWidth="0.75"
        />

        {/* ── Cabin Roof & Pillar ── */}
        <path
          d="M44 21 L87 21 L114 32 L28 32 Z"
          fill="url(#cabinGrad)"
          stroke="#312e81"
          strokeWidth="1"
        />

        {/* Side Windows with reflection */}
        <path d="M47 23 L67 23 L67 31 L34 31 Z" fill="url(#glassGrad)" />
        <path d="M71 23 L86 23 L108 31 L71 31 Z" fill="url(#glassGrad)" />

        {/* Window Reflection Stripes */}
        <line x1="55" y1="23" x2="46" y2="31" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.75" />
        <line x1="83" y1="23" x2="74" y2="31" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.75" />

        {/* ── Cyber Accent Lines ── */}
        <path d="M24 35 L146 35" stroke="#22d3ee" strokeWidth="2" strokeOpacity="0.95" />
        <path d="M38 39 L112 39" stroke="#c084fc" strokeWidth="1.2" strokeOpacity="0.8" />

        {/* ── Headlight (Right) ── */}
        <polygon points="146,33 156,36 150,41 144,38" fill="#38bdf8" />
        <circle cx="152" cy="37" r="3" fill="#ffffff" />

        {/* ── Taillight (Left) ── */}
        <polygon points="8,37 15,37 13,42 7,41" fill="#ef4444" />
        <rect x="7" y="38" width="6" height="3" fill="#f87171" />

        {/* ── Front Wheel (Right) ── */}
        <g>
          <circle cx="120" cy="48" r="13" fill="#090d16" stroke="#475569" strokeWidth="2.5" />
          <motion.g
            animate={isDriving ? { rotate: 360 } : {}}
            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            style={{ originX: "120px", originY: "48px" }}
          >
            <circle cx="120" cy="48" r="7" fill="url(#rimGrad)" />
            {/* Spoke details */}
            <line x1="120" y1="41" x2="120" y2="55" stroke="#0f172a" strokeWidth="1.5" />
            <line x1="113" y1="48" x2="127" y2="48" stroke="#0f172a" strokeWidth="1.5" />
          </motion.g>
          <circle cx="120" cy="48" r="2.5" fill="#22d3ee" />
        </g>

        {/* ── Rear Wheel (Left) ── */}
        <g>
          <circle cx="36" cy="48" r="13" fill="#090d16" stroke="#475569" strokeWidth="2.5" />
          <motion.g
            animate={isDriving ? { rotate: 360 } : {}}
            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            style={{ originX: "36px", originY: "48px" }}
          >
            <circle cx="36" cy="48" r="7" fill="url(#rimGrad)" />
            {/* Spoke details */}
            <line x1="36" y1="41" x2="36" y2="55" stroke="#0f172a" strokeWidth="1.5" />
            <line x1="29" y1="48" x2="43" y2="48" stroke="#0f172a" strokeWidth="1.5" />
          </motion.g>
          <circle cx="36" cy="48" r="2.5" fill="#22d3ee" />
        </g>
      </svg>
    </div>
  );
}
