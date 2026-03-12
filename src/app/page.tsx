'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Minus, Plus, Star, Package, Users, MessageCircle, CreditCard, Gift, User, LogOut, X, Menu, Wallet } from 'lucide-react';

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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
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

// Pack Card with quantity selector (exact Phygitals style)
function PackCard({ pack, index }: { pack: any; index: number }) {
  const [qty, setQty] = useState(1);

  return (
    <RevealSection delay={index * 80}>
      <div className="bg-[#13132a] rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1">
        {/* Pack Image */}
        <div className={`aspect-square rounded-lg mb-4 flex items-center justify-center ${pack.gradient}`}>
          <span className="text-5xl">{pack.emoji}</span>
        </div>

        {/* Name */}
        <h3 className="font-bold text-lg mb-1">{pack.name}</h3>
        <p className="text-white/50 text-sm mb-4">{pack.cards} cards</p>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center bg-[#0a0a1a] rounded-lg">
            <button 
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white"
            >
              <Minus size={16} />
            </button>
            <span className="w-10 text-center font-bold">{qty}</span>
            <button 
              onClick={() => setQty(qty + 1)}
              className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white"
            >
              <Plus size={16} />
            </button>
          </div>
          <span className="font-bold text-xl">${pack.price}</span>
        </div>

        {/* Buy Button */}
        <button className="w-full bg-[#ffe500] hover:bg-[#ffd000] text-black font-bold py-3 rounded-lg transition-colors">
          Add to Cart
        </button>
      </div>
    </RevealSection>
  );
}

// Recent Pull Card
function RecentPullCard({ pull }: { pull: any }) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'text-yellow-400 bg-yellow-400/10';
      case 'Epic': return 'text-purple-400 bg-purple-400/10';
      case 'Rare': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-white/50 bg-white/5';
    }
  };

  return (
    <div className="flex-shrink-0 w-56">
      <div className="bg-[#13132a] rounded-lg p-3 mr-4 border border-white/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white/40">{pull.time}</span>
          <span className={`px-2 py-0.5 rounded text-xs font-bold ${getRarityColor(pull.rarity)}`}>
            {pull.rarity}
          </span>
        </div>
        <div className={`h-24 rounded-lg flex items-center justify-center mb-2 ${pull.gradient}`}>
          <span className="text-4xl">{pull.emoji}</span>
        </div>
        <p className="font-bold text-sm truncate">{pull.card}</p>
        <p className="text-xs text-white/50">by {pull.user}</p>
      </div>
    </div>
  );
}

// Testimonial Card
function TestimonialCard({ item }: { item: any }) {
  return (
    <div className="flex-shrink-0 w-80 bg-[#13132a] rounded-xl p-5 border border-white/5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-purple-500 flex items-center justify-center text-lg">
          {item.avatar}
        </div>
        <div>
          <p className="font-bold text-sm">{item.name}</p>
          <p className="text-xs text-white/50">{item.handle}</p>
        </div>
      </div>
      <p className="text-sm text-white/80 leading-relaxed">{item.quote}</p>
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5 text-xs text-white/40">
        <span>❤️ {item.likes}</span>
        <span>🔁 {item.retweets}</span>
        <span>💬 {item.replies}</span>
      </div>
    </div>
  );
}

