
const STORAGE_KEY = "blacksiteBroadcastFixed_v1";

const defaultState = () => ({
  signal: 58,
  power: 62,
  panic: 24,
  audience: 18,
  night: 1,
  actionsLeft: 3,
  gameOver: false,
  log: ["Night one begins. The station hums beneath the storm."]
});

let state = loadState();

const ui = {
  signalStat: document.getElementById("signalStat"),
  powerStat: document.getElementById("powerStat"),
  panicStat: document.getElementById("panicStat"),
  audienceStat: document.getElementById("audienceStat"),
  nightStat: document.getElementById("nightStat"),
  actionsStat: document.getElementById("actionsStat"),
  signalBar: document.getElementById("signalBar"),
  powerBar: document.getElementById("powerBar"),
  panicBar: document.getElementById("panicBar"),
  audienceBar: document.getElementById("audienceBar"),
  banner: document.getElementById("banner"),
  log: document.getElementById("log"),
};

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultState();
  } catch {
    return defaultState();
  }
}
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function addLog(text, kind = "warn") {
  state.log.unshift(JSON.stringify({ text, kind }));
  state.log = state.log.slice(0, 20);
}

function unpackLog(item) {
  try { return JSON.parse(item); } catch { return { text: item, kind: "warn" }; }
}

function applyAction(type) {
  if (state.gameOver || state.actionsLeft <= 0) return;

  const actions = {
    boost() {
      state.signal += 16;
      state.power -= 9;
      state.panic += 6;
      state.audience += 4;
      addLog("Boosted the signal. More viewers tuned in, but the station strained under the load.", "good");
      ui.banner.className = "result-banner win";
      ui.banner.textContent = "Signal boosted. The audience grows, but tension rises in the room.";
    },
    stabilize() {
      state.signal += 8;
      state.power -= 4;
      state.panic -= 4;
      addLog("Stabilized the feed. The channel looks cleaner and the room feels calmer.", "good");
      ui.banner.className = "result-banner neutral";
      ui.banner.textContent = "Feed stabilized. The station holds together for now.";
    },
    calm() {
      state.panic -= 15;
      state.signal -= 6;
      state.audience -= 2;
      addLog("Calmed the audience with controlled messaging. Fear dropped, but the broadcast lost intensity.", "good");
      ui.banner.className = "result-banner neutral";
      ui.banner.textContent = "Audience steadied. Panic falls, but reach softens.";
    },
    reroute() {
      state.power += 15;
      state.signal -= 7;
      state.panic += 3;
      addLog("Rerouted power into the relay banks. Reserves recovered, but the signal flickered.", "warn");
      ui.banner.className = "result-banner neutral";
      ui.banner.textContent = "Power rerouted. The station can breathe again, but the image weakens.";
    },
    purge() {
      state.signal += 5;
      state.power -= 7;
      state.panic -= 8;
      state.audience -= 1;
      addLog("Purged spectral interference from the towers. The noise subsided at a cost.", "good");
      ui.banner.className = "result-banner neutral";
      ui.banner.textContent = "Interference purged. Panic drops and the signal clears.";
    }
  };

  actions[type]?.();
  state.actionsLeft -= 1;
  normalize();
  checkGameOver();
  saveState();
  render();
}

function normalize() {
  state.signal = clamp(state.signal, 0, 100);
  state.power = clamp(state.power, 0, 100);
  state.panic = clamp(state.panic, 0, 100);
  state.audience = clamp(state.audience, 0, 100);
}

function nightlyEvent() {
  const events = [
    {
      text: "A whisperstorm rolls over the antenna array. Panic rises and power bleeds away.",
      apply() { state.panic += 11; state.power -= 8; state.signal -= 3; }
    },
    {
      text: "An echo surge amplifies the station. Signal rises, but the audience edges closer to fear.",
      apply() { state.signal += 12; state.panic += 7; state.audience += 5; }
    },
    {
      text: "Cold static settles into the cables. Power returns slightly, but the feed dims.",
      apply() { state.power += 10; state.signal -= 8; }
    },
    {
      text: "A clear window opens through the storm. More listeners find the station.",
      apply() { state.audience += 8; state.signal += 4; state.panic += 2; }
    },
    {
      text: "The control room lights shudder. Everyone feels it. Panic rises fast.",
      apply() { state.panic += 14; state.power -= 4; }
    }
  ];
  const event = events[Math.floor(Math.random() * events.length)];
  event.apply();
  addLog(event.text, "bad");
}

function endNight() {
  if (state.gameOver) return;
  if (state.actionsLeft > 0) {
    ui.banner.className = "result-banner neutral";
    ui.banner.textContent = "You still have actions left this night. Use them or end the shift anyway.";
  }

  nightlyEvent();

  // baseline drift between nights
  state.night += 1;
  state.actionsLeft = 3;
  state.signal -= 4;
  state.power -= 5;
  state.panic += 5;
  state.audience += 3;

  normalize();
  checkGameOver();

  if (!state.gameOver) {
    ui.banner.className = "result-banner win";
    ui.banner.textContent = `Night ${state.night - 1} survived. The next broadcast begins under heavier pressure.`;
    addLog(`Night ${state.night - 1} closed. The station remains online.`, "good");
  }

  saveState();
  render();
}

function checkGameOver() {
  let reason = "";
  if (state.signal <= 0) reason = "The signal collapses. The broadcast vanishes into static.";
  else if (state.power <= 0) reason = "Power failure. The station goes dark.";
  else if (state.panic >= 100) reason = "The audience breaks into full panic. The station can no longer control the narrative.";

  if (reason) {
    state.gameOver = true;
    ui.banner.className = "result-banner lose";
    ui.banner.textContent = reason;
    addLog(reason, "bad");
  }
}

function newGame() {
  state = defaultState();
  saveState();
  render();
}

function render() {
  ui.signalStat.textContent = Math.round(state.signal);
  ui.powerStat.textContent = Math.round(state.power);
  ui.panicStat.textContent = Math.round(state.panic);
  ui.audienceStat.textContent = Math.round(state.audience);
  ui.nightStat.textContent = state.night;
  ui.actionsStat.textContent = state.actionsLeft;

  ui.signalBar.style.width = `${state.signal}%`;
  ui.powerBar.style.width = `${state.power}%`;
  ui.panicBar.style.width = `${state.panic}%`;
  ui.audienceBar.style.width = `${state.audience}%`;

  ui.log.innerHTML = "";
  state.log.forEach(item => {
    const { text, kind } = unpackLog(item);
    const row = document.createElement("div");
    row.className = `history-item ${kind}`;
    row.textContent = text;
    ui.log.appendChild(row);
  });

  document.querySelectorAll(".action-btn").forEach(btn => {
    btn.disabled = state.gameOver || state.actionsLeft <= 0;
  });
  document.getElementById("endNightBtn").disabled = state.gameOver;
}

document.querySelectorAll(".action-btn").forEach(btn => {
  btn.addEventListener("click", () => applyAction(btn.dataset.action));
});
document.getElementById("endNightBtn").addEventListener("click", endNight);
document.getElementById("newGameBtn").addEventListener("click", newGame);

render();
