"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<{ name: string } | null>(null);
// For custom login, replace with your user data structure
  useEffect(() => {
    if (session) {
      localStorage.removeItem("userData");
      setUser(null);
    }
  }, [session]);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    if (session) {
      signOut({ callbackUrl: "/" }); // For NextAuth
    } else {
      localStorage.removeItem("userData"); // For custom login
      setUser(null);
    }
  };

  const displayName = session?.user?.name || user?.name;

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-8xl mx-auto flex justify-between items-center px-8 h-20">
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
        <nav className="hidden md:flex space-x-8 text-lg font-medium">
          <Link href="/pricing" className="hover:text-blue-600 transition">Pricing</Link>
          <Link href="/templates" className="hover:text-blue-600 transition">Templates</Link>
          <Link href="/pro-resume" className="hover:text-blue-600 transition">Pro Version</Link>
          <Link href="/aboutus" className="hover:text-blue-600 transition">About Us</Link>

          {displayName ? (
            <>
              <span>Welcome, {displayName}</span>
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