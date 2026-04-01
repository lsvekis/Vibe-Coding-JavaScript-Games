
const canvas = document.getElementById("arena");
const ctx = canvas.getContext("2d");
const ui = {
  playerHp: document.getElementById("playerHp"),
  enemyHp: document.getElementById("enemyHp"),
  momentum: document.getElementById("momentum"),
  enemyState: document.getElementById("enemyState"),
  banner: document.getElementById("banner"),
  log: document.getElementById("log"),
};

let keys = {};
let state;

function resetArena() {
  state = {
    player: { x: 90, y: 210, size: 24, health: 100, energy: 40, momentum: 0, cooldown: 0, heavyCooldown: 0 },
    enemy: { x: 580, y: 210, size: 24, health: 100, aggression: 0.6, state: "approach", cooldown: 0 },
    running: true,
    result: "",
    tick: 0
  };
  ui.log.innerHTML = "";
  addLog("Arena reset. Engage the opponent.", "neutral");
  setBanner("Move with arrow keys or WASD. Press space to attack when close.", "neutral");
  renderHUD();
}
function addLog(text, kind="neutral") {
  const row = document.createElement("div");
  row.className = "history-item";
  row.textContent = text;
  ui.log.prepend(row);
  while (ui.log.children.length > 12) ui.log.removeChild(ui.log.lastChild);
}
function setBanner(text, kind="neutral") {
  ui.banner.className = `result-banner ${kind}`;
  ui.banner.textContent = text;
}
function clamp(v,min,max){return Math.max(min,Math.min(max,v))}
function distanceBetween(a,b){const dx=a.x-b.x, dy=a.y-b.y; return Math.sqrt(dx*dx+dy*dy)}

