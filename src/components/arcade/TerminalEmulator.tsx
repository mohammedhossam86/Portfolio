"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import "@xterm/xterm/css/xterm.css";
import { TomAndJerryGame, GameLevel } from "./tomJerryEngine";
import {
  Terminal as TerminalIcon,
  RefreshCw,
  Maximize2,
  Minimize2,
  Gamepad2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Bot,
} from "lucide-react";

export default function TerminalEmulator() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const termInstanceRef = useRef<any>(null);
  const gameRef = useRef<TomAndJerryGame | null>(null);

  const [currentLevel, setCurrentLevel] = useState<GameLevel>(0);
  const [gameStats, setGameStats] = useState({
    moves: 0,
    status: "playing",
  });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ─── Initialize Game & Terminal ───────────────────────────────────────────
  const initGame = useCallback((level: GameLevel) => {
    const newGame = new TomAndJerryGame(level);
    gameRef.current = newGame;
    setCurrentLevel(level);
    setGameStats({
      moves: 0,
      status: "playing",
    });

    if (termInstanceRef.current) {
      termInstanceRef.current.write(newGame.renderAnsi());
    }
  }, []);

  // ─── Handle Movement Direction ────────────────────────────────────────────
  const handleMove = useCallback((dir: "up" | "down" | "left" | "right") => {
    if (!gameRef.current) return;
    const { state } = gameRef.current.moveRat(dir);
    setGameStats({
      moves: state.moves,
      status: state.status,
    });

    if (termInstanceRef.current) {
      termInstanceRef.current.write(gameRef.current.renderAnsi());
    }
  }, []);

  // ─── Mount xterm.js ───────────────────────────────────────────────────────
  useEffect(() => {
    let term: any = null;

    async function setupTerminal() {
      if (!terminalRef.current) return;

      const { Terminal } = await import("@xterm/xterm");

      term = new Terminal({
        cursorBlink: true,
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
        fontSize: 14,
        lineHeight: 1.25,
        theme: {
          background: "#080a10",
          foreground: "#e2e8f0",
          cursor: "#22d3ee",
          selectionBackground: "#312e81",
          black: "#0f172a",
          red: "#ef4444",
          green: "#22c55e",
          yellow: "#eab308",
          blue: "#38bdf8",
          magenta: "#c084fc",
          cyan: "#22d3ee",
          white: "#f8fafc",
          brightGreen: "#4ade80",
          brightRed: "#f87171",
          brightYellow: "#fde047",
          brightBlue: "#60a5fa",
        },
        convertEol: true,
        scrollback: 100,
        disableStdin: false,
      });

      term.open(terminalRef.current);
      termInstanceRef.current = term;

      // Start initial game
      const game = new TomAndJerryGame(0);
      gameRef.current = game;
      term.write(game.renderAnsi());

      // Key listener
      term.onKey(({ key, domEvent }: { key: string; domEvent: KeyboardEvent }) => {
        // Prevent window scroll from arrow keys when focused on terminal
        if (
          ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(
            domEvent.key
          )
        ) {
          domEvent.preventDefault();
        }

        const k = domEvent.key.toLowerCase();

        if (k === "arrowup" || k === "w") {
          handleMove("up");
        } else if (k === "arrowdown" || k === "s") {
          handleMove("down");
        } else if (k === "arrowleft" || k === "a") {
          handleMove("left");
        } else if (k === "arrowright" || k === "d") {
          handleMove("right");
        } else if (k === "r") {
          initGame(currentLevel);
        } else if (k === "1") {
          initGame(0);
        } else if (k === "2") {
          initGame(1);
        } else if (k === "3") {
          initGame(2);
        }
      });
    }

    setupTerminal();

    return () => {
      if (term) {
        term.dispose();
      }
    };
  }, [currentLevel, handleMove, initGame]);

  return (
    <div
      className={`relative flex flex-col rounded-3xl border border-[var(--color-border)] bg-[#080a10] shadow-2xl transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-4 z-50 rounded-2xl h-[calc(100vh-32px)]"
          : "w-full overflow-hidden"
      }`}
    >
      {/* ── Terminal Header Window Bar ── */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-[#0d111c] select-none">
        {/* macOS Action Dots */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
          <div className="w-3 h-3 rounded-full bg-[#eab308]" />
          <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
          <span className="ml-3 font-mono text-xs text-slate-400 hidden sm:inline">
            hossam@portfolio: ~/games/tom-and-jerry (A* Search AI)
          </span>
        </div>

        {/* Level Controls & Window Buttons */}
        <div className="flex items-center gap-2">
          {/* Difficulty Buttons */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-xs font-mono">
            <button
              onClick={() => initGame(0)}
              className={`px-2 py-0.5 rounded-md transition-colors ${
                currentLevel === 0
                  ? "bg-emerald-500/20 text-emerald-400 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => initGame(1)}
              className={`px-2 py-0.5 rounded-md transition-colors ${
                currentLevel === 1
                  ? "bg-amber-500/20 text-amber-400 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Med
            </button>
            <button
              onClick={() => initGame(2)}
              className={`px-2 py-0.5 rounded-md transition-colors ${
                currentLevel === 2
                  ? "bg-rose-500/20 text-rose-400 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Hard
            </button>
          </div>

          {/* Reset button */}
          <button
            onClick={() => initGame(currentLevel)}
            title="Restart Game (R)"
            className="p-1.5 rounded-lg border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw size={14} />
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={() => setIsFullscreen((prev) => !prev)}
            title="Toggle Fullscreen"
            className="p-1.5 rounded-lg border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* ── Terminal Emulator Screen (xterm.js container) ── */}
      <div className="relative flex-1 p-4 sm:p-6 bg-[#080a10] min-h-[360px] sm:min-h-[420px] flex items-center justify-center">
        <div
          ref={terminalRef}
          className="w-full h-full flex justify-center items-center"
        />
      </div>

      {/* ── On-Screen Gamepad / Touch D-Pad Controls ── */}
      <div className="border-t border-slate-800/80 bg-[#0c101a] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <Bot size={16} className="text-[var(--color-accent)]" />
          <span>
            Tom uses <strong className="text-white">A* Search</strong> to chase Jerry.
            Reach <span className="text-blue-400 font-bold">🚪 Exit</span> to win!
          </span>
        </div>

        {/* Virtual D-Pad */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-500 mr-2 hidden sm:inline">
            Virtual D-Pad:
          </span>
          <div className="inline-grid grid-cols-3 gap-1.5">
            <div />
            <button
              onClick={() => handleMove("up")}
              aria-label="Move Up"
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 flex items-center justify-center transition-all border border-slate-700 shadow"
            >
              <ArrowUp size={16} />
            </button>
            <div />
            <button
              onClick={() => handleMove("left")}
              aria-label="Move Left"
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 flex items-center justify-center transition-all border border-slate-700 shadow"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => handleMove("down")}
              aria-label="Move Down"
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 flex items-center justify-center transition-all border border-slate-700 shadow"
            >
              <ArrowDown size={16} />
            </button>
            <button
              onClick={() => handleMove("right")}
              aria-label="Move Right"
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 flex items-center justify-center transition-all border border-slate-700 shadow"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
