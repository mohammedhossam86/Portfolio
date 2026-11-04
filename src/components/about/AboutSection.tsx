"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { aboutData } from "@/data/about";
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
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary-light)] text-xs font-mono uppercase tracking-wider mb-3">
            <User size={13} />
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)]">
            Architecting Systems &amp; <span className="text-gradient">Training AI</span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-2 max-w-2xl">
            A look into my background, engineering philosophy, competitive programming grind, and work fine-tuning frontier AI models.
          </p>
        </div>

        {/* ── Main Layout: Profile Card + Bio Content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Profile Photo Card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-md">
              {/* Animated outer aura */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] opacity-30 blur-xl group-hover:opacity-50 transition duration-500" />

              <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-900/90 shadow-2xl p-3">
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-950">
                  <Image
                    src={aboutData.avatarUrl}
                    alt={aboutData.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-80" />

                  {/* Floating Location Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-slate-200">
                      <MapPin size={13} className="text-rose-400" />
                      {aboutData.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/90 backdrop-blur-md border border-emerald-500/40 text-emerald-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Open for Roles
                    </span>
                  </div>
                </div>

                {/* Name & Title Bar */}
                <div className="mt-4 px-2 pb-2">
                  <h3 className="text-xl font-bold text-white flex items-center justify-between">
                    <span>{aboutData.name}</span>
                    <span className="text-xs font-mono font-normal text-slate-400">Class of 2026</span>
                  </h3>
                  <p className="text-xs text-[var(--color-primary-light)] font-mono mt-1">
                    {aboutData.title}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
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
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Sparkles size={13} className="text-amber-400" />
                Key Highlights &amp; Credentials
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {aboutData.pills.map((pill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-medium hover:border-[var(--color-primary)]/50 hover:text-white transition-all shadow-sm"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              {aboutData.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-[#0c101a]/80 p-3.5 text-center shadow-inner"
                >
                  <div className="text-lg sm:text-xl font-extrabold text-white font-mono">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 uppercase font-mono tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/cv.pdf"
                download="Mohammed_Hossam_CV.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-[var(--color-primary)]/30 active:scale-95"
              >
                <Download size={16} />
                Download CV
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 font-semibold text-sm transition-all duration-200 active:scale-95"
              >
                <Mail size={16} />
                Let&apos;s Connect
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
