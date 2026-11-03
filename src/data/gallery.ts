import { AchievementPhoto } from "@/types";

// ─── Achievements Gallery ────────────────────────────────────────────────────
// Photos for the infinite smooth marquee/slider.
// Add your real achievement photos to /public/images/achievements/

export const achievementPhotos: AchievementPhoto[] = [
  {
    id: "achievement-1",
    src: "/images/achievements/achievement-1.jpg",
    alt: "ICPC Regional Competition",
    caption: "ICPC Regional 2023",
    date: "2023-03",
    category: "competition",
  },
  {
    id: "achievement-2",
    src: "/images/achievements/achievement-2.jpg",
    alt: "Robotics Workshop",
    caption: "Leading a Robotics Workshop",
    date: "2023-07",
    category: "community",
  },
  {
    id: "achievement-3",
    src: "/images/achievements/achievement-3.jpg",
    alt: "Hackathon Winner",
    caption: "Hackathon 1st Place",
    date: "2024-01",
    category: "competition",
  },
  {
    id: "achievement-4",
    src: "/images/achievements/achievement-4.jpg",
    alt: "Open Source Contribution",
    caption: "Open Source Day",
    date: "2024-05",
    category: "community",
  },
  {
    id: "achievement-5",
    src: "/images/achievements/achievement-5.jpg",
    alt: "Graduation Ceremony",
    caption: "Graduation Day 🎓",
    date: "2026-06",
    category: "college",
  },
  {
    id: "achievement-6",
    src: "/images/achievements/achievement-6.jpg",
    alt: "First Day at Work",
    caption: "Starting my Career",
    date: "2026-08",
    category: "work",
  },
  // TODO: Add more real photos
];

