import type { Metadata } from 'next';
import './globals.css';
import { DataProvider } from '@/context/data-context';
import { AuthModal } from '@/components/ui/AuthModal';

export const metadata: Metadata = {
  title: 'N.U.D — Newtech Unified Data | One Platform. Infinite Insights.',
  description:
    'Newtech Unified Data (N.U.D) helps you bring your data together, understand it easily, and discover useful business insights.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        <DataProvider>
          {children}
          <AuthModal />
        </DataProvider>
      </body>
    </html>
  );
}
