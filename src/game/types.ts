export type Stats = {
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  level: number;
  exp: number;
  expToNext: number;
};

export type Weapon = {
  id: string;
  name: string;
  description: string;
  damage: number;
  level: number;
};

export type Item = {
  id: string;
  name: string;
  description: string;
  type: 'consumable' | 'weapon' | 'armor' | 'key' | 'revive';
};

export type Monster = {
  id: string;
  name: string;
  description: string;
  spritePath: string;
  stats: Stats;
  isBoss: boolean;
  loot: Item[];
};

export type Location = {
  id: string;
  name: string;
  description: string;
  type: 'beach' | 'forest' | 'cave' | 'ruins' | 'village' | 'temple';
  connections: string[];
  monsters: Monster[];
  items: Item[];
  visited: boolean;
  cleared: boolean;
};

export type Player = {
  name: string;
  stats: Stats;
  inventory: Item[];
  weapon: Weapon | null;
  locationId: string;
};

export type World = {
  locations: Record<string, Location>;
  boss: Monster | null;
  bossDefeated: boolean;
  isSeaCalm: boolean;
};

export type GameState = {
  player: Player;
  world: World;
  turn: number;
  gameOver: boolean;
  victory: boolean;
  flags: Record<string, boolean>;
};

export type Screen =
  | 'title'
  | 'prologue'
  | 'explore'
  | 'battle'
  | 'inventory'
  | 'map'
  | 'game_over'
  | 'epilogue';
