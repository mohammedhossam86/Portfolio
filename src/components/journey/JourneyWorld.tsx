"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { JourneyMilestone } from "@/types";
import TopDownCar from "./TopDownCar";
import {
  Sparkles,
  Trophy,
  Briefcase,
  GraduationCap,
  Compass,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Play,
  RotateCcw,
  Images,
  Maximize2,
  ChevronRight,
  ChevronLeft,
  Flame,
} from "lucide-react";

interface JourneyWorldProps {
  milestones: JourneyMilestone[];
  onInspectMilestone: (milestone: JourneyMilestone) => void;
}

// Grand Open-World Dimensions & Physics
const STATION_START_X = 420;
const STATION_GAP = 560;
const ROAD_MIN_Y = 440;
const ROAD_MAX_Y = 720;
const STATION_Y = 240;
const PROXIMITY_THRESHOLD = 320;

export default function JourneyWorld({
  milestones,
  onInspectMilestone,
}: JourneyWorldProps) {
  const totalWorldWidth = STATION_START_X + milestones.length * STATION_GAP + 500;

  // Car Physics State
  const [carX, setCarX] = useState(STATION_START_X);
  const [carY, setCarY] = useState(580);
  const [carAngle, setCarAngle] = useState(0); // 0 = facing right
  const [isDriving, setIsDriving] = useState(false);
  const [speedKmh, setSpeedKmh] = useState(0);
  const [autoCruise, setAutoCruise] = useState(false);
  const [activeStationIdx, setActiveStationIdx] = useState(0);
  const [focusedMilestone, setFocusedMilestone] = useState<JourneyMilestone | null>(
    milestones[0] || null
  );

  // Viewport / Camera Scrolling
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [viewportWidth, setViewportWidth] = useState(1200);
  const isHoveredRef = useRef(false);

  // Keyboard Tracking
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const animFrameRef = useRef<number | null>(null);
  const targetXRef = useRef<number | null>(null);

  // Measure container viewport width dynamically
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setViewportWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // ─── Station Coordinate Calculator ─────────────────────────────────────────
  const getStationX = (index: number) => STATION_START_X + index * STATION_GAP;

  // ─── Drive to Specific Station ─────────────────────────────────────────────
  const driveToStation = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(milestones.length - 1, index));
      const targetX = getStationX(clamped);
      targetXRef.current = targetX;
      setActiveStationIdx(clamped);
      setIsDriving(true);
    },
    [milestones.length]
  );

  // ─── Proximity Check ───────────────────────────────────────────────────────
  const checkProximity = useCallback(
    (x: number, y: number) => {
      let closestIdx = -1;
      let minDistance = Infinity;

      milestones.forEach((m, idx) => {
        const sx = getStationX(idx);
        const sy = STATION_Y;
        const dist = Math.hypot(x - sx, y - sy);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      if (minDistance < PROXIMITY_THRESHOLD && closestIdx !== -1) {
        setActiveStationIdx(closestIdx);
        setFocusedMilestone(milestones[closestIdx]);
      } else {
        setFocusedMilestone(null);
      }
    },
    [milestones]
  );

  // ─── Physics & Animation Loop (Silky 60fps) ─────────────────────────────────
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Automated Drive To Station
      if (targetXRef.current !== null) {
        setCarX((prevX) => {
          const targetX = targetXRef.current!;
          const diff = targetX - prevX;
          const step = Math.sign(diff) * Math.min(Math.abs(diff), 480 * dt);

          if (Math.abs(diff) <= 6) {
            targetXRef.current = null;
            setIsDriving(false);
            setSpeedKmh(0);
            return targetX;
          }

          const newX = prevX + step;
          setCarAngle(step > 0 ? 0 : 180);
          setSpeedKmh(Math.round(Math.abs(step) * 2.6));
          checkProximity(newX, carY);
          return newX;
        });
      } else {
        // Manual Keyboard or Touch Movement
        let vx = 0;
        let vy = 0;
        const keys = keysPressed.current;

        if (keys["ArrowRight"] || keys["d"] || keys["D"]) vx += 1;
        if (keys["ArrowLeft"] || keys["a"] || keys["A"]) vx -= 1;
        if (keys["ArrowUp"] || keys["w"] || keys["W"]) vy -= 1;
        if (keys["ArrowDown"] || keys["s"] || keys["S"]) vy += 1;

        if (vx !== 0 || vy !== 0) {
          setIsDriving(true);
          const moveSpeed = 440 * dt;
          const mag = Math.hypot(vx, vy);
          const normX = (vx / mag) * moveSpeed;
          const normY = (vy / mag) * moveSpeed;

          // Calculate car rotation
          const angleRad = Math.atan2(vy, vx);
          const angleDeg = (angleRad * 180) / Math.PI;
          setCarAngle(angleDeg);

          setCarX((prevX) => {
            const nextX = Math.max(140, Math.min(totalWorldWidth - 160, prevX + normX));
            checkProximity(nextX, carY);
            return nextX;
          });

          setCarY((prevY) => {
            const nextY = Math.max(ROAD_MIN_Y, Math.min(ROAD_MAX_Y, prevY + normY));
            checkProximity(carX, nextY);
            return nextY;
          });

          setSpeedKmh(Math.round(moveSpeed * 3.4));
        } else {
          setIsDriving(false);
          setSpeedKmh((prev) => Math.max(0, prev - 5));
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [carX, carY, checkProximity, totalWorldWidth]);

  // ─── Auto Cruise Controller ────────────────────────────────────────────────
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoCruise) {
      timer = setInterval(() => {
        setActiveStationIdx((prev) => {
          const next = (prev + 1) % milestones.length;
          driveToStation(next);
          return next;
        });
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [autoCruise, driveToStation, milestones.length]);

  // ─── Keyboard Listeners (Isolated to Journey Hover) ─────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (!isHoveredRef.current) return;

      const key = e.key;

      if (
        [
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "w",
          "a",
          "s",
          "d",
          "W",
          "A",
          "S",
          "D",
          " ",
        ].includes(key)
      ) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (key === " " && focusedMilestone) {
        onInspectMilestone(focusedMilestone);
      } else {
        keysPressed.current[key] = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      delete keysPressed.current[e.key];
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [focusedMilestone, onInspectMilestone]);

  // ─── Camera Offset Calculation ─────────────────────────────────────────────
  const maxScroll = Math.max(0, totalWorldWidth - viewportWidth);
  const targetCamX = Math.max(0, Math.min(maxScroll, carX - viewportWidth / 2));

  // Category Icon Resolver
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "education":
        return <GraduationCap size={18} className="text-cyan-400" />;
      case "achievement":
        return <Trophy size={18} className="text-amber-400" />;
      case "work":
        return <Briefcase size={18} className="text-purple-400" />;
      default:
        return <Compass size={18} className="text-emerald-400" />;
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        keysPressed.current = {};
      }}
      className="relative w-full h-[780px] sm:h-[840px] overflow-hidden select-none"
    >
      {/* ── Seamless Top & Bottom Vignette Fades into Page Background ── */}
      <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#05070f] via-[#05070f]/80 to-transparent pointer-events-none z-30" />
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#05070f] via-[#05070f]/80 to-transparent pointer-events-none z-30" />

      {/* ── Top Floating HUD Dashboard Overlay ── */}
      <div className="absolute top-6 left-6 right-6 z-40 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
        {/* Speedometer & Station Tracker */}
        <div className="flex items-center gap-3.5 p-2.5 px-4 rounded-2xl bg-[#0b0e1a]/85 border border-slate-700/60 backdrop-blur-2xl shadow-2xl pointer-events-auto">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_12px_#22d3ee]" />
            <span className="text-slate-400">CRUISE SPEED:</span>
            <strong className="text-white text-base tracking-tight">{speedKmh}</strong>
            <span className="text-[11px] text-cyan-400 font-bold">KM/H</span>
          </div>

          <div className="h-5 w-px bg-slate-700/80" />

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-slate-400">LANDMARK:</span>
            <strong className="text-amber-300 text-sm">
              #{activeStationIdx + 1} of {milestones.length}
            </strong>
          </div>
        </div>

        {/* Action Controls: Navigation & Auto-Cruise */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <button
            onClick={() => driveToStation(activeStationIdx - 1)}
            disabled={activeStationIdx === 0}
            className="p-3 rounded-2xl bg-[#0b0e1a]/85 border border-slate-700/60 text-slate-300 hover:text-white hover:border-cyan-500/50 active:scale-95 disabled:opacity-30 transition-all shadow-xl backdrop-blur-2xl"
            title="Drive to Previous Milestone"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => setAutoCruise(!autoCruise)}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-mono font-semibold transition-all border shadow-xl backdrop-blur-2xl active:scale-95 ${
              autoCruise
                ? "bg-amber-500/25 text-amber-300 border-amber-400 shadow-amber-500/20"
                : "bg-[#0b0e1a]/85 border-slate-700/60 text-slate-200 hover:text-white hover:border-slate-500"
            }`}
          >
            <Play size={14} className={autoCruise ? "animate-spin text-amber-400" : ""} />
            <span>{autoCruise ? "Auto-Cruise Active" : "Auto-Cruise Mode"}</span>
          </button>

          <button
            onClick={() => driveToStation(activeStationIdx + 1)}
            disabled={activeStationIdx === milestones.length - 1}
            className="p-3 rounded-2xl bg-[#0b0e1a]/85 border border-slate-700/60 text-slate-300 hover:text-white hover:border-cyan-500/50 active:scale-95 disabled:opacity-30 transition-all shadow-xl backdrop-blur-2xl"
            title="Drive to Next Milestone"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ── Seamless Full-Width Background Canvas (Pans with Car) ── */}
      <div
        className="absolute top-0 bottom-0 left-0 h-full transition-transform duration-75 ease-out"
        style={{
          width: `${totalWorldWidth}px`,
          transform: `translateX(-${targetCamX}px)`,
        }}
      >
        {/* ── Background Deep Atmosphere & Night Horizon ── */}
        <div className="absolute inset-0 bg-[#05070f]">
          {/* Subtle Grid Stars & Nebula */}
          <div
            className="absolute top-0 left-0 right-0 h-72 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(56, 189, 248, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.08) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          {/* Horizon Aura */}
          <div
            className="absolute top-44 left-0 right-0 h-96 pointer-events-none opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.35), rgba(6, 182, 212, 0.2), transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        {/* ── Curbside Landmark Billboards (Milestone Stations) ── */}
        {milestones.map((milestone, idx) => {
          const sx = getStationX(idx);
          const isNear = focusedMilestone?.id === milestone.id;
          const dist = Math.hypot(carX - sx, carY - STATION_Y);
          const proximity = Math.max(0, 1 - dist / 380);

          return (
            <div
              key={milestone.id}
              style={{
                left: `${sx}px`,
                top: "80px",
              }}
              className="absolute -translate-x-1/2 w-[380px] sm:w-[420px] z-20 flex flex-col items-center"
            >
              {/* Grand Spot Light Beam Shining Down on the Highway */}
              <div
                className="absolute -top-12 w-48 h-[420px] pointer-events-none transition-opacity duration-300"
                style={{
                  background:
                    "conic-gradient(from 180deg at 50% 0%, rgba(56, 189, 248, 0.3) 0deg, transparent 70deg, transparent 290deg, rgba(56, 189, 248, 0.3) 360deg)",
                  opacity: 0.25 + proximity * 0.75,
                  filter: "blur(16px)",
                }}
              />

              {/* Milestone Landmark Billboard */}
              <div
                onClick={() => onInspectMilestone(milestone)}
                style={{
                  transform: `scale(${1 + proximity * 0.05})`,
                  borderColor: isNear
                    ? "rgba(56, 189, 248, 0.95)"
                    : `rgba(51, 65, 85, ${0.4 + proximity * 0.45})`,
                  boxShadow: isNear
                    ? "0 0 35px rgba(56, 189, 248, 0.5), 0 20px 40px rgba(0,0,0,0.85)"
                    : "0 12px 30px rgba(0,0,0,0.75)",
                }}
                className="relative w-full rounded-3xl bg-[#0b0e1a]/95 backdrop-blur-2xl p-5 sm:p-6 transition-all duration-200 border cursor-pointer hover:border-cyan-400 group/station"
              >
                {/* Header: Date + Category Badge */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono font-bold text-slate-200">
                    {getCategoryIcon(milestone.category)}
                    <span>{milestone.date}</span>
                  </div>

                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-extrabold">
                    Station #{idx + 1}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-base sm:text-lg font-black text-white group-hover/station:text-cyan-300 transition-colors line-clamp-1 mb-2">
                  {milestone.title}
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed mb-4">
                  {milestone.description}
                </p>

                {/* Thumbnail Preview & Action Button */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  {milestone.imageUrl ? (
                    <div className="relative w-20 h-12 rounded-xl overflow-hidden border border-slate-700 shadow-md">
                      <Image
                        src={milestone.imageUrl}
                        alt={milestone.title}
                        fill
                        className="object-cover group-hover/station:scale-110 transition-transform duration-300"
                        sizes="100px"
                      />
                      {milestone.images && milestone.images.length > 1 && (
                        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-white flex items-center gap-0.5 backdrop-blur-sm">
                          <Images size={10} />
                          <span>{milestone.images.length}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {milestone.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-slate-900 text-slate-400 border border-slate-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-black font-mono text-xs font-bold transition-all shadow-md active:scale-95">
                    <span>Inspect</span>
                    <Maximize2 size={12} />
                  </button>
                </div>
              </div>

              {/* Station Roadside Pillar Base */}
              <div className="w-2 h-14 bg-gradient-to-b from-slate-600 to-slate-800 mt-1 rounded-full shadow-lg" />
              {/* Ground Reflective Base Stud */}
              <div
                className="w-16 h-3 rounded-full mt-[-2px] transition-all"
                style={{
                  backgroundColor: isNear ? "#22d3ee" : "#334155",
                  boxShadow: isNear ? "0 0 16px #22d3ee" : "none",
                }}
              />
            </div>
          );
        })}

        {/* ── Grand Multi-Lane Asphalt Boulevard Highway ── */}
        <div
          style={{
            top: `${ROAD_MIN_Y - 40}px`,
            bottom: "0px",
          }}
          className="absolute left-0 right-0 bg-[#090d18] border-t-4 border-slate-700 shadow-[inset_0_15px_40px_rgba(0,0,0,0.85)]"
        >
          {/* Glowing Curbside Neon Guide (Cyan) */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-cyan-400/90 shadow-[0_0_14px_#22d3ee]" />

          {/* Lane Divider 1 (White Dashes) */}
          <div
            className="absolute top-28 left-0 right-0 h-1.5 opacity-60"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, #e2e8f0 0px, #e2e8f0 36px, transparent 36px, transparent 72px)",
            }}
          />

          {/* Center Double Golden Highway Lines */}
          <div className="absolute top-64 left-0 right-0 flex flex-col gap-2">
            <div
              className="h-1.5 opacity-85"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, #facc15 0px, #facc15 48px, transparent 48px, transparent 84px)",
              }}
            />
            <div
              className="h-1.5 opacity-85"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, #facc15 0px, #facc15 48px, transparent 48px, transparent 84px)",
              }}
            />
          </div>

          {/* Lane Divider 2 (White Dashes) */}
          <div
            className="absolute top-100 left-0 right-0 h-1.5 opacity-60"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, #e2e8f0 0px, #e2e8f0 36px, transparent 36px, transparent 72px)",
            }}
          />

          {/* Highway Asphalt Road Signage */}
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              style={{ left: `${getStationX(i) - 60}px` }}
              className="absolute top-48 -translate-y-1/2 flex items-center gap-3 font-mono text-xs font-black text-slate-700/80 tracking-widest pointer-events-none select-none uppercase"
            >
              <span>&gt;&gt;&gt;</span>
              <span>CAREER HIGHWAY • MILESTONE {i + 1}</span>
              <span>&gt;&gt;&gt;</span>
            </div>
          ))}
        </div>

        {/* ── Playable 2D Top-Down Sports Car ── */}
        <div
          style={{
            left: `${carX}px`,
            top: `${carY}px`,
            transform: `translate(-50%, -50%) rotate(${carAngle - 90}deg) scale(1.15)`,
          }}
          className="absolute z-30 pointer-events-none transition-transform duration-75"
        >
          <TopDownCar isDriving={isDriving} />
        </div>

        {/* ── Floating Proximity Prompt above Car ── */}
        {focusedMilestone && (
          <div
            style={{
              left: `${carX}px`,
              top: `${carY - 95}px`,
            }}
            className="absolute -translate-x-1/2 z-40 pointer-events-auto"
          >
            <button
              onClick={() => onInspectMilestone(focusedMilestone)}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-mono text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(6,182,212,0.7)] hover:scale-105 active:scale-95 transition-all animate-bounce cursor-pointer border border-cyan-300"
            >
              <Sparkles size={16} />
              <span>[SPACE] Press to Inspect Station Details</span>
            </button>
          </div>
        )}
      </div>

      {/* ── Bottom HUD Legend & Mobile Touch D-Pad ── */}
      <div className="absolute bottom-6 left-6 right-6 z-40 flex items-center justify-between gap-4 pointer-events-none">
        {/* Desktop Controls Legend */}
        <div className="hidden sm:inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#0b0e1a]/85 border border-slate-700/60 text-xs font-mono text-slate-300 backdrop-blur-2xl shadow-xl">
          <span>Drive:</span>
          <kbd className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">W</kbd>
          <kbd className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">A</kbd>
          <kbd className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">S</kbd>
          <kbd className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">D</kbd>
          <span>or</span>
          <span className="text-cyan-300 font-bold">Arrow Keys</span>
          <span className="text-slate-600">•</span>
          <span>Inspect:</span>
          <kbd className="px-2.5 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 font-bold">SPACE</kbd>
        </div>

        {/* Mobile Touch D-Pad */}
        <div className="flex sm:hidden items-center gap-2 pointer-events-auto bg-[#0b0e1a]/90 p-2 rounded-2xl border border-slate-700 backdrop-blur-2xl shadow-2xl">
          <button
            onTouchStart={() => (keysPressed.current["ArrowLeft"] = true)}
            onTouchEnd={() => delete keysPressed.current["ArrowLeft"]}
            onMouseDown={() => (keysPressed.current["ArrowLeft"] = true)}
            onMouseUp={() => delete keysPressed.current["ArrowLeft"]}
            className="p-3 rounded-xl bg-slate-800 text-white active:bg-cyan-500 active:text-black transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex flex-col gap-1.5">
            <button
              onTouchStart={() => (keysPressed.current["ArrowUp"] = true)}
              onTouchEnd={() => delete keysPressed.current["ArrowUp"]}
              onMouseDown={() => (keysPressed.current["ArrowUp"] = true)}
              onMouseUp={() => delete keysPressed.current["ArrowUp"]}
              className="p-2.5 rounded-xl bg-slate-800 text-white active:bg-cyan-500 active:text-black transition-colors"
            >
              <ArrowUp size={16} />
            </button>
            <button
              onTouchStart={() => (keysPressed.current["ArrowDown"] = true)}
              onTouchEnd={() => delete keysPressed.current["ArrowDown"]}
              onMouseDown={() => (keysPressed.current["ArrowDown"] = true)}
              onMouseUp={() => delete keysPressed.current["ArrowDown"]}
              className="p-2.5 rounded-xl bg-slate-800 text-white active:bg-cyan-500 active:text-black transition-colors"
            >
              <ArrowDown size={16} />
            </button>
          </div>
          <button
            onTouchStart={() => (keysPressed.current["ArrowRight"] = true)}
            onTouchEnd={() => delete keysPressed.current["ArrowRight"]}
            onMouseDown={() => (keysPressed.current["ArrowRight"] = true)}
            onMouseUp={() => delete keysPressed.current["ArrowRight"]}
            className="p-3 rounded-xl bg-slate-800 text-white active:bg-cyan-500 active:text-black transition-colors"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
