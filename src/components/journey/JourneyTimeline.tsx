"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { journeyMilestones } from "@/data/journey";
import { JourneyMilestone } from "@/types";
import JourneyWorld from "./JourneyWorld";
import { DiscoveryAcademyIcon } from "@/components/ui/BrandIcons";
import {
  Compass,
  Trophy,
  Briefcase,
  GraduationCap,
  Images,
  X,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Car,
  Sparkles,
} from "lucide-react";

export default function JourneyTimeline() {
  // Default to cards view and default to work category as requested
  const [viewMode, setViewMode] = useState<"drive" | "cards">("cards");
  const [selectedCategory, setSelectedCategory] = useState<string>("work");
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
        return <GraduationCap size={16} className="text-cyan-500 dark:text-cyan-400" />;
      case "achievement":
        return <Trophy size={16} className="text-amber-500 dark:text-amber-400" />;
      case "work":
        return <Briefcase size={16} className="text-orange-500 dark:text-purple-400" />;
      default:
        return <Compass size={16} className="text-emerald-500 dark:text-emerald-400" />;
    }
  };

  const categories = [
    { id: "work", label: "Work Experience", icon: Briefcase },
    { id: "all", label: "All Milestones", icon: Compass },
    { id: "achievement", label: "Competitions & Awards", icon: Trophy },
    { id: "education", label: "Education & Degree", icon: GraduationCap },
  ];

  const filteredMilestones =
    selectedCategory === "all"
      ? journeyMilestones
      : journeyMilestones.filter((m) => m.category === selectedCategory);

  return (
    <section
      id="journey"
      className="relative pt-20 sm:pt-28 pb-14 overflow-hidden"
    >
      {/* ── Section Header ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary-light)] text-xs font-mono uppercase tracking-wider mb-2">
              <Compass size={13} />
              Lunar Career Mission &amp; Odyssey 🚀
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--color-text-primary)]">
              My Professional <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-2 font-mono">
              Explore my work experience, competitive programming milestones, and engineering outposts. Switch to the interactive Moon Rover to traverse the lunar trail!
            </p>
          </div>

          {/* View Mode Switcher (Moon Rover vs Cards Grid) */}
          <div className="flex items-center gap-1.5 bg-orange-50/80 dark:bg-zinc-900/90 border border-orange-200 dark:border-zinc-800 p-1.5 rounded-2xl backdrop-blur-xl shadow-sm">
            <button
              onClick={() => setViewMode("cards")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                viewMode === "cards"
                  ? "bg-orange-600 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-md shadow-orange-500/20"
                  : "text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              <LayoutGrid size={15} />
              <span>Cards Grid ({journeyMilestones.length})</span>
            </button>

            <button
              onClick={() => setViewMode("drive")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                viewMode === "drive"
                  ? "bg-orange-600 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-md shadow-orange-500/20"
                  : "text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              <Car size={15} />
              <span>Moon Rover 🌔</span>
            </button>
          </div>
        </div>

        {/* ── Category Filter Tabs (Always visible in cards view) ── */}
        {viewMode === "cards" && (
          <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-orange-200/80 dark:border-zinc-800/80 pb-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const count =
                cat.id === "all"
                  ? journeyMilestones.length
                  : journeyMilestones.filter((m) => m.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 ${
                    isSelected
                      ? "bg-orange-600 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm"
                      : "bg-white/80 dark:bg-zinc-900/80 border border-orange-200/60 dark:border-zinc-800 text-stone-600 dark:text-zinc-400 hover:border-orange-300 dark:hover:border-zinc-600 hover:text-stone-900 dark:hover:text-white"
                  }`}
                >
                  <Icon size={14} />
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      isSelected
                        ? "bg-white/20 text-white dark:bg-zinc-950/20 dark:text-zinc-950 font-bold"
                        : "bg-orange-100 dark:bg-zinc-800 text-orange-700 dark:text-zinc-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Main Content ── */}
      {viewMode === "drive" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full"
        >
          <JourneyWorld
            milestones={journeyMilestones}
            onInspectMilestone={openModal}
          />
        </motion.div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMilestones.map((m, mIdx) => {
              const isAiTrainer = m.id === "ai-trainer";
              const isDiscovery = m.id === "discovery-academy";

              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 35, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: mIdx * 0.07, ease: "easeOut" }}
                  onClick={() => openModal(m)}
                  className="group relative rounded-3xl border border-orange-200/80 dark:border-zinc-800 bg-white dark:bg-[#0c0c10] backdrop-blur-xl p-6 transition-all duration-300 hover:border-orange-400 dark:hover:border-zinc-600 hover:shadow-xl hover:shadow-orange-500/10 cursor-pointer flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="p-2 rounded-xl bg-orange-50 dark:bg-zinc-900 border border-orange-200 dark:border-zinc-800">
                          {getCategoryIcon(m.category)}
                        </span>
                        {/* Outlier & Alignerr Pill (Clean typography) */}
                        {isAiTrainer && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-50 dark:bg-zinc-900 border border-orange-200/80 dark:border-zinc-800">
                            <span className="text-[10px] font-mono font-bold text-stone-700 dark:text-zinc-300">Outlier &amp; Alignerr</span>
                          </div>
                        )}
                        {/* Discovery Academy Logo */}
                        {isDiscovery && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-50 dark:bg-zinc-900 border border-orange-200/80 dark:border-zinc-800">
                            <DiscoveryAcademyIcon className="w-4 h-4" variant="round" />
                            <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400">Discovery</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-mono font-bold text-[var(--color-primary)]">
                        {m.date}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors mb-2">
                      {m.title}
                    </h3>

                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-3 mb-4">
                      {m.description}
                    </p>
                  </div>

                  {m.imageUrl ? (
                    <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-orange-200/80 dark:border-zinc-800 mt-2 bg-orange-50/50 dark:bg-zinc-900/50">
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
                  ) : (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {m.tags?.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg bg-orange-100/60 dark:bg-zinc-900 border border-orange-200/60 dark:border-zinc-800 text-[10px] font-mono text-stone-600 dark:text-zinc-400"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

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
              className="relative w-full max-w-4xl rounded-3xl border border-orange-200/80 dark:border-zinc-800 bg-white dark:bg-[#0c0c10] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-orange-200/80 dark:border-zinc-800 bg-orange-50/70 dark:bg-[#121217]">
                <div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-white">
                    {selectedMilestone.title}
                  </h3>
                  <span className="text-xs font-mono text-stone-500 dark:text-zinc-400">
                    {selectedMilestone.date} • Photo {activePhotoIdx + 1} of{" "}
                    {modalPhotos.length}
                  </span>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Close modal"
                  className="p-2 rounded-xl bg-orange-100/60 dark:bg-zinc-800 hover:bg-orange-200/60 dark:hover:bg-zinc-700 text-stone-700 dark:text-zinc-300 hover:text-stone-900 dark:hover:text-white transition-colors"
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
              <div className="px-6 py-4 border-t border-orange-200/80 dark:border-zinc-800 bg-orange-50/70 dark:bg-[#121217] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-stone-600 dark:text-zinc-300 line-clamp-2 max-w-xl">
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
                            ? "border-orange-500 dark:border-zinc-100 scale-105"
                            : "border-orange-200 dark:border-zinc-800 opacity-60 hover:opacity-100"
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
