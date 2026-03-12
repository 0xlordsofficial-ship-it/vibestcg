'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Crown, Flame, Zap, Shield, Trophy, Package, CreditCard, Wallet, Users } from 'lucide-react';

// Scroll reveal hook
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// 3D Card Tilt Effect
function Card3D({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const tiltX = ((y - cy) / cy) * -10;
    const tiltY = ((x - cx) / cx) * 10;
    
    card.style.transform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.04)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = '';
    }
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ${className}`}
    >
      {children}
    </div>
  );
}

// Pack Card (Phygitals style)
function PackCard({ pack, index }: { pack: any; index: number }) {
  return (
    <RevealSection delay={index * 80}>
      <Card3D className="cursor-pointer">
        <div className="card p-5 group">
          {/* Pack Image */}
          <div className={`relative aspect-square rounded-xl flex items-center justify-center mb-4 ${pack.gradient}`}>
            <span className="text-5xl filter drop-shadow-lg">{pack.emoji}</span>
            {pack.badge && (
              <span className="absolute top-2 right-2 px-2 py-1 bg-[var(--yellow)] text-black text-xs font-bold rounded-full">
                {pack.badge}
              </span>
            )}
            {pack.stock !== undefined && (
              <span className="absolute bottom-2 left-2 right-2 text-center text-xs font-bold text-white/80">
                {pack.stock} remaining
              </span>
            )}
          </div>

          {/* Info */}
          <h3 className="font-['Baloo_2'] font-black text-lg text-center mb-1">{pack.name}</h3>
          <p className="text-xs text-center text-[var(--muted)] uppercase tracking-wider mb-3">{pack.rarity}</p>
          
          <div className="flex items-center justify-between">
            <span className="font-['Baloo_2'] font-black text-xl" style={{ color: pack.color }}>${pack.price}</span>
            <button className="btn btn-primary text-sm px-4 py-2">Buy</button>
          </div>
        </div>
      </Card3D>
    </RevealSection>
  );
}

// Recent Pull Card
function RecentPullCard({ pull }: { pull: any }) {
  return (
    <div className="flex-shrink-0 w-48">
      <div className="card p-3 mr-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[var(--muted)]">{pull.time}</span>
          <span className={`px-2 py-0.5 rounded text-xs font-bold ${pull.rarityClass}`}>
            {pull.rarity}
          </span>
        </div>
        <div className={`h-20 rounded-lg flex items-center justify-center ${pull.gradient}`}>
          <span className="text-3xl">{pull.emoji}</span>
        </div>
        <div className="mt-2">
          <p className="font-bold text-sm truncate">{pull.card}</p>
          <p className="text-xs text-[var(--muted)]">by @{pull.user}</p>
        </div>
      </div>
    </div>
  );
}

// Leaderboard Row
function LeaderboardRow({ user, rank }: { user: any; rank: number }) {
  const getRankStyle = (r: number) => {
    if (r === 1) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    if (r === 2) return 'bg-gray-400/20 text-gray-300 border-gray-400/30';
    if (r === 3) return 'bg-orange-600/20 text-orange-400 border-orange-600/30';
    return 'bg-[var(--bg-hover)] text-[var(--muted)] border-[var(--border)]';
  };

  return (
    <div className="flex items-center gap-3 py-3 border-b border-[var(--border)] last:border-0">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border ${getRankStyle(rank)}`}>
        {rank <= 3 ? <Trophy size={14} /> : rank}
      </div>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--yellow)] to-[var(--coral)] flex items-center justify-center font-bold text-black">
        {user.avatar}
      </div>
      <span className="flex-1 font-bold">{user.name}</span>
      <span className="font-['Baloo_2'] font-black text-[var(--yellow)]">{user.score}</span>
    </div>
  );
}

