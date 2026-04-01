# Chapter 2 — Blackjack Command

## Curiosity

Blackjack introduces something the slot machine did not have: player decisions. The player can hit or stand, and each choice changes the rest of the round.

## Build

The game uses separate arrays for the deck, the player hand, and the dealer hand:

```javascript
let deck = [];
let player = [];
let dealer = [];
let inRound = false;

let state = {
  chips: 300,
  bet: 25
};
```

This is an important design step. Persistent values like chips and bet are separated from temporary round data like the current cards in play.

## Explain

A card deck is created as an array of objects:

```javascript
function makeDeck() {
  const suits = ["♠", "♥", "♦", "♣"];
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  deck = [];

  for (const suit of suits) {
    for (const value of values) {
      deck.push({ value, suit });
    }
  }
}
```

Each card becomes structured data, which makes later scoring easier.

The score function is the real logic center because it must handle the special case of aces:

```javascript
function handValue(hand) {
  let total = 0;
  let aces = 0;

  for (const card of hand) {
    if (card.value === "A") {
      aces++;
      total += 11;
    } else if (["K", "Q", "J"].includes(card.value)) {
      total += 10;
    } else {
      total += Number(card.value);
    }
  }

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}
```

This is a strong example of rule correction. The game first treats aces optimistically as 11, then revises that interpretation only if necessary.

## Refine with Vibe Coding

**Prompt:**  
“Write a blackjack scoring function in JavaScript that counts aces as 11 unless that would cause a bust, in which case they count as 1.”

What it does: it forces AI to solve the real scoring problem instead of giving a simplified answer.

**Prompt:**  
“Create separate JavaScript functions for deal, hit, and stand in a blackjack game using a shuffled deck and a hand-scoring helper.”

What it does: it breaks the game into action systems.

## Extend

- add double down
- add win/loss statistics
- add split hands
- persist chips with localStorage
- improve dealer reveal logic

## Reflect

Blackjack teaches the core structure of a turn-based game: setup, action, evaluation, resolution. That pattern will reappear later in more advanced systems.
