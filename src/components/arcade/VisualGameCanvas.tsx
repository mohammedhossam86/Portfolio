"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  TomAndJerryGame,
  GameLevel,
  GameState,
  PathfindingAlgorithm,
  manhattanDistance,
} from "./tomJerryEngine";
import {
  Gamepad2,
  RefreshCw,
  Eye,
  EyeOff,
  Trophy,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Bot,
  Cpu,
  Network,
  Sparkles,
} from "lucide-react";

export default function VisualGameCanvas() {
  const [level, setLevel] = useState<GameLevel>(0);
  const [algorithm, setAlgorithm] = useState<PathfindingAlgorithm>("astar");
  const [showPathTrail, setShowPathTrail] = useState(true);

  const gameRef = useRef<TomAndJerryGame | null>(null);
  if (!gameRef.current) {
    gameRef.current = new TomAndJerryGame(0, false, "astar");
  }
  const [gameState, setGameState] = useState<GameState>(() =>
    gameRef.current!.getState()
  );

  const resetGame = useCallback(
    (lvl: GameLevel, algo: PathfindingAlgorithm = algorithm) => {
      const g = new TomAndJerryGame(lvl, true, algo);
      gameRef.current = g;
      setLevel(lvl);
      setAlgorithm(algo);
      setGameState(g.getState());
    },
    [algorithm]
  );

  const handleAlgorithmChange = (algo: PathfindingAlgorithm) => {
    setAlgorithm(algo);
    if (gameRef.current) {
      gameRef.current.setAlgorithm(algo);
      // Trigger Tom path update with the new algorithm
      setGameState(gameRef.current.getState());
    }
  };

  const move = useCallback((dir: "up" | "down" | "left" | "right") => {
    if (!gameRef.current) return;
    const { state } = gameRef.current.moveRat(dir);
    setGameState({ ...state });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in a form input or textarea
      const target = e.target as HTMLElement;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      const k = e.key.toLowerCase();
      const isMoveKey = [
        "arrowup",
        "arrowdown",
        "arrowleft",
        "arrowright",
        "w",
        "a",
        "s",
        "d",
      ].includes(k);

      if (isMoveKey) {
        // Stop default browser page scroll immediately
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }

      if (k === "arrowup" || k === "w") move("up");
      else if (k === "arrowdown" || k === "s") move("down");
      else if (k === "arrowleft" || k === "a") move("left");
      else if (k === "arrowright" || k === "d") move("right");
      else if (k === "r") resetGame(level, algorithm);
    };

    window.addEventListener("keydown", handleKey, { capture: true });
    return () => window.removeEventListener("keydown", handleKey, { capture: true });
  }, [algorithm, level, move, resetGame]);

  const {
    grid,
    catPos,
    ratPos,
    exitPos,
    lastTomPath,
    status,
    moves,
    nodesExplored,
  } = gameState;

  // Set of path coordinates for fast lookup
  const pathSet = new Set(lastTomPath.map(([i, j]) => `${i},${j}`));

  return (
    <div className="flex flex-col items-center justify-between rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/90 backdrop-blur-xl p-5 sm:p-8 shadow-2xl w-full">
      {/* ── Top Bar: Title & Controls ── */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
            <Gamepad2 size={20} />
          </span>
          <div>
            <h3 className="text-base font-bold text-white">
              Tom &amp; Jerry 2D Grid
            </h3>
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              Moves: <strong className="text-white">{moves}</strong> | Dist to Exit:{" "}
              <strong className="text-cyan-400">
                {manhattanDistance(ratPos, exitPos)} steps
              </strong>
            </span>
          </div>
        </div>

        {/* Level Controls & Path Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] p-1 text-xs font-mono">
            <button
              onClick={() => resetGame(0, algorithm)}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                level === 0
                  ? "bg-emerald-500/20 text-emerald-400 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => resetGame(1, algorithm)}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                level === 1
                  ? "bg-amber-500/20 text-amber-400 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => resetGame(2, algorithm)}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                level === 2
                  ? "bg-rose-500/20 text-rose-400 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Hard
            </button>
          </div>

          <button
            onClick={() => setShowPathTrail((p) => !p)}
            title="Toggle Path Trail"
            className={`p-2 rounded-xl border transition-colors ${
              showPathTrail
                ? "bg-[var(--color-primary)]/20 border-[var(--color-primary)] text-[var(--color-primary-light)]"
                : "border-[var(--color-border)] text-slate-400 hover:text-white"
            }`}
          >
            {showPathTrail ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>

          <button
            onClick={() => resetGame(level, algorithm)}
            title="Restart Game (R)"
            className="p-2 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* ── Algorithm Comparison Switcher Bar ── */}
      <div className="w-full mb-6 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 hidden sm:inline">Pathfinding AI:</span>
          <div className="flex items-center rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => handleAlgorithmChange("astar")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                algorithm === "astar"
                  ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Bot size={13} />
              <span>A* Search</span>
            </button>
            <button
              onClick={() => handleAlgorithmChange("dijkstra")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                algorithm === "dijkstra"
                  ? "bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Cpu size={13} />
              <span>Dijkstra</span>
            </button>
            <button
              onClick={() => handleAlgorithmChange("bfs")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                algorithm === "bfs"
                  ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Network size={13} />
              <span>BFS</span>
            </button>
          </div>
        </div>

        {/* Live Comparison Metrics */}
        <div className="flex items-center gap-3 text-slate-300 text-[11px]">
          <span>
            Nodes Evaluated:{" "}
            <strong className="text-cyan-400 font-bold">{nodesExplored}</strong>
          </span>
          <span className="text-slate-600">•</span>
          <span>
            Tom&apos;s Route:{" "}
            <strong className="text-rose-400 font-bold">{lastTomPath.length} steps</strong>
          </span>
        </div>
      </div>

      {/* ── Status Banner (Win / Loss) ── */}
      {status === "won" && (
        <div className="w-full mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center justify-between text-xs sm:text-sm font-semibold">
          <span className="flex items-center gap-2">
            <Trophy size={18} />
            Jerry Escaped to Freedom! You beat {algorithm.toUpperCase()} in {moves} moves!
          </span>
          <button
            onClick={() => resetGame(level, algorithm)}
            className="px-3 py-1 rounded-lg bg-emerald-500 text-black font-bold text-xs"
          >
            Play Again
          </button>
        </div>
      )}

      {status === "lost" && (
        <div className="w-full mb-6 p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center justify-between text-xs sm:text-sm font-semibold">
          <span>
            💥 Caught! Tom used {algorithm.toUpperCase()} to intercept Jerry!
          </span>
          <button
            onClick={() => resetGame(level, algorithm)}
            className="px-3 py-1 rounded-lg bg-rose-500 text-white font-bold text-xs"
          >
            Try Again
          </button>
        </div>
      )}

      {/* ── Visual Grid Board ── */}
      <div className="p-4 sm:p-6 rounded-3xl border border-[var(--color-border)] bg-[#07090f] shadow-inner select-none overflow-x-auto max-w-full">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          {grid.map((row, r) => (
            <div key={r} className="flex gap-1.5 sm:gap-2 justify-center">
              {row.map((cell, c) => {
                const isJerry = r === ratPos[0] && c === ratPos[1];
                const isTom = r === catPos[0] && c === catPos[1];
                const isExit = r === exitPos[0] && c === exitPos[1];
                const isWall = cell === "#";
                const isPath = showPathTrail && pathSet.has(`${r},${c}`);

                return (
                  <div
                    key={`${r}-${c}`}
                    className={`
                      w-8 h-8 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-sm sm:text-lg font-bold transition-all duration-150
                      ${
                        isJerry
                          ? "bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(34,197,94,0.4)] scale-110 z-10"
                          : isTom
                          ? "bg-rose-500/20 border-2 border-rose-400 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.4)] scale-110 z-10"
                          : isExit
                          ? "bg-blue-500/20 border-2 border-blue-400 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.3)] animate-pulse"
                          : isWall
                          ? "bg-amber-950/40 border border-amber-600/40 text-amber-500 shadow-sm"
                          : isPath
                          ? "bg-cyan-500/10 border border-cyan-400/40 text-cyan-300"
                          : "bg-slate-900/60 border border-slate-800/60 text-slate-700 hover:border-slate-700"
                      }
                    `}
                  >
                    {isJerry && (status === "won" ? "🎉" : "🐭")}
                    {isTom && (status === "lost" ? "💥" : "🐱")}
                    {isExit && !isJerry && "🚪"}
                    {isWall && "🧱"}
                    {isPath && !isJerry && !isTom && !isExit && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                    {!isJerry && !isTom && !isExit && !isWall && !isPath && "·"}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ── Virtual D-Pad Gamepad for Touch & Mobile ── */}
      <div className="w-full mt-6 pt-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Bot size={15} className="text-cyan-400" />
          <span>
            Controls: <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-white">W A S D</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-white">Arrows</kbd> / Touch
          </span>
        </div>

        <div className="inline-grid grid-cols-3 gap-1.5">
          <div />
          <button
            onClick={() => move("up")}
            aria-label="Up"
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 flex items-center justify-center border border-slate-700 shadow"
          >
            <ArrowUp size={16} />
          </button>
          <div />
          <button
            onClick={() => move("left")}
            aria-label="Left"
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 flex items-center justify-center border border-slate-700 shadow"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => move("down")}
            aria-label="Down"
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 flex items-center justify-center border border-slate-700 shadow"
          >
            <ArrowDown size={16} />
          </button>
          <button
            onClick={() => move("right")}
            aria-label="Right"
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 flex items-center justify-center border border-slate-700 shadow"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
