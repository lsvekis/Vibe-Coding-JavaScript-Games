# Chapter 11 Guide — Blacksite Broadcast

## Game vision
Blacksite Broadcast is used in the book to teach these ideas through a real project instead of isolated syntax drills.

## New concepts in this chapter
- narrative systems
- turn resolution
- multiple variables
- decision tradeoffs

## System breakdown

### Input
The actions the player takes:
- button clicks, keyboard input, tile selection, or battle choices depending on the chapter

### State
The information the game must remember:
- scores, resources, positions, cards, health, progress, or stored data

### Logic
The rules that transform state:
- win conditions
- movement rules
- random events
- scoring and payouts
- combat and progression systems

### Output
How the game shows results:
- DOM updates
- rendered cards or reels
- canvas scenes
- logs, counters, and feedback

## Vibe Coding prompt for this chapter
```text
Build a haunted station management game where the player balances signal, power, and audience panic through turn-based actions and random events.
```

## How to use Vibe Coding here

### 1. Start with the player experience
Before writing code, describe what the player should feel and do.

### 2. Ask AI for a scaffold
Use the prompt above to get a first draft. Focus on structure, not perfection.

### 3. Break the game into systems
Ask:
- Where is the state stored?
- What events change that state?
- Which functions apply the rules?
- How does the UI update?

### 4. Read the code with purpose
For each major function in `script.js`, identify:
- what it receives
- what it changes
- what it returns
- what side effects it triggers

### 5. Refine, test, and extend
Use AI to improve specific pieces:
- balance
- UX
- bug fixes
- visual polish
- persistence
- extra features

## Code walkthrough focus
When you study this chapter's code, pay close attention to:
- how the initial state is created
- how player input is captured
- how the main rule functions are organized
- how updates are pushed back to the screen
- how the game decides when the round, mission, or run is over

## Recommended chapter discussion topics
- What does the central state object or variable track?
- Which function is the most important rule engine?
- Where does randomness enter the system?
- How could this game be made harder or easier?
- Which parts of the code are reusable in another chapter?

## Upgrade ideas
- add sound effects
- improve visuals
- add difficulty settings
- add more content types or enemy types
- save more progress in localStorage
- separate logic into smaller reusable functions

## Reflection
This chapter is part of the larger Vibe Coding journey. The goal is not only to finish the game, but to absorb a reusable pattern you can carry into the next chapter.
