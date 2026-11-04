import { HeroData } from "@/types";

export const heroData: HeroData = {
  name: "Mohammed Hossam",
  headline: "Software Engineer",
  tagline:
    "Building robust backend systems, solving competitive programming challenges, contributing to open source, and teaching the next generation of developers.",
  roles: [
    "Backend Engineer",
    "Competitive Programmer",
    "Open Source Contributor",
    "STEM & Robotics Instructor",
  ],
  stats: [
    { label: "LeetCode Problems", value: "500+", icon: "Code2" },
    { label: "Open Source MRs", value: "30+", icon: "GitMerge" },
    { label: "Students Taught", value: "100+", icon: "Users" },
    { label: "Projects Built", value: "15+", icon: "Rocket" },
  ],
  resumeUrl: "/cv.pdf",
  avatarUrl: "/images/avatar.png",
};
