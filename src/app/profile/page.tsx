'use client';

import { useState, useEffect, useRef } from 'react';
import { User, Mail, Wallet, Trophy, Package, Swords, Save, Camera, Star } from 'lucide-react';

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

export default function Profile() {
  const [username, setUsername] = useState('YourName');
  const [bio, setBio] = useState('TCG enthusiast 🎴');

  return (
    <div className="min-h-screen pb-20">
      <div className="py-8 border-b border-[var(--border)] mb-8">
        <div className="max-w-3xl mx-auto px-6">
          <RevealSection>
            <h1 className="font-display text-5xl font-black mb-2">Profile</h1>
            <p className="text-[var(--text-muted)] text-lg">Manage your account</p>
          </RevealSection>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <RevealSection>
          <div className="card p-8 mb-8">
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-[var(--accent-yellow)] to-[var(--accent-coral)] rounded-full flex items-center justify-center text-4xl font-bold">
                  {username[0]}
                </div>
                <button className="absolute bottom-0 right-0 bg-[var(--accent-yellow)] text-black p-2 rounded-full">
                  <Camera size={16} />
                </button>
              </div>
              <div className="flex-1">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="text-3xl font-display font-black bg-transparent border-b border-[var(--border)] hover:border-[var(--accent-yellow)] focus:border-[var(--accent-yellow)] focus:outline-none w-full mb-2" />
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full bg-[var(--bg-hover)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm resize-none" rows={2} placeholder="Tell us about yourself..." />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="btn btn-primary"><Save size={18} /> Save Changes</button>
            </div>
          </div>
        </RevealSection>

        <RevealSection delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Packs Bought', value: 12, icon: Package, color: 'text-accent' },
              { label: 'Cards Collected', value: 56, icon: User, color: 'text-purple-400' },
              { label: 'Battles Won', value: 8, icon: Trophy, color: 'text-yellow-400' },
              { label: 'Battles Lost', value: 4, icon: Swords, color: 'text-red-400' },
              { label: 'Total Earned', value: '$45', icon: Wallet, color: 'text-green-400' },
              { label: 'Vibe Points', value: 1250, icon: Star, color: 'text-blue-400' },
            ].map((stat, i) => (
              <div key={i} className="card p-4 text-center">
                <stat.icon size={20} className={`mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection delay={200}>
          <div className="card p-6">
            <h2 className="font-display text-xl font-bold mb-6">Account Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[var(--text-muted)]" />
                  <div>
                    <p className="font-bold">Email</p>
                    <p className="text-sm text-[var(--text-muted)]">user@example.com</p>
                  </div>
                </div>
                <button className="text-[var(--accent-yellow)] text-sm">Edit</button>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <Wallet size={18} className="text-[var(--text-muted)]" />
                  <div>
                    <p className="font-bold">Connected Wallet</p>
                    <p className="text-sm text-[var(--text-muted)]">0x742d...5678</p>
                  </div>
                </div>
                <button className="text-red-400 text-sm">Disconnect</button>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
