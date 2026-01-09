import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/ui/nav-bar';
import Footer from '@/ui/footer';
import { getGlobalData } from '@/data/loaders';

export const metadata: Metadata = {
  title: {
    template: '%s | Kreics',
    default: 'Kreics',
  },
  description: 'Portfolio website showcasing various works by Kreics',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalData();

  return (
    <html lang="en">
      <body>
        <div className="w-full min-h-screen">
          <NavBar data={globalData.header} />
          <main className="w-full">
            <div className="max-w-[1280px] mx-auto px-4 py-8">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
