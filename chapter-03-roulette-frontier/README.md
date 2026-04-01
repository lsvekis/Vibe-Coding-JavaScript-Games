# Chapter 03 — Roulette Frontier

This version simplifies the wheel structure to improve reliability and readability.

## What changed
- replaced the previous canvas wheel with an HTML/CSS wheel made of visible numbered slots
- removed blank wheel gaps caused by rendering issues
- kept the result logic synced to the visible wheel under the pointer
- preserved the premium chapter styling and root index hub page

## Teaching focus
Use this chapter to discuss:
- mapping number order onto a rotating wheel
- simplifying a UI when a more complex version becomes unreliable
- syncing visible state with game logic
- betting rules, payouts, and persistence
