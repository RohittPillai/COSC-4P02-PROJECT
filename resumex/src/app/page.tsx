"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png" // Path to your logo in the public folder
            alt="Resumex Logo"
            width={40} // Adjust width
            height={40} // Adjust height
          />
          <span className="text-2xl font-bold hover:text-gray-400">
            AI Resume Builder
          </span>
        </Link>

        {/* Navigation Bar */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/pricing" className="hover:text-turquoise">
            Pricing
          </Link>
          <Link href="/templates" className="hover:text-turquoise">
            Templates
          </Link>
          <Link href="/pro-version" className="hover:text-turquoise">
            Pro Version
          </Link>
          <Link href="/about" className="hover:text-turquoise">
            About Us
          </Link>
          <Link href="/login" className="hover:text-turquoise">
            Login
          </Link>
        </nav>

        {/* Mobile Menu (Hamburger Icon) */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => alert("Mobile menu coming soon!")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
