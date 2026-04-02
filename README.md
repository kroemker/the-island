# The Island

A replayable terminal-based RPG text adventure. You wake up on a tropical beach — the sea is rough, there is no escape. Explore the island, find weapons, battle monsters, and uncover the dark secret that keeps you trapped. Defeat the boss and the sea will calm.

Every run is unique: the map, story, NPCs, and enemies are procedurally generated with an LLM. All dialogue, enemy behavior, and command parsing are handled by Claude.

## Gameplay

- **Explore** the island across randomized locations (beach, forest, caves, ruins, temples)
- **Battle** monsters in turn-based combat with weapons you find or upgrade
- **Level up** to improve your stats and weapon damage
- **Die and it's over** — no continues, unless you find a revive item
- **Defeat the boss** to calm the sea and escape

Controls are entirely keyboard-driven: text commands and arrow-key select menus.

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | [Bun](https://bun.sh) |
| UI | [Ink](https://github.com/vadimdemedes/ink) + [@inkjs/ui](https://github.com/vadimdemedes/inkjs) |
| Language | TypeScript |
| LLM | [Anthropic Claude](https://anthropic.com) via `@anthropic-ai/sdk` |
| Sprites | `terminal-image` (Unicode block rendering) |
| Distribution | Single binary via `bun build --compile` |

## Requirements

- [Bun](https://bun.sh) >= 1.0
- An Anthropic API key

## Setup

```bash
git clone https://github.com/kroemker/the-island.git
cd the-island
bun install
cp .env.example .env
# add your ANTHROPIC_API_KEY to .env
```

## Running

```bash
# development
bun run dev

# build a standalone binary
bun run build
./dist/the-island
```

## Testing a Monster Sprite

Drop a PNG into `assets/monsters/` and preview how it renders in the terminal:

```bash
bun run test-sprite assets/monsters/goblin.png
bun run test-sprite assets/monsters/dragon.png 64   # custom width in columns
```

Sprites are rendered using Unicode half-block characters with true color. Recommended source size: 128×128 or 256×256 pixels.

## Project Structure

```
src/
├── index.tsx              # entry point
├── app.tsx                # screen router
├── screens/               # one component per game screen
├── components/            # shared UI components (SpriteView, etc.)
├── game/                  # types, state, world generation, combat logic
└── llm/                   # Anthropic SDK client, prompt templates
assets/
└── monsters/              # sprite PNGs
scripts/
└── test-sprite.ts         # sprite preview utility
```

## Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Required. Your Anthropic API key. |

## License

MIT
