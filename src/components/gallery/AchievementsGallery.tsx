"use client";

import { useState, useId } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { achievementPhotos } from "@/data/gallery";
import { AchievementPhoto } from "@/types";
import { formatDate } from "@/lib/utils";
import { Trophy, X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Filter } from "lucide-react";

export default function AchievementsGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Moments" },
    { id: "competition", label: "Competitions & ECPC" },
    { id: "college", label: "Graduation & College" },
  ];

  const filteredPhotos =
    selectedCategory === "all"
      ? achievementPhotos
      : achievementPhotos.filter((p) => p.category === selectedCategory);

  // Split into two sets for the dual-row marquee
  const rowOne = filteredPhotos.slice(0, Math.ceil(filteredPhotos.length / 2));
  const rowTwo = filteredPhotos.slice(Math.ceil(filteredPhotos.length / 2));

  // Handlers for modal navigation
  const openModal = (photo: AchievementPhoto) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photo.id);
    setSelectedPhotoIndex(idx !== -1 ? idx : 0);
  };

  const closeModal = () => setSelectedPhotoIndex(null);

  const prevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev! > 0 ? prev! - 1 : filteredPhotos.length - 1
    );
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev! < filteredPhotos.length - 1 ? prev! + 1 : 0
    );
  };

  const activePhoto =
    selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  return (
    <section id="gallery" className="relative py-24 sm:py-32 overflow-hidden">
      {/* ── Background Ambience Glow ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-primary), var(--color-accent), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-12 sm:mb-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider mb-2">
              <Trophy size={14} />
              Hall of Moments
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)]">
              Achievements <span className="text-gradient">&amp; Highlights</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-2 max-w-xl">
              Memories from ECPC contests, coding hackathons, graduation day, and teamwork moments. Click any photo to expand.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/25"
                    : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-white border border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Dual-Row Infinite Marquee ────────────────────────────────────────── */}
      <div className="relative space-y-6 sm:space-y-8 select-none">
        {/* Edge Gradient Masks for Smooth Fade */}
        <div className="absolute left-0 inset-y-0 w-24 sm:w-40 bg-gradient-to-r from-[var(--color-bg-primary)] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-24 sm:w-40 bg-gradient-to-l from-[var(--color-bg-primary)] to-transparent z-20 pointer-events-none" />

        {/* Row 1 — Moving Left */}
        <MarqueeRow photos={rowOne} onPhotoClick={openModal} direction="left" />

        {/* Row 2 — Moving Right */}
        <MarqueeRow photos={rowTwo.length > 0 ? rowTwo : rowOne} onPhotoClick={openModal} direction="right" />
      </div>

      {/* ── Lightbox Modal ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-xl"
          >
            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] rounded-3xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-2xl flex flex-col"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[var(--color-primary-light)]">
                    {selectedPhotoIndex! + 1} / {filteredPhotos.length}
                  </span>
                  {activePhoto.date && (
                    <span className="text-xs text-[var(--color-text-muted)] font-mono">
                      • {formatDate(activePhoto.date)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevPhoto}
                    aria-label="Previous photo"
                    className="p-1.5 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-text-secondary)] hover:text-white transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextPhoto}
                    aria-label="Next photo"
                    className="p-1.5 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-text-secondary)] hover:text-white transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    onClick={closeModal}
                    aria-label="Close modal"
                    className="p-1.5 rounded-lg border border-[var(--color-border)] hover:border-red-500/50 text-[var(--color-text-secondary)] hover:text-red-400 transition-colors ml-2"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Image Preview Container */}
              <div className="relative flex-1 min-h-[350px] sm:min-h-[480px] w-full bg-black/60 flex items-center justify-center p-2">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Caption Footer */}
              <div className="p-5 sm:p-6 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                <h4 className="text-lg font-bold text-[var(--color-text-primary)]">
                  {activePhoto.caption || activePhoto.alt}
                </h4>
                {activePhoto.category && (
                  <span className="inline-block mt-1 text-xs font-mono uppercase tracking-wider text-[var(--color-primary-light)]">
                    #{activePhoto.category}
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Infinite Marquee Row Sub-Component ─────────────────────────────────────

interface MarqueeRowProps {
  photos: AchievementPhoto[];
  onPhotoClick: (photo: AchievementPhoto) => void;
  direction?: "left" | "right";
}

function MarqueeRow({ photos, onPhotoClick, direction = "left" }: MarqueeRowProps) {
  // Duplicate array 3 times to ensure infinite smooth marquee without gaps
  const repeated = [...photos, ...photos, ...photos];

  return (
    <div className="flex overflow-hidden py-2 group/marquee">
      <motion.div
        className="flex gap-4 sm:gap-6 shrink-0"
        animate={{
          x: direction === "left" ? ["0%", "-33.333%"] : ["-33.333%", "0%"],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {repeated.map((photo, i) => (
          <div
            key={`${photo.id}-${i}`}
            onClick={() => onPhotoClick(photo)}
            className="group relative h-56 sm:h-64 md:h-72 w-72 sm:w-80 md:w-96 shrink-0 rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-secondary)] cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:border-[var(--color-primary)] hover:shadow-xl hover:shadow-[var(--color-primary)]/15"
          >
            {/* Image */}
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, 384px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Hover Expand Icon */}
            <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 size={14} />
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-0 inset-x-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform">
              {photo.date && (
                <span className="text-[11px] font-mono text-[var(--color-primary-light)] font-semibold block mb-0.5">
                  {formatDate(photo.date)}
                </span>
              )}
              <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                {photo.caption || photo.alt}
              </h3>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
