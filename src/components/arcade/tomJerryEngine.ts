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
      // Reconstruct path: list of steps leading from start to end (excluding start)
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

// ─── Map Generator (Port of Maps.py with guaranteed convergence) ────────────

export function generateMap(level: GameLevel) {
  let width = 7;
  let height = 7;
  let obstacleCount = 2;

  if (level === 0) {
    width = 7;
    height = 7;
    obstacleCount = 2;
  } else if (level === 1) {
    width = 9;
    height = 8;
    obstacleCount = 4;
  } else {
    width = 11;
    height = 9;
    obstacleCount = 7;
  }

  // 1. Pick Exit position
  const exit: GridPosition = [
    Math.floor(Math.random() * height),
    Math.floor(Math.random() * width),
  ];

  // 2. Pick Jerry (rat) position: moderate distance from exit (e.g. 2 to 4 steps)
  // so Jerry has a head start and Tom can start further away
  let rat: GridPosition = [0, 0];
  let ratFound = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    const candidate: GridPosition = [
      Math.floor(Math.random() * height),
      Math.floor(Math.random() * width),
    ];
    const distToExit = manhattanDistance(candidate, exit);
    const maxRatDist = Math.max(2, Math.floor((width + height) * 0.4));
    if (
      (candidate[0] !== exit[0] || candidate[1] !== exit[1]) &&
      distToExit >= 2 &&
      distToExit <= maxRatDist
    ) {
      rat = candidate;
      ratFound = true;
      break;
    }
  }

  if (!ratFound) {
    rat = [(exit[0] + 2) % height, (exit[1] + 2) % width];
    if (rat[0] === exit[0] && rat[1] === exit[1]) {
      rat = [(exit[0] + 1) % height, exit[1]];
    }
  }

  // 3. Pick Tom (cat) position: strictly farther from exit than rat, and dist(cat, rat) >= minDistance
  const minDistToRat = level === 0 ? 3 : level === 1 ? 4 : 5;
  const distRatExit = manhattanDistance(rat, exit);
  let cat: GridPosition = [0, 0];
  let catFound = false;

  for (let attempt = 0; attempt < 200; attempt++) {
    const candidate: GridPosition = [
      Math.floor(Math.random() * height),
      Math.floor(Math.random() * width),
    ];
    const distCatExit = manhattanDistance(candidate, exit);
    const distCatRat = manhattanDistance(candidate, rat);

    if (
      (candidate[0] !== exit[0] || candidate[1] !== exit[1]) &&
      (candidate[0] !== rat[0] || candidate[1] !== rat[1]) &&
      distCatRat >= minDistToRat &&
      distCatExit > distRatExit
    ) {
      cat = candidate;
      catFound = true;
      break;
    }
  }

  if (!catFound) {
    // Guaranteed fallback: opposite corner
    cat = [height - 1 - exit[0], width - 1 - exit[1]];
    if ((cat[0] === rat[0] && cat[1] === rat[1]) || (cat[0] === exit[0] && cat[1] === exit[1])) {
      cat = [(cat[0] + 2) % height, (cat[1] + 2) % width];
    }
  }

  // 4. Generate obstacles: ensure they never block Jerry from Exit
  const obstacles: GridPosition[] = [];
  for (let i = 0; i < obstacleCount; i++) {
    for (let attempts = 0; attempts < 30; attempts++) {
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
        // Ensure path from Jerry to Exit remains solvable
        const testPath = findAStarPath(rat, exit, height, width, [...obstacles, obs]);
        if (testPath.length > 0) {
          obstacles.push(obs);
          break;
        }
      }
    }
  }

  return { height, width, exit, rat, cat, obstacles };
}

export const DEFAULT_MAPS: Record<
  GameLevel,
  {
    height: number;
    width: number;
    exit: GridPosition;
    rat: GridPosition;
    cat: GridPosition;
    obstacles: GridPosition[];
  }
> = {
  0: {
    height: 7,
    width: 7,
    exit: [0, 6],
    rat: [2, 3],
    cat: [6, 0],
    obstacles: [
      [3, 2],
      [4, 4],
    ],
  },
  1: {
    height: 8,
    width: 9,
    exit: [0, 8],
    rat: [3, 4],
    cat: [7, 0],
    obstacles: [
      [2, 2],
      [4, 5],
      [5, 2],
      [6, 6],
    ],
  },
  2: {
    height: 9,
    width: 11,
    exit: [0, 10],
    rat: [4, 5],
    cat: [8, 0],
    obstacles: [
      [2, 3],
      [3, 7],
      [5, 4],
      [6, 8],
      [7, 2],
    ],
  },
};

