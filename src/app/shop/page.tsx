'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';

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

const packs = [
  { 
    id: '1', 
    name: 'Starter Pack', 
    price: 10, 
    description: 'Perfect for beginners. Contains common to rare cards.',
    dropRates: { common: 60, uncommon: 25, rare: 12, epic: 2.5, legendary: 0.5 },
    totalCards: 5,
    emoji: '🎁',
    gradient: 'from-gray-400 to-slate-500',
    featured: false,
    stock: 999
  },
  { 
    id: '2', 
    name: 'Elite Box', 
    price: 50, 
    description: 'Higher chances of rare and epic cards.',
    dropRates: { common: 30, uncommon: 35, rare: 25, epic: 8, legendary: 2 },
    totalCards: 5,
    emoji: '💎',
    gradient: 'from-blue-400 to-cyan-500',
    featured: false,
    stock: 500
  },
  { 
    id: '3', 
    name: 'Legendary Case', 
    price: 100, 
    description: 'Premium pack with guaranteed at least 1 rare+ card.',
    dropRates: { common: 10, uncommon: 30, rare: 35, epic: 18, legendary: 7 },
    totalCards: 5,
    emoji: '👑',
    gradient: 'from-yellow-400 to-orange-500',
    featured: true,
    stock: 200
  },
  { 
    id: '4', 
    name: 'Neon Genesis', 
    price: 75, 
    description: 'Limited cyberpunk collection.',
    dropRates: { common: 25, uncommon: 30, rare: 28, epic: 12, legendary: 5 },
    totalCards: 5,
    emoji: '⚡',
    gradient: 'from-purple-400 to-pink-500',
    featured: true,
    stock: 150
  },
  { 
    id: '5', 
    name: 'Mystic Pack', 
    price: 35, 
    description: 'Magical creatures await.',
    dropRates: { common: 40, uncommon: 30, rare: 20, epic: 8, legendary: 2 },
    totalCards: 5,
    emoji: '🔮',
    gradient: 'from-violet-400 to-purple-600',
    featured: false,
    stock: 300
  },
  { 
    id: '6', 
    name: 'Retro Collection', 
    price: 25, 
    description: 'Classic cards from the original era.',
    dropRates: { common: 45, uncommon: 30, rare: 18, epic: 5, legendary: 2 },
    totalCards: 5,
    emoji: '🎮',
    gradient: 'from-green-400 to-emerald-500',
    featured: false,
    stock: 400
  },
];

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [quantity, setQuantity] = useState<{ [key: string]: number }>({});

  const filteredPacks = packs.filter(pack => 
    pack.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return '#FFE500';
      case 'epic': return '#A855F7';
      case 'rare': return '#3B82F6';
      case 'uncommon': return '#22C55E';
      default: return '#9CA3AF';
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="py-8 border-b border-[var(--border)] mb-8">
        <div className="max-w-6xl mx-auto px-6">
          <RevealSection>
            <h1 className="font-display text-5xl font-black mb-2">
              Shop <span className="text-accent">Packs</span>
            </h1>
            <p className="text-[var(--text-muted)] text-lg">Buy packs, rip cards, collect 'em all</p>
          </RevealSection>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <RevealSection delay={100}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
              <input
                type="text"
                placeholder="Search packs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input w-full pl-12 py-4 text-lg"
              />
            </div>
            <button className="btn btn-secondary px-6 py-4">
              <Filter size={20} />
              Filters
            </button>
          </div>
        </RevealSection>
      </div>

      {/* Featured Banner */}
      {filteredPacks.some(p => p.featured) && (
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <RevealSection delay={150}>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-8">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={18} className="text-white" />
                  <span className="text-sm font-bold uppercase tracking-wider text-white/80">Limited Time</span>
                </div>
                <h2 className="font-display text-3xl font-bold mb-2">Neon Genesis Collection</h2>
                <p className="text-white/80 mb-4">Exclusive cyberpunk cards - Only while supplies last!</p>
                <div className="flex gap-3">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">⚡ Epic Guaranteed</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">👑 5% Legendary</span>
                </div>
              </div>
              {/* Decorative */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            </div>
          </RevealSection>
        </div>
      )}

      {/* Packs Grid */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPacks.map((pack, i) => (
            <RevealSection key={pack.id} delay={i * 100}>
              <div className="card overflow-hidden group">
                {/* Pack Image */}
                <div className={`relative aspect-square bg-gradient-to-br ${pack.gradient} p-8 flex items-center justify-center`}>
                  <span className="text-8xl filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    {pack.emoji}
                  </span>
                  
                  {pack.featured && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                      <span className="text-xs font-bold uppercase text-white">Featured</span>
                    </div>
                  )}
                  
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm font-bold">
                      {pack.stock < 200 ? `Only ${pack.stock} left!` : `${pack.stock} in stock`}
                    </span>
                  </div>
                </div>

                {/* Pack Info */}
                <div className="p-6">
                  <h3 className="font-display text-2xl font-bold mb-1">{pack.name}</h3>
                  <p className="text-[var(--text-muted)] text-sm mb-4">{pack.description}</p>

                  {/* Drop Rates */}
                  <div className="mb-4">
                    <p className="text-xs text-[var(--text-muted)] mb-2 uppercase tracking-wider">Drop Rates</p>
                    <div className="flex gap-1">
                      {Object.entries(pack.dropRates).map(([rarity, rate]) => (
                        <div
                          key={rarity}
                          className="flex-1 h-8 rounded flex items-center justify-center text-xs font-bold"
                          style={{
                            backgroundColor: `${getRarityColor(rarity)}20`,
                            color: getRarityColor(rarity),
                          }}
                          title={`${rarity}: ${rate}%`}
                        >
                          {rate}%
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-1">
                      {Object.keys(pack.dropRates).map(r => (
                        <span key={r} className="text-[10px] text-[var(--text-muted)] uppercase">{r[0]}</span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Buy */}
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black">{pack.price}</span>
                      <span className="text-[var(--text-muted)]">USDC</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-[var(--bg-hover)] rounded-lg">
                        <button 
                          onClick={() => setQuantity(prev => ({ ...prev, [pack.id]: Math.max(1, (prev[pack.id] || 1) - 1) }))}
                          className="px-3 py-2 hover:text-accent"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold">{quantity[pack.id] || 1}</span>
                        <button 
                          onClick={() => setQuantity(prev => ({ ...prev, [pack.id]: (prev[pack.id] || 1) + 1 }))}
                          className="px-3 py-2 hover:text-accent"
                        >
                          +
                        </button>
                      </div>
                      <button className="btn btn-primary">
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

        {filteredPacks.length === 0 && (
          <div className="text-center py-20">
            <span className="text-6xl">🎁</span>
            <p className="text-xl text-[var(--text-muted)] mt-4">No packs found</p>
          </div>
        )}
      </div>
    </div>
  );
}
