import React from 'react';
import { Text } from 'ink';

type Props = {
  current: number;
  max: number;
  /** Width of the filled+empty bar in characters, excluding the number label */
  barWidth: number;
  showNumbers?: boolean;
};

export default function HpBar({ current, max, barWidth, showNumbers = true }: Props) {
  const ratio = max > 0 ? Math.max(0, Math.min(1, current / max)) : 0;
  const filled = Math.round(ratio * barWidth);
  const empty = barWidth - filled;
  const color = ratio > 0.5 ? 'green' : ratio > 0.25 ? 'yellow' : 'red';

  return (
    <Text>
      <Text color={color}>{'█'.repeat(filled)}</Text>
      <Text color="gray">{'░'.repeat(empty)}</Text>
      {showNumbers && <Text color="gray"> {current}/{max}</Text>}
    </Text>
  );
}
