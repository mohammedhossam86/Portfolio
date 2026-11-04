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
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function ProjectsGrid() {
  const [activeTab, setActiveTab] = useState<"projects" | "blog">("projects");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
      {/* ── Background Glow ── */}
      <div
        className="absolute top-1/4 right-1/4 w-[550px] h-[350px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-accent), var(--color-primary), transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 text-[var(--color-accent-light)] text-xs font-mono uppercase tracking-wider mb-2">
              <FolderKanban size={14} />
              Engineered Systems
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)]">
              Featured <span className="text-gradient">Projects &amp; Blog</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-2 max-w-xl">
              From multi-service AI platforms and enterprise backend architectures to pathfinding game algorithms.
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
              <Layers size={16} />
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
              <BookOpen size={16} />
              Technical Blog ({blogPosts.length})
            </button>
          </div>
        </div>

        {/* ── Sub-category Filter (For Projects view) ── */}
        {activeTab === "projects" && (
          <div className="flex flex-wrap gap-2 mb-10">
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
        )}

        {/* ── Content View ── */}
        <AnimatePresence mode="wait">
          {activeTab === "projects" ? (
            <motion.div
              key="projects-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isFeatured={project.isFeatured && idx === 0}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="blog-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
            >
              {blogPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// =============================================================================
// Project Card Sub-Component (Bento Grid Style)
// =============================================================================

interface ProjectCardProps {
  project: Project;
  isFeatured?: boolean;
}

function ProjectCard({ project, isFeatured = false }: ProjectCardProps) {
  const isGraduation = project.category === "graduation";

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/90 backdrop-blur-xl p-6 sm:p-8 transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-2xl hover:shadow-[var(--color-primary)]/15 ${
        isFeatured ? "md:col-span-2 lg:col-span-2" : "col-span-1"
      }`}
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`p-2.5 rounded-xl border ${
                isGraduation
                  ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
                  : project.category === "game"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
              }`}
            >
              {isGraduation ? <Cpu size={18} /> : <Code2 size={18} />}
            </span>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-primary-light)]">
              {project.category}
            </span>
          </div>

          {/* GitHub link button */}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="p-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-white hover:border-white/40 transition-colors"
            >
              <FaGithub size={18} />
            </a>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[var(--color-accent-light)] transition-all mb-3">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Long description for featured graduation project */}
        {isFeatured && project.longDescription && (
          <div className="mb-6 p-4 rounded-2xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] leading-relaxed font-mono">
            {project.longDescription}
          </div>
        )}
      </div>

      {/* Bottom Footer: Tech Stack Tags + Link */}
      <div className="space-y-4 pt-4 border-t border-[var(--color-border)]/60">
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-primary-light)] hover:text-[var(--color-accent-light)] transition-colors group/link"
          >
            <span>Explore Source Code</span>
            <ArrowRight
              size={13}
              className="transition-transform group-hover/link:translate-x-1"
            />
          </a>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// Blog Card Sub-Component
// =============================================================================

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/90 backdrop-blur-xl p-6 sm:p-8 transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-2xl hover:shadow-[var(--color-primary)]/15"
    >
      <div>
        <div className="flex items-center justify-between text-xs font-mono text-[var(--color-primary-light)] mb-4">
          <span>{formatDate(post.publishedAt)}</span>
          <span>{post.readTimeMinutes} min read</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-light)] transition-colors mb-3">
          {post.title}
        </h3>

        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
          {post.excerpt}
        </p>
      </div>

      <div className="pt-4 border-t border-[var(--color-border)]/60 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]"
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
    </a>
  );
}
