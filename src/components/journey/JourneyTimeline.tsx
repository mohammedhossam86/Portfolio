"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { journeyMilestones } from "@/data/journey";
import { JourneyMilestone } from "@/types";
import TopDownCar from "./TopDownCar";
import {
  Compass,
  Trophy,
  Briefcase,
  GraduationCap,
  Images,
  X,
  ChevronLeft,
  ChevronRight,
  Flame,
  ArrowDown,
  ArrowUp,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export default function JourneyTimeline() {
  const [activeStationIdx, setActiveStationIdx] = useState(0);
  const [isDriving, setIsDriving] = useState(false);
  const [isAutoCruise, setIsAutoCruise] = useState(false);
  const totalMilestones = journeyMilestones.length;

  const stationRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ─── Modal State for Multi-Photo Gallery ───────────────────────────────────
  const [selectedMilestone, setSelectedMilestone] = useState<JourneyMilestone | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const openModal = (milestone: JourneyMilestone) => {
    setSelectedMilestone(milestone);
    setActivePhotoIdx(0);
  };

  const closeModal = () => {
    setSelectedMilestone(null);
    setActivePhotoIdx(0);
  };

  // ─── Drive to Specific Station ────────────────────────────────────────────
  const driveToStation = useCallback(
    (targetIdx: number) => {
      const clamped = Math.max(0, Math.min(totalMilestones - 1, targetIdx));
      if (clamped === activeStationIdx && !isDriving) return;

      setIsDriving(true);
      setActiveStationIdx(clamped);

      // Smoothly scroll station into view
      setTimeout(() => {
        const targetEl = stationRefs.current[clamped];
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        setTimeout(() => setIsDriving(false), 500);
      }, 50);
    },
    [activeStationIdx, isDriving, totalMilestones]
  );

  const driveNext = useCallback(() => {
    driveToStation(activeStationIdx + 1);
  }, [activeStationIdx, driveToStation]);

  const drivePrev = useCallback(() => {
    driveToStation(activeStationIdx - 1);
  }, [activeStationIdx, driveToStation]);

  // ─── Keyboard Controls for Driving ────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input or modal is open
      if ((e.target as HTMLElement)?.tagName === "INPUT" || selectedMilestone) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        driveNext();
      } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        drivePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [driveNext, drivePrev, selectedMilestone]);

  // ─── Auto Cruise Mode ──────────────────────────────────────────────────────
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoCruise) {
      interval = setInterval(() => {
        setActiveStationIdx((prev) => {
          if (prev >= totalMilestones - 1) {
            setIsAutoCruise(false);
            return prev;
          }
          const next = prev + 1;
          const targetEl = stationRefs.current[next];
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
          }
          return next;
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isAutoCruise, totalMilestones]);

  const modalPhotos = selectedMilestone
    ? selectedMilestone.images && selectedMilestone.images.length > 0
      ? selectedMilestone.images
      : selectedMilestone.imageUrl
      ? [selectedMilestone.imageUrl]
      : []
    : [];

  const carProgressPercent =
    totalMilestones > 1 ? (activeStationIdx / (totalMilestones - 1)) * 92 : 0;

  return (
    <section
      id="journey"
      className="relative py-20 sm:py-32 overflow-hidden border-t border-[var(--color-border)]/50"
    >
      {/* ── Background Atmosphere ── */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-primary), var(--color-accent), transparent 70%)",
          filter: "blur(130px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Section Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 text-[var(--color-accent-light)] text-xs font-mono uppercase tracking-wider mb-3">
            <Compass size={13} />
            Interactive Career Drive
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Drive Through My <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-mono">
            Drive the sports car using your keyboard <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">W / S</kbd> or the Gamepad controls below!
          </p>

          {/* ── Drive Control Dashboard (Gamepad Controls) ── */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2.5 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-xl">
            <button
              onClick={drivePrev}
              disabled={activeStationIdx === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs font-mono text-slate-200 disabled:opacity-40 disabled:pointer-events-none transition-all border border-slate-700"
            >
              <ArrowUp size={14} />
              <span>Drive Up</span>
            </button>

            <button
              onClick={driveNext}
              disabled={activeStationIdx === totalMilestones - 1}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] active:scale-95 text-xs font-mono text-white disabled:opacity-40 disabled:pointer-events-none transition-all shadow-md shadow-[var(--color-primary)]/30"
            >
              <span>Drive Down</span>
              <ArrowDown size={14} />
            </button>

            <button
              onClick={() => setIsAutoCruise(!isAutoCruise)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono transition-all border ${
                isAutoCruise
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:text-white"
              }`}
            >
              <Play size={12} className={isAutoCruise ? "animate-spin" : ""} />
              <span>{isAutoCruise ? "Cruise Active" : "Auto-Cruise"}</span>
            </button>

            <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-black/40 text-[11px] font-mono text-slate-400 border border-slate-800">
              <span>Station:</span>
              <strong className="text-cyan-300">
                {activeStationIdx + 1}/{totalMilestones}
              </strong>
            </div>
          </div>
        </div>

        {/* ── Road & Stations Container ── */}
        <div className="relative min-h-[1200px] py-6 sm:py-10">
          {/* ── The Center Asphalt Highway Road ── */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-14 sm:w-20 bg-gradient-to-b from-[#090d16] via-[#0f1422] to-[#090d16] border-x-2 border-slate-800/90 shadow-[0_0_30px_rgba(0,0,0,0.8)] z-0 rounded-2xl overflow-hidden">
            {/* White Shoulder Borders */}
            <div className="absolute left-1 top-0 bottom-0 w-0.5 bg-slate-600/40" />
            <div className="absolute right-1 top-0 bottom-0 w-0.5 bg-slate-600/40" />

            {/* Yellow Dashed Center Line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #facc15 0px, #facc15 24px, transparent 24px, transparent 48px)",
              }}
            />
          </div>

          {/* ── The Playable 2D Top-Down Car (Drives between Stations) ── */}
          <div
            style={{
              top: `${carProgressPercent}%`,
              transition: "top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          >
            <TopDownCar isDriving={isDriving || isAutoCruise} />

            {/* Cruising Speed HUD */}
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/90 border border-cyan-500/50 text-[10px] font-mono text-cyan-300 shadow-lg backdrop-blur-md whitespace-nowrap">
              <Flame size={11} className="text-amber-400" />
              <span>{isDriving ? "ACCELERATING" : "ARRIVED"}</span>
            </div>
          </div>

          {/* ── Milestones Stations (Alternating Left & Right) ── */}
          <div className="relative z-10 space-y-12 sm:space-y-20">
            {journeyMilestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = idx === activeStationIdx;
              const hasPhotos =
                (milestone.images && milestone.images.length > 0) ||
                milestone.imageUrl;
              const photoCount = milestone.images?.length || (milestone.imageUrl ? 1 : 0);

              const isWork = milestone.category === "work";
              const isAchievement = milestone.category === "achievement";
              const isEducation = milestone.category === "education";

              return (
                <div
                  key={milestone.id}
                  ref={(el) => {
                    stationRefs.current[idx] = el;
                  }}
                  onClick={() => driveToStation(idx)}
                  className={`flex flex-col md:flex-row items-start cursor-pointer ${
                    isEven ? "md:flex-row-reverse" : ""
                  } gap-4 md:gap-0`}
                >
                  {/* Station Content Card */}
                  <div
                    className={`w-full pl-16 md:pl-0 md:w-1/2 ${
                      isEven ? "md:pl-16" : "md:pr-16"
                    }`}
                  >
                    <div
                      className={`group relative rounded-3xl border p-5 sm:p-7 shadow-xl backdrop-blur-xl transition-all duration-300 ${
                        isActive
                          ? "border-cyan-400 ring-2 ring-cyan-400/30 shadow-[0_0_25px_rgba(34,211,238,0.25)] scale-[1.02] bg-[#0f172a]"
                          : isWork
                          ? "border-purple-500/30 bg-[#0f0e1c]/90 hover:border-purple-500/60"
                          : isAchievement
                          ? "border-amber-500/30 bg-[#14120a]/90 hover:border-amber-500/60"
                          : "border-slate-800 bg-[#0b0e18]/90 hover:border-slate-700"
                      }`}
                    >
                      {/* Active Station Car Magnet Indicator */}
                      {isActive && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono mb-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                          <span>CAR AT THIS STATION</span>
                        </div>
                      )}

                      {/* Top Bar: Date & Category Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                        <span className="text-xs font-mono font-bold text-slate-400">
                          {milestone.date}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider ${
                            isWork
                              ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                              : isAchievement
                              ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                              : "bg-blue-500/15 text-blue-300 border border-blue-500/30"
                          }`}
                        >
                          {isWork && <Briefcase size={11} />}
                          {isAchievement && <Trophy size={11} />}
                          {isEducation && <GraduationCap size={11} />}
                          {milestone.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-[var(--color-primary-light)] transition-colors">
                        {milestone.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-4">
                        {milestone.description}
                      </p>

                      {/* ── Directly Visible Media Preview ── */}
                      {hasPhotos && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(milestone);
                          }}
                          className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 cursor-pointer group/img mb-3 shadow-md"
                        >
                          <Image
                            src={
                              milestone.images?.[0] ||
                              milestone.imageUrl ||
                              ""
                            }
                            alt={milestone.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 450px"
                            className="object-cover object-center group-hover/img:scale-105 transition-transform duration-500 opacity-90 group-hover/img:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                          {/* Gallery Badge */}
                          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs font-mono text-white">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/20 text-[11px]">
                              <Images size={12} className="text-cyan-400" />
                              {photoCount > 1
                                ? `${photoCount} Photos • Click to view`
                                : "Click to view photo"}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      {milestone.tags && milestone.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                          {milestone.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Multi-Photo Interactive Modal ── */}
      <AnimatePresence>
        {selectedMilestone && modalPhotos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 select-none"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-3xl border border-slate-700 bg-[#0b0e18] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0d1220]">
                <div>
                  <h3 className="text-base font-bold text-white">
                    {selectedMilestone.title}
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    {selectedMilestone.date} • Photo {activePhotoIdx + 1} of{" "}
                    {modalPhotos.length}
                  </span>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Close modal"
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Photo Display Viewport */}
              <div className="relative flex-1 min-h-[350px] sm:min-h-[500px] bg-black flex items-center justify-center overflow-hidden">
                <Image
                  src={modalPhotos[activePhotoIdx]}
                  alt={`${selectedMilestone.title} photo ${activePhotoIdx + 1}`}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1000px"
                  className="object-contain"
                  priority
                />

                {modalPhotos.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActivePhotoIdx((prev) =>
                          prev === 0 ? modalPhotos.length - 1 : prev - 1
                        )
                      }
                      aria-label="Previous photo"
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() =>
                        setActivePhotoIdx((prev) =>
                          (prev + 1) % modalPhotos.length
                        )
                      }
                      aria-label="Next photo"
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Modal Bottom */}
              <div className="px-6 py-4 border-t border-slate-800 bg-[#0d1220] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-300 line-clamp-2 max-w-xl">
                  {selectedMilestone.description}
                </p>

                {modalPhotos.length > 1 && (
                  <div className="flex items-center gap-2">
                    {modalPhotos.map((photo, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePhotoIdx(i)}
                        className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                          i === activePhotoIdx
                            ? "border-[var(--color-primary)] scale-105"
                            : "border-slate-700 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={photo}
                          alt="Thumbnail"
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
