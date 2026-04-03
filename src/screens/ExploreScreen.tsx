import React, { useState } from 'react';
import { Box, useStdout } from 'ink';
import TextArea from '../components/TextArea.js';
import StatusPanel from '../components/StatusPanel.js';
import ActionPrompt from '../components/ActionPrompt.js';
import type { Message, Player, Location } from '../game/types.js';

// ── Mock data (replaced by real game state later) ────────────────────────────

const MOCK_PLAYER: Player = {
  name: 'Castaway',
  stats: {
    hp: 45,
    maxHp: 60,
    attack: 12,
    defense: 8,
    level: 3,
    exp: 120,
    expToNext: 200,
  },
  inventory: [],
  weapon: { id: 'w1', name: 'Driftwood Club', description: '', damage: 15, level: 2 },
  locationId: 'dark_forest',
};

const MOCK_LOCATION: Location = {
  id: 'dark_forest',
  name: 'Dark Forest',
  description: 'A dense, foreboding forest.',
  type: 'forest',
  connections: ['Moonlit Beach', 'Hidden Cave', 'Ruined Temple'],
  monsters: [],
  items: [],
  visited: true,
  cleared: false,
};

const MOCK_MESSAGES: Message[] = [
  { id: '1', type: 'narrator', text: 'You wake up on a beach. Salt stings your lips. The sea is furious — waves crash against the rocks, impossible to cross.' },
  { id: '2', type: 'narrator', text: 'Behind you, the island waits. Dense jungle. Something watches from between the trees.' },
  { id: '3', type: 'system',   text: 'You picked up a Driftwood Club.' },
  { id: '4', type: 'narrator', text: 'You follow a narrow path into the forest. The canopy closes overhead, swallowing the light.' },
  { id: '5', type: 'dialogue', text: "Careful, stranger. These woods aren't kind to the lost.", speaker: 'Old Hermit' },
  { id: '6', type: 'combat',   text: 'A Vine Lurker lunges from the shadows! You strike it for 15 damage.' },
  { id: '7', type: 'loot',     text: 'The Vine Lurker drops a Health Shard.' },
  { id: '8', type: 'narrator', text: 'The forest grows darker as you press deeper. Somewhere ahead, a low hum pulses through the ground.' },
];

const EXPLORE_ACTIONS = [
  'Look around',
  'Search the area',
  'Move north',
  'Talk to hermit',
  'Check inventory',
  'Rest',
];

// ── Screen ───────────────────────────────────────────────────────────────────

type Props = {
  onBattle?: () => void;
};

export default function ExploreScreen({ onBattle }: Props) {
  const { stdout } = useStdout();
  const totalWidth  = stdout?.columns ?? 80;
  const totalHeight = stdout?.rows    ?? 24;

  // Sidebar: 25% of terminal, clamped to [20, 30]
  const sidebarWidth = Math.min(30, Math.max(20, Math.floor(totalWidth * 0.25)));
  const mainWidth    = totalWidth - sidebarWidth;

  // Prompt is 4 rows tall (input line + 2 action rows + top border)
  const promptHeight  = 4;
  const textAreaHeight = totalHeight - promptHeight;

  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);

  function handleAction(action: string) {
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), type: 'system', text: `> ${action}` },
    ]);
    // TODO: pass action to LLM command parser → game logic
  }

  return (
    <Box flexDirection="column" width={totalWidth} height={totalHeight}>
      {/* Main area: text log + sidebar */}
      <Box flexDirection="row" height={textAreaHeight}>
        <TextArea
          messages={messages}
          height={textAreaHeight}
          width={mainWidth}
        />
        <StatusPanel
          width={sidebarWidth}
          player={MOCK_PLAYER}
          location={MOCK_LOCATION}
        />
      </Box>

      {/* Bottom prompt */}
      <ActionPrompt
        actions={EXPLORE_ACTIONS}
        onAction={handleAction}
        width={totalWidth}
      />
    </Box>
  );
}
