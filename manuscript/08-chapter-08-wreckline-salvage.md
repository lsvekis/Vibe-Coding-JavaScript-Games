# Chapter 8 — Wreckline Salvage

## Design real-time systems, pressure loops, and risk-based gameplay

Wreckline Salvage is where the book shifts decisively into real-time design. Oxygen drains constantly, drones threaten the player, and scrap falls through the arena whether the player is ready or not. This chapter teaches a crucial lesson: once time becomes continuous, decisions become emotional.

### Curiosity
What changes when a system keeps moving even when the player hesitates?

### Build
The upgraded game combines:
- a requestAnimationFrame loop
- free movement on a canvas
- falling salvage
- moving drone hazards
- oxygen drain
- cargo limits
- banking and upgrades that persist across runs

### Explain
The game is split into two layers of state.

**Persistent profile**
```javascript
profile = {
  credits: 0,
  bestRun: 0,
  upgrades: { cargo: 1, speed: 1, hull: 1 }
};
```

**Temporary run state**
```javascript
run = {
  active: true,
  player: { x: 360, y: 340, speed: 2.6 },
  oxygen: 100,
  hull: 6,
  cargoHeld: 0,
  cargoMax: 4,
  wave: 1,
  scrap: [],
  drones: []
};
```

That split matters. It keeps long-term progression separate from moment-to-moment survival.

A real-time loop drives the system:
```javascript
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
```

The update phase handles:
- oxygen loss
- spawn rolls for scrap and drones
- player movement
- collision checks
- wave escalation

The risk system is what makes the game work. Scrap increases credit potential, but drone hits damage the hull and can knock loose cargo. The banking mechanic turns survival into strategy: do you secure your haul now or stay out a little longer for a bigger reward?

### Refine with Vibe Coding
Use prompts like:
```text
Create a real-time JavaScript salvage game loop with free movement, falling collectibles, moving hazards, oxygen drain, and collision-based rewards and penalties.
```

Then refine with:
- “Separate persistent progression state from current run state.”
- “Add a safe banking mechanic for collected cargo.”
- “Increase spawn pressure over time in waves.”

### Extend
- add enemy varieties
- add shield pickups
- add a boss wave
- add weaponized salvage drones
- add persistent ship modules with branching upgrades

### Reflect
This chapter teaches that real-time systems create urgency by forcing the player to make decisions while the world keeps changing.
