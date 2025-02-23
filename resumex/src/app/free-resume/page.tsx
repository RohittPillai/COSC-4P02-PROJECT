"use client";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function FreeResume() {
    const [resumeContent, setResumeContent] = useState("Start typing your resume...");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-100">
            <Header />

            {/* Main Content */}
            <main className="flex flex-grow w-full h-screen relative">
                {/* Side Panel (Collapsible) */}
                <aside className={`${isSidebarOpen ? "w-1/5" : "w-12"} bg-gradient-to-b from-gray-800 to gray-700 text-white shadow-lg p-4 border-r border-gray-300 h-full flex flex-col transition-all duration-300`}>
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
                                <li><button className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-200 text-white font-semibold rounded-lg border border-gray-300 hover:from-teal-600 hover:to-green-600 transition-all duration-200 ease-in-out">Design & Font</button></li>
                                <li><button className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-200 text-white font-semibold rounded-lg border border-gray-300 hover:from-teal-600 hover:to-green-600 transition-all duration-200 ease-in-out">Undo</button></li>
                                <li><button className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-200 text-white font-semibold rounded-lg border border-gray-300 hover:from-teal-600 hover:to-green-600 transition-all duration-200 ease-in-out">Redo</button></li>
                                <li><button className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-200 text-white font-semibold rounded-lg border border-gray-300 hover:from-teal-600 hover:to-green-600 transition-all duration-200 ease-in-out">Save</button></li>
                                <li><button className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-200 text-white font-semibold rounded-lg border border-gray-300 hover:from-teal-600 hover:to-green-600 transition-all duration-200 ease-in-out">Download</button></li>
                                <li><button className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-200 text-white font-semibold rounded-lg border border-gray-300 hover:from-teal-600 hover:to-green-600 transition-all duration-200 ease-in-out">Share</button></li>

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

            <Footer  />
        </div>
    );
}
