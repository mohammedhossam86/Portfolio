import { TeachingSession } from "@/types";

// ─── Teaching Sessions Playlist ──────────────────────────────────────────────
// 4 programming sessions you taught, hosted on YouTube.
// The custom player reads this array to build the playlist UI.

export const teachingSessions: TeachingSession[] = [
  {
    id: "loops-arrays",
    title: "Loops & Arrays",
    description:
      "Introduction to loops and arrays — the building blocks of every algorithm. Covers for/while loops, array traversal, and common patterns.",
    youtubeVideoId: "7Uip7kZGsj8",
    duration: "1:30:00",
    order: 1,
    topics: ["Loops", "Arrays", "Iteration", "Basics"],
  },
  {
    id: "loops-in-depth",
    title: "Loops in Depth",
    description:
      "Deep dive into nested loops, loop optimizations, break/continue, and solving classic loop-based problems.",
    youtubeVideoId: "rjVXsxZ9UtE",
    duration: "1:45:00",
    order: 2,
    topics: ["Nested Loops", "Optimization", "Patterns"],
  },
  {
    id: "strings-loops",
    title: "Strings & Loops in Depth",
    description:
      "Combining string manipulation with loop techniques. Covers string traversal, pattern matching, and character operations.",
    youtubeVideoId: "eJ7P1akgHno",
    duration: "1:20:00",
    order: 3,
    topics: ["Strings", "Loops", "Pattern Matching", "Characters"],
  },
  {
    id: "prefix-partial-sum",
    title: "Prefix & Partial Sum",
    description:
      "The powerful prefix sum technique for range queries. From brute force to O(1) queries — a must-know for competitive programming.",
    youtubeVideoId: "FHKLO5Kt7uw",
    duration: "1:15:00",
    order: 4,
    topics: ["Prefix Sum", "Partial Sum", "Range Queries", "Optimization"],
  },
];
