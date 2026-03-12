'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, ShoppingBag, Package, Swords, Trophy, Wallet, Settings, 
  Moon, Sun, LogOut, Menu, X, User, Gem, Gift, MessageCircle, ShoppingCart, CreditCard, Users, ChevronRight, Plus, Minus
} from 'lucide-react';
import { useTheme } from '@/components/providers';
import { useState } from 'react';

const navLinks = [
  { href: '/shop', label: 'Packs' },
  { href: '/battle', label: 'Pack Party' },
  { href: '/vault', label: 'Marketplace' },
  { href: '/leaderboard', label: 'Explore' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userSidebarOpen, setUserSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0a0a1a]">
      <div className="flex-1 min-h-screen">
        {/* Phygitals-style Navbar - Fixed top */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-16 bg-[#0a0a1a]/95 backdrop-blur-xl border-b border-white/5">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-black text-2xl">VibeTCG</span>
          </Link>

          {/* Nav Links - Center */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                  pathname === link.href ? 'text-[#ffe500]' : 'text-white/50 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Get Started CTA */}
            <button className="hidden md:block bg-[#ffe500] hover:bg-[#ffd000] text-black font-bold px-5 py-2 rounded-full text-sm transition-colors">
              Get Started
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileOpen(false)} />
        )}
        <div className={`md:hidden fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-[#0a0a1a] border-r border-white/5 z-40 transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <nav className="p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-bold uppercase ${
                  pathname === link.href ? 'bg-[#ffe500] text-black' : 'text-white/50 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button className="w-full bg-[#ffe500] text-black font-bold px-4 py-3 rounded-lg mt-4">
              Get Started
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <main className="pt-16">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <span className="font-black text-xl">VibeTCG</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-white/40">
                <a href="#" className="hover:text-white">Terms</a>
                <a href="#" className="hover:text-white">Privacy</a>
                <a href="#" className="hover:text-white">Contact</a>
              </div>
              <p className="text-sm text-white/30">© 2026 VibeTCG. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* User Sidebar (Right) - Phygitals style */}
      {userSidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setUserSidebarOpen(false)}
        />
      )}

      <div className={`fixed top-0 right-0 h-screen w-80 bg-[#0a0a1a] border-l border-white/5 z-50 transform transition-transform ${userSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ffe500] to-orange-500 rounded-full flex items-center justify-center font-bold text-black">
              S
            </div>
            <div>
              <p className="font-bold">SteelTamer8315</p>
              <p className="text-xs text-white/50">Level 0</p>
            </div>
          </div>
          <button 
            onClick={() => setUserSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-white/5"
          >
            <X size={20} />
          </button>
        </div>

        {/* Wallet */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/50">Wallet</span>
            <span className="font-bold">$0.00</span>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-[#ffe500] text-black font-bold text-sm rounded-lg">
              Add
            </button>
            <button className="flex-1 py-2 bg-white/5 font-bold text-sm rounded-lg">
              Withdraw
            </button>
          </div>
        </div>

        {/* Menu Items - Exact Phygitals */}
        <nav className="p-2">
          {[
            { icon: User, label: 'Profile', href: '/profile' },
            { icon: Package, label: 'Inventory', href: '/vault' },
            { icon: ShoppingCart, label: 'Orders', href: '#' },
            { icon: MessageCircle, label: 'Messages', href: '#' },
            { icon: CreditCard, label: 'Claim Items', href: '#' },
            { icon: Gem, label: 'Vault Cards', href: '/vault' },
            { icon: Users, label: 'Refer & Earn', href: '#' },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              onClick={() => setUserSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <item.icon size={18} className="text-white/50" />
              <span className="flex-1 font-medium">{item.label}</span>
              <ChevronRight size={16} className="text-white/30" />
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10">
            <LogOut size={18} />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
