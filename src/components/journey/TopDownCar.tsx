"use client";

import { motion } from "framer-motion";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";

interface TopDownCarProps {
  className?: string;
  isDriving?: boolean;
  forceTheme?: "dark" | "light";
}

/**
 * TopDownCar — Photorealistic 2D Top-Down Exploration Vehicle:
 * - Dark Mode: The Apollo/Artemis Lunar Roving Vehicle (LRV) exploring the Moon.
 * - Light Mode: The Helios Solar Expedition Rover traversing the Sun / Heliosphere.
 */
export default function TopDownCar({
  className = "",
  isDriving = true,
  forceTheme,
}: TopDownCarProps) {
  const currentTheme = useCurrentTheme();
  const theme = forceTheme || currentTheme;
  const isSunRover = theme === "light";

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* ── High-Beam Headlight Cones (Moon Xenon vs Sun Solar Ray) ──── */}
      <div
        className="absolute -bottom-64 left-1/2 -translate-x-1/2 w-[420px] h-72 pointer-events-none"
        style={{
          background: isSunRover
            ? "conic-gradient(from 180deg at 50% 0%, rgba(251, 191, 36, 0.95) 0deg, rgba(249, 115, 22, 0.5) 32deg, transparent 65deg, transparent 295deg, rgba(249, 115, 22, 0.5) 328deg, rgba(251, 191, 36, 0.95) 360deg)"
            : "conic-gradient(from 180deg at 50% 0%, rgba(255, 255, 255, 0.9) 0deg, rgba(254, 243, 199, 0.45) 32deg, transparent 65deg, transparent 295deg, rgba(254, 243, 199, 0.45) 328deg, rgba(255, 255, 255, 0.9) 360deg)",
          filter: "blur(14px)",
          opacity: 0.95,
        }}
      />

      {/* ── Intense Core Headlight Floodlight ────────────────────────── */}
      <div
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-64 h-48 pointer-events-none"
        style={{
          background: isSunRover
            ? "radial-gradient(ellipse at 50% 0%, rgba(254, 240, 138, 0.98), rgba(249, 115, 22, 0.45) 45%, transparent 75%)"
            : "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.98), rgba(251, 191, 36, 0.35) 45%, transparent 75%)",
          filter: "blur(9px)",
        }}
      />

      {/* ── Rear Dust / Solar Plasma Thrusters when moving ───────────── */}
      {isDriving && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-7 pointer-events-none">
          <motion.div
            className="w-2.5 h-6 rounded-full"
            style={{
              background: isSunRover
                ? "linear-gradient(to top, rgba(249, 115, 22, 0.9), rgba(251, 191, 36, 0.8), transparent)"
                : "linear-gradient(to top, rgba(255, 255, 255, 0.7), rgba(251, 191, 36, 0.5), transparent)",
              filter: "blur(3px)",
            }}
            animate={{ scaleY: [0.8, 1.6, 0.8], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="w-2.5 h-6 rounded-full"
            style={{
              background: isSunRover
                ? "linear-gradient(to top, rgba(249, 115, 22, 0.9), rgba(251, 191, 36, 0.8), transparent)"
                : "linear-gradient(to top, rgba(255, 255, 255, 0.7), rgba(251, 191, 36, 0.5), transparent)",
              filter: "blur(3px)",
            }}
            animate={{ scaleY: [0.8, 1.6, 0.8], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
          />
        </div>
      )}

      {/* ── Exploration Rover SVG ────────────────────────────────────── */}
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

          {/* Solar Rover Aerodynamic Shield */}
          <linearGradient id="solarShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#fed7aa" />
            <stop offset="60%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#9a3412" />
          </linearGradient>

          {/* Lunar Titanium Chassis */}
          <linearGradient id="lunarChassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#e4e4e7" />
            <stop offset="75%" stopColor="#71717a" />
            <stop offset="100%" stopColor="#27272a" />
          </linearGradient>

          {/* Wire-Mesh Chevron Tire Texture */}
          <linearGradient id="meshWheelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isSunRover ? "#7c2d12" : "#18181b"} />
            <stop offset="25%" stopColor={isSunRover ? "#ea580c" : "#52525b"} />
            <stop offset="50%" stopColor={isSunRover ? "#fbbf24" : "#a1a1aa"} />
            <stop offset="75%" stopColor={isSunRover ? "#ea580c" : "#52525b"} />
            <stop offset="100%" stopColor={isSunRover ? "#7c2d12" : "#18181b"} />
          </linearGradient>

          {/* Solar Avionics Cell Gradient */}
          <linearGradient id="solarCellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isSunRover ? "#f59e0b" : "#1e3a8a"} />
            <stop offset="50%" stopColor={isSunRover ? "#ea580c" : "#0f172a"} />
            <stop offset="100%" stopColor={isSunRover ? "#b45309" : "#0369a1"} />
          </linearGradient>
        </defs>

        {/* ── 4 Articulated Suspension Outriggers ── */}
        <line x1="28" y1="108" x2="14" y2="108" stroke={isSunRover ? "#ea580c" : "#a1a1aa"} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="64" y1="108" x2="78" y2="108" stroke={isSunRover ? "#ea580c" : "#a1a1aa"} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="28" y1="36" x2="14" y2="36" stroke={isSunRover ? "#ea580c" : "#a1a1aa"} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="64" y1="36" x2="78" y2="36" stroke={isSunRover ? "#ea580c" : "#a1a1aa"} strokeWidth="2.5" strokeLinecap="round" />

        {/* ── 4 Wheels (Chevron Tread) ── */}
        {/* Front Left Wheel */}
        <rect x="5" y="94" width="12" height="28" rx="4" fill="url(#meshWheelGrad)" stroke={isSunRover ? "#f59e0b" : "#d4d4d8"} strokeWidth="0.8" />
        <line x1="7" y1="99" x2="15" y2="103" stroke={isSunRover ? "#451a03" : "#27272a"} strokeWidth="1.2" />
        <line x1="7" y1="105" x2="15" y2="109" stroke={isSunRover ? "#451a03" : "#27272a"} strokeWidth="1.2" />
        <line x1="7" y1="111" x2="15" y2="115" stroke={isSunRover ? "#451a03" : "#27272a"} strokeWidth="1.2" />

        {/* Front Right Wheel */}
        <rect x="75" y="94" width="12" height="28" rx="4" fill="url(#meshWheelGrad)" stroke={isSunRover ? "#f59e0b" : "#d4d4d8"} strokeWidth="0.8" />
        <line x1="77" y1="99" x2="85" y2="103" stroke={isSunRover ? "#451a03" : "#27272a"} strokeWidth="1.2" />
        <line x1="77" y1="105" x2="85" y2="109" stroke={isSunRover ? "#451a03" : "#27272a"} strokeWidth="1.2" />
        <line x1="77" y1="111" x2="85" y2="115" stroke={isSunRover ? "#451a03" : "#27272a"} strokeWidth="1.2" />

        {/* Rear Left Wheel */}
        <rect x="5" y="22" width="12" height="28" rx="4" fill="url(#meshWheelGrad)" stroke={isSunRover ? "#f59e0b" : "#d4d4d8"} strokeWidth="0.8" />
        <line x1="7" y1="27" x2="15" y2="31" stroke={isSunRover ? "#451a03" : "#27272a"} strokeWidth="1.2" />
        <line x1="7" y1="33" x2="15" y2="37" stroke={isSunRover ? "#451a03" : "#27272a"} strokeWidth="1.2" />
        <line x1="7" y1="39" x2="15" y2="43" stroke={isSunRover ? "#451a03" : "#27272a"} strokeWidth="1.2" />

        {/* Rear Right Wheel */}
        <rect x="75" y="22" width="12" height="28" rx="4" fill="url(#meshWheelGrad)" stroke={isSunRover ? "#f59e0b" : "#d4d4d8"} strokeWidth="0.8" />
        <line x1="77" y1="27" x2="85" y2="31" stroke={isSunRover ? "#451a03" : "#27272a"} strokeWidth="1.2" />
        <line x1="77" y1="33" x2="85" y2="37" stroke={isSunRover ? "#451a03" : "#27272a"} strokeWidth="1.2" />
        <line x1="77" y1="39" x2="85" y2="43" stroke={isSunRover ? "#451a03" : "#27272a"} strokeWidth="1.2" />

        {/* ── Main Spaceframe Chassis / Solar Hull ── */}
        <rect
          x="22"
          y="16"
          width="48"
          height="106"
          rx="8"
          fill={isSunRover ? "url(#solarShieldGrad)" : "url(#lunarChassisGrad)"}
          stroke={isSunRover ? "#fef08a" : "#ffffff"}
          strokeWidth="1.5"
        />

        {/* ── Gold Kapton Foil Thermal Blanket (Moon) / Solar Intake Generator (Sun) ── */}
        <rect
          x="25"
          y="20"
          width="42"
          height="32"
          rx="4"
          fill="url(#lunarGoldFoil)"
          stroke={isSunRover ? "#ea580c" : "#f59e0b"}
          strokeWidth="0.8"
        />
        <line x1="39" y1="20" x2="39" y2="52" stroke="#b45309" strokeWidth="0.75" strokeDasharray="3 2" />
        <line x1="53" y1="20" x2="53" y2="52" stroke="#b45309" strokeWidth="0.75" strokeDasharray="3 2" />
        <line x1="25" y1="36" x2="67" y2="36" stroke="#b45309" strokeWidth="0.75" strokeDasharray="3 2" />

        {/* ── Solar / Avionics Cell Module ── */}
        <rect x="29" y="8" width="34" height="12" rx="2" fill="url(#solarCellGrad)" stroke={isSunRover ? "#f59e0b" : "#38bdf8"} strokeWidth="0.8" />
        <line x1="40" y1="8" x2="40" y2="20" stroke={isSunRover ? "#fef08a" : "#60a5fa"} strokeWidth="0.5" />
        <line x1="52" y1="8" x2="52" y2="20" stroke={isSunRover ? "#fef08a" : "#60a5fa"} strokeWidth="0.5" />

        {/* ── Crew Compartment / Explorer Cockpit ── */}
        <rect x="28" y="58" width="16" height="24" rx="4" fill="#18181b" stroke={isSunRover ? "#f97316" : "#71717a"} strokeWidth="0.8" />
        <ellipse cx="36" cy="70" rx="6" ry="6.5" fill={isSunRover ? "#fff7ed" : "#f4f4f5"} stroke={isSunRover ? "#ea580c" : "#e4e4e7"} strokeWidth="0.75" />
        <ellipse cx="36" cy="71" rx="4.5" ry="3.5" fill={isSunRover ? "#ea580c" : "#f59e0b"} opacity="0.9" />

        <rect x="48" y="58" width="16" height="24" rx="4" fill="#18181b" stroke={isSunRover ? "#f97316" : "#71717a"} strokeWidth="0.8" />
        <ellipse cx="56" cy="70" rx="6" ry="6.5" fill={isSunRover ? "#fff7ed" : "#f4f4f5"} stroke={isSunRover ? "#ea580c" : "#e4e4e7"} strokeWidth="0.75" />
        <ellipse cx="56" cy="71" rx="4.5" ry="3.5" fill={isSunRover ? "#ea580c" : "#f59e0b"} opacity="0.9" />

        {/* Center Joystick / Navigation Console */}
        <rect x="42" y="74" width="8" height="16" rx="2" fill="#27272a" stroke="#a1a1aa" strokeWidth="0.75" />
        <circle cx="46" cy="78" r="2" fill={isSunRover ? "#f59e0b" : "#10b981"} />
        <circle cx="46" cy="84" r="1.5" fill={isSunRover ? "#ea580c" : "#f59e0b"} />

        {/* ── Front Avionics Equipment Bay ── */}
        <rect x="26" y="88" width="40" height="28" rx="4" fill="#18181b" stroke={isSunRover ? "#f97316" : "#52525b"} strokeWidth="0.8" />
        <rect x="30" y="92" width="18" height="16" rx="2" fill="url(#lunarGoldFoil)" stroke="#f59e0b" strokeWidth="0.5" />
        <rect x="52" y="92" width="10" height="16" rx="1.5" fill="#09090b" stroke="#3f3f46" strokeWidth="0.5" />
        <line x1="54" y1="96" x2="60" y2="96" stroke={isSunRover ? "#f59e0b" : "#22c55e"} strokeWidth="0.75" />
        <line x1="54" y1="100" x2="58" y2="100" stroke={isSunRover ? "#ea580c" : "#38bdf8"} strokeWidth="0.75" />

        {/* ── High-Gain Parabolic Communications Dish (Moon) / Solar Concentrator (Sun) ── */}
        <g transform="translate(62, 108)">
          <line x1="0" y1="0" x2="10" y2="10" stroke={isSunRover ? "#fbbf24" : "#ffffff"} strokeWidth="1.5" />
          <ellipse cx="10" cy="10" rx="9" ry="9" fill={isSunRover ? "#7c2d12" : "#09090b"} stroke={isSunRover ? "#f59e0b" : "#e4e4e7"} strokeWidth="1.2" />
          <line x1="1" y1="10" x2="19" y2="10" stroke={isSunRover ? "#ea580c" : "#71717a"} strokeWidth="0.75" />
          <line x1="10" y1="1" x2="10" y2="19" stroke={isSunRover ? "#ea580c" : "#71717a"} strokeWidth="0.75" />
          <circle cx="10" cy="10" r="2" fill={isSunRover ? "#fef08a" : "#fbbf24"} stroke="#ffffff" strokeWidth="0.5" />
        </g>

        {/* ── Dual Terrain Headlights (Warm Solar Gold vs Cold Xenon White) ── */}
        <ellipse
          cx="32"
          cy="122"
          rx="4.5"
          ry="3"
          fill={isSunRover ? "#fef08a" : "#ffffff"}
          filter={isSunRover ? "drop-shadow(0 0 8px rgba(251, 191, 36, 0.95))" : "drop-shadow(0 0 8px rgba(255, 255, 255, 0.95))"}
        />
        <ellipse
          cx="60"
          cy="122"
          rx="4.5"
          ry="3"
          fill={isSunRover ? "#fef08a" : "#ffffff"}
          filter={isSunRover ? "drop-shadow(0 0 8px rgba(251, 191, 36, 0.95))" : "drop-shadow(0 0 8px rgba(255, 255, 255, 0.95))"}
        />

        {/* ── Rear Status Beacon LEDs ── */}
        <circle cx="28" cy="18" r="2.5" fill={isSunRover ? "#f59e0b" : "#ef4444"} filter={`drop-shadow(0 0 5px ${isSunRover ? "#f59e0b" : "#ef4444"})`} />
        <circle cx="64" cy="18" r="2.5" fill={isSunRover ? "#f59e0b" : "#ef4444"} filter={`drop-shadow(0 0 5px ${isSunRover ? "#f59e0b" : "#ef4444"})`} />
      </svg>
    </div>
  );
}
