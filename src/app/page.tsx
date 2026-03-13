'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Package, Crown, ChevronRight, Zap, Wallet, Gift, TrendingUp, Users, MessageCircle, Repeat, Heart, BarChart3 } from 'lucide-react';

// Pack data
const packs = [
  { id: '1', name: 'Pokémon', price: 25, cards: 3, emoji: '🔥', gradient: 'from-red-500 to-orange-500', featured: false },
  { id: '2', name: 'One Piece', price: 80, cards: 5, emoji: '🏴‍☠️', gradient: 'from-blue-500 to-cyan-500', featured: true },
  { id: '3', name: 'Baseball', price: 25, cards: 3, emoji: '⚾', gradient: 'from-green-500 to-emerald-500', featured: false },
  { id: '4', name: 'Football', price: 25, cards: 3, emoji: '🏈', gradient: 'from-orange-500 to-red-500', featured: false },
  { id: '5', name: 'Yu-Gi-Oh', price: 25, cards: 3, emoji: '🐉', gradient: 'from-purple-500 to-pink-500', featured: false },
  { id: '6', name: 'Basketball', price: 50, cards: 4, emoji: '🏀', gradient: 'from-orange-500 to-yellow-500', featured: false },
];

// Live pulls
const livePulls = [
  { user: 'BlazeKing', card: 'Charizard', rarity: 'Legendary', emoji: '🔥', time: '2m ago' },
  { user: 'AquaPro', card: 'Blastoise', rarity: 'Epic', emoji: '💧', time: '5m ago' },
  { user: 'LeafNinja', card: 'Venusaur', rarity: 'Rare', emoji: '🌿', time: '8m ago' },
  { user: 'SparkUser', card: 'Pikachu', rarity: 'Rare', emoji: '⚡', time: '12m ago' },
  { user: 'GhostGamer', card: 'Gengar', rarity: 'Epic', emoji: '👻', time: '15m ago' },
];

// Leaderboard
const leaderboard = [
  { rank: 1, user: 'CardKing', packs: 156, wins: 89 },
  { rank: 2, user: 'NFTWhale', packs: 142, wins: 76 },
  { rank: 3, user: 'RipMaster', packs: 128, wins: 68 },
  { rank: 4, user: 'PackRat', packs: 98, wins: 52 },
  { rank: 5, user: 'Collector', packs: 87, wins: 45 },
];

// Testimonials (X posts)
const testimonials = [
  { name: 'SteelTamer8315', handle: '@steel', avatar: '🅰️', quote: 'LFG my claim came it look how nice those slabs are, thank you again one love', likes: 149, retweets: 10, replies: 42 },
  { name: 'Mikerow01', handle: '@mikerow01', avatar: '📦', quote: 'Just got my first phygital card. The quality is insane!', likes: 89, retweets: 12, replies: 23 },
  { name: 'Lynch', handle: '@_LYNCHY_', avatar: '🎴', quote: 'Digital to physical in just under 2 weeks super cool!', likes: 156, retweets: 28, replies: 35 },
];

