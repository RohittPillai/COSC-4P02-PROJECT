"use client";

import Header from "../_components/Header"; // Use same path as Pricing page
import Footer from "../_components/Footer";
import Link from "next/link";

export default function TemplatesPlaceholder() {
  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <Header />
        {/* left aligned resume templates text */}
        <div className="mt-16 ml-16">
          <h1 className="text-6xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-gray-800 animate-gradient">
            RESUME TEMPLATES
          </h1>
        </div>
        {/* Animation keyframes */}
        <style jsx>{`
          @keyframes gradientAnimation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientAnimation 3s ease infinite;
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
}