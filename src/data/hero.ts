import { HeroData } from "@/types";

export const heroData: HeroData = {
  name: "Mohammed Hossam",
  headline: "Backend Engineer & AI Engineer",
  tagline:
    "Building scalable distributed backend architectures, high-concurrency microservices, and evaluating frontier AI models. Active GitLab Core Contributor and 4× ECPC Contestant.",
  roles: [
    "Backend Engineer",
    "AI Trainer & Evaluator (Outlier & Alignerr)",
    "GitLab Core Contributor",
    "Competitive Programmer (ECPC)",
    "STEM & Robotics Instructor",
  ],
  stats: [
    { label: "Problems Solved", value: "2,500+", icon: "Code2" },
    { label: "GitLab Core MRs", value: "37+", icon: "GitMerge" },
    { label: "Students Mentored", value: "200+", icon: "Users" },
    { label: "Production Projects", value: "15+", icon: "Rocket" },
  ],
  resumeUrl: "/cv.pdf",
  avatarUrl: "/images/profile.jpg",
};