export default function Home() {
  // Exact Phygitals packs
  const packs = [
    { name: 'Pokémon', price: 25, cards: 3, emoji: '🔥', gradient: 'bg-gradient-to-br from-red-500/20 to-orange-500/20' },
    { name: 'One Piece', price: 80, cards: 5, emoji: '🏴‍☠️', gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20' },
    { name: 'Baseball', price: 25, cards: 3, emoji: '⚾', gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20' },
    { name: 'Football', price: 25, cards: 3, emoji: '🏈', gradient: 'bg-gradient-to-br from-orange-500/20 to-red-500/20' },
    { name: 'Yu-Gi-Oh', price: 25, cards: 3, emoji: '🐉', gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' },
    { name: 'Basketball', price: 50, cards: 4, emoji: '🏀', gradient: 'bg-gradient-to-br from-orange-500/20 to-yellow-500/20' },
  ];

  const recentPulls = [
    { user: 'BlazeKing', card: 'Charizard', rarity: 'Legendary', time: '2m ago', emoji: '🔥', gradient: 'bg-orange-500/20' },
    { user: 'AquaPro', card: 'Blastoise', rarity: 'Epic', time: '5m ago', emoji: '💧', gradient: 'bg-blue-500/20' },
    { user: 'LeafNinja', card: 'Venusaur', rarity: 'Rare', time: '8m ago', emoji: '🌿', gradient: 'bg-green-500/20' },
    { user: 'SparkUser', card: 'Pikachu', rarity: 'Rare', time: '12m ago', emoji: '⚡', gradient: 'bg-yellow-500/20' },
    { user: 'GhostGamer', card: 'Gengar', rarity: 'Epic', time: '15m ago', emoji: '👻', gradient: 'bg-purple-500/20' },
  ];

  const testimonials = [
    { name: 'SteelTamer8315', handle: '@steel', avatar: '🅰️', quote: 'LFG my claim came it look how nice those slabs are, thank you again one love', likes: 149, retweets: 10, replies: 42 },
    { name: 'Mikerow01', handle: '@mikerow01', avatar: '📦', quote: 'Just got my first phygital card. The quality is insane!', likes: 89, retweets: 12, replies: 23 },
    { name: 'Lynch', handle: '@_LYNCHY_', avatar: '🎴', quote: 'Digital to physical in just under 2 weeks super cool!', likes: 156, retweets: 28, replies: 35 },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center py-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#13132a] to-[#0a0a1a]" />

        <div className="relative z-10 text-center max-w-3xl px-6">
          <RevealSection>
            <h1 className="font-black text-5xl md:text-7xl mb-6 leading-tight">
              Rip Pokémon Packs.
              <br />
              <span className="text-[#ffe500]">Win Real Cards.</span>
            </h1>
          </RevealSection>

          <RevealSection delay={100}>
            <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
              Open digital packs and receive real, graded trading cards shipped to your door. 
              True ownership on the blockchain.
            </p>
          </RevealSection>

          <RevealSection delay={200}>
            <button className="bg-[#ffe500] hover:bg-[#ffd000] text-black font-bold text-lg px-8 py-4 rounded-full transition-colors inline-flex items-center gap-2">
              Buy Now <ArrowRight size={20} />
            </button>
          </RevealSection>
        </div>
      </section>

      {/* DIGITAL PACKS SECTION - Exact Phygitals */}
      <section className="py-16 px-6 bg-[#13132a]">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <h2 className="font-black text-3xl md:text-4xl mb-2">
              Digital Packs, Physical Cards
            </h2>
            <p className="text-white/50 mb-8">
              Open packs, reveal cards, claim real graded slabs.
            </p>
          </RevealSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {packs.map((pack, i) => (
              <PackCard key={i} pack={pack} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* RECENT PULLS */}
      <section className="py-12 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <h2 className="font-bold text-xl">Recent Pulls</h2>
            </div>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex pl-6">
            {[...recentPulls, ...recentPulls].map((pull, i) => (
              <RecentPullCard key={i} pull={pull} />
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY SECTION - Exact Phygitals */}
      <section className="py-16 px-6 bg-[#13132a]">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <h2 className="font-black text-3xl mb-8">What Collectors Are Saying</h2>
          </RevealSection>

          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {[...testimonials, ...testimonials].map((item, i) => (
              <TestimonialCard key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealSection>
            <h2 className="font-black text-3xl text-center mb-12">How It Works</h2>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🎴', title: 'Buy a Pack', desc: 'Purchase digital packs with crypto. Each pack contains randomized cards.' },
              { icon: '✨', title: 'Reveal Cards', desc: 'Open your pack instantly to see what cards you got. Some are super rare!' },
              { icon: '📦', title: 'Claim Physical', desc: 'Your digital cards are backed by real graded cards. Claim anytime.' },
            ].map((step, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="text-center p-6">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-white/50">{step.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <RevealSection>
            <h2 className="font-black text-3xl mb-4">Ready to Start?</h2>
            <p className="text-white/50 mb-8">
              Join thousands of collectors ripping packs and winning real cards.
            </p>
            <button className="bg-[#ffe500] hover:bg-[#ffd000] text-black font-bold px-8 py-4 rounded-full transition-colors">
              Get Started
            </button>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
