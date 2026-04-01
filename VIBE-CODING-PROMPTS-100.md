# Vibe Coding Toolkit — 100 Prompts, Templates, and Exercises

Use these prompts to scaffold, refine, debug, and extend the games in this book.

## Foundations
1. Create a state object for a browser game that includes score, player data, and a running flag.
2. Write a helper function that selects a random item from an array and explain how it works.
3. Build a reusable render function that updates DOM elements from a state object.
4. Create a localStorage save and load system for a small JavaScript game.
5. Refactor a simple game loop so the update logic and render logic are separate.
6. Add a result history array to a game state object and render the latest five entries.
7. Write a reset function that restores game state to a default version.
8. Create a button event system that connects UI actions to game logic functions.
9. Explain the difference between persistent state and temporary round state in a game.
10. Convert a group of related global variables into a cleaner state structure.

## Randomness and Probability
11. Create a slot-style symbol generator with weighted rarity so some symbols appear less often.
12. Write a function that simulates a fair six-sided die roll.
13. Build a roulette-style outcome system for red, black, even, odd, and exact number bets.
14. Explain how to map continuous randomness into discrete outcomes using arrays.
15. Create a random event generator that selects from common, uncommon, and rare events.
16. Add probability-based loot drops to a game.
17. Write a helper that generates random values within a defined minimum and maximum.
18. Simulate a shuffled deck and explain why Fisher-Yates matters.
19. Create a risk event system where a random failure can reduce player resources.
20. Add a jackpot mechanic that increases slightly after every failed attempt.

## Cards and Hands
21. Create a standard 52-card deck as an array of objects with suit and value properties.
22. Write a function that draws one card from a deck and adds it to a hand.
23. Create a blackjack hand scoring function with correct ace handling.
24. Build a video poker hand evaluator that detects pair, two pair, three of a kind, straight, flush, and full house.
25. Sort a poker hand by rank value before evaluating it.
26. Write a function that compares two poker hands by rank and then by high card.
27. Create a card rendering helper that turns card objects into visible UI text.
28. Build a dealer AI rule where the dealer must hit until 17 or more.
29. Add a push condition to a blackjack round resolution function.
30. Explain how arrays of objects make card game logic easier to maintain.

## Grid and Map Systems
31. Create a 2D grid in JavaScript where each tile stores multiple properties.
32. Build a fog-of-war system where tiles become revealed when visited.
33. Write movement logic that keeps the player inside map boundaries.
34. Generate traps and rewards procedurally across a grid.
35. Create a tile reveal function that triggers only the first time a tile is visited.
36. Build a pathfinding-style helper that returns neighbor cells for a given grid position.
37. Add terrain costs so some tiles drain more energy than others.
38. Create a grid renderer using DOM elements instead of canvas.
39. Design an extraction tile that ends the run when the player reaches it.
40. Explain the difference between world data and rendered tile state.

## Canvas and Real-Time Loops
41. Create a requestAnimationFrame game loop with separate update and render functions.
42. Move a player square across a canvas using keyboard input.
43. Spawn falling obstacles over time at random x positions.
44. Add bullet firing to a canvas game with a simple cooldown.
45. Write rectangle collision detection for a player and enemy system.
46. Create a score counter that increases over time in a survival game.
47. Add lives to a canvas game and end the round after the final hit.
48. Refactor a real-time game so object movement is updated in one centralized loop.
49. Add a pause toggle to a requestAnimationFrame game.
50. Explain why rendering every frame works even when objects appear to move smoothly.

## Progression and Persistence
51. Create a credits or currency system for a game.
52. Build an upgrade system that increases movement speed after spending resources.
53. Persist player progression with localStorage and restore it on load.
54. Add unlockable content based on win count or completed missions.
55. Track total wins, losses, spins, and best score across sessions.
56. Create an XP system with levels and increasing requirements.
57. Build a reward loop where completing a mission grants currency and experience.
58. Add a simple shop interface to buy upgrades with in-game currency.
59. Write a function that caps stats so upgrades cannot grow forever.
60. Explain how progression loops change player motivation.

## AI and Decision Systems
61. Create an enemy that approaches the player when far away and attacks when close.
62. Build a simple decision tree based on enemy health and distance to target.
63. Add a retreat behavior when an enemy is low on health.
64. Create multiple AI states such as idle, aggressive, and defensive.
65. Add cooldowns so an AI cannot attack every frame.
66. Write a helper that chooses an action from weighted AI options.
67. Create a wave spawner that increases difficulty over time.
68. Add mirrored movement where an enemy replays the player’s last round path.
69. Simulate a ghost replay system from previously recorded coordinates.
70. Explain why AI often feels smart even when it is only using condition checks.

## Economy and Trading
71. Create multiple market locations with different prices for the same goods.
72. Write buy and sell functions that update currency and inventory.
73. Add cargo capacity to a trading game so choices matter.
74. Create price fluctuation rules that update markets after travel.
75. Add pirate attack events that can damage the ship or remove cargo.
76. Create ship upgrades that improve cargo, hull, or cannons.
77. Write a helper that displays the current market table in the UI.
78. Add rare goods with higher prices and higher risk.
79. Explain how dynamic price systems create strategy.
80. Create a travel function that moves the player between locations and advances time.

## Signals, Memory, and Replay
81. Create a rolling buffer that stores only the last N signals.
82. Inject predefined patterns into a stream of random symbols.
83. Detect whether a buffered signal contains a known pattern.
84. Record player positions over time into a memory array.
85. Spawn a ghost that replays a stored movement timeline.
86. Limit replay memory to the last 100 frames only.
87. Create a system where hidden enemies continue moving even when not visible.
88. Add a pulse mechanic that reveals nearby objects for a short duration.
89. Explain the difference between current state and replayed state.
90. Create a timeline-based mechanic where the past becomes an obstacle in the present.

## Polish, UX, and Debugging
91. Improve a game UI while keeping the same underlying logic.
92. Add better result messages after wins, losses, or mission completion.
93. Create a recent history panel for a game and style positive and negative results differently.
94. Add a visual highlight to the currently selected bet or active character.
95. Write comments for each major function in a game script and explain why they exist.
96. Refactor a long script into smaller reusable helpers without changing behavior.
97. Debug a mismatch between visual animation and actual game result.
98. Add disabled button states when actions are not allowed.
99. Explain how to test whether game state and UI output are still aligned.
100. Generate a checklist for reviewing a JavaScript game before publishing it.

## Prompt Templates
### Build a system
```text
Create a [system type] in JavaScript.
It should include state, update logic, interaction, and rendering.
Explain what each major function does and how the parts connect.
```

### Extend a feature
```text
Here is my existing code:
[PASTE CODE]

Add [feature] without rewriting the whole structure.
Keep the current style and explain the integration points.
```

### Debug a problem
```text
Here is my code and here is the bug:
[PASTE CODE]
[DESCRIBE BUG]

Find the root cause, fix it, and explain why it happened.
```

### Refactor for clarity
```text
Refactor this JavaScript game code into smaller functions while keeping the behavior the same.
Explain the new structure and why it is easier to maintain.
```