// ─── Game Controller Class ───────────────────────────────────────────────────

export class TomAndJerryGame {
  private state: GameState;

  constructor(level: GameLevel = 0, randomize: boolean = false) {
    const map = randomize ? generateMap(level) : DEFAULT_MAPS[level];
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
    const { catPos, ratPos, exitPos, height, width, obstacles, grid } = this.state;

    // Run A* path to Jerry and path to Exit
    const pathToRat = findAStarPath(catPos, ratPos, height, width, obstacles);
    const pathToExit = findAStarPath(catPos, exitPos, height, width, obstacles);

    this.state.lastTomPath = pathToRat;

    let nextCatPos = catPos;

    // Case 1: Tom is 1 step away from Jerry -> Caught!
    if (pathToRat.length === 1) {
      nextCatPos = pathToRat[0];
      grid[catPos[0]][catPos[1]] = "-";
      this.state.catPos = nextCatPos;
      grid[nextCatPos[0]][nextCatPos[1]] = "X";
      this.state.status = "lost";
      return;
    }

    // Case 2: Tom has a path to Jerry > 1 step
    if (pathToRat.length > 1) {
      // If path to exit is blocked or path to Jerry is shorter/equal, pursue Jerry
      if (pathToExit.length === 0 || pathToRat.length <= pathToExit.length) {
        nextCatPos = pathToRat[0];
      } else {
        // Otherwise head towards exit to intercept Jerry
        nextCatPos = pathToExit[0];
      }
    } else if (pathToExit.length > 0) {
      // Jerry is unreachable, move towards exit
      nextCatPos = pathToExit[0];
    } else {
      // Both unreachable, stay in place
      nextCatPos = catPos;
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
    const { grid, height, width, status, moves, catPos, ratPos, exitPos } =
      this.state;

    let out = "\x1b[2J\x1b[H"; // Clear screen & move to top
    out += "\x1b[1;36m=== TOM & JERRY A* SEARCH ARENA ===\x1b[0m\r\n";
    out += `\x1b[90mMoves: \x1b[97m${moves}\x1b[90m | Jerry: \x1b[92m(${ratPos[0]},${ratPos[1]})\x1b[90m | Tom: \x1b[91m(${catPos[0]},${catPos[1]})\x1b[90m | Exit: \x1b[94m(${exitPos[0]},${exitPos[1]})\x1b[0m\r\n\r\n`;

    for (let i = 0; i < height; i++) {
      let rowStr = "  ";
      for (let j = 0; j < width; j++) {
        const cell = grid[i][j];
        if (cell === "J") {
          rowStr += "\x1b[1;92m🐭 \x1b[0m";
        } else if (cell === "T") {
          rowStr += "\x1b[1;91m🐱 \x1b[0m";
        } else if (cell === "E") {
          rowStr += "\x1b[1;94m🚪 \x1b[0m";
        } else if (cell === "#") {
          rowStr += "\x1b[33m🧱 \x1b[0m";
        } else if (cell === "W") {
          rowStr += "\x1b[1;92m🎉 \x1b[0m";
        } else if (cell === "X") {
          rowStr += "\x1b[1;91m💥 \x1b[0m";
        } else {
          rowStr += "\x1b[90m · \x1b[0m";
        }
      }
      out += rowStr + "\r\n";
    }

    out += "\r\n";

    if (status === "won") {
      out += "\x1b[1;92m🎉 WOW! Jerry reached the exit safely! YOU WON!\x1b[0m\r\n";
      out += "\x1b[90mPress [R] to play again.\x1b[0m\r\n";
    } else if (status === "lost") {
      out += "\x1b[1;91m💥 GAME OVER! Tom intercepted Jerry with A* search!\x1b[0m\r\n";
      out += "\x1b[90mPress [R] to try again.\x1b[0m\r\n";
    } else {
      out +=
        "\x1b[90mControls: \x1b[97m[W/A/S/D]\x1b[90m or \x1b[97m[Arrow Keys]\x1b[90m | Restart: \x1b[97m[R]\x1b[0m\r\n";
    }

    return out;
  }
}
