'use client';

import { Wallet } from 'lucide-react';

export default function Header() {
  const walletConnected = false;
  const balance = '0.00';

  return (
    <header className="h-16 flex items-center justify-end px-6 gap-4">
      {walletConnected ? (
        <div className="flex items-center gap-3 bg-[var(--bg-card)] px-4 py-2 rounded-full border border-[var(--border)]">
          <Wallet size={18} className="text-[var(--accent-yellow)]" />
          <span className="text-sm font-bold">{balance} USDC</span>
          <button className="text-xs text-[var(--text-muted)] hover:text-[var(--text)]">
            0x1234...5678
          </button>
        </div>
      ) : (
        <button className="btn btn-primary">
          Connect Wallet
        </button>
      )}
    </header>
  );
}
