"use client";

import Header from "../_components/Header";
import Footer from "../_components/Footer";
import Link from "next/link";

export default function Pricing() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header /> {/* Header at the top */}

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold">Flexible Pricing Plans</h1>
        <p className="mt-4 text-lg opacity-80">
          Choose a plan that fits your career goals. Upgrade anytime.
        </p>
      </section>

      {/* Pricing Plans */}
      <main className="flex-grow flex flex-col items-center justify-center py-16 px-6">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
          {/* Basic Plan */}
          <div className="p-8 bg-white shadow-lg rounded-lg text-center border border-gray-300 transition hover:shadow-xl">
            <h2 className="text-3xl font-semibold">Basic Plan</h2>
            <p className="mt-2 text-gray-500 text-lg">$10/month</p>
            <ul className="mt-6 space-y-4 text-gray-600 text-left">
              <li>✅ AI-Powered Resume</li>
              <li>✅ 3 Resume Templates</li>
              <li>✅ PDF Export</li>
              <li>✅ Resume Score & Feedback</li>
              <li>✅ Basic Customer Support</li>
            </ul>
            <Link href="/subscribe/basic">
              <button className="mt-8 px-6 py-3 w-full bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition duration-300 ease-in-out shadow-md hover:shadow-lg">
                Get Started
              </button>
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="p-8 bg-white shadow-lg rounded-lg text-center border-2 border-blue-500 transform scale-105 transition hover:shadow-xl">
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
              <button className="mt-8 px-6 py-3 w-full bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition duration-300 ease-in-out shadow-md hover:shadow-lg">
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
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-300 text-gray-900 font-bold text-center">
              <tr>
                <th className="p-4 border">Feature</th>
                <th className="p-4 border">Basic</th>
                <th className="p-4 border">Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border">AI-Powered Resume</td>
                <td className="p-4 border">✅</td>
                <td className="p-4 border">✅</td>
              </tr>
              <tr>
                <td className="p-4 border">Resume Templates</td>
                <td className="p-4 border">3</td>
                <td className="p-4 border">10</td>
              </tr>
              <tr>
                <td className="p-4 border">PDF Export</td>
                <td className="p-4 border">✅</td>
                <td className="p-4 border">✅</td>
              </tr>
              <tr>
                <td className="p-4 border">Resume Score & Feedback</td>
                <td className="p-4 border">✅</td>
                <td className="p-4 border">✅</td>
              </tr>
              <tr>
                <td className="p-4 border">Cover Letter Generator</td>
                <td className="p-4 border">❌</td>
                <td className="p-4 border">✅</td>
              </tr>
              <tr>
                <td className="p-4 border">Resume Analytics</td>
                <td className="p-4 border">❌</td>
                <td className="p-4 border">✅</td>
              </tr>
              <tr>
                <td className="p-4 border">Priority Support</td>
                <td className="p-4 border">❌</td>
                <td className="p-4 border">✅</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="max-w-5xl mx-auto bg-gray-100 p-8 rounded-lg shadow-lg mt-12">
        <h2 className="text-3xl font-bold text-center text-gray-800">Frequently Asked Questions</h2>
        <div className="mt-6">
          <div className="mb-4 p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold">Can I cancel anytime?</h3>
            <p className="text-gray-600">Yes! You can cancel your subscription at any time from your account settings.</p>
          </div>
          <div className="mb-4 p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold">Do I get a refund if I cancel?</h3>
            <p className="text-gray-600">We do not offer refunds, but your premium benefits will last until your billing cycle ends.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white text-center py-16 mt-12">
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
