'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Crown, Flame, Zap, Shield } from 'lucide-react';

// Scroll reveal hook
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Animated section wrapper
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

// Pack Card Component
function PackCard({ pack, index }: { pack: any; index: number }) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-cyan-500';
      case 'uncommon': return 'from-green-400 to-emerald-500';
      default: return 'from-gray-400 to-slate-500';
    }
  };

  return (
    <div 
      className="group cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="card p-4 hover:scale-[1.02] transition-transform duration-300">
        {/* Pack Image */}
        <div className={`aspect-square rounded-xl bg-gradient-to-br ${getRarityColor(pack.rarity)} p-4 flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
          <span className="text-6xl filter drop-shadow-lg">{pack.emoji}</span>
          
          {/* Rarity Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/50 text-white backdrop-blur-sm`}>
              {pack.rarity}
            </span>
          </div>
        </div>

        {/* Pack Info */}
        <div className="mt-4">
          <h3 className="font-display text-xl font-bold">{pack.name}</h3>
          <p className="text-sm text-[var(--text-muted)] mt-1">{pack.description}</p>
          
          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="text-2xl font-bold text-accent">{pack.price}</span>
              <span className="text-[var(--text-muted)] text-sm ml-1">USDC</span>
            </div>
            <button className="btn btn-primary text-xs px-4 py-2">
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Live Pull Card
function LivePullCard({ pull }: { pull: any }) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'epic': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'rare': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="flex-shrink-0 w-48">
      <div className="card p-3 mr-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[var(--text-muted)]">{pull.time}</span>
          <span className={`px-2 py-0.5 rounded text-xs border ${getRarityColor(pull.rarity)}`}>
            {pull.rarity}
          </span>
        </div>
        <div className={`h-24 rounded-lg bg-gradient-to-br ${pull.gradient} flex items-center justify-center`}>
          <span className="text-4xl">{pull.emoji}</span>
        </div>
        <div className="mt-2">
          <p className="font-bold text-sm truncate">{pull.card}</p>
          <p className="text-xs text-[var(--text-muted)]">by @{pull.user}</p>
        </div>
      </div>
    </div>
  );
}

// How It Works Card
function HowItWorksCard({ step, icon: Icon, title, description, delay }: any) {
  return (
    <RevealSection delay={delay}>
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--accent-yellow)] to-[var(--accent-coral)] flex items-center justify-center">
          <Icon size={32} className="text-black" />
        </div>
        <h3 className="font-display text-xl font-bold mb-2">{title}</h3>
        <p className="text-[var(--text-muted)]">{description}</p>
      </div>
    </RevealSection>
  );
}

