"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { aboutData } from "@/data/about";
import { DiscoveryAcademyIcon } from "@/components/ui/BrandIcons";
import {
  User,
  MapPin,
  Sparkles,
  Download,
  Mail,
  Award,
  CheckCircle2,
  Code2,
  Cpu,
  BrainCircuit,
} from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 overflow-hidden border-t border-[var(--color-border)]/50"
    >
      {/* ── Background Glow ── */}
      <div
        className="absolute top-1/2 -left-40 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-primary), var(--color-accent), transparent 70%)",
          filter: "blur(110px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 text-stone-700 dark:text-zinc-300 text-xs font-mono uppercase tracking-wider mb-3">
            <User size={13} />
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)]">
            Software &amp; <span className="text-gradient">Backend Engineer</span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-2 max-w-2xl">
            Building reliable, high-concurrency distributed systems, scalable APIs, and solving non-trivial algorithmic problems.
          </p>
        </motion.div>

        {/* ── Main Layout: Profile Card + Bio Content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Photo Card (Glides in from left and settles into place) */}
          <motion.div
            initial={{ opacity: 0, x: -45, rotate: -1.5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <div className="relative group rounded-3xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-xl transition-all duration-300 hover:border-[var(--color-primary)]">
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-900">
                <Image
                  src={aboutData.avatarUrl}
                  alt={aboutData.name}
                  fill
                  priority
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-mono">
                    <MapPin size={12} className="text-rose-400" />
                    {aboutData.location}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/30 text-emerald-300 backdrop-blur-md border border-emerald-500/40 font-mono text-[11px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Open for Roles
                  </span>
                </div>
              </div>

              {/* Card Meta Footer */}
              <div className="p-5 border-t border-[var(--color-border)] bg-[var(--color-bg-tertiary)]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-[var(--color-text-primary)]">
                      {aboutData.name}
                    </h3>
                    <p className="text-xs text-[var(--color-primary-light)] font-mono mt-0.5">
                      {aboutData.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                      Class of 2026
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative + Key Credentials (Glides in from right and docks) */}
          <motion.div
            initial={{ opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Bio Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)] font-normal">
              {aboutData.bio.map((paragraph, idx) => (
                <p key={idx} className="tracking-wide">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Credential Pills */}
            <div className="pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-3 flex items-center gap-2">
                <Sparkles size={13} className="text-amber-500" />
                Key Highlights &amp; Credentials
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {aboutData.pills.map((pill, idx) => {
                  const isAiTrainer = pill.includes("Outlier & Alignerr");
                  const isDiscovery = pill.includes("Discovery Academy");

                  return (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: idx * 0.05 }}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] font-medium hover:border-[var(--color-primary)] hover:text-[var(--color-text-primary)] transition-all shadow-sm"
                    >
                      {isAiTrainer ? (
                        <span>Outlier &amp; Alignerr AI Trainer (2023 - Present)</span>
                      ) : isDiscovery ? (
                        <>
                          <DiscoveryAcademyIcon className="w-4 h-4" variant="round" />
                          <span>STEM &amp; Robotics Instructor — Discovery Academy</span>
                        </>
                      ) : (
                        pill
                      )}
                    </motion.span>
                  );
                })}
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              {aboutData.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + idx * 0.06 }}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-3.5 text-center shadow-md transition-all hover:border-[var(--color-primary)]"
                >
                  <div className="text-lg sm:text-xl font-extrabold text-[var(--color-primary)] font-mono">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-[var(--color-text-secondary)] mt-1 uppercase font-mono tracking-wider font-semibold">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/cv.pdf"
                download="Mohammed_Hossam_CV.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white dark:bg-white dark:text-black hover:bg-stone-800 dark:hover:bg-zinc-200 font-semibold text-sm font-mono transition-all duration-200 shadow-md active:scale-95"
              >
                <Download size={16} />
                Download CV
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-300 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 text-stone-800 dark:text-zinc-200 hover:border-stone-500 dark:hover:border-zinc-600 font-semibold text-sm font-mono transition-all duration-200 active:scale-95"
              >
                <Mail size={16} />
                Let&apos;s Connect
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
