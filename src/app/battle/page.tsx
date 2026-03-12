'use client';

import { useState } from 'react';
import { Swords, Users, Lock, Globe, Copy, Check, Play, Package } from 'lucide-react';

type BattleTab = 'create' | 'join' | 'active';

const activeBattles = [
  { 
    id: '1', 
    creator: 'CardKing', 
    wager: 10, 
    status: 'waiting',
    pack: 'Starter Pack'
  },
];

export default function Battle() {
  const [activeTab, setActiveTab] = useState<BattleTab>('create');
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">Battle Arena</h1>
        <p className="text-[var(--text-secondary)]">Create or join pack rip battles</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'create' 
              ? 'bg-orange-500 text-white' 
              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
          }`}
        >
          Create Battle
        </button>
        <button
          onClick={() => setActiveTab('join')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'join' 
              ? 'bg-orange-500 text-white' 
              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
          }`}
        >
          Join Battle
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'active' 
              ? 'bg-orange-500 text-white' 
              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
          }`}
        >
          Active Battles
        </button>
      </div>

      {/* Create Battle */}
      {activeTab === 'create' && (
        <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-6 max-w-xl">
          <h2 className="text-xl font-semibold mb-6">Create New Battle</h2>

          {/* Step 1: Select Pack */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">1. Select Pack from Vault</label>
            <div className="grid grid-cols-3 gap-3">
              {['Starter Pack ($10)', 'Elite Box ($50)', 'Legendary Case ($100)'].map((pack) => (
                <button
                  key={pack}
                  className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-4 hover:border-orange-500/50 transition-all flex flex-col items-center gap-2"
                >
                  <Package size={24} className="text-orange-400" />
                  <span className="text-sm">{pack}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Wager Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">2. Set Wager Amount</label>
            <div className="flex gap-2">
              {[5, 10, 25, 50, 100].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setWagerAmount(amount)}
                  className={`flex-1 py-2 rounded-lg border transition-all ${
                    wagerAmount === amount
                      ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                      : 'border-[var(--border)] hover:border-orange-500/30'
                  }`}
                >
                  {amount} USDC
                </button>
              ))}
            </div>
            <input
              type="number"
              value={wagerAmount}
              onChange={(e) => setWagerAmount(Number(e.target.value))}
              className="mt-3 w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3"
              placeholder="Custom amount"
            />
          </div>

          {/* Step 3: Public/Private */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">3. Battle Type</label>
            <div className="flex gap-3">
              <button
                onClick={() => setIsPrivate(false)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${
                  !isPrivate
                    ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                    : 'border-[var(--border)] hover:border-orange-500/30'
                }`}
              >
                <Globe size={18} />
                Public
              </button>
              <button
                onClick={() => setIsPrivate(true)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${
                  isPrivate
                    ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                    : 'border-[var(--border)] hover:border-orange-500/30'
                }`}
              >
                <Lock size={18} />
                Private
              </button>
            </div>
          </div>

          {/* Generated Code (if private) */}
          {isPrivate && (
            <div className="mb-6 p-4 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
              <label className="block text-sm font-medium mb-3">Share Code</label>
              {generatedCode ? (
                <div className="flex items-center gap-3">
                  <code className="flex-1 bg-[var(--bg-secondary)] px-4 py-2 rounded font-mono text-lg">
                    {generatedCode}
                  </code>
                  <button
                    onClick={copyCode}
                    className="bg-orange-500/20 text-orange-400 p-2 rounded-lg hover:bg-orange-500/30"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              ) : (
                <button
                  onClick={generateCode}
                  className="w-full bg-[var(--bg-secondary)] py-2 rounded border border-dashed border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text)]"
                >
                  Generate Code
                </button>
              )}
            </div>
          )}

          {/* Create Button */}
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            <Swords size={20} />
            Create Battle
          </button>
        </div>
      )}

      {/* Join Battle */}
      {activeTab === 'join' && (
        <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-6 max-w-xl">
          <h2 className="text-xl font-semibold mb-6">Join a Battle</h2>

          {/* Enter Code */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Enter Battle Code</label>
            <input
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
              className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3 font-mono text-lg uppercase"
              placeholder="XXXXXX"
              maxLength={6}
            />
          </div>

          {/* OR Join Public */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Or join a public battle</label>
            <div className="space-y-2">
              {activeBattles.map((battle) => (
                <div
                  key={battle.id}
                  className="flex items-center justify-between bg-[var(--bg)] rounded-lg p-4 border border-[var(--border)]"
                >
                  <div className="flex items-center gap-3">
                    <Users size={18} className="text-[var(--text-secondary)]" />
                    <div>
                      <p className="font-medium">{battle.creator}</p>
                      <p className="text-sm text-[var(--text-secondary)]">{battle.pack}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">{battle.wager} USDC</span>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Battles */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Active Battles</h2>
          
          {/* Waiting for opponent */}
          <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-yellow-400 font-medium">Waiting for opponent</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                  <Package size={32} className="text-orange-400" />
                </div>
                <div>
                  <p className="font-semibold">Legendary Case Battle</p>
                  <p className="text-sm text-[var(--text-secondary)]">Wager: 10 USDC</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                  Ready
                </button>
                <button className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg">
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* No active battles */}
          <div className="text-center py-12">
            <Swords size={48} className="mx-auto text-[var(--text-secondary)] mb-4" />
            <p className="text-[var(--text-secondary)]">No active battles</p>
            <button 
              onClick={() => setActiveTab('create')}
              className="mt-4 text-orange-400 hover:text-orange-300"
            >
              Create one now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
