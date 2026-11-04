"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { TomAndJerryGame, GameLevel, GameState, manhattanDistance } from "./tomJerryEngine";
import {
  Gamepad2,
  RefreshCw,
  Eye,
  EyeOff,
  Trophy,
  Skull,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function VisualGameCanvas() {
  const [level, setLevel] = useState<GameLevel>(0);
  const [showAStarTrail, setShowAStarTrail] = useState(true);
  const gameRef = useRef<TomAndJerryGame | null>(null);
  if (!gameRef.current) {
    gameRef.current = new TomAndJerryGame(0, false);
  }
  const [gameState, setGameState] = useState<GameState>(() =>
    gameRef.current!.getState()
  );

  const resetGame = useCallback(
    (lvl: GameLevel) => {
      const g = new TomAndJerryGame(lvl, true);
      gameRef.current = g;
      setLevel(lvl);
      setGameState(g.getState());
    },
    []
  );

  const move = useCallback((dir: "up" | "down" | "left" | "right") => {
    if (!gameRef.current) return;
    const { state } = gameRef.current.moveRat(dir);
    setGameState({ ...state });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(k)) {
        e.preventDefault();
      }

      if (k === "arrowup" || k === "w") move("up");
      else if (k === "arrowdown" || k === "s") move("down");
      else if (k === "arrowleft" || k === "a") move("left");
      else if (k === "arrowright" || k === "d") move("right");
      else if (k === "r") resetGame(level);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [level, move, resetGame]);

  const { grid, height, width, catPos, ratPos, exitPos, lastTomPath, status, moves } =
    gameState;

  // Set of path coordinates for fast lookup
  const pathSet = new Set(
    lastTomPath.map(([i, j]) => `${i},${j}`)
  );

  return (
    <div className="flex flex-col items-center justify-between rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
      {/* ── Top Bar ── */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
            <Gamepad2 size={20} />
          </span>
          <div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)]">
              Tom &amp; Jerry 2D Grid
            </h3>
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              Moves: <strong className="text-white">{moves}</strong> | Dist:{" "}
              <strong className="text-[var(--color-accent-light)]">
                {manhattanDistance(ratPos, exitPos)} steps
              </strong>
            </span>
          </div>
        </div>

        {/* Level Controls & A* Trail Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] p-1 text-xs font-mono">
            <button
              onClick={() => resetGame(0)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                level === 0
                  ? "bg-emerald-500/20 text-emerald-400 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => resetGame(1)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                level === 1
                  ? "bg-amber-500/20 text-amber-400 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => resetGame(2)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                level === 2
                  ? "bg-rose-500/20 text-rose-400 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Hard
            </button>
          </div>

          <button
            onClick={() => setShowAStarTrail((p) => !p)}
            title="Toggle Tom's A* Path Trail"
            className={`p-2 rounded-xl border transition-colors ${
              showAStarTrail
                ? "bg-[var(--color-primary)]/20 border-[var(--color-primary)] text-[var(--color-primary-light)]"
                : "border-[var(--color-border)] text-slate-400 hover:text-white"
            }`}
          >
            {showAStarTrail ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>

          <button
            onClick={() => resetGame(level)}
            title="Restart Game"
            className="p-2 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* ── Status Banner (Win / Loss) ── */}
      {status === "won" && (
        <div className="w-full mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center justify-between text-sm font-semibold">
          <span className="flex items-center gap-2">
            <Trophy size={18} />
            Jerry Escaped to Freedom! You beat Tom&apos;s AI in {moves} moves!
          </span>
          <button
            onClick={() => resetGame(level)}
            className="px-3 py-1 rounded-lg bg-emerald-500 text-black font-bold text-xs"
          >
            Play Again
          </button>
        </div>
      )}

      {status === "lost" && (
        <div className="w-full mb-6 p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center justify-between text-sm font-semibold">
          <span className="flex items-center gap-2">
            <Skull size={18} />
            Tom Caught Jerry! The A* heuristic path calculated your trap.
          </span>
          <button
            onClick={() => resetGame(level)}
            className="px-3 py-1 rounded-lg bg-rose-500 text-white font-bold text-xs"
          >
            Try Again
          </button>
        </div>
      )}

      {/* ── 2D Visual Game Grid ── */}
      <div className="relative p-3 rounded-2xl bg-[#080b12] border border-slate-800 shadow-inner overflow-auto max-w-full">
        <div
          className="grid gap-1.5"
          style={{
            gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`,
          }}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const isJerry = r === ratPos[0] && c === ratPos[1];
              const isTom = r === catPos[0] && c === catPos[1];
              const isExit = r === exitPos[0] && c === exitPos[1];
              const isObstacle = cell === "#";
              const isPath = showAStarTrail && pathSet.has(`${r},${c}`) && !isJerry && !isTom && !isExit;

              return (
                <div
                  key={`${r}-${c}`}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-lg select-none transition-all duration-200 ${
                    isJerry
                      ? "bg-emerald-500/25 border-2 border-emerald-400 shadow-[0_0_15px_rgba(34,197,94,0.4)] scale-105 z-10"
                      : isTom
                      ? "bg-rose-500/25 border-2 border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)] scale-105 z-10"
                      : isExit
                      ? "bg-blue-500/20 border-2 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-pulse"
                      : isObstacle
                      ? "bg-amber-950/40 border border-amber-600/40 text-amber-500"
                      : isPath
                      ? "bg-cyan-950/40 border border-cyan-500/30 text-cyan-400"
                      : "bg-[#0d121f] border border-slate-800/80 text-slate-700"
                  }`}
                >
                  {isJerry && (status === "won" ? "🎉" : "🐭")}
                  {isTom && (status === "lost" ? "💥" : "🐱")}
                  {isExit && !isJerry && "🚪"}
                  {isObstacle && "🧱"}
                  {isPath && (
                    <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-ping" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── Virtual Controls for Mobile & Click ── */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between w-full gap-4 pt-4 border-t border-[var(--color-border)]">
        <span className="text-xs font-mono text-[var(--color-text-muted)] text-center sm:text-left">
          Navigate Jerry with <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-xs font-mono">W A S D</kbd> or the D-Pad.
        </span>

        <div className="inline-grid grid-cols-3 gap-1.5">
          <div />
          <button
            onClick={() => move("up")}
            aria-label="Up"
            className="w-10 h-10 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-white hover:border-[var(--color-primary)] flex items-center justify-center active:scale-95 transition-all shadow"
          >
            <ArrowUp size={18} />
          </button>
          <div />
          <button
            onClick={() => move("left")}
            aria-label="Left"
            className="w-10 h-10 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-white hover:border-[var(--color-primary)] flex items-center justify-center active:scale-95 transition-all shadow"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => move("down")}
            aria-label="Down"
            className="w-10 h-10 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-white hover:border-[var(--color-primary)] flex items-center justify-center active:scale-95 transition-all shadow"
          >
            <ArrowDown size={18} />
          </button>
          <button
            onClick={() => move("right")}
            aria-label="Right"
            className="w-10 h-10 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-white hover:border-[var(--color-primary)] flex items-center justify-center active:scale-95 transition-all shadow"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

