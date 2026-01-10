'use client';

import React, { useState } from 'react';
import { Fade as Hamburger } from 'hamburger-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/nav-bar.module.css';

interface LinkItem {
  id: number;
  url: string;
  isExternal: boolean;
  text: string;
}

interface IHeaderProps {
  data: {
    sectionText: LinkItem[];
    logo: {
      id: number;
      url: string;
      isExternal: boolean;
      text: string;
    };
  };
}

export default function NavBar({ data }: Readonly<IHeaderProps>) {
  const [hamburger, setHamburger] = useState(false);

  const hamburgerMenu = () => {
    setHamburger(!hamburger);
  };

  if (!data) return <p>Loading or error...</p>;
  const { sectionText, logo } = data;

  return (
    <header className="w-full bg-white sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4 ">
        <div className="flex flex-row justify-between items-center py-4 md:pt-20">
          {/* Logo */}
          <button className="w-[60px] h-[60px] cursor-pointer">
            <Link href={logo.url}>
              <Image src="/logo.png" alt={logo.text} className="w-full h-auto" width={60} height={60} />
            </Link>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
              {sectionText.map((item) => (
                <li key={item.id} className="nav-link">
                  <Link href={item.url} target={item.isExternal ? '_blank' : ''}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <Hamburger toggled={hamburger} toggle={setHamburger} color="#000" rounded hideOutline={false} />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`${styles['mobile-nav']} ${hamburger ? styles['open-menu'] : styles['closed-menu']}`}>
          <ul className="flex flex-col gap-6 list-none pb-4">
            {sectionText.map((item) => (
              <li key={item.id} className="nav-link" onClick={() => hamburgerMenu()}>
                <Link href={item.url} className="text-gray-700 hover:text-orange-500 transition-colors">
                  {item.text}
                </Link>
              </li>
            ))}
            <li className="flex items-center space-x-4 mt-4">
              <a
                href="https://www.instagram.com/kreicsfilms/"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <Image alt="Instagram logo" src="/instagram.svg" width={24} height={24} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCVxL93fPm0rDP31Nbh7hlVg"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <Image alt="YouTube logo" src="/youtube.svg" width={30} height={30} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
