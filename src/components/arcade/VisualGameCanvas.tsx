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

      // ONLY intercept if user is actively interacting with the Arcade game!
      const isInsideArcade =
        target?.closest("#arcade") !== null ||
        document.getElementById("arcade")?.matches(":hover") ||
        document.activeElement?.closest("#arcade") !== null;

      if (!isInsideArcade) return;

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
    <div className="flex flex-col items-center justify-between rounded-3xl border border-orange-200/80 dark:border-zinc-800 bg-white dark:bg-[#0c0c10] shadow-2xl transition-all duration-300 font-mono w-full overflow-hidden">
      {/* ── Top Window Bar: Title & Controls (Matches CLI window header) ── */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 px-5 py-3 border-b border-orange-200/80 dark:border-zinc-800 bg-orange-50/70 dark:bg-[#121217] select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
            <div className="w-3 h-3 rounded-full bg-[#eab308]" />
            <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-stone-800 dark:text-zinc-200">
              Tom &amp; Jerry Visual 2D Board
            </h3>
            <span className="text-[11px] font-mono text-stone-500 dark:text-zinc-400">
              Moves: <strong className="text-stone-900 dark:text-white">{moves}</strong> | Dist to Exit:{" "}
              <strong className="text-blue-600 dark:text-blue-400 font-bold">
                {manhattanDistance(ratPos, exitPos)} steps
              </strong>
            </span>
          </div>
        </div>

        {/* Level Controls & Path Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center rounded-lg bg-orange-100/60 dark:bg-zinc-900 border border-orange-200/80 dark:border-zinc-800 p-0.5 text-xs">
            <button
              onClick={() => resetGame(0, algorithm)}
              className={`px-2.5 py-0.5 rounded-md transition-colors ${
                level === 0
                  ? "bg-emerald-500 text-white dark:bg-emerald-500/20 dark:text-emerald-400 font-bold shadow-xs"
                  : "text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => resetGame(1, algorithm)}
              className={`px-2.5 py-0.5 rounded-md transition-colors ${
                level === 1
                  ? "bg-amber-500 text-white dark:bg-amber-500/20 dark:text-amber-400 font-bold shadow-xs"
                  : "text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              Med
            </button>
            <button
              onClick={() => resetGame(2, algorithm)}
              className={`px-2.5 py-0.5 rounded-md transition-colors ${
                level === 2
                  ? "bg-rose-500 text-white dark:bg-rose-500/20 dark:text-rose-400 font-bold shadow-xs"
                  : "text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              Hard
            </button>
          </div>

          <button
            onClick={() => setShowPathTrail((p) => !p)}
            title="Toggle Path Trail"
            className={`p-1.5 rounded-lg border transition-colors ${
              showPathTrail
                ? "bg-orange-600 text-white dark:bg-zinc-100 dark:text-zinc-950 border-orange-600 dark:border-zinc-100 shadow-xs font-bold"
                : "border-orange-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900 text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white"
            }`}
          >
            {showPathTrail ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>

          <button
            onClick={() => resetGame(level, algorithm)}
            title="Restart Game (R)"
            className="p-1.5 rounded-lg border border-orange-200 dark:border-zinc-800 hover:border-orange-300 dark:hover:border-zinc-700 text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white transition-colors bg-white/60 dark:bg-zinc-900/60"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* ── Algorithm Comparison Switcher Bar (Matches CLI HUD) ── */}
      <div className="w-full px-5 py-2.5 bg-orange-50/40 dark:bg-[#0e0e13] border-b border-orange-200/80 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-stone-500 dark:text-zinc-400 hidden sm:inline">Pathfinding AI:</span>
          <div className="flex items-center gap-1.5 rounded-lg bg-orange-100/60 dark:bg-zinc-900 border border-orange-200/80 dark:border-zinc-800 p-0.5 text-[10px]">
            <button
              onClick={() => handleAlgorithmChange("astar")}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded transition-all ${
                algorithm === "astar"
                  ? "bg-orange-600 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold shadow-xs"
                  : "text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              <Bot size={12} />
              <span>A* Search</span>
            </button>
            <button
              onClick={() => handleAlgorithmChange("dijkstra")}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded transition-all ${
                algorithm === "dijkstra"
                  ? "bg-purple-600 text-white dark:bg-purple-500/20 dark:text-purple-300 font-bold shadow-xs"
                  : "text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              <Cpu size={12} />
              <span>Dijkstra</span>
            </button>
            <button
              onClick={() => handleAlgorithmChange("bfs")}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded transition-all ${
                algorithm === "bfs"
                  ? "bg-emerald-600 text-white dark:bg-emerald-500/20 dark:text-emerald-300 font-bold shadow-xs"
                  : "text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              <Network size={12} />
              <span>BFS</span>
            </button>
          </div>
        </div>

        {/* Live Comparison Metrics */}
        <div className="flex items-center gap-3 text-stone-600 dark:text-zinc-300 text-[11px]">
          <span>
            Nodes Evaluated:{" "}
            <strong className="text-orange-600 dark:text-zinc-200 font-bold">{nodesExplored}</strong>
          </span>
          <span className="text-stone-300 dark:text-zinc-700">•</span>
          <span>
            Tom&apos;s Route:{" "}
            <strong className="text-rose-600 dark:text-rose-400 font-bold">{lastTomPath.length} steps</strong>
          </span>
        </div>
      </div>

      {/* ── Status Banner (Win / Loss) ── */}
      {status === "won" && (
        <div className="w-full mx-auto px-5 py-3 bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center justify-between text-xs sm:text-sm font-semibold">
          <span className="flex items-center gap-2">
            <Trophy size={16} />
            Jerry Escaped to Freedom! You beat {algorithm.toUpperCase()} in {moves} moves!
          </span>
          <button
            onClick={() => resetGame(level, algorithm)}
            className="px-3 py-1 rounded-lg bg-emerald-500 text-white font-bold text-xs shadow-xs"
          >
            Play Again
          </button>
        </div>
      )}

      {status === "lost" && (
        <div className="w-full mx-auto px-5 py-3 bg-rose-500/15 border-b border-rose-500/30 text-rose-700 dark:text-rose-300 flex items-center justify-between text-xs sm:text-sm font-semibold">
          <span>
            💥 Caught! Tom used {algorithm.toUpperCase()} to intercept Jerry!
          </span>
          <button
            onClick={() => resetGame(level, algorithm)}
            className="px-3 py-1 rounded-lg bg-rose-500 text-white font-bold text-xs shadow-xs"
          >
            Try Again
          </button>
        </div>
      )}

      {/* ── Visual Grid Board (Identical clean white/orange board styling to CLI mode) ── */}
      <div className="w-full flex-1 p-6 bg-orange-50/20 dark:bg-[#08080a] flex flex-col items-center justify-center select-none overflow-x-auto min-h-[340px]">
        <div className="inline-block border border-orange-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 bg-white dark:bg-[#0f0f14] shadow-md dark:shadow-inner">
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
                            ? "bg-emerald-100 dark:bg-emerald-500/20 border-2 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-[0_0_12px_rgba(34,197,94,0.3)] scale-110 z-10"
                            : isTom
                            ? "bg-rose-100 dark:bg-rose-500/20 border-2 border-rose-500 text-rose-700 dark:text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.3)] scale-110 z-10"
                            : isExit
                            ? "bg-blue-100 dark:bg-blue-500/20 border-2 border-blue-500 text-blue-700 dark:text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.3)] animate-pulse"
                            : isWall
                            ? "bg-stone-200 dark:bg-amber-950/40 border border-stone-300 dark:border-amber-600/40 text-stone-700 dark:text-amber-500 shadow-xs"
                            : isPath
                            ? "bg-cyan-100 dark:bg-cyan-500/15 border border-cyan-400 text-cyan-800 dark:text-cyan-300"
                            : "bg-orange-50/60 dark:bg-zinc-900/60 border border-orange-100 dark:border-zinc-800/60 text-stone-400 dark:text-zinc-600"
                        }
                      `}
                    >
                      {isJerry && (status === "won" ? "🎉" : "🐭")}
                      {isTom && (status === "lost" ? "💥" : "🐱")}
                      {isExit && !isJerry && "🚪"}
                      {isWall && "🧱"}
                      {isPath && !isJerry && !isTom && !isExit && (
                        <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
                      )}
                      {!isJerry && !isTom && !isExit && !isWall && !isPath && "·"}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <p className="mt-4 text-xs text-stone-500 dark:text-zinc-400 text-center max-w-md">
          Jerry (🐭) must escape to Exit (🚪) before Tom (🐱) catches him. Tom calculates routes in real-time via {algorithm.toUpperCase()}.
        </p>
      </div>

      {/* ── Virtual D-Pad Gamepad for Touch & Mobile (Matches CLI D-Pad) ── */}
      <div className="w-full border-t border-orange-200 dark:border-zinc-800 bg-orange-50/30 dark:bg-[#0e0e13] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-zinc-400 font-mono">
          <Bot size={15} className="text-orange-500 dark:text-zinc-300" />
          <span>
            Controls: <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-orange-200 dark:border-zinc-700 text-stone-800 dark:text-white font-mono text-[11px] shadow-xs">W A S D</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-orange-200 dark:border-zinc-700 text-stone-800 dark:text-white font-mono text-[11px] shadow-xs">Arrows</kbd> / Touch D-Pad
          </span>
        </div>

        <div className="inline-grid grid-cols-3 gap-1.5">
          <div />
          <button
            onClick={() => move("up")}
            aria-label="Up"
            className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-800 hover:bg-orange-100 dark:hover:bg-zinc-700 active:scale-95 text-stone-800 dark:text-zinc-200 flex items-center justify-center transition-all border border-orange-200 dark:border-zinc-700 shadow-sm"
          >
            <ArrowUp size={16} />
          </button>
          <div />
          <button
            onClick={() => move("left")}
            aria-label="Left"
            className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-800 hover:bg-orange-100 dark:hover:bg-zinc-700 active:scale-95 text-stone-800 dark:text-zinc-200 flex items-center justify-center transition-all border border-orange-200 dark:border-zinc-700 shadow-sm"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => move("down")}
            aria-label="Down"
            className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-800 hover:bg-orange-100 dark:hover:bg-zinc-700 active:scale-95 text-stone-800 dark:text-zinc-200 flex items-center justify-center transition-all border border-orange-200 dark:border-zinc-700 shadow-sm"
          >
            <ArrowDown size={16} />
          </button>
          <button
            onClick={() => move("right")}
            aria-label="Right"
            className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-800 hover:bg-orange-100 dark:hover:bg-zinc-700 active:scale-95 text-stone-800 dark:text-zinc-200 flex items-center justify-center transition-all border border-orange-200 dark:border-zinc-700 shadow-sm"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
