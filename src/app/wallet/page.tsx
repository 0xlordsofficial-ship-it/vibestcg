'use client';

import { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Copy, Check, ExternalLink, Filter } from 'lucide-react';

type TransactionType = 'all' | 'pack_purchase' | 'battle' | 'deposit' | 'withdrawal';

const transactions = [
  { id: '1', type: 'pack_purchase', amount: -50, description: 'Elite Box', status: 'completed', date: '2026-03-11 14:32' },
  { id: '2', type: 'battle_win', amount: 8, description: 'Battle win vs CardKing', status: 'completed', date: '2026-03-11 12:15' },
  { id: '3', type: 'deposit', amount: 100, description: 'Deposit from external wallet', status: 'completed', date: '2026-03-10 09:00' },
  { id: '4', type: 'battle_loss', amount: -5, description: 'Battle loss vs NFTHunter', status: 'completed', date: '2026-03-09 18:45' },
  { id: '5', type: 'pack_purchase', amount: -10, description: 'Starter Pack', status: 'completed', date: '2026-03-09 16:20' },
  { id: '6', type: 'withdrawal', amount: -25, description: 'Withdrawal to 0x1234...5678', status: 'pending', date: '2026-03-08 11:00' },
  { id: '7', type: 'fee', amount: -1, description: 'Battle fee (5%)', status: 'completed', date: '2026-03-08 10:30' },
];

export default function WalletPage() {
  const [filter, setFilter] = useState<TransactionType>('all');
  const [copied, setCopied] = useState(false);

  const walletAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f';
  const balance = '42.50';
  const cardValue = '156.00';

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredTransactions = transactions.filter(tx => 
    filter === 'all' || 
    (filter === 'pack_purchase' && (tx.type === 'pack_purchase' || tx.type === 'fee')) ||
    (filter === 'battle' && (tx.type === 'battle_win' || tx.type === 'battle_loss' || tx.type === 'fee')) ||
    (filter === 'deposit' && tx.type === 'deposit') ||
    (filter === 'withdrawal' && tx.type === 'withdrawal')
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pack_purchase': return <ArrowUpRight size={16} className="text-red-400" />;
      case 'battle_win': return <ArrowUpRight size={16} className="text-green-400" />;
      case 'battle_loss': return <ArrowDownLeft size={16} className="text-red-400" />;
      case 'deposit': return <ArrowDownLeft size={16} className="text-green-400" />;
      case 'withdrawal': return <ArrowUpRight size={16} className="text-yellow-400" />;
      case 'fee': return <ArrowUpRight size={16} className="text-orange-400" />;
      default: return <Wallet size={16} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'pack_purchase': return 'Pack Purchase';
      case 'battle_win': return 'Battle Win';
      case 'battle_loss': return 'Battle Loss';
      case 'deposit': return 'Deposit';
      case 'withdrawal': return 'Withdrawal';
      case 'fee': return 'Fee';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">Wallet</h1>
        <p className="text-[var(--text-secondary)]">Manage your funds and view transaction history</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* USDC Balance */}
        <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-green-400 font-bold">$</span>
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">USDC Balance</p>
              <p className="text-2xl font-bold">{balance} USDC</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-green-500/20 text-green-400 py-2 rounded-lg hover:bg-green-500/30 transition-colors">
              Deposit
            </button>
            <button className="flex-1 bg-orange-500/20 text-orange-400 py-2 rounded-lg hover:bg-orange-500/30 transition-colors">
              Withdraw
            </button>
          </div>
        </div>

        {/* Card Portfolio Value */}
        <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <span className="text-purple-400">🃏</span>
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Card Portfolio</p>
              <p className="text-2xl font-bold">{cardValue} USDC</p>
            </div>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">Est. value of your collection</p>
        </div>

        {/* Total */}
        <div className="bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-xl border border-[var(--border)] p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <Wallet size={20} />
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Total Value</p>
              <p className="text-2xl font-bold">{Number(balance) + Number(cardValue)} USDC</p>
            </div>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">Balance + Cards value</p>
        </div>
      </div>

      {/* Wallet Address */}
      <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-6">
        <h2 className="text-lg font-semibold mb-4">Your Address</h2>
        <div className="flex items-center gap-3">
          <code className="flex-1 bg-[var(--bg)] px-4 py-3 rounded-lg font-mono text-sm">
            {walletAddress}
          </code>
          <button
            onClick={copyAddress}
            className="bg-[var(--bg)] border border-[var(--border)] px-4 py-3 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
          >
            {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
          </button>
          <a
            href={`https://snowtrace.io/address/${walletAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--bg)] border border-[var(--border)] px-4 py-3 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Transaction History</h2>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-[var(--text-secondary)]" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as TransactionType)}
              className="bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="pack_purchase">Packs</option>
              <option value="battle">Battle</option>
              <option value="deposit">Deposits</option>
              <option value="withdrawal">Withdrawals</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          {filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 bg-[var(--bg)] rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[var(--bg-secondary)] rounded-lg flex items-center justify-center">
                  {getTypeIcon(tx.type)}
                </div>
                <div>
                  <p className="font-medium">{tx.description}</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {getTypeLabel(tx.type)} • {tx.date}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount} USDC
                </p>
                <p className={`text-xs ${tx.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {tx.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <p className="text-center py-8 text-[var(--text-secondary)]">No transactions found</p>
        )}
      </div>
    </div>
  );
}
