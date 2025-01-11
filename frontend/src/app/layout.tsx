import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/ui/nav-bar';
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
        <div id="content" className="w-full min-h-screen px-8 py-20 sm:p-lg md:px-16 md:py-20 xl:px-32">
          <main className="flex flex-col">
            <div className="lg:flex w-full">
              <NavBar data={globalData.header} />

              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
