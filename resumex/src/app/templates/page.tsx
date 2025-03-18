"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../_components/Header";
import Footer from "../_components/Footer";

// Floating templates on the right
const resumes: string[] = [
  "/template1.webp",
  "/template2.avif",
  "/template3.jpeg",
  "/template4.png",
  "/template5.avif",
];

// Resume templates list
const templates = [
  {
    id: "template1",
    image: "/templates1.svg",
    name: "Modern Clean Resume",
    description: "A simple, modern, and easy-to-read resume template for professionals.",
  },
  {
    id: "template2",
    image: "/templates2.png",
    name: "Creative Professional Resume",
    description: "A stylish template with a unique design, perfect for creatives.",
  },
  {
    id: "template3",
    image: "/templates3.webp",
    name: "Executive Resume",
    description: "A bold, professional resume template ideal for executives.",
  },
];

export default function TemplatesPage(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % resumes.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <Header />

        {/* Page Heading */}
        <div className="mt-20 ml-8 md:ml-16 fade-zoom">
          <h1 className="text-6xl font-extrabold tracking-wide text-transparent bg-clip-text gradient-text leading-tight">
            RESUME <br /> TEMPLATES
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600 font-light">
            Choose a{" "}
            <span className="font-normal text-black">
              professionally designed resume template
            </span>
            <br />
            and create your standout resume in minutes.{" "}
            <span className="font-normal text-black">Easy to edit,</span>
            <br />
            <span className="font-normal text-black">fully customizable,</span> and optimized for success.
          </p>
        </div>

        {/* Resume Templates */}
        <div className="flex flex-wrap justify-center gap-12 px-6 md:px-16 mt-10 mb-20">
          {templates.map((template) => (
            <ResumeCard key={template.id} {...template} />
          ))}
        </div>

        <Footer />
      </div>
    </>
  );
}

// Template Card Component
function ResumeCard({ image, name, description, id }: { image: string; name: string; description: string; id: string }) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className="relative w-[400px] h-[650px] flex flex-col items-center justify-start transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Transparent Background Box */}
      <div className={`absolute inset-0 w-full h-full border border-gray-200 rounded-xl shadow-lg backdrop-blur-lg transition duration-300 ${
        isHovered ? "bg-gradient-to-r from-blue-400/40 to-purple-500/40 scale-105 shadow-2xl" : "bg-white/20"
      }`} />

      {/* Resume Image */}
      <div className="relative z-10 w-[340px] h-[450px] flex justify-center items-center mt-6">
        <Image src={image} alt={name} width={340} height={450} className={`rounded-lg shadow-lg transition duration-300 ${isHovered ? "brightness-110 scale-105" : ""}`} />
        {/* Button redirects to free-resume with the selected template */}
        <Link href={`/free-resume?template=${id}`} passHref>
          <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${isHovered ? "opacity-100 scale-110" : "opacity-0"}`}>
            <button className="px-6 py-2 bg-green-500 text-white text-sm font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-300">
              Customize This Template
            </button>
          </div>
        </Link>
      </div>

      {/* Description */}
      <div className="relative z-10 text-center p-4 w-[340px] mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-1 text-sm">{description}</p>
      </div>
    </div>
  );
}
