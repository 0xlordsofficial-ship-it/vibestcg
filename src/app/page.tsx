'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Crown, Flame, Zap, Shield, Trophy } from 'lucide-react';

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

// Pack Card
function PackCard({ pack, index }: { pack: any; index: number }) {
  return (
    <RevealSection delay={index * 100}>
      <Card3D className="cursor-pointer">
        <div className="card p-6 group" style={{ background: 'var(--card-bg)' }}>
          {/* Pack Image */}
          <div className={`relative aspect-[100/140] rounded-xl flex items-center justify-center mb-4 ${pack.gradient}`}>
            <span className="text-6xl filter drop-shadow-lg">{pack.emoji}</span>
            {pack.badge && (
              <span className="absolute -top-2 -right-2 px-2 py-1 bg-[var(--yellow)] text-black text-xs font-bold rounded-full">
                {pack.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <h3 className="font-['Baloo_2'] font-black text-xl text-center mb-1">{pack.name}</h3>
          <p className="text-xs text-center text-[var(--muted)] uppercase tracking-wider mb-3">{pack.rarity}</p>
          
          <div className="flex items-center justify-between">
            <span className="font-['Baloo_2'] font-black text-2xl" style={{ color: pack.color }}>${pack.price}</span>
            <button className="btn btn-primary text-sm px-4 py-2">Open</button>
          </div>
        </div>
      </Card3D>
    </RevealSection>
  );
}

// Mini Card for Marquee
function MiniCard({ card }: { card: any }) {
  return (
    <Card3D>
      <div className="w-36 h-52 rounded-2xl flex flex-col items-center justify-center gap-2 border border-[var(--border)] cursor-pointer" style={{ background: card.gradient }}>
        <span className="text-4xl">{card.emoji}</span>
        <span className="text-xs font-bold text-white/80 text-center px-2">{card.name}</span>
        <span className="absolute top-2 right-2 text-[8px] px-2 py-1 bg-white/15 rounded-full" style={{ color: card.color }}>{card.rarity}</span>
      </div>
    </Card3D>
  );
}

// Activity Item
function ActivityItem({ item }: { item: any }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-[var(--card-bg)] rounded-2xl border border-[var(--border)]">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${item.color}20` }}>
        {item.emoji}
      </div>
      <div className="flex-1">
        <p className="font-bold text-sm">{item.title}</p>
        <p className="text-xs text-[var(--muted)]">{item.user} · {item.time}</p>
      </div>
      <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${item.color}20`, color: item.color }}>
        {item.action}
      </span>
    </div>
  );
}

// Leaderboard Row
function LeaderboardRow({ user, rank }: { user: any; rank: number }) {
  const getRankStyle = (r: number) => {
    if (r === 1) return 'text-[var(--yellow)]';
    if (r === 2) return 'text-gray-300';
    if (r === 3) return 'text-orange-400';
    return 'text-[var(--muted)]';
  };

  return (
    <div className="flex items-center gap-3 py-3 border-b border-[var(--border)] last:border-0">
      <span className={`font-['Baloo_2'] font-black text-lg w-6 text-center ${getRankStyle(rank)}`}>
        {rank <= 3 ? <Trophy size={14} /> : rank}
      </span>
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ background: user.avatarColor }}>
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
    { id: '1', name: 'Fume Pack', price: 5, rarity: 'Common • 3 Cards', emoji: '😤', gradient: 'linear-gradient(145deg, #FF5C4D, #FF3322)', color: '#FF5C4D', badge: 'HOT' },
    { id: '2', name: 'Drift Pack', price: 10, rarity: 'Uncommon • 4 Cards', emoji: '😮‍💨', gradient: 'linear-gradient(145deg, #4DC8FF, #2299DD)', color: '#4DC8FF', badge: null },
    { id: '3', name: 'Droop Pack', price: 20, rarity: 'Rare • 5 Cards', emoji: '😶‍🌫️', gradient: 'linear-gradient(145deg, #FFE500, #FFAA00)', color: '#FFE500', badge: '⭐ RARE' },
    { id: '4', name: 'Pudge Pack', price: 10, rarity: 'Uncommon • 4 Cards', emoji: '🥺', gradient: 'linear-gradient(145deg, #FF85C8, #FF55AA)', color: '#FF85C8', badge: null },
    { id: '5', name: 'Dizzy Pack', price: 20, rarity: 'Rare • 5 Cards', emoji: '😵‍💫', gradient: 'linear-gradient(145deg, #00F5C4, #00CCAA)', color: '#00F5C4', badge: 'NEW' },
    { id: '6', name: 'Melt Bundle', price: 50, rarity: 'Ultra Rare • 8 Cards', emoji: '🫠', gradient: 'linear-gradient(145deg, #C8AAFF, #9966FF)', color: '#C8AAFF', badge: null },
  ];

  const cards = [
    { name: 'Fume — Base', emoji: '😤', rarity: 'COMMON', gradient: 'linear-gradient(145deg, #1a1a3e, #2a1040)', color: '#9CA3AF' },
    { name: 'Drift — Foil', emoji: '😮‍💨', rarity: 'FOIL', gradient: 'linear-gradient(145deg, #1a2a3e, #102040)', color: '#4DC8FF' },
    { name: 'Droop — Rare', emoji: '😶‍🌫️', rarity: 'RARE', gradient: 'linear-gradient(145deg, #2a2a1a, #1a2010)', color: '#FFE500' },
    { name: 'Pudge — Base', emoji: '🥺', rarity: 'COMMON', gradient: 'linear-gradient(145deg, #2a1a2a, #200820)', color: '#9CA3AF' },
    { name: 'Dizzy — Holo', emoji: '😵‍💫', rarity: 'HOLO', gradient: 'linear-gradient(145deg, #0a2a2a, #082020)', color: '#00F5C4' },
    { name: 'Melt — Secret', emoji: '🫠', rarity: 'SECRET', gradient: 'linear-gradient(145deg, #1a103a, #100830)', color: '#C8AAFF' },
  ];

  const activities = [
    { emoji: '😤', title: 'Fume — Alt Art #047', user: '@lordvibe', time: '2m ago', action: 'PULL', color: '#FF5C4D' },
    { emoji: '🫠', title: 'Melt — Secret Foil #003', user: '@dreamy_k', time: '5m ago', action: 'BUY', color: '#C8AAFF' },
    { emoji: '😵‍💫', title: 'Dizzy — Holo #112', user: '@xeno', time: '8m ago', action: 'TRADE', color: '#00F5C4' },
    { emoji: '😶‍🌫️', title: 'Droop — Base #299', user: '@noodlearm', time: '11m ago', action: 'PULL', color: '#FFE500' },
    { emoji: '🥺', title: 'Pudge — Rare #018', user: '@gloomcloud', time: '14m ago', action: 'BUY', color: '#FF85C8' },
  ];

  const leaderboard = [
    { name: '@lordvibe', avatar: '😎', avatarColor: 'rgba(255,229,0,0.15)', score: '2,400 pts' },
    { name: '@dreamy_k', avatar: '🤙', avatarColor: 'rgba(200,200,200,0.1)', score: '1,980 pts' },
    { name: '@gloomcloud', avatar: '🫀', avatarColor: 'rgba(205,127,50,0.15)', score: '1,740 pts' },
    { name: '@xeno', avatar: '🌀', avatarColor: 'rgba(77,200,255,0.1)', score: '1,590 pts' },
    { name: '@noodlearm', avatar: '🪸', avatarColor: 'rgba(0,245,196,0.1)', score: '1,410 pts' },
  ];

  const testimonials = [
    { quote: 'pulled a Melt Secret Foil from a $5 pack... my hands are shaking rn', handle: '@lordvibe', avatar: '😤', color: 'rgba(255,92,77,0.15)' },
    { quote: 'VibeTCG is the most emotionally accurate TCG I have ever collected.', handle: '@dreamy_k', avatar: '🌙', color: 'rgba(200,170,255,0.15)' },
    { quote: 'Best TCG experience. True ownership means actually owning your cards', handle: '@NFTOG', avatar: '🫧', color: 'rgba(77,200,255,0.1)' },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20" style={{ background: 'rgba(255,229,0,0.07)' }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20" style={{ background: 'rgba(200,170,255,0.07)' }} />
        </div>

        {/* Floating Characters */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-[10%] text-6xl float float-delay-1 opacity-60">🃏</div>
          <div className="absolute top-1/3 right-[15%] text-5xl float float-delay-2 opacity-50">⚡</div>
          <div className="absolute bottom-1/3 left-[20%] text-6xl float float-delay-3 opacity-70">👑</div>
          <div className="absolute bottom-1/4 right-[25%] text-4xl float float-delay-4 opacity-40">💎</div>
        </div>

        <div className="relative z-10 max-w-4xl">
          <RevealSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--card-bg)] border border-[var(--border)] mb-6">
              <Sparkles size={16} className="text-[var(--mint)]" />
              <span className="text-sm font-bold uppercase tracking-widest">Season 1 Now Live</span>
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <h1 className="font-['Baloo_2'] text-7xl md:text-9xl font-black mb-6 leading-none">
              <span className="block">BUY. RIP.</span>
              <span className="block text-[var(--yellow)]" style={{ WebkitTextStroke: '2px var(--yellow)' }}>COLLECT.</span>
            </h1>
          </RevealSection>

          <RevealSection delay={200}>
            <p className="text-lg text-[var(--muted)] max-w-lg mx-auto mb-8 leading-relaxed">
              The first 100% on-chain trading card game. 
              Buy packs, rip for real NFTs, and battle for stakes.
            </p>
          </RevealSection>

          <RevealSection delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="btn btn-primary text-lg px-8 py-4">
                Open a Pack 🎴
                <ArrowRight size={20} />
              </Link>
              <Link href="/battle" className="btn btn-secondary text-lg px-8 py-4">
                Battle Now
              </Link>
            </div>
          </RevealSection>

          {/* Character Row */}
          <RevealSection delay={400}>
            <div className="flex items-end justify-center gap-5 mt-16 flex-wrap">
              {[
                { emoji: '😤', label: 'Fume', color: '#FF5C4D' },
                { emoji: '😮‍💨', label: 'Drift', color: '#4DC8FF' },
                { emoji: '😶‍🌫️', label: 'Droop', color: '#FFE500' },
                { emoji: '🥺', label: 'Pudge', color: '#FF85C8' },
                { emoji: '😵‍💫', label: 'Dizzy', color: '#00F5C4' },
                { emoji: '🫠', label: 'Melt', color: '#C8AAFF' },
              ].map((char, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-5xl border-2 border-black/25 shadow-lg float"
                    style={{ background: char.color, animationDelay: `${i * 0.15}s` }}
                  >
                    {char.emoji}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">{char.label}</span>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* TICKER BANNER */}
      <div className="bg-[var(--yellow)] py-3 overflow-hidden whitespace-nowrap">
        <div className="ticker-track">
          {['✦ VIBETCG SEASON 1', 'COLLECT ALL 6', 'RARE FOILS AVAILABLE', 'BUILD YOUR PACK', 'TRADE WITH FRIENDS', 'NEW DROP EVERY MONTH'].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-10 font-['Baloo_2'] font-black text-sm text-black">
              {item} <span style={{ opacity: 0.4 }}>★</span>
            </span>
          ))}
          {['✦ VIBETCG SEASON 1', 'COLLECT ALL 6', 'RARE FOILS AVAILABLE', 'BUILD YOUR PACK', 'TRADE WITH FRIENDS', 'NEW DROP EVERY MONTH'].map((item, i) => (
            <span key={`dup-${i}`} className="inline-flex items-center gap-4 px-10 font-['Baloo_2'] font-black text-sm text-black">
              {item} <span style={{ opacity: 0.4 }}>★</span>
            </span>
          ))}
        </div>
      </div>

      {/* PACKS SECTION */}
      <section className="py-20 px-6 bg-[var(--bg2)]">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--mint)] mb-4">🎴 Digital Packs</p>
              <h2 className="font-['Baloo_2'] text-5xl font-black mb-4">Open a Pack,<br/>Own the Vibe.</h2>
              <p className="text-[var(--muted)] max-w-md mx-auto">
                Every pack contains randomized cards — commons, rares, and secret foils. Each one is yours to keep.
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {packs.map((pack, i) => (
              <PackCard key={pack.id} pack={pack} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CARD MARQUEE */}
      <section className="py-16 overflow-hidden">
        <RevealSection>
          <div className="px-6 mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--mint)] mb-2">🃏 Card Library</p>
            <h2 className="font-['Baloo_2'] text-4xl font-black">Every Card Hits Different.</h2>
          </div>
        </RevealSection>

        {/* Row 1 */}
        <div className="mb-4">
          <div className="marquee-track">
            {[...cards, ...cards].map((card, i) => (
              <MiniCard key={`r1-${i}`} card={card} />
            ))}
          </div>
        </div>

        {/* Row 2 - Reverse */}
        <div>
          <div className="marquee-track" style={{ animationDirection: 'reverse', animationDuration: '32s' }}>
            {[...cards.reverse(), ...cards.reverse()].map((card, i) => (
              <MiniCard key={`r2-${i}`} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVITY + LEADERBOARD */}
      <section className="py-20 px-6 bg-[var(--bg2)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Activity Feed */}
          <RevealSection>
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--coral)] mb-4">⚡ Live Activity</p>
              <h2 className="font-['Baloo_2'] text-4xl font-black mb-4">What's Happening<br/>Right Now.</h2>
            </div>
            <div className="space-y-3">
              {activities.map((item, i) => (
                <RevealSection key={i} delay={i * 70}>
                  <ActivityItem item={item} />
                </RevealSection>
              ))}
            </div>
          </RevealSection>

          {/* Leaderboard */}
          <RevealSection delay={200}>
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--yellow)] mb-4">🏆 Leaderboard</p>
            </div>
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-['Baloo_2'] font-black text-xl">Top Collectors</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--yellow)]/15 text-[var(--yellow)]">THIS WEEK</span>
              </div>
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

      {/* SOCIAL WALL */}
      <section className="py-20 overflow-hidden">
        <RevealSection>
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--lilac)] mb-4">💬 The Community</p>
            <h2 className="font-['Baloo_2'] text-4xl font-black mb-4">The VibeTribe is<br/>Unhinged (in a good way)</h2>
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
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--mint)] mb-4">✦ How It Works</p>
            <h2 className="font-['Baloo_2'] text-5xl font-black mb-12">Simple. Weird. Yours.</h2>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: '01', icon: '🎴', title: 'Pick a Pack', desc: 'Choose from Common, Rare, or Ultra packs. Every pack has different odds.' },
              { num: '02', icon: '✨', title: 'Reveal Your Cards', desc: 'Open it digitally for an instant reveal. Foils, Holos, Secrets — you never know.' },
              { num: '03', icon: '🔁', title: 'Collect or Trade', desc: 'Build your collection, trade with the community, or list rare finds.' },
            ].map((step, i) => (
              <RevealSection key={i} delay={i * 150}>
                <div className="card p-8 relative overflow-hidden">
                  <span className="absolute top-0 right-4 font-['Baloo_2'] font-black text-8xl text-white/[0.03]">{step.num}</span>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center text-3xl" style={{ background: `${['#FF5C4D', '#FFE500', '#00F5C4'][i]}20` }}>
                    {step.icon}
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
          <div className="w-[600px] h-[600px] rounded-full blur-[120px] opacity-20" style={{ background: 'rgba(255,229,0,0.06)' }} />
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <RevealSection>
            <div className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center text-7xl float" style={{ background: 'var(--yellow)' }}>
              🃏
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--mint)] mb-4">✦ Join the Huddle</p>
            <h2 className="font-['Baloo_2'] text-6xl font-black mb-4">Get in Before<br/>the Next Drop.</h2>
          </RevealSection>

          <RevealSection delay={200}>
            <p className="text-[var(--muted)] mb-8">
              Season 2 is almost here. Follow for early access and free pack giveaways.
            </p>
          </RevealSection>

          <RevealSection delay={300}>
            <Link href="/shop" className="btn btn-primary text-lg px-8 py-4 inline-flex">
              Get Your First Pack 🎴
            </Link>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
