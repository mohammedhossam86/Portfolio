import { SiteMetadata, NavItem, SocialLink } from "@/types";

// ─── Site Metadata (used in layout.tsx for SEO) ──────────────────────────────

export const siteMetadata: SiteMetadata = {
  title: "Hossam — Software Engineer",
  description:
    "Software Engineer specializing in Backend Engineering, Open Source, and Competitive Programming. Portfolio showcasing projects, contributions, and teaching.",
  url: "https://hossam.dev", // TODO: replace with actual domain
  ogImage: "/images/og-image.png",
  author: "Hossam",
};

// ─── Navigation Items ────────────────────────────────────────────────────────

export const navItems: NavItem[] = [
  { label: "Home", href: "#hero", icon: "Home" },
  { label: "Journey", href: "#journey", icon: "Route" },
  { label: "Projects", href: "#projects", icon: "FolderKanban" },
  { label: "Open Source", href: "#opensource", icon: "GitMerge" },
  { label: "Arcade", href: "#arcade", icon: "Gamepad2" },
  { label: "Teaching", href: "#teaching", icon: "GraduationCap" },
  { label: "Gallery", href: "#gallery", icon: "Images" },
];

// ─── Social Links (Floating Dock) ────────────────────────────────────────────

export const socialLinks: SocialLink[] = [
  {
    platform: "github",
    url: "https://github.com/hossam", // TODO: replace with actual URL
    label: "GitHub Profile",
  },
  {
    platform: "gitlab",
    url: "https://gitlab.com/hossam", // TODO: replace with actual URL
    label: "GitLab Profile",
  },
  {
    platform: "linkedin",
    url: "https://linkedin.com/in/hossam", // TODO: replace with actual URL
    label: "LinkedIn Profile",
  },
  {
    platform: "leetcode",
    url: "https://leetcode.com/hossam", // TODO: replace with actual URL
    label: "LeetCode Profile",
  },
  {
    platform: "email",
    url: "mailto:hossam@example.com", // TODO: replace with actual email
    label: "Send Email",
  },
  {
    platform: "cv",
    url: "/cv.pdf", // TODO: add actual CV file to /public
    label: "Download CV",
  },
];
