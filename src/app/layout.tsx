import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Kreics',
    default: 'Kreics',
  },
  description: "Portfolio website showcasing various works by Kreics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="content" className="w-full min-h-screen px-8 py-20 sm:p-lg md:px-16 md:py-20 xl:px-32">
          {children}
        </div>
      </body>
    </html>
  );
}
