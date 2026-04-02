import React, { useState } from 'react';
import { Box } from 'ink';
import TitleScreen from './screens/TitleScreen.js';
import type { Screen } from './game/types.js';

export default function App() {
  const [screen, setScreen] = useState<Screen>('title');

  return (
    <Box flexDirection="column">
      {screen === 'title' && (
        <TitleScreen onNewGame={() => setScreen('prologue')} />
      )}
      {screen === 'prologue' && (
        // Placeholder — will be replaced with generated prologue screen
        <Box />
      )}
    </Box>
  );
}
