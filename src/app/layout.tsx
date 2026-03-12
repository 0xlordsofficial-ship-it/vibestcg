import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers';
import Layout from '@/components/layout/Layout';

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
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
