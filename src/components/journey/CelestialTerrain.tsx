"use client";

import React, { useMemo } from "react";
import { JourneyMilestone } from "@/types";

interface CelestialTerrainProps {
  isSunWorld: boolean;
  totalWorldWidth: number;
  milestones: JourneyMilestone[];
  getStationX: (index: number) => number;
  roadMinY: number;
  roadMaxY: number;
}

/**
 * CelestialTerrain — Implements the full physical surface environment:
 * - Dark Mode: The Moon Surface (Mare Tranquillitatis / Lunar Regolith, 3D Multi-Ringed Craters,
 *   Apollo 11/17 Lunar Roving Vehicle Chevron Tracks, Apollo Flags, ALSEP Science Stations,
 *   Astronaut Bootprints & Earthrise in the Sky).
 * - Light Mode: The Solar Surface (Photosphere Granules, Coronal Magnetic Loops,
 *   Active Magnetized Sunspots, Magnetic Levitation Energy Track & Solar Plasma Flares).
 */
export default function CelestialTerrain({
  isSunWorld,
  totalWorldWidth,
  milestones,
  getStationX,
  roadMinY,
  roadMaxY,
}: CelestialTerrainProps) {
  // Deterministic craters along the moon terrain
  const moonCraters = useMemo(() => {
    const list = [];
    const count = Math.max(12, Math.floor(totalWorldWidth / 260));
    for (let i = 0; i < count; i++) {
      const x = 120 + i * 270 + ((i * 73) % 110);
      const y = 35 + ((i * 47) % 240);
      const radius = 18 + ((i * 31) % 48); // sizes from 18px to 66px
      const hasPeak = radius > 38;
      list.push({ id: i, x, y, radius, hasPeak });
    }
    return list;
  }, [totalWorldWidth]);

  // Deterministic moon basalt boulders
  const moonRocks = useMemo(() => {
    const list = [];
    const count = Math.max(16, Math.floor(totalWorldWidth / 210));
    for (let i = 0; i < count; i++) {
      const x = 80 + i * 215 + ((i * 59) % 95);
      const y = 20 + ((i * 83) % 270);
      const size = 10 + ((i * 23) % 18);
      list.push({ id: i, x, y, size });
    }
    return list;
  }, [totalWorldWidth]);

  // Deterministic Sunspots for Solar Mode
  const sunspots = useMemo(() => {
    const list = [];
    const count = Math.max(10, Math.floor(totalWorldWidth / 320));
    for (let i = 0; i < count; i++) {
      const x = 180 + i * 330 + ((i * 91) % 120);
      const y = 45 + ((i * 61) % 220);
      const radius = 22 + ((i * 41) % 44);
      list.push({ id: i, x, y, radius });
    }
    return list;
  }, [totalWorldWidth]);

  // Deterministic Coronal Loops for Solar Mode
  const coronalLoops = useMemo(() => {
    const list = [];
    const count = Math.max(8, Math.floor(totalWorldWidth / 440));
    for (let i = 0; i < count; i++) {
      const x = 240 + i * 450 + ((i * 67) % 140);
      const width = 90 + ((i * 37) % 70);
      const height = 65 + ((i * 29) % 55);
      list.push({ id: i, x, width, height });
    }
    return list;
  }, [totalWorldWidth]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════════
          SKY ELEMENTS: Earthrise (Moon) vs Coronal Flares (Sun)
          ═══════════════════════════════════════════════════════════════════════ */}
      {!isSunWorld && (
        /* The Iconic "Earthrise" in the Dark Lunar Sky */
        <div
          className="absolute top-10 left-[72%] pointer-events-none z-10 select-none will-change-transform"
          style={{ filter: "drop-shadow(0 0 35px rgba(59, 130, 246, 0.75))" }}
        >
          <EarthriseGraphic size={140} />
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          GROUND SURFACE: Lunar Regolith (Dark) vs Solar Photosphere (Light)
          ═══════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          top: `${roadMinY - 45}px`,
          bottom: "0px",
        }}
        className={`absolute left-0 right-0 border-t-2 transition-colors duration-500 overflow-hidden ${
          isSunWorld
            ? "bg-[#fff7ed] border-orange-400/90 shadow-[inset_0_24px_60px_rgba(234,88,12,0.18)]"
            : "bg-[#101117] border-zinc-700/80 shadow-[inset_0_24px_60px_rgba(0,0,0,0.98)]"
        }`}
      >
        {/* ─── Ground Horizon Boundary Glow ─── */}
        <div
          className={`absolute top-0 left-0 right-0 h-2.5 z-10 ${
            isSunWorld
              ? "bg-gradient-to-r from-orange-500 via-amber-300 to-orange-500 shadow-[0_0_18px_rgba(245,158,11,0.85)]"
              : "bg-gradient-to-r from-zinc-600 via-zinc-200 to-zinc-600 shadow-[0_0_16px_rgba(244,244,245,0.45)]"
          }`}
        />

        {isSunWorld ? (
          /* ═══════════════════════════════════════════════════════════════════
             ☀️ SOLAR SURFACE: Photosphere Granulation, Coronal Loops & Sunspots
             ═══════════════════════════════════════════════════════════════════ */
          <div className="absolute inset-0 pointer-events-none">
            {/* Boiling Solar Convection Granulation Texture */}
            <div
              className="absolute inset-0 opacity-45"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.35) 0%, transparent 60%), radial-gradient(circle at 20% 40%, rgba(249, 115, 22, 0.3) 0%, transparent 55%), radial-gradient(circle at 80% 60%, rgba(234, 88, 12, 0.25) 0%, transparent 50%)",
                backgroundSize: "180px 180px, 240px 240px, 200px 200px",
              }}
            />

            {/* Glowing Coronal Magnetic Loops rising from the Sun */}
            {coronalLoops.map((loop) => (
              <div
                key={loop.id}
                className="absolute -top-1"
                style={{ left: `${loop.x}px` }}
              >
                <svg
                  width={loop.width}
                  height={loop.height}
                  viewBox="0 0 100 80"
                  fill="none"
                  className="overflow-visible"
                  style={{ filter: "drop-shadow(0 0 10px rgba(245, 158, 11, 0.9))" }}
                >
                  <path
                    d="M 10,80 Q 50,-15 90,80"
                    stroke="url(#solarLoopGrad)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 22,80 Q 50,5 78,80"
                    stroke="#ffffff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.8"
                  />
                  <defs>
                    <linearGradient id="solarLoopGrad" x1="0%" y1="100%" x2="50%" y2="0%">
                      <stop offset="0%" stopColor="#ea580c" />
                      <stop offset="45%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            ))}

            {/* Active Magnetized Sunspots */}
            {sunspots.map((spot) => (
              <div
                key={spot.id}
                className="absolute rounded-full"
                style={{
                  left: `${spot.x}px`,
                  top: `${spot.y}px`,
                  width: `${spot.radius * 2}px`,
                  height: `${spot.radius * 1.5}px`,
                  background:
                    "radial-gradient(ellipse at 48% 48%, #431407 0%, #7c2d12 45%, #ea580c 75%, transparent 100%)",
                  boxShadow: "0 0 18px rgba(234, 88, 12, 0.65)",
                  border: "1px solid rgba(251, 191, 36, 0.3)",
                }}
              >
                {/* Core Umbra */}
                <div
                  className="absolute inset-[28%] rounded-full bg-[#1c1917]"
                  style={{ boxShadow: "inset 0 0 8px #431407" }}
                />
              </div>
            ))}

            {/* ── Helios Magnetic Energy Highway (Floating Rails) ── */}
            {/* Upper Magnetic Levitation Guide Rail */}
            <div
              className="absolute top-24 left-0 right-0 h-3 opacity-80"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, #ea580c 0px, #ea580c 30px, #fbbf24 30px, #fbbf24 45px, transparent 45px, transparent 65px)",
                boxShadow: "0 0 12px rgba(249, 115, 22, 0.6)",
              }}
            />

            {/* Central High-Speed Energy Chevrons (>>> >>> >>>) */}
            <div
              className="absolute top-52 left-0 right-0 h-6 flex items-center font-mono text-sm font-extrabold tracking-widest text-orange-600/75 select-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, rgba(234, 88, 12, 0.9) 0px, rgba(251, 191, 36, 0.9) 24px, transparent 24px, transparent 64px)",
                height: "4px",
                boxShadow: "0 0 16px rgba(251, 191, 36, 0.8)",
              }}
            />

            {/* Lower Magnetic Levitation Guide Rail */}
            <div
              className="absolute top-84 left-0 right-0 h-3 opacity-80"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, #ea580c 0px, #ea580c 30px, #fbbf24 30px, #fbbf24 45px, transparent 45px, transparent 65px)",
                boxShadow: "0 0 12px rgba(249, 115, 22, 0.6)",
              }}
            />
          </div>
        ) : (
          /* ═══════════════════════════════════════════════════════════════════
             🌙 MOON SURFACE: Lunar Regolith, 3D Craters, Apollo Tracks & Flags
             ═══════════════════════════════════════════════════════════════════ */
          <div className="absolute inset-0 pointer-events-none">
            {/* Powdery Lunar Dust Regolith Texture */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 50%, #ffffff 0.8px, transparent 0.8px), radial-gradient(circle at 25% 25%, #d4d4d8 1.2px, transparent 1.2px)",
                backgroundSize: "28px 28px, 56px 56px",
              }}
            />

            {/* Scattered 3D Lunar Craters with Sunlit Rims & Deep Shadows */}
            {moonCraters.map((crater) => (
              <div
                key={crater.id}
                className="absolute rounded-full"
                style={{
                  left: `${crater.x}px`,
                  top: `${crater.y}px`,
                  width: `${crater.radius * 2}px`,
                  height: `${crater.radius * 1.6}px`,
                  background:
                    "radial-gradient(ellipse at 42% 40%, #08080c 0%, #12131a 50%, #1f212d 85%, #3f3f46 100%)",
                  boxShadow:
                    "inset -4px -3px 8px rgba(0, 0, 0, 0.95), inset 3px 2px 5px rgba(255, 255, 255, 0.35), 0 3px 6px rgba(0, 0, 0, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                }}
              >
                {/* Central Rebound Peak for Major Craters */}
                {crater.hasPeak && (
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      width: `${crater.radius * 0.35}px`,
                      height: `${crater.radius * 0.35}px`,
                      background: "linear-gradient(135deg, #e4e4e7 0%, #27272a 100%)",
                      boxShadow: "1px 1px 3px rgba(0,0,0,0.9)",
                    }}
                  />
                )}
              </div>
            ))}

            {/* Scattered Moon Basalt Boulders with Long Lunar Shadows */}
            {moonRocks.map((rock) => (
              <div
                key={rock.id}
                className="absolute rounded-sm"
                style={{
                  left: `${rock.x}px`,
                  top: `${rock.y}px`,
                  width: `${rock.size}px`,
                  height: `${rock.size * 0.75}px`,
                  background: "linear-gradient(145deg, #71717a 0%, #27272a 60%, #09090b 100%)",
                  boxShadow: "6px 5px 8px rgba(0, 0, 0, 0.95)",
                  transform: `rotate(${((rock.id * 37) % 60) - 30}deg)`,
                }}
              />
            ))}

            {/* ── Authentic Apollo LRV Dual Tire Tracks (Herringbone Chevron) ── */}
            {/* Left Wire-Mesh Wheel Track */}
            <div
              className="absolute top-26 left-0 right-0 h-4 opacity-50"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #27272a 0px, #27272a 3px, #09090b 3px, #09090b 7px, #3f3f46 7px, #3f3f46 9px)",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                borderBottom: "1px solid rgba(0, 0, 0, 0.8)",
              }}
            />

            {/* Center Moon Exploration Trajectory Line (Subtle Golden Starlight Guide) */}
            <div
              className="absolute top-56 left-0 right-0 h-1.5 opacity-70"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, #fbbf24 0px, #fbbf24 40px, transparent 40px, transparent 80px)",
                boxShadow: "0 0 10px rgba(251, 191, 36, 0.5)",
              }}
            />

            {/* Right Wire-Mesh Wheel Track */}
            <div
              className="absolute top-86 left-0 right-0 h-4 opacity-50"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #27272a 0px, #27272a 3px, #09090b 3px, #09090b 7px, #3f3f46 7px, #3f3f46 9px)",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                borderBottom: "1px solid rgba(0, 0, 0, 0.8)",
              }}
            />

            {/* ── Apollo Moon Flags & Astronaut Footprints at Outposts ── */}
            {milestones.map((_, i) => {
              const sx = getStationX(i);
              return (
                <div key={i} className="absolute" style={{ left: `${sx - 40}px`, top: "12px" }}>
                  {/* Apollo Mission Flag */}
                  <div className="absolute -top-14 left-0">
                    <ApolloFlagSVG />
                  </div>

                  {/* Astronaut Bootprints leading to the Outpost */}
                  <div className="absolute top-1 left-7 flex flex-col gap-2.5 opacity-40">
                    <div className="w-2.5 h-1.5 rounded-full bg-zinc-950 border border-zinc-600 rotate-12" />
                    <div className="w-2.5 h-1.5 rounded-full bg-zinc-950 border border-zinc-600 -rotate-12 translate-x-2" />
                    <div className="w-2.5 h-1.5 rounded-full bg-zinc-950 border border-zinc-600 rotate-12" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Surface Sector Coordinate Labels ── */}
        {milestones.map((_, i) => (
          <div
            key={i}
            style={{ left: `${getStationX(i) - 90}px` }}
            className={`absolute top-48 -translate-y-1/2 flex items-center gap-2.5 font-mono text-[11px] font-bold tracking-widest pointer-events-none select-none uppercase z-10 ${
              isSunWorld ? "text-orange-950/70" : "text-zinc-400/80"
            }`}
          >
            <span className={isSunWorld ? "text-amber-600" : "text-amber-400"}>◆◆◆</span>
            <span>
              {isSunWorld
                ? `HELIOS SOLAR BASE • SECTOR ${i + 1}`
                : `APOLLO LUNAR BASE • SECTOR ${i + 1}`}
            </span>
            <span className={isSunWorld ? "text-amber-600" : "text-amber-400"}>◆◆◆</span>
          </div>
        ))}
      </div>
    </>
  );
}

// =============================================================================
// Earthrise SVG Graphic (The Blue Marble seen from the Moon)
// =============================================================================

function EarthriseGraphic({ size = 130 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Deep Ocean Blue Sphere */}
        <radialGradient id="oceanGrad" cx="38%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="40%" stopColor="#2563eb" />
          <stop offset="80%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>

        {/* Atmospheric Blue Rim Glow */}
        <radialGradient id="atmoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="80%" stopColor="transparent" />
          <stop offset="95%" stopColor="#38bdf8" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.9" />
        </radialGradient>
      </defs>

      {/* Outer Atmospheric Aura */}
      <circle cx="50" cy="50" r="49" fill="url(#atmoGlow)" />

      {/* Main Earth Ocean Globe */}
      <circle cx="50" cy="50" r="46" fill="url(#oceanGrad)" />

      {/* Continents (North America, Africa, Eurasia hints) */}
      <path
        d="M 32,24 Q 40,20 46,28 Q 52,36 44,44 Q 38,40 32,32 Z"
        fill="#15803d"
        opacity="0.85"
      />
      <path
        d="M 48,38 Q 62,34 68,45 Q 66,58 56,62 Q 48,54 48,38 Z"
        fill="#16a34a"
        opacity="0.8"
      />
      <path
        d="M 28,52 Q 36,50 40,62 Q 34,74 26,68 Q 24,58 28,52 Z"
        fill="#15803d"
        opacity="0.8"
      />

      {/* Swirling Atmospheric Cloud Bands (White & Translucent) */}
      <path
        d="M 12,38 Q 30,28 58,35 Q 78,40 88,32"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      <path
        d="M 16,56 Q 42,48 68,58 Q 82,64 86,52"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M 24,20 Q 50,14 74,22"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />

      {/* Night-side Shadow Curve (Half Earth Phase) */}
      <path
        d="M 50,4 A 46,46 0 0,1 50,96 A 35,46 0 0,0 50,4 Z"
        fill="#05070e"
        opacity="0.55"
      />
    </svg>
  );
}

