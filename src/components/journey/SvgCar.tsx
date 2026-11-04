"use client";

import { motion } from "framer-motion";

interface SvgCarProps {
  className?: string;
  isDriving?: boolean;
}

/**
 * 2D Cyber-Styled Sports Car with neon glowing headlights,
 * spinning wheel rims, and exhaust particle trails.
 */
export default function SvgCar({ className = "", isDriving = false }: SvgCarProps) {
  return (
    <div className={`relative flex items-center select-none ${className}`}>
      {/* ── Headlight Beam Glow (facing right) ── */}
      <div
        className="absolute -right-20 top-1/2 -translate-y-1/2 w-28 h-16 pointer-events-none opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at left, rgba(34, 211, 238, 0.45) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 80%)",
          filter: "blur(4px)",
        }}
      />

      {/* ── Exhaust Nitro Glow (behind car) ── */}
      {isDriving && (
        <motion.div
          className="absolute -left-10 top-1/2 -translate-y-1/2 w-12 h-6 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(239, 68, 68, 0.8) 0%, rgba(249, 115, 22, 0.4) 50%, transparent 80%)",
            filter: "blur(3px)",
          }}
          animate={{
            scale: [0.8, 1.3, 0.9],
            opacity: [0.6, 1, 0.6],
            x: [0, -6, 0],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* ── SVG 2D Car Body ── */}
      <svg
        viewBox="0 0 160 65"
        className="w-36 h-auto drop-shadow-[0_10px_20px_rgba(99,102,241,0.35)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Car Body Gradient */}
          <linearGradient id="carBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          {/* Roof & Cabin Gradient */}
          <linearGradient id="cabinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e2d" />
            <stop offset="100%" stopColor="#0f0f17" />
          </linearGradient>

          {/* Window Glass Gradient */}
          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
          </linearGradient>

          {/* Wheel Rim Gradient */}
          <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="60%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#1e293b" />
          </radialGradient>
        </defs>

        {/* ── Underglow Neon ── */}
        <ellipse cx="80" cy="56" rx="60" ry="5" fill="#06b6d4" opacity="0.4" filter="blur(3px)" />

        {/* ── Spoiler ── */}
        <path d="M12 24 L22 24 L18 29 L10 29 Z" fill="#06b6d4" />
        <rect x="14" y="28" width="4" height="6" fill="#1e1e2d" />

        {/* ── Lower Chassis ── */}
        <path
          d="M10 46 L24 46 Q28 42 36 42 Q44 42 48 46 L108 46 Q112 42 120 42 Q128 42 132 46 L150 46 Q156 46 154 40 L146 34 L118 32 L88 20 L44 20 L24 33 L10 38 Q6 40 10 46 Z"
          fill="url(#carBodyGrad)"
        />

        {/* ── Cabin Roof & Windows ── */}
        <path
          d="M45 22 L86 22 L112 33 L30 33 Z"
          fill="url(#cabinGrad)"
          stroke="#2a2a3a"
          strokeWidth="1"
        />

        {/* Side Windows with reflection */}
        <path d="M48 24 L68 24 L68 32 L36 32 Z" fill="url(#glassGrad)" />
        <path d="M72 24 L85 24 L106 32 L72 32 Z" fill="url(#glassGrad)" />

        {/* Window Reflection Stripe */}
        <line x1="56" y1="24" x2="48" y2="32" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="84" y1="24" x2="76" y2="32" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.6" />

        {/* ── Body Side Crease & Cyber Accent Line ── */}
        <path d="M26 36 L144 36" stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="0.85" />
        <path d="M40 40 L110 40" stroke="#818cf8" strokeWidth="1" strokeOpacity="0.6" />

        {/* ── Headlight (Right) ── */}
        <polygon points="146,34 154,37 149,41 144,38" fill="#38bdf8" />
        <circle cx="152" cy="38" r="2.5" fill="#ffffff" />

        {/* ── Taillight (Left) ── */}
        <polygon points="10,38 16,38 14,43 8,42" fill="#ef4444" />
        <rect x="9" y="39" width="5" height="3" fill="#ff4d4f" />

        {/* ── Door Handle ── */}
        <rect x="74" y="35" width="8" height="2" rx="1" fill="#0f172a" />

        {/* ── Front Wheel (Right) ── */}
        <g>
          <circle cx="120" cy="48" r="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
          <motion.circle
            cx="120"
            cy="48"
            r="6"
            fill="url(#rimGrad)"
            animate={isDriving ? { rotate: 360 } : {}}
            transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
          />
          <circle cx="120" cy="48" r="2" fill="#22d3ee" />
        </g>

        {/* ── Rear Wheel (Left) ── */}
        <g>
          <circle cx="36" cy="48" r="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
          <motion.circle
            cx="36"
            cy="48"
            r="6"
            fill="url(#rimGrad)"
            animate={isDriving ? { rotate: 360 } : {}}
            transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
          />
          <circle cx="36" cy="48" r="2" fill="#22d3ee" />
        </g>
      </svg>
    </div>
  );
}
