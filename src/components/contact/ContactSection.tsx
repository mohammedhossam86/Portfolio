"use client";

import { useState } from "react";
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
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary-light)] text-xs font-mono uppercase tracking-wider mb-3">
            <Mail size={13} />
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Let&apos;s Build Something <span className="text-gradient">Extraordinary</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 font-normal max-w-xl mx-auto">
            Whether you need a scalable backend architecture, an algorithmic problem solver, or someone to evaluate frontier AI models — my inbox is always open.
          </p>
        </div>

        {/* ── Contact Hero Card ── */}
        <div className="max-w-2xl mx-auto rounded-3xl border border-slate-800 bg-[#0a0d16]/95 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl">
          {/* Status Badge */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for Full-Time &amp; Freelance Roles</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <MapPin size={13} className="text-rose-400" />
              <span>Cairo, Egypt</span>
            </div>
          </div>

          {/* Email Copy Box */}
          <div className="flex flex-col sm:flex-row items-center gap-3 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6">
            <div className="flex-1 flex items-center gap-3 px-3 py-2 w-full text-slate-300 font-mono text-sm sm:text-base select-all overflow-hidden text-ellipsis">
              <Mail size={18} className="text-[var(--color-primary-light)] shrink-0" />
              <span className="truncate">{email}</span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white text-xs font-semibold font-mono transition-all duration-150 border border-slate-700"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span>Copied!</span>
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
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-[var(--color-primary)]/25 active:scale-95"
            >
              <Send size={16} />
              Send Direct Email
            </a>
            <a
              href="/cv.pdf"
              download="Mohammed_Hossam_CV.pdf"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 font-semibold text-sm transition-all duration-200 active:scale-95"
            >
              <Download size={16} />
              Download Resume
            </a>
          </div>

          {/* Social Links Row */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
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
            <span className="text-slate-700">•</span>
            <a
              href="https://github.com/mohammedhossam86"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <FaGithub size={14} />
              <span>GitHub</span>
              <ArrowUpRight size={11} className="opacity-60" />
            </a>
            <span className="text-slate-700">•</span>
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
            <span className="text-slate-700">•</span>
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
        </div>
      </div>
    </section>
  );
}
