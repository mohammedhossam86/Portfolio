import { SiteMetadata, NavItem, SocialLink } from "@/types";

// ─── Site Metadata (used in layout.tsx for SEO) ──────────────────────────────

export const siteMetadata: SiteMetadata = {
  title: "Mohammed Hossam — Backend & AI Engineer",
  description:
    "Backend Engineer & AI Specialist specializing in high-performance distributed systems, microservices, 37+ GitLab Core MRs, and RLHF AI Model Evaluation. 4× ECPC Contestant.",
  url: "https://mohammedhossam.dev",
  ogImage: "/images/og-image.png",
  author: "Mohammed Hossam",
};

// ─── Navigation Items ────────────────────────────────────────────────────────

export const navItems: NavItem[] = [
  { label: "About", href: "#about", icon: "User" },
  { label: "Skills", href: "#skills", icon: "Code2" },
  { label: "Experience", href: "#journey", icon: "Route" },
  { label: "Projects", href: "#projects", icon: "FolderKanban" },
  { label: "Open Source", href: "#opensource", icon: "GitMerge" },
  { label: "Arcade", href: "#arcade", icon: "Gamepad2" },
  { label: "Teaching", href: "#teaching", icon: "GraduationCap" },
  { label: "Contact", href: "#contact", icon: "Mail" },
];

// ─── Social Links (Floating Dock) ────────────────────────────────────────────

export const socialLinks: SocialLink[] = [
  {
    platform: "github",
    url: "https://github.com/mohammedhossam86",
    label: "GitHub Profile",
  },
  {
    platform: "gitlab",
    url: "https://gitlab.com/mohammedhossam86",
    label: "GitLab Profile",
  },
  {
    platform: "linkedin",
    url: "https://www.linkedin.com/in/mohammed-hossam-6705a1302/",
    label: "LinkedIn Profile",
  },
  {
    platform: "leetcode",
    url: "https://leetcode.com/u/mohammedhossam86/", // LeetCode profile
    label: "LeetCode Profile",
  },
  {
    platform: "email",
    url: "mailto:mohammedhossam343@gmail.com",
    label: "Send Email",
  },
  {
    platform: "cv",
    url: "/cv.pdf",
    label: "Download CV",
  },
];