// Rarity badge
function RarityBadge({ rarity }: { rarity: string }) {
  const colors: Record<string, string> = {
    Legendary: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Epic: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    Rare: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Uncommon: 'bg-green-500/20 text-green-400 border-green-500/30',
    Common: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${colors[rarity] || colors.Common}`}>
      {rarity}
    </span>
  );
}

// Pack Card
function PackCard({ pack }: { pack: typeof packs[0] }) {
  return (
    <div className="group bg-[#13132a] rounded-2xl border border-white/5 overflow-hidden hover:border-white/15 transition-all hover:-translate-y-1">
      <div className={`aspect-square bg-gradient-to-br ${pack.gradient} p-8 flex items-center justify-center relative`}>
        <span className="text-6xl filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">
          {pack.emoji}
        </span>
        {pack.featured && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-black/40 rounded-full">
            <span className="text-xs font-bold uppercase text-white/80">Featured</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{pack.name}</h3>
        <p className="text-white/50 text-sm mb-3">{pack.cards} cards per pack</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">${pack.price}</span>
          <button className="bg-[#00D26A] hover:bg-[#00c25e] text-black font-bold px-4 py-2 rounded-lg text-sm transition-colors">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

// Live Pull Card
function LivePullCard({ pull }: { pull: typeof livePulls[0] }) {
  return (
    <div className="flex-shrink-0 w-60">
      <div className="bg-[#13132a] rounded-xl border border-white/5 p-3 mr-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white/40">{pull.time}</span>
          <RarityBadge rarity={pull.rarity} />
        </div>
        <div className={`h-20 rounded-lg flex items-center justify-center mb-2 bg-gradient-to-br ${
          pull.rarity === 'Legendary' ? 'from-yellow-500/30 to-orange-500/30' :
          pull.rarity === 'Epic' ? 'from-purple-500/30 to-pink-500/30' :
          'from-blue-500/30 to-cyan-500/30'
        }`}>
          <span className="text-4xl">{pull.emoji}</span>
        </div>
        <p className="font-bold text-sm">{pull.card}</p>
        <p className="text-xs text-white/50">by {pull.user}</p>
      </div>
    </div>
  );
}

// Leaderboard Item
function LeaderboardItem({ item }: { item: typeof leaderboard[0] }) {
  const rankColors = ['text-yellow-400', 'text-gray-300', 'text-amber-600'];
  return (
    <div className="flex items-center gap-3 py-2">
      <span className={`font-bold w-6 ${rankColors[item.rank - 1] || 'text-white/50'}`}>#{item.rank}</span>
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xs font-bold text-black">
        {item.user[0]}
      </div>
      <span className="flex-1 font-medium text-sm">{item.user}</span>
      <div className="text-right">
        <p className="font-bold text-sm">{item.packs}</p>
        <p className="text-xs text-white/40">packs</p>
      </div>
    </div>
  );
}

// Testimonial Card
function TestimonialCard({ item }: { item: typeof testimonials[0] }) {
  return (
    <div className="flex-shrink-0 w-80">
      <div className="bg-[#13132a] rounded-xl border border-white/5 p-5 mr-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-purple-500 flex items-center justify-center text-lg">
            {item.avatar}
          </div>
          <div>
            <p className="font-bold text-sm">{item.name}</p>
            <p className="text-xs text-white/50">{item.handle}</p>
          </div>
        </div>
        <p className="text-sm text-white/80 leading-relaxed mb-3">{item.quote}</p>
        <div className="flex items-center gap-4 text-xs text-white/40">
          <span className="flex items-center gap-1"><Heart size={12} /> {item.likes}</span>
          <span className="flex items-center gap-1"><Repeat size={12} /> {item.retweets}</span>
          <span className="flex items-center gap-1"><MessageCircle size={12} /> {item.replies}</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      {/* ==================== HEADER ==================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-black text-2xl">VibeTCG</Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-white/70 hover:text-white text-sm font-medium transition-colors">Packs</Link>
            <Link href="/battle" className="text-white/70 hover:text-white text-sm font-medium transition-colors">Pack Party</Link>
            <Link href="/vault" className="text-white/70 hover:text-white text-sm font-medium transition-colors">Marketplace</Link>
            <Link href="/leaderboard" className="text-white/70 hover:text-white text-sm font-medium transition-colors">Explore</Link>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#13132a] rounded-lg border border-white/10">
              <Wallet size={16} />
              <span className="font-mono font-medium">$0.00</span>
            </button>
            <button className="px-4 py-2 bg-[#00D26A] hover:bg-[#00c25e] text-black font-bold rounded-lg text-sm">
              Add Funds
            </button>
          </div>
        </div>
      </header>

      {/* ==================== HERO ==================== */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div>
              <h1 className="font-black text-5xl md:text-6xl leading-tight mb-6">
                Rip Pokémon Packs.<br />
                <span className="text-[#00D26A]">Win Real Cards.</span>
              </h1>
              <p className="text-white/60 text-lg mb-8 max-w-md">
                Open a digital pack to reveal a real, graded card. Hold, trade, redeem, or sell back anytime at 85% value.
              </p>
              <button className="bg-[#00D26A] hover:bg-[#00c25e] text-black font-bold text-lg px-8 py-4 rounded-xl transition-colors inline-flex items-center gap-2">
                Buy Now <ArrowRight size={22} />
              </button>
              
              {/* Options */}
              <div className="flex gap-6 mt-8">
                {['Hold', 'Trade', 'Redeem', 'Sell Back 85%'].map((opt, i) => (
                  <span key={i} className="text-white/50 text-sm">{opt}</span>
                ))}
              </div>
            </div>

            {/* Right - Pack Art */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-3xl p-12 flex items-center justify-center">
                <span className="text-[180px]">🔥</span>
              </div>
              {/* Decorative */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-500/20 rounded-full blur-2xl" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PACKS ==================== */}
      <section className="py-16 px-6 bg-[#13132a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-black text-3xl">Digital Packs</h2>
            <Link href="/shop" className="flex items-center gap-1 text-white/60 hover:text-white text-sm font-medium">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {packs.map((pack) => (
              <PackCard key={pack.id} pack={pack} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== RECENT PULLS + LEADERBOARD ==================== */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Pulls */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <h3 className="font-bold text-xl">Recent Pulls</h3>
              </div>
              <div className="flex overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex">
                  {[...livePulls, ...livePulls].map((pull, i) => (
                    <LivePullCard key={i} pull={pull} />
                  ))}
                </div>
              </div>
            </div>

            {/* Leaderboard */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl">Leaderboard</h3>
                <Link href="/leaderboard" className="text-white/50 hover:text-white text-sm">View all</Link>
              </div>
              <div className="bg-[#13132a] rounded-2xl border border-white/5 p-4">
                {leaderboard.map((item) => (
                  <LeaderboardItem key={item.rank} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHAT COLLECTORS ARE SAYING ==================== */}
      <section className="py-16 px-6 bg-[#13132a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-black text-3xl mb-8">What Collectors Are Saying</h2>
          <div className="flex overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-4">
              {[...testimonials, ...testimonials, ...testimonials].map((item, i) => (
                <TestimonialCard key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== LATEST ACTIVITY ==================== */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-black text-3xl mb-8">Latest Activity</h2>
          {/* Scrolling ticker */}
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee gap-8">
              {[
                '🔥 BlazeKing just pulled a Charizard!',
                '💧 AquaPro got Blastoise!',
                '🌿 LeafNinja found Venusaur!',
                '⚡ SparkUser pulled Pikachu!',
                '👻 GhostGamer got Gengar!',
                '🔮 PsychicPro found Mewtwo!',
                '🐲 DragonFan pulled Dragonite!',
              ].map((activity, i) => (
                <span key={i} className="text-white/60 text-sm whitespace-nowrap">{activity}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== GETTING STARTED ==================== */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-black text-3xl mb-4">Ready to Get Started?</h2>
          <p className="text-white/50 mb-8">Join thousands of collectors ripping packs and winning real cards.</p>
          <button className="bg-[#00D26A] hover:bg-[#00c25e] text-black font-bold text-lg px-8 py-4 rounded-xl transition-colors">
            Start Ripping
          </button>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="font-black text-xl">VibeTCG</span>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
            <p className="text-sm text-white/30">© 2026 VibeTCG</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
