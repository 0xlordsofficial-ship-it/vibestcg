'use client';

import { useState, useEffect, useRef } from 'react';
import { Trophy, Package, Swords, Crown, Medal, Target } from 'lucide-react';

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
}

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return <div ref={ref} className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

type PacksEntry = { rank: number; username: string; packs: number; spent: number; winRate: number };
type BattleEntry = { rank: number; username: string; points: number; earned: number; wins: number; total: number; winRate: number };

const packsLeaderboard: PacksEntry[] = [
  { rank: 1, username: 'CardCollector', packs: 156, spent: 4200, winRate: 72 },
  { rank: 2, username: 'NFTWhale', packs: 142, spent: 3800, winRate: 65 },
  { rank: 3, username: 'CryptoKing', packs: 128, spent: 3400, winRate: 68 },
  { rank: 4, username: 'PackRat', packs: 98, spent: 2100, winRate: 55 },
  { rank: 5, username: 'RipMaster', packs: 87, spent: 1950, winRate: 61 },
  { rank: 6, username: 'GamerPro', packs: 76, spent: 1700, winRate: 58 },
  { rank: 7, username: 'CardShark', packs: 65, spent: 1500, winRate: 52 },
  { rank: 8, username: 'LuckyDraw', packs: 54, spent: 1200, winRate: 48 },
];

const battleLeaderboard: BattleEntry[] = [
  { rank: 1, username: 'BattleKing', points: 2500, earned: 1250, wins: 45, total: 52, winRate: 87 },
  { rank: 2, username: 'RipAndDip', points: 2100, earned: 980, wins: 38, total: 48, winRate: 79 },
  { rank: 3, username: 'CardSmasher', points: 1850, earned: 750, wins: 32, total: 45, winRate: 71 },
  { rank: 4, username: 'NFTHunter', points: 1600, earned: 620, wins: 28, total: 40, winRate: 70 },
  { rank: 5, username: 'CryptoGamer', points: 1400, earned: 500, wins: 24, total: 35, winRate: 69 },
  { rank: 6, username: 'PackBreaker', points: 1200, earned: 420, wins: 21, total: 32, winRate: 66 },
  { rank: 7, username: 'WinnerWins', points: 1050, earned: 350, wins: 18, total: 28, winRate: 64 },
  { rank: 8, username: 'AceTrader', points: 900, earned: 280, wins: 15, total: 25, winRate: 60 },
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<'packs' | 'battle'>('battle');

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 2: return 'bg-gray-400/20 text-gray-300 border-gray-400/30';
      case 3: return 'bg-orange-600/20 text-orange-400 border-orange-600/30';
      default: return 'bg-[var(--bg-hover)] text-[var(--text-muted)] border-[var(--border)]';
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="py-8 border-b border-[var(--border)] mb-8">
        <div className="max-w-6xl mx-auto px-6">
          <RevealSection>
            <h1 className="font-display text-5xl font-black mb-2">Leaderboard</h1>
            <p className="text-[var(--text-muted)] text-lg">Top players by packs and battles</p>
          </RevealSection>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <RevealSection delay={100}>
          <div className="flex gap-2 mb-8">
            <button onClick={() => setActiveTab('packs')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'packs' ? 'bg-[var(--accent-yellow)] text-black' : 'bg-[var(--bg-card)] text-[var(--text-muted)] hover:bg-[var(--bg-hover)]'}`}>
              <Package size={20} /> Packs Bought
            </button>
            <button onClick={() => setActiveTab('battle')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'battle' ? 'bg-[var(--accent-yellow)] text-black' : 'bg-[var(--bg-card)] text-[var(--text-muted)] hover:bg-[var(--bg-hover)]'}`}>
              <Swords size={20} /> Battle
            </button>
          </div>
        </RevealSection>

        <RevealSection delay={200}>
          <div className="card overflow-hidden">
            <div className="grid gap-4 p-4 border-b border-[var(--border)] text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]" style={{ gridTemplateColumns: '60px 1fr 120px 120px 100px' }}>
              <span>#</span>
              <span>Player</span>
              {activeTab === 'packs' ? (<><span>Packs</span><span>$ Spent</span><span>Win Rate</span></>) : (<><span>Points</span><span>$ Earned</span><span>Win Rate</span></>)}
            </div>
            <div className="divide-y divide-[var(--border)]">
              {(activeTab === 'packs' ? packsLeaderboard : battleLeaderboard).map((entry) => (
                <div key={entry.rank} className="grid gap-4 p-4 items-center hover:bg-[var(--bg-hover)] transition-colors" style={{ gridTemplateColumns: '60px 1fr 120px 120px 100px' }}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border ${getRankStyle(entry.rank)}`}>
                    {entry.rank <= 3 ? <Trophy size={16} /> : entry.rank}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent-yellow)] to-[var(--accent-coral)] rounded-full flex items-center justify-center text-black font-bold">
                      {entry.username[0]}
                    </div>
                    <span className="font-bold">{entry.username}</span>
                  </div>
                  <div className="font-black text-lg">
                    {activeTab === 'packs' ? (entry as PacksEntry).packs : (entry as BattleEntry).points}
                    {activeTab === 'battle' && <span className="text-xs text-[var(--text-muted)] ml-1">pts</span>}
                  </div>
                  <div className={activeTab === 'battle' ? 'text-green-400 font-bold' : 'font-bold'}>
                    {activeTab === 'packs' ? `$${(entry as PacksEntry).spent}` : `$${(entry as BattleEntry).earned}`}
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      (activeTab === 'packs' ? (entry as PacksEntry).winRate : (entry as BattleEntry).winRate) >= 70 ? 'bg-green-500/20 text-green-400' :
                      (activeTab === 'packs' ? (entry as PacksEntry).winRate : (entry as BattleEntry).winRate) >= 50 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {activeTab === 'packs' ? (entry as PacksEntry).winRate : (entry as BattleEntry).winRate}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection delay={300}>
          <div className="mt-8 card p-6 bg-gradient-to-br from-[var(--accent-yellow)]/10 to-[var(--accent-coral)]/10 border-[var(--accent-yellow)]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent-yellow)] to-[var(--accent-coral)] rounded-full flex items-center justify-center text-black font-bold">Y</div>
                <div>
                  <p className="font-bold">Your Position</p>
                  <p className="text-sm text-[var(--text-muted)]">Not ranked yet</p>
                </div>
              </div>
              <button className="btn btn-secondary">View Stats →</button>
            </div>
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
