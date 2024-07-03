"use client";

import React, { useState } from "react";
import { Fade as Hamburger } from "hamburger-react";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/data/links";
import styles from "@/styles/nav-bar.module.css";

export default function NavBar() {
  const [hamburger, setHamburger] = useState(false);

  const hamburgerMenu = () => {
    setHamburger(!hamburger);
  };

  const showCaseWork = () => {
    const subnav = document.getElementById("subnav");
    if (subnav) {
      subnav.classList.toggle("show");
    }
  };

  return (
    <aside className="lg:w-1/6 lg:h-screen">
      <div className="w-full">
        <div className="flex flex-row mb-4 justify-between items-center">
          <button className="w-[120px] h-[120px] cursor-pointer">
            <Link href="/">
              <Image
                src="./next.svg"
                className="w-100 h-auto"
                alt="Logo spinning camera"
                width={100}
                height={100}
              />
            </Link>
          </button>

          <Hamburger
            toggled={hamburger}
            toggle={setHamburger}
            color="#FF7B00"
            rounded
            hideOutline={false}
          />
        </div>

        <div id="nav" className="p-0 text-left block w-auto static">
          <ul id="nav-links" className="gap-y-10 lg:gap-y-0">
            <li id="first" className="nav-link">
              <Link href="/about" className="hidden lg:block">
                ABOUT ME
              </Link>
            </li>

            <li id="second" className="nav-link">
              <Link href="/contact" className="hidden lg:block">
                CONTACT
              </Link>
            </li>

            <li id="third" className="nav-link mb-2">
              <button
                onClick={() => showCaseWork()}
                type="button"
                className="hidden lg:block"
              >
                WORK
              </button>
            </li>

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

            <li className="mb-12 lg:mb-4">
              <a
                href="https://www.instagram.com/kreicsfilms/"
                target="_blank"
                rel="noreferrer"
                className="hidden lg:block"
              >
                <Image
                  className="mx-auto lg:mx-0 "
                  alt="Instagram logo"
                  src="./instagram.svg"
                  width={30}
                  height={30}
                />
              </a>
            </li>
          </ul>
        </div>

        {/* mobile nav */}
        <div
          className={`${styles["mobile-nav"]} ${
            hamburger ? styles["open-menu"] : styles["closed-menu"]
          }`}
        >
          <ul className="flex flex-col gap-8 list-none">
            {navLinks.map((item) => (
              <li
                className="nav-link"
                key={item.title}
                onClick={() => hamburgerMenu()}
              >
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
