// =============================================================================
// Portfolio Data Schemas — Decoupled Data Model
// =============================================================================
// Every UI component reads from typed data files in /data/*.ts.
// The UI never hard-codes content; it maps over these structures instead.
// This enforces the Data-Driven UI principle (separation of content & logic).
// =============================================================================

// ─── Social & Contact ────────────────────────────────────────────────────────

export type SocialPlatform =
  | "github"
  | "gitlab"
  | "linkedin"
  | "leetcode"
  | "email"
  | "cv";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label: string; // accessible aria-label, e.g. "GitHub Profile"
}

// ─── Hero Section ────────────────────────────────────────────────────────────

export interface HeroData {
  name: string;
  headline: string; // e.g. "Software Engineer"
  tagline: string; // one-liner description
  roles: string[]; // animated role badges, e.g. ["Backend Engineer", "Open Source Contributor"]
  stats: HeroStat[];
  resumeUrl: string;
  avatarUrl: string;
}

export interface HeroStat {
  label: string; // e.g. "GitHub Stars", "LeetCode Problems"
  value: string; // display value, e.g. "500+"
  icon?: string; // optional Lucide icon name
}

// ─── Journey / Timeline ──────────────────────────────────────────────────────

export type MilestoneCategory =
  | "education"
  | "internship"
  | "achievement"
  | "work"
  | "project"
  | "opensource";

export interface JourneyMilestone {
  id: string; // unique slug for scroll targeting
  date: string; // ISO date string or "YYYY-MM" for display
  title: string;
  description: string;
  category: MilestoneCategory;
  imageUrl?: string; // optional photo for the milestone
  link?: string; // optional external link
  tags?: string[]; // e.g. ["Backend", "Node.js"]
}

// ─── Projects ────────────────────────────────────────────────────────────────

export type ProjectCategory =
  | "graduation"
  | "backend"
  | "fullstack"
  | "robotics"
  | "game"
  | "tool"
  | "other";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  techStack: string[]; // e.g. ["Node.js", "Express", "MongoDB"]
  imageUrl: string;
  previewVideoUrl?: string; // short WebM/MP4 loop for hover preview
  liveUrl?: string;
  repoUrl?: string;
  isFeatured: boolean; // featured projects get larger cards in the grid
  date: string;
}

// ─── Blog Posts ──────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  url: string; // external link (Medium, Dev.to, etc.)
  coverImageUrl?: string;
  publishedAt: string; // ISO date
  tags: string[];
  readTimeMinutes: number;
}

// ─── Open Source / GitLab MRs ────────────────────────────────────────────────

export type MergeRequestState = "merged" | "opened" | "closed";

export interface GitLabMergeRequest {
  id: number;
  title: string;
  description: string;
  state: MergeRequestState;
  webUrl: string;
  projectName: string; // repo display name
  projectUrl: string;
  createdAt: string; // ISO date from API
  mergedAt?: string; // only if merged
  labels: string[];
  author: {
    name: string;
    avatarUrl: string;
  };
}

// Config for the GitLab API fetcher
export interface GitLabConfig {
  baseUrl: string; // e.g. "https://gitlab.com"
  username: string;
  accessToken?: string; // optional, for private repos or higher rate limits
  maxResults: number;
}

// ─── Teaching / Video Playlist ───────────────────────────────────────────────

export interface TeachingSession {
  id: string;
  title: string;
  description: string;
  youtubeVideoId: string; // just the ID, e.g. "dQw4w9WgXcQ"
  thumbnailUrl?: string; // fallback; we can generate from YouTube ID
  duration: string; // display string, e.g. "1:23:45"
  order: number; // playlist position
  topics: string[]; // e.g. ["Loops", "Arrays", "Problem Solving"]
}

// ─── Arcade / Games ──────────────────────────────────────────────────────────

export type GameType = "terminal" | "web" | "scratch" | "canvas";

export interface ArcadeGame {
  id: string;
  title: string;
  description: string;
  gameType: GameType;
  thumbnailUrl: string;
  // For "web" / "scratch" games: URL to embed in <iframe>
  embedUrl?: string;
  // For "terminal" games: the command or module to load in xterm.js
  terminalConfig?: {
    entryModule: string; // path to JS/WASM module
    startCommand?: string; // initial command to run
  };
  techStack: string[];
  isFeatured: boolean;
}

// ─── Achievements Gallery ────────────────────────────────────────────────────

export interface AchievementPhoto {
  id: string;
  src: string; // image path relative to /public
  alt: string; // accessible description
  caption?: string; // optional overlay text
  date?: string;
  category?: "college" | "work" | "competition" | "community";
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string; // anchor hash or route, e.g. "#journey"
  icon?: string; // optional Lucide icon name
}

// ─── Site Metadata ───────────────────────────────────────────────────────────

export interface SiteMetadata {
  title: string;
  description: string;
  url: string;
  ogImage: string;
  author: string;
  twitterHandle?: string;
}
