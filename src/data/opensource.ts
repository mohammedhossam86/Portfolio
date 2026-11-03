import { GitLabConfig } from "@/types";

// ─── GitLab API Configuration ────────────────────────────────────────────────
// Used by the server-side fetcher to pull your Merge Requests.
// Access token is optional but recommended for higher rate limits.

export const gitlabConfig: GitLabConfig = {
  baseUrl: "https://gitlab.com",
  username: "hossam", // TODO: replace with your actual GitLab username
  accessToken: process.env.GITLAB_ACCESS_TOKEN, // set in .env.local
  maxResults: 20,
};

// ─── Blog Posts ──────────────────────────────────────────────────────────────
// Add your blog posts here. These can link to Medium, Dev.to, Hashnode, etc.

import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  // TODO: Add your real blog posts
  // {
  //   id: "my-first-blog",
  //   title: "How I Got Into Open Source",
  //   excerpt: "My journey from student to open source contributor...",
  //   url: "https://medium.com/@hossam/my-first-blog",
  //   publishedAt: "2025-03-15",
  //   tags: ["Open Source", "Career"],
  //   readTimeMinutes: 5,
  // },
];

