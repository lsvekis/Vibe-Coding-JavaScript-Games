
const SIZE = 6;
const DIRS = ["N", "E", "S", "W"];
const OPP = { N: "S", E: "W", S: "N", W: "E" };
const DX = { N: 0, E: 1, S: 0, W: -1 };
const DY = { N: -1, E: 0, S: 1, W: 0 };
const STORAGE_KEY = "circuitNullBest_v1";

const boardEl = document.getElementById("board");
const movesEl = document.getElementById("moves");
const statusEl = document.getElementById("status");
const bestEl = document.getElementById("best");
const logEl = document.getElementById("log");

let grid = [];
let moves = 0;
let best = loadBest();
let solvedOnce = false;

function loadBest() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? Number(raw) : null;
}
function saveBest() {
  localStorage.setItem(STORAGE_KEY, String(best));
}
function log(msg) {
  logEl.innerHTML = `<div>${msg}</div>` + logEl.innerHTML;
}
function key(x, y) { return `${x},${y}`; }

function rotateDirs(dirs) {
  const order = { N: "E", E: "S", S: "W", W: "N" };
  return dirs.map(d => order[d]);
}

function randomInt(n) {
  return Math.floor(Math.random() * n);
}

function createEmptyTile(x, y) {
  return {
    x, y,
    dirs: [],
    source: x === 0 && y === 0,
    core: x === SIZE - 1 && y === SIZE - 1,
  };
}

function generatePath() {
  const path = [{ x: 0, y: 0 }];
  let x = 0, y = 0;
  while (x !== SIZE - 1 || y !== SIZE - 1) {
    const options = [];
    if (x < SIZE - 1) options.push({ x: x + 1, y });
    if (y < SIZE - 1) options.push({ x, y: y + 1 });
    const next = options[randomInt(options.length)];
    path.push(next);
    x = next.x; y = next.y;
  }
  return path;
}

function addConnection(tile, dir) {
  if (!tile.dirs.includes(dir)) tile.dirs.push(dir);
}

function dirBetween(a, b) {
  if (b.x === a.x && b.y === a.y - 1) return "N";
  if (b.x === a.x + 1 && b.y === a.y) return "E";
  if (b.x === a.x && b.y === a.y + 1) return "S";
  if (b.x === a.x - 1 && b.y === a.y) return "W";
}

function generatePuzzle() {
  const tiles = [];
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      tiles.push(createEmptyTile(x, y));
    }
  }

  const path = generatePath();
  const lookup = new Map(tiles.map(t => [key(t.x, t.y), t]));

  // Build guaranteed path
  for (let i = 0; i < path.length; i++) {
    const cur = path[i];
    const tile = lookup.get(key(cur.x, cur.y));
    if (i > 0) {
      const prev = path[i - 1];
      addConnection(tile, dirBetween(cur, prev));
    }
    if (i < path.length - 1) {
      const next = path[i + 1];
      addConnection(tile, dirBetween(cur, next));
    }
  }

  // Add extra side branches to make puzzle more interesting
  for (const tile of tiles) {
    if (tile.source || tile.core) continue;
    if (Math.random() < 0.35 && tile.dirs.length < 3) {
      const choices = DIRS.filter(d => !tile.dirs.includes(d)).filter(d => {
        const nx = tile.x + DX[d];
        const ny = tile.y + DY[d];
        return nx >= 0 && nx < SIZE && ny >= 0 && ny < SIZE;
      });
      if (choices.length) {
        const d = choices[randomInt(choices.length)];
        const nx = tile.x + DX[d];
        const ny = tile.y + DY[d];
        const neighbor = lookup.get(key(nx, ny));
        addConnection(tile, d);
        addConnection(neighbor, OPP[d]);
      }
    }
  }

  // Scramble by rotating each tile randomly, but keep source/core readable
  for (const tile of tiles) {
    const r = randomInt(4);
    for (let i = 0; i < r; i++) tile.dirs = rotateDirs(tile.dirs);
  }

  return tiles;
}

