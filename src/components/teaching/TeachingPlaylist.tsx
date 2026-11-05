"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { teachingSessions } from "@/data/teaching";
import { TeachingSession } from "@/types";
import { getYouTubeThumbnail, getYouTubeEmbedUrl } from "@/lib/utils";
import {
  GraduationCap,
  Play,
  Clock,
  BookOpen,
  CheckCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function TeachingPlaylist() {
  const [activeSessionId, setActiveSessionId] = useState<string>(
    teachingSessions[0]?.id || ""
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activeSession =
    teachingSessions.find((s) => s.id === activeSessionId) ||
    teachingSessions[0];

  const handleSelectSession = (session: TeachingSession) => {
    setActiveSessionId(session.id);
    setIsPlaying(false); // Reset to thumbnail until user clicks play
  };

  return (
    <section id="teaching" className="relative py-24 sm:py-32 overflow-hidden border-t border-[var(--color-border)]/50">
      {/* ── Background Glow ── */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-primary), var(--color-accent), transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary-light)] text-xs font-mono uppercase tracking-wider mb-2">
              <GraduationCap size={14} />
              Instruction &amp; Mentorship
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)]">
              Teaching <span className="text-gradient">Playlist</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-2 max-w-xl">
              Recorded problem-solving sessions covering foundational and advanced algorithmic techniques for competitive programmers.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-4 py-2 rounded-xl border border-[var(--color-border)]">
            <BookOpen size={14} className="text-[var(--color-primary-light)]" />
            <span>4 In-Depth Sessions • 5.5+ Hours</span>
          </div>
        </motion.div>

        {/* ── Player & Playlist Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Active Video Player Frame (8 Cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 space-y-5"
          >
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-[var(--color-border)] bg-black/80 shadow-2xl">
              {isPlaying ? (
                <iframe
                  src={`${getYouTubeEmbedUrl(activeSession.youtubeVideoId)}?autoplay=1&rel=0`}
                  title={activeSession.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                /* Lite Embed: Thumbnail preview with glowing play trigger */
                <div
                  onClick={() => setIsPlaying(true)}
                  className="group relative w-full h-full cursor-pointer overflow-hidden flex items-center justify-center select-none"
                >
                  <Image
                    src={getYouTubeThumbnail(activeSession.youtubeVideoId, "hqdefault")}
                    alt={activeSession.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 850px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-80"
                    unoptimized
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

                  {/* Pulsing Glowing Play Button */}
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shadow-2xl shadow-[var(--color-primary)]/50 group-hover:scale-110 group-hover:bg-[var(--color-primary-light)] transition-all duration-300">
                      <Play size={32} className="ml-1 fill-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-white/90 font-mono tracking-wider">
                      Click to Watch Session
                    </span>
                  </div>

                  {/* Video length tag */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-mono">
                    <Clock size={12} />
                    <span>{activeSession.duration}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Active Video Info */}
            <div className="p-6 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/90 backdrop-blur-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--color-primary-light)]">
                <span>Session {String(activeSession.order).padStart(2, "0")} / 04</span>
                <a
                  href={`https://youtu.be/${activeSession.youtubeVideoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[var(--color-text-muted)] hover:text-white transition-colors"
                >
                  <span>Open on YouTube</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">
                {activeSession.title}
              </h3>

              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {activeSession.description}
              </p>

              {/* Topics pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeSession.topics.map((topic) => (
                  <span
                    key={topic}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Playlist Queue Sidebar (4 Cols, Slides in from Right) ── */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-3"
          >
            <div className="p-4 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
                Playlist Curriculum
              </span>
              <span className="text-xs font-mono text-[var(--color-primary-light)] font-bold">
                {teachingSessions.length} Videos
              </span>
            </div>

            <div className="space-y-3">
              {teachingSessions.map((session, sIdx) => {
                const isCurrent = session.id === activeSession.id;

                return (
                  <motion.button
                    key={session.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: sIdx * 0.06 }}
                    onClick={() => handleSelectSession(session)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3.5 group ${
                      isCurrent
                        ? "border-[var(--color-primary)] bg-[var(--color-bg-secondary)] shadow-lg shadow-[var(--color-primary)]/15"
                        : "border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-secondary)]"
                    }`}
                  >
                    {/* Thumbnail preview */}
                    <div className="relative h-16 w-24 shrink-0 rounded-xl overflow-hidden bg-black/60 border border-[var(--color-border)]">
                      <Image
                        src={getYouTubeThumbnail(session.youtubeVideoId, "default")}
                        alt={session.title}
                        fill
                        sizes="96px"
                        className="object-cover"
                        unoptimized
                      />
                      {isCurrent && (
                        <div className="absolute inset-0 bg-[var(--color-primary)]/40 flex items-center justify-center">
                          <Play size={16} className="fill-white text-white" />
                        </div>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[11px] font-mono mb-1">
                        <span
                          className={
                            isCurrent
                              ? "text-[var(--color-primary-light)] font-bold"
                              : "text-[var(--color-text-muted)]"
                          }
                        >
                          Part {session.order}
                        </span>
                        <span className="text-[var(--color-text-muted)]">• {session.duration}</span>
                      </div>
                      <h4
                        className={`text-sm font-bold line-clamp-1 transition-colors ${
                          isCurrent
                            ? "text-white"
                            : "text-[var(--color-text-primary)] group-hover:text-white"
                        }`}
                      >
                        {session.title}
                      </h4>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

