# Chapter 10 — Relic Cartographer

## Design exploration systems, fog of war, and meaningful discovery

Relic Cartographer slows the pace down and changes the emotional goal of the game. Instead of reacting under pressure, the player explores under uncertainty. The unknown becomes the mechanic.

### Curiosity
Why does hidden information make movement more meaningful?

### Build
The upgraded version focuses on:
- a 10×10 grid
- fog-of-war
- terrain cost
- relic discovery
- traps and supply caches
- a limited scout pulse
- an extraction requirement

### Explain
The map is built procedurally:
```javascript
function buildMap() {
  const cells = [];
  for (let i = 0; i < SIZE * SIZE; i++) {
    let type = "plain";
    const r = Math.random();
    if (r < 0.10) type = "relic";
    else if (r < 0.18) type = "trap";
    else if (r < 0.28) type = "mountain";
    else if (r < 0.35) type = "cache";
    cells.push({ type, revealed: false });
  }
  return cells;
}
```

Player state is intentionally compact:
```javascript
state = {
  x: 0,
  y: 0,
  energy: 24,
  relics: 0,
  traps: 0
};
```

The move function is where the chapter’s real design lesson lives. Every move:
- changes position
- spends energy
- reveals information
- may trigger a consequence

Mountains cost more energy. Relics reward exploration. Traps punish careless movement. Caches create recovery and route variety. The extraction tile only works when the player has collected enough relics, which turns simple movement into planned movement.

### Refine with Vibe Coding
Use prompts like:
```text
Create a JavaScript grid exploration game with hidden tiles, terrain cost, relics, traps, supply caches, and an extraction goal.
```

Then refine with:
- “Add a fog-of-war system where only visited tiles are shown.”
- “Create a limited-use reveal ability for nearby tiles.”
- “Balance energy costs so route planning matters.”

### Extend
- add enemy patrols
- add lore fragments
- add larger maps with scrolling view
- add alternate extraction paths
- add multiple terrain biomes

### Reflect
This chapter teaches that exploration becomes compelling when knowledge must be earned.
