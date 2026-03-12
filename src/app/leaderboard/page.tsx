'use client';

import { useState } from 'react';
import { Trophy, Package, Swords } from 'lucide-react';

type LeaderboardTab = 'packs' | 'battle';

const packsLeaderboard = [
  { rank: 1, username: 'CardCollector', avatar: '', packs: 156, spent: 4200, winRate: 72 },
  { rank: 2, username: 'NFTWhale', avatar: '', packs: 142, spent: 3800, winRate: 65 },
  { rank: 3, username: 'CryptoKing', avatar: '', packs: 128, spent: 3400, winRate: 68 },
  { rank: 4, username: 'PackRat', avatar: '', packs: 98, spent: 2100, winRate: 55 },
  { rank: 5, username: 'RipMaster', avatar: '', packs: 87, spent: 1950, winRate: 61 },
  { rank: 6, username: 'GamerPro', avatar: '', packs: 76, spent: 1700, winRate: 58 },
  { rank: 7, username: 'CardShark', avatar: '', packs: 65, spent: 1500, winRate: 52 },
  { rank: 8, username: 'LuckyDraw', avatar: '', packs: 54, spent: 1200, winRate: 48 },
  { rank: 9, username: 'TokenHunter', avatar: '', packs: 43, spent: 950, winRate: 45 },
  { rank: 10, username: 'BlockchainBoy', avatar: '', packs: 38, spent: 800, winRate: 42 },
];

const battleLeaderboard = [
  { rank: 1, username: 'BattleKing', avatar: '', points: 2500, earned: 1250, wins: 45, total: 52, winRate: 87 },
  { rank: 2, username: 'RipAndDip', avatar: '', points: 2100, earned: 980, wins: 38, total: 48, winRate: 79 },
  { rank: 3, username: 'CardSmasher', avatar: '', points: 1850, earned: 750, wins: 32, total: 45, winRate: 71 },
  { rank: 4, username: 'NFTHunter', avatar: '', points: 1600, earned: 620, wins: 28, total: 40, winRate: 70 },
  { rank: 5, username: 'CryptoGamer', avatar: '', points: 1400, earned: 500, wins: 24, total: 35, winRate: 69 },
  { rank: 6, username: 'PackBreaker', avatar: '', points: 1200, earned: 420, wins: 21, total: 32, winRate: 66 },
  { rank: 7, username: 'WinnerWins', avatar: '', points: 1050, earned: 350, wins: 18, total: 28, winRate: 64 },
  { rank: 8, username: 'AceTrader', avatar: '', points: 900, earned: 280, wins: 15, total: 25, winRate: 60 },
  { rank: 9, username: 'LuckyStar', avatar: '', points: 750, earned: 200, wins: 12, total: 20, winRate: 60 },
  { rank: 10, username: 'NewPlayer', avatar: '', points: 600, earned: 150, wins: 10, total: 18, winRate: 56 },
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('battle');

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 2: return 'bg-gray-400/20 text-gray-300 border-gray-400/30';
      case 3: return 'bg-orange-600/20 text-orange-400 border-orange-600/30';
      default: return 'bg-[var(--bg-hover)] text-[var(--text-secondary)] border-[var(--border)]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">Leaderboard</h1>
        <p className="text-[var(--text-secondary)]">Top players by packs bought and battles won</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('packs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'packs' 
              ? 'bg-orange-500 text-white' 
              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
          }`}
        >
          <Package size={18} />
          Packs Bought
        </button>
        <button
          onClick={() => setActiveTab('battle')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'battle' 
              ? 'bg-orange-500 text-white' 
              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
          }`}
        >
          <Swords size={18} />
          Battle
        </button>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] overflow-hidden">
        {/* Table Header */}
        <div className="grid gap-4 p-4 border-b border-[var(--border)] text-sm font-medium text-[var(--text-secondary)]"
          style={{ gridTemplateColumns: '60px 1fr 120px 120px 100px' }}
        >
          <span>Rank</span>
          <span>Player</span>
          {activeTab === 'packs' ? (
            <>
              <span>Packs</span>
              <span>$ Spent</span>
              <span>Win Rate</span>
            </>
          ) : (
            <>
              <span>Points</span>
              <span>$ Earned</span>
              <span>Win Rate</span>
            </>
          )}
        </div>

        {/* Table Body */}
        <div className="divide-y divide-[var(--border)]">
          {(activeTab === 'packs' ? packsLeaderboard : battleLeaderboard).map((entry) => (
            <div
              key={entry.rank}
              className="grid gap-4 p-4 items-center hover:bg-[var(--bg-hover)] transition-colors"
              style={{ gridTemplateColumns: '60px 1fr 120px 120px 100px' }}
            >
              {/* Rank */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${getRankStyle(entry.rank)}`}>
                {entry.rank <= 3 ? <Trophy size={14} /> : entry.rank}
              </div>

              {/* Username */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {entry.username[0]}
                </div>
                <span className="font-medium">{entry.username}</span>
              </div>

              {/* Points/Packs */}
              <div className="font-bold">
                {activeTab === 'packs' ? entry.packs : entry.points}
                {activeTab === 'battle' && <span className="text-xs text-[var(--text-secondary)] ml-1">pts</span>}
              </div>

              {/* Earned/Spent */}
              <div className={activeTab === 'battle' ? 'text-green-400' : ''}>
                {activeTab === 'packs' ? `$${entry.spent}` : `$${entry.earned}`}
              </div>

              {/* Win Rate */}
              <div className="text-sm">
                <span className={`px-2 py-1 rounded ${
                  entry.winRate >= 70 ? 'bg-green-500/20 text-green-400' :
                  entry.winRate >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {entry.winRate}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Position */}
      <div className="bg-[var(--bg-secondary)] rounded-xl border border-orange-500/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              Y
            </div>
            <div>
              <p className="font-medium">Your Position</p>
              <p className="text-sm text-[var(--text-secondary)]">Not ranked yet</p>
            </div>
          </div>
          <button className="text-orange-400 hover:text-orange-300 text-sm">
            View Stats →
          </button>
        </div>
      </div>
    </div>
  );
}
