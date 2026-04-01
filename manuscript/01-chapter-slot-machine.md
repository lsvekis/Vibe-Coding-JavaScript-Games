# Chapter 1 — Build Your First Game: Slot Machine Systems

## Curiosity

A slot machine looks simple, but it is a strong first project because it combines the four foundations of every interactive system:

- state
- randomness
- rules
- output

In the chapter-01 slot machine project, the game stores bankroll, bet size, reels, jackpot, and history. A single click triggers the full gameplay loop.

## Build

The core state is stored in one place so the game has a clear source of truth.

```javascript
let state = {
  bankroll: 500,
  bet: 20,
  reels: ["🍒", "🍋", "⭐"],
  symbols: ["🍒", "🍋", "⭐", "💎", "7️⃣"],
  history: []
};
```

This structure matters because every other part of the game depends on it. If the screen shows the wrong reels, if the bankroll is off, or if the history list is wrong, the first thing to inspect is state.

## Explain

A helper like this handles symbol selection:

```javascript
function getRandomSymbol() {
  const index = Math.floor(Math.random() * state.symbols.length);
  return state.symbols[index];
}
```

This line is a compact example of how code turns abstract randomness into a real outcome. `Math.random()` gives you a decimal between 0 and 1. Multiplying by the number of available symbols scales that into the size of the symbol list. `Math.floor()` converts that into a whole-number array index.

The spin function then replaces the existing reels:

```javascript
function spinReels() {
  state.reels = [
    getRandomSymbol(),
    getRandomSymbol(),
    getRandomSymbol()
  ];
}
```

That is a state mutation. The game world changes. Once that happens, the game must evaluate the result and redraw the UI.

A simple win rule might be:

```javascript
function checkWin() {
  const [a, b, c] = state.reels;

  if (a === b && b === c) {
    return state.bet * 5;
  }

  return 0;
}
```

This introduces rule encoding. The code is no longer just moving data around. It is interpreting the state and assigning value to it.

The game loop pulls everything together:

```javascript
function playGame() {
  spinReels();

  const winnings = checkWin();

  state.bankroll -= state.bet;
  state.bankroll += winnings;

  state.history.unshift({
    reels: [...state.reels],
    win: winnings
  });

  render();
  saveGame();
}
```

This is the pattern you will keep using throughout the book:

1. change state  
2. evaluate state  
3. update the interface  
4. persist or record the result

## Refine with Vibe Coding

Good prompting here is specific.

**Prompt:**  
“Create a slot machine state object in JavaScript with bankroll, bet, symbols, reels, and spin history.”

What it does: it asks AI to build the structure, not the whole app.

**Prompt:**  
“Write a JavaScript function that randomly selects one symbol from an array and explain why Math.floor is needed.”

What it does: it requests both code and explanation.

**Prompt:**  
“Create a game loop for a slot machine that spins reels, checks wins, updates bankroll, records history, and rerenders the UI.”

What it does: it combines the systems into one reusable flow.

## Extend

Try these upgrades:
- two-of-a-kind partial win
- weighted symbol rarity
- progressive jackpot
- reel animation delay
- better result history
- localStorage save and load

## Reflect

The key insight of this chapter is that a game is not a collection of buttons. It is a state machine with visible consequences.

The slot machine is your first proof that JavaScript becomes much easier when you can describe the system clearly before you write it.
