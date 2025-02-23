"use client";

import Header from "../_components/Header";
import Footer from "../_components/Footer";
import Link from "next/link";
import Image from "next/image";
import FAQ from "./faq";


export default function Pricing() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header /> {/* Header at the top */}

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white text-center py-24 px-8">
        <h1 className="text-5xl font-extrabold">Flexible Pricing Plans</h1>
        <p className="mt-4 text-lg opacity-90 leading-relaxed">
          Choose a plan that fits your career goals. Upgrade anytime.
        </p>
      </section>

      {/* Pricing Plans */}
      <main className="flex-grow flex flex-col items-center justify-center py-20 px-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
          {/* Basic Plan */}
          <div className="p-8 bg-white shadow-lg rounded-lg text-center border border-gray-300
                          transition-transform transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-3xl font-semibold">Basic Plan</h2>
            <p className="mt-2 text-gray-500 text-lg">$10/month</p>
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

          {/* Premium Plan  */}
          <div className="p-8 bg-white shadow-lg rounded-lg text-center border-2 border-blue-500
                          transform scale-100 transition-transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-3xl font-semibold text-blue-600">Premium Plan</h2>
            <p className="mt-2 text-gray-500 text-lg">$20/month</p>
            <ul className="mt-6 space-y-4 text-gray-600 text-left">
              <li>✅ All Features from Basic</li>
              <li>✅ 10 Premium Templates</li>
              <li>✅ AI-Powered Customization</li>
              <li>✅ Priority Support</li>
              <li>✅ Cover Letter Generator</li>
              <li>✅ Resume Analytics (Track Views)</li>
              <li>✅ LinkedIn Profile Optimization Tips</li>
            </ul>
            <Link href="/subscribe/premium">
              <button className="mt-8 px-6 py-3 w-full bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-transform transform hover:scale-105">
                Get Premium
              </button>
            </Link>
          </div>
        </div>
      </main>


      {/* Features Comparison Table */}
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



{/* Trusted by Universities & Colleges */}
<section className="bg-gray-100 py-12">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-center text-gray-800 text-lg font-semibold mb-6">
      Trusted by Universities & Colleges Across Ontario
    </h2>

    {/* Scrolling animation */}
    <div className="overflow-hidden py-4">
      <div className="flex space-x-12 animate-marquee">
        <div className="flex justify-center gap-8 flex-wrap">
          {[
            { src: "/brock.png", alt: "Brock University" },
            { src: "/algonquin.png", alt: "Algonquin College" },
            { src: "/sheridan.png", alt: "Sheridan College" },
            { src: "/durham.png", alt: "Durham College" },
            { src: "/conestoga.png", alt: "Conestoga College" },
          ].map((logo, index) => (
            <div
              key={index}
              className="transition-transform transform hover:scale-110 hover:shadow-md"
            >
              <Image src={logo.src} alt={logo.alt} width={100} height={40} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>


{/* Trusted by Universities & Colleges */}
      <FAQ /> {/* Using FAQ component here */}

      {/* Call to Action */}
      <section className="bg-blue-600 text-white text-center py-16 mt-12">
        <h2 className="text-3xl font-bold">Start Building Your Resume Today</h2>
        <p className="mt-4 text-lg">Join thousands of professionals using ResumeX.</p>
        <Link href="/register">
          <button className="mt-6 px-10 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-md hover:bg-gray-200 transition">
            Sign Up Now
          </button>
        </Link>
      </section>

      <Footer /> {/* Footer at the bottom */}
    </div>
  );
}
