"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import {
  FolderKanban,
  ExternalLink,
  Code2,
  Sparkles,
  ArrowRight,
  Cpu,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "graduation", label: "Graduation & AI" },
    { id: "backend", label: "Backend Systems" },
    { id: "game", label: "Games & Algorithms" },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // Show 4 projects initially to keep mobile scroll fast, or all if toggled
  const displayedProjects = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(0, 4);

  return (
    <section id="projects" className="relative py-12 sm:py-24 overflow-hidden border-t border-[var(--color-border)]/50">
      {/* ── Background Glow ── */}
      <div
        className="absolute top-1/4 right-1/4 w-[550px] h-[350px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-accent), var(--color-primary), transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 text-[var(--color-accent-light)] text-xs font-mono uppercase tracking-wider mb-2">
              <FolderKanban size={14} />
              Featured Engineering Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)]">
              Engineered <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-2 max-w-xl">
              Production-ready backend platforms, distributed microservices, and real-time algorithmic systems.
            </p>
          </div>

          {/* ── Category Filter Pills ── */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setShowAllProjects(false);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? "bg-orange-600 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-md shadow-orange-500/20"
                    : "bg-white/80 dark:bg-zinc-900/80 text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white border border-orange-200/60 dark:border-zinc-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Projects Grid ── */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {displayedProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                isFeatured={project.isFeatured && idx === 0}
              />
            ))}
          </div>

          {/* Show More / Show Less Collapsible Toggle */}
          {filteredProjects.length > 4 && (
            <div className="flex justify-center pt-2">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-orange-50/90 dark:bg-zinc-900 border border-orange-200 dark:border-zinc-800 text-xs sm:text-sm font-mono font-bold text-stone-700 dark:text-zinc-300 hover:text-stone-900 dark:hover:text-white hover:border-orange-400 dark:hover:border-zinc-600 transition-all shadow-md active:scale-95"
              >
                {showAllProjects ? (
                  <>
                    <span>Show Less Projects</span>
                    <ChevronUp size={15} />
                  </>
                ) : (
                  <>
                    <span>View All Projects ({filteredProjects.length})</span>
                    <ChevronDown size={15} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Project Card Sub-Component
// =============================================================================

interface ProjectCardProps {
  project: Project;
  isFeatured?: boolean;
  index?: number;
}

function ProjectCard({ project, isFeatured = false, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.18), ease: "easeOut" }}
      className={`group relative flex flex-col justify-between rounded-3xl border border-orange-200/80 dark:border-zinc-800 bg-white/95 dark:bg-[#0c0c10]/95 backdrop-blur-xl p-6 sm:p-7 transition-all duration-300 hover:border-orange-400 dark:hover:border-zinc-600 hover:shadow-2xl hover:shadow-orange-500/10 shadow-sm ${
        isFeatured ? "md:col-span-2 border-orange-300/80 dark:border-zinc-700" : ""
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-orange-50 dark:bg-zinc-900 border border-orange-200 dark:border-zinc-800 text-[var(--color-primary-light)]">
              <Code2 size={16} />
            </span>
            {isFeatured && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                <Sparkles size={12} />
                Featured Flagship
              </span>
            )}
          </div>
          <span className="text-xs font-mono font-bold text-orange-600 dark:text-zinc-400 uppercase tracking-wider">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-zinc-200 transition-colors mb-3">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400 leading-relaxed mb-6 font-normal">
          {project.description}
        </p>
      </div>

      <div>
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map((t) => (
            <span
              key={t}
              className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-orange-100/50 dark:bg-zinc-900 text-stone-700 dark:text-zinc-400 border border-orange-200/60 dark:border-zinc-800"
            >
              #{t}
            </span>
          ))}
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-3 pt-1 border-t border-orange-200/60 dark:border-zinc-800">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target={project.liveUrl.startsWith("#") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white shadow-sm shadow-orange-500/20 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 text-xs font-semibold font-mono transition-all active:scale-95"
            >
              <ExternalLink size={12} />
              <span>Live Demo</span>
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 dark:bg-zinc-900 border border-stone-300 dark:border-zinc-800 hover:border-stone-500 dark:hover:border-zinc-600 text-stone-900 dark:text-white text-xs font-semibold font-mono transition-all active:scale-95 shadow-xs"
            >
              <FaGithub size={12} />
              <span>Source Code</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
