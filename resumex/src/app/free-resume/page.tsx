"use client";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { useState, useEffect } from "react";
import Link from "next/link";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose, AiOutlineSync, AiOutlineCheck } from "react-icons/ai";

export default function FreeResume() {
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
        doc.save("resume.pdf");
    };

    const downloadAsWord = () => {
        const blob = new Blob([resumeContent], { type: "application/msword" });
        saveAs(blob, "resume.doc");
    };

    // Function to copy resume link
    const copyToClipboard = () => {
        navigator.clipboard.writeText("https://resumex.com/my-resume");
        alert("Resume link copied to clipboard!");
    };

    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-100">
            <Header />

            <main className="flex flex-grow w-full h-screen relative">
                <aside className={`${isSidebarOpen ? "w-1/5" : "w-12"} bg-gradient-to-b from-gray-800 to-gray-700 text-white shadow-lg p-4 border-r border-gray-300 h-full flex flex-col transition-all duration-300`}>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="self-end text-gray-600 hover:text-gray-900 mb-4">
                        {isSidebarOpen ? <AiOutlineLeft size={20} /> : <AiOutlineRight size={20} />}
                    </button>
                    {isSidebarOpen && (
                        <>
                            <h2 className="text-lg font-semibold mb-4">Resume Options</h2>
                            <ul className="space-y-3">
                                <li><Link href="/login" className="text-blue-600 hover:underline">Sign In</Link></li>
                                <li><button className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-200 text-white font-semibold rounded-lg border border-gray-300">Custom Section</button></li>

                                {/* DESIGN & FONT EXPANDING BUTTON */}
                                <li>
                                    <button onClick={() => setIsDesignExpanded(!isDesignExpanded)}
                                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-200 text-white font-semibold rounded-lg border border-gray-300">
                                        Design & Font {isDesignExpanded ? "▲" : "▼"}
                                    </button>
                                    {isDesignExpanded && (
                                        <>
                                            <button className="w-full mt-2 py-2 bg-white text-gray-800 font-semibold rounded-lg border border-gray-300">Change Font</button>
                                            <button className="w-full mt-2 py-2 bg-white text-gray-800 font-semibold rounded-lg border border-gray-300">Change Theme</button>
                                        </>
                                    )}
                                </li>

                                <li><button className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-200 text-white font-semibold rounded-lg border border-gray-300">Undo</button></li>
                                <li><button className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-200 text-white font-semibold rounded-lg border border-gray-300">Redo</button></li>

                                {/* SAVE BUTTON */}
                                <li>
                                    <button onClick={saveResume}
                                            className="w-full flex justify-center items-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-green-200 text-white font-semibold rounded-lg border border-gray-300">
                                        {isSaving ? <AiOutlineSync className="animate-spin" size={20} /> : <AiOutlineCheck size={20} />}
                                        Save
                                    </button>
                                </li>

                                {/* DOWNLOAD EXPANDING BUTTON */}
                                <li>
                                    <button onClick={() => setIsDownloadExpanded(!isDownloadExpanded)}
                                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-200 text-white font-semibold rounded-lg border border-gray-300">
                                        Download {isDownloadExpanded ? "▲" : "▼"}
                                    </button>
                                    {isDownloadExpanded && (
                                        <>
                                            <button onClick={downloadAsPDF}
                                                    className="w-full mt-2 py-2 bg-white text-gray-800 font-semibold rounded-lg border border-gray-300">
                                                Download as PDF
                                            </button>
                                            <button onClick={downloadAsWord}
                                                    className="w-full mt-2 py-2 bg-white text-gray-800 font-semibold rounded-lg border border-gray-300">
                                                Download as Word
                                            </button>
                                        </>
                                    )}
                                </li>

                                {/* SHARE BUTTON WITH POP-UP MODAL */}
                                <li>
                                    <button onClick={() => setIsShareModalOpen(true)}
                                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-200 text-white font-semibold rounded-lg border border-gray-300">
                                        Share
                                    </button>
                                </li>
                            </ul>
                        </>
                    )}
                </aside>

                <section className="flex-1 p-6 h-[96vh] flex justify-center items-center bg-gradient-to-b from-gray-100 to-gray-200">
                    <div className="w-[45%]">
                        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">Free Resume Builder</h1>
                        <textarea className="w-full h-[85vh] p-4 border border-gray-300 rounded-lg shadow-xl resize-none bg-white"
                                  value={resumeContent}
                                  onChange={(e) => setResumeContent(e.target.value)}
                                  aria-label="Resume Editor"
                        />
                    </div>
                </section>
            </main>

            <Footer />

            {/* SHARE MODAL */}
            {isShareModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                        <button onClick={() => setIsShareModalOpen(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                            <AiOutlineClose size={24} />
                        </button>
                        <h2 className="text-lg font-bold mb-4">Share Your Resume</h2>
                        <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg mb-2">Share on LinkedIn</button>
                        <button className="w-full py-2 bg-gray-500 text-white font-semibold rounded-lg mb-2">Share via Email</button>
                        <button onClick={copyToClipboard} className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg mb-2">Copy Resume Link</button>
                    </div>
                </div>
            )}
        </div>
    );
}
