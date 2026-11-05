"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { GitLabMergeRequest } from "@/types";
import { fallbackGitLabMRs } from "@/data/opensource";
import { formatDate } from "@/lib/utils";
import {
  GitMerge,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Layers,
} from "lucide-react";
import { FaGitlab } from "react-icons/fa";

export default function OpenSourceWidget() {
  const [mrs, setMrs] = useState<GitLabMergeRequest[]>(fallbackGitLabMRs);
  const [isSectionCollapsed, setIsSectionCollapsed] = useState(false);
  const [filter, setFilter] = useState<"all" | "merged" | "closed">("all");
  const [visibleCount, setVisibleCount] = useState(8);
  const [expandedMrId, setExpandedMrId] = useState<number | null>(null);

  useEffect(() => {
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
      }
    }
    loadMRs();
  }, []);

  const toggleMrDetails = (id: number) => {
    setExpandedMrId((prev) => (prev === id ? null : id));
  };

  const filteredMrs = useMemo(() => {
    if (filter === "all") return mrs;
    return mrs.filter((m) => m.state === filter);
  }, [filter, mrs]);

  const displayedMrs = filteredMrs.slice(0, visibleCount);

  const mergedCount = useMemo(
    () => mrs.filter((m) => m.state === "merged").length,
    [mrs]
  );
  const closedCount = useMemo(
    () => mrs.filter((m) => m.state === "closed").length,
    [mrs]
  );

  return (
    <section
      id="opensource"
      className="relative py-20 sm:py-32 overflow-hidden border-t border-[var(--color-border)]/50"
    >
      {/* ── Background Glow ── */}
      <div
        className="absolute bottom-10 left-1/4 w-[500px] h-[300px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, #FC6D26, var(--color-primary), transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full overflow-hidden">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10"
        >
          <div className="max-w-xl min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FC6D26]/10 border border-[#FC6D26]/30 text-[#FC6D26] text-xs font-mono uppercase tracking-wider mb-2">
              <FaGitlab size={13} />
              Core Contributor
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] break-words">
              Open Source &amp; <span className="text-gradient">GitLab MRs</span>
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-2 break-words">
              All 37 verified merge requests authored by Mohammed Hossam for GitLab&apos;s core enterprise repository (<code className="text-[#FC6D26] font-mono text-xs">gitlab-org/gitlab</code>).
            </p>
          </div>

          {/* Action Row: Collapse Toggle + Profile Link */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsSectionCollapsed(!isSectionCollapsed)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-xs font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[#FC6D26] transition-colors shadow-xs"
            >
              <span>{isSectionCollapsed ? "Expand MRs" : "Collapse MRs"}</span>
              {isSectionCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>

            <a
              href="https://gitlab.com/mohammedhossam86"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#FC6D26]/40 bg-[#FC6D26]/10 text-stone-800 dark:text-white hover:bg-[#FC6D26] hover:text-white transition-all font-semibold text-xs shadow-md shadow-[#FC6D26]/10"
            >
              <FaGitlab size={16} className="text-[#FC6D26]" />
              <span>GitLab Profile ({mrs.length} MRs)</span>
              <ExternalLink size={12} className="opacity-75" />
            </a>
          </div>
        </motion.div>

        {/* ── Key Highlights Badges (Compact) ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8"
        >
          <div className="p-4 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-xl bg-[#FC6D26]/10 text-[#FC6D26] shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] text-[var(--color-text-muted)] font-mono block">Repository</span>
              <span className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)] truncate block">
                gitlab-org/gitlab
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
              <CheckCircle2 size={20} />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] text-[var(--color-text-muted)] font-mono block">Production Merged</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-400 truncate block">
                {mergedCount} Merged MRs
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
              <GitMerge size={20} />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] text-[var(--color-text-muted)] font-mono block">Total Lifetime MRs</span>
              <span className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)] truncate block">
                {mrs.length} Contributions
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Filter Tabs ── */}
        {!isSectionCollapsed && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <button
              onClick={() => {
                setFilter("all");
                setVisibleCount(8);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                filter === "all"
                  ? "bg-[#FC6D26] text-white font-bold shadow-md shadow-[#FC6D26]/20"
                  : "bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[#FC6D26]"
              }`}
            >
              All MRs ({mrs.length})
            </button>
            <button
              onClick={() => {
                setFilter("merged");
                setVisibleCount(8);
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                filter === "merged"
                  ? "bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20"
                  : "bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-emerald-500"
              }`}
            >
              <CheckCircle2 size={12} />
              Merged ({mergedCount})
            </button>
            <button
              onClick={() => {
                setFilter("closed");
                setVisibleCount(8);
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                filter === "closed"
                  ? "bg-slate-700 text-white font-bold shadow-md"
                  : "bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <XCircle size={12} />
              Closed / Archived ({closedCount})
            </button>
          </div>
        )}

        {/* ── Merge Requests List (Collapsible) ── */}
        {!isSectionCollapsed && (
          <div className="space-y-3.5 w-full">
            {displayedMrs.map((mr, mrIdx) => {
              const isCardExpanded = expandedMrId === mr.id;
              const isMerged = mr.state === "merged";

              return (
                <motion.div
                  key={mr.id}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.38, delay: (mrIdx % 8) * 0.05, ease: "easeOut" }}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/90 backdrop-blur-xl p-4 sm:p-5 transition-all duration-200 hover:border-[#FC6D26]/50 w-full overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full min-w-0">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      {/* Status + Date */}
                      <div className="flex flex-wrap items-center gap-2">
                        {isMerged ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <CheckCircle2 size={11} />
                            Merged
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                            <XCircle size={11} />
                            Closed
                          </span>
                        )}
                        <span className="text-[11px] font-mono text-slate-300 font-semibold">
                          {mr.projectName} !{mr.iid || mr.id}
                        </span>
                        {mr.createdAt && (
                          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                            • {formatDate(mr.createdAt)}
                          </span>
                        )}
                      </div>

                      {/* Title — Clean, Truncate / Wrap cleanly */}
                      <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)] break-words">
                        {mr.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-[var(--color-text-secondary)] break-words line-clamp-2">
                        {mr.description}
                      </p>
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-2 self-start sm:self-center shrink-0 pt-1 sm:pt-0">
                      <button
                        onClick={() => toggleMrDetails(mr.id)}
                        className="px-2.5 py-1.5 rounded-lg border border-orange-200 dark:border-slate-700 bg-orange-50 dark:bg-slate-900 text-[11px] font-mono text-stone-700 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white transition-colors"
                      >
                        {isCardExpanded ? "Less" : "Details"}
                      </button>

                      <a
                        href={mr.webUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-[11px] font-mono text-slate-200 hover:border-[#FC6D26] hover:text-[#FC6D26] transition-colors"
                      >
                        <span>View MR</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>

                  {/* Expanded Details View */}
                  {isCardExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {mr.labels &&
                          mr.labels.map((label) => (
                            <span
                              key={label}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400"
                            >
                              ~{label}
                            </span>
                          ))}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500">
                        {mr.mergedAt
                          ? `Merged: ${formatDate(mr.mergedAt)}`
                          : `Created: ${formatDate(mr.createdAt)}`}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Show More / Show All Pagination Control */}
            {filteredMrs.length > visibleCount && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setVisibleCount((prev) => Math.min(prev + 10, filteredMrs.length))}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[#FC6D26] text-xs font-mono text-[var(--color-text-primary)] transition-all shadow-md hover:shadow-[#FC6D26]/10"
                >
                  <Layers size={13} />
                  <span>Show More ({filteredMrs.length - visibleCount} remaining)</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