// Testimonial Card
function TestimonialCard({ quote, user }: { quote: string; user: any }) {
  return (
    <div className="w-80 flex-shrink-0 bg-[var(--card-bg)] rounded-2xl p-6 border border-[var(--border)]">
      <p className="text-sm leading-relaxed mb-4">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: user.color }}>
          {user.avatar}
        </div>
        <span className="font-bold text-[var(--yellow)]">{user.handle}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const packs = [
    { id: '1', name: 'Pokémon', price: 25, rarity: '3 Cards', emoji: '🔥', gradient: 'linear-gradient(145deg, #FF5C4D, #FF3322)', color: '#FF5C4D', badge: null, stock: 47 },
    { id: '2', name: 'One Piece', price: 80, rarity: '5 Cards', emoji: '🏴‍☠️', gradient: 'linear-gradient(145deg, #4DC8FF, #2299DD)', color: '#4DC8FF', badge: null, stock: 23 },
    { id: '3', name: 'Baseball', price: 25, rarity: '3 Cards', emoji: '⚾', gradient: 'linear-gradient(145deg, #FFE500, #FFAA00)', color: '#FFE500', badge: null, stock: 89 },
    { id: '4', name: 'Football', price: 25, rarity: '3 Cards', emoji: '🏈', gradient: 'linear-gradient(145deg, #FF85C8, #FF55AA)', color: '#FF85C8', badge: null, stock: 156 },
    { id: '5', name: 'Yu-Gi-Oh', price: 25, rarity: '3 Cards', emoji: '🐉', gradient: 'linear-gradient(145deg, #00F5C4, #00CCAA)', color: '#00F5C4', badge: null, stock: 72 },
    { id: '6', name: 'Basketball', price: 50, rarity: '4 Cards', emoji: '🏀', gradient: 'linear-gradient(145deg, #C8AAFF, #9966FF)', color: '#C8AAFF', badge: 'BEST VALUE', stock: 34 },
  ];

  const recentPulls = [
    { user: 'BlazeKing', card: 'Charizard', rarity: 'LEGENDARY', rarityClass: 'bg-yellow-500/20 text-yellow-400', time: '2m ago', emoji: '🔥', gradient: 'bg-orange-500/20' },
    { user: 'AquaPro', card: 'Blastoise', rarity: 'EPIC', rarityClass: 'bg-purple-500/20 text-purple-400', time: '5m ago', emoji: '💧', gradient: 'bg-blue-500/20' },
    { user: 'LeafNinja', card: 'Venusaur', rarity: 'RARE', rarityClass: 'bg-blue-500/20 text-blue-400', time: '8m ago', emoji: '🌿', gradient: 'bg-green-500/20' },
    { user: 'SparkUser', card: 'Pikachu', rarity: 'RARE', rarityClass: 'bg-blue-500/20 text-blue-400', time: '12m ago', emoji: '⚡', gradient: 'bg-yellow-500/20' },
    { user: 'GhostGamer', card: 'Gengar', rarity: 'EPIC', rarityClass: 'bg-purple-500/20 text-purple-400', time: '15m ago', emoji: '👻', gradient: 'bg-purple-500/20' },
  ];

  const leaderboard = [
    { name: '@CardKing', avatar: '🃏', score: '2,400 pts' },
    { name: '@NFTHunter', avatar: '🎯', score: '1,980 pts' },
    { name: '@RipMaster', avatar: '⚡', score: '1,740 pts' },
    { name: '@CryptoGamer', avatar: '💎', score: '1,590 pts' },
    { name: '@BattlePro', avatar: '🏆', score: '1,410 pts' },
  ];

  const testimonials = [
    { quote: 'Just pulled a Charizard from a Starter Pack! This game is insane', handle: '@CryptoKing', avatar: '🔥', color: 'rgba(255,92,77,0.15)' },
    { quote: 'Battle system is fire 🔥 Won 50 USDC in my first week', handle: '@RipMaster', avatar: '⚡', color: 'rgba(255,229,0,0.15)' },
    { quote: 'Best TCG experience. True ownership means actually owning your cards', handle: '@NFTOG', avatar: '🃏', color: 'rgba(77,200,255,0.1)' },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20" style={{ background: 'rgba(255,229,0,0.07)' }} />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px] opacity-20" style={{ background: 'rgba(200,170,255,0.07)' }} />
        </div>

        <div className="relative z-10 max-w-4xl">
          <RevealSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--card-bg)] border border-[var(--border)] mb-6">
              <Sparkles size={16} className="text-[var(--yellow)]" />
              <span className="text-sm font-bold uppercase tracking-widest">Digital Packs, Physical Cards</span>
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <h1 className="font-['Baloo_2'] text-6xl md:text-8xl font-black mb-6 leading-tight">
              Rip Pokémon Packs.
              <br />
              <span className="text-[var(--yellow)]">Win Real Cards.</span>
            </h1>
          </RevealSection>

          <RevealSection delay={200}>
            <p className="text-lg text-[var(--muted)] max-w-lg mx-auto mb-8 leading-relaxed">
              Open digital packs and receive real, graded trading cards shipped to your door. 
              True ownership on the blockchain.
            </p>
          </RevealSection>

          <RevealSection delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="btn btn-primary text-lg px-8 py-4">
                Buy Now
                <ArrowRight size={20} />
              </Link>
              <Link href="/battle" className="btn btn-secondary text-lg px-8 py-4">
                Battle Now
              </Link>
            </div>
          </RevealSection>

          {/* Stats */}
          <RevealSection delay={400}>
            <div className="grid grid-cols-4 gap-6 mt-16 max-w-2xl mx-auto">
              {[
                { value: '12.5K', label: 'Packs Sold' },
                { value: '8.2K', label: 'Cards Minted' },
                { value: '62.4K', label: 'Volume (AVAX)' },
                { value: '2.8K', label: 'Holders' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="font-['Baloo_2'] text-2xl md:text-3xl font-black text-[var(--yellow)]">{stat.value}</p>
                  <p className="text-xs text-[var(--muted)] uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* PACKS SECTION - Phygitals Style */}
      <section className="py-20 px-6 bg-[var(--bg2)]">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--mint)] mb-4">🎴 Digital Packs</p>
              <h2 className="font-['Baloo_2'] text-4xl md:text-5xl font-black mb-4">
                Open Packs. Win Big.
              </h2>
              <p className="text-[var(--muted)] max-w-md mx-auto">
                Every pack contains randomized cards. Open now and start collecting.
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {packs.map((pack, i) => (
              <PackCard key={pack.id} pack={pack} index={i} />
            ))}
          </div>

          <RevealSection delay={300}>
            <div className="text-center mt-8">
              <Link href="/shop" className="btn btn-secondary">
                View All Packs
                <ArrowRight size={18} />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* RECENT PULLS - Horizontal Scroll */}
      <section className="py-16 overflow-hidden">
        <RevealSection>
          <div className="max-w-6xl mx-auto px-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <h2 className="font-['Baloo_2'] text-2xl font-bold">Recent Pulls</h2>
              </div>
              <Link href="/vault" className="text-[var(--yellow)] hover:underline text-sm">
                Open Now →
              </Link>
            </div>
          </div>
        </RevealSection>

        <div className="marquee-track">
          {[...recentPulls, ...recentPulls, ...recentPulls].map((pull, i) => (
            <RecentPullCard key={i} pull={pull} />
          ))}
        </div>
      </section>

      {/* ACTIVITY + LEADERBOARD */}
      <section className="py-20 px-6 bg-[var(--bg2)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Live Activity */}
          <RevealSection>
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--coral)] mb-4">⚡ Live Drops</p>
              <h2 className="font-['Baloo_2'] text-3xl font-black mb-4">
                What's Dropping
              </h2>
            </div>
            <div className="space-y-3">
              {recentPulls.slice(0, 4).map((pull, i) => (
                <RevealSection key={i} delay={i * 70}>
                  <div className="flex items-center gap-4 p-4 bg-[var(--card-bg)] rounded-xl border border-[var(--border)]">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pull.gradient}`}>
                      <span className="text-xl">{pull.emoji}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm">{pull.card}</p>
                      <p className="text-xs text-[var(--muted)]">by @{pull.user} · {pull.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${pull.rarityClass}`}>
                      {pull.rarity}
                    </span>
                  </div>
                </RevealSection>
              ))}
            </div>
          </RevealSection>

          {/* Leaderboard */}
          <RevealSection delay={200}>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--yellow)] mb-4">🏆 Leaderboard</p>
              </div>
              <h2 className="font-['Baloo_2'] text-3xl font-black mb-4">
                Top Collectors
              </h2>
            </div>
            <div className="card p-6">
              {leaderboard.map((user, i) => (
                <LeaderboardRow key={i} user={user} rank={i + 1} />
              ))}
              <Link href="/leaderboard" className="btn btn-primary w-full mt-6 justify-center text-sm">
                View Full Leaderboard
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* COMMUNITY SECTION */}
      <section className="py-20 overflow-hidden">
        <RevealSection>
          <div className="text-center mb-12 px-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--lilac)] mb-4">💬 What Collectors Are Saying</p>
            <h2 className="font-['Baloo_2'] text-4xl font-black">
              Join the Community
            </h2>
          </div>
        </RevealSection>

        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={i} quote={t.quote} user={t} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 bg-[var(--bg2)]">
        <div className="max-w-4xl mx-auto text-center">
          <RevealSection>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--mint)] mb-4">✦ Resources to Get Started</p>
            <h2 className="font-['Baloo_2'] text-4xl font-black mb-12">How It Works</h2>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Package, title: 'Buy a Pack', desc: 'Purchase digital packs using AVAX. Each pack contains randomized cards.' },
              { icon: CreditCard, title: 'Rip & Reveal', desc: 'Open your pack to see what cards you got. Some are super rare!' },
              { icon: Wallet, title: 'Win Real Cards', desc: 'Your digital cards are backed by real graded cards. Claim anytime.' },
            ].map((step, i) => (
              <RevealSection key={i} delay={i * 150}>
                <div className="card p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[var(--yellow)]/20 flex items-center justify-center">
                    <step.icon size={28} className="text-[var(--yellow)]" />
                  </div>
                  <h3 className="font-['Baloo_2'] font-black text-xl mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--muted)]">{step.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full blur-[120px] opacity-20" style={{ background: 'rgba(255,229,0,0.06)' }} />
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <RevealSection>
            <h2 className="font-['Baloo_2'] text-5xl font-black mb-4">
              Ready to Start?
            </h2>
            <p className="text-[var(--muted)] mb-8">
              Join thousands of collectors ripping packs and winning real cards.
            </p>
          </RevealSection>

          <RevealSection delay={200}>
            <Link href="/shop" className="btn btn-primary text-lg px-8 py-4 inline-flex">
              Get Started
              <ArrowRight size={20} />
            </Link>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
