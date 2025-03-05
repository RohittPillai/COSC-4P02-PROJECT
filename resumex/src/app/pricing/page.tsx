"use client";

import { useState } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import Link from "next/link";
import Image from "next/image";
import FAQ from "./faq";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false); // Toggle monthly/yearly pricing

  const plans = {
    basic: { monthly: 10, yearly: 100 },
    premium: { monthly: 20, yearly: 200 },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white text-center py-24 px-8">
        <h1 className="text-5xl font-extrabold">Flexible Pricing Plans</h1>
        <p className="mt-4 text-lg opacity-90 leading-relaxed">
          Choose a plan that fits your career goals. Upgrade anytime.
        </p>
      </section>

      {/* Pricing Toggle */}
      <div className="text-center py-6">
        <label className="inline-flex items-center cursor-pointer">
          <span className="mr-3 text-gray-700 font-semibold">Monthly</span>
          <input
            type="checkbox"
            className="hidden"
            checked={isYearly}
            onChange={() => setIsYearly(!isYearly)}
          />
          <div className="w-12 h-6 bg-gray-300 rounded-full p-1 duration-300 ease-in-out">
            <div
              className={bg-blue-600 w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                isYearly ? "translate-x-6" : ""
              }}
            ></div>
          </div>
          <span className="ml-3 text-gray-700 font-semibold">Yearly (Save 15%)</span>
        </label>
      </div>

      {/* Pricing Plans */}
      <main className="flex-grow flex flex-col items-center justify-center py-20 px-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
          {/* Basic Plan */}
          <div className="p-8 bg-white shadow-lg rounded-lg text-center border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-3xl font-semibold">Basic Plan</h2>
            <p className="mt-2 text-gray-500 text-lg">
              ${isYearly ? plans.basic.yearly : plans.basic.monthly}/{isYearly ? "year" : "month"}
            </p>
            <ul className="mt-6 space-y-4 text-gray-600 text-left">
              <li>✅ AI-Powered Resume</li>
              <li>✅ 3 Resume Templates</li>
              <li>✅ PDF Export</li>
              <li>✅ Resume Score & Feedback</li>
              <li>✅ Basic Customer Support</li>
            </ul>
            <Link href="/pricing/basic">
              <button className="mt-8 px-6 py-3 w-full bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-transform transform hover:scale-105">
                Get Started
              </button>
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="p-8 bg-white shadow-lg rounded-lg text-center border-2 border-blue-500 transform scale-100 transition-transform hover:scale-105 hover:shadow-xl relative">
            <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-bl-lg">
              Most Popular
            </span>
            <h2 className="text-3xl font-semibold text-blue-600">Premium Plan</h2>
            <p className="mt-2 text-gray-500 text-lg">
              ${isYearly ? plans.premium.yearly : plans.premium.monthly}/{isYearly ? "year" : "month"}
            </p>
            <ul className="mt-6 space-y-4 text-gray-600 text-left">
              <li>✅ All Features from Basic</li>
              <li>✅ 10 Premium Templates</li>
              <li>✅ AI-Powered Customization</li>
              <li>✅ Priority Support</li>
              <li>✅ Cover Letter Generator</li>
              <li>✅ Resume Analytics</li>
              <li>✅ LinkedIn Optimization</li>
            </ul>
            <Link href="/pricing/premium">
              <button className="mt-8 px-6 py-3 w-full bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-transform transform hover:scale-105">
                Get Premium
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Feature Comparison Table */}
      <section className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-12">
        <h2 className="text-3xl font-bold text-center text-gray-800">Feature Comparison</h2>
        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse border border-gray-400 rounded-lg overflow-hidden">
            {/* Table Head */}
            <thead className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-900 font-bold text-center">
              <tr>
                <th className="p-4 border text-left">Feature</th>
                <th className="p-4 border bg-blue-100 text-blue-700">Basic</th>
                <th className="p-4 border bg-blue-600 text-white">Premium</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-center divide-y divide-gray-200">
              <tr>
                <td className="p-4 border text-left">AI-Powered Resume</td>
                <td className="p-4 border text-green-500 font-semibold">✔</td>
                <td className="p-4 border text-green-500 font-semibold">✔</td>
              </tr>
              <tr>
                <td className="p-4 border text-left">Resume Templates</td>
                <td className="p-4 border font-semibold">3</td>
                <td className="p-4 border font-semibold">10</td>
              </tr>
              <tr>
                <td className="p-4 border text-left">PDF Export</td>
                <td className="p-4 border text-green-500 font-semibold">✔</td>
                <td className="p-4 border text-green-500 font-semibold">✔</td>
              </tr>
              <tr>
                <td className="p-4 border text-left">Resume Score & Feedback</td>
                <td className="p-4 border text-green-500 font-semibold">✔</td>
                <td className="p-4 border text-green-500 font-semibold">✔</td>
              </tr>
              <tr>
                <td className="p-4 border text-left">Cover Letter Generator</td>
                <td className="p-4 border text-gray-400 font-semibold">-</td>
                <td className="p-4 border text-green-500 font-semibold">✔</td>
              </tr>
              <tr>
                <td className="p-4 border text-left">Resume Analytics</td>
                <td className="p-4 border text-gray-400 font-semibold">-</td>
                <td className="p-4 border text-green-500 font-semibold">✔</td>
              </tr>
              <tr>
                <td className="p-4 border text-left">Priority Support</td>
                <td className="p-4 border text-gray-400 font-semibold">-</td>
                <td className="p-4 border text-green-500 font-semibold">✔</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Trusted by Universities */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-gray-800 text-lg font-semibold mb-6">
            Trusted by Universities & Colleges Across Ontario
          </h2>
          <div className="overflow-hidden py-4">
            <div className="flex space-x-12 animate-marquee">
              {[
                { src: "/brock.png", alt: "Brock University" },
                { src: "/algonquin.png", alt: "Algonquin College" },
                { src: "/sheridan.png", alt: "Sheridan College" },
                { src: "/durham.png", alt: "Durham College" },
                { src: "/conestoga.png", alt: "Conestoga College" },
              ].map((logo, index) => (
                <Image
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  width={100}
                  height={40}
                  loading="lazy" // Lazy-load images
                  className="transition-transform transform hover:scale-110 hover:shadow-md"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQ />
      <section className="bg-gray-900 text-white text-center py-16 mt-12">
        <h2 className="text-3xl font-bold">Start Building Your Resume Today</h2>
        <p className="mt-4 text-lg">Join thousands of professionals using ResumeX.</p>
        <Link href="/register">
          <button className="mt-6 px-10 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-md hover:bg-gray-200 transition">
            Sign Up Now
          </button>
        </Link>
      </section>
      <Footer />
    </div>
  );
}