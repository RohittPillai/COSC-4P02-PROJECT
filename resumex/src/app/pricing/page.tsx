"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import FAQ from "./faq";
import Image from "next/image";

// Stripe checkout function
async function handleCheckout(priceId: string, setLoading: (value: boolean) => void) {
  try {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Checkout failed: ${res.status} - ${errorMessage}`);
    }

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error("Stripe did not return a URL");
    }
  } catch (error: any) {
    console.error("Checkout Error:", error);
    alert(`Payment failed: ${error.message}`);
  } finally {
    setLoading(false);
  }
}

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPro, setLoadingPro] = useState(false);

  const proPriceId = isYearly
    ? "price_1R58K6P4fL01NYku7gnFZj1I"
    : "price_1R4AIbP4fL01NYku1dphhh55";


  const proMonthly = 19.99;
  const discountRate = 0.15;
  const proYearly = 190.99;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      {/* Hero Section */}
      <section className="bg-gray-900 text-white text-center py-20 px-6">
     <motion.h1
       initial={{ opacity: 0, y: -20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8 }}
       className="text-4xl md:text-5xl font-extrabold leading-snug"
     >
      <span className="block">Create a powerful resume</span>
      <span className="block mt-2">trusted by top recruiters</span>
    </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-lg opacity-90"
        >
          Choose a plan that fits your career goals. Upgrade anytime.
        </motion.p>
        <Link href="/templates">
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            Build My Resume Now
          </button>
        </Link>
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
          <div className="relative w-14 h-7 bg-gray-300 rounded-full p-1 duration-300 ease-in-out">
            <div
              className={`absolute top-1 left-1 w-5 h-5 bg-blue-600 rounded-full shadow-md transform transition-transform ${
                isYearly ? "translate-x-7" : ""
              }`}
            ></div>
          </div>
          <span className="ml-3 text-gray-700 font-semibold">Yearly (Save 15%)</span>
        </label>
      </div>

      {/* Pricing Plans */}
      <main className="flex-grow py-10 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="p-6 bg-white shadow-md rounded-lg border border-gray-200 text-center scale-[0.95]"
         >

            <h3 className="text-sm font-semibold bg-gray-200 text-gray-700 px-3 py-1 rounded-full inline-block">
              FREE PLAN
            </h3>
            <h2 className="text-5xl font-bold mt-2">$0</h2>
            <p className="text-gray-500">Valid for 7 days</p>
            <ul className="mt-6 space-y-3 text-gray-600 text-left">
              {[
                "Two resumes",
                "Few resume templates",
                "Basic resume sections",
                "resumeX branding",
                "Up to 2 years of experience",
                "Access to few design tools",
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Image src="/check.png" alt="tick" width={20} height={20} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <Link href="/templates">
              <button className="mt-6 px-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition">
                Build My Resume
              </button>
            </Link>
          </motion.div>

          {/* Pro Plan */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="p-10 bg-white shadow-xl rounded-xl border border-gray-200 text-center scale-[1.05] z-10"
         >

            <span className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-lg">
              SAVE 15%
            </span>
            <h3 className="text-sm font-semibold bg-blue-200 text-blue-700 px-3 py-1 rounded-full inline-block">
              PRO PLAN
            </h3>
         <h2 className="text-5xl font-bold mt-2 text-blue-600">
           $
           {Math.floor(isYearly ? proYearly : proMonthly)}
           <sup className="text-xl align-top">
             {(isYearly ? proYearly : proMonthly).toFixed(2).split('.')[1]}
           </sup>
           /{isYearly ? "yr" : "mo"}
         </h2>


            <p className="text-gray-500">
              {isYearly
                ? `$${proYearly} billed yearly`
                : `$${(proMonthly * 3).toFixed(2)} billed every 3 months`}
            </p>
            <ul className="mt-6 space-y-3 text-gray-600 text-left">
              {[
                "150 resumes",
                "All resume templates",
                "Real-time content suggestions",
                "ATS Check (Applicant Tracking System)",
                "Pro resume sections",
                "No branding",
                "Unlimited section items",
                "Thousands of design options",
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Image src="/check.png" alt="tick" width={20} height={20} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(proPriceId, setLoadingPro)}
              className={`mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition ${
                loadingPro ? "cursor-not-allowed opacity-75" : ""
              }`}
              disabled={loadingPro}
            >
              {loadingPro ? "Processing..." : "Subscribe to Pro Plan"}
            </button>
          </motion.div>
        </div>
      </main>

      {/* Payment Methods */}
      <div className="text-center py-10">
        <p className="text-gray-600 font-semibold">We accept:</p>
        <div className="mt-4 flex justify-center space-x-4">
          <Image src="/mastercard.png" alt="Mastercard" width={50} height={30} />
          <Image src="/visa.png" alt="Visa" width={50} height={30} />
          <Image src="/paypal.png" alt="PayPal" width={50} height={30} />
          <Image src="/aMEX.png" alt="Amex" width={50} height={30} />
        </div>
      </div>

      {/* Trusted by Universities Section */}
      <section className="py-20 px-6 bg-gray-900 text-white text-center">
        <h2 className="text-4xl font-bold">Trusted by Universities and Colleges</h2>
        <p className="mt-4 text-lg text-gray-300">
          Our resume builder is used by students and professionals from top institutions.
        </p>
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
          <img src="/brock.png" className="h-16" />
          <img src="/Waterloo.png" className="h-16" />
          <img src="/conestoga.png" className="h-16" />
          <img src="/durham.png" className="h-16" />
        </div>
      </section>

      <FAQ />
      <Footer />
    </div>
  );
}
