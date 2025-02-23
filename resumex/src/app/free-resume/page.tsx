"use client";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function FreeResume() {
    const [resumeContent, setResumeContent] = useState("Start typing your resume...");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDesignExpanded, setIsDesignExpanded] = useState(false);
    const [isDownloadExpanded, setIsDownloadExpanded] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false); // State for Share Modal

    // Function to copy a mock resume link
    const copyToClipboard = () => {
        navigator.clipboard.writeText("https://resumex.com/my-resume");
        alert("Resume link copied to clipboard!");
    };

    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-100">
            <Header />

            {/* Main Content */}
            <main className="flex flex-grow w-full h-screen relative">
                {/* Side Panel (Collapsible) */}
                <aside className={`${isSidebarOpen ? "w-1/5" : "w-12"} } bg-gradient-to-b from-gray-800 to gray-700 text-white shadow-lg p-4 border-r border-gray-300 h-full flex flex-col transition-all duration-300`}>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="self-end text-gray-600 hover:text-gray-900 mb-4">
                        {isSidebarOpen ? <AiOutlineLeft size={20} /> : <AiOutlineRight size={20} />}
                    </button>
                    {isSidebarOpen && (
                        <>
                            <h2 className="text-lg font-semibold mb-4">Resume Options</h2>
                            <ul className="space-y-3">
                                <li><Link href="/login" className="text-blue-600 hover:underline">Sign In</Link></li>
                                <li><button className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-200 text-white font-semibold rounded-lg border border-gray-300 hover:from-teal-600 hover:to-green-600 transition-all duration-200 ease-in-out">Custom Section</button></li>

                                {/* DESIGN & FONT EXPANDING BUTTON */}
                                <li>
                                    <button
                                        onClick={() => setIsDesignExpanded(!isDesignExpanded)}
                                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-200 text-white font-semibold rounded-lg border border-gray-300 hover:from-teal-600 hover:to-green-600 transition-all duration-200 ease-in-out"
                                    >
                                        Design & Font {isDesignExpanded ? "▲" : "▼"}
                                    </button>
                                    {isDesignExpanded && (
                                        <>
                                            <button className="w-full mt-2 py-2 bg-white text-gray-800 font-semibold rounded-lg border border-gray-300 hover:bg-gray-200 transition-all duration-200 ease-in-out">
                                                Change Font
                                            </button>
                                            <button className="w-full mt-2 py-2 bg-white text-gray-800 font-semibold rounded-lg border border-gray-300 hover:bg-gray-200 transition-all duration-200 ease-in-out">
                                                Change Theme
                                            </button>
                                        </>
                                    )}
                                </li>

                                <li><button className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-200 text-white font-semibold rounded-lg border border-gray-300 hover:from-teal-600 hover:to-green-600 transition-all duration-200 ease-in-out">Undo</button></li>
                                <li><button className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-200 text-white font-semibold rounded-lg border border-gray-300 hover:from-teal-600 hover:to-green-600 transition-all duration-200 ease-in-out">Redo</button></li>
                                <li><button className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-200 text-white font-semibold rounded-lg border border-gray-300 hover:from-teal-600 hover:to-green-600 transition-all duration-200 ease-in-out">Save</button></li>

                                {/* DOWNLOAD EXPANDING BUTTON */}
                                <li>
                                    <button
                                        onClick={() => setIsDownloadExpanded(!isDownloadExpanded)}
                                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-200 text-white font-semibold rounded-lg border border-gray-300 hover:from-teal-600 hover:to-green-600 transition-all duration-200 ease-in-out"
                                    >
                                        Download {isDownloadExpanded ? "▲" : "▼"}
                                    </button>
                                    {isDownloadExpanded && (
                                        <>
                                            <button className="w-full mt-2 py-2 bg-white text-gray-800 font-semibold rounded-lg border border-gray-300 hover:bg-gray-200 transition-all duration-200 ease-in-out">
                                                Download as PDF
                                            </button>
                                            <button className="w-full mt-2 py-2 bg-white text-gray-800 font-semibold rounded-lg border border-gray-300 hover:bg-gray-200 transition-all duration-200 ease-in-out">
                                                Download as Word
                                            </button>
                                        </>
                                    )}
                                </li>

                                {/* SHARE BUTTON WITH POP-UP MODAL */}
                                <li>
                                    <button
                                        onClick={() => setIsShareModalOpen(true)}
                                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-200 text-white font-semibold rounded-lg border border-gray-300 hover:from-teal-600 hover:to-green-600 transition-all duration-200 ease-in-out"
                                    >
                                        Share
                                    </button>
                                </li>
                            </ul>
                        </>
                    )}
                </aside>

                {/* Resume Editor */}
                <section className="flex-1 p-6 h-[96vh] flex justify-center items-center bg-gradient-to-b from-gray-100 to-gray-200">
                    <div className="w-[45%]"> {/* Reduced width */}
                        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">Free Resume Builder</h1>
                        <textarea
                            className="w-full h-[85vh] p-4 border border-gray-300 rounded-lg shadow-xl resize-none bg-white"
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
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                        <h2 className="text-lg font-bold mb-4">Share Your Resume</h2>
                        <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg mb-2 hover:bg-blue-700 transition">Share on LinkedIn</button>
                        <button className="w-full py-2 bg-gray-500 text-white font-semibold rounded-lg mb-2 hover:bg-gray-600 transition">Share via Email</button>
                        <button onClick={copyToClipboard} className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg mb-2 hover:bg-green-600 transition">Copy Resume Link</button>
                        <button onClick={() => setIsShareModalOpen(false)} className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
