import React from 'react';
import { Box, Text } from 'ink';
import { Select } from '@inkjs/ui';

type Props = {
  onNewGame: () => void;
};

const TITLE = `
 _____ _             ___     _                    _
|_   _| |__   ___   |_ _|___| | __ _ _ __   __| |
  | | | '_ \\ / _ \\   | |/ __| |/ _\` | '_ \\ / _\` |
  | | | | | |  __/   | |\\__ \\ | (_| | | | | (_| |
  |_| |_| |_|\\___|  |___|___/_|\\__,_|_| |_|\\__,_|
`;

export default function TitleScreen({ onNewGame }: Props) {
  return (
    <Box flexDirection="column" gap={1} paddingX={2} paddingY={1}>
      <Text color="cyan" bold>
        {TITLE}
      </Text>
      <Text color="gray">
        You wake up on a beach. The sea is rough. There is no escape...{'\n'}
        ...yet.
      </Text>
      <Box marginTop={1}>
        <Select
          options={[
            { label: 'New Game', value: 'new' },
            { label: 'Quit', value: 'quit' },
          ]}
          onChange={(value) => {
            if (value === 'new') onNewGame();
            else process.exit(0);
          }}
        />
      </Box>
    </Box>
  );
}
