"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { JourneyMilestone } from "@/types";
import TopDownCar from "./TopDownCar";
import { DiscoveryAcademyIcon } from "@/components/ui/BrandIcons";
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
  const [cameraX, setCameraX] = useState(0);
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
    camX: 0,
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

        // Responsive acceleration
        const accel = 1200 * dt;
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
        // Smooth automated cruising to target landmark
        const dx = p.targetX - p.x;
        const dist = Math.abs(dx);

        if (dist <= 4) {
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
          const desiredSpeed = dir * Math.min(MAX_SPEED, Math.max(120, dist * 3.2));
          p.vx += (desiredSpeed - p.vx) * Math.min(1, 10 * dt);
          p.vy += (540 - p.y) * Math.min(1, 6 * dt); // softly center in cruise lane

          p.targetAngle = dir > 0 ? 0 : 180;
          p.isDriving = true;
        }
      } else {
        // Natural friction & braking
        p.vx *= Math.pow(0.04, dt);
        p.vy *= Math.pow(0.04, dt);
        if (Math.hypot(p.vx, p.vy) < 3) {
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

      // Direct smooth Camera Lerp (100% fluid, no CSS transition judder!)
      const maxScroll = Math.max(0, totalWorldWidth - viewportWidth);
      const idealCamX = Math.max(0, Math.min(maxScroll, p.x - viewportWidth / 2));
      p.camX += (idealCamX - p.camX) * Math.min(1, 10 * dt);
      setCameraX(Math.round(p.camX));

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
      className="relative w-full h-[680px] sm:h-[820px] overflow-hidden select-none outline-none touch-pan-y"
    >
      {/* ── Seamless Top & Bottom Vignette Fades into Page Background ── */}
      <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/80 to-transparent pointer-events-none z-30" />
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/80 to-transparent pointer-events-none z-30" />

      {/* ── Top Floating HUD Dashboard Overlay ── */}
      <div className="absolute top-6 left-6 right-6 z-40 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
        {/* Speedometer & Station Tracker */}
        <div className="flex items-center gap-3.5 p-2.5 px-4 rounded-2xl bg-white/95 dark:bg-[#0c0c10]/90 border border-orange-200/80 dark:border-zinc-800 backdrop-blur-2xl shadow-xl pointer-events-auto">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 dark:bg-amber-400 animate-pulse shadow-sm" />
            <span className="text-stone-500 dark:text-zinc-400">ROVER VELOCITY:</span>
            <strong className="text-stone-900 dark:text-white text-base tracking-tight">{speedKmh}</strong>
            <span className="text-[11px] text-orange-600 dark:text-amber-400 font-bold">KM/H</span>
          </div>

          <div className="h-5 w-px bg-orange-200 dark:bg-zinc-800" />

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-stone-500 dark:text-zinc-400">LUNAR OUTPOST:</span>
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
            className="p-3 rounded-2xl bg-white/95 dark:bg-[#0c0c10]/90 border border-orange-200/80 dark:border-zinc-800 text-stone-700 dark:text-zinc-300 hover:text-stone-900 dark:hover:text-white hover:border-orange-400 dark:hover:border-zinc-600 active:scale-95 disabled:opacity-30 transition-all shadow-md backdrop-blur-2xl"
            title="Traverse to Previous Outpost"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={toggleAutoCruise}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-mono font-semibold transition-all border shadow-md backdrop-blur-2xl active:scale-95 ${
              autoCruise
                ? "bg-orange-600 text-white border-orange-600 dark:bg-amber-400 dark:text-zinc-950 dark:border-amber-400 shadow-orange-500/20 font-bold"
                : "bg-white/95 dark:bg-[#0c0c10]/90 border-orange-200/80 dark:border-zinc-800 text-stone-700 dark:text-zinc-300 hover:text-stone-900 dark:hover:text-white hover:border-orange-400 dark:hover:border-zinc-600"
            }`}
          >
            <Play size={14} className={autoCruise ? "animate-spin text-white dark:text-zinc-950" : ""} />
            <span>{autoCruise ? "Auto-Traverse Active 🛰️" : "Auto-Traverse Mode"}</span>
          </button>

          <button
            onClick={() => driveToStation(activeStationIdx + 1)}
            disabled={activeStationIdx === milestones.length - 1}
            className="p-3 rounded-2xl bg-white/95 dark:bg-[#0c0c10]/90 border border-orange-200/80 dark:border-zinc-800 text-stone-700 dark:text-zinc-300 hover:text-stone-900 dark:hover:text-white hover:border-orange-400 dark:hover:border-zinc-600 active:scale-95 disabled:opacity-30 transition-all shadow-md backdrop-blur-2xl"
            title="Traverse to Next Outpost"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ── Seamless Full-Width Background Canvas (Pans with Car) ── */}
      <div
        className="absolute top-0 bottom-0 left-0 h-full will-change-transform"
        style={{
          width: `${totalWorldWidth}px`,
          transform: `translateX(-${cameraX}px)`,
        }}
      >
        {/* ── Background Cosmic Space Horizon & Starlight Dust ── */}
        <div className="absolute inset-0 bg-[#060609]">
          {/* Cosmic Nebula Glow & Stardust Clusters */}
          <div
            className="absolute top-0 left-0 right-0 h-96 opacity-40 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(251, 191, 36, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 40%, rgba(99, 102, 241, 0.12) 0%, transparent 45%)",
            }}
          />
          {/* Distant Earthrise & Moon Dust Haze */}
          <div
            className="absolute top-36 left-0 right-0 h-80 pointer-events-none opacity-25"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.15), rgba(161, 161, 170, 0.05), transparent 75%)",
              filter: "blur(70px)",
            }}
          />
        </div>

        {/* ── Curbside Landmark Billboards (Milestone Stations) ── */}
        {milestones.map((milestone, idx) => {
          const sx = getStationX(idx);
          const isNear = focusedMilestone?.id === milestone.id;
          const dist = Math.abs(carX - sx);

          // Distance-based night discovery lighting:
          // Milestones stay clearly visible from afar (baseline 0.68) and glow as headlights approach
          const illumination = Math.max(0.68, Math.min(1, 1 - (dist - 160) / 480));
          const isIlluminated = illumination > 0.78;

          return (
            <div
              key={milestone.id}
              style={{
                left: `${sx}px`,
                top: "85px",
                opacity: isNear ? 1 : Math.max(0.72, illumination),
                transform: `scale(${isNear ? 1.03 : 0.96 + illumination * 0.04})`,
                filter: isNear
                  ? "brightness(1.08) drop-shadow(0 15px 35px rgba(0,0,0,0.65))"
                  : isIlluminated
                  ? "brightness(1) drop-shadow(0 8px 20px rgba(0,0,0,0.45))"
                  : "brightness(0.85) contrast(0.95)",
                transition: "opacity 0.2s ease-out, transform 0.2s ease-out, filter 0.2s ease-out",
              }}
              className="absolute -translate-x-1/2 w-[310px] sm:w-[350px] z-20 flex flex-col items-center select-none"
            >
              {/* Elegant Spotlight Beam Shining Down on the Milestone */}
              <div
                className="absolute -top-12 w-48 h-[420px] pointer-events-none transition-opacity duration-300"
                style={{
                  background:
                    "conic-gradient(from 180deg at 50% 0%, rgba(251, 191, 36, 0.22) 0deg, transparent 70deg, transparent 290deg, rgba(251, 191, 36, 0.22) 360deg)",
                  opacity: isNear ? 0.95 : isIlluminated ? (illumination - 0.7) * 3 : 0.08,
                  filter: "blur(16px)",
                }}
              />

              {/* Milestone Landmark Billboard */}
              <div
                onClick={() => onInspectMilestone(milestone)}
                style={{
                  borderColor: isNear
                    ? "#f97316"
                    : isIlluminated
                    ? "rgba(255, 255, 255, 0.25)"
                    : "rgba(255, 255, 255, 0.12)",
                  boxShadow: isNear
                    ? "0 0 25px rgba(249, 115, 22, 0.25), 0 16px 36px rgba(0,0,0,0.7)"
                    : "0 8px 22px rgba(0,0,0,0.45)",
                }}
                className="relative w-full rounded-3xl bg-white dark:bg-[#0c0c10] backdrop-blur-2xl p-4 sm:p-5 transition-all duration-200 border cursor-pointer hover:border-orange-500 dark:hover:border-zinc-500 group/station shadow-xl"
              >
                {/* Header: Date + Category Badge */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-zinc-900 border border-orange-200 dark:border-zinc-800 text-xs font-mono font-bold text-stone-700 dark:text-zinc-200">
                      {getCategoryIcon(milestone.category)}
                      <span>{milestone.date}</span>
                    </div>
                    {milestone.id === "ai-trainer" && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-500/15 border border-orange-500/30">
                        <span className="text-[10px] font-mono font-bold text-orange-600 dark:text-zinc-300">Outlier &amp; Alignerr</span>
                      </div>
                    )}
                    {milestone.id === "discovery-academy" && (
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-purple-500/15 border border-purple-500/30">
                        <DiscoveryAcademyIcon className="w-4 h-4" variant="round" />
                      </div>
                    )}
                  </div>

                  <span className="text-xs font-mono text-orange-600 dark:text-zinc-300 uppercase tracking-widest font-extrabold">
                    Station #{idx + 1}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-base sm:text-lg font-black text-stone-900 dark:text-white group-hover/station:text-[var(--color-primary)] transition-colors line-clamp-1 mb-2">
                  {milestone.title}
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-300 line-clamp-2 leading-relaxed mb-4">
                  {milestone.description}
                </p>

                {/* Thumbnail Preview & Action Button */}
                <div className="flex items-center justify-between pt-3 border-t border-orange-200/80 dark:border-zinc-800">
                  {milestone.imageUrl ? (
                    <div className="relative w-20 h-12 rounded-xl overflow-hidden border border-orange-200 dark:border-zinc-700 shadow-md">
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
                          className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-orange-100/70 dark:bg-zinc-900 text-stone-600 dark:text-zinc-400 border border-orange-200 dark:border-zinc-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white font-mono text-xs font-bold transition-all shadow-md active:scale-95">
                    <span>Inspect</span>
                    <Maximize2 size={12} />
                  </button>
                </div>
              </div>

              {/* Station Roadside Pillar Base */}
              <div className="w-2 h-14 bg-gradient-to-b from-zinc-600 to-zinc-900 mt-1 rounded-full shadow-lg" />
              {/* Ground Reflective Base Stud */}
              <div
                className="w-16 h-3 rounded-full mt-[-2px] transition-all"
                style={{
                  backgroundColor: isNear ? "#f97316" : "#3f3f46",
                  boxShadow: isNear ? "0 0 16px #f97316" : "none",
                }}
              />
            </div>
          );
        })}

        {/* ── Lunar Regolith Surface & Expedition Highway ── */}
        <div
          style={{
            top: `${ROAD_MIN_Y - 40}px`,
            bottom: "0px",
          }}
          className="absolute left-0 right-0 bg-[#0a0a0f] border-t-2 border-zinc-700/80 shadow-[inset_0_20px_50px_rgba(0,0,0,0.95)]"
        >
          {/* Lunar Horizon Guidance Beacons (Gold & Starlight Silver) */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500/80 via-white to-amber-500/80 shadow-[0_0_14px_rgba(251,191,36,0.6)]" />

          {/* Left Lunar Rover Wheel Track (Chevrons pressed into Moon dust) */}
          <div
            className="absolute top-24 left-0 right-0 h-2 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, #71717a 0px, #71717a 8px, transparent 8px, transparent 18px)",
            }}
          />

          {/* Navigational Lunar Route Beacons (Golden Waypoints) */}
          <div className="absolute top-64 left-0 right-0 flex flex-col gap-2">
            <div
              className="h-1.5 opacity-90"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, #fbbf24 0px, #fbbf24 48px, transparent 48px, transparent 96px)",
              }}
            />
            <div
              className="h-1.5 opacity-90"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, #fbbf24 0px, #fbbf24 48px, transparent 48px, transparent 96px)",
              }}
            />
          </div>

          {/* Right Lunar Rover Wheel Track */}
          <div
            className="absolute top-104 left-0 right-0 h-2 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, #71717a 0px, #71717a 8px, transparent 8px, transparent 18px)",
            }}
          />

          {/* Surface Coordinate Signage in Lunar Dust */}
          {milestones.map((_, i) => (
            <div
              key={i}
              style={{ left: `${getStationX(i) - 80}px` }}
              className="absolute top-48 -translate-y-1/2 flex items-center gap-3 font-mono text-xs font-bold text-zinc-500/80 tracking-widest pointer-events-none select-none uppercase"
            >
              <span>◆◆◆</span>
              <span>LUNAR BASE SECTOR {i + 1} • APOLLO REGOLITH WAYPOINT</span>
              <span>◆◆◆</span>
            </div>
          ))}
        </div>

        {/* ── Dynamic Cosmic Darkness & Lunar Floodlight Mask ── */}
        <div
          className="absolute inset-0 pointer-events-none z-25"
          style={{
            background: `radial-gradient(ellipse 720px 480px at ${carX}px ${carY}px, transparent 35%, rgba(6, 6, 9, 0.25) 65%, rgba(4, 4, 7, 0.65) 95%)`,
          }}
        />

        {/* ── Top-Down Lunar Rover (Compact Sleek Scale) ── */}
        <div
          style={{
            left: `${carX}px`,
            top: `${carY}px`,
            transform: `translate(-50%, -50%) rotate(${carAngle - 90}deg) scale(0.85)`,
          }}
          className="absolute z-30 pointer-events-none will-change-transform"
        >
          <TopDownCar isDriving={isDriving} />
        </div>

        {/* ── Floating Proximity Prompt above Rover ── */}
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
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-stone-900 text-white dark:bg-white dark:text-black font-mono text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(251,191,36,0.35)] hover:scale-105 active:scale-95 transition-all animate-bounce cursor-pointer border border-amber-400 dark:border-white"
            >
              <Sparkles size={16} className="text-amber-400 dark:text-amber-500" />
              <span>[SPACE] Inspect Lunar Outpost Module</span>
            </button>
          </div>
        )}
      </div>

      {/* ── Bottom HUD Legend & Mobile Touch D-Pad ── */}
      <div className="absolute bottom-6 left-6 right-6 z-40 flex items-center justify-between gap-4 pointer-events-none">
        {/* Desktop Controls Legend */}
        <div className="hidden sm:inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/95 dark:bg-[#0c0c10]/90 border border-orange-200/80 dark:border-zinc-800 text-xs font-mono text-stone-700 dark:text-zinc-300 backdrop-blur-2xl shadow-xl">
          <span>Drive:</span>
          <kbd className="px-2 py-0.5 rounded bg-orange-100 dark:bg-zinc-800 text-orange-700 dark:text-zinc-200 border border-orange-200 dark:border-zinc-700">W</kbd>
          <kbd className="px-2 py-0.5 rounded bg-orange-100 dark:bg-zinc-800 text-orange-700 dark:text-zinc-200 border border-orange-200 dark:border-zinc-700">A</kbd>
          <kbd className="px-2 py-0.5 rounded bg-orange-100 dark:bg-zinc-800 text-orange-700 dark:text-zinc-200 border border-orange-200 dark:border-zinc-700">S</kbd>
          <kbd className="px-2 py-0.5 rounded bg-orange-100 dark:bg-zinc-800 text-orange-700 dark:text-zinc-200 border border-orange-200 dark:border-zinc-700">D</kbd>
          <span>or</span>
          <span className="text-orange-600 dark:text-zinc-100 font-bold">Arrow Keys</span>
          <span className="text-stone-300 dark:text-zinc-700">•</span>
          <span>Inspect:</span>
          <kbd className="px-2.5 py-0.5 rounded bg-orange-100 dark:bg-zinc-800 text-orange-700 dark:text-zinc-100 border border-orange-200 dark:border-zinc-700 font-bold">SPACE</kbd>
        </div>

        {/* Mobile Touch D-Pad */}
        <div className="flex sm:hidden items-center gap-2 pointer-events-auto bg-white/95 dark:bg-[#0c0c10]/95 p-2 rounded-2xl border border-orange-200/80 dark:border-zinc-800 backdrop-blur-2xl shadow-2xl">
          <button
            onTouchStart={() => (keysPressed.current["ArrowLeft"] = true)}
            onTouchEnd={() => delete keysPressed.current["ArrowLeft"]}
            onMouseDown={() => (keysPressed.current["ArrowLeft"] = true)}
            onMouseUp={() => delete keysPressed.current["ArrowLeft"]}
            className="p-3 rounded-xl bg-zinc-800 text-white active:bg-orange-500 active:text-white transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex flex-col gap-1.5">
            <button
              onTouchStart={() => (keysPressed.current["ArrowUp"] = true)}
              onTouchEnd={() => delete keysPressed.current["ArrowUp"]}
              onMouseDown={() => (keysPressed.current["ArrowUp"] = true)}
              onMouseUp={() => delete keysPressed.current["ArrowUp"]}
              className="p-2.5 rounded-xl bg-zinc-800 text-white active:bg-orange-500 active:text-white transition-colors"
            >
              <ArrowUp size={16} />
            </button>
            <button
              onTouchStart={() => (keysPressed.current["ArrowDown"] = true)}
              onTouchEnd={() => delete keysPressed.current["ArrowDown"]}
              onMouseDown={() => (keysPressed.current["ArrowDown"] = true)}
              onMouseUp={() => delete keysPressed.current["ArrowDown"]}
              className="p-2.5 rounded-xl bg-zinc-800 text-white active:bg-orange-500 active:text-white transition-colors"
            >
              <ArrowDown size={16} />
            </button>
          </div>
          <button
            onTouchStart={() => (keysPressed.current["ArrowRight"] = true)}
            onTouchEnd={() => delete keysPressed.current["ArrowRight"]}
            onMouseDown={() => (keysPressed.current["ArrowRight"] = true)}
            onMouseUp={() => delete keysPressed.current["ArrowRight"]}
            className="p-3 rounded-xl bg-zinc-800 text-white active:bg-orange-500 active:text-white transition-colors"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
