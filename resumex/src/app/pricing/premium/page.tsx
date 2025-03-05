"use client";

import Header from "../../_components/Header";
import Footer from "../../_components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PremiumPlan() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white text-center py-24 px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold"
        >
          Premium Plan
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-lg leading-relaxed"
        >
          Unlock all premium resume features for $20/month.
        </motion.p>
      </section>

      {/* Plan Details */}
      <main className="flex-grow py-20 px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-gray-300"
        >
          <h2 className="text-3xl font-semibold text-gray-800 text-center">What’s Included</h2>
          <p className="mt-2 text-gray-500 text-center text-lg">$20/month</p>
          <ul className="mt-6 space-y-4 text-gray-600">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> All Features from Basic Plan
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> 10 Premium Resume Templates
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> AI-Powered Customization
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Priority Customer Support
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Cover Letter Generator
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Resume Analytics & Tracking
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> LinkedIn Profile Optimization
            </li>
          </ul>
          <div className="mt-8 text-center">
            <Link href="/subscribe/premium">
              <button className="px-6 py-3 w-full md:w-auto bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-transform transform hover:scale-105">
                Subscribe to Premium Plan
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Upgrade Teaser */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Looking for something simpler? Try our{" "}
            <Link href="/pricing/basic" className="text-blue-600 font-semibold hover:underline">
              Basic Plan
            </Link>
            .
          </p>
        </div>
      </main>

      {/* Call to Action */}
      <section className="bg-gray-900 text-white text-center py-16">
        <h2 className="text-3xl font-bold">Get the Best Resume Tools</h2>
        <p className="mt-4 text-lg">Upgrade to Premium today!</p>
        <Link href="/subscribe/premium">
          <button className="mt-6 px-10 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-md hover:bg-gray-200 transition">
            Get Premium Now
          </button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
