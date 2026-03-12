'use client';

import { Wallet } from 'lucide-react';

export default function Header() {
  // Mock wallet data - will connect to Privy later
  const walletConnected = false;
  const balance = '0.00';

  return (
    <header className="h-16 bg-[var(--bg-secondary)] border-b border-[var(--border)] flex items-center justify-end px-6 gap-4">
      {/* Wallet Connection */}
      {walletConnected ? (
        <div className="flex items-center gap-3 bg-[var(--bg)] px-4 py-2 rounded-lg border border-[var(--border)]">
          <Wallet size={18} className="text-green-400" />
          <span className="text-sm font-medium">{balance} USDC</span>
          <button className="text-xs text-[var(--text-secondary)] hover:text-[var(--text)]">
            0x1234...5678
          </button>
        </div>
      ) : (
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Connect Wallet
        </button>
      )}
    </header>
  );
}
