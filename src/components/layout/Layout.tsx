'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Package, Swords, Trophy, Wallet, Menu, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '/shop', label: 'Packs' },
  { href: '/battle', label: 'Pack Party' },
  { href: '/vault', label: 'Marketplace' },
  { href: '/leaderboard', label: 'Explore' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userSidebarOpen, setUserSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0a0a1a]">
      <div className="flex-1 min-h-screen">
        {/* Navbar - Phygitals style */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/95 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="font-black text-2xl">VibeTCG</Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#13132a] rounded-lg border border-white/10">
                <Wallet size={16} />
                <span className="font-mono font-medium">$0.00</span>
              </button>
              <button className="px-4 py-2 bg-[#00D26A] hover:bg-[#00c25e] text-black font-bold rounded-lg text-sm">
                Add Funds
              </button>
              <button 
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg bg-white/5"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileOpen(false)} />
        )}
        <div className={`md:hidden fixed top-16 left-0 w-72 h-[calc(100vh-4rem)] bg-[#13132a] border-r border-white/5 z-40 transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <nav className="p-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === link.href 
                    ? 'bg-[#00D26A] text-black' 
                    : 'text-white/70 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <main className="pt-16">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <span className="font-black text-xl">VibeTCG</span>
              <div className="flex items-center gap-6 text-sm text-white/40">
                <a href="#" className="hover:text-white">Terms</a>
                <a href="#" className="hover:text-white">Privacy</a>
                <a href="#" className="hover:text-white">Contact</a>
              </div>
              <p className="text-sm text-white/30">© 2026 VibeTCG</p>
            </div>
          </div>
        </footer>
      </div>

      {/* User Sidebar (Right) */}
      {userSidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setUserSidebarOpen(false)}
        />
      )}

      <div className={`fixed top-0 right-0 h-screen w-80 bg-[#13132a] border-l border-white/5 z-50 transform transition-transform ${userSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center font-bold text-black">
              S
            </div>
            <div>
              <p className="font-bold">SteelTamer8315</p>
              <p className="text-xs text-white/50">Level 0</p>
            </div>
          </div>
          <button onClick={() => setUserSidebarOpen(false)} className="p-2 rounded-lg hover:bg-white/5">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/50">Balance</span>
            <span className="font-mono font-bold">$0.00 USDC</span>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2.5 bg-[#00D26A] text-black font-bold text-sm rounded-xl">
              Deposit
            </button>
            <button className="flex-1 py-2.5 bg-white/5 font-bold text-sm rounded-xl">
              Withdraw
            </button>
          </div>
        </div>

        <nav className="p-2">
          {[
            { label: 'Profile', href: '/profile' },
            { label: 'Inventory', href: '/vault' },
            { label: 'Wallet', href: '/wallet' },
            { label: 'Battle History', href: '/battle' },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              onClick={() => setUserSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
            >
              <span className="flex-1 font-medium">{item.label}</span>
              <ChevronRight size={16} className="text-white/30" />
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10">
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
