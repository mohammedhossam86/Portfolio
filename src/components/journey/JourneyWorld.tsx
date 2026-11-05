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
} from "lucide-react";

interface JourneyWorldProps {
  milestones: JourneyMilestone[];
  onInspectMilestone: (milestone: JourneyMilestone) => void;
}

// Spacing & World Configuration
const STATION_START_X = 360;
const STATION_GAP = 460;
const WORLD_HEIGHT = 560;
const ROAD_MIN_Y = 240;
const ROAD_MAX_Y = 480;
const PROXIMITY_THRESHOLD = 260;

export default function JourneyWorld({
  milestones,
  onInspectMilestone,
}: JourneyWorldProps) {
  const totalWorldWidth = STATION_START_X + milestones.length * STATION_GAP + 300;

  // Car Physics State
  const [carX, setCarX] = useState(STATION_START_X);
  const [carY, setCarY] = useState(360);
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
  const [viewportWidth, setViewportWidth] = useState(1000);
  const isHoveredRef = useRef(false);

  // Keyboard Tracking
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const animFrameRef = useRef<number | null>(null);
  const targetXRef = useRef<number | null>(null);

  // Measure container viewport width
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
  const getStationY = () => 130;

  // ─── Drive to Specific Station ─────────────────────────────────────────────
  const driveToStation = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(milestones.length - 1, index));
    const targetX = getStationX(clamped);
    targetXRef.current = targetX;
    setActiveStationIdx(clamped);
    setIsDriving(true);
  }, [milestones.length]);

  // ─── Proximity Check ───────────────────────────────────────────────────────
  const checkProximity = useCallback(
    (x: number, y: number) => {
      let closestIdx = -1;
      let minDistance = Infinity;

      milestones.forEach((m, idx) => {
        const sx = getStationX(idx);
        const sy = getStationY();
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

  // ─── Physics & Animation Loop ──────────────────────────────────────────────
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Handle Automated Drive to Target Station
      if (targetXRef.current !== null) {
        setCarX((prevX) => {
          const targetX = targetXRef.current!;
          const diff = targetX - prevX;
          const step = Math.sign(diff) * Math.min(Math.abs(diff), 420 * dt);

          if (Math.abs(diff) <= 6) {
            targetXRef.current = null;
            setIsDriving(false);
            setSpeedKmh(0);
            return targetX;
          }

          const newX = prevX + step;
          setCarAngle(step > 0 ? 0 : 180);
          setSpeedKmh(Math.round(Math.abs(step) * 2.8));
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
          const moveSpeed = 380 * dt;
          const mag = Math.hypot(vx, vy);
          const normX = (vx / mag) * moveSpeed;
          const normY = (vy / mag) * moveSpeed;

          // Calculate car rotation (default facing right: angleDeg)
          const angleRad = Math.atan2(vy, vx);
          const angleDeg = (angleRad * 180) / Math.PI;
          setCarAngle(angleDeg);

          setCarX((prevX) => {
            const nextX = Math.max(120, Math.min(totalWorldWidth - 140, prevX + normX));
            checkProximity(nextX, carY);
            return nextX;
          });

          setCarY((prevY) => {
            const nextY = Math.max(ROAD_MIN_Y, Math.min(ROAD_MAX_Y, prevY + normY));
            checkProximity(carX, nextY);
            return nextY;
          });

          setSpeedKmh(Math.round(moveSpeed * 3.2));
        } else {
          setIsDriving(false);
          setSpeedKmh((prev) => Math.max(0, prev - 4));
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
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [autoCruise, driveToStation, milestones.length]);

  // ─── Keyboard Listeners (Isolated to Journey Hover) ─────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in form inputs
      const target = e.target as HTMLElement;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      // Only handle if mouse is hovered over Journey or active
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
  // Centers camera on car, clamped to world boundaries
  const maxScroll = Math.max(0, totalWorldWidth - viewportWidth);
  const targetCamX = Math.max(0, Math.min(maxScroll, carX - viewportWidth / 2));

  // Category Icon Resolver
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "education":
        return <GraduationCap size={15} className="text-cyan-400" />;
      case "achievement":
        return <Trophy size={15} className="text-amber-400" />;
      case "work":
        return <Briefcase size={15} className="text-purple-400" />;
      default:
        return <Compass size={15} className="text-emerald-400" />;
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
      className="relative w-full h-[580px] sm:h-[620px] rounded-3xl overflow-hidden border border-slate-800 bg-[#070912] shadow-2xl select-none"
    >
      {/* ── Top HUD Dashboard Overlay ── */}
      <div className="absolute top-4 left-4 right-4 z-40 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Speedometer & Progress */}
        <div className="flex items-center gap-2.5 p-2 px-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl shadow-lg pointer-events-auto">
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span className="text-slate-400">SPEED:</span>
            <strong className="text-white text-sm">{speedKmh}</strong>
            <span className="text-[10px] text-cyan-400 font-semibold">KM/H</span>
          </div>

          <div className="h-4 w-px bg-slate-700" />

          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="text-slate-400">STATION:</span>
            <strong className="text-amber-300">
              {activeStationIdx + 1}/{milestones.length}
            </strong>
          </div>
        </div>

        {/* Action Controls: Auto-Cruise & Navigation */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => driveToStation(activeStationIdx - 1)}
            disabled={activeStationIdx === 0}
            className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 active:scale-95 disabled:opacity-30 transition-all shadow-md backdrop-blur-md"
            title="Drive to Previous Station"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={() => setAutoCruise(!autoCruise)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono transition-all border shadow-lg backdrop-blur-md active:scale-95 ${
              autoCruise
                ? "bg-amber-500/20 text-amber-300 border-amber-500 shadow-amber-500/10"
                : "bg-slate-900/90 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
            }`}
          >
            <Play size={12} className={autoCruise ? "animate-spin text-amber-400" : ""} />
            <span>{autoCruise ? "Auto-Cruise Active" : "Auto-Cruise"}</span>
          </button>

          <button
            onClick={() => driveToStation(activeStationIdx + 1)}
            disabled={activeStationIdx === milestones.length - 1}
            className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 active:scale-95 disabled:opacity-30 transition-all shadow-md backdrop-blur-md"
            title="Drive to Next Station"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ── World Container (Camera Pans Horizontally with car) ── */}
      <div
        className="absolute top-0 bottom-0 left-0 h-full transition-transform duration-75 ease-out"
        style={{
          width: `${totalWorldWidth}px`,
          transform: `translateX(-${targetCamX}px)`,
        }}
      >
        {/* ── Background Cyber Cityscape & Stars ── */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060810] via-[#090d18] to-[#04060b]">
          {/* Neon Grid Skyline */}
          <div
            className="absolute top-0 left-0 right-0 h-48 opacity-25 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(56, 189, 248, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.08) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
        </div>

        {/* ── Curbside District (Milestone Stations & Streetlights) ── */}
        {milestones.map((milestone, idx) => {
          const sx = getStationX(idx);
          const isNear = focusedMilestone?.id === milestone.id;
          const dist = Math.hypot(carX - sx, carY - getStationY());
          const proximity = Math.max(0, 1 - dist / 350);

          return (
            <div
              key={milestone.id}
              style={{
                left: `${sx}px`,
                top: "28px",
              }}
              className="absolute -translate-x-1/2 w-[340px] z-20 flex flex-col items-center"
            >
              {/* Street Light Beam Shining Down on Asphalt */}
              <div
                className="absolute -top-6 w-32 h-64 pointer-events-none transition-opacity duration-300"
                style={{
                  background:
                    "conic-gradient(from 180deg at 50% 0%, rgba(56, 189, 248, 0.25) 0deg, transparent 65deg, transparent 295deg, rgba(56, 189, 248, 0.25) 360deg)",
                  opacity: 0.3 + proximity * 0.7,
                  filter: "blur(12px)",
                }}
              />

              {/* Milestone Card Billboard */}
              <div
                onClick={() => onInspectMilestone(milestone)}
                style={{
                  transform: `scale(${1 + proximity * 0.05})`,
                  borderColor: isNear
                    ? "rgba(56, 189, 248, 0.9)"
                    : `rgba(51, 65, 85, ${0.4 + proximity * 0.4})`,
                  boxShadow: isNear
                    ? "0 0 28px rgba(56, 189, 248, 0.45), 0 12px 30px rgba(0,0,0,0.8)"
                    : "0 8px 24px rgba(0,0,0,0.7)",
                }}
                className={`relative w-full rounded-2xl bg-[#0b0e1a]/95 backdrop-blur-xl p-4 transition-all duration-200 border cursor-pointer hover:border-cyan-400 group/station`}
              >
                {/* Header: Date + Category Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono font-semibold text-slate-300">
                    {getCategoryIcon(milestone.category)}
                    <span>{milestone.date}</span>
                  </div>

                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                    Station #{idx + 1}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-sm font-bold text-white group-hover/station:text-cyan-300 transition-colors line-clamp-1 mb-1.5">
                  {milestone.title}
                </h4>

                {/* Description Excerpt */}
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                  {milestone.description}
                </p>

                {/* Image Thumbnail Preview & Action Button */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  {milestone.imageUrl ? (
                    <div className="relative w-14 h-9 rounded-lg overflow-hidden border border-slate-700">
                      <Image
                        src={milestone.imageUrl}
                        alt={milestone.title}
                        fill
                        className="object-cover group-hover/station:scale-110 transition-transform duration-300"
                        sizes="60px"
                      />
                      {milestone.images && milestone.images.length > 1 && (
                        <div className="absolute bottom-0.5 right-0.5 px-1 rounded bg-black/80 text-[8px] font-mono text-white flex items-center gap-0.5">
                          <Images size={8} />
                          <span>{milestone.images.length}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {milestone.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-black font-mono text-[10px] font-semibold transition-all">
                    <span>Inspect</span>
                    <Maximize2 size={10} />
                  </button>
                </div>
              </div>

              {/* Station Roadside Marker Pole */}
              <div className="w-1.5 h-10 bg-gradient-to-b from-slate-600 to-slate-800 mt-1 rounded-full shadow-lg" />
              {/* Ground Reflective Base */}
              <div
                className="w-12 h-3 rounded-full mt-[-2px] transition-all"
                style={{
                  backgroundColor: isNear ? "#22d3ee" : "#334155",
                  boxShadow: isNear ? "0 0 12px #22d3ee" : "none",
                }}
              />
            </div>
          );
        })}

        {/* ── Multi-Lane Asphalt Highway ── */}
        <div
          style={{
            top: `${ROAD_MIN_Y - 20}px`,
            bottom: "0px",
          }}
          className="absolute left-0 right-0 bg-[#0c101d] border-t-4 border-slate-700 shadow-[inset_0_10px_30px_rgba(0,0,0,0.8)]"
        >
          {/* Glowing Curbside Line (Neon Cyan) */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-400/80 shadow-[0_0_10px_#22d3ee]" />

          {/* Lane Divider 1 (White Dashes) */}
          <div
            className="absolute top-28 left-0 right-0 h-1 opacity-60"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, #e2e8f0 0px, #e2e8f0 32px, transparent 32px, transparent 64px)",
            }}
          />

          {/* Center Double Yellow Highway Lines */}
          <div className="absolute top-56 left-0 right-0 flex flex-col gap-1.5">
            <div
              className="h-1 opacity-80"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, #facc15 0px, #facc15 40px, transparent 40px, transparent 72px)",
              }}
            />
            <div
              className="h-1 opacity-80"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, #facc15 0px, #facc15 40px, transparent 40px, transparent 72px)",
              }}
            />
          </div>

          {/* Lane Divider 2 (White Dashes) */}
          <div
            className="absolute top-84 left-0 right-0 h-1 opacity-60"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, #e2e8f0 0px, #e2e8f0 32px, transparent 32px, transparent 64px)",
            }}
          />

          {/* Painted Asphalt Highway Markings */}
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              style={{ left: `${getStationX(i) - 40}px` }}
              className="absolute top-44 -translate-y-1/2 flex items-center gap-2 font-mono text-[11px] font-bold text-slate-700/80 tracking-widest pointer-events-none select-none uppercase"
            >
              <span>&gt;&gt;&gt;</span>
              <span>LANE {i + 1}</span>
              <span>&gt;&gt;&gt;</span>
            </div>
          ))}
        </div>

        {/* ── Playable 2D Sports Car ── */}
        <div
          style={{
            left: `${carX}px`,
            top: `${carY}px`,
            transform: `translate(-50%, -50%) rotate(${carAngle - 90}deg)`,
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
              top: `${carY - 78}px`,
            }}
            className="absolute -translate-x-1/2 z-40 pointer-events-auto"
          >
            <button
              onClick={() => onInspectMilestone(focusedMilestone)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 transition-all animate-bounce"
            >
              <Sparkles size={14} />
              <span>[SPACE] Press to Inspect Station</span>
            </button>
          </div>
        )}
      </div>

      {/* ── Bottom HUD Controls (Touch D-Pad & Keyboard Legend) ── */}
      <div className="absolute bottom-3 left-4 right-4 z-40 flex items-center justify-between gap-3 pointer-events-none">
        {/* Keyboard Legend for Desktop */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300 backdrop-blur-md">
          <span>Drive:</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">W</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">A</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">S</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">D</kbd>
          <span>or</span>
          <span className="text-cyan-300">Arrows</span>
          <span className="text-slate-600">•</span>
          <span>Inspect:</span>
          <kbd className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">SPACE</kbd>
        </div>

        {/* Touch D-Pad for Mobile Users */}
        <div className="flex sm:hidden items-center gap-1.5 pointer-events-auto bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-xl">
          <button
            onTouchStart={() => (keysPressed.current["ArrowLeft"] = true)}
            onTouchEnd={() => delete keysPressed.current["ArrowLeft"]}
            onMouseDown={() => (keysPressed.current["ArrowLeft"] = true)}
            onMouseUp={() => delete keysPressed.current["ArrowLeft"]}
            className="p-2.5 rounded-xl bg-slate-800 text-white active:bg-cyan-500 active:text-black transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex flex-col gap-1">
            <button
              onTouchStart={() => (keysPressed.current["ArrowUp"] = true)}
              onTouchEnd={() => delete keysPressed.current["ArrowUp"]}
              onMouseDown={() => (keysPressed.current["ArrowUp"] = true)}
              onMouseUp={() => delete keysPressed.current["ArrowUp"]}
              className="p-2 rounded-lg bg-slate-800 text-white active:bg-cyan-500 active:text-black transition-colors"
            >
              <ArrowUp size={14} />
            </button>
            <button
              onTouchStart={() => (keysPressed.current["ArrowDown"] = true)}
              onTouchEnd={() => delete keysPressed.current["ArrowDown"]}
              onMouseDown={() => (keysPressed.current["ArrowDown"] = true)}
              onMouseUp={() => delete keysPressed.current["ArrowDown"]}
              className="p-2 rounded-lg bg-slate-800 text-white active:bg-cyan-500 active:text-black transition-colors"
            >
              <ArrowDown size={14} />
            </button>
          </div>
          <button
            onTouchStart={() => (keysPressed.current["ArrowRight"] = true)}
            onTouchEnd={() => delete keysPressed.current["ArrowRight"]}
            onMouseDown={() => (keysPressed.current["ArrowRight"] = true)}
            onMouseUp={() => delete keysPressed.current["ArrowRight"]}
            className="p-2.5 rounded-xl bg-slate-800 text-white active:bg-cyan-500 active:text-black transition-colors"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
