import { Project } from "@/types";

// ─── Projects ────────────────────────────────────────────────────────────────
// Each project is rendered as a card in the Bento grid.
// Featured projects get a larger card. Videos auto-play on hover.

export const projects: Project[] = [
  {
    id: "mindmate-alzheimer",
    title: "MindMate — Alzheimer AI Platform",
    description:
      "AI-powered platform for Alzheimer's patient care with real-time monitoring, cognitive assessments, and caregiver dashboards.",
    longDescription:
      "Full-stack graduation project featuring a Node.js/Express backend, AI prediction models, real-time notifications, and a React-based caregiver dashboard.",
    category: "graduation",
    techStack: ["Node.js", "Express", "MongoDB", "Python", "React", "AI/ML"],
    imageUrl: "/images/projects/mindmate.png",
    previewVideoUrl: "/videos/mindmate-preview.webm",
    repoUrl: "https://github.com/hossam/mindmate", // TODO: update
    isFeatured: true,
    date: "2026-06",
  },
  {
    id: "wahaj-store",
    title: "Wahaj Store — E-Commerce Platform",
    description:
      "Full-featured e-commerce store with product management, shopping cart, payment integration, and admin dashboard.",
    category: "fullstack",
    techStack: ["Node.js", "Express", "MongoDB", "React"],
    imageUrl: "/images/projects/wahaj-store.png",
    repoUrl: "https://github.com/hossam/wahaj-store", // TODO: update
    isFeatured: false,
    date: "2025-10",
  },
  {
    id: "tom-jerry-game",
    title: "Tom & Jerry Game",
    description:
      "A fun 2D chase game built with Java featuring sprite animations, collision detection, and score tracking.",
    category: "game",
    techStack: ["Java", "Swing", "OOP"],
    imageUrl: "/images/projects/tom-jerry.png",
    previewVideoUrl: "/videos/tom-jerry-preview.webm",
    repoUrl: "https://github.com/hossam/tom-jerry", // TODO: update
    isFeatured: true,
    date: "2025-05",
  },
  {
    id: "airport-system",
    title: "Airport Management System",
    description:
      "Database-driven airport management system handling flights, passengers, bookings, and gate assignments.",
    category: "backend",
    techStack: ["Java", "SQL", "JDBC", "OOP"],
    imageUrl: "/images/projects/airport.png",
    repoUrl: "https://github.com/hossam/airport", // TODO: update
    isFeatured: false,
    date: "2025-12",
  },
  {
    id: "auto-fast",
    title: "Auto Fast — Automation Tool",
    description:
      "Developer productivity tool for automating repetitive tasks and project scaffolding.",
    category: "tool",
    techStack: ["Python", "CLI", "Automation"],
    imageUrl: "/images/projects/auto-fast.png",
    repoUrl: "https://github.com/hossam/auto-fast", // TODO: update
    isFeatured: false,
    date: "2025-02",
  },
];

