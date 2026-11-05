"use client";

import { motion } from "framer-motion";

interface TopDownCarProps {
  className?: string;
  isDriving?: boolean;
}

/**
 * Photorealistic 2D Top-Down Lunar Roving Vehicle (LRV / Moon Buggy)
 * Designed for lunar exploration across the moon regolith surface.
 * Features:
 * - 4 Articulated wire-mesh open lunar rover wheels with chevron treads & suspension
 * - High-Gain Parabolic Communications Dish (NASA / Apollo style)
 * - Gold Kapton thermal insulation foil & avionics equipment bay
 * - Dual astronaut seating station with mission joystick console
 * - High-power dual lunar floodlights cutting through the deep space darkness
 * - Micro-thruster dust exhaust when exploring
 */
export default function TopDownCar({ className = "", isDriving = true }: TopDownCarProps) {
  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* ── High-Beam Dual Lunar Floodlight Cones (Penetrating Deep Moon Darkness) ── */}
      <div
        className="absolute -bottom-64 left-1/2 -translate-x-1/2 w-[420px] h-72 pointer-events-none"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 0%, rgba(255, 255, 255, 0.9) 0deg, rgba(254, 243, 199, 0.45) 32deg, transparent 65deg, transparent 295deg, rgba(254, 243, 199, 0.45) 328deg, rgba(255, 255, 255, 0.9) 360deg)",
          filter: "blur(14px)",
          opacity: 0.95,
        }}
      />

      {/* ── Intense Core Lunar Terrain Floodlight ── */}
      <div
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-64 h-48 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.98), rgba(251, 191, 36, 0.35) 45%, transparent 75%)",
          filter: "blur(9px)",
        }}
      />

      {/* ── Lunar Regolith Dust & Micro-Thrusters (Behind the Rover when moving) ── */}
      {isDriving && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-7 pointer-events-none">
          <motion.div
            className="w-2.5 h-6 rounded-full"
            style={{
              background: "linear-gradient(to top, rgba(255, 255, 255, 0.7), rgba(251, 191, 36, 0.5), transparent)",
              filter: "blur(3px)",
            }}
            animate={{ scaleY: [0.8, 1.5, 0.8], opacity: [0.5, 0.95, 0.5] }}
            transition={{ duration: 0.22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="w-2.5 h-6 rounded-full"
            style={{
              background: "linear-gradient(to top, rgba(255, 255, 255, 0.7), rgba(251, 191, 36, 0.5), transparent)",
              filter: "blur(3px)",
            }}
            animate={{ scaleY: [0.8, 1.5, 0.8], opacity: [0.5, 0.95, 0.5] }}
            transition={{ duration: 0.22, repeat: Infinity, ease: "easeInOut", delay: 0.11 }}
          />
        </div>
      )}

      {/* ── Authentically Detailed Top-Down Lunar Rover (LRV) ── */}
      <svg
        viewBox="0 0 92 144"
        className="w-14 sm:w-16 h-auto drop-shadow-[0_12px_28px_rgba(0,0,0,0.8)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gold Kapton Foil Thermal Shield Gradient */}
          <linearGradient id="lunarGoldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Lunar Titanium Chassis */}
          <linearGradient id="lunarChassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#e4e4e7" />
            <stop offset="75%" stopColor="#71717a" />
            <stop offset="100%" stopColor="#27272a" />
          </linearGradient>

          {/* Wire-Mesh Lunar Chevron Tire Texture */}
          <linearGradient id="meshWheelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="25%" stopColor="#52525b" />
            <stop offset="50%" stopColor="#a1a1aa" />
            <stop offset="75%" stopColor="#52525b" />
            <stop offset="100%" stopColor="#18181b" />
          </linearGradient>

          {/* Solar Avionics Cell Gradient */}
          <linearGradient id="solarCellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
        </defs>

        {/* ── 4 Articulated Suspension Outriggers ── */}
        {/* Front Left Suspension Arm */}
        <line x1="28" y1="108" x2="14" y2="108" stroke="#a1a1aa" strokeWidth="2.5" strokeLinecap="round" />
        {/* Front Right Suspension Arm */}
        <line x1="64" y1="108" x2="78" y2="108" stroke="#a1a1aa" strokeWidth="2.5" strokeLinecap="round" />
        {/* Rear Left Suspension Arm */}
        <line x1="28" y1="36" x2="14" y2="36" stroke="#a1a1aa" strokeWidth="2.5" strokeLinecap="round" />
        {/* Rear Right Suspension Arm */}
        <line x1="64" y1="36" x2="78" y2="36" stroke="#a1a1aa" strokeWidth="2.5" strokeLinecap="round" />

        {/* ── 4 Wire-Mesh Lunar Chevron Tires ── */}
        {/* Front Left Wheel */}
        <rect x="5" y="94" width="12" height="28" rx="4" fill="url(#meshWheelGrad)" stroke="#d4d4d8" strokeWidth="0.8" />
        <line x1="7" y1="99" x2="15" y2="103" stroke="#27272a" strokeWidth="1.2" />
        <line x1="7" y1="105" x2="15" y2="109" stroke="#27272a" strokeWidth="1.2" />
        <line x1="7" y1="111" x2="15" y2="115" stroke="#27272a" strokeWidth="1.2" />

        {/* Front Right Wheel */}
        <rect x="75" y="94" width="12" height="28" rx="4" fill="url(#meshWheelGrad)" stroke="#d4d4d8" strokeWidth="0.8" />
        <line x1="77" y1="99" x2="85" y2="103" stroke="#27272a" strokeWidth="1.2" />
        <line x1="77" y1="105" x2="85" y2="109" stroke="#27272a" strokeWidth="1.2" />
        <line x1="77" y1="111" x2="85" y2="115" stroke="#27272a" strokeWidth="1.2" />

        {/* Rear Left Wheel */}
        <rect x="5" y="22" width="12" height="28" rx="4" fill="url(#meshWheelGrad)" stroke="#d4d4d8" strokeWidth="0.8" />
        <line x1="7" y1="27" x2="15" y2="31" stroke="#27272a" strokeWidth="1.2" />
        <line x1="7" y1="33" x2="15" y2="37" stroke="#27272a" strokeWidth="1.2" />
        <line x1="7" y1="39" x2="15" y2="43" stroke="#27272a" strokeWidth="1.2" />

        {/* Rear Right Wheel */}
        <rect x="75" y="22" width="12" height="28" rx="4" fill="url(#meshWheelGrad)" stroke="#d4d4d8" strokeWidth="0.8" />
        <line x1="77" y1="27" x2="85" y2="31" stroke="#27272a" strokeWidth="1.2" />
        <line x1="77" y1="33" x2="85" y2="37" stroke="#27272a" strokeWidth="1.2" />
        <line x1="77" y1="39" x2="85" y2="43" stroke="#27272a" strokeWidth="1.2" />

        {/* ── Main Spaceframe Tubular Platform ── */}
        <rect x="22" y="16" width="48" height="106" rx="8" fill="url(#lunarChassisGrad)" stroke="#ffffff" strokeWidth="1.5" />

        {/* ── Gold Kapton Thermal Blanket / Battery Section ── */}
        <rect x="25" y="20" width="42" height="32" rx="4" fill="url(#lunarGoldFoil)" stroke="#f59e0b" strokeWidth="0.8" />
        {/* Thermal Foil Quilt Grid Pattern */}
        <line x1="39" y1="20" x2="39" y2="52" stroke="#b45309" strokeWidth="0.75" strokeDasharray="3 2" />
        <line x1="53" y1="20" x2="53" y2="52" stroke="#b45309" strokeWidth="0.75" strokeDasharray="3 2" />
        <line x1="25" y1="36" x2="67" y2="36" stroke="#b45309" strokeWidth="0.75" strokeDasharray="3 2" />

        {/* ── Rear Solar / Avionics Cell Module ── */}
        <rect x="29" y="8" width="34" height="12" rx="2" fill="url(#solarCellGrad)" stroke="#38bdf8" strokeWidth="0.8" />
        <line x1="40" y1="8" x2="40" y2="20" stroke="#60a5fa" strokeWidth="0.5" />
        <line x1="52" y1="8" x2="52" y2="20" stroke="#60a5fa" strokeWidth="0.5" />

        {/* ── Astronaut Crew Compartment ── */}
        {/* Left Astronaut Seat */}
        <rect x="28" y="58" width="16" height="24" rx="4" fill="#18181b" stroke="#71717a" strokeWidth="0.8" />
        {/* Astronaut Helmet (Left) */}
        <ellipse cx="36" cy="70" rx="6" ry="6.5" fill="#f4f4f5" stroke="#e4e4e7" strokeWidth="0.75" />
        <ellipse cx="36" cy="71" rx="4.5" ry="3.5" fill="#f59e0b" opacity="0.9" />

        {/* Right Astronaut Seat */}
        <rect x="48" y="58" width="16" height="24" rx="4" fill="#18181b" stroke="#71717a" strokeWidth="0.8" />
        {/* Astronaut Helmet (Right) */}
        <ellipse cx="56" cy="70" rx="6" ry="6.5" fill="#f4f4f5" stroke="#e4e4e7" strokeWidth="0.75" />
        <ellipse cx="56" cy="71" rx="4.5" ry="3.5" fill="#f59e0b" opacity="0.9" />

        {/* Center T-Handle Navigation Control Console */}
        <rect x="42" y="74" width="8" height="16" rx="2" fill="#27272a" stroke="#a1a1aa" strokeWidth="0.75" />
        <circle cx="46" cy="78" r="2" fill="#10b981" />
        <circle cx="46" cy="84" r="1.5" fill="#f59e0b" />

        {/* ── Front Avionics Equipment Bay ── */}
        <rect x="26" y="88" width="40" height="28" rx="4" fill="#18181b" stroke="#52525b" strokeWidth="0.8" />
        {/* Science Payload Pack */}
        <rect x="30" y="92" width="18" height="16" rx="2" fill="url(#lunarGoldFoil)" stroke="#f59e0b" strokeWidth="0.5" />
        {/* Telemetry Display */}
        <rect x="52" y="92" width="10" height="16" rx="1.5" fill="#09090b" stroke="#3f3f46" strokeWidth="0.5" />
        <line x1="54" y1="96" x2="60" y2="96" stroke="#22c55e" strokeWidth="0.75" />
        <line x1="54" y1="100" x2="58" y2="100" stroke="#38bdf8" strokeWidth="0.75" />

        {/* ── High-Gain Parabolic Communications Dish (Mounted on Front Mast) ── */}
        <g transform="translate(62, 108)">
          {/* Dish Base & Boom */}
          <line x1="0" y1="0" x2="10" y2="10" stroke="#ffffff" strokeWidth="1.5" />
          {/* Parabolic Dish Rim */}
          <ellipse cx="10" cy="10" rx="9" ry="9" fill="#09090b" stroke="#e4e4e7" strokeWidth="1.2" />
          {/* Mesh Grid Lines */}
          <line x1="1" y1="10" x2="19" y2="10" stroke="#71717a" strokeWidth="0.75" />
          <line x1="10" y1="1" x2="10" y2="19" stroke="#71717a" strokeWidth="0.75" />
          {/* Center Feed Horn Pointing to Earth */}
          <circle cx="10" cy="10" r="2" fill="#fbbf24" stroke="#ffffff" strokeWidth="0.5" />
        </g>

        {/* ── Front Dual LED Terrain Floodlights ── */}
        {/* Left Searchlight */}
        <ellipse cx="32" cy="122" rx="4.5" ry="3" fill="#ffffff" filter="drop-shadow(0 0 8px rgba(255, 255, 255, 0.95))" />
        {/* Right Searchlight */}
        <ellipse cx="60" cy="122" rx="4.5" ry="3" fill="#ffffff" filter="drop-shadow(0 0 8px rgba(255, 255, 255, 0.95))" />

        {/* ── Rear Red Telemetry Beacons ── */}
        <circle cx="28" cy="18" r="2.5" fill="#ef4444" filter="drop-shadow(0 0 5px #ef4444)" />
        <circle cx="64" cy="18" r="2.5" fill="#ef4444" filter="drop-shadow(0 0 5px #ef4444)" />
      </svg>
    </div>
  );
}
