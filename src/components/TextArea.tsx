import React from 'react';
import { Box, Text } from 'ink';
import type { Message, MessageType } from '../game/types.js';

const COLORS: Record<MessageType, string> = {
  narrator: 'white',
  dialogue: 'cyan',
  system:   'yellow',
  combat:   'red',
  loot:     'green',
};

type Props = {
  messages: Message[];
  /** How many rows are available for the text area */
  height: number;
  width: number;
};

export default function TextArea({ messages, height, width }: Props) {
  // Each message takes at least 1 line; long ones wrap.
  // We approximate by showing the last `height` messages.
  const visible = messages.slice(-height);

  return (
    <Box
      flexDirection="column"
      width={width}
      height={height}
      paddingX={1}
      overflow="hidden"
    >
      {/* Push messages to the bottom */}
      <Box flexGrow={1} />

      {visible.map(msg => (
        <Box key={msg.id}>
          {msg.speaker ? (
            <Text wrap="wrap">
              <Text bold color={COLORS[msg.type]}>{msg.speaker}: </Text>
              <Text color={COLORS[msg.type]}>{msg.text}</Text>
            </Text>
          ) : (
            <Text color={COLORS[msg.type]} wrap="wrap">{msg.text}</Text>
          )}
        </Box>
      ))}
    </Box>
  );
}
