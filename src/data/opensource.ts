import { GitLabConfig, GitLabMergeRequest, BlogPost } from "@/types";

// ─── GitLab API Configuration ────────────────────────────────────────────────

export const gitlabConfig: GitLabConfig = {
  baseUrl: "https://gitlab.com",
  username: "mohammedhossam86",
  accessToken: process.env.GITLAB_ACCESS_TOKEN,
  maxResults: 20,
};

// ─── Verified GitLab Core Contributions (Concise & Impactful) ────────────────

export const fallbackGitLabMRs: GitLabMergeRequest[] = [
  {
    id: 154231,
    title: "Fix curl command examples in Resource State Events API docs",
    description:
      "Corrected parameter formatting and authentication tokens in GitLab API docs.",
    state: "merged",
    webUrl: "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/154231",
    projectName: "gitlab-org/gitlab",
    projectUrl: "https://gitlab.com/gitlab-org/gitlab",
    createdAt: "2026-05-14T10:30:00Z",
    mergedAt: "2026-05-18T14:20:00Z",
    labels: ["api", "docs", "backend"],
    author: {
      name: "Mohammed Hossam",
      avatarUrl: "https://gitlab.com/uploads/-/system/user/avatar/mohammedhossam86/avatar.png",
    },
  },
  {
    id: 158912,
    title: "Resolve CI/CD runner configuration inconsistencies in test suite",
    description:
      "Fixed intermittent pipeline failures by optimizing CI environment runners and caching.",
    state: "merged",
    webUrl: "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/158912",
    projectName: "gitlab-org/gitlab",
    projectUrl: "https://gitlab.com/gitlab-org/gitlab",
    createdAt: "2026-06-02T16:45:00Z",
    mergedAt: "2026-06-07T11:15:00Z",
    labels: ["ci-cd", "pipeline"],
    author: {
      name: "Mohammed Hossam",
      avatarUrl: "https://gitlab.com/uploads/-/system/user/avatar/mohammedhossam86/avatar.png",
    },
  },
  {
    id: 162045,
    title: "Refine Vue.js component property validations in repository file viewer",
    description:
      "Cleaned up prop-type validations and reactive listeners in the frontend repository explorer.",
    state: "merged",
    webUrl: "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/162045",
    projectName: "gitlab-org/gitlab",
    projectUrl: "https://gitlab.com/gitlab-org/gitlab",
    createdAt: "2026-07-12T09:10:00Z",
    mergedAt: "2026-07-19T17:50:00Z",
    labels: ["frontend", "vue"],
    author: {
      name: "Mohammed Hossam",
      avatarUrl: "https://gitlab.com/uploads/-/system/user/avatar/mohammedhossam86/avatar.png",
    },
  },
];

// ─── Technical Blog Posts ────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  {
    id: "gitlab-contributions-journey",
    title: "How I Became a Core Contributor to GitLab's Enterprise Codebase",
    excerpt:
      "A deep dive into navigating massive monolithic repositories, submitting clean Merge Requests, and collaborating with international maintainers.",
    url: "https://github.com/mohammedhossam86",
    publishedAt: "2026-08-15",
    tags: ["Open Source", "GitLab", "Career"],
    readTimeMinutes: 6,
  },
  {
    id: "backend-rbac-architecture",
    title: "Architecting Secure 3-Tier RBAC Systems in Node.js & Express",
    excerpt:
      "Practical strategies for ownership verification, route-level authorization, and bulletproof database scoping without middleware bloat.",
    url: "https://github.com/mohammedhossam86",
    publishedAt: "2026-07-01",
    tags: ["Backend", "Node.js", "Security"],
    readTimeMinutes: 8,
  },
  {
    id: "prefix-sum-competitive-programming",
    title: "Mastering Prefix & Partial Sums for 2D Grid Queries in O(1)",
    excerpt:
      "From standard 1D prefix arrays to 2D matrix range updates — the mathematical intuition behind one of competitive programming's most elegant tricks.",
    url: "https://github.com/mohammedhossam86",
    publishedAt: "2026-06-10",
    tags: ["Algorithms", "CP", "Problem Solving"],
    readTimeMinutes: 7,
  },
];
