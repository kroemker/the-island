import React, { useEffect, useState } from 'react';
import { Text } from 'ink';
import terminalImage from 'terminal-image';

type Props = {
  path: string;
  width?: number;
};

export default function SpriteView({ path, width = 48 }: Props) {
  const [sprite, setSprite] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    terminalImage
      .file(path, { width, preserveAspectRatio: true })
      .then(setSprite)
      .catch(() => setError(`[sprite not found: ${path}]`));
  }, [path, width]);

  if (error) return <Text color="red">{error}</Text>;
  if (!sprite) return <Text color="gray">Loading sprite...</Text>;
  return <Text>{sprite}</Text>;
}
