import { Project } from "@/types";

// =============================================================================
// Featured Projects Showcase — Data-Driven UI
// =============================================================================

export const projects: Project[] = [
  {
    id: "mindmate-alzheimer",
    title: "MindMate — Alzheimer AI & IoT Platform",
    description:
      "Full-stack graduation project linking a Node.js/TypeScript REST API with a Dockerized FastAPI AI service (RetinaFace + ResNet50) and ESP32 hardware for real-time patient tracking and caregiver alerts.",
    longDescription:
      "Architected a multi-service backend with Mongoose Discriminators for multi-role modeling (patient, caregiver, admin), CRON scheduling, Firebase push notifications, and JWT RBAC middleware.",
    category: "graduation",
    techStack: [
      "Node.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "MongoDB",
      "Socket.IO",
      "Docker",
      "ESP32",
    ],
    imageUrl: "/images/projects/mindmate.png",
    repoUrl: "https://github.com/MindMate-Project",
    isFeatured: true,
    date: "2026-06",
  },
  {
    id: "online-shop-backend",
    title: "Online Shop — Enterprise Backend System",
    description:
      "Production-grade backend system with a 3-tier Role-Based Access Control (RBAC) architecture (Guest, Customer, Provider), complete order lifecycle management, and strict server-side price validation.",
    longDescription:
      "Eliminated unhandled promise rejections using centralized AppError classes and async controller wrappers. Enforced route-level ownership checks preventing cross-user data leakage.",
    category: "backend",
    techStack: [
      "Node.js",
      "Express v5",
      "MongoDB",
      "JWT",
      "Multer",
      "bcrypt",
      "MVC",
    ],
    imageUrl: "/images/projects/online-shop.png",
    repoUrl: "https://github.com/mohammedhossam86/Online-Shop",
    isFeatured: true,
    date: "2024-12",
  },
  {
    id: "codesync",
    title: "CodeSync — Real-Time Collaborative Workspace",
    description:
      "Real-time collaborative developer platform built in TypeScript featuring bidirectional WebSockets communication, live document sync, and Joi payload validation.",
    category: "backend",
    techStack: [
      "TypeScript",
      "Node.js",
      "Express v5",
      "Socket.IO",
      "JWT",
      "Joi",
    ],
    imageUrl: "/images/projects/codesync.png",
    repoUrl: "https://github.com/mohammedhossam86/CodeSync",
    isFeatured: false,
    date: "2026-01",
  },
  {
    id: "tom-jerry-ai",
    title: "Tom & Jerry — AI Pathfinding & Terminal Game",
    description:
      "Interactive 2D game with AI-driven pathfinding algorithms (BFS / A* / Dijkstra), dynamic obstacle generation, and multi-level difficulty modes playable both in the terminal and browser.",
    category: "game",
    techStack: ["Python", "Algorithms", "Pathfinding", "Pygame", "xterm.js"],
    imageUrl: "/images/projects/tom-jerry.png",
    repoUrl: "https://github.com/mohammedhossam86/Tom-Jerry",
    isFeatured: true,
    date: "2026-04",
  },
  {
    id: "blog-platform",
    title: "Blog Web Platform & CMS",
    description:
      "Full-stack content publishing platform with role-based admin authentication, real-time article search, and complete CRUD editorial workflows.",
    category: "backend",
    techStack: [
      "Node.js",
      "Express",
      "MongoDB",
      "EJS",
      "JWT",
      "Bcrypt",
      "Sessions",
    ],
    imageUrl: "/images/projects/blog.png",
    repoUrl: "https://github.com/mohammedhossam86/Blog-Website",
    isFeatured: false,
    date: "2026-01",
  },
  {
    id: "url-shortener",
    title: "High-Throughput URL Shortener",
    description:
      "Scalable URL shortening microservice featuring instant 302 redirects, click analytics tracking, and a clean MVC architecture with MongoDB.",
    category: "backend",
    techStack: ["Node.js", "Express", "MongoDB", "EJS", "MVC"],
    imageUrl: "/images/projects/url-shortener.png",
    repoUrl: "https://github.com/mohammedhossam86/Url-Shourtner",
    isFeatured: false,
    date: "2025-12",
  },
];
