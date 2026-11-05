"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { journeyMilestones } from "@/data/journey";
import { JourneyMilestone } from "@/types";
import JourneyWorld from "./JourneyWorld";
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
  LayoutGrid,
  Car,
  ExternalLink,
} from "lucide-react";

export default function JourneyTimeline() {
  const [viewMode, setViewMode] = useState<"drive" | "cards">("drive");
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

  const modalPhotos = selectedMilestone
    ? selectedMilestone.images && selectedMilestone.images.length > 0
      ? selectedMilestone.images
      : selectedMilestone.imageUrl
      ? [selectedMilestone.imageUrl]
      : []
    : [];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "education":
        return <GraduationCap size={16} className="text-cyan-400" />;
      case "achievement":
        return <Trophy size={16} className="text-amber-400" />;
      case "work":
        return <Briefcase size={16} className="text-purple-400" />;
      default:
        return <Compass size={16} className="text-emerald-400" />;
    }
  };

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 text-[var(--color-accent-light)] text-xs font-mono uppercase tracking-wider mb-3">
              <Compass size={13} />
              Open World Boulevard
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
              Drive Through My <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-mono">
              Navigate the sports car across the highway using <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">W/A/S/D</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">Arrows</kbd>. Drive near milestones to light them up, and press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300">SPACE</kbd> to inspect!
            </p>
          </div>

          {/* View Switcher: Interactive Drive vs Grid Cards */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl backdrop-blur-xl">
            <button
              onClick={() => setViewMode("drive")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                viewMode === "drive"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Car size={15} />
              <span>Drive Mode</span>
            </button>

            <button
              onClick={() => setViewMode("cards")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                viewMode === "cards"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid size={15} />
              <span>Cards View ({journeyMilestones.length})</span>
            </button>
          </div>
        </div>

        {/* ── Main Viewport Content ── */}
        {viewMode === "drive" ? (
          <JourneyWorld
            milestones={journeyMilestones}
            onInspectMilestone={openModal}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journeyMilestones.map((m, idx) => (
              <div
                key={m.id}
                onClick={() => openModal(m)}
                className="group relative rounded-3xl border border-slate-800 bg-[#0b0e18]/90 backdrop-blur-xl p-6 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      {getCategoryIcon(m.category)}
                    </span>
                    <span className="text-xs font-mono text-cyan-400">
                      {m.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {m.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {m.description}
                  </p>
                </div>

                {m.imageUrl && (
                  <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-slate-800 mt-2">
                    <Image
                      src={m.imageUrl}
                      alt={m.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {m.images && m.images.length > 1 && (
                      <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/80 text-[10px] font-mono text-white flex items-center gap-1 backdrop-blur-md">
                        <Images size={12} />
                        <span>{m.images.length} photos</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
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
