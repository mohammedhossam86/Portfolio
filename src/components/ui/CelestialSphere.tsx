"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";

interface CelestialSphereProps {
  size?: number; // pixel size of the sphere
  className?: string;
  forceVariant?: "moon" | "sun";
  showRays?: boolean;
}

/**
 * CelestialSphere — Renders a photorealistic, intricately detailed
 * Moon (Dark Mode) or Sun (Light Mode) with 3D spherical depth,
 * surface craters/sunspots, atmospheric halo, and sunrise/sunset transition.
 */
export default function CelestialSphere({
  size = 220,
  className = "",
  forceVariant,
  showRays = true,
}: CelestialSphereProps) {
  const currentTheme = useCurrentTheme();
  const variant = forceVariant || (currentTheme === "light" ? "sun" : "moon");
  const isSun = variant === "sun";

  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`relative inline-flex items-center justify-center select-none pointer-events-none overflow-visible ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isSun ? (
          /* ══════════════════════════════════════════════════════════════════
             ☀️ THE RADIANT SUN (Sunrise Entrance & Sunset Exit)
             ══════════════════════════════════════════════════════════════════ */
          <motion.div
            key="celestial-sun"
            initial={{ y: 70, x: 30, opacity: 0, scale: 0.65, rotate: 25 }}
            animate={{ y: 0, x: 0, opacity: 1, scale: 1, rotate: 0 }}
            exit={{ y: 70, x: 40, opacity: 0, scale: 0.65, rotate: 25 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Outer Solar Atmospheric Aura & Glow */}
            <div
              className="absolute inset-[-35%] rounded-full transition-all duration-700 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, rgba(234, 88, 12, 0.25) 45%, transparent 75%)",
                filter: `blur(${Math.round(size * 0.16)}px)`,
              }}
            />

            {/* Rotating Solar Corona Rays */}
            {showRays && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-45%] rounded-full opacity-70 pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(251, 191, 36, 0.25) 0deg, transparent 20deg, rgba(249, 115, 22, 0.2) 45deg, transparent 70deg, rgba(251, 191, 36, 0.25) 90deg, transparent 115deg, rgba(245, 158, 11, 0.2) 140deg, transparent 165deg, rgba(251, 191, 36, 0.25) 180deg, transparent 205deg, rgba(249, 115, 22, 0.2) 235deg, transparent 260deg, rgba(251, 191, 36, 0.25) 270deg, transparent 295deg, rgba(245, 158, 11, 0.2) 325deg, transparent 350deg, rgba(251, 191, 36, 0.25) 360deg)",
                  filter: "blur(10px)",
                }}
              />
            )}

            {/* Pulsing Solar Corona Flare */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.65, 0.9, 0.65] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-[-12%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(254, 240, 138, 0.8) 45%, rgba(249, 115, 22, 0.4) 75%, transparent 100%)",
                filter: "blur(8px)",
              }}
            />

            {/* 3D Sun Body */}
            <SunSphereSVG />
          </motion.div>
        ) : (
          /* ══════════════════════════════════════════════════════════════════
             🌔 THE MAJESTIC MOON (Moonrise Entrance & Moonset Exit)
             ══════════════════════════════════════════════════════════════════ */
          <motion.div
            key="celestial-moon"
            initial={{ y: 70, x: -30, opacity: 0, scale: 0.65, rotate: -25 }}
            animate={{ y: 0, x: 0, opacity: 1, scale: 1, rotate: 0 }}
            exit={{ y: 70, x: -40, opacity: 0, scale: 0.65, rotate: -25 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Outer Lunar Aura */}
            <div
              className="absolute inset-[-30%] rounded-full transition-all duration-700 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(244, 244, 245, 0.35) 0%, rgba(161, 161, 170, 0.15) 50%, transparent 75%)",
                filter: `blur(${Math.round(size * 0.15)}px)`,
              }}
            />

            {/* Lunar Silver Shimmer */}
            <motion.div
              animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.75, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-[-8%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255, 255, 255, 0.4) 50%, rgba(212, 212, 216, 0.15) 75%, transparent 100%)",
                filter: "blur(6px)",
              }}
            />

            {/* 3D Moon Body */}
            <MoonSphereSVG />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// =============================================================================
// Detailed Photorealistic Sun SVG Body
// =============================================================================

function SunSphereSVG() {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-full h-full relative z-10 drop-shadow-2xl"
      animate={{ y: [-3, 3, -3] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <radialGradient id="sunCoreGrad" cx="42%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="20%" stopColor="#fef08a" />
          <stop offset="55%" stopColor="#f59e0b" />
          <stop offset="85%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#9a3412" />
        </radialGradient>

        <radialGradient id="sunLimbRim" cx="50%" cy="50%" r="50%">
          <stop offset="78%" stopColor="transparent" />
          <stop offset="94%" stopColor="rgba(154, 52, 18, 0.45)" />
          <stop offset="100%" stopColor="rgba(124, 45, 18, 0.85)" />
        </radialGradient>

        <clipPath id="sunSphereClip">
          <circle cx="100" cy="100" r="95" />
        </clipPath>
      </defs>

      <g clipPath="url(#sunSphereClip)">
        {/* Solar Core */}
        <circle cx="100" cy="100" r="95" fill="url(#sunCoreGrad)" />

        {/* Dynamic Solar Granulation & Plasma Turbulence */}
        <circle cx="85" cy="75" r="45" fill="rgba(254, 240, 138, 0.45)" filter="blur(6px)" />
        <circle cx="130" cy="120" r="40" fill="rgba(249, 115, 22, 0.35)" filter="blur(8px)" />
        <circle cx="65" cy="135" r="35" fill="rgba(245, 158, 11, 0.4)" filter="blur(7px)" />

        {/* Sunspots Group 1 */}
        <g opacity="0.85">
          <ellipse cx="68" cy="92" rx="5.5" ry="3.5" fill="#7c2d12" />
          <ellipse cx="68" cy="92" rx="3.5" ry="2" fill="#451a03" />
          <ellipse cx="78" cy="96" rx="3.5" ry="2.5" fill="#7c2d12" />
          <ellipse cx="78" cy="96" rx="2" ry="1.2" fill="#451a03" />
          <circle cx="85" cy="94" r="1.8" fill="#7c2d12" />
        </g>

        {/* Sunspots Group 2 */}
        <g opacity="0.8">
          <ellipse cx="125" cy="80" rx="7" ry="4" fill="#7c2d12" />
          <ellipse cx="125" cy="80" rx="4.5" ry="2.2" fill="#451a03" />
          <circle cx="137" cy="84" r="2.5" fill="#7c2d12" />
          <circle cx="118" cy="76" r="2" fill="#7c2d12" />
        </g>

        {/* Solar Flare Bright Faculae */}
        <path
          d="M 45,95 Q 65,85 85,92 T 130,78"
          stroke="rgba(255, 255, 255, 0.75)"
          strokeWidth="1.5"
          fill="none"
          filter="blur(1px)"
        />
        <path
          d="M 70,120 Q 95,130 120,125 T 150,110"
          stroke="rgba(255, 255, 255, 0.65)"
          strokeWidth="1.2"
          fill="none"
          filter="blur(1px)"
        />

        {/* Sun Limb Darkening */}
        <circle cx="100" cy="100" r="95" fill="url(#sunLimbRim)" />
      </g>

      {/* Outer 3D Rim Highlight */}
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="none"
        stroke="rgba(254, 240, 138, 0.85)"
        strokeWidth="1.5"
        className="opacity-80"
      />
    </motion.svg>
  );
}

// =============================================================================
// Detailed Photorealistic Moon SVG Body
// =============================================================================

function MoonSphereSVG() {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-full h-full relative z-10 drop-shadow-2xl"
      animate={{ y: [-3, 3, -3] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <radialGradient id="moonSphereGrad" cx="35%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#e4e4e7" />
          <stop offset="60%" stopColor="#a1a1aa" />
          <stop offset="88%" stopColor="#52525b" />
          <stop offset="100%" stopColor="#27272a" />
        </radialGradient>

        <radialGradient id="mareGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#3f3f46" stopOpacity="0.75" />
          <stop offset="70%" stopColor="#27272a" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#18181b" stopOpacity="0.95" />
        </radialGradient>

        <radialGradient id="craterShadow" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#18181b" stopOpacity="0.85" />
          <stop offset="75%" stopColor="#3f3f46" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#71717a" stopOpacity="0.3" />
        </radialGradient>

        <linearGradient id="craterRim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#71717a" stopOpacity="0.2" />
        </linearGradient>

        <clipPath id="moonSphereClip">
          <circle cx="100" cy="100" r="95" />
        </clipPath>
      </defs>

      <g clipPath="url(#moonSphereClip)">
        {/* Moon Spherical Body */}
        <circle cx="100" cy="100" r="95" fill="url(#moonSphereGrad)" />

        {/* Oceanus Procellarum */}
        <path
          d="M 35,65 Q 45,45 65,50 Q 80,60 75,85 Q 60,110 40,105 Q 25,90 35,65 Z"
          fill="url(#mareGrad)"
          opacity="0.8"
        />

        {/* Mare Imbrium */}
        <circle cx="82" cy="62" r="24" fill="url(#mareGrad)" opacity="0.85" />

        {/* Mare Serenitatis */}
        <circle cx="118" cy="65" r="17" fill="url(#mareGrad)" opacity="0.8" />

        {/* Mare Tranquillitatis */}
        <ellipse cx="135" cy="88" rx="19" ry="15" fill="url(#mareGrad)" opacity="0.85" />

        {/* Mare Crisium */}
        <ellipse cx="162" cy="74" rx="11" ry="8" fill="url(#mareGrad)" opacity="0.9" />

        {/* Mare Fecunditatis */}
        <ellipse cx="145" cy="115" rx="16" ry="12" fill="url(#mareGrad)" opacity="0.75" />

        {/* Mare Nubium */}
        <ellipse cx="65" cy="130" rx="18" ry="14" fill="url(#mareGrad)" opacity="0.75" />

        {/* Tycho Crater & Ray System */}
        <g>
          <line x1="88" y1="155" x2="40" y2="105" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeDasharray="3,4" />
          <line x1="88" y1="155" x2="95" y2="70" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          <line x1="88" y1="155" x2="145" y2="115" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeDasharray="4,3" />
          <line x1="88" y1="155" x2="120" y2="175" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
          <line x1="88" y1="155" x2="55" y2="168" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />

          <circle cx="88" cy="155" r="6.5" fill="url(#craterShadow)" stroke="url(#craterRim)" strokeWidth="1.2" />
          <circle cx="88" cy="155" r="1.5" fill="#ffffff" />
        </g>

        {/* Copernicus Crater */}
        <g>
          <circle cx="68" cy="78" r="8" fill="url(#craterShadow)" stroke="url(#craterRim)" strokeWidth="1.2" />
          <circle cx="68" cy="78" r="2" fill="#ffffff" opacity="0.8" />
        </g>

        {/* Kepler Crater */}
        <circle cx="48" cy="78" r="4.5" fill="url(#craterShadow)" stroke="url(#craterRim)" strokeWidth="0.8" />

        {/* Aristarchus Crater */}
        <circle cx="42" cy="62" r="4" fill="#ffffff" opacity="0.9" filter="drop-shadow(0 0 3px #ffffff)" />

        {/* Plato Crater */}
        <ellipse cx="80" cy="42" rx="6" ry="3.5" fill="#18181b" stroke="url(#craterRim)" strokeWidth="0.8" />

        {/* Highlands Craters */}
        <circle cx="108" cy="142" r="5" fill="url(#craterShadow)" stroke="url(#craterRim)" strokeWidth="0.8" />
        <circle cx="125" cy="150" r="6" fill="url(#craterShadow)" stroke="url(#craterRim)" strokeWidth="0.8" />
        <circle cx="72" cy="162" r="4.5" fill="url(#craterShadow)" stroke="url(#craterRim)" strokeWidth="0.6" />
        <circle cx="140" cy="140" r="5.5" fill="url(#craterShadow)" stroke="url(#craterRim)" strokeWidth="0.8" />

        {/* Terminator Gradient */}
        <path
          d="M 100,5 A 95,95 0 0,1 100,195 Q 135,100 100,5 Z"
          fill="rgba(9, 9, 11, 0.42)"
          filter="blur(4px)"
        />
      </g>

      {/* Outer 3D Rim Highlight */}
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="none"
        stroke="rgba(255, 255, 255, 0.75)"
        strokeWidth="1.5"
        className="opacity-80"
      />
    </motion.svg>
  );
}
