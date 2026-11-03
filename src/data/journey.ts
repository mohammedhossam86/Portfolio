import { JourneyMilestone } from "@/types";

// ─── Journey Milestones (Chronological) ──────────────────────────────────────
// Add your real milestones here. The car timeline reads this array in order.
// Each milestone = a "station" where the car stops.

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "college-start",
    date: "2022-09",
    title: "Started Computer Science Degree",
    description:
      "First day at university — the beginning of an incredible journey into software engineering.",
    category: "education",
    imageUrl: "/images/journey/college-start.jpg",
    tags: ["University", "CS"],
  },
  {
    id: "first-competitive",
    date: "2023-01",
    title: "First Competitive Programming Contest",
    description:
      "Competed in my first ICPC-style contest. Got hooked on problem solving and algorithmic thinking.",
    category: "achievement",
    imageUrl: "/images/journey/first-contest.jpg",
    tags: ["ICPC", "Problem Solving"],
  },
  {
    id: "robotics-instructor",
    date: "2023-06",
    title: "STEM & Robotics Instructor",
    description:
      "Started teaching robotics and programming to younger students. Discovered a passion for mentoring.",
    category: "work",
    imageUrl: "/images/journey/robotics.jpg",
    tags: ["STEM", "Robotics", "Teaching"],
  },
  {
    id: "opensource-first-mr",
    date: "2023-09",
    title: "First Open Source Merge Request",
    description:
      "Submitted and got my first MR merged into a major open source project. The thrill of contributing to something bigger.",
    category: "opensource",
    imageUrl: "/images/journey/opensource.jpg",
    tags: ["Open Source", "GitLab"],
  },
  {
    id: "backend-internship",
    date: "2024-06",
    title: "Backend Engineering Internship",
    description:
      "Landed my first backend internship. Built REST APIs, worked with databases, and learned production-grade engineering.",
    category: "internship",
    imageUrl: "/images/journey/internship.jpg",
    tags: ["Backend", "Node.js", "APIs"],
  },
  {
    id: "graduation-project",
    date: "2025-09",
    title: "Started Graduation Project — MindMate / Alzheimer AI",
    description:
      "Kicked off the graduation project: an AI-powered platform for Alzheimer's patient care and monitoring.",
    category: "project",
    imageUrl: "/images/journey/grad-project.jpg",
    tags: ["AI", "Healthcare", "Backend"],
  },
  {
    id: "graduation",
    date: "2026-06",
    title: "Graduated! 🎓",
    description:
      "Graduated with a Computer Science degree. Ready to take on the world.",
    category: "education",
    imageUrl: "/images/journey/graduation.jpg",
    tags: ["Graduation", "Milestone"],
  },
  {
    id: "current-role",
    date: "2026-08",
    title: "Software Engineer",
    description:
      "Started my professional career as a Software Engineer, continuing to build, learn, and contribute.",
    category: "work",
    imageUrl: "/images/journey/current-role.jpg",
    tags: ["Career", "Software Engineering"],
  },
];

