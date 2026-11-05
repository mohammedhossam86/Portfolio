"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Copy,
  Check,
  Send,
  Download,
  MapPin,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { FaLinkedinIn, FaGithub, FaGitlab } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "mohammedhossam343@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 overflow-hidden border-t border-[var(--color-border)]/50"
    >
      {/* ── Background Aura ── */}
      <div
        className="absolute bottom-0 right-1/4 w-[600px] h-[350px] rounded-full pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-primary), var(--color-accent), transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary-light)] text-xs font-mono uppercase tracking-wider mb-3">
            <Mail size={13} />
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--color-text-primary)]">
            Let&apos;s Build Something <span className="text-gradient">Extraordinary</span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-3 font-normal max-w-xl mx-auto">
            Whether you need a scalable backend architecture, an algorithmic problem solver, or someone to evaluate frontier AI models — my inbox is always open.
          </p>
        </motion.div>

        {/* ── Contact Hero Card (Docks into place with soft scale) ── */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto rounded-3xl border border-orange-200/80 dark:border-zinc-800 bg-white/95 dark:bg-[#0c0c10]/95 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl"
        >
          {/* Status Badge */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-orange-200/60 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for Full-Time &amp; Freelance Roles</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-stone-500 dark:text-zinc-400">
              <MapPin size={13} className="text-rose-400" />
              <span>Cairo, Egypt</span>
            </div>
          </div>

          {/* Email Copy Box */}
          <div className="flex flex-col sm:flex-row items-center gap-3 p-2 rounded-2xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] mb-6">
            <div className="flex-1 flex items-center gap-3 px-3 py-2 w-full text-[var(--color-text-primary)] font-mono text-sm sm:text-base select-all overflow-hidden text-ellipsis">
              <Mail size={18} className="text-[var(--color-primary)] shrink-0" />
              <span className="truncate">{email}</span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-bg-secondary)] hover:border-[var(--color-primary)] active:scale-95 text-[var(--color-text-primary)] text-xs font-semibold font-mono transition-all duration-150 border border-[var(--color-border)] shadow-xs"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-500" />
                  <span className="text-emerald-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Direct Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <a
              href={`mailto:${email}?subject=Collaboration%20Inquiry%20from%20Portfolio`}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-stone-900 text-white dark:bg-white dark:text-black font-semibold text-sm font-mono transition-all duration-200 shadow-lg active:scale-95"
            >
              <Send size={16} />
              Send Direct Email
            </a>
            <a
              href="/cv.pdf"
              download="Mohammed_Hossam_CV.pdf"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-stone-100 dark:bg-zinc-900 border border-stone-300 dark:border-zinc-800 hover:border-stone-500 dark:hover:border-zinc-600 text-stone-900 dark:text-white font-semibold text-sm font-mono transition-all duration-200 active:scale-95 shadow-xs"
            >
              <Download size={16} />
              Download Resume
            </a>
          </div>

          {/* Social Links Row */}
          <div className="pt-6 border-t border-orange-200/60 dark:border-zinc-800 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-stone-600 dark:text-zinc-400">
            <a
              href="https://www.linkedin.com/in/mohammed-hossam-6705a1302/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#0A66C2] transition-colors"
            >
              <FaLinkedinIn size={14} />
              <span>LinkedIn</span>
              <ArrowUpRight size={11} className="opacity-60" />
            </a>
            <span className="text-stone-300 dark:text-zinc-700">•</span>
            <a
              href="https://github.com/mohammedhossam86"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              <FaGithub size={14} />
              <span>GitHub</span>
              <ArrowUpRight size={11} className="opacity-60" />
            </a>
            <span className="text-stone-300 dark:text-zinc-700">•</span>
            <a
              href="https://gitlab.com/mohammedhossam86"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#FC6D26] transition-colors"
            >
              <FaGitlab size={14} />
              <span>GitLab</span>
              <ArrowUpRight size={11} className="opacity-60" />
            </a>
            <span className="text-stone-300 dark:text-zinc-700">•</span>
            <a
              href="https://leetcode.com/u/mohammedhossam86/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#FFA116] transition-colors"
            >
              <SiLeetcode size={14} />
              <span>LeetCode</span>
              <ArrowUpRight size={11} className="opacity-60" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