function getTile(x, y) {
  return grid.find(t => t.x === x && t.y === y);
}

function connectedSet() {
  const seen = new Set();
  const queue = [[0, 0]];
  seen.add(key(0, 0));

  while (queue.length) {
    const [x, y] = queue.shift();
    const tile = getTile(x, y);
    for (const d of tile.dirs) {
      const nx = x + DX[d];
      const ny = y + DY[d];
      if (nx < 0 || nx >= SIZE || ny < 0 || ny >= SIZE) continue;
      const neighbor = getTile(nx, ny);
      if (!neighbor.dirs.includes(OPP[d])) continue;
      const k = key(nx, ny);
      if (!seen.has(k)) {
        seen.add(k);
        queue.push([nx, ny]);
      }
    }
  }
  return seen;
}

function isSolved() {
  return connectedSet().has(key(SIZE - 1, SIZE - 1));
}

function tileGlyph(tile) {
  const dirs = [...tile.dirs].sort().join("");
  const map = {
    "NS": "│",
    "EW": "─",
    "EN": "└",
    "ES": "┌",
    "SW": "┐",
    "NW": "┘",
    "ENS": "├",
    "ESW": "┬",
    "NSW": "┤",
    "ENW": "┴",
    "ENSW": "┼"
  };
  if (tile.source) return "S";
  if (tile.core) return "C";
  return map[dirs] || "•";
}

function render() {
  const connected = connectedSet();
  boardEl.innerHTML = "";
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const tile = getTile(x, y);
      const btn = document.createElement("button");
      btn.className = "tile";
      if (tile.source) btn.classList.add("source");
      if (tile.core) btn.classList.add("core");
      if (connected.has(key(x, y))) btn.classList.add("connected");

      // wire segments
      const center = document.createElement("div");
      center.className = "wire center" + (connected.has(key(x, y)) ? " active" : "");
      btn.appendChild(center);

      for (const d of ["n","e","s","w"]) {
        const seg = document.createElement("div");
        const isPresent = tile.dirs.includes(d.toUpperCase());
        seg.className = "wire " + d + (isPresent && connected.has(key(x, y)) ? " active" : "");
        if (!isPresent) seg.style.display = "none";
        btn.appendChild(seg);
      }

      const label = document.createElement("div");
      label.className = "tile-label";
      label.textContent = tileGlyph(tile);
      btn.appendChild(label);

      btn.addEventListener("click", () => {
        if (isSolved()) return;
        tile.dirs = rotateDirs(tile.dirs);
        moves++;
        render();
        if (isSolved()) {
          statusEl.textContent = "ONLINE";
          if (best === null || moves < best) {
            best = moves;
            saveBest();
          }
          bestEl.textContent = best ?? "—";
          if (!solvedOnce) {
            log(`Core connected in ${moves} moves.`);
            solvedOnce = true;
          }
        }
      });

      boardEl.appendChild(btn);
    }
  }
  movesEl.textContent = moves;
  statusEl.textContent = isSolved() ? "ONLINE" : "OFFLINE";
  bestEl.textContent = best ?? "—";
}

function newGame() {
  grid = generatePuzzle();
  moves = 0;
  solvedOnce = false;
  render();
  log("Grid scrambled. Route power from S to C.");
}

function hint() {
  if (isSolved()) return;
  const disconnected = grid.filter(t => !connectedSet().has(key(t.x, t.y)));
  if (!disconnected.length) return;
  const tile = disconnected[Math.floor(Math.random() * disconnected.length)];
  const buttons = [...boardEl.children];
  const index = tile.y * SIZE + tile.x;
  buttons[index].classList.add("hint");
  setTimeout(() => buttons[index]?.classList.remove("hint"), 900);
  log("Hint: look for a tile that should connect to the powered path.");
}

document.getElementById("newGameBtn").addEventListener("click", newGame);
document.getElementById("hintBtn").addEventListener("click", hint);

newGame();
