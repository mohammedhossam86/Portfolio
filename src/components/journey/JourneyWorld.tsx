"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { JourneyMilestone } from "@/types";
import TopDownCar from "./TopDownCar";
import { OutlierIcon, AlignerrIcon, DiscoveryAcademyIcon } from "@/components/ui/BrandIcons";
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

// Grand Open-World Geometry & Boundaries
const STATION_START_X = 420;
const STATION_GAP = 780;
const ROAD_MIN_Y = 440;
const ROAD_MAX_Y = 720;
const STATION_Y = 240;
const PROXIMITY_THRESHOLD = 320;
const MAX_SPEED = 480;

export default function JourneyWorld({
  milestones,
  onInspectMilestone,
}: JourneyWorldProps) {
  const totalWorldWidth = STATION_START_X + milestones.length * STATION_GAP + 500;

  // React state for DOM rendering
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

  // References for 60fps Physics & Decoupled State
  const carPhysics = useRef({
    x: STATION_START_X,
    y: 580,
    vx: 0,
    vy: 0,
    angle: 0,
    targetAngle: 0,
    targetX: null as number | null,
    isDriving: false,
    autoCruiseActive: false,
    autoCruiseTimer: null as NodeJS.Timeout | null,
  });

  const focusedMilestoneRef = useRef<JourneyMilestone | null>(milestones[0] || null);
  const activeStationIdxRef = useRef<number>(0);
  const isHoveredRef = useRef(false);
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const animFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [viewportWidth, setViewportWidth] = useState(1200);

  // Keep references in sync with state
  useEffect(() => {
    focusedMilestoneRef.current = focusedMilestone;
  }, [focusedMilestone]);

  useEffect(() => {
    activeStationIdxRef.current = activeStationIdx;
  }, [activeStationIdx]);

  useEffect(() => {
    carPhysics.current.autoCruiseActive = autoCruise;
  }, [autoCruise]);

  // Viewport resize tracking
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

  // Station Coordinate Resolver
  const getStationX = (index: number) => STATION_START_X + index * STATION_GAP;

  // Drive to a specific station (Smooth cruise)
  const driveToStation = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(milestones.length - 1, index));
      const targetX = getStationX(clamped);
      carPhysics.current.targetX = targetX;
      carPhysics.current.isDriving = true;
      setActiveStationIdx(clamped);
    },
    [milestones.length]
  );

  // Proximity Calculation (Requires steering near the curb/billboard + horizontal alignment)
  const calculateProximity = useCallback(
    (x: number, y: number) => {
      let closestIdx = -1;
      let minDistance = Infinity;

      for (let i = 0; i < milestones.length; i++) {
        const sx = getStationX(i);
        const dx = Math.abs(x - sx);
        if (dx < minDistance) {
          minDistance = dx;
          closestIdx = i;
        }
      }

      // Proximity condition: must be in the top lane close to the billboard curb (y <= 515)
      // and horizontally within reach (dx <= 190), or arriving via auto-cruise
      const isNearCurb = y <= 515;
      const isHorizontallyAligned = minDistance < 190;
      const isStationNear =
        (isNearCurb && isHorizontallyAligned) ||
        (carPhysics.current.autoCruiseActive && minDistance < 120);

      if (isStationNear && closestIdx !== -1) {
        if (activeStationIdxRef.current !== closestIdx) {
          setActiveStationIdx(closestIdx);
        }
        if (focusedMilestoneRef.current?.id !== milestones[closestIdx].id) {
          setFocusedMilestone(milestones[closestIdx]);
        }
      } else {
        if (focusedMilestoneRef.current !== null) {
          setFocusedMilestone(null);
        }
      }
    },
    [milestones]
  );

  // ─── Continuous 60fps Physics Simulation Loop (Runs without teardown!) ──────
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const p = carPhysics.current;
      const keys = keysPressed.current;

      // Check manual keyboard inputs
      let ax = 0;
      let ay = 0;
      if (keys["ArrowRight"] || keys["d"] || keys["D"]) ax += 1;
      if (keys["ArrowLeft"] || keys["a"] || keys["A"]) ax -= 1;
      if (keys["ArrowUp"] || keys["w"] || keys["W"]) ay -= 1;
      if (keys["ArrowDown"] || keys["s"] || keys["S"]) ay += 1;

      if (ax !== 0 || ay !== 0) {
        // Player is steering manually: cancel any automatic navigation
        p.targetX = null;
        if (p.autoCruiseActive) {
          setAutoCruise(false);
          p.autoCruiseActive = false;
        }

        // Accelerate car
        const accel = 950 * dt;
        p.vx += ax * accel;
        p.vy += ay * accel;

        // Clamp to maximum speed
        const currentSpeed = Math.hypot(p.vx, p.vy);
        if (currentSpeed > MAX_SPEED) {
          p.vx = (p.vx / currentSpeed) * MAX_SPEED;
          p.vy = (p.vy / currentSpeed) * MAX_SPEED;
        }

        // Target angle based on velocity vector
        p.targetAngle = (Math.atan2(p.vy, p.vx) * 180) / Math.PI;
        p.isDriving = true;
      } else if (p.targetX !== null) {
        // Automated cruising to target landmark
        const dx = p.targetX - p.x;

        if (Math.abs(dx) <= 6) {
          // Arrived smoothly at station
          p.x = p.targetX;
          p.vx = 0;
          p.vy = 0;
          p.targetX = null;
          p.isDriving = false;

          // If auto-cruise is active, schedule next station drive after pause
          if (p.autoCruiseActive) {
            if (p.autoCruiseTimer) clearTimeout(p.autoCruiseTimer);
            p.autoCruiseTimer = setTimeout(() => {
              if (carPhysics.current.autoCruiseActive) {
                const nextIdx = (activeStationIdxRef.current + 1) % milestones.length;
                driveToStation(nextIdx);
              }
            }, 2600);
          }
        } else {
          // Smooth glide towards targetX
          const dir = Math.sign(dx);
          const desiredSpeed = dir * Math.min(MAX_SPEED, Math.max(90, Math.abs(dx) * 2.8));
          p.vx += (desiredSpeed - p.vx) * Math.min(1, 9 * dt);
          p.vy *= 0.88; // stay in current lane

          p.targetAngle = dir > 0 ? 0 : 180;
          p.isDriving = true;
        }
      } else {
        // Natural friction & braking
        p.vx *= Math.pow(0.12, dt);
        p.vy *= Math.pow(0.12, dt);
        if (Math.hypot(p.vx, p.vy) < 4) {
          p.vx = 0;
          p.vy = 0;
          p.isDriving = false;
        }
      }

      // Smooth Angle Interpolation (Eliminates oscillation jitter!)
      let angleDiff = ((p.targetAngle - p.angle + 180) % 360) - 180;
      if (angleDiff < -180) angleDiff += 360;
      p.angle += angleDiff * Math.min(1, 14 * dt);

      // Integrate Position
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      // Bound boundaries
      p.x = Math.max(140, Math.min(totalWorldWidth - 160, p.x));
      p.y = Math.max(ROAD_MIN_Y, Math.min(ROAD_MAX_Y, p.y));

      // Calculate proximity to milestone landmarks based on car position (curbside proximity)
      calculateProximity(p.x, p.y);

      // Commit frame to React state for UI rendering
      setCarX(p.x);
      setCarY(p.y);
      setCarAngle(p.angle);
      setIsDriving(p.isDriving);
      setSpeedKmh(Math.round(Math.hypot(p.vx, p.vy) * 0.28));

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (carPhysics.current.autoCruiseTimer) clearTimeout(carPhysics.current.autoCruiseTimer);
    };
  }, [calculateProximity, driveToStation, milestones.length, totalWorldWidth]);

  // ─── Global Keyboard Listener (Strictly isolated from Arcade) ───────────────
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

      // If user is inside Arcade, don't intercept keys
      if (
        target?.closest("#arcade") !== null ||
        document.getElementById("arcade")?.matches(":hover") ||
        document.activeElement?.closest("#arcade") !== null
      ) {
        return;
      }

      const key = e.key;
      const isNavKey = [
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
      ].includes(key);

      if (isNavKey || key === " ") {
        // Prevent default window scrolling
        e.preventDefault();
        e.stopPropagation();
      }

      if (key === " ") {
        const target = focusedMilestoneRef.current || milestones[activeStationIdxRef.current];
        if (target) {
          onInspectMilestone(target);
        }
      } else if (isNavKey) {
        keysPressed.current[key] = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key;
      delete keysPressed.current[key];
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onInspectMilestone]);

  // ─── Toggle Auto Cruise Mode ────────────────────────────────────────────────
  const toggleAutoCruise = () => {
    if (autoCruise) {
      setAutoCruise(false);
      carPhysics.current.autoCruiseActive = false;
      carPhysics.current.targetX = null;
    } else {
      setAutoCruise(true);
      carPhysics.current.autoCruiseActive = true;
      const nextIdx = (activeStationIdxRef.current + 1) % milestones.length;
      driveToStation(nextIdx);
    }
  };

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
      tabIndex={0}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        keysPressed.current = {};
      }}
      onClick={() => {
        isHoveredRef.current = true;
      }}
      className="relative w-full h-[780px] sm:h-[840px] overflow-hidden select-none outline-none"
    >
      {/* ── Seamless Top & Bottom Vignette Fades into Page Background ── */}
      <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/80 to-transparent pointer-events-none z-30" />
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/80 to-transparent pointer-events-none z-30" />

      {/* ── Top Floating HUD Dashboard Overlay ── */}
      <div className="absolute top-6 left-6 right-6 z-40 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
        {/* Speedometer & Station Tracker */}
        <div className="flex items-center gap-3.5 p-2.5 px-4 rounded-2xl bg-white/95 dark:bg-[#0b0e1a]/85 border border-orange-200 dark:border-slate-700/60 backdrop-blur-2xl shadow-xl pointer-events-auto">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 dark:bg-cyan-400 animate-pulse shadow-sm" />
            <span className="text-stone-500 dark:text-slate-400">CRUISE SPEED:</span>
            <strong className="text-stone-900 dark:text-white text-base tracking-tight">{speedKmh}</strong>
            <span className="text-[11px] text-orange-600 dark:text-cyan-400 font-bold">KM/H</span>
          </div>

          <div className="h-5 w-px bg-orange-200 dark:bg-slate-700/80" />

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-stone-500 dark:text-slate-400">LANDMARK:</span>
            <strong className="text-orange-600 dark:text-amber-300 text-sm">
              #{activeStationIdx + 1} of {milestones.length}
            </strong>
          </div>
        </div>

        {/* Action Controls: Navigation & Auto-Cruise */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <button
            onClick={() => driveToStation(activeStationIdx - 1)}
            disabled={activeStationIdx === 0}
            className="p-3 rounded-2xl bg-white/95 dark:bg-[#0b0e1a]/85 border border-orange-200 dark:border-slate-700/60 text-stone-700 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white hover:border-orange-400 dark:hover:border-cyan-500/50 active:scale-95 disabled:opacity-30 transition-all shadow-md backdrop-blur-2xl"
            title="Drive to Previous Milestone"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={toggleAutoCruise}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-mono font-semibold transition-all border shadow-md backdrop-blur-2xl active:scale-95 ${
              autoCruise
                ? "bg-orange-500 text-white border-orange-500 dark:bg-amber-500/25 dark:text-amber-300 dark:border-amber-400 shadow-orange-500/20"
                : "bg-white/95 dark:bg-[#0b0e1a]/85 border-orange-200 dark:border-slate-700/60 text-stone-700 dark:text-slate-200 hover:text-stone-900 dark:hover:text-white hover:border-orange-400"
            }`}
          >
            <Play size={14} className={autoCruise ? "animate-spin text-white dark:text-amber-400" : ""} />
            <span>{autoCruise ? "Auto-Cruise Active" : "Auto-Cruise Mode"}</span>
          </button>

          <button
            onClick={() => driveToStation(activeStationIdx + 1)}
            disabled={activeStationIdx === milestones.length - 1}
            className="p-3 rounded-2xl bg-white/95 dark:bg-[#0b0e1a]/85 border border-orange-200 dark:border-slate-700/60 text-stone-700 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white hover:border-orange-400 dark:hover:border-cyan-500/50 active:scale-95 disabled:opacity-30 transition-all shadow-md backdrop-blur-2xl"
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
        <div className="absolute inset-0 bg-[var(--color-bg-primary)]">
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
          const dist = Math.abs(carX - sx);

          // Distance-based night discovery lighting:
          // In the dark highway, billboards illuminate dynamically as the headlights sweep over them!
          const illumination = Math.max(0.18, Math.min(1, 1 - (dist - 140) / 440));
          const isIlluminated = illumination > 0.45;

          return (
            <div
              key={milestone.id}
              style={{
                left: `${sx}px`,
                top: "85px",
                opacity: isNear ? 1 : illumination,
                transform: `scale(${isNear ? 1.04 : 0.94 + illumination * 0.06})`,
                filter: isNear
                  ? "brightness(1.15) drop-shadow(0 0 25px rgba(56, 189, 248, 0.6))"
                  : isIlluminated
                  ? `brightness(${0.8 + illumination * 0.25}) drop-shadow(0 0 ${illumination * 16}px rgba(56, 189, 248, 0.35))`
                  : "brightness(0.35) contrast(0.85)",
                transition: "opacity 0.2s ease-out, transform 0.2s ease-out, filter 0.2s ease-out",
              }}
              className="absolute -translate-x-1/2 w-[310px] sm:w-[350px] z-20 flex flex-col items-center select-none"
            >
              {/* Grand Spot Light Beam Shining Down on the Highway (Powers up when discovered!) */}
              <div
                className="absolute -top-12 w-44 h-[420px] pointer-events-none transition-opacity duration-300"
                style={{
                  background:
                    "conic-gradient(from 180deg at 50% 0%, rgba(56, 189, 248, 0.4) 0deg, transparent 70deg, transparent 290deg, rgba(56, 189, 248, 0.4) 360deg)",
                  opacity: isNear ? 0.95 : isIlluminated ? (illumination - 0.45) * 1.8 : 0.04,
                  filter: "blur(16px)",
                }}
              />

              {/* Milestone Landmark Billboard */}
              <div
                onClick={() => onInspectMilestone(milestone)}
                style={{
                  borderColor: isNear
                    ? "rgba(56, 189, 248, 0.95)"
                    : isIlluminated
                    ? `rgba(56, 189, 248, ${0.3 + illumination * 0.5})`
                    : "rgba(51, 65, 85, 0.3)",
                  boxShadow: isNear
                    ? "0 0 35px rgba(56, 189, 248, 0.55), 0 20px 40px rgba(0,0,0,0.85)"
                    : isIlluminated
                    ? "0 10px 25px rgba(0,0,0,0.6)"
                    : "0 6px 16px rgba(0,0,0,0.4)",
                }}
                className="relative w-full rounded-3xl bg-white/95 dark:bg-[#0b0e1a]/95 backdrop-blur-2xl p-4 sm:p-5 transition-all duration-200 border cursor-pointer hover:border-orange-500 dark:hover:border-cyan-400 group/station shadow-xl"
              >
                {/* Header: Date + Category Badge */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-slate-900/90 border border-orange-200 dark:border-slate-700/80 text-xs font-mono font-bold text-stone-700 dark:text-slate-200">
                      {getCategoryIcon(milestone.category)}
                      <span>{milestone.date}</span>
                    </div>
                    {milestone.id === "ai-trainer" && (
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-orange-500/15 border border-orange-500/30">
                        <OutlierIcon className="w-3.5 h-3.5" />
                        <AlignerrIcon className="w-3.5 h-3.5" />
                      </div>
                    )}
                    {milestone.id === "discovery-academy" && (
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-purple-500/15 border border-purple-500/30">
                        <DiscoveryAcademyIcon className="w-4 h-4" variant="round" />
                      </div>
                    )}
                  </div>

                  <span className="text-xs font-mono text-orange-600 dark:text-cyan-400 uppercase tracking-widest font-extrabold">
                    Station #{idx + 1}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-base sm:text-lg font-black text-stone-900 dark:text-white group-hover/station:text-[var(--color-primary)] transition-colors line-clamp-1 mb-2">
                  {milestone.title}
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                  {milestone.description}
                </p>

                {/* Thumbnail Preview & Action Button */}
                <div className="flex items-center justify-between pt-3 border-t border-orange-200/80 dark:border-slate-800">
                  {milestone.imageUrl ? (
                    <div className="relative w-20 h-12 rounded-xl overflow-hidden border border-orange-200 dark:border-slate-700 shadow-md">
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
                          className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-orange-100/70 dark:bg-slate-900 text-stone-600 dark:text-slate-400 border border-orange-200 dark:border-slate-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500 text-orange-600 hover:text-white dark:bg-cyan-500/10 dark:hover:bg-cyan-500 dark:text-cyan-300 dark:hover:text-black font-mono text-xs font-bold transition-all shadow-md active:scale-95">
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
          {milestones.map((_, i) => (
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

        {/* ── Dynamic Night Darkness & Headlight Discovery Exploration Mask ── */}
        <div
          className="absolute inset-0 pointer-events-none z-25 transition-opacity duration-200"
          style={{
            background: `radial-gradient(ellipse 520px 380px at ${carX}px ${carY}px, transparent 20%, rgba(5, 7, 14, 0.45) 55%, rgba(4, 6, 12, 0.88) 90%)`,
          }}
        />

        {/* ── Playable 2D Top-Down Sports Car (Compact Sleek Scale) ── */}
        <div
          style={{
            left: `${carX}px`,
            top: `${carY}px`,
            transform: `translate(-50%, -50%) rotate(${carAngle - 90}deg) scale(0.8)`,
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
              top: `${carY - 75}px`,
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
        <div className="hidden sm:inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/95 dark:bg-[#0b0e1a]/85 border border-orange-200 dark:border-slate-700/60 text-xs font-mono text-stone-700 dark:text-slate-300 backdrop-blur-2xl shadow-xl">
          <span>Drive:</span>
          <kbd className="px-2 py-0.5 rounded bg-orange-100 dark:bg-slate-800 text-orange-700 dark:text-cyan-300 border border-orange-200 dark:border-slate-700">W</kbd>
          <kbd className="px-2 py-0.5 rounded bg-orange-100 dark:bg-slate-800 text-orange-700 dark:text-cyan-300 border border-orange-200 dark:border-slate-700">A</kbd>
          <kbd className="px-2 py-0.5 rounded bg-orange-100 dark:bg-slate-800 text-orange-700 dark:text-cyan-300 border border-orange-200 dark:border-slate-700">S</kbd>
          <kbd className="px-2 py-0.5 rounded bg-orange-100 dark:bg-slate-800 text-orange-700 dark:text-cyan-300 border border-orange-200 dark:border-slate-700">D</kbd>
          <span>or</span>
          <span className="text-orange-600 dark:text-cyan-300 font-bold">Arrow Keys</span>
          <span className="text-stone-300 dark:text-slate-600">•</span>
          <span>Inspect:</span>
          <kbd className="px-2.5 py-0.5 rounded bg-orange-100 dark:bg-slate-800 text-orange-700 dark:text-amber-300 border border-orange-200 dark:border-slate-700 font-bold">SPACE</kbd>
        </div>

        {/* Mobile Touch D-Pad */}
        <div className="flex sm:hidden items-center gap-2 pointer-events-auto bg-white/95 dark:bg-[#0b0e1a]/90 p-2 rounded-2xl border border-orange-200 dark:border-slate-700 backdrop-blur-2xl shadow-2xl">
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
