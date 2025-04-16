"use client";

import { useState } from "react";
import Header from "src/app/_components/Header";
import Footer from "src/app/_components/Footer";

export default function ResumePage() {
  const [resumeData, setResumeData] = useState({
    name: "John Doe",
    summary: "Aspiring software developer passionate about building impactful tools.",
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Editor Section */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-semibold">Edit Resume</h2>

          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={resumeData.name}
              className="w-full border p-2 rounded mt-1"
              onChange={(e) =>
                setResumeData({ ...resumeData, name: e.target.value })
              }
            />
          </div>

          {/* Summary Input */}
          <div>
            <label className="block text-sm font-medium">Professional Summary</label>
            <textarea
              value={resumeData.summary}
              className="w-full border p-2 rounded mt-1"
              rows={5}
              onChange={(e) =>
                setResumeData({ ...resumeData, summary: e.target.value })
              }
            />
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white p-6 rounded-xl shadow h-fit">
          <h1 className="text-3xl font-bold">{resumeData.name}</h1>
          <h2 className="text-lg text-gray-600 mt-2 mb-4">Professional Summary</h2>
          <p className="text-gray-800 whitespace-pre-line">{resumeData.summary}</p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
