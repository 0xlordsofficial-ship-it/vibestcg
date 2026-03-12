'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, ShoppingBag, Package, Swords, Trophy, Wallet, Settings, 
  Moon, Sun, LogOut, Menu, X, User, Gem, Gift, MessageCircle, ShoppingCart, CreditCard, Users, ChevronRight
} from 'lucide-react';
import { useTheme } from '@/components/providers';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/shop', label: 'Shop', icon: ShoppingBag },
  { href: '/vault', label: 'Vault', icon: Package },
  { href: '/battle', label: 'Battle', icon: Swords },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/wallet', label: 'Wallet', icon: Wallet },
  { href: '/profile', label: 'Profile', icon: Settings },
];

// User sidebar items (like Phygitals)
const userSidebarItems = [
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: Package, label: 'Inventory', href: '/vault' },
  { icon: ShoppingCart, label: 'Orders', href: '#' },
  { icon: MessageCircle, label: 'Messages', href: '#' },
  { icon: Gem, label: 'Vault Cards', href: '/vault' },
  { icon: Gift, label: 'Claim Items', href: '#' },
  { icon: Users, label: 'Refer & Earn', href: '#' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userSidebarOpen, setUserSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      {/* Main Content */}
      <div className="flex-1 min-h-screen">
        {/* Top Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 h-[72px] bg-[rgba(8,8,26,0.85)] backdrop-blur-xl border-b border-[var(--border)]">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center gap-2">
            <span className="w-9 h-9 bg-[var(--yellow)] rounded-xl flex items-center justify-center text-xl">🃏</span>
            <span className="font-['Baloo_2'] font-black text-2xl text-[var(--yellow)]">VibeTCG</span>
          </Link>

          {/* Desktop Nav Links - Center */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                  pathname === item.href ? 'text-[var(--yellow)]' : 'text-[var(--muted)] hover:text-[var(--white)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side - Wallet + User */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[var(--bg-hover)] transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* Connect Wallet Button (or User Avatar) */}
            <button className="btn btn-primary text-sm">
              Connect Wallet
            </button>

            {/* User Avatar - Opens Sidebar */}
            <button 
              onClick={() => setUserSidebarOpen(true)}
              className="w-10 h-10 bg-gradient-to-br from-[var(--yellow)] to-[var(--coral)] rounded-full flex items-center justify-center font-bold text-black"
            >
              U
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg bg-[var(--bg-hover)]"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Nav Overlay */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setMobileOpen(false)} />
        )}

        {/* Mobile Nav Menu */}
        <div className={`md:hidden fixed top-[72px] left-0 w-64 h-[calc(100vh-72px)] bg-[var(--bg2)] border-r border-[var(--border)] z-40 transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive ? 'bg-[var(--yellow)] text-black font-bold' : 'text-[var(--muted)] hover:bg-[var(--bg-hover)]'
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content Area */}
        <main className="pt-[72px]">
          {children}
        </main>
      </div>

      {/* User Sidebar (Right Side - Like Phygitals) */}
      {/* Overlay */}
      {userSidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setUserSidebarOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <div className={`fixed top-0 right-0 h-screen w-80 bg-[var(--bg2)] border-l border-[var(--border)] z-50 transform transition-transform ${userSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[var(--yellow)] to-[var(--coral)] rounded-full flex items-center justify-center font-bold text-black text-lg">
              U
            </div>
            <div>
              <p className="font-bold">User123</p>
              <p className="text-sm text-[var(--muted)]">Level 1</p>
            </div>
          </div>
          <button 
            onClick={() => setUserSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-[var(--bg-hover)]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Wallet Balance */}
        <div className="p-4 border-b border-[var(--border)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[var(--muted)]">Wallet</span>
            <span className="font-black text-lg">$0.00</span>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 px-3 bg-[var(--yellow)] text-black rounded-full font-bold text-sm">
              Add Funds
            </button>
            <button className="flex-1 py-2 px-3 bg-[var(--bg-hover)] rounded-full font-bold text-sm">
              Withdraw
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-2">
          {userSidebarItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              onClick={() => setUserSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
            >
              <item.icon size={20} className="text-[var(--muted)]" />
              <span className="flex-1 font-medium">{item.label}</span>
              <ChevronRight size={16} className="text-[var(--muted)]" />
            </Link>
          ))}
        </nav>

        {/* Bottom - Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--border)]">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
