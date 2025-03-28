"use client";

// Documentation: Renders a sticky top navigation bar with a logo and links.
// New changes: Checks localStorage for user data to show greeting & logout button if logged in.

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function handleLogout() {
    // Removes user info from storage and resets login state.
    localStorage.removeItem("userData");
    setUser(null);
  }

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
          <Link href="/pro-resume" className="hover:text-blue-600 transition">Pro Version</Link>
          <Link href="/aboutus" className="hover:text-blue-600 transition">About Us</Link>
          {/* If the user is logged in, show welcome message and logout; otherwise show login link. */}
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <button onClick={handleLogout} className="hover:text-blue-600 transition">Logout</button>
            </>
          ) : (
            <Link href="/login" className="hover:text-blue-600 transition">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
