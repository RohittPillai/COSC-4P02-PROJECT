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
          <h1 className="text-6xl font-extrabold tracking-wide text-transparent bg-clip-text animate-gradient leading-tight">
            RESUME <br/>TEMPLATES
          </h1>
          {/* Subtitle Below the Heading (Thin Text) */}
        <p className="mt-4 max-w-2xl text-lg text-gray-600 font-light">
          Choose a <span className="font-normal text-black">professionally designed resume template<br/></span> and create your 
          standout resume in minutes. <span className="font-normal text-black">Easy to edit,<br/> fully customizable,</span> and 
          optimized for success.
        </p>
        </div>
        {/* Animation keyframes */}
        <style jsx>{`
          @keyframes gradientAnimation {
            0% {
              background-position: 0% 50%;
            }
           100% {
              background-position: 200% 50%;
            }
          }
          .animate-gradient {
          background-image: linear-gradient(to right, black, blue, purple, black);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: gradientAnimation 6s linear infinite;
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
}