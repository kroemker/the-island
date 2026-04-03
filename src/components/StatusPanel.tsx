import React from 'react';
import { Box, Text } from 'ink';
import HpBar from './HpBar.js';
import type { Player, Location } from '../game/types.js';

type Props = {
  width: number;
  player: Player;
  location: Location | null;
};

function Divider({ width }: { width: number }) {
  return <Text color="gray">{'─'.repeat(width)}</Text>;
}

export default function StatusPanel({ width, player, location }: Props) {
  // inner width: total - 1 (left border) - 2 (paddingX)
  const inner = width - 3;
  // "HP  " = 4, " XXX/XXX" = up to 8 → reserve 12 for label + numbers
  const barWidth = Math.max(4, inner - 12);

  const { stats, weapon } = player;
  // truncate weapon name to fit: "⚔  " (3) + name + " Lv.X" (5+digits)
  const maxNameLen = inner - 9;
  const weaponName = weapon && weapon.name.length > maxNameLen
    ? weapon.name.slice(0, maxNameLen - 1) + '…'
    : weapon?.name ?? '';

  return (
    <Box
      flexDirection="column"
      width={width}
      borderStyle="single"
      borderTop={false}
      borderBottom={false}
      borderRight={false}
      borderLeft
      paddingX={1}
    >
      {/* ── Player stats ── */}
      <Text bold color="white">Player</Text>

      <Box>
        <Text color="gray">HP  </Text>
        <HpBar current={stats.hp} max={stats.maxHp} barWidth={barWidth} />
      </Box>

      <Box gap={2}>
        <Text><Text color="gray">LV </Text><Text bold color="cyan">{stats.level}</Text></Text>
        <Text><Text color="gray">XP </Text><Text color="cyan">{stats.exp}</Text><Text color="gray">/{stats.expToNext}</Text></Text>
      </Box>

      <Box gap={2}>
        <Text>
          <Text color="gray">ATK </Text>
          <Text bold color="red">{stats.attack}</Text>
        </Text>
        <Text>
          <Text color="gray">DEF </Text>
          <Text bold color="blue">{stats.defense}</Text>
        </Text>
      </Box>

      <Divider width={inner} />

      {/* ── Weapon ── */}
      {weapon ? (
        <Box flexDirection="column">
          <Text>
            <Text color="yellow">⚔  </Text>
            <Text bold>{weaponName}</Text>
            <Text color="gray"> Lv.{weapon.level}</Text>
          </Text>
          <Text color="gray">   DMG {weapon.damage}</Text>
        </Box>
      ) : (
        <Text color="gray">⚔  Unarmed</Text>
      )}

      <Divider width={inner} />

      {/* ── Location ── */}
      {location ? (
        <Box flexDirection="column">
          <Text>
            <Text color="cyan">◉  </Text>
            <Text bold>{location.name}</Text>
          </Text>
          <Box flexDirection="column" paddingLeft={3}>
            {location.connections.map(name => (
              <Text key={name} color="gray">→ {name}</Text>
            ))}
          </Box>
        </Box>
      ) : (
        <Text color="gray">◉  Unknown</Text>
      )}
    </Box>
  );
}
