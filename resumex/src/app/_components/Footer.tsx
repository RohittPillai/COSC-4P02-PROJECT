"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        
        {/* Left Side - Copyright Text */}
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} ResumeX. All rights reserved.
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 mt-3 md:mt-0 text-sm">
          <Link href="/pricing" className="hover:text-gray-200 transition">Pricing</Link>
          <Link href="/templates" className="hover:text-gray-200 transition">Templates</Link>
          <Link href="/about" className="hover:text-gray-200 transition">About</Link>
          <Link href="/contact" className="hover:text-gray-200 transition">Contact</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