function playerAttack(mult=1) {
  if (!state.running) return;
  if (mult === 1 && state.player.cooldown > 0) return;
  if (mult > 1 && state.player.heavyCooldown > 0) return;
  const dist = distanceBetween(state.player, state.enemy);
  if (mult === 1) state.player.cooldown = 18; else state.player.heavyCooldown = 90;

  if (dist < 60) {
    const dmg = mult === 1 ? 10 : 18;
    state.enemy.health -= dmg;
    state.player.momentum += mult === 1 ? 8 : 14;
    addLog(mult === 1 ? `Player lands a strike for ${dmg}.` : `Heavy strike connects for ${dmg}.`, "neutral");
    setBanner("Clean hit. Keep pressure on the enemy.", "win");
  } else {
    state.player.momentum = Math.max(0, state.player.momentum - 4);
    addLog("The attack whiffs. Distance still matters.", "neutral");
    setBanner("Missed. Reposition before committing again.", "lose");
  }
  checkOutcome();
}
function updateCooldowns() {
  if (state.player.cooldown > 0) state.player.cooldown--;
  if (state.player.heavyCooldown > 0) state.player.heavyCooldown--;
  if (state.enemy.cooldown > 0) state.enemy.cooldown--;
}
function updateMomentum() {
  state.player.momentum = Math.max(0, state.player.momentum - 0.06);
  state.enemy.aggression = state.player.momentum > 30 ? 0.85 : 0.6;
}
function approach() {
  if (state.enemy.x > state.player.x) state.enemy.x -= 2.7;
  else state.enemy.x += 2.7;
  if (state.enemy.y > state.player.y) state.enemy.y -= 1.8;
  else state.enemy.y += 1.8;
}
function retreat() {
  if (state.enemy.x > state.player.x) state.enemy.x += 2.9;
  else state.enemy.x -= 2.9;
  if (state.enemy.y > state.player.y) state.enemy.y += 1.5;
  else state.enemy.y -= 1.5;
}
function enemyAttack() {
  if (state.enemy.cooldown > 0) return;
  const dist = distanceBetween(state.enemy, state.player);
  if (dist < 58) {
    const dmg = state.enemy.aggression > 0.8 ? 11 : 8;
    state.player.health -= dmg;
    state.enemy.cooldown = state.enemy.aggression > 0.8 ? 18 : 24;
    addLog(`Enemy hits for ${dmg}.`, "neutral");
    setBanner("The opponent breaks through your guard.", "lose");
  }
}
function enemyDecision() {
  const dist = distanceBetween(state.enemy, state.player);

  if (state.enemy.health < 28) {
    state.enemy.state = "retreat";
    retreat();
    return;
  }
  if (state.player.health < 35 && dist < 95) {
    state.enemy.state = "pressure";
    approach();
    enemyAttack();
    return;
  }
  if (dist > 75) {
    state.enemy.state = "approach";
    approach();
    return;
  }
  state.enemy.state = "attack";
  enemyAttack();
}
function clampActors() {
  state.player.x = clamp(state.player.x, 18, canvas.width - 42);
  state.player.y = clamp(state.player.y, 40, canvas.height - 42);
  state.enemy.x = clamp(state.enemy.x, 18, canvas.width - 42);
  state.enemy.y = clamp(state.enemy.y, 40, canvas.height - 42);
}
function checkOutcome() {
  if (state.player.health <= 0) {
    state.running = false;
    state.result = "You fall in the arena. The opponent controlled the tempo.";
    setBanner(state.result, "lose");
    addLog(state.result, "neutral");
  } else if (state.enemy.health <= 0) {
    state.running = false;
    state.result = "Victory. Your pressure and timing overwhelm the arena AI.";
    setBanner(state.result, "win");
    addLog(state.result, "neutral");
  }
}
function handleInput() {
  if (!state.running) return;
  const p = state.player;
  if (keys["ArrowLeft"] || keys["a"]) p.x -= 3.2;
  if (keys["ArrowRight"] || keys["d"]) p.x += 3.2;
  if (keys["ArrowUp"] || keys["w"]) p.y -= 3.2;
  if (keys["ArrowDown"] || keys["s"]) p.y += 3.2;
}
function update() {
  if (!state.running) return;
  state.tick++;
  handleInput();
  updateCooldowns();
  updateMomentum();
  enemyDecision();
  clampActors();
  checkOutcome();
}
function drawActor(a, color) {
  ctx.fillStyle = color;
  ctx.fillRect(a.x, a.y, a.size, a.size);
}
function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle = "rgba(125,211,252,.14)";
  ctx.strokeRect(16, 36, canvas.width - 32, canvas.height - 52);

  // show enemy pressure ring
  ctx.beginPath();
  ctx.arc(state.enemy.x + 12, state.enemy.y + 12, 70, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(251,113,133,.16)";
  ctx.stroke();

  drawActor(state.player, "#7dd3fc");
  drawActor(state.enemy, "#fb7185");

  ctx.fillStyle = "#e2e8f0";
  ctx.font = "14px Inter, sans-serif";
  ctx.fillText("Player", state.player.x - 4, state.player.y - 8);
  ctx.fillText("Enemy", state.enemy.x - 2, state.enemy.y - 8);
}
function renderHUD() {
  ui.playerHp.textContent = Math.max(0, Math.round(state.player.health));
  ui.enemyHp.textContent = Math.max(0, Math.round(state.enemy.health));
  ui.momentum.textContent = Math.round(state.player.momentum);
  ui.enemyState.textContent = state.enemy.state;
}
function loop() {
  update();
  draw();
  renderHUD();
  requestAnimationFrame(loop);
}
document.addEventListener("keydown", e => {
  keys[e.key] = true;
  if (e.key === " "){ e.preventDefault(); playerAttack(1); }
});
document.addEventListener("keyup", e => keys[e.key] = false);
document.getElementById("heavyBtn").addEventListener("click", () => playerAttack(2));
document.getElementById("resetBtn").addEventListener("click", resetArena);

resetArena();
loop();
