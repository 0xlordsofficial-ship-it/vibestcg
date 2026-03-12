'use client';

import { useState } from 'react';
import { Package, Filter, Search } from 'lucide-react';

const packs = [
  { 
    id: '1', 
    name: 'Starter Pack', 
    price: 10, 
    description: 'Perfect for beginners. Contains common to rare cards.',
    dropRates: { common: 60, uncommon: 25, rare: 12, epic: 2.5, legendary: 0.5 },
    totalCards: 5,
    image: '/packs/starter.png'
  },
  { 
    id: '2', 
    name: 'Elite Box', 
    price: 50, 
    description: 'Higher chances of rare and epic cards.',
    dropRates: { common: 30, uncommon: 35, rare: 25, epic: 8, legendary: 2 },
    totalCards: 5,
    image: '/packs/elite.png'
  },
  { 
    id: '3', 
    name: 'Legendary Case', 
    price: 100, 
    description: 'Premium pack with guaranteed at least 1 rare+ card.',
    dropRates: { common: 10, uncommon: 30, rare: 35, epic: 18, legendary: 7 },
    totalCards: 5,
    image: '/packs/legendary.png'
  },
  { 
    id: '4', 
    name: 'Neon Genesis', 
    price: 50, 
    description: 'Limited cyberpunk collection. Only available 48h!',
    dropRates: { common: 25, uncommon: 30, rare: 28, epic: 12, legendary: 5 },
    totalCards: 5,
    image: '/packs/neon.png',
    featured: true
  },
];

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('all');

  const filteredPacks = packs.filter(pack => 
    pack.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Shop</h1>
          <p className="text-[var(--text-secondary)]">Buy packs and rip for rare cards</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={18} />
          <input
            type="text"
            placeholder="Search packs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-orange-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-[var(--text-secondary)]" />
          <select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
            className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
          >
            <option value="all">All Rarities</option>
            <option value="common">Starter</option>
            <option value="rare">Elite</option>
            <option value="legendary">Legendary</option>
          </select>
        </div>
      </div>

      {/* Featured Banner */}
      {filteredPacks.some(p => p.featured) && (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 p-6">
          <div className="relative z-10">
            <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
              LIMITED TIME
            </span>
            <h2 className="text-2xl font-bold mt-2">Neon Genesis Collection</h2>
            <p className="text-white/80 mt-1">Exclusive cyberpunk cards - Only 48 hours!</p>
          </div>
        </div>
      )}

      {/* Packs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPacks.map((pack) => (
          <div
            key={pack.id}
            className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] overflow-hidden hover:border-orange-500/50 transition-all group"
          >
            {/* Pack Image */}
            <div className="aspect-square bg-gradient-to-br from-orange-500/20 to-purple-500/20 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Package size={64} className="text-orange-400/50" />
              </div>
              {pack.featured && (
                <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                  FEATURED
                </div>
              )}
            </div>

            {/* Pack Info */}
            <div className="p-5">
              <h3 className="text-xl font-bold mb-1">{pack.name}</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">{pack.description}</p>

              {/* Drop Rates */}
              <div className="mb-4">
                <p className="text-xs text-[var(--text-secondary)] mb-2">Drop Rates</p>
                <div className="flex gap-1">
                  {Object.entries(pack.dropRates).map(([rarity, rate]) => (
                    <div
                      key={rarity}
                      className="flex-1 h-6 rounded flex items-center justify-center text-xs"
                      style={{
                        backgroundColor: 
                          rarity === 'legendary' ? 'rgba(245, 158, 11, 0.2)' :
                          rarity === 'epic' ? 'rgba(168, 85, 247, 0.2)' :
                          rarity === 'rare' ? 'rgba(59, 130, 246, 0.2)' :
                          rarity === 'uncommon' ? 'rgba(34, 197, 94, 0.2)' :
                          'rgba(156, 163, 175, 0.2)',
                        color:
                          rarity === 'legendary' ? '#f59e0b' :
                          rarity === 'epic' ? '#a855f7' :
                          rarity === 'rare' ? '#3b82f6' :
                          rarity === 'uncommon' ? '#22c55e' :
                          '#9ca3af'
                      }}
                      title={`${rarity}: ${rate}%`}
                    >
                      {rate}%
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Buy */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                <div>
                  <span className="text-2xl font-bold">{pack.price}</span>
                  <span className="text-[var(--text-secondary)] ml-1">USDC</span>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPacks.length === 0 && (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-[var(--text-secondary)] mb-4" />
          <p className="text-[var(--text-secondary)]">No packs found</p>
        </div>
      )}
    </div>
  );
}
