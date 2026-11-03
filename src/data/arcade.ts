import { ArcadeGame } from "@/types";

// ─── Arcade Games ────────────────────────────────────────────────────────────
// Games playable directly on the portfolio site.
// Terminal games run in xterm.js; web/scratch games load in iframes.

export const arcadeGames: ArcadeGame[] = [
  {
    id: "terminal-adventure",
    title: "Terminal Adventure Game",
    description:
      "A text-based adventure game playable right in the browser terminal. Navigate through puzzles using CLI commands.",
    gameType: "terminal",
    thumbnailUrl: "/images/projects/terminal-game.png",
    terminalConfig: {
      entryModule: "/games/terminal-adventure.js", // TODO: add your game module
      startCommand: "start",
    },
    techStack: ["JavaScript", "xterm.js"],
    isFeatured: true,
  },
  {
    id: "tom-jerry-web",
    title: "Tom & Jerry — Web Edition",
    description:
      "Play the Tom & Jerry chase game right in your browser!",
    gameType: "web",
    thumbnailUrl: "/images/projects/tom-jerry.png",
    embedUrl: "https://example.com/tom-jerry", // TODO: deploy and link your game
    techStack: ["JavaScript", "Canvas", "HTML5"],
    isFeatured: true,
  },
  // TODO: Add more games (Scratch projects, etc.)
];

