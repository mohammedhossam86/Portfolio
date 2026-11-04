import { JourneyMilestone } from "@/types";

// ─── Journey Milestones (Chronological) ──────────────────────────────────────
// Each milestone = a "station" where the car stops on the timeline.
// Ordered chronologically from college start to current career.

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "college-start",
    date: "2022-09",
    title: "Started Computer Science Degree",
    description:
      "First day at university — the beginning of an incredible journey into software engineering.",
    category: "education",
    tags: ["University", "CS"],
  },
  {
    id: "ecpc-qual-2023",
    date: "2023-10",
    title: "ECPC Qualifications 2023",
    description:
      "First competitive programming contest — ECPC Qualifications. Got hooked on problem solving and algorithmic thinking.",
    category: "achievement",
    imageUrl: "/images/journey/ECPCQ2023.jpeg",
    tags: ["ECPC", "Competitive Programming"],
  },
  {
    id: "ecpc-qual-2024",
    date: "2024-10",
    title: "ECPC Qualifications 2024",
    description:
      "Came back stronger for the second year of ECPC Qualifications. Growth in problem solving skills was real.",
    category: "achievement",
    imageUrl: "/images/journey/ECPCQ2024.jpeg",
    tags: ["ECPC", "Competitive Programming"],
  },
  {
    id: "ecpc-qual-2025",
    date: "2025-10",
    title: "ECPC Qualifications 2025",
    description:
      "Third year at ECPC — each year the problems get harder, and so do we.",
    category: "achievement",
    imageUrl: "/images/journey/ECPCQ2025.jpeg",
    tags: ["ECPC", "Competitive Programming"],
  },
  {
    id: "ecpc-2025",
    date: "2025-11",
    title: "ECPC 2025 Finals",
    description:
      "Made it to the ECPC Finals! Competed with the best teams in Egypt.",
    category: "achievement",
    imageUrl: "/images/journey/ECPC2025.jpeg",
    tags: ["ECPC", "Finals", "Competitive Programming"],
  },
  {
    id: "graduation",
    date: "2026-06",
    title: "Graduated! 🎓",
    description:
      "Graduated with a Computer Science degree. Four years of grinding, learning, and building — all worth it.",
    category: "education",
    imageUrl: "/images/journey/gradiuation.jpeg",
    tags: ["Graduation", "Milestone"],
  },
  {
    id: "current-role",
    date: "2026-08",
    title: "Software Engineer",
    description:
      "Started my professional career as a Software Engineer, continuing to build, learn, and contribute.",
    category: "work",
    tags: ["Career", "Software Engineering"],
  },
  {
    id: "champions-coach",
    date: "2026-10",
    title: "3rd Place — Champions Coach Code Challenge 🏆",
    description:
      "Won 3rd place in the Champions Coach Code Challenge! Hard work and team synergy paid off.",
    category: "achievement",
    imageUrl: "/images/journey/3rdplacechampionscoachcodechalleng.jpeg",
    tags: ["Competition", "Award", "Problem Solving"],
  },
];
