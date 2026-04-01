# Chapter 14 — Second Shadow Heist

## Design stealth systems, detection logic, and AI that watches the player

Second Shadow Heist changes the emotional structure of play. The tension does not come from direct combat. It comes from the possibility of being seen. That shift makes every movement meaningful.

### Curiosity
What changes when the player’s main challenge is not winning a fight, but avoiding detection?

### Build
The chapter is built around:
- guard patrol logic
- detection range
- line-of-sight style checks
- state-based AI
- alert timers
- stealth movement through a hostile space

### Explain
The player is defined by position and visibility:
```javascript
player = { x: 60, y: 200, speed: 2.5, hidden: false };
```

A guard is more than a moving object:
```javascript
guard = {
  x: 400,
  y: 200,
  state: "patrol",
  direction: 1,
  visionRange: 140,
  alertTimer: 0
};
```

The patrol state establishes fairness by making movement learnable:
```javascript
function patrol() {
  guard.x += guard.direction * 2;
  if (guard.x > 600 || guard.x < 100) guard.direction *= -1;
}
```

Detection depends on visibility and distance:
```javascript
function canSeePlayer() {
  if (distance(guard, player) > guard.visionRange) return false;
  if (player.hidden) return false;
  return true;
}
```

The guard uses a state machine:
- patrol
- alert
- chase

That structure keeps behavior readable and scalable. The alert timer is especially important because it gives the guard memory and prevents the system from feeling artificial.

### Refine with Vibe Coding
Use prompts like:
```text
Build a stealth guard AI in JavaScript with patrol, alert, and chase states plus a detection system based on distance and player visibility.
```

Then refine with:
- “Add a short alert timer after the player escapes sight.”
- “Make guard patrol routes predictable.”
- “Show the guard’s detection range visually.”

### Extend
- add multiple guards
- add vision cones
- add noise-based detection
- add hiding zones
- add distraction tools and alternate escape routes

### Reflect
This chapter teaches that stealth is really a system of controlled information and escalating awareness.
