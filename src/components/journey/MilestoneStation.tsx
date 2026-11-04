"use client";

import Image from "next/image";
import { JourneyMilestone } from "@/types";
import { formatDate } from "@/lib/utils";
import {
  Trophy,
  GraduationCap,
  Briefcase,
  Sparkles,
  Code2,
  Images,
  ExternalLink,
} from "lucide-react";

interface MilestoneStationProps {
  milestone: JourneyMilestone;
  index: number;
  total: number;
  isActive: boolean;
  onSelect?: () => void;
  onOpenDetails?: (milestone: JourneyMilestone) => void;
}

function getCategoryMeta(category: JourneyMilestone["category"]) {
  switch (category) {
    case "achievement":
      return {
        label: "Achievement",
        icon: Trophy,
        badgeClass: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      };
    case "education":
      return {
        label: "Education",
        icon: GraduationCap,
        badgeClass: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
      };
    case "work":
    case "internship":
      return {
        label: category === "work" ? "Career" : "Internship",
        icon: Briefcase,
        badgeClass: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
      };
    case "opensource":
      return {
        label: "Open Source",
        icon: Code2,
        badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      };
    default:
      return {
        label: "Milestone",
        icon: Sparkles,
        badgeClass: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      };
  }
}

export default function MilestoneStation({
  milestone,
  index,
  total,
  isActive,
  onSelect,
  onOpenDetails,
}: MilestoneStationProps) {
  const meta = getCategoryMeta(milestone.category);
  const Icon = meta.icon;
  const photoCount = milestone.images?.length || (milestone.imageUrl ? 1 : 0);

  const handleClick = () => {
    if (isActive && onOpenDetails) {
      onOpenDetails(milestone);
    } else if (onSelect) {
      onSelect();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative flex-shrink-0 w-[310px] sm:w-[360px] md:w-[400px] cursor-pointer transition-all duration-500 ${
        isActive
          ? "scale-100 opacity-100 z-20"
          : "scale-[0.93] opacity-65 hover:opacity-95 z-10"
      }`}
    >
      {/* ── Active Glow Aura ── */}
      {isActive && (
        <div
          className="absolute -inset-2.5 rounded-2xl bg-gradient-to-r from-[var(--color-primary)]/40 via-[var(--color-accent)]/30 to-[var(--color-primary)]/40 blur-xl opacity-80"
          aria-hidden
        />
      )}

      {/* ── Main Station Card ── */}
      <div
        className={`relative overflow-hidden rounded-2xl border transition-all duration-300 backdrop-blur-xl ${
          isActive
            ? "border-[var(--color-primary)] bg-[var(--color-bg-secondary)]/95 shadow-2xl shadow-[var(--color-primary)]/25"
            : "border-[var(--color-border)] bg-[var(--color-bg-secondary)]/70 hover:border-[var(--color-border-hover)]"
        }`}
      >
        {/* ── Photo Preview ── */}
        {milestone.imageUrl ? (
          <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900/80">
            <Image
              src={milestone.imageUrl}
              alt={milestone.title}
              fill
              sizes="(max-width: 640px) 310px, (max-width: 768px) 360px, 400px"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-secondary)] via-transparent to-black/40" />

            {/* Top station counter badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 border border-white/10 font-semibold">
                Station {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>

            {/* Category tag */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md ${meta.badgeClass}`}
              >
                <Icon size={12} />
                {meta.label}
              </span>
            </div>

            {/* Multi-Photo Indicator Badge */}
            {photoCount > 1 && (
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white text-xs font-mono">
                <Images size={13} className="text-[var(--color-accent)]" />
                <span>{photoCount} Photos</span>
              </div>
            )}
          </div>
        ) : (
          /* Fallback banner for milestones without photos */
          <div className="relative h-28 w-full overflow-hidden bg-gradient-to-br from-indigo-950/70 via-slate-900 to-[var(--color-bg-secondary)] p-4 flex flex-col justify-between border-b border-[var(--color-border)]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-black/60 text-white/90 border border-white/10 font-semibold">
                Station {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${meta.badgeClass}`}
              >
                <Icon size={12} />
                {meta.label}
              </span>
            </div>
            <div className="text-right">
              <span className="text-4xl opacity-20 font-black font-mono">#{index + 1}</span>
            </div>
          </div>
        )}

        {/* ── Card Content ── */}
        <div className="p-5 sm:p-6 space-y-3">
          {/* Date */}
          <div className="flex items-center justify-between text-xs text-[var(--color-primary-light)] font-mono">
            <span className="font-semibold tracking-wider uppercase">
              {formatDate(milestone.date)}
            </span>

            {/* Click to view badge */}
            <span className="text-[11px] text-[var(--color-accent-light)] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to view details <ExternalLink size={11} />
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[var(--color-accent-light)] transition-all line-clamp-2">
            {milestone.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
            {milestone.description}
          </p>

          {/* Tags */}
          {milestone.tags && milestone.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {milestone.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
