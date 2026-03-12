'use client';

import { useState, useEffect, useRef } from 'react';
import { Swords, Users, Lock, Globe, Copy, Check, Play, Package, Trophy, Zap } from 'lucide-react';

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
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
    <div ref={ref} className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const activeBattles = [
  { id: '1', creator: 'CardKing', wager: 10, status: 'waiting', pack: 'Starter Pack', emoji: '🎁' },
  { id: '2', creator: 'RipMaster', wager: 50, status: 'waiting', pack: 'Elite Box', emoji: '💎' },
];

export default function Battle() {
  const [activeTab, setActiveTab] = useState<'create' | 'join' | 'active'>('create');
  const [isPrivate, setIsPrivate] = useState(false);
  const [wagerAmount, setWagerAmount] = useState(10);
  const [accessCode, setAccessCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCode(code);
  };

  const packs = [
    { id: '1', name: 'Starter Pack', price: 10, emoji: '🎁' },
    { id: '2', name: 'Elite Box', price: 50, emoji: '💎' },
    { id: '3', name: 'Legendary Case', price: 100, emoji: '👑' },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="py-8 border-b border-[var(--border)] mb-8">
        <div className="max-w-6xl mx-auto px-6">
          <RevealSection>
            <h1 className="font-display text-5xl font-black mb-2">
              Battle <span className="text-accent">Arena</span>
            </h1>
            <p className="text-[var(--text-muted)] text-lg">Create or join pack rip battles</p>
          </RevealSection>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <RevealSection delay={100}>
          <div className="flex gap-2">
            {[
              { id: 'create', label: 'Create Battle', icon: Swords },
              { id: 'join', label: 'Join Battle', icon: Users },
              { id: 'active', label: 'My Battles', icon: Trophy },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-[var(--accent-yellow)] text-black' 
                    : 'bg-[var(--bg-card)] text-[var(--text-muted)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </RevealSection>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6">
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RevealSection>
              <div className="card p-8">
                <h2 className="font-display text-2xl font-bold mb-6">Create New Battle</h2>

                {/* Step 1: Select Pack */}
                <div className="mb-8">
                  <label className="block text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                    1. Select Pack
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {packs.map((pack) => (
                      <button
                        key={pack.id}
                        className="bg-[var(--bg-hover)] border-2 border-[var(--border)] hover:border-[var(--accent-yellow)] rounded-xl p-4 transition-all flex flex-col items-center gap-2"
                      >
                        <span className="text-3xl">{pack.emoji}</span>
                        <span className="text-sm font-bold">{pack.name}</span>
                        <span className="text-xs text-[var(--text-muted)]">{pack.price} USDC</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Wager */}
                <div className="mb-8">
                  <label className="block text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                    2. Set Wager
                  </label>
                  <div className="flex gap-2 mb-3">
                    {[5, 10, 25, 50, 100].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setWagerAmount(amount)}
                        className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                          wagerAmount === amount
                            ? 'bg-[var(--accent-yellow)] text-black'
                            : 'bg-[var(--bg-hover)] hover:bg-[var(--bg-card)]'
                        }`}
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={wagerAmount}
                    onChange={(e) => setWagerAmount(Number(e.target.value))}
                    className="input w-full"
                    placeholder="Custom amount"
                  />
                </div>

                {/* Step 3: Type */}
                <div className="mb-8">
                  <label className="block text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                    3. Battle Type
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsPrivate(false)}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${
                        !isPrivate
                          ? 'bg-[var(--accent-yellow)] text-black'
                          : 'bg-[var(--bg-hover)]'
                      }`}
                    >
                      <Globe size={20} />
                      Public
                    </button>
                    <button
                      onClick={() => setIsPrivate(true)}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${
                        isPrivate
                          ? 'bg-[var(--accent-yellow)] text-black'
                          : 'bg-[var(--bg-hover)]'
                      }`}
                    >
                      <Lock size={20} />
                      Private
                    </button>
                  </div>
                </div>

                {/* Code */}
                {isPrivate && (
                  <div className="mb-8 p-4 bg-[var(--bg-hover)] rounded-xl">
                    <label className="block text-sm font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                      Share Code
                    </label>
                    {generatedCode ? (
                      <div className="flex items-center gap-3">
                        <code className="flex-1 bg-[var(--bg-card)] px-4 py-3 rounded-lg font-mono text-xl font-bold text-center">
                          {generatedCode}
                        </code>
                        <button onClick={copyCode} className="btn btn-secondary px-4">
                          {copied ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                      </div>
                    ) : (
                      <button onClick={generateCode} className="btn btn-secondary w-full">
                        Generate Code
                      </button>
                    )}
                  </div>
                )}

                <button className="btn btn-primary w-full py-4 text-lg">
                  <Swords size={24} />
                  Create Battle
                </button>
              </div>
            </RevealSection>

            {/* Battle Info */}
            <RevealSection delay={200}>
              <div className="card p-8 bg-gradient-to-br from-[var(--accent-yellow)]/10 to-[var(--accent-coral)]/10 border-[var(--accent-yellow)]/30">
                <h3 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
                  <Zap className="text-[var(--accent-yellow)]" />
                  How Battle Works
                </h3>
                <div className="space-y-4">
                  {[
                    { step: '1', title: 'Select Pack', desc: 'Choose a pack from your vault' },
                    { step: '2', title: 'Set Wager', desc: 'Both players put up the same amount' },
                    { step: '3', title: 'Rip Together', desc: 'Both open packs simultaneously' },
                    { step: '4', title: 'Winner Takes All', desc: 'Higher rarity score wins the pot' },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-[var(--accent-yellow)] text-black font-bold flex items-center justify-center flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <p className="font-bold">{item.title}</p>
                        <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
          </div>
        )}

        {activeTab === 'join' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RevealSection>
              <div className="card p-8">
                <h2 className="font-display text-2xl font-bold mb-6">Join with Code</h2>
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  className="input w-full font-mono text-2xl text-center py-4 mb-6"
                  placeholder="XXXXXX"
                  maxLength={6}
                />
                <button className="btn btn-primary w-full py-4 text-lg">
                  <Play size={20} />
                  Join Battle
                </button>
              </div>
            </RevealSection>

            <RevealSection delay={200}>
              <div className="card p-8">
                <h2 className="font-display text-2xl font-bold mb-6">Public Battles</h2>
                <div className="space-y-3">
                  {activeBattles.map((battle) => (
                    <div key={battle.id} className="flex items-center justify-between p-4 bg-[var(--bg-hover)] rounded-xl">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{battle.emoji}</span>
                        <div>
                          <p className="font-bold">{battle.creator}</p>
                          <p className="text-sm text-[var(--text-muted)]">{battle.pack}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-accent">{battle.wager} USDC</span>
                        <button className="btn btn-primary">
                          Join
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
          </div>
        )}

        {activeTab === 'active' && (
          <RevealSection>
            <div className="card p-8">
              <h2 className="font-display text-2xl font-bold mb-6">Your Active Battles</h2>
              
              {/* Waiting for opponent */}
              <div className="mb-6 p-6 bg-[var(--bg-hover)] rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                  <span className="text-yellow-400 font-bold">Waiting for opponent</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">👑</span>
                    <div>
                      <p className="font-bold text-lg">Legendary Case Battle</p>
                      <p className="text-[var(--text-muted)]">Wager: 10 USDC</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="btn btn-primary">
                      Ready
                    </button>
                    <button className="btn btn-secondary text-red-400">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center py-12">
                <Swords size={48} className="mx-auto text-[var(--text-muted)] mb-4" />
                <p className="text-[var(--text-muted)]">No other active battles</p>
              </div>
            </div>
          </RevealSection>
        )}
      </div>
    </div>
  );
}
