"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { TomAndJerryGame, GameLevel, manhattanDistance } from "./tomJerryEngine";
import {
  Terminal as TerminalIcon,
  RefreshCw,
  Maximize2,
  Minimize2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Bot,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export default function TerminalEmulator() {
  const [level, setLevel] = useState<GameLevel>(0);
  const gameRef = useRef<TomAndJerryGame | null>(null);
  if (!gameRef.current) {
    gameRef.current = new TomAndJerryGame(0, false);
  }
  const [gameState, setGameState] = useState(() => gameRef.current!.getState());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [commandInput, setCommandInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Welcome to Tom & Jerry A* Search CLI Game!",
    "Jerry (🐭) must escape to Exit (🚪) before Tom (🐱) catches him.",
    "Tom calculates his route in real-time using A* Pathfinding.",
    "Type 'help' for commands, or use [W/A/S/D] or [Arrow Keys] to move.",
  ]);

  // Restart / Reset Game
  const resetGame = useCallback((lvl: GameLevel) => {
    const newGame = new TomAndJerryGame(lvl, true);
    gameRef.current = newGame;
    setLevel(lvl);
    setGameState(newGame.getState());
    setHistory((prev) => [
      ...prev.slice(-6),
      `\x1b[36m>> Game restarted! Difficulty: ${lvl === 0 ? "Easy" : lvl === 1 ? "Medium" : "Hard"}\x1b[0m`,
    ]);
  }, []);

  // Handle Movement
  const handleMove = useCallback((dir: "up" | "down" | "left" | "right") => {
    if (!gameRef.current) return;
    const { moved, state } = gameRef.current.moveRat(dir);
    if (moved) {
      setGameState({ ...state });
      if (state.status === "won") {
        setHistory((prev) => [
          ...prev.slice(-6),
          `\x1b[92m>> 🎉 VICTORY! Jerry reached the exit in ${state.moves} moves!\x1b[0m`,
        ]);
      } else if (state.status === "lost") {
        setHistory((prev) => [
          ...prev.slice(-6),
          `\x1b[91m>> 💥 CAUGHT! Tom's A* path trapped Jerry!\x1b[0m`,
        ]);
      }
    }
  }, []);

  // Keyboard Event Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      const target = e.target as HTMLElement;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      // ONLY intercept if user is interacting with the Arcade section!
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
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }

      if (k === "arrowup" || k === "w") handleMove("up");
      else if (k === "arrowdown" || k === "s") handleMove("down");
      else if (k === "arrowleft" || k === "a") handleMove("left");
      else if (k === "arrowright" || k === "d") handleMove("right");
      else if (k === "r") resetGame(level);
      else if (k === "1") resetGame(0);
      else if (k === "2") resetGame(1);
      else if (k === "3") resetGame(2);
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [handleMove, level, resetGame]);

  // Terminal Command Input
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    setCommandInput("");

    if (cmd === "help") {
      setHistory((prev) => [
        ...prev.slice(-6),
        "Available commands: [up/u, down/d, left/l, right/r], [level 0|1|2], [restart/r], [clear], [about]",
      ]);
    } else if (cmd === "restart" || cmd === "r") {
      resetGame(level);
    } else if (cmd === "clear") {
      setHistory([]);
    } else if (cmd === "about") {
      setHistory((prev) => [
        ...prev.slice(-6),
        "Author: Mohammed Hossam | Algorithms: A* Search + Manhattan Heuristic",
      ]);
    } else if (cmd === "level 0" || cmd === "easy") {
      resetGame(0);
    } else if (cmd === "level 1" || cmd === "medium") {
      resetGame(1);
    } else if (cmd === "level 2" || cmd === "hard") {
      resetGame(2);
    } else if (["up", "u"].includes(cmd)) {
      handleMove("up");
    } else if (["down", "d"].includes(cmd)) {
      handleMove("down");
    } else if (["left", "l"].includes(cmd)) {
      handleMove("left");
    } else if (["right", "r"].includes(cmd)) {
      handleMove("right");
    } else if (cmd === "astar" || cmd === "algo astar") {
      gameRef.current?.setAlgorithm("astar");
      setGameState(gameRef.current!.getState());
      setHistory((prev) => [...prev.slice(-6), "\x1b[36m>> Switched algorithm to A* Search (Heuristic)\x1b[0m"]);
    } else if (cmd === "dijkstra" || cmd === "algo dijkstra") {
      gameRef.current?.setAlgorithm("dijkstra");
      setGameState(gameRef.current!.getState());
      setHistory((prev) => [...prev.slice(-6), "\x1b[35m>> Switched algorithm to Dijkstra (Uniform Cost)\x1b[0m"]);
    } else if (cmd === "bfs" || cmd === "algo bfs") {
      gameRef.current?.setAlgorithm("bfs");
      setGameState(gameRef.current!.getState());
      setHistory((prev) => [...prev.slice(-6), "\x1b[32m>> Switched algorithm to BFS (Level-Order)\x1b[0m"]);
    } else {
      setHistory((prev) => [
        ...prev.slice(-6),
        `Unknown command '${cmd}'. Type 'help' or use Arrow Keys.`,
      ]);
    }
  };

  const { grid, height, width, moves, status, ratPos, catPos, exitPos } = gameState;
  const distToExit = manhattanDistance(ratPos, exitPos);
  const distToTom = manhattanDistance(ratPos, catPos);

  return (
    <div
      className={`relative flex flex-col rounded-3xl border border-slate-800 bg-[#07090e] shadow-2xl transition-all duration-300 font-mono ${
        isFullscreen
          ? "fixed inset-4 z-50 rounded-2xl h-[calc(100vh-32px)]"
          : "w-full overflow-hidden"
      }`}
    >
      {/* ── Terminal Window Title Bar ── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-[#0d111a] select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
          <div className="w-3 h-3 rounded-full bg-[#eab308]" />
          <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
          <span className="ml-3 text-xs text-slate-400 hidden sm:inline">
            mohammed@portfolio: ~/tom-and-jerry-ai
          </span>
        </div>

        {/* Level Controls & Window Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-xs">
            <button
              onClick={() => resetGame(0)}
              className={`px-2.5 py-0.5 rounded-md transition-colors ${
                level === 0
                  ? "bg-emerald-500/20 text-emerald-400 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => resetGame(1)}
              className={`px-2.5 py-0.5 rounded-md transition-colors ${
                level === 1
                  ? "bg-amber-500/20 text-amber-400 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Med
            </button>
            <button
              onClick={() => resetGame(2)}
              className={`px-2.5 py-0.5 rounded-md transition-colors ${
                level === 2
                  ? "bg-rose-500/20 text-rose-400 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Hard
            </button>
          </div>

          <button
            onClick={() => resetGame(level)}
            title="Restart Game (R)"
            className="p-1.5 rounded-lg border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw size={14} />
          </button>

          <button
            onClick={() => setIsFullscreen((p) => !p)}
            title="Toggle Fullscreen"
            className="p-1.5 rounded-lg border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* ── Terminal HUD Header ── */}
      <div className="px-5 py-2.5 bg-[#0a0d16] border-b border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-4">
          <span>
            Moves: <strong className="text-white">{moves}</strong>
          </span>
          <span>
            Exit Dist: <strong className="text-blue-400">{distToExit}</strong>
          </span>
          <span>
            Tom Dist: <strong className="text-rose-400">{distToTom}</strong>
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline">
            Nodes Checked: <strong className="text-cyan-400">{gameState.nodesExplored}</strong>
          </span>
        </div>

        {/* Algorithm Switcher in Terminal HUD */}
        <div className="flex items-center gap-1.5 rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-[10px]">
          <button
            onClick={() => {
              gameRef.current?.setAlgorithm("astar");
              setGameState(gameRef.current!.getState());
            }}
            className={`px-2 py-0.5 rounded transition-colors ${
              gameState.algorithm === "astar"
                ? "bg-cyan-500/20 text-cyan-300 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            A* Search
          </button>
          <button
            onClick={() => {
              gameRef.current?.setAlgorithm("dijkstra");
              setGameState(gameRef.current!.getState());
            }}
            className={`px-2 py-0.5 rounded transition-colors ${
              gameState.algorithm === "dijkstra"
                ? "bg-purple-500/20 text-purple-300 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Dijkstra
          </button>
          <button
            onClick={() => {
              gameRef.current?.setAlgorithm("bfs");
              setGameState(gameRef.current!.getState());
            }}
            className={`px-2 py-0.5 rounded transition-colors ${
              gameState.algorithm === "bfs"
                ? "bg-emerald-500/20 text-emerald-300 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            BFS
          </button>
        </div>

        <div className="flex items-center gap-2">
          {status === "won" && (
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
              🎉 JERRY ESCAPED!
            </span>
          )}
          {status === "lost" && (
            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold">
              💥 TOM CAUGHT JERRY!
            </span>
          )}
          {status === "playing" && (
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400">
              ⚡ A* PATHFINDING ACTIVE
            </span>
          )}
        </div>
      </div>

      {/* ── Terminal Screen (Pure Native ASCII + ANSI Color Rendering) ── */}
      <div className="flex-1 p-6 bg-[#06080d] flex flex-col items-center justify-center select-none overflow-x-auto min-h-[300px]">
        {/* Render Grid as ASCII tiles */}
        <div className="inline-block border border-slate-800/80 rounded-2xl p-4 bg-[#090d18] shadow-inner">
          <div className="space-y-1">
            {grid.map((row, r) => (
              <div key={r} className="flex items-center justify-center gap-1.5">
                {row.map((cell, c) => {
                  const isJerry = r === ratPos[0] && c === ratPos[1];
                  const isTom = r === catPos[0] && c === catPos[1];
                  const isExit = r === exitPos[0] && c === exitPos[1];

                  return (
                    <div
                      key={`${r}-${c}`}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-150 ${
                        isJerry
                          ? "bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(34,197,94,0.4)] scale-110"
                          : isTom
                          ? "bg-rose-500/20 border-2 border-rose-400 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.4)] scale-110"
                          : isExit
                          ? "bg-blue-500/20 border-2 border-blue-400 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.3)] animate-pulse"
                          : cell === "#"
                          ? "bg-amber-950/40 border border-amber-600/40 text-amber-500"
                          : "bg-slate-900/60 border border-slate-800/60 text-slate-700"
                      }`}
                    >
                      {isJerry && (status === "won" ? "🎉" : "🐭")}
                      {isTom && (status === "lost" ? "💥" : "🐱")}
                      {isExit && !isJerry && "🚪"}
                      {cell === "#" && "🧱"}
                      {cell === "-" && !isJerry && !isTom && !isExit && "·"}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Terminal Log Stream */}
        <div className="mt-4 w-full max-w-lg text-[11px] text-slate-400 space-y-1">
          {history.slice(-3).map((line, i) => (
            <div key={i} className="line-clamp-1">
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* ── Terminal Command Input Line ── */}
      <form
        onSubmit={handleCommandSubmit}
        className="px-5 py-2.5 bg-[#0a0d16] border-t border-slate-800 flex items-center gap-2"
      >
        <span className="text-xs text-emerald-400 font-bold shrink-0">
          user@portfolio:~$
        </span>
        <input
          type="text"
          value={commandInput}
          onChange={(e) => setCommandInput(e.target.value)}
          placeholder="Type command (e.g. 'u', 'd', 'help', 'restart') or use arrow keys"
          className="flex-1 bg-transparent text-xs text-white placeholder-slate-600 focus:outline-none"
        />
        <button
          type="submit"
          className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
        >
          Send
        </button>
      </form>

      {/* ── Virtual D-Pad Gamepad for Mobile & Touch ── */}
      <div className="border-t border-slate-800 bg-[#080a12] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Bot size={15} className="text-cyan-400" />
          <span>
            Controls: <kbd className="px-1 py-0.5 rounded bg-slate-800 text-white">W A S D</kbd> / <kbd className="px-1 py-0.5 rounded bg-slate-800 text-white">Arrows</kbd> / Touch D-Pad
          </span>
        </div>

        <div className="inline-grid grid-cols-3 gap-1.5">
          <div />
          <button
            onClick={() => handleMove("up")}
            aria-label="Up"
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 flex items-center justify-center transition-all border border-slate-700 shadow"
          >
            <ArrowUp size={16} />
          </button>
          <div />
          <button
            onClick={() => handleMove("left")}
            aria-label="Left"
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 flex items-center justify-center transition-all border border-slate-700 shadow"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => handleMove("down")}
            aria-label="Down"
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 flex items-center justify-center transition-all border border-slate-700 shadow"
          >
            <ArrowDown size={16} />
          </button>
          <button
            onClick={() => handleMove("right")}
            aria-label="Right"
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 flex items-center justify-center transition-all border border-slate-700 shadow"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
