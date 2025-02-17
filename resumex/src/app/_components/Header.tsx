"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-black text-white sticky top-0 z-50 h-20">
      <div className="max-w-4xl mx-auto flex justify-between items-center p-4">
        {/* Clickable Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/main_logo.png" // Ensure this is in the public/ folder
            alt="ResumeX Logo"
            width={175} // Adjust as needed
            height={175}
            priority
            className="cursor-pointer" // Makes it clear it's clickable
          />
        </Link>

        {/* Navigation Bar */}
        <nav className="flex space-x-6">
          <Link href="/pricing" className="hover:text-teal-400">Pricing</Link>
          <Link href="/templates" className="hover:text-teal-400">Templates</Link>
          <Link href="/pro-version" className="hover:text-teal-400">Pro Version</Link>
          <Link href="/about" className="hover:text-teal-400">About Us</Link>
          <Link href="/login" className="hover:text-teal-400">Login</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
