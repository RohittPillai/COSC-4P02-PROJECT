"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle, FileText, Star, Download } from "lucide-react";
import axios from "axios";

const ProVersion = () => {
  const [loading, setLoading] = useState(false);

  const handleGenerateResume = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/generate-resume");
      const pdfUrl = response.data.url;
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Error generating resume:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 px-6 bg-gray-100 text-center">
      <h2 className="text-5xl font-bold text-gray-900">
        Unlock <span className="text-blue-600">Pro Features</span>
      </h2>
      <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
        Upgrade to ResumeX Pro for exclusive templates, AI-powered resume suggestions,
        ATS optimization, and instant PDF downloads.
      </p>

      {/* Pro Features List */}
      <div className="mt-12 max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-left">
        <div className="p-8 bg-white shadow-lg rounded-2xl border border-gray-200">
          <div className="flex justify-center">
            <Star className="text-blue-500 w-12 h-12" />
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">Premium Templates</h3>
          <p className="mt-3 text-gray-600">Exclusive, professionally designed resume templates.</p>
        </div>

        <div className="p-8 bg-white shadow-lg rounded-2xl border border-gray-200">
          <div className="flex justify-center">
            <CheckCircle className="text-blue-500 w-12 h-12" />
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">AI Resume Optimization</h3>
          <p className="mt-3 text-gray-600">AI-powered content improvements for better job matches.</p>
        </div>

        <div className="p-8 bg-white shadow-lg rounded-2xl border border-gray-200">
          <div className="flex justify-center">
            <FileText className="text-blue-500 w-12 h-12" />
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">ATS-Friendly Resumes</h3>
          <p className="mt-3 text-gray-600">Ensure your resume gets past applicant tracking systems.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 space-y-4">
        <button
          onClick={handleGenerateResume}
          className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold text-lg rounded-full shadow-lg transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate AI Resume"}
          <Download className="w-5 h-5" />
        </button>
        <Link
          href="/checkout"
          className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-full shadow-lg transition duration-300 transform hover:scale-105"
        >
          Upgrade to Pro
        </Link>
      </div>
    </div>
  );
};

export default ProVersion;