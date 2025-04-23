"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for subscribing to ResumeX Pro.
      </p>
      <Link href="/pro-resume">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
          Build My Resume Now
        </button>
      </Link>
    </div>
  );
}
