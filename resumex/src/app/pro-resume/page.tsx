"use client";

import React, { useState } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";


const ProResume = () => {
  const [resumeContent, setResumeContent] = useState({
    position: "Full Stack Developer",
    company: "Plug Vancouver",
    date: "August 2022 - Present",
    achievements: [
      "Architected and deployed a high-performance full-stack website using Next.js, React, and Tailwind CSS, achieving 100% Core Web Vitals scores and reducing load times by 40% through server-side rendering and Vercel edge optimization.",
      "Engineered a scalable content management system (CMS) with PostgreSQL database (Supabase), implementing role-based access control and custom React editor interface, resulting in 70% reduction in content update time for non-technical staff.",
      "Developed and deployed an innovative AI content generation system using OpenAI’s GPT-4 API, implementing custom prompt engineering that increased content production by 300% while maintaining 95% brand voice accuracy.",
    ],
  });

  const [aiEnhancements, setAiEnhancements] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulated AI Resume Enhancement (Replace with API Integration)
  const enhanceWithAI = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setAiEnhancements("✨ AI-Optimized: Improved clarity, structured bullet points, and professional tone.");
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header /> {/* Top Navigation */}

      <main className="flex-grow flex">
        {/* Left Panel - Resume Editor */}
        <div className="w-1/2 p-6 bg-white shadow-md border-r">
          <h2 className="text-2xl font-bold text-gray-800">Resume Editor</h2>

          {/* Position Input */}
          <div className="mt-4">
            <label className="text-sm text-gray-600">Position</label>
            <input
              type="text"
              value={resumeContent.position}
              onChange={(e) => setResumeContent({ ...resumeContent, position: e.target.value })}
              className="w-full border rounded-lg p-2 mt-1 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Company Input */}
          <div className="mt-4">
            <label className="text-sm text-gray-600">Company</label>
            <input
              type="text"
              value={resumeContent.company}
              onChange={(e) => setResumeContent({ ...resumeContent, company: e.target.value })}
              className="w-full border rounded-lg p-2 mt-1 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Date Input */}
          <div className="mt-4">
            <label className="text-sm text-gray-600">Date</label>
            <input
              type="text"
              value={resumeContent.date}
              onChange={(e) => setResumeContent({ ...resumeContent, date: e.target.value })}
              className="w-full border rounded-lg p-2 mt-1 focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Achievements Section */}
          <div className="mt-4">
            <label className="text-sm text-gray-600">Key Achievements</label>
            {resumeContent.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <textarea
                  className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                  value={achievement}
                  onChange={(e) => {
                    const newAchievements = [...resumeContent.achievements];
                    newAchievements[index] = e.target.value;
                    setResumeContent({ ...resumeContent, achievements: newAchievements });
                  }}
                ></textarea>
                <button
                  onClick={enhanceWithAI}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                >
                  Improve with AI
                </button>
              </div>
            ))}
          </div>

          {/* Save & Download Buttons */}
          <div className="mt-6 flex space-x-4">
            <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
              Save
            </button>
            <button className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700">
              Download
            </button>
          </div>
        </div>

        {/* Right Panel - Resume Preview */}
        <div className="w-1/2 p-6 bg-white shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">Live Resume Preview</h2>
          <div className="mt-4 border p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800">{resumeContent.position}</h3>
            <p className="text-gray-600">{resumeContent.company}</p>
            <p className="text-gray-500 text-sm">{resumeContent.date}</p>

            <h4 className="mt-4 font-semibold text-gray-800">Key Responsibilities & Achievements</h4>
            <ul className="mt-2 space-y-2 text-gray-600">
              {resumeContent.achievements.map((achievement, index) => (
                <li key={index} className="list-disc ml-6">{achievement}</li>
              ))}
            </ul>

            {isProcessing ? (
              <p className="mt-4 text-blue-500">AI Enhancing Resume...</p>
            ) : (
              aiEnhancements && <p className="mt-4 text-green-600">{aiEnhancements}</p>
            )}
          </div>
        </div>
      </main>

      <Footer /> {/* Bottom Navigation */}
    </div>
  );
};

export default ProResume;
