import Link from 'next/link';
import { Trophy, ArrowRight, Sparkles } from 'lucide-react';

// Mock data - will come from Supabase later
const featuredPacks = [
  { id: '1', name: 'Starter Pack', price: 10, image: '/packs/starter.png', rarity: 'common' },
  { id: '2', name: 'Elite Box', price: 50, image: '/packs/elite.png', rarity: 'rare' },
  { id: '3', name: 'Legendary Case', price: 100, image: '/packs/legendary.png', rarity: 'legendary' },
];

const livePulls = [
  { id: '1', user: 'CryptoKing', card: 'Charizard', rarity: 'legendary', time: '2m ago' },
  { id: '2', user: 'CardMaster', card: 'Mewtwo', rarity: 'epic', time: '5m ago' },
  { id: '3', user: 'NFTHunter', card: 'Blastoise', rarity: 'rare', time: '8m ago' },
  { id: '4', user: 'GamerPro', card: 'Pikachu', rarity: 'rare', time: '12m ago' },
];

const miniLeaderboard = [
  { rank: 1, username: 'CardKing', points: 2500, earned: '$1,250' },
  { rank: 2, username: 'NFTWinner', points: 2100, earned: '$980' },
  { rank: 3, username: 'BattlePro', points: 1850, earned: '$750' },
  { rank: 4, username: 'RipMaster', points: 1600, earned: '$620' },
  { rank: 5, username: 'CryptoGamer', points: 1400, earned: '$500' },
];

export default function Home() {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-400';
      case 'epic': return 'text-purple-400';
      case 'rare': return 'text-blue-400';
      case 'uncommon': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero / Featured Pack */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/20 via-purple-500/20 to-blue-500/20 p-8 border border-[var(--border)]">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-orange-400 mb-2">
            <Sparkles size={18} />
            <span className="text-sm font-medium">Featured Drop</span>
          </div>
          <h2 className="text-4xl font-bold mb-2">Neon Genesis Collection</h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-xl">
            Exclusive cyberpunk-themed cards with legendary drop rates. 
            Only available for 48 hours!
          </p>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">$50</span>
            <Link 
              href="/shop" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              Buy Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute -right-10 bottom-0 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl" />
      </section>

      {/* Live Pulls & Mini Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Rare Pulls */}
        <section className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Live Rare Pulls
            </h3>
          </div>
          <div className="space-y-3">
            {livePulls.map((pull) => (
              <div 
                key={pull.id}
                className="flex items-center justify-between p-3 bg-[var(--bg)] rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-purple-500 rounded-lg" />
                  <div>
                    <p className="font-medium">{pull.user}</p>
                    <p className={`text-sm ${getRarityColor(pull.rarity)}`}>{pull.card}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${getRarityColor(pull.rarity)} bg-[var(--bg-hover)]`}>
                  {pull.rarity}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Mini Leaderboard */}
        <section className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Trophy size={18} className="text-yellow-400" />
              Top Battlers
            </h3>
            <Link href="/leaderboard" className="text-sm text-orange-400 hover:text-orange-300">
              View All
            </Link>
          </div>
          <div className="space-y-2">
            {miniLeaderboard.map((user, idx) => (
              <div 
                key={user.rank}
                className="flex items-center justify-between p-3 bg-[var(--bg)] rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold ${
                    idx === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                    idx === 1 ? 'bg-gray-400/20 text-gray-300' :
                    idx === 2 ? 'bg-orange-600/20 text-orange-400' :
                    'bg-[var(--bg-hover)] text-[var(--text-secondary)]'
                  }`}>
                    {user.rank}
                  </span>
                  <span className="font-medium">{user.username}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{user.points} pts</p>
                  <p className="text-xs text-green-400">{user.earned}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Featured Packs Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Available Packs</h3>
          <Link href="/shop" className="text-sm text-orange-400 hover:text-orange-300">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredPacks.map((pack) => (
            <Link
              key={pack.id}
              href="/shop"
              className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-4 hover:border-orange-500/50 transition-all group"
            >
              <div className="aspect-square bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">🎁</span>
              </div>
              <h4 className="font-semibold mb-1">{pack.name}</h4>
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">{pack.price} USDC</span>
                <span className={`text-xs px-2 py-1 rounded ${getRarityColor(pack.rarity)} bg-[var(--bg-hover)]`}>
                  {pack.rarity}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Community Section */}
      <section className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold mb-4">Community Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="aspect-video bg-[var(--bg)] rounded-lg flex items-center justify-center text-[var(--text-secondary)]">
            Twitter Embed - Coming Soon
          </div>
          <div className="aspect-video bg-[var(--bg)] rounded-lg flex items-center justify-center text-[var(--text-secondary)]">
            Stream Clip - Coming Soon
          </div>
        </div>
      </section>
    </div>
  );
}
