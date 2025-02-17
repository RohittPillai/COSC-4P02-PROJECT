"use client";

import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-turquoise text-white py-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        
        {/* Left Side - Branding */}
        <div className="text-lg font-semibold">
          ResumeX © {new Date().getFullYear()}
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 mt-3 md:mt-0">
          <Link href="/pricing" className="hover:text-gray-200">Pricing</Link>
          <Link href="/templates" className="hover:text-gray-200">Templates</Link>
          <Link href="/about" className="hover:text-gray-200">About</Link>
          <Link href="/contact" className="hover:text-gray-200">Contact</Link>
        </nav>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="https://github.com" target="_blank" className="hover:text-gray-200">
            <FaGithub size={20} />
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="hover:text-gray-200">
            <FaLinkedin size={20} />
          </Link>
          <Link href="https://twitter.com" target="_blank" className="hover:text-gray-200">
            <FaTwitter size={20} />
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