export default function Home() {
  const packs = [
    { id: '1', name: 'Starter Pack', price: 10, rarity: 'common', emoji: '🎁', description: 'Perfect for beginners' },
    { id: '2', name: 'Elite Box', price: 50, rarity: 'rare', emoji: '💎', description: 'Higher rare chances' },
    { id: '3', name: 'Legendary Case', price: 100, rarity: 'legendary', emoji: '👑', description: 'Premium cards inside' },
    { id: '4', name: 'Neon Pack', price: 75, rarity: 'epic', emoji: '⚡', description: 'Limited cyber edition' },
  ];

  const livePulls = [
    { id: '1', user: 'BlazeKing', card: 'Charizard', rarity: 'legendary', time: '2m ago', emoji: '🔥', gradient: 'from-orange-500 to-red-600' },
    { id: '2', user: 'AquaPro', card: 'Blastoise', rarity: 'epic', time: '5m ago', emoji: '💧', gradient: 'from-blue-500 to-cyan-600' },
    { id: '3', user: 'LeafNinja', card: 'Venusaur', rarity: 'rare', time: '8m ago', emoji: '🌿', gradient: 'from-green-500 to-emerald-600' },
    { id: '4', user: 'SparkUser', card: 'Pikachu', rarity: 'rare', time: '12m ago', emoji: '⚡', gradient: 'from-yellow-500 to-orange-600' },
    { id: '5', user: 'GhostGamer', card: 'Gengar', rarity: 'epic', time: '15m ago', emoji: '👻', gradient: 'from-purple-500 to-pink-600' },
  ];

  const howItWorks = [
    { icon: Crown, title: 'Buy Packs', description: 'Browse and purchase digital packs with USDC on Avalanche' },
    { icon: Sparkles, title: 'Rip & Reveal', description: 'Open your pack to reveal 5 unique on-chain cards' },
    { icon: Flame, title: 'Battle & Win', description: 'Challenge other players in pack rip battles for stakes' },
  ];

  const stats = [
    { value: '12.5K', label: 'Packs Sold' },
    { value: '62.4K', label: 'Cards Minted' },
    { value: '$45K', label: 'Volume' },
    { value: '2.8K', label: 'Players' },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" />
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[var(--accent-yellow)] rounded-full blur-[120px] opacity-20" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[var(--accent-coral)] rounded-full blur-[120px] opacity-20" />
        
        {/* Floating Characters */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 text-8xl float float-delay-1 opacity-80">🃏</div>
          <div className="absolute top-1/3 right-1/4 text-6xl float float-delay-2 opacity-60">⚡</div>
          <div className="absolute bottom-1/3 left-1/3 text-7xl float float-delay-3 opacity-70">👑</div>
          <div className="absolute bottom-1/4 right-1/3 text-5xl float float-delay-4 opacity-50">💎</div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <RevealSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-card)] border border-[var(--border)] mb-6">
              <Sparkles size={16} className="text-[var(--accent-yellow)]" />
              <span className="text-sm font-medium">On Avalanche Chain</span>
            </div>
          </RevealSection>
          
          <RevealSection delay={100}>
            <h1 className="font-display text-6xl md:text-8xl font-black mb-6 leading-tight">
              Buy. Rip.
              <br />
              <span className="text-accent">Collect.</span>
            </h1>
          </RevealSection>
          
          <RevealSection delay={200}>
            <p className="text-xl text-[var(--text-muted)] mb-8 max-w-2xl mx-auto">
              The first 100% on-chain trading card game. 
              Buy packs, rip for real NFTs, and battle for stakes.
            </p>
          </RevealSection>
          
          <RevealSection delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="btn btn-primary text-lg px-8 py-4">
                Start Collecting
                <ArrowRight size={20} />
              </Link>
              <Link href="/battle" className="btn btn-secondary text-lg px-8 py-4">
                Battle Now
              </Link>
            </div>
          </RevealSection>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-[var(--text-muted)] flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-[var(--text-muted)] rounded-full" />
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <RevealSection>
        <section className="py-8 border-y border-[var(--border)] bg-[var(--bg-secondary)]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="font-display text-4xl font-bold text-accent">{stat.value}</p>
                  <p className="text-[var(--text-muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* PACKS GRID */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="font-display text-4xl font-bold mb-2">Available Packs</h2>
                <p className="text-[var(--text-muted)]">Grab them before they're gone</p>
              </div>
              <Link href="/shop" className="btn btn-secondary">
                View All
                <ArrowRight size={18} />
              </Link>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packs.map((pack, i) => (
              <RevealSection key={pack.id} delay={i * 100}>
                <PackCard pack={pack} index={i} />
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE ACTIVITY MARQUEE */}
      <section className="py-16 bg-[var(--bg-secondary)] overflow-hidden">
        <RevealSection>
          <div className="max-w-6xl mx-auto px-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <h2 className="font-display text-2xl font-bold">Live Pulls</h2>
              </div>
              <Link href="/vault" className="text-[var(--accent-yellow)] hover:underline">
                Open Now →
              </Link>
            </div>
          </div>
        </RevealSection>

        {/* Marquee */}
        <div className="relative">
          <div className="marquee-track flex">
            {[...livePulls, ...livePulls, ...livePulls].map((pull, i) => (
              <LivePullCard key={`${pull.id}-${i}`} pull={pull} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-[var(--text-muted)]">Three steps to start collecting</p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorks.map((step, i) => (
              <HowItWorksCard key={i} {...step} delay={i * 150} />
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY SECTION */}
      <section className="py-20 px-6 bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl font-bold mb-4">What Players Say</h2>
              <p className="text-[var(--text-muted)]">Join thousands of collectors</p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: "Just pulled a Charizard from a Starter Pack! This game is insane", user: "@CryptoKing" },
              { quote: "Battle system is fire 🔥 Won 50 USDC in my first week", user: "@RipMaster" },
              { quote: "Best TCG experience. True ownership means actually owning your cards", user: "@NFTOG" },
            ].map((testimonial, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="card p-6">
                  <p className="text-lg mb-4">"{testimonial.quote}"</p>
                  <p className="text-[var(--accent-yellow)] font-bold">{testimonial.user}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6">
        <RevealSection>
          <div className="max-w-4xl mx-auto text-center card p-12 bg-gradient-to-br from-[var(--accent-yellow)]/10 to-[var(--accent-coral)]/10 border-[var(--accent-yellow)]/30">
            <h2 className="font-display text-4xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-[var(--text-muted)] mb-8">
              Join the revolution of on-chain card collecting
            </p>
            <Link href="/shop" className="btn btn-primary text-lg px-8 py-4">
              Get Your First Pack
              <ArrowRight size={20} />
            </Link>
          </div>
        </RevealSection>
      </section>
    </div>
  );
}
