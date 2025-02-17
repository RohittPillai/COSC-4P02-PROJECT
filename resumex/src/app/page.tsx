"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-teal-400 text-black sticky top-0 z-50 h-20 flex items-center">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/main_logo.png"
            alt="ResumeX Logo"
            width={150}  // Reduced size for better fit
            height={150} 
            className="h-22 w-auto" // Ensures a fixed height with auto width
            priority
          />
        </Link>

        {/* Navigation Bar */}
        <nav className="flex space-x-6">
          <Link href="/pricing" className="hover:text-white">Pricing</Link>
          <Link href="/templates" className="hover:text-white">Templates</Link>
          <Link href="/pro-version" className="hover:text-white">Pro Version</Link>
          <Link href="/about" className="hover:text-white">About Us</Link>
          <Link href="/login" className="hover:text-white">Login</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
