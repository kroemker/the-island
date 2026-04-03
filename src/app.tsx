import React, { useState } from 'react';
import { Box } from 'ink';
import TitleScreen from './screens/TitleScreen.js';
import ExploreScreen from './screens/ExploreScreen.js';
import type { Screen } from './game/types.js';

export default function App() {
  const [screen, setScreen] = useState<Screen>('explore'); // 'title' when prologue is ready

  return (
    <Box flexDirection="column">
      {screen === 'title'   && <TitleScreen onNewGame={() => setScreen('prologue')} />}
      {screen === 'explore' && <ExploreScreen />}
    </Box>
  );
}
