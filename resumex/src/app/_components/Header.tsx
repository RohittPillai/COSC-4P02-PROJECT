"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-8xl mx-auto flex justify-between items-center px-8 h-20">
        
        {/* Logo - Always on the Left */}
        <Link href="/" className="flex items-center">
          <Image
            src="/transparent_white_main_logo.png"
            alt="ResumeX Logo"
            width={160}
            height={160}
            priority
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation - Always on the Right */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium">
          <Link href="/pricing" className="hover:text-blue-600 transition">Pricing</Link>
          <Link href="/templates" className="hover:text-blue-600 transition">Templates</Link>
          <Link href="/pro-version" className="hover:text-blue-600 transition">Pro Version</Link>
          <Link href="/about" className="hover:text-blue-600 transition">About Us</Link>
          <Link href="/login" className="hover:text-blue-600 transition">Login</Link>
        </nav>
    </div>
    </header>
);
};

export default Header;
