# CLAUDE.md — The Island

## Project Overview

Terminal-based replayable RPG text adventure built with Bun + Ink + TypeScript.
Every game run is procedurally generated: map, story, NPCs, enemies, and boss are
randomized. All dialogue and command parsing go through the Anthropic Claude API.

## Commands

```bash
bun run dev              # run in development mode
bun run build            # compile to dist/the-island binary
bun run test-sprite <path> [width]   # preview a monster sprite in the terminal
```

## Architecture

### Screen Flow
`title` → `prologue` → `explore` ↔ `battle` ↔ `inventory` → `epilogue` (victory) or `game_over`

### Key Files
- `src/index.tsx` — entry point, mounts Ink
- `src/app.tsx` — top-level screen router (useState<Screen>)
- `src/game/types.ts` — all shared types: Player, Monster, Location, GameState, etc.
- `src/game/state.ts` — game state management (to be implemented)
- `src/game/world-gen.ts` — procedural map + story generation via LLM (to be implemented)
- `src/llm/client.ts` — Anthropic SDK wrapper, prompt templates (to be implemented)
- `src/screens/` — one component per Screen value
- `src/components/SpriteView.tsx` — renders PNG sprites via terminal-image

### LLM Usage
The LLM (Claude) is used for:
1. **World generation** — story seed, location names/descriptions, NPC names, boss lore
2. **NPC dialogue** — dynamic responses to player input
3. **Enemy flavor text** — battle narration, death messages
4. **Command parsing** — interpret free-text player input into game actions

Use `claude-haiku-4-5-20251001` for fast, low-cost calls (dialogue, parsing).
Use `claude-sonnet-4-6` for world generation (runs once per game, quality matters).

### State Management
Game state lives in a React context + useReducer at the App level.
Pass dispatch down via context — avoid prop drilling through screen components.

### Monster Sprites
- Store PNGs in `assets/monsters/`
- Render via `<SpriteView path="..." width={48} />` (width in terminal columns)
- Recommended source resolution: 128×128 to 256×256 px
- Test rendering with: `bun run test-sprite assets/monsters/<name>.png`

## Conventions

- All new screens go in `src/screens/`, named `<ScreenName>Screen.tsx`
- All reusable UI goes in `src/components/`
- Game logic (no UI) goes in `src/game/`
- LLM prompts and API calls go in `src/llm/`
- Use `.js` extension in imports (required for Bun ESM)
- Prefer `type` imports for types: `import type { Foo } from './types.js'`

## Environment

Requires `ANTHROPIC_API_KEY` in `.env` (see `.env.example`).
Bun automatically loads `.env` files — no dotenv package needed.

## Game Rules (implement faithfully)
- Player death = game over, no continue (unless player has a revive item)
- Sea is rough and impassable until the boss is defeated
- Boss defeat triggers epilogue + calm sea ending
- Each run: randomized map layout, randomized boss, randomized story
- Player can level up stats AND weapon level separately
