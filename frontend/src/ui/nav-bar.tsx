'use client';

import React, { useState } from 'react';
import { Fade as Hamburger } from 'hamburger-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/nav-bar.module.css';
import { StrapiImage } from '@/app/components/StrapiImage';

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
  const { sectionText, logo } = data;

  return (
    <aside className="lg:w-1/6 lg:h-screen">
      <div className="w-full">
        <div className="flex flex-row mb-4 justify-between items-center">
          <button className="w-[120px] h-[120px] cursor-pointer">
            <Link href={logo.url}>
              <StrapiImage src="/next.svg" alt={logo.text} className="w-100 h-auto" width={100} height={100} />
            </Link>
          </button>

          <Hamburger toggled={hamburger} toggle={setHamburger} color="#FF7B00" rounded hideOutline={false} />
        </div>

        <div id="nav" className="p-0 text-left block w-auto static">
          <ul id="nav-links">
            {sectionText.map((item) => (
              <li key={item.id} className="nav-link hidden lg:block">
                <Link href={item.url} target={item.isExternal ? '_blank' : ''}>
                  {item.text}
                </Link>
              </li>
            ))}

            {/* <div
							id="subnav"
							className="subnav mb-4">
							<ul>
								{docs?.map((doc, idx) => (
									<li
										className="page-collection mb-2"
										key={idx}>
										{doc.project}

										<WorkList data={doc} />
									</li>
								))}
							</ul>
						</div> */}

            <div className="flex flex-row gap-2 items-center">
              <li className="mt-4">
                <a
                  href="https://www.instagram.com/kreicsfilms/"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden lg:block"
                >
                  <Image
                    className="mx-auto lg:mx-0 "
                    alt="Instagram logo"
                    src="/instagram.svg"
                    width={24}
                    height={24}
                  />
                </a>
              </li>

              <li className="mt-4">
                <a
                  href="https://www.youtube.com/channel/UCVxL93fPm0rDP31Nbh7hlVg"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden lg:block"
                >
                  <Image className="mx-auto lg:mx-0 " alt="Instagram logo" src="/youtube.svg" width={30} height={30} />
                </a>
              </li>
            </div>
          </ul>
        </div>

        {/* mobile nav */}
        <div className={`${styles['mobile-nav']} ${hamburger ? styles['open-menu'] : styles['closed-menu']}`}>
          <ul className="flex flex-col gap-8 list-none">
            {sectionText.map((item) => (
              <li key={item.id} className="nav-link" onClick={() => hamburgerMenu()}>
                <Link href={item.url}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
