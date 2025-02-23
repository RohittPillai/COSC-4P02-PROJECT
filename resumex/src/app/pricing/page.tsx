"use client";

import Header from "../_components/Header";
import Footer from "../_components/Footer";
import Link from "next/link";

export default function Pricing() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header /> {/* Header at the top */}

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center py-16 px-6">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center">Our Pricing</h1>
        <p className="mt-2 text-gray-600 text-lg text-center">
          Choose the perfect plan for your needs.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-8 max-w-4xl">
          {/* Basic Plan */}
          <div className="p-6 bg-white shadow-lg rounded-lg text-center border border-gray-300">
            <h2 className="text-2xl font-semibold">Basic Plan</h2>
            <p className="mt-2 text-gray-500">$10/month</p>
            <ul className="mt-4 space-y-2 text-gray-600 text-left">
              <li>✔ AI-Powered Resume</li>
              <li>✔ 3 Resume Templates</li>
              <li>✔ PDF Export</li>
              <li>✔ Resume Score & Feedback</li>
              <li>✔ Basic Customer Support</li>
            </ul>
            <Link href="/subscribe/basic">
              <button className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                Subscribe
              </button>
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="p-6 bg-white shadow-lg rounded-lg text-center border border-gray-300">
            <h2 className="text-2xl font-semibold">Premium Plan</h2>
            <p className="mt-2 text-gray-500">$20/month</p>
            <ul className="mt-4 space-y-2 text-gray-600 text-left">
              <li>✔ All Features from Basic</li>
              <li>✔ 10 Premium Templates</li>
              <li>✔ AI-Powered Customization</li>
              <li>✔ Priority Support</li>
              <li>✔ Cover Letter Generator</li>
              <li>✔ Resume Analytics (Track Views)</li>
              <li>✔ LinkedIn Profile Optimization Tips</li>
            </ul>
            <Link href="/subscribe/premium">
              <button className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                Subscribe
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white text-center py-16">
        <h2 className="text-3xl font-bold">Start Building Your Resume Today</h2>
        <p className="mt-4 text-lg">Join thousands of professionals using ResumeX.</p>
        <Link href="/register">
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 transition">
            Sign Up Now
          </button>
        </Link>
      </section>

      <Footer /> {/* Footer at the bottom */}
    </div>
  );
}
