"use client";

import Header from "../../_components/Header";
import Footer from "../../_components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BasicPlan() {
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
          Basic Plan
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-lg leading-relaxed"
        >
          Get started with essential resume-building tools for just $10/month.
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
          <p className="mt-2 text-gray-500 text-center text-lg">$10/month</p>
          <ul className="mt-6 space-y-4 text-gray-600">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> AI-Powered Resume Builder
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> 3 Professional Resume Templates
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> PDF Export Functionality
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Resume Score & Feedback
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span> Basic Customer Support
            </li>
          </ul>
          <div className="mt-8 text-center">
            <Link href="/subscribe/basic">
              <button className="px-6 py-3 w-full md:w-auto bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-transform transform hover:scale-105">
                Subscribe to Basic Plan
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Upgrade Teaser */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Need more features? Check out our{" "}
            <Link href="/pricing/premium" className="text-blue-600 font-semibold hover:underline">
              Premium Plan
            </Link>
            .
          </p>
        </div>
      </main>

      {/* Call to Action */}
      <section className="bg-gray-900 text-white text-center py-16">
        <h2 className="text-3xl font-bold">Ready to Build Your Resume?</h2>
        <p className="mt-4 text-lg">Start with the Basic Plan today!</p>
        <Link href="/subscribe/basic">
          <button className="mt-6 px-10 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-md hover:bg-gray-200 transition">
            Get Started Now
          </button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}