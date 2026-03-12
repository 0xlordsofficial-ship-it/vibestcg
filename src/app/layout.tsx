import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'VibeTCG - Buy. Rip. Collect.',
  description: 'On-chain trading card game. Buy packs, rip cards, battle for stakes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen bg-[var(--bg-primary)]">
            <Sidebar />
            <div className="flex-1 lg:ml-64">
              <Header />
              <main className="min-h-[calc(100vh-4rem)]">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