// =============================================================================
// Apollo Mission Flag SVG (Planted on the Moon)
// =============================================================================

function ApolloFlagSVG() {
  return (
    <svg width="42" height="54" viewBox="0 0 42 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Gold Pole Base in Lunar Regolith */}
      <ellipse cx="6" cy="51" rx="5" ry="2" fill="#27272a" />
      <circle cx="6" cy="50" r="2" fill="#e4e4e7" />

      {/* Vertical Flagpole */}
      <line x1="6" y1="50" x2="6" y2="8" stroke="#d4d4d8" strokeWidth="2" strokeLinecap="round" />

      {/* Top Gold Finial */}
      <circle cx="6" cy="7" r="1.5" fill="#f59e0b" />

      {/* Horizontal Spreader Bar (keeps flag extended in lunar vacuum) */}
      <line x1="6" y1="9" x2="36" y2="9" stroke="#d4d4d8" strokeWidth="1.2" />

      {/* Flag Fabric with Slight Wave */}
      <rect x="7" y="10" width="28" height="18" rx="1" fill="#ef4444" />
      <rect x="7" y="13" width="28" height="3" fill="#ffffff" />
      <rect x="7" y="19" width="28" height="3" fill="#ffffff" />
      <rect x="7" y="25" width="28" height="3" fill="#ffffff" />

      {/* Canton (Blue field) */}
      <rect x="7" y="10" width="12" height="10" fill="#1d4ed8" />
      <circle cx="10" cy="13" r="0.8" fill="#ffffff" />
      <circle cx="15" cy="13" r="0.8" fill="#ffffff" />
      <circle cx="12.5" cy="16" r="0.8" fill="#ffffff" />
    </svg>
  );
}
