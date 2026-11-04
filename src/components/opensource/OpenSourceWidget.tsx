"use client";

import { useState, useEffect } from "react";
import { GitLabMergeRequest } from "@/types";
import { fallbackGitLabMRs } from "@/data/opensource";
import { formatDate } from "@/lib/utils";
import {
  GitMerge,
  GitPullRequest,
  CheckCircle2,
  ExternalLink,
  Award,
  Sparkles,
  ShieldCheck,
  Star,
} from "lucide-react";
import { FaGitlab } from "react-icons/fa";

export default function OpenSourceWidget() {
  const [mrs, setMrs] = useState<GitLabMergeRequest[]>(fallbackGitLabMRs);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Attempt dynamic fetch from server API route if available, or keep verified highlights
    async function loadMRs() {
      try {
        const res = await fetch("/api/gitlab");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setMrs(data);
          }
        }
      } catch {
        // Keep fallback data
      } finally {
        setLoading(false);
      }
    }
    loadMRs();
  }, []);

  return (
    <section id="opensource" className="relative py-24 sm:py-32 overflow-hidden border-t border-[var(--color-border)]/50">
      {/* ── Background Glow ── */}
      <div
        className="absolute bottom-10 left-1/4 w-[500px] h-[300px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, #FC6D26, var(--color-primary), transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FC6D26]/10 border border-[#FC6D26]/30 text-[#FC6D26] text-xs font-mono uppercase tracking-wider mb-2">
              <FaGitlab size={13} />
              Core Contributor
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)]">
              Open Source &amp; <span className="text-gradient">GitLab MRs</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-2 max-w-xl">
              Contributing directly to GitLab&apos;s core enterprise codebase (<code className="text-[#FC6D26] font-mono text-xs">gitlab-org/gitlab</code>) — fixing API bugs, CI/CD pipeline issues, and frontend components.
            </p>
          </div>

          {/* GitLab Profile Link Button */}
          <a
            href="https://gitlab.com/mohammedhossam86"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-[#FC6D26]/40 bg-[#FC6D26]/10 text-white hover:bg-[#FC6D26] hover:text-white transition-all duration-300 font-semibold text-sm shadow-lg shadow-[#FC6D26]/10 hover:shadow-[#FC6D26]/30 group"
          >
            <FaGitlab size={18} className="text-[#FC6D26] group-hover:text-white transition-colors" />
            <span>View GitLab Profile</span>
            <ExternalLink size={14} className="opacity-75" />
          </a>
        </div>

        {/* ── Key Highlights Badges ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#FC6D26]/10 text-[#FC6D26]">
              <ShieldCheck size={22} />
            </div>
            <div>
              <span className="text-xs text-[var(--color-text-muted)] font-mono block">Role</span>
              <span className="text-sm font-bold text-[var(--color-text-primary)]">
                Core Codebase Contributor
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
              <Award size={22} />
            </div>
            <div>
              <span className="text-xs text-[var(--color-text-muted)] font-mono block">Recognition</span>
              <span className="text-sm font-bold text-[var(--color-text-primary)]">
                GitLab Contributor Rewards
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <GitMerge size={22} />
            </div>
            <div>
              <span className="text-xs text-[var(--color-text-muted)] font-mono block">Status</span>
              <span className="text-sm font-bold text-[var(--color-text-primary)]">
                100% Production Merged
              </span>
            </div>
          </div>
        </div>

        {/* ── Merge Requests List ── */}
        <div className="space-y-4">
          {mrs.map((mr) => (
            <div
              key={mr.id}
              className="group p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/90 backdrop-blur-xl hover:border-[#FC6D26]/50 hover:shadow-xl hover:shadow-[#FC6D26]/10 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div className="space-y-2 flex-1">
                {/* Top status line */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 size={12} />
                    Merged
                  </span>

                  <span className="text-xs font-mono text-[var(--color-text-muted)]">
                    {mr.projectName} !{mr.id}
                  </span>

                  {mr.createdAt && (
                    <span className="text-xs font-mono text-[var(--color-text-muted)]">
                      • {formatDate(mr.createdAt)}
                    </span>
                  )}
                </div>

                {/* MR Title */}
                <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)] group-hover:text-white transition-colors">
                  {mr.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {mr.description}
                </p>

                {/* Labels */}
                {mr.labels && mr.labels.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {mr.labels.map((label) => (
                      <span
                        key={label}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                      >
                        ~{label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <a
                href={mr.webUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start md:self-center shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] text-xs font-mono font-semibold text-[var(--color-text-primary)] hover:border-[#FC6D26] hover:text-[#FC6D26] transition-colors"
              >
                <span>View on GitLab</span>
                <ExternalLink size={13} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
