"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { HiOutlineMenu } from "react-icons/hi";
import { LuUserRoundPlus } from "react-icons/lu";
import { LuLogIn } from "react-icons/lu";

export default function Navbar({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Applique l'effet après 50px de scroll
      } else {
        setIsScrolled(false); // Restaure la taille initiale quand on est en haut
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div
        className="fixed bottom-4 right-4 p-2 border-2 border-white rounded-full text-2xl md:hidden"
        onClick={() => setOpenDrawer(true)}
      >
        <HiOutlineMenu />
      </div>

      <div
        className={`sticky top-4 z-10 mx-auto transition-all duration-300 ${
          isScrolled ? "max-w-3xl border border-white" : "max-w-5xl "
        } backdrop-blur-md rounded-full hidden md:block`}
      >
        <div className="navbar">
          <div className="navbar-start">
            <Link href="/" className="btn btn-ghost normal-case text-xl">
              Logo
            </Link>
          </div>
          <div className="navbar-center">
            <ul className="menu menu-horizontal p-0">
              <li>
                <Link href="/">Accueil</Link>
              </li>
              <li>
                <Link href="/">À propos</Link>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <div className="dropdown dropdown-bottom dropdown-center dropdown-hover">
              <div
                tabIndex="0"
                role="button"
                className="btn rounded-full text-2xl"
              >
                <FiUser />
              </div>
              <ul
                tabIndex="0"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <Link href="/login">
                    <LuLogIn />
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup">
                    <LuUserRoundPlus />
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="drawer">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          defaultChecked={openDrawer}
        />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}
