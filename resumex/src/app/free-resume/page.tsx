"use client";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose, AiOutlineSync, AiOutlineCheck } from "react-icons/ai";

const templates = {
  template1: {
    name: "Modern Clean Resume",
    layout: "bg-white border border-gray-300 shadow-lg p-6 rounded-lg",
  },
  template2: {
    name: "Creative Professional Resume",
    layout: "bg-gray-100 border border-gray-400 shadow-md p-6 rounded-lg",
  },
  template3: {
    name: "Executive Resume",
    layout: "bg-blue-50 border border-blue-300 shadow-md p-6 rounded-lg",
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

  const saveResume = () => {
    if (resumeContent !== lastSavedContent) {
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
        setLastSavedContent(resumeContent);
        console.log("Resume saved:", resumeContent);
      }, 1000);
    }
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

  return (
      <div className="flex flex-col min-h-screen w-full bg-gray-100">
        <Header />

        <main className="flex flex-grow w-full h-screen relative">
          <aside className={`${isSidebarOpen ? "w-1/5" : "w-12"} bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg p-4 border-r border-gray-700 h-full flex flex-col transition-all duration-300`}>
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

          <section className="flex-1 p-6 h-[96vh] flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Editing: {selectedTemplate.name}</h1>
            <div className={`w-full max-w-2xl h-[75vh] p-4 border border-gray-400 rounded-lg shadow-xl resize-none ${selectedTemplate.layout}`}>
              <textarea
                  className="w-full h-full bg-transparent outline-none"
                  value={resumeContent}
                  onChange={(e) => setResumeContent(e.target.value)}
                  aria-label="Resume Editor"
              />
            </div>
          </section>
        </main>

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

        <Footer />
      </div>
  );
}
