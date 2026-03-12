'use client';

import { useState } from 'react';
import { Package, Grid, List, Filter, Swords } from 'lucide-react';

type Tab = 'packs' | 'cards';

const userPacks = [
  { id: '1', name: 'Starter Pack', price: 10, boughtAt: '2026-03-10', opened: false },
  { id: '2', name: 'Elite Box', price: 50, boughtAt: '2026-03-10', opened: false },
  { id: '3', name: 'Legendary Case', price: 100, boughtAt: '2026-03-11', opened: true },
];

const userCards = [
  { id: '1', name: 'Charizard', rarity: 'legendary', image: '', pack: 'Legendary Case', acquiredAt: '2026-03-11' },
  { id: '2', name: 'Pikachu', rarity: 'rare', image: '', pack: 'Elite Box', acquiredAt: '2026-03-10' },
  { id: '3', name: 'Bulbasaur', rarity: 'common', image: '', pack: 'Starter Pack', acquiredAt: '2026-03-10' },
  { id: '4', name: 'Mewtwo', rarity: 'epic', image: '', pack: 'Legendary Case', acquiredAt: '2026-03-11' },
  { id: '5', name: 'Squirtle', rarity: 'uncommon', image: '', pack: 'Starter Pack', acquiredAt: '2026-03-10' },
  { id: '6', name: 'Eevee', rarity: 'rare', image: '', pack: 'Elite Box', acquiredAt: '2026-03-10' },
];

export default function Vault() {
  const [activeTab, setActiveTab] = useState<Tab>('cards');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [rarityFilter, setRarityFilter] = useState('all');

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-400 border-yellow-400/30';
      case 'epic': return 'text-purple-400 border-purple-400/30';
      case 'rare': return 'text-blue-400 border-blue-400/30';
      case 'uncommon': return 'text-green-400 border-green-400/30';
      default: return 'text-gray-400 border-gray-400/30';
    }
  };

  const filteredCards = userCards.filter(card => 
    rarityFilter === 'all' || card.rarity === rarityFilter
  );

  const filteredPacks = userPacks.filter(pack => 
    rarityFilter === 'all' || pack.price <= (rarityFilter === 'legendary' ? 100 : rarityFilter === 'rare' ? 50 : 10)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">Vault</h1>
        <p className="text-[var(--text-secondary)]">Your collection of packs and cards</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-4">
          <p className="text-[var(--text-secondary)] text-sm">Total Packs</p>
          <p className="text-2xl font-bold">{userPacks.length}</p>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-4">
          <p className="text-[var(--text-secondary)] text-sm">Total Cards</p>
          <p className="text-2xl font-bold">{userCards.length}</p>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-4">
          <p className="text-[var(--text-secondary)] text-sm">Legendary</p>
          <p className="text-2xl font-bold text-yellow-400">{userCards.filter(c => c.rarity === 'legendary').length}</p>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-4">
          <p className="text-[var(--text-secondary)] text-sm">Est. Value</p>
          <p className="text-2xl font-bold text-green-400">$0</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('cards')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'cards' 
                ? 'bg-orange-500 text-white' 
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text)]'
            }`}
          >
            Cards ({userCards.length})
          </button>
          <button
            onClick={() => setActiveTab('packs')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'packs' 
                ? 'bg-orange-500 text-white' 
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text)]'
            }`}
          >
            Packs ({userPacks.length})
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter */}
          <select
            value={rarityFilter}
            onChange={(e) => setRarityFilter(e.target.value)}
            className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Rarities</option>
            <option value="legendary">Legendary</option>
            <option value="epic">Epic</option>
            <option value="rare">Rare</option>
            <option value="uncommon">Uncommon</option>
            <option value="common">Common</option>
          </select>

          {/* View Toggle */}
          <div className="flex bg-[var(--bg-secondary)] rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[var(--bg-hover)]' : ''}`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-[var(--bg-hover)]' : ''}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'cards' ? (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          : "space-y-2"
        }>
          {filteredCards.map((card) => (
            viewMode === 'grid' ? (
              <div
                key={card.id}
                className={`bg-[var(--bg-secondary)] rounded-xl border ${getRarityColor(card.rarity)} overflow-hover relative group cursor-pointer`}
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-orange-500/10 to-purple-500/10 flex items-center justify-center">
                  <span className="text-4xl">🃏</span>
                </div>
                <div className="p-3">
                  <p className={`font-semibold ${getRarityColor(card.rarity)}`}>{card.name}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{card.pack}</p>
                </div>
                {/* Quick Action */}
                <button className="absolute top-2 right-2 bg-orange-500/80 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Swords size={14} />
                </button>
              </div>
            ) : (
              <div
                key={card.id}
                className="flex items-center justify-between bg-[var(--bg-secondary)] rounded-lg p-4 border border-[var(--border)]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🃏</span>
                  </div>
                  <div>
                    <p className={`font-semibold ${getRarityColor(card.rarity)}`}>{card.name}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{card.pack}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs px-2 py-1 rounded border ${getRarityColor(card.rarity)}`}>
                    {card.rarity}
                  </span>
                  <button className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-lg text-sm hover:bg-orange-500/30">
                    Battle
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredPacks.map((pack) => (
            <div
              key={pack.id}
              className="flex items-center justify-between bg-[var(--bg-secondary)] rounded-lg p-4 border border-[var(--border)]"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                  <Package size={32} className="text-orange-400" />
                </div>
                <div>
                  <p className="font-semibold">{pack.name}</p>
                  <p className="text-sm text-[var(--text-secondary)]">Bought: {pack.boughtAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold">{pack.price} USDC</span>
                {pack.opened ? (
                  <span className="text-sm text-[var(--text-secondary)]">Opened</span>
                ) : (
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                    Rip Open
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {((activeTab === 'cards' && filteredCards.length === 0) || 
        (activeTab === 'packs' && filteredPacks.length === 0)) && (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-[var(--text-secondary)] mb-4" />
          <p className="text-[var(--text-secondary)]">No {activeTab} found</p>
        </div>
      )}
    </div>
  );
}
