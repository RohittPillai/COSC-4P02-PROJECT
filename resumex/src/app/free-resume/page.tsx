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

    const copyToClipboard = () => {
        navigator.clipboard.writeText("https://resumex.com/my-resume");
        alert("Resume link copied to clipboard!");
    };

    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-100">
            <Header />

            <main className="flex flex-grow w-full h-screen relative">
                {/* Sidebar */}
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

                                {/* Custom Section */}
                                <li>
                                    <button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 shadow-md hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out">
                                        Custom Section
                                    </button>
                                </li>

                                {/* DESIGN & FONT EXPANDING BUTTON */}
                                <li>
                                    <button onClick={() => setIsDesignExpanded(!isDesignExpanded)}
                                            className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 shadow-md hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out">
                                        Design & Font {isDesignExpanded ? "▲" : "▼"}
                                    </button>
                                    {isDesignExpanded && (
                                        <>
                                            <button className="w-full mt-2 py-2 bg-gray-800 text-gray-300 font-semibold rounded-lg border border-gray-600">
                                                Change Font
                                            </button>
                                            <button className="w-full mt-2 py-2 bg-gray-800 text-gray-300 font-semibold rounded-lg border border-gray-600">
                                                Change Theme
                                            </button>
                                        </>
                                    )}
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

                                {/* DOWNLOAD EXPANDING BUTTON */}
                                <li>
                                    <button onClick={() => setIsDownloadExpanded(!isDownloadExpanded)}
                                            className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 shadow-md hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out">
                                        Download {isDownloadExpanded ? "▲" : "▼"}
                                    </button>
                                    {isDownloadExpanded && (
                                        <>
                                            <button onClick={downloadAsPDF}
                                                    className="w-full mt-2 py-2 bg-gray-800 text-gray-300 font-semibold rounded-lg border border-gray-600">
                                                Download as PDF
                                            </button>
                                            <button onClick={downloadAsWord}
                                                    className="w-full mt-2 py-2 bg-gray-800 text-gray-300 font-semibold rounded-lg border border-gray-600">
                                                Download as Word
                                            </button>
                                        </>
                                    )}
                                </li>

                                {/* SHARE BUTTON */}
                                <li>
                                    <button onClick={() => setIsShareModalOpen(true)}
                                            className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 shadow-md hover:bg-blue-600 hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out">
                                        Share
                                    </button>
                                </li>
                            </ul>
                        </>
                    )}
                </aside>

                {/* Resume Editor */}
                <section className="flex-1 p-6 h-[96vh] flex justify-center items-center bg-gray-100">
                    <div className="w-[45%]">
                        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">Free Resume Builder</h1>
                        <textarea className="w-full h-[85vh] p-4 border border-gray-400 rounded-lg shadow-xl resize-none bg-white"
                                  value={resumeContent}
                                  onChange={(e) => setResumeContent(e.target.value)}
                                  aria-label="Resume Editor"
                        />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
