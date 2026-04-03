import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';

type Props = {
  /** Contextual actions shown as quick picks */
  actions: string[];
  onAction: (action: string) => void;
  width: number;
};

const MAX_VISIBLE = 4;

export default function ActionPrompt({ actions, onAction, width }: Props) {
  const [query, setQuery] = useState('');
  const [cursorOn, setCursorOn] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Blinking cursor
  useEffect(() => {
    const t = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  const hasQuery = query.trim().length > 0;
  const filtered = hasQuery
    ? actions.filter(a => a.toLowerCase().includes(query.toLowerCase()))
    : actions;

  // If there's typed text, prepend a "submit as-is" option
  const items = hasQuery ? [`↵  ${query}`, ...filtered] : filtered;
  const idx = Math.min(selectedIdx, Math.max(0, items.length - 1));

  useInput((input, key) => {
    if (key.upArrow) {
      setSelectedIdx(i => Math.max(0, i - 1));
    } else if (key.downArrow) {
      setSelectedIdx(i => Math.min(items.length - 1, i + 1));
    } else if (key.return) {
      const chosen = items[idx];
      if (!chosen) return;
      // First item when hasQuery is the raw input; rest are filtered actions
      const action = idx === 0 && hasQuery ? query.trim() : chosen;
      onAction(action);
      setQuery('');
      setSelectedIdx(0);
    } else if (key.escape) {
      setQuery('');
      setSelectedIdx(0);
    } else if (key.backspace || key.delete) {
      setQuery(q => q.slice(0, -1));
      setSelectedIdx(0);
    } else if (input && !key.ctrl && !key.meta) {
      setQuery(q => q + input);
      setSelectedIdx(0);
    }
  });

  const visible = items.slice(0, MAX_VISIBLE);

  return (
    <Box
      flexDirection="column"
      borderStyle="single"
      borderTop
      borderBottom={false}
      borderLeft={false}
      borderRight={false}
      paddingX={1}
      width={width}
    >
      {/* Input row */}
      <Box>
        <Text color="green" bold>{'> '}</Text>
        <Text>{query}</Text>
        <Text color="green">{cursorOn ? '█' : ' '}</Text>
      </Box>

      {/* Action list */}
      <Box flexDirection="row" flexWrap="wrap" gap={2}>
        {visible.map((item, i) => (
          <Box key={item} minWidth={24}>
            <Text
              color={i === idx ? 'cyan' : 'gray'}
              bold={i === idx}
            >
              {i === idx ? '▶ ' : '  '}
              {item}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
