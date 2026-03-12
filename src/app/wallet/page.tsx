'use client';

import { useState, useEffect, useRef } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Copy, Check, ExternalLink, Filter, DollarSign, Gem, TrendingUp } from 'lucide-react';

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

const transactions = [
  { id: '1', type: 'pack_purchase', amount: -50, description: 'Elite Box', status: 'completed', date: '2026-03-11 14:32' },
  { id: '2', type: 'battle_win', amount: 8, description: 'Battle win vs CardKing', status: 'completed', date: '2026-03-11 12:15' },
  { id: '3', type: 'deposit', amount: 100, description: 'Deposit from external wallet', status: 'completed', date: '2026-03-10 09:00' },
  { id: '4', type: 'battle_loss', amount: -5, description: 'Battle loss vs NFTHunter', status: 'completed', date: '2026-03-09 18:45' },
  { id: '5', type: 'pack_purchase', amount: -10, description: 'Starter Pack', status: 'completed', date: '2026-03-09 16:20' },
];

export default function WalletPage() {
  const [filter, setFilter] = useState('all');
  const [copied, setCopied] = useState(false);
  const walletAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f';
  const balance = '42.50';
  const cardValue = '156.00';

  const copyAddress = () => { navigator.clipboard.writeText(walletAddress); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="min-h-screen pb-20">
      <div className="py-8 border-b border-[var(--border)] mb-8">
        <div className="max-w-6xl mx-auto px-6">
          <RevealSection>
            <h1 className="font-display text-5xl font-black mb-2">Wallet</h1>
            <p className="text-[var(--text-muted)] text-lg">Manage your funds</p>
          </RevealSection>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <RevealSection>
            <div className="card p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center"><DollarSign className="text-green-400" size={24} /></div>
                <div>
                  <p className="text-sm text-[var(--text-muted)]">USDC Balance</p>
                  <p className="text-3xl font-black">{balance} USDC</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 btn bg-green-500/20 text-green-400 py-2 hover:bg-green-500/30">Deposit</button>
                <button className="flex-1 btn bg-orange-500/20 text-orange-400 py-2 hover:bg-orange-500/30">Withdraw</button>
              </div>
            </div>
          </RevealSection>
          
          <RevealSection delay={100}>
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center"><Gem className="text-purple-400" size={24} /></div>
                <div>
                  <p className="text-sm text-[var(--text-muted)]">Card Portfolio</p>
                  <p className="text-3xl font-black">{cardValue} USDC</p>
                </div>
              </div>
              <p className="text-sm text-[var(--text-muted)]">Est. value of your collection</p>
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="card p-6 bg-gradient-to-br from-[var(--accent-yellow)]/10 to-[var(--accent-coral)]/10 border-[var(--accent-yellow)]/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[var(--accent-yellow)]/20 rounded-xl flex items-center justify-center"><TrendingUp className="text-[var(--accent-yellow)]" size={24} /></div>
                <div>
                  <p className="text-sm text-[var(--text-muted)]">Total Value</p>
                  <p className="text-3xl font-black">{Number(balance) + Number(cardValue)} USDC</p>
                </div>
              </div>
              <p className="text-sm text-[var(--text-muted)]">Balance + Cards value</p>
            </div>
          </RevealSection>
        </div>

        <RevealSection delay={300}>
          <div className="card p-6 mb-8">
            <h2 className="font-bold mb-4">Your Address</h2>
            <div className="flex gap-2">
              <code className="flex-1 bg-[var(--bg-hover)] px-4 py-3 rounded-lg font-mono">{walletAddress}</code>
              <button onClick={copyAddress} className="btn btn-secondary px-4">{copied ? <Check size={18} /> : <Copy size={18} />}</button>
              <a href="#" className="btn btn-secondary px-4"><ExternalLink size={18} /></a>
            </div>
          </div>
        </RevealSection>

        <RevealSection delay={400}>
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold">Transaction History</h2>
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-[var(--text-muted)]" />
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input py-2">
                  <option value="all">All</option>
                  <option value="pack_purchase">Packs</option>
                  <option value="battle">Battle</option>
                  <option value="deposit">Deposits</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-[var(--bg-hover)] rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tx.amount > 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      {tx.amount > 0 ? <ArrowDownLeft size={18} className="text-green-400" /> : <ArrowUpRight size={18} className="text-red-400" />}
                    </div>
                    <div>
                      <p className="font-bold">{tx.description}</p>
                      <p className="text-sm text-[var(--text-muted)]">{tx.type.replace('_', ' ')} • {tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>{tx.amount > 0 ? '+' : ''}{tx.amount} USDC</p>
                    <p className="text-xs text-green-400">{tx.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
