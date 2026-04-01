
const STORAGE_KEY = "rouletteFrontierSimplePremium_v4";
const WHEEL_ORDER = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
const RED_NUMBERS = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
const SEGMENT_DEG = 360 / WHEEL_ORDER.length;

const state = loadState();
let selectedType = state.selectedType || "red";
let spinning = false;
let wheelRotation = Number.isFinite(state.wheelRotation) ? state.wheelRotation : 0;

const wheelEl = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const betAmountEl = document.getElementById("betAmount");
const numberPickEl = document.getElementById("numberPick");
const bankrollEl = document.getElementById("bankroll");
const betDisplayEl = document.getElementById("betDisplay");
const lastNumberEl = document.getElementById("lastNumber");
const lastNetEl = document.getElementById("lastNet");
const selectedBetEl = document.getElementById("selectedBet");
const selectedPayoutEl = document.getElementById("selectedPayout");
const resultBannerEl = document.getElementById("resultBanner");
const historyEl = document.getElementById("history");
const wheelOrderEl = document.getElementById("wheelOrder");

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {
    bankroll: 500,
    betAmount: 20,
    numberPick: 17,
    selectedType: "red",
    wheelRotation: 0,
    lastResult: null,
    lastNet: 0,
    history: []
  };
}

function saveState() {
  state.betAmount = Number(betAmountEl.value) || 20;
  state.numberPick = Number(numberPickEl.value) || 17;
  state.selectedType = selectedType;
  state.wheelRotation = wheelRotation;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function colorFor(number) {
  if (number === 0) return "green";
  return RED_NUMBERS.has(number) ? "red" : "black";
}

function payoutText(type) {
  return type === "number" ? "36x total return" : "2x total return";
}

function buildWheel(highlightNumber = null) {
  wheelEl.innerHTML = "";
  WHEEL_ORDER.forEach((num, index) => {
    const slot = document.createElement("div");
    slot.className = `slot ${colorFor(num)}${num === highlightNumber ? " active" : ""}`;
    slot.style.transform = `rotate(${index * SEGMENT_DEG}deg)`;
    const label = document.createElement("div");
    label.className = "slot-label";
    label.textContent = num;
    slot.appendChild(label);
    wheelEl.appendChild(slot);
  });
  wheelEl.style.transform = `rotate(${wheelRotation}deg)`;
}

function renderOrderMap() {
  wheelOrderEl.innerHTML = "";
  const active = state.lastResult ? state.lastResult.number : null;
  for (const num of WHEEL_ORDER) {
    const d = document.createElement("div");
    d.className = `order-cell ${colorFor(num)}${num === active ? " active" : ""}`;
    d.textContent = num;
    wheelOrderEl.appendChild(d);
  }
}

function renderButtons() {
  document.querySelectorAll(".bet-btn").forEach(btn => {
    btn.classList.toggle("selected", btn.dataset.type === selectedType);
  });
  selectedBetEl.textContent = selectedType === "number"
    ? `Single Number (${Number(numberPickEl.value) || 0})`
    : selectedType.charAt(0).toUpperCase() + selectedType.slice(1);
  selectedPayoutEl.textContent = payoutText(selectedType);
}

function renderHistory() {
  historyEl.innerHTML = "";
  if (!state.history.length) {
    historyEl.innerHTML = "<div class='history-item'>No spins yet.</div>";
    return;
  }
  state.history.slice(0, 12).forEach(item => {
    const row = document.createElement("div");
    row.className = "history-item";
    row.innerHTML = `
      <div>
        <div><strong>${item.number}</strong> ${item.color.toUpperCase()}</div>
        <div class="muted">Bet: ${item.type}${item.type === "number" ? ` (${item.numberPick})` : ""} · ${item.bet}</div>
      </div>
      <div class="history-pill ${item.color}">${item.net >= 0 ? "+" + item.net : item.net}</div>
    `;
    historyEl.appendChild(row);
  });
}

function renderBanner() {
  if (!state.lastResult) {
    resultBannerEl.className = "result-banner neutral";
    resultBannerEl.textContent = "Place a bet and spin.";
    return;
  }
  const r = state.lastResult;
  resultBannerEl.className = `result-banner ${state.lastNet >= 0 ? "win" : "lose"}`;
  resultBannerEl.textContent = `Wheel landed on ${r.number} (${r.color.toUpperCase()}) · ${state.lastNet >= 0 ? "Win" : "Loss"} ${Math.abs(state.lastNet)}`;
}

function renderStats() {
  bankrollEl.textContent = state.bankroll;
  betDisplayEl.textContent = Number(betAmountEl.value) || 0;
  lastNumberEl.textContent = state.lastResult ? state.lastResult.number : "—";
  lastNetEl.textContent = state.lastNet;
  renderButtons();
  renderBanner();
  renderHistory();
  renderOrderMap();
  buildWheel(state.lastResult ? state.lastResult.number : null);
  spinBtn.disabled = spinning || state.bankroll < (Number(betAmountEl.value) || 0);
}

function indexOfNumber(number) {
  return WHEEL_ORDER.indexOf(number);
}

function computeFinalRotation(number) {
  const idx = indexOfNumber(number);
  const targetMod = (360 - (idx * SEGMENT_DEG)) % 360;
  const currentMod = ((wheelRotation % 360) + 360) % 360;
  const delta = (targetMod - currentMod + 360) % 360;
  return wheelRotation + 1440 + delta;
}

function resolveSpin(number, type, bet, numberPick) {
  const color = colorFor(number);
  let payout = 0;

  if (type === "red" && color === "red") payout = bet * 2;
  if (type === "black" && color === "black") payout = bet * 2;
  if (type === "even" && number !== 0 && number % 2 === 0) payout = bet * 2;
  if (type === "odd" && number % 2 === 1) payout = bet * 2;
  if (type === "number" && number === numberPick) payout = bet * 36;

  state.bankroll -= bet;
  state.bankroll += payout;
  state.lastResult = { number, color };
  state.lastNet = payout - bet;
  state.history.unshift({ number, color, type, bet, numberPick, net: state.lastNet });
  state.history = state.history.slice(0, 20);
}

function spin() {
  const bet = Number(betAmountEl.value);
  const numberPick = Number(numberPickEl.value);

  if (!bet || bet < 10) {
    resultBannerEl.className = "result-banner lose";
    resultBannerEl.textContent = "Enter a valid bet of at least 10.";
    return;
  }
  if (bet > state.bankroll) {
    resultBannerEl.className = "result-banner lose";
    resultBannerEl.textContent = "You do not have enough bankroll for that bet.";
    return;
  }
  if (selectedType === "number" && (Number.isNaN(numberPick) || numberPick < 0 || numberPick > 36)) {
    resultBannerEl.className = "result-banner lose";
    resultBannerEl.textContent = "Choose a number from 0 to 36.";
    return;
  }

  spinning = true;
  renderStats();

  const result = Math.floor(Math.random() * 37);
  wheelRotation = computeFinalRotation(result);
  wheelEl.style.transform = `rotate(${wheelRotation}deg)`;

  setTimeout(() => {
    resolveSpin(result, selectedType, bet, numberPick);
    saveState();
    spinning = false;
    renderStats();
  }, 3650);
}

document.querySelectorAll(".bet-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedType = btn.dataset.type;
    saveState();
    renderStats();
  });
});

betAmountEl.addEventListener("input", () => { saveState(); renderStats(); });
numberPickEl.addEventListener("input", () => { saveState(); renderStats(); });
spinBtn.addEventListener("click", spin);

betAmountEl.value = state.betAmount || 20;
numberPickEl.value = state.numberPick || 17;
renderStats();
