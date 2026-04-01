# Chapter 15 — Hero Dice: Villain Crisis

## Integrate multiple systems into a complete scenario-driven strategy game

Hero Dice: Villain Crisis is the capstone chapter because it brings together nearly everything the book has been building toward. It is not one mechanic. It is a full game architecture exercise.

### Curiosity
How do you combine strategy, randomness, progression, and persistence without losing clarity?

### Build
The game combines:
- hero selection
- villain scenarios
- dice-based combat
- weakness matching
- XP rewards
- level-up logic
- saved campaign progress

### Explain
Heroes are stored as structured objects:
```javascript
const heroes = [
  { id: "volt", name: "Volt", power: "electric", strength: 4, defense: 3, level: 1, xp: 0, health: 20 }
];
```

Scenarios define the mission context:
```javascript
const scenarios = [
  { id: "storm-caller", villain: "Storm Caller", weakness: "electric", threat: 6, health: 20, attack: 4 }
];
```

Combat blends randomness and strategy:
```javascript
function heroAttackValue(hero, scenario) {
  let bonus = hero.strength;
  if (hero.power === scenario.weakness) bonus += 2;
  return rollDie(6) + bonus;
}
```

That matters because the player’s decision still influences the outcome before the dice are rolled.

XP and level-up logic keep victories meaningful:
```javascript
function checkLevelUp(hero) {
  const required = hero.level * 20;
  if (hero.xp >= required) {
    hero.xp -= required;
    hero.level += 1;
    hero.strength += 1;
    hero.defense += 1;
    hero.health += 3;
  }
}
```

Persistence makes the whole campaign matter:
```javascript
function saveCampaign() {
  localStorage.setItem("heroDiceCampaign", JSON.stringify(heroes));
}
```

### Refine with Vibe Coding
Use prompts like:
```text
Create a JavaScript scenario-based superhero strategy game with hero selection, dice-based combat, XP rewards, level-ups, and saved campaign progress.
```

Then refine with:
- “Make matchup weaknesses matter more.”
- “Add unique hero powers.”
- “Display battle outcomes more clearly.”

### Extend
- add teams instead of single heroes
- add boss phases
- add status effects
- add unlockable heroes
- add a branching campaign map

### Reflect
This chapter teaches that complete games are built by orchestrating many clear systems, not by inventing one giant mechanic.
