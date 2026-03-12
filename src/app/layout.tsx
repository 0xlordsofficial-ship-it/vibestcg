import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from './providers';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

export const metadata: Metadata = {
  title: 'VibeTCG - On-Chain Trading Card Game',
  description: 'Buy packs, rip cards, battle for stakes - true ownership on Avalanche',
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
          <div className="flex min-h-screen bg-[var(--bg)]">
            <Sidebar />
            <div className="flex-1 ml-64">
              <Header />
              <main className="p-6">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
