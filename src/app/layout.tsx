import type { Metadata } from 'next';
import { Inter_Tight, Inter } from 'next/font/google';
import './globals.css';

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-inter-tight',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Fermor — See Your Money. Understand Your Choices.',
  description:
    'A modern financial platform with premium editorial typography. Understand your financial health, explore your choices, and see where today\'s decisions take you.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="bg-canvas text-charcoal-950 antialiased font-sans selection:bg-emerald-100 selection:text-emerald-950 tracking-normal">
        {children}
      </body>
    </html>
  );
}
