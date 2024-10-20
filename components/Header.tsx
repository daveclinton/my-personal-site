"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import headerNavLinks from "@/data/headerNavLinks";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <React.Fragment>
      <header className="sticky top-0 z-10 bg-[#1F1F22] shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-white">
              大卫
            </Link>
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                {headerNavLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`transition-colors ${
                        pathname === item.href
                          ? "text-pink-600 font-bold"
                          : "text-white hover:text-pink-700"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <button
              className="md:hidden text-white"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-20 bg-[#1F1F22] bg-opacity-90 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-y-0 right-0 max-w-4xl w-full bg-[#1F1F22] shadow-xl transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMenu}
              className="text-white"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav>
            <ul className="flex flex-col space-y-4 p-4">
              {headerNavLinks.map((item, index) => (
                <li
                  key={item.href}
                  className={`transform transition-all duration-300 ease-in-out ${
                    isMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-full opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Link
                    href={item.href}
                    className={`text-2xl font-bold transition-colors ${
                      pathname === item.href
                        ? "text-pink-600"
                        : "text-white hover:text-pink-700"
                    }`}
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
