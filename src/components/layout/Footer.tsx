import Link from 'next/link';
import { Twitter, Send, Github } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    product: [
      { label: 'Shop', href: '/shop' },
      { label: 'Battle', href: '/battle' },
      { label: 'Leaderboard', href: '/leaderboard' },
      { label: 'Vault', href: '/vault' },
    ],
    company: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    legal: [
      { label: 'Terms', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
  };

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-3xl font-display font-bold text-accent">
              VibeTCG
            </Link>
            <p className="text-sm text-[var(--text-muted)] mt-2">
              Buy. Rip. Collect. — True ownership on Avalanche.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="p-2 rounded-lg bg-[var(--bg-hover)] hover:bg-[var(--accent-yellow)] hover:text-black transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-[var(--bg-hover)] hover:bg-[var(--accent-yellow)] hover:text-black transition-all">
                <Send size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-[var(--bg-hover)] hover:bg-[var(--accent-yellow)] hover:text-black transition-all">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[var(--text-muted)] mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--text-secondary)] hover:text-[var(--accent-yellow)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[var(--text-muted)] mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--text-secondary)] hover:text-[var(--accent-yellow)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[var(--text-muted)] mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--text-secondary)] hover:text-[var(--accent-yellow)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[var(--border)] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            © 2026 VibeTCG. All rights reserved.
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            Built on Avalanche
          </p>
        </div>
      </div>
    </footer>
  );
}
