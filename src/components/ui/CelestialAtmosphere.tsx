"use client";

import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { useEffect, useState } from "react";

/**
 * CelestialAtmosphere — Global ambient celestial environment across the entire page:
 * - Night / Moon Mode: Twinkling stars, occasional shooting stars, soft lunar night clouds, and silver stardust.
 * - Day / Sun Mode: Soft floating daylight clouds, warm solar rays, and golden sun dust.
 */
export default function CelestialAtmosphere() {
  const currentTheme = useCurrentTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isSun = currentTheme === "light";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-opacity duration-700"
    >
      {isSun ? (
        /* ══════════════════════════════════════════════════════════════════
           DAY / SUN AMBIENCE: Warm Golden Clouds, Sunbeams & Solar Dust
           ══════════════════════════════════════════════════════════════════ */
        <div className="absolute inset-0">
          {/* Subtle Golden Sunbeams streaming from top-right */}
          <div
            className="absolute -top-32 right-[-10%] w-[900px] h-[900px] pointer-events-none opacity-40"
            style={{
              background:
                "conic-gradient(from 220deg at 80% 20%, rgba(251, 191, 36, 0.28) 0deg, transparent 25deg, rgba(249, 115, 22, 0.15) 50deg, transparent 75deg, rgba(251, 191, 36, 0.22) 100deg, transparent 130deg, rgba(254, 240, 138, 0.25) 160deg, transparent 190deg)",
              filter: "blur(25px)",
            }}
          />

          {/* Drifting Daylight Cloud Layer 1 (Upper High-Altitude Altocumulus - Slow & Soft) */}
          <div className="celestial-cloud-drift-slow absolute top-[8%] -left-[300px] w-[580px] h-[180px] opacity-75">
            <DayCloudSVG className="w-full h-full text-white/80" glow="#fed7aa" />
          </div>

          {/* Drifting Daylight Cloud Layer 2 (Mid-Level Fluffy Cumulus) */}
          <div className="celestial-cloud-drift-mid absolute top-[28%] -left-[450px] w-[680px] h-[220px] opacity-65">
            <DayCloudSVG className="w-full h-full text-white/70" glow="#fef3c7" />
          </div>

          {/* Drifting Daylight Cloud Layer 3 (Lower Atmosphere Soft Drift) */}
          <div className="celestial-cloud-drift-fast absolute top-[55%] -left-[400px] w-[620px] h-[200px] opacity-55">
            <DayCloudSVG className="w-full h-full text-white/60" glow="#fed7aa" />
          </div>

          {/* Drifting Daylight Cloud Layer 4 (Deep Horizon Layer) */}
          <div className="celestial-cloud-drift-slowest absolute top-[78%] -left-[500px] w-[750px] h-[240px] opacity-60">
            <DayCloudSVG className="w-full h-full text-white/75" glow="#fef08a" />
          </div>

          {/* Floating Solar Motes (Warm golden specks rising gently) */}
          <SolarDustParticles count={28} />
        </div>
      ) : (
        /* ══════════════════════════════════════════════════════════════════
           NIGHT / MOON AMBIENCE: Starfield, Shooting Stars & Lunar Clouds
           ══════════════════════════════════════════════════════════════════ */
        <div className="absolute inset-0">
          {/* Twinkling Starfield across the entire page */}
          <Starfield count={65} />

          {/* Periodic Shooting Stars */}
          <div className="shooting-star shooting-star-1" />
          <div className="shooting-star shooting-star-2" />
          <div className="shooting-star shooting-star-3" />

          {/* Lunar Ethereal Night Cloud Layer 1 (High Atmosphere Cirrocumulus) */}
          <div className="celestial-cloud-drift-slow absolute top-[6%] -left-[350px] w-[620px] h-[200px] opacity-55">
            <NightCloudSVG className="w-full h-full text-zinc-900/60" glow="#38bdf8" />
          </div>

          {/* Lunar Ethereal Night Cloud Layer 2 (Mid Atmosphere Moon-Glow Stratus) */}
          <div className="celestial-cloud-drift-mid absolute top-[32%] -left-[480px] w-[720px] h-[230px] opacity-45">
            <NightCloudSVG className="w-full h-full text-zinc-950/70" glow="#e0e7ff" />
          </div>

          {/* Lunar Ethereal Night Cloud Layer 3 (Deep Cosmic Dust Cloud) */}
          <div className="celestial-cloud-drift-fast absolute top-[62%] -left-[420px] w-[660px] h-[210px] opacity-50">
            <NightCloudSVG className="w-full h-full text-zinc-900/65" glow="#c7d2fe" />
          </div>

          {/* Lunar Ethereal Night Cloud Layer 4 (Lower Horizon Cloud) */}
          <div className="celestial-cloud-drift-slowest absolute top-[82%] -left-[520px] w-[780px] h-[250px] opacity-40">
            <NightCloudSVG className="w-full h-full text-zinc-950/75" glow="#93c5fd" />
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Starfield Sub-Component (Twinkling Cosmic Stars in Dark Mode)
// =============================================================================

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

function Starfield({ count = 60 }: { count?: number }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const starColors = [
      "#ffffff",
      "#f4f4f5",
      "#e4e4e7",
      "#fef08a",
      "#bae6fd",
      "#c7d2fe",
    ];

    const generated: Star[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 100, // % from top
      left: Math.random() * 100, // % from left
      size: Math.random() < 0.2 ? 3 : Math.random() < 0.6 ? 2 : 1.2,
      duration: 2.2 + Math.random() * 3.8,
      delay: Math.random() * 5,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    setStars(generated);
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((star) => (
        <span
          key={star.id}
          className="celestial-twinkle absolute rounded-full"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow:
              star.size > 2
                ? `0 0 8px ${star.color}, 0 0 16px ${star.color}`
                : `0 0 4px ${star.color}`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// =============================================================================
// Solar Dust Particles (Warm Light Mode Rising Specks)
// =============================================================================

interface DustParticle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function SolarDustParticles({ count = 24 }: { count?: number }) {
  const [particles, setParticles] = useState<DustParticle[]>([]);

  useEffect(() => {
    const generated: DustParticle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1.5 + Math.random() * 2.5,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 6,
      opacity: 0.2 + Math.random() * 0.45,
    }));
    setParticles(generated);
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p) => (
        <span
          key={p.id}
          className="solar-dust-rise absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: "#ea580c",
            boxShadow: "0 0 8px rgba(245, 158, 11, 0.8)",
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// =============================================================================
// Organic Vector Cloud Shapes
// =============================================================================

function DayCloudSVG({ className = "", glow = "#fed7aa" }: { className?: string; glow?: string }) {
  return (
    <svg
      viewBox="0 0 500 180"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 14px 28px ${glow}50)` }}
    >
      <path
        d="M 60,140 Q 30,140 20,115 Q 10,85 40,75 Q 50,40 90,35 Q 130,28 160,50 Q 190,15 250,15 Q 315,15 345,55 Q 380,35 420,55 Q 465,75 460,115 Q 480,140 440,140 Z"
        opacity="0.92"
      />
      {/* Soft inner fluff highlights */}
      <path
        d="M 120,60 Q 150,40 200,45 Q 240,40 280,60"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

function NightCloudSVG({ className = "", glow = "#e0e7ff" }: { className?: string; glow?: string }) {
  return (
    <svg
      viewBox="0 0 500 180"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 14px 35px ${glow}25)` }}
    >
      <path
        d="M 70,140 Q 25,140 20,105 Q 15,70 55,60 Q 75,25 125,25 Q 165,25 195,50 Q 230,10 300,10 Q 370,10 405,50 Q 445,35 470,70 Q 490,105 455,140 Z"
        opacity="0.85"
      />
      {/* Ethereal lunar edge highlight */}
      <path
        d="M 100,35 Q 150,20 220,30 Q 280,15 350,30"
        stroke="rgba(244, 244, 245, 0.4)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />
    </svg>
  );
}
