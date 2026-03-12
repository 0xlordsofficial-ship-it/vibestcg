'use client';

import { useState, useEffect, useRef } from 'react';
import { Package, Grid, List, Swords, Crown, Gem, Shield, Star } from 'lucide-react';

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

type Tab = 'packs' | 'cards';

const userPacks = [
  { id: '1', name: 'Starter Pack', price: 10, boughtAt: '2026-03-10', opened: false, emoji: '🎁' },
  { id: '2', name: 'Elite Box', price: 50, boughtAt: '2026-03-10', opened: false, emoji: '💎' },
  { id: '3', name: 'Legendary Case', price: 100, boughtAt: '2026-03-11', opened: true, emoji: '👑' },
];

const userCards = [
  { id: '1', name: 'Charizard', rarity: 'legendary', pack: 'Legendary Case', emoji: '🔥', gradient: 'from-orange-500 to-red-600' },
  { id: '2', name: 'Pikachu', rarity: 'rare', pack: 'Elite Box', emoji: '⚡', gradient: 'from-yellow-500 to-orange-600' },
  { id: '3', name: 'Bulbasaur', rarity: 'common', pack: 'Starter Pack', emoji: '🌿', gradient: 'from-green-500 to-emerald-600' },
  { id: '4', name: 'Mewtwo', rarity: 'epic', pack: 'Legendary Case', emoji: '🔮', gradient: 'from-purple-500 to-pink-600' },
  { id: '5', name: 'Squirtle', rarity: 'uncommon', pack: 'Starter Pack', emoji: '💧', gradient: 'from-blue-500 to-cyan-600' },
  { id: '6', name: 'Eevee', rarity: 'rare', pack: 'Elite Box', emoji: '💜', gradient: 'from-violet-500 to-purple-600' },
];

export default function Vault() {
  const [activeTab, setActiveTab] = useState<Tab>('cards');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [rarityFilter, setRarityFilter] = useState('all');

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-400/30', icon: Crown };
      case 'epic': return { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-400/30', icon: Gem };
      case 'rare': return { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-400/30', icon: Star };
      case 'uncommon': return { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-400/30', icon: Shield };
      default: return { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-400/30', icon: Package };
    }
  };

  const filteredCards = userCards.filter(card => rarityFilter === 'all' || card.rarity === rarityFilter);

  return (
    <div className="min-h-screen pb-20">
      <div className="py-8 border-b border-[var(--border)] mb-8">
        <div className="max-w-6xl mx-auto px-6">
          <RevealSection>
            <h1 className="font-display text-5xl font-black mb-2">Vault</h1>
            <p className="text-[var(--text-muted)] text-lg">Your collection of packs and cards</p>
          </RevealSection>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <RevealSection delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Packs', value: userPacks.length, icon: Package, color: 'text-accent' },
              { label: 'Total Cards', value: userCards.length, icon: Gem, color: 'text-purple-400' },
              { label: 'Legendary', value: userCards.filter(c => c.rarity === 'legendary').length, icon: Crown, color: 'text-yellow-400' },
              { label: 'Est. Value', value: '$0', icon: Star, color: 'text-green-400' },
            ].map((stat, i) => (
              <div key={i} className="card p-4">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon size={16} className={stat.color} />
                  <span className="text-xs text-[var(--text-muted)]">{stat.label}</span>
                </div>
                <p className="text-2xl font-black">{stat.value}</p>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection delay={200}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              {(['cards', 'packs'] as Tab[]).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === tab ? 'bg-[var(--accent-yellow)] text-black' : 'bg-[var(--bg-card)] text-[var(--text-muted)]'}`}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} ({tab === 'cards' ? userCards.length : userPacks.length})
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <select value={rarityFilter} onChange={(e) => setRarityFilter(e.target.value)} className="input">
                <option value="all">All Rarities</option>
                <option value="legendary">Legendary</option>
                <option value="epic">Epic</option>
                <option value="rare">Rare</option>
                <option value="uncommon">Uncommon</option>
                <option value="common">Common</option>
              </select>
              <div className="flex bg-[var(--bg-card)] rounded-lg p-1">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[var(--bg-hover)]' : ''}`}><Grid size={20} /></button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-[var(--bg-hover)]' : ''}`}><List size={20} /></button>
              </div>
            </div>
          </div>
        </RevealSection>

        {activeTab === 'cards' && (
          <div className={viewMode === 'grid' ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" : "space-y-3"}>
            {filteredCards.map((card, i) => {
              const rarity = getRarityColor(card.rarity);
              const Icon = rarity.icon;
              return (
                <RevealSection key={card.id} delay={i * 50}>
                  <div className={`card overflow-hidden group cursor-pointer ${viewMode === 'grid' ? '' : 'p-4'}`}>
                    {viewMode === 'grid' ? (
                      <>
                        <div className={`aspect-[3/4] bg-gradient-to-br ${card.gradient} p-4 flex items-center justify-center relative`}>
                          <span className="text-5xl filter drop-shadow-lg group-hover:scale-110 transition-transform">{card.emoji}</span>
                          <div className={`absolute top-2 right-2 px-2 py-1 rounded ${rarity.bg} ${rarity.text} text-xs font-bold`}>{card.rarity}</div>
                        </div>
                        <div className="p-3">
                          <p className={`font-bold ${rarity.text}`}>{card.name}</p>
                          <p className="text-xs text-[var(--text-muted)]">{card.pack}</p>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${card.gradient} rounded-lg flex items-center justify-center`}><span className="text-xl">{card.emoji}</span></div>
                          <div>
                            <p className={`font-bold ${rarity.text}`}>{card.name}</p>
                            <p className="text-sm text-[var(--text-muted)]">{card.pack}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded ${rarity.bg} ${rarity.text} text-sm font-bold`}>{card.rarity}</span>
                          <button className="btn btn-primary text-sm px-4 py-2"><Swords size={16} /> Battle</button>
                        </div>
                      </div>
                    )}
                  </div>
                </RevealSection>
              );
            })}
          </div>
        )}

        {activeTab === 'packs' && (
          <div className="space-y-3">
            {userPacks.map((pack, i) => (
              <RevealSection key={pack.id} delay={i * 50}>
                <div className="card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[var(--accent-yellow)] to-[var(--accent-coral)] rounded-xl flex items-center justify-center text-3xl">{pack.emoji}</div>
                    <div>
                      <p className="font-bold text-lg">{pack.name}</p>
                      <p className="text-sm text-[var(--text-muted)]">Bought: {pack.boughtAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-accent text-xl">{pack.price} USDC</span>
                    {pack.opened ? (
                      <span className="text-[var(--text-muted)]">Opened</span>
                    ) : (
                      <button className="btn btn-primary">Rip Open</button>
                    )}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
