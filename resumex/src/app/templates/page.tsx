"use client";

import Image from "next/image";
import Header from "../_components/Header"; 
import Footer from "../_components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";

// templates for animation on top right
const resumes = [
  "/template1.webp",
  "/template2.avif",
  "/template3.jpeg",
  "/template4.png",
  "/template5.avif",
];

export default function TemplatesPlaceholder() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % resumes.length);
    }, 4000); // Change resume every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <Header />

        {/* Left-aligned Resume Templates text with Animation */}
        <div className="mt-20 ml-16 fade-zoom">
          <h1 className="text-6xl font-extrabold tracking-wide text-transparent bg-clip-text gradient-text leading-tight">
            RESUME <br />TEMPLATES
          </h1>

          {/* Subtitle Below the Heading (Thin Text) */}
          <p className="mt-4 max-w-2xl text-lg text-gray-600 font-light">
            Choose a <span className="font-normal text-black">professionally designed resume template</span><br />
            and create your standout resume in minutes. <span className="font-normal text-black">Easy to edit,</span><br />
            <span className="font-normal text-black">fully customizable,</span> and optimized for success.
          </p>
        </div>

        {/* Zoom & Fade-In Resume Templates in the Top-Right */}
        <div className="absolute top-28 right-32 w-48 h-64 overflow-hidden">

          {resumes.map((resume, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-transform duration-700 ease-in-out ${
                index === currentIndex ? "fade-zoom-in" : "fade-out"
              }`}
            >
              <Image
                src={resume}
                alt={`Resume Template ${index + 1}`}
                width={200}
                height={250}
                className="rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>

        {/* Animation keyframes */}
        <style jsx>{`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }

          .gradient-text {
            background-image: linear-gradient(to right, black, blue, purple, black);
            background-size: 200% auto;
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            animation: gradientAnimation 6s linear infinite;
          }

          @keyframes fadeZoom {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }

          .fade-zoom {
            animation: fadeZoom 1.5s ease-in-out forwards;
          }

          @keyframes fadeZoomIn {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }

          @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }

          .fade-zoom-in {
            animation: fadeZoomIn 1.5s ease-in-out forwards;
            z-index: 2;
          }

          .fade-out {
            animation: fadeOut 1.5s ease-in-out forwards;
            z-index: 1;
          }
        `}</style>
      </div>

      <Footer />
    </>
  );
}
