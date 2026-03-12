// User types
export interface Profile {
  id: string;
  privy_id: string;
  wallet_address: string;
  username: string;
  avatar_url?: string;
  bio?: string;
  theme_preference: 'dark' | 'light';
  vibe_points: number;
  created_at: string;
}

// Pack types
export interface PackTemplate {
  id: string;
  name: string;
  description: string;
  price: number; // in USDC (smallest unit)
  image_url: string;
  drop_rates: DropRates;
  is_featured: boolean;
  created_at: string;
}

export interface DropRates {
  common: number;
  uncommon: number;
  rare: number;
  epic: number;
  legendary: number;
}

export interface UserPack {
  id: string;
  user_id: string;
  pack_template_id: string;
  pack_template?: PackTemplate;
  is_opened: boolean;
  opened_at?: string;
  created_at: string;
}

// Card types
export interface CardTemplate {
  id: string;
  name: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  image_url: string;
  description?: string;
  stats?: CardStats;
  created_at: string;
}

export interface CardStats {
  attack: number;
  defense: number;
  speed: number;
}

export interface UserCard {
  id: string;
  user_id: string;
  card_template_id: string;
  card_template?: CardTemplate;
  created_at: string;
}

// Battle types
export type BattleStatus = 'waiting' | 'ready' | 'in_progress' | 'completed' | 'cancelled';

export interface Battle {
  id: string;
  creator_id: string;
  opponent_id?: string;
  pack_id: string; // pack being used
  wager_amount: number;
  status: BattleStatus;
  is_private: boolean;
  access_code?: string;
  winner_id?: string;
  creator_score: number;
  opponent_score: number;
  created_at: string;
  completed_at?: string;
}

export interface BattleCard {
  id: string;
  battle_id: string;
  user_id: string;
  card_template_id: string;
  card_template?: CardTemplate;
}

// Transaction types
export type TransactionType = 
  | 'pack_purchase'
  | 'battle_wager'
  | 'battle_win'
  | 'battle_loss'
  | 'deposit'
  | 'withdrawal'
  | 'fee';

export interface Transaction {
  id: string;
  user_id: string;
  type: TransactionType;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  tx_hash?: string;
  description?: string;
  created_at: string;
}

// Live pull types
export interface LivePull {
  id: string;
  user_id: string;
  username: string;
  avatar_url?: string;
  card_template_id: string;
  card_template?: CardTemplate;
  is_battle: boolean;
  battle_id?: string;
  created_at: string;
}

// Leaderboard types
export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  avatar_url?: string;
  packs_bought?: number;
  total_spent?: number;
  battle_points?: number;
  total_earned?: number;
  battles_won?: number;
  battles_total?: number;
  win_rate?: number;
}
