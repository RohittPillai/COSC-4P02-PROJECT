"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 h-20 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-8 h-full">
        {/* Logo - Larger for Better Visibility */}
        <Link href="/" className="flex items-center space-x-4">
          <Image
            src="/transparent_white_main_logo.png"
            alt="ResumeX Logo"
            width={180} // Increased size for better visibility
            height={180}
            priority
            className="cursor-pointer"
          />
        </Link>

        {/* Navigation Bar - Larger Text, More Spacing */}
        <nav className="flex space-x-10 text-lg font-medium">
          <Link href="/pricing" className="hover:text-teal-400 transition">Pricing</Link>
          <Link href="/templates" className="hover:text-teal-400 transition">Templates</Link>
          <Link href="/pro-version" className="hover:text-teal-400 transition">Pro Version</Link>
          <Link href="/about" className="hover:text-teal-400 transition">About Us</Link>
          <Link href="/login" className="hover:text-teal-400 transition">Login</Link>
      
          
        </nav>
      </div>
    </header>
  );
};

export default Header;
