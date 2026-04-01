# Chapter 3 — Roulette Frontier

## Curiosity

Roulette is a great lesson in trust. The game is only satisfying if the visible result matches the real logic underneath.

## Build

The project stores bankroll, bet amount, selected bet type, picked number, last result, and wheel rotation.

A core constant defines the wheel order:

```javascript
const WHEEL_ORDER = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
```

That array is the real map of the system.

## Explain

Color logic is handled with a dedicated helper:

```javascript
function colorFor(number) {
  if (number === 0) return "green";
  return RED_NUMBERS.has(number) ? "red" : "black";
}
```

The payout function resolves the bet:

```javascript
function resolveSpin(number, type, bet, numberPick) {
  const color = colorFor(number);
  let payout = 0;

  if (type === "red" && color === "red") payout = bet * 2;
  if (type === "black" && color === "black") payout = bet * 2;
  if (type === "even" && number !== 0 && number % 2 === 0) payout = bet * 2;
  if (type === "odd" && number % 2 === 1) payout = bet * 2;
  if (type === "number" && number === numberPick) payout = bet * 36;
}
```

This is a classic mapping problem: the player chooses a category, and the system checks whether the outcome belongs to that category.

The simplified premium version in the repo uses an HTML/CSS wheel so the visible pockets remain readable. That design choice is important: a simpler but trustworthy interface is better than a more complex one that feels unreliable.

## Refine with Vibe Coding

**Prompt:**  
“Create the JavaScript state structure for a roulette game with bankroll, current bet, selected bet type, picked number, result history, and wheel rotation.”

**Prompt:**  
“Given a roulette wheel order array and a fixed pointer, calculate the CSS rotation needed so a chosen number lands under the pointer after several full turns.”

These prompts work because they isolate the hard parts: data structure and rotation logic.

## Extend

- add low/high bets
- add dozens and columns
- add a clickable table board
- add win/loss analytics
- add sound and highlighted winning pockets

## Reflect

Roulette teaches a subtle but important lesson: a system can be correct, but still feel wrong if the presentation does not support the underlying logic.
