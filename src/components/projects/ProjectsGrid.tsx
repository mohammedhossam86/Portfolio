"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/opensource";
import { Project, BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";
import {
  FolderKanban,
  ExternalLink,
  Code2,
  Sparkles,
  BookOpen,
  ArrowRight,
  Layers,
  Cpu,
  ChevronDown,
  ChevronUp,
  Play,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function ProjectsGrid() {
  const [activeTab, setActiveTab] = useState<"projects" | "blog">("projects");
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
    <section id="projects" className="relative py-20 sm:py-32 overflow-hidden border-t border-[var(--color-border)]/50">
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
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 text-[var(--color-accent-light)] text-xs font-mono uppercase tracking-wider mb-2">
              <FolderKanban size={14} />
              Featured Work
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)]">
              Engineered <span className="text-gradient">Projects &amp; Blog</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-2 max-w-xl">
              Production-ready backend platforms, distributed systems, and real-time algorithmic games.
            </p>
          </div>

          {/* Toggle between Projects & Blog */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === "projects"
                  ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30"
                  : "text-[var(--color-text-secondary)] hover:text-white"
              }`}
            >
              <Layers size={15} />
              Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab("blog")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === "blog"
                  ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30"
                  : "text-[var(--color-text-secondary)] hover:text-white"
              }`}
            >
              <BookOpen size={15} />
              Blog ({blogPosts.length})
            </button>
          </div>
        </motion.div>

        {/* ── Sub-category Filter (For Projects view) ── */}
        {activeTab === "projects" && (
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setShowAllProjects(false);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? "bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/25"
                    : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-white border border-[var(--color-border)]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* ── Content View ── */}
        <AnimatePresence mode="wait">
          {activeTab === "projects" ? (
            <div className="space-y-8">
              <motion.div
                key="projects-grid"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {displayedProjects.map((project, idx) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={idx}
                    isFeatured={project.isFeatured && idx === 0}
                  />
                ))}
              </motion.div>

              {/* Show More / Show Less Collapsible Toggle */}
              {filteredProjects.length > 4 && (
                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => setShowAllProjects(!showAllProjects)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-slate-900 border border-slate-700 text-xs sm:text-sm font-mono text-slate-300 hover:text-white hover:border-[var(--color-primary)] transition-all shadow-md active:scale-95"
                  >
                    {showAllProjects ? (
                      <>
                        <span>Show Less</span>
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
          ) : (
            <motion.div
              key="blog-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
            >
              {blogPosts.map((post, pIdx) => (
                <BlogCard key={post.id} post={post} index={pIdx} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// =============================================================================
// Project Card Sub-Component (Bento Grid Style with Live Demo Buttons)
// =============================================================================

interface ProjectCardProps {
  project: Project;
  isFeatured?: boolean;
  index?: number;
}

function ProjectCard({ project, isFeatured = false, index = 0 }: ProjectCardProps) {
  const isGraduation = project.category === "graduation";
  const isGame = project.category === "game";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-45px" }}
      transition={{
        duration: 0.55,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative flex flex-col justify-between rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/90 backdrop-blur-xl p-6 sm:p-7 transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-2xl hover:shadow-[var(--color-primary)]/15 ${
        isFeatured ? "md:col-span-2 lg:col-span-2" : "col-span-1"
      }`}
    >
      <div>
        {/* Top Header Category & Action Icons */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`p-2 rounded-xl border ${
                isGraduation
                  ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
                  : isGame
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
              }`}
            >
              {isGraduation ? <Cpu size={16} /> : isGame ? <Play size={16} /> : <Code2 size={16} />}
            </span>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-primary-light)]">
              {project.category}
            </span>
          </div>

          {/* Direct Quick Links */}
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target={project.liveUrl.startsWith("#") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                title="Live Demo"
                className="p-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-colors"
              >
                <ExternalLink size={15} />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="View Source on GitHub"
                className="p-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-white hover:border-white/40 transition-colors"
              >
                <FaGithub size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[var(--color-accent-light)] transition-all mb-3 leading-snug">
          {project.title}
        </h3>

        {/* Clean, Simple Description */}
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6 font-normal">
          {project.description}
        </p>
      </div>

      {/* Bottom Footer: Tech Stack Tags + Action Buttons */}
      <div className="space-y-4 pt-4 border-t border-[var(--color-border)]/60">
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-3 pt-1">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target={project.liveUrl.startsWith("#") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900 text-white dark:bg-white dark:text-black hover:bg-stone-800 dark:hover:bg-zinc-200 text-xs font-semibold font-mono transition-all shadow-sm active:scale-95"
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

// =============================================================================
// Blog Card Sub-Component
// =============================================================================

function BlogCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 35, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-45px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group relative flex flex-col justify-between rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/90 backdrop-blur-xl p-6 sm:p-7 transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-2xl hover:shadow-[var(--color-primary)]/15"
    >
      <div>
        <div className="flex items-center justify-between text-xs font-mono text-[var(--color-primary-light)] mb-4">
          <span>{formatDate(post.publishedAt)}</span>
          <span>{post.readTimeMinutes} min read</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-light)] transition-colors mb-3">
          {post.title}
        </h3>

        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
          {post.excerpt}
        </p>
      </div>

      <div className="pt-4 border-t border-[var(--color-border)]/60 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]"
            >
              #{tag}
            </span>
          ))}
        </div>
        <ExternalLink
          size={14}
          className="text-[var(--color-primary-light)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
        />
      </div>
    </motion.a>
  );
}
