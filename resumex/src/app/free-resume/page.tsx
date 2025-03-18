"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import Link from "next/link";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose, AiOutlineSync, AiOutlineCheck } from "react-icons/ai";

export default function FreeResume() {
  const searchParams = useSearchParams();
  const template = searchParams.get("template") || "template1"; // Default to template1

  const [resumeContent, setResumeContent] = useState("Start typing your resume...");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-100">
      <Header />

      <main className="flex flex-grow w-full h-screen relative">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? "w-1/5" : "w-12"} bg-gray-900 text-white shadow-lg p-4 border-r border-gray-700 h-full flex flex-col transition-all duration-300`}>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="self-end text-gray-400 hover:text-gray-200 mb-4">
            {isSidebarOpen ? <AiOutlineLeft size={20} /> : <AiOutlineRight size={20} />}
          </button>
          {isSidebarOpen && (
            <>
              <h2 className="text-lg font-semibold mb-4">Resume Options</h2>
              <ul className="space-y-3">
                <li><Link href="/login" className="text-blue-400 hover:underline">Sign In</Link></li>

                {/* Custom Section */}
                <li>
                  <button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 shadow-md hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out">
                    Custom Section
                  </button>
                </li>

                {/* Undo */}
                <li>
                  <button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 shadow-md hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out">
                    Undo
                  </button>
                </li>

                {/* Redo */}
                <li>
                  <button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 shadow-md hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out">
                    Redo
                  </button>
                </li>

                {/* SAVE BUTTON */}
                <li>
                  <button onClick={saveResume}
                          className="w-full flex justify-center items-center gap-2 py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 shadow-md hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out">
                    {isSaving ? <AiOutlineSync className="animate-spin" size={20} /> : <AiOutlineCheck size={20} />}
                    Save
                  </button>
                </li>

                {/* DOWNLOAD BUTTON */}
                <li>
                  <button onClick={downloadAsPDF}
                          className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 shadow-md hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out">
                    Download as PDF
                  </button>
                </li>
                <li>
                  <button onClick={downloadAsWord}
                          className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 shadow-md hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out">
                    Download as Word
                  </button>
                </li>
              </ul>
            </>
          )}
        </aside>

        {/* Resume Editor */}
        <section className="flex-1 p-6 h-[96vh] flex flex-col justify-center items-center bg-gray-100">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Editing: {template.toUpperCase()}</h1>
          <textarea className="w-full max-w-2xl h-[75vh] p-4 border border-gray-400 rounded-lg shadow-xl resize-none bg-white"
                    value={resumeContent}
                    onChange={(e) => setResumeContent(e.target.value)}
                    aria-label="Resume Editor"
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
