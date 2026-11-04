// =============================================================================
// Tom & Jerry Game Engine — TypeScript Port of Mohammed Hossam's Game.py
// =============================================================================
// Features exact A* (A-Star) search algorithm with Manhattan distance heuristic,
// dynamic map generation per difficulty level, and ANSI terminal color formatting.
// =============================================================================

export type GridPosition = [number, number];

export type GameLevel = 0 | 1 | 2; // 0 = Easy, 1 = Medium, 2 = Hard

export type GameStatus = "idle" | "playing" | "won" | "lost";

export interface GameState {
  height: number;
  width: number;
  grid: string[][];
  catPos: GridPosition;
  ratPos: GridPosition;
  exitPos: GridPosition;
  obstacles: GridPosition[];
  level: GameLevel;
  status: GameStatus;
  moves: number;
  lastTomPath: GridPosition[];
}

// ─── Manhattan Distance Heuristic ────────────────────────────────────────────

export function manhattanDistance(a: GridPosition, b: GridPosition): number {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

// ─── Map Generator (Port of Maps.py) ─────────────────────────────────────────

export function generateMap(level: GameLevel) {
  let width = 7;
  let height = 7;
  let obstacleCount = 2;

  if (level === 0) {
    width = Math.floor(Math.random() * 3) + 6; // 6 - 8
    height = Math.floor(Math.random() * 3) + 6;
    obstacleCount = Math.floor(Math.random() * 2) + 2;
  } else if (level === 1) {
    width = Math.floor(Math.random() * 3) + 9; // 9 - 11
    height = Math.floor(Math.random() * 3) + 8;
    obstacleCount = Math.floor(Math.random() * 3) + 4;
  } else {
    width = Math.floor(Math.random() * 3) + 11; // 11 - 13
    height = Math.floor(Math.random() * 3) + 9;
    obstacleCount = Math.floor(Math.random() * 4) + 6;
  }

  // Generate exit position
  const exit: GridPosition = [
    Math.floor(Math.random() * height),
    Math.floor(Math.random() * width),
  ];

  // Generate rat (Jerry) position
  let rat: GridPosition = [0, 0];
  while (true) {
    rat = [
      Math.floor(Math.random() * height),
      Math.floor(Math.random() * width),
    ];
    if (rat[0] !== exit[0] || rat[1] !== exit[1]) break;
  }

  // Generate cat (Tom) position with minimum distance
  let cat: GridPosition = [0, 0];
  while (true) {
    cat = [
      Math.floor(Math.random() * height),
      Math.floor(Math.random() * width),
    ];
    const distToRat = manhattanDistance(cat, rat);
    const distRatToExit = manhattanDistance(rat, exit);
    const distCatToExit = manhattanDistance(cat, exit);

    if (
      (cat[0] !== exit[0] || cat[1] !== exit[1]) &&
      (cat[0] !== rat[0] || cat[1] !== rat[1]) &&
      distToRat > (level === 0 ? 2 : 3) &&
      distRatToExit <= distCatToExit
    ) {
      break;
    }
  }

  // Generate obstacles
  const obstacles: GridPosition[] = [];
  for (let i = 0; i < obstacleCount; i++) {
    for (let attempts = 0; attempts < 50; attempts++) {
      const obs: GridPosition = [
        Math.floor(Math.random() * height),
        Math.floor(Math.random() * width),
      ];
      const isColliding =
        (obs[0] === exit[0] && obs[1] === exit[1]) ||
        (obs[0] === rat[0] && obs[1] === rat[1]) ||
        (obs[0] === cat[0] && obs[1] === cat[1]) ||
        obstacles.some((o) => o[0] === obs[0] && o[1] === obs[1]);

      if (!isColliding) {
        obstacles.push(obs);
        break;
      }
    }
  }

  return { height, width, exit, rat, cat, obstacles };
}

// ─── A* Pathfinding Search Algorithm (Port of Game.py) ──────────────────────

export function findAStarPath(
  start: GridPosition,
  end: GridPosition,
  gridHeight: number,
  gridWidth: number,
  obstacles: GridPosition[]
): GridPosition[] {
  const obstacleSet = new Set(obstacles.map((o) => `${o[0]},${o[1]}`));

  function isValid(pos: GridPosition): boolean {
    return (
      pos[0] >= 0 &&
      pos[0] < gridHeight &&
      pos[1] >= 0 &&
      pos[1] < gridWidth &&
      !obstacleSet.has(`${pos[0]},${pos[1]}`)
    );
  }

  function getNeighbours(pos: GridPosition): GridPosition[] {
    const directions: GridPosition[] = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    const neighbours: GridPosition[] = [];
    for (const [di, dj] of directions) {
      const nextPos: GridPosition = [pos[0] + di, pos[1] + dj];
      if (isValid(nextPos)) {
        neighbours.push(nextPos);
      }
    }
    return neighbours;
  }

  const openList: GridPosition[] = [start];
  const closedSet = new Set<string>();
  const cameFrom = new Map<string, GridPosition>();

  const gScore = new Map<string, number>();
  gScore.set(`${start[0]},${start[1]}`, 0);

  const fScore = new Map<string, number>();
  fScore.set(`${start[0]},${start[1]}`, manhattanDistance(start, end));

  while (openList.length > 0) {
    // Pick node with lowest fScore
    let lowestIdx = 0;
    let lowestVal = Infinity;
    for (let i = 0; i < openList.length; i++) {
      const key = `${openList[i][0]},${openList[i][1]}`;
      const score = fScore.get(key) ?? Infinity;
      if (score < lowestVal) {
        lowestVal = score;
        lowestIdx = i;
      }
    }

    const current = openList[lowestIdx];
    const currentKey = `${current[0]},${current[1]}`;

    if (current[0] === end[0] && current[1] === end[1]) {
      // Reconstruct path
      const path: GridPosition[] = [];
      let curr: GridPosition | undefined = current;
      while (curr && cameFrom.has(`${curr[0]},${curr[1]}`)) {
        path.unshift(curr);
        curr = cameFrom.get(`${curr[0]},${curr[1]}`);
      }
      return path;
    }

    openList.splice(lowestIdx, 1);
    closedSet.add(currentKey);

    for (const neighbour of getNeighbours(current)) {
      const neighbourKey = `${neighbour[0]},${neighbour[1]}`;
      if (closedSet.has(neighbourKey)) continue;

      const tentativeGScore = (gScore.get(currentKey) ?? 0) + 1;
      const existingGScore = gScore.get(neighbourKey) ?? Infinity;

      if (!openList.some((p) => p[0] === neighbour[0] && p[1] === neighbour[1])) {
        openList.push(neighbour);
      } else if (tentativeGScore >= existingGScore) {
        continue;
      }

      cameFrom.set(neighbourKey, current);
      gScore.set(neighbourKey, tentativeGScore);
      fScore.set(
        neighbourKey,
        tentativeGScore + manhattanDistance(neighbour, end)
      );
    }
  }

  return [];
}

// ─── Game Controller Class ───────────────────────────────────────────────────

export class TomAndJerryGame {
  private state: GameState;

  constructor(level: GameLevel = 0) {
    const map = generateMap(level);
    const grid: string[][] = Array.from({ length: map.height }, () =>
      Array.from({ length: map.width }, () => "-")
    );

    grid[map.cat[0]][map.cat[1]] = "T";
    grid[map.rat[0]][map.rat[1]] = "J";
    grid[map.exit[0]][map.exit[1]] = "E";
    for (const obs of map.obstacles) {
      grid[obs[0]][obs[1]] = "#";
    }

    this.state = {
      height: map.height,
      width: map.width,
      grid,
      catPos: map.cat,
      ratPos: map.rat,
      exitPos: map.exit,
      obstacles: map.obstacles,
      level,
      status: "playing",
      moves: 0,
      lastTomPath: [],
    };
  }

  public getState(): GameState {
    return { ...this.state };
  }

  public moveRat(direction: "up" | "down" | "left" | "right"): {
    moved: boolean;
    state: GameState;
  } {
    if (this.state.status !== "playing") {
      return { moved: false, state: this.getState() };
    }

    const { ratPos, height, width, grid } = this.state;
    let nextPos: GridPosition = [ratPos[0], ratPos[1]];

    if (direction === "up") nextPos = [ratPos[0] - 1, ratPos[1]];
    else if (direction === "down") nextPos = [ratPos[0] + 1, ratPos[1]];
    else if (direction === "left") nextPos = [ratPos[0], ratPos[1] - 1];
    else if (direction === "right") nextPos = [ratPos[0], ratPos[1] + 1];

    // Validate boundaries and obstacles
    if (
      nextPos[0] < 0 ||
      nextPos[0] >= height ||
      nextPos[1] < 0 ||
      nextPos[1] >= width ||
      grid[nextPos[0]][nextPos[1]] === "#"
    ) {
      return { moved: false, state: this.getState() };
    }

    // Move Jerry
    grid[ratPos[0]][ratPos[1]] = "-";
    this.state.ratPos = nextPos;
    this.state.moves += 1;

    // Check Win Condition: Jerry reached Exit
    if (nextPos[0] === this.state.exitPos[0] && nextPos[1] === this.state.exitPos[1]) {
      grid[nextPos[0]][nextPos[1]] = "W";
      this.state.status = "won";
      return { moved: true, state: this.getState() };
    }

    grid[nextPos[0]][nextPos[1]] = "J";

    // Tom's Turn (AI move using A*)
    this.moveCat();

    return { moved: true, state: this.getState() };
  }

  private moveCat() {
    const { catPos, ratPos, exitPos, height, width, obstacles, grid } =
      this.state;

    // Run A* path to Jerry and path to Exit
    const pathToRat = findAStarPath(catPos, ratPos, height, width, obstacles);
    const pathToExit = findAStarPath(catPos, exitPos, height, width, obstacles);

    this.state.lastTomPath = pathToRat;

    let nextCatPos = catPos;
    const distToRat = pathToRat.length;
    const distToExit = pathToExit.length;

    if (distToRat <= 1) {
      // Tom catches Jerry!
      nextCatPos = ratPos;
      grid[catPos[0]][catPos[1]] = "-";
      this.state.catPos = nextCatPos;
      grid[nextCatPos[0]][nextCatPos[1]] = "X";
      this.state.status = "lost";
      return;
    }

    if (distToRat < distToExit) {
      nextCatPos = pathToRat[0] || catPos;
    } else {
      if (distToExit <= 1) {
        nextCatPos = exitPos;
      } else {
        nextCatPos = pathToExit[0] || catPos;
      }
    }

    // Move Tom
    grid[catPos[0]][catPos[1]] = "-";
    this.state.catPos = nextCatPos;

    // Check if Tom caught Jerry on this step
    if (nextCatPos[0] === this.state.ratPos[0] && nextCatPos[1] === this.state.ratPos[1]) {
      grid[nextCatPos[0]][nextCatPos[1]] = "X";
      this.state.status = "lost";
    } else {
      grid[nextCatPos[0]][nextCatPos[1]] = "T";
    }
  }

  // ─── ANSI Terminal Renderer ────────────────────────────────────────────────

  public renderAnsi(): string {
    const { grid, height, width, level, moves, status, ratPos, catPos, exitPos } =
      this.state;

    const levelStr =
      level === 0 ? "\x1b[92mEasy\x1b[0m" : level === 1 ? "\x1b[93mMedium\x1b[0m" : "\x1b[91mHard\x1b[0m";

    let out = "\x1b[2J\x1b[H"; // Clear screen + cursor to top
    out += `\x1b[1;96m╔══════════════════════════════════════════════════════════╗\x1b[0m\r\n`;
    out += `\x1b[1;96m║\x1b[0m  \x1b[1;97mTOM & JERRY\x1b[0m — \x1b[93mA* Search AI Engine\x1b[0m                     \x1b[1;96m║\x1b[0m\r\n`;
    out += `\x1b[1;96m║\x1b[0m  Level: ${levelStr}  |  Moves: \x1b[97m${String(moves).padStart(3, "0")}\x1b[0m  |  Dist to Exit: \x1b[94m${manhattanDistance(ratPos, exitPos)}\x1b[0m   \x1b[1;96m║\x1b[0m\r\n`;
    out += `\x1b[1;96m╚══════════════════════════════════════════════════════════╝\x1b[0m\r\n\r\n`;

    // Render Grid with ANSI colors
    for (let i = 0; i < height; i++) {
      out += "   ";
      for (let j = 0; j < width; j++) {
        const cell = grid[i][j];
        if (cell === "J") {
          out += "\x1b[1;92m🐭\x1b[0m "; // Jerry (Mouse)
        } else if (cell === "T") {
          out += "\x1b[1;91m🐱\x1b[0m "; // Tom (Cat)
        } else if (cell === "E") {
          out += "\x1b[1;94m🚪\x1b[0m "; // Exit door
        } else if (cell === "#") {
          out += "\x1b[1;33m🧱\x1b[0m "; // Obstacle brick
        } else if (cell === "W") {
          out += "\x1b[1;92m🎉\x1b[0m "; // Win celebration
        } else if (cell === "X") {
          out += "\x1b[1;91m💥\x1b[0m "; // Caught
        } else {
          out += "\x1b[90m ·\x1b[0m "; // Floor dot
        }
      }
      out += "\r\n";
    }

    out += "\r\n";

    if (status === "won") {
      out += `\x1b[1;92m🎉 WOW! YOU WON! Jerry escaped in ${moves} moves!\x1b[0m\r\n`;
      out += `\x1b[90mPress [R] to restart or [1, 2, 3] to change difficulty.\x1b[0m\r\n`;
    } else if (status === "lost") {
      out += `\x1b[1;91m💥 GAME OVER! Tom's A* Pathfinding caught Jerry!\x1b[0m\r\n`;
      out += `\x1b[90mPress [R] to try again or [1, 2, 3] for another level.\x1b[0m\r\n`;
    } else {
      out += `\x1b[97mControls:\x1b[0m \x1b[93m[W/A/S/D]\x1b[0m or \x1b[93m[Arrow Keys]\x1b[0m to move Jerry. [R] restart.\r\n`;
    }

    return out;
  }
}
