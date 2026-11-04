import { JourneyMilestone } from "@/types";

// ─── Journey Milestones (Chronological) ──────────────────────────────────────
// Each milestone = a station where the car stops on the timeline.
// Milestones with multiple images can be clicked to open the interactive gallery modal.

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "college-start",
    date: "2022-09",
    title: "Started Computer Science Degree",
    description:
      "First day at university — the beginning of an incredible journey into software engineering, algorithms, and deep backend systems.",
    category: "education",
    tags: ["University", "CS", "Beginnings"],
  },
  {
    id: "ai-trainer",
    date: "2023-02 - Present",
    title: "AI Trainer & Evaluator — Outlier & Alignerr",
    description:
      "Working as a Freelance AI Trainer and Evaluator helping train and fine-tune frontier Large Language Models (LLMs) via RLHF. Designing complex algorithmic coding tasks in Python and C++, evaluating model reasoning steps, and assessing software correctness.",
    category: "work",
    tags: ["Outlier", "Alignerr", "AI Training", "RLHF", "Code Quality"],
  },
  {
    id: "ecpc-qual-2023",
    date: "2023-10",
    title: "ECPC Qualifications 2023",
    description:
      "First competitive programming contest — ECPC Qualifications. Got hooked on problem solving, data structures, and competitive programming.",
    category: "achievement",
    imageUrl: "/images/journey/ECPCQ2023.jpeg",
    images: ["/images/journey/ECPCQ2023.jpeg"],
    tags: ["ECPC", "Competitive Programming"],
  },
  {
    id: "ecpc-qual-2024",
    date: "2024-10",
    title: "ECPC Qualifications 2024",
    description:
      "Returned for the second year of ECPC Qualifications with sharper algorithmic intuition, tackling complex graphs and dynamic programming problems.",
    category: "achievement",
    imageUrl: "/images/journey/ECPCQ2024.jpeg",
    images: ["/images/journey/ECPCQ2024.jpeg"],
    tags: ["ECPC", "Competitive Programming"],
  },
  {
    id: "ecpc-qual-2025",
    date: "2025-10",
    title: "ECPC Qualifications 2025",
    description:
      "Third year competing at ECPC Qualifications. Strong problem solving performance qualified the team to the Egyptian national finals.",
    category: "achievement",
    imageUrl: "/images/journey/ECPCQ2025.jpeg",
    images: ["/images/journey/ECPCQ2025.jpeg"],
    tags: ["ECPC", "Competitive Programming"],
  },
  {
    id: "ecpc-2025",
    date: "2025-11",
    title: "ECPC 2025 Finals",
    description:
      "Reached the prestigious ECPC Egyptian Collegiate Programming Contest Finals! Competed alongside the top university teams in Egypt under coach mentorship.",
    category: "achievement",
    imageUrl: "/images/journey/ECPC2025.jpeg",
    images: [
      "/images/journey/ECPC2025.jpeg",
      "/images/journey/ECPC2025witcoac.jpeg",
    ],
    tags: ["ECPC", "Finals", "Competitive Programming"],
  },
  {
    id: "graduation",
    date: "2026-06",
    title: "Graduated! 🎓",
    description:
      "Graduated with a Computer Science degree. Four years of grinding, building real-world systems, AI healthcare projects, and competitive programming.",
    category: "education",
    imageUrl: "/images/journey/gradiuation.jpeg",
    images: [
      "/images/journey/gradiuation.jpeg",
      "/images/journey/gradiuation1.jpeg",
      "/images/journey/gradiuation2.jpeg",
      "/images/journey/gradiuation3.jpeg",
    ],
    tags: ["Graduation", "Milestone", "CS Degree"],
  },
  {
    id: "current-role",
    date: "2026-08",
    title: "Software Engineer",
    description:
      "Started my professional career as a Software Engineer, building robust backend architectures, distributed services, and open source tools.",
    category: "work",
    tags: ["Career", "Software Engineering"],
  },
  {
    id: "champions-coach",
    date: "2026-10",
    title: "3rd Place — Champions Coach Code Challenge 🏆",
    description:
      "Honored as a Coach for kids and young students in the Champions Coach Code Challenge! Mentored and guided young brilliant minds through algorithmic problem solving and coding challenges, proudly leading the team to 3rd Place!",
    category: "achievement",
    imageUrl: "/images/journey/3rdplacechampionscoachcodechalleng.jpeg",
    images: [
      "/images/journey/3rdplacechampionscoachcodechalleng.jpeg",
      "/images/journey/3rdplacechampionscoachcodechalleng1.jpeg",
      "/images/journey/3rdplacechampionscoachcodechalleng2.jpeg",
    ],
    tags: ["Kids Coach", "Mentorship", "Award", "3rd Place", "Code Challenge"],
  },
];
