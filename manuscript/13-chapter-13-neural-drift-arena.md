# Chapter 13 — Neural Drift Arena

## Build opponents that feel alive through behavior systems and adaptive combat

Neural Drift Arena is the book’s cleanest introduction to game AI. The opponent is not truly intelligent, but it feels intentional because it evaluates distance, health, momentum, and timing before choosing what to do.

### Curiosity
What makes an enemy feel smart, even when the logic behind it is simple?

### Build
The game includes:
- player movement
- normal and heavy attacks
- cooldowns
- a momentum system
- enemy approach, retreat, and pressure states
- readable arena feedback

### Explain
The state is designed around two agents:
```javascript
state = {
  player: { x: 90, y: 210, health: 100, momentum: 0, cooldown: 0, heavyCooldown: 0 },
  enemy: { x: 580, y: 210, health: 100, aggression: 0.6, state: "approach", cooldown: 0 },
  running: true
};
```

Distance is one of the core information variables:
```javascript
function distanceBetween(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}
```

The player attack system rewards spacing:
```javascript
if (dist < 60) {
  state.enemy.health -= 10;
  state.player.momentum += 8;
}
```

Enemy behavior is modular:
- `approach()`
- `retreat()`
- `enemyAttack()`

The real intelligence appears in the decision function:
```javascript
function enemyDecision() {
  const dist = distanceBetween(state.enemy, state.player);

  if (state.enemy.health < 28) { retreat(); return; }
  if (state.player.health < 35 && dist < 95) { approach(); enemyAttack(); return; }
  if (dist > 75) { approach(); return; }
  enemyAttack();
}
```

This is not complicated AI. It is a readable decision tree. That is exactly why it works.

### Refine with Vibe Coding
Use prompts like:
```text
Create an arena enemy in JavaScript with approach, retreat, and attack behaviors chosen through a decision tree based on health and distance.
```

Then refine with:
- “Add cooldowns so attacks feel fair.”
- “Use momentum to increase combat pressure.”
- “Show the enemy’s current state in the UI.”

### Extend
- add defend and dodge states
- add multiple enemies
- add environmental hazards
- add special attacks
- add hero abilities powered by momentum

### Reflect
This chapter teaches that believable AI often comes from clean condition checks, not from complexity for its own sake.
