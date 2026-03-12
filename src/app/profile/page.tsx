'use client';

import { useState } from 'react';
import { User, Mail, Wallet, Trophy, Package, Swords, Save } from 'lucide-react';

export default function Profile() {
  const [username, setUsername] = useState('YourName');
  const [bio, setBio] = useState('TCG enthusiast 🎴');
  const [email, setEmail] = useState('user@example.com');

  const stats = {
    packsBought: 12,
    cardsCollected: 56,
    battlesWon: 8,
    battlesLost: 4,
    totalEarned: 45,
    vibePoints: 1250,
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">Profile</h1>
        <p className="text-[var(--text-secondary)]">Manage your account and settings</p>
      </div>

      {/* Profile Card */}
      <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-purple-500 rounded-full flex items-center justify-center text-4xl font-bold">
              {username[0]}
            </div>
            <button className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors">
              <User size={16} />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-2xl font-bold bg-transparent border-b border-transparent hover:border-[var(--border)] focus:border-orange-500 focus:outline-none mb-2 w-full"
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-transparent border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:border-orange-500 focus:outline-none resize-none"
              rows={2}
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors">
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package size={18} className="text-orange-400" />
            <span className="text-sm text-[var(--text-secondary)]">Packs Bought</span>
          </div>
          <p className="text-2xl font-bold">{stats.packsBought}</p>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <User size={18} className="text-purple-400" />
            <span className="text-sm text-[var(--text-secondary)]">Cards Collected</span>
          </div>
          <p className="text-2xl font-bold">{stats.cardsCollected}</p>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={18} className="text-yellow-400" />
            <span className="text-sm text-[var(--text-secondary)]">Battles Won</span>
          </div>
          <p className="text-2xl font-bold">{stats.battlesWon}</p>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <Swords size={18} className="text-red-400" />
            <span className="text-sm text-[var(--text-secondary)]">Battles Lost</span>
          </div>
          <p className="text-2xl font-bold">{stats.battlesLost}</p>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-400">$</span>
            <span className="text-sm text-[var(--text-secondary)]">Total Earned</span>
          </div>
          <p className="text-2xl font-bold text-green-400">${stats.totalEarned}</p>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-400">⭐</span>
            <span className="text-sm text-[var(--text-secondary)]">Vibe Points</span>
          </div>
          <p className="text-2xl font-bold">{stats.vibePoints}</p>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-6">
        <h2 className="text-lg font-semibold mb-6">Account Settings</h2>
        
        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[var(--text-secondary)]" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-[var(--text-secondary)]">Receive updates and notifications</p>
              </div>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-2 w-64"
            />
          </div>

          {/* Wallet */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wallet size={18} className="text-[var(--text-secondary)]" />
              <div>
                <p className="font-medium">Connected Wallet</p>
                <p className="text-sm text-[var(--text-secondary)]">0x742d...5678</p>
              </div>
            </div>
            <button className="text-orange-400 hover:text-orange-300 text-sm">
              Disconnect
            </button>
          </div>

          {/* Theme (handled by sidebar) */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
            <div className="flex items-center gap-3">
              <span className="text-lg">🌙</span>
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-[var(--text-secondary)]">Toggle dark/light mode in sidebar</p>
              </div>
            </div>
            <span className="text-[var(--text-secondary)]">Dark Mode</span>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-[var(--bg-secondary)] rounded-xl border border-red-500/30 p-6">
        <h2 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Delete Account</p>
            <p className="text-sm text-[var(--text-secondary)]">Permanently delete your account and all data</p>
          </div>
          <button className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
