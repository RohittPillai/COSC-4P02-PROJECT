"use client";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose, AiOutlineSync, AiOutlineCheck, AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import dynamic from "next/dynamic";

const Template1Page = dynamic(() => import("../templates/template1/page"));
const Template2Page = dynamic(() => import("../templates/template2/page"));
const Template3Page = dynamic(() => import("../templates/template3/page"));

const templates = {
  template1: {
    name: "Modern Clean Resume",
    component: Template1Page,
  },
  template2: {
    name: "Creative Professional Resume",
    component: Template2Page,
  },
  template3: {
    name: "Executive Resume",
    component: Template3Page,
  },
};

export default function FreeResume() {
  const searchParams = useSearchParams();
  const template = searchParams.get("template") || "template1";
  const selectedTemplate = templates[template] || templates["template1"];

  const [resumeContent, setResumeContent] = useState("Start typing your resume...");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDesignExpanded, setIsDesignExpanded] = useState(false);
  const [isDownloadExpanded, setIsDownloadExpanded] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedContent, setLastSavedContent] = useState("");
  const [isFooterMinimized, setIsFooterMinimized] = useState(true); // Default: Minimized footer


  const saveResume = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setLastSavedContent(JSON.stringify(resumeData));
      console.log("Resume saved:", resumeData);
      localStorage.setItem("resumeData", JSON.stringify(resumeData)); // Save to localStorage
    }, 1000);
  };


  useEffect(() => {
    const autoSaveInterval = setTimeout(() => {
      saveResume();
    }, 5000);

    return () => clearTimeout(autoSaveInterval);
  }, [resumeContent]);

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    doc.text(resumeContent, 10, 10);
    doc.save(`${template}-resume.pdf`);
  };

  const downloadAsWord = () => {
    const blob = new Blob([resumeContent], { type: "application/msword" });
    saveAs(blob, `${template}-resume.doc`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText("https://resumex.com/my-resume");
    alert("Resume link copied to clipboard!");
  };

  const resumeData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@gmail.com",
    phone: "111-222-3333",
    position: "Front-End Developer",
    description: "I am a front-end developer with 3+ years of experience writing HTML, CSS, and JS. I'm motivated, result-focused, and seeking a team-oriented company with growth opportunities.",
    experienceList: [
      {
        company: "KlowdBox",
        location: "San Francisco, CA",
        duration: "Jan 2011 - Feb 2015",
        position: "Front-End Developer",
        description: "Developed user-friendly interfaces, optimized front-end performance, and improved accessibility.",
      },
      {
        company: "Akount",
        location: "Santa Monica, CA",
        duration: "Jan 2015 - Present",
        position: "Senior Front-End Developer",
        description: "Led front-end team, implemented scalable UI solutions, and improved core web vitals for better SEO.",
      },
    ],
    education: [
      {
        school: "Sample Institute of Technology",
        location: "San Francisco, CA",
        year: "2011 - 2015",
        degree: "BSc in Computer Science",
      },
    ],
    projects: [
      {
        name: "DSP",
        description: "Developed a web application for real-time data visualization and analytics.",
        link: "https://example.com/dsp",
      },
      {
        name: "Portfolio Website",
        description: "Built a responsive personal portfolio using React and Tailwind CSS.",
        link: "https://example.com/portfolio",
      },
    ],
    skills: ["JavaScript", "React", "Node.js", "Next.js", "CSS", "HTML"],
    interests: ["Football", "Programming", "Gaming"],
  };

  return (
      <div className="flex flex-col min-h-screen w-full bg-gray-100">
        <Header />

        <main className={`flex flex-grow w-full h-screen relative pb-20 transition-all duration-300 
    ${isSidebarOpen ? "ml-[6%]" : "ml-[2%]"}`}>

          <aside className={`${isSidebarOpen ? "w-1/5" : "w-12"} 
          bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg 
          p-4 border-r border-gray-700 flex flex-col transition-all duration-300 
          h-[calc(100vh-4rem)] fixed top-[4rem] left-0 z-0`}>


          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="self-end text-gray-400 hover:text-gray-200 mb-4">
              {isSidebarOpen ? <AiOutlineLeft size={20} /> : <AiOutlineRight size={20} />}
            </button>
            {isSidebarOpen && (
                <>
                  <h2 className="text-lg font-semibold mb-4">Resume Options</h2>
                  <ul className="space-y-3">
                    <li><Link href="/login" className="text-blue-400 hover:underline">Sign In</Link></li>

                    <li><button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition">Custom Section</button></li>

                    <li>
                      <button onClick={() => setIsDesignExpanded(!isDesignExpanded)}
                              className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition">
                        Design & Font {isDesignExpanded ? "▲" : "▼"}
                      </button>
                      {isDesignExpanded && (
                          <>
                            <button className="w-full mt-2 py-2 bg-gray-800 text-gray-300 font-semibold rounded-lg border border-gray-600">Change Font</button>
                            <button className="w-full mt-2 py-2 bg-gray-800 text-gray-300 font-semibold rounded-lg border border-gray-600">Change Theme</button>
                          </>
                      )}
                    </li>

                    <li><button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition">Undo</button></li>
                    <li><button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition">Redo</button></li>

                    <li>
                      <button onClick={saveResume}
                              className="w-full flex justify-center items-center gap-2 py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition">
                        {isSaving ? <AiOutlineSync className="animate-spin" size={20} /> : <AiOutlineCheck size={20} />}
                        Save
                      </button>
                    </li>

                    <li>
                      <button onClick={() => setIsDownloadExpanded(!isDownloadExpanded)}
                              className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition">
                        Download {isDownloadExpanded ? "▲" : "▼"}
                      </button>
                      {isDownloadExpanded && (
                          <>
                            <button onClick={downloadAsPDF}
                                    className="w-full mt-2 py-2 bg-gray-700 text-white font-semibold rounded-lg border border-gray-500 hover:bg-gray-600 transition">
                              Download as PDF
                            </button>
                            <button onClick={downloadAsWord}
                                    className="w-full mt-2 py-2 bg-gray-700 text-white font-semibold rounded-lg border border-gray-500 hover:bg-gray-600 transition">
                              Download as Word
                            </button>
                          </>
                      )}
                    </li>

                    <li>
                      <button onClick={() => setIsShareModalOpen(true)}
                              className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition">
                        Share
                      </button>
                    </li>
                  </ul>
                </>
            )}
          </aside>

          <section className="flex-1 p-6 h-[96vh] flex flex-col justify-center items-center bg-gray-100 pt-20 mb-32">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Editing: {selectedTemplate.name}</h1>
            <div className="w-full max-w-2xl p-4 border border-gray-400 rounded-lg shadow-xl bg-white">
              {selectedTemplate.component && <selectedTemplate.component data={resumeData} />}
            </div>
          </section>
        </main>

        {/* Collapsible Footer */}
        <div
            className={`bg-gray-900 text-white transition-all duration-300 ${
                isFooterMinimized ? "h-12" : "h-20"
            } flex items-center justify-center relative`}
        >
          {/* Toggle Button */}
          <button
              onClick={() => setIsFooterMinimized((prev) => !prev)}
              className="absolute top-[-10px] bg-gray-900 text-white p-2 rounded-full border border-gray-700"
          >
            {isFooterMinimized ? <AiOutlineUp size={16} /> : <AiOutlineDown size={16} />}
          </button>

          {/*for gap before footer*/}
          <div className="h-40"></div>


          {/* Footer Content */}
          <div className="flex-1 flex justify-between items-center text-sm px-4">
            <span>© 2025 ResumeX</span>
            {!isFooterMinimized && (
                <div className="flex items-center gap-4">
                  <a href="#" className="hover:text-blue-400">About</a>
                  <a href="#" className="hover:text-blue-400">Resume Builder</a>
                  <a href="#" className="hover:text-blue-400">Templates</a>
                  <a href="mailto:support@resumex.com" className="hover:text-blue-400">Contact</a>
                </div>
            )}
          </div>
        </div>

        {/* SHARE MODAL - Fully Restored ✅ */}
        {isShareModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                {/* Close Button */}
                <button onClick={() => setIsShareModalOpen(false)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                  <AiOutlineClose size={24} />
                </button>

                {/* Modal Title */}
                <h2 className="text-lg font-bold mb-4">Share Your Resume</h2>

                {/* Share on LinkedIn Button - Restored ✅ */}
                <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg mb-2">
                  Share on LinkedIn
                </button>

                {/* Share via Email Button - Restored ✅ */}
                <button className="w-full py-2 bg-gray-500 text-white font-semibold rounded-lg mb-2">
                  Share via Email
                </button>

                {/* Copy Resume Link Button */}
                <button onClick={copyToClipboard}
                        className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg mb-2">
                  Copy Resume Link
                </button>
              </div>
            </div>
        )}
      </div>
  );
}