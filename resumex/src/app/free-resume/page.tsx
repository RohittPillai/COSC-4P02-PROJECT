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
                <aside className={`${isSidebarOpen ? "w-1/6" : "w-12"} bg-white shadow-lg p-4 border-r border-gray-300 h-full flex flex-col transition-all duration-300`}>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="self-end text-gray-600 hover:text-gray-900 mb-4">
                        {isSidebarOpen ? <AiOutlineLeft size={20} /> : <AiOutlineRight size={20} />}
                    </button>
                    {isSidebarOpen && (
                        <>
                            <h2 className="text-lg font-semibold mb-4">Resume Options</h2>
                            <ul className="space-y-3">
                                <li><Link href="/login" className="text-blue-600 hover:underline">Sign In</Link></li>
                                <li><button className="w-full py-2 bg-gray-200 rounded">Custom Section</button></li>
                                <li><button className="w-full py-2 bg-gray-200 rounded">Design & Font</button></li>
                                <li><button className="w-full py-2 bg-gray-200 rounded">Download</button></li>
                                <li><button className="w-full py-2 bg-gray-200 rounded">Share</button></li>
                                <li><button className="w-full py-2 bg-gray-200 rounded">Undo</button></li>
                                <li><button className="w-full py-2 bg-gray-200 rounded">Redo</button></li>
                            </ul>
                        </>
                    )}
                </aside>

                {/* Resume Editor */}
                <section className="flex-1 p-6 h-full">
                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">Free Resume Builder</h1>
                    <textarea
                        className="w-full h-[70vh] p-4 border rounded shadow-sm resize-none"
                        value={resumeContent}
                        onChange={(e) => setResumeContent(e.target.value)}
                        aria-label="Resume Editor"
                    />
                </section>


            </main>

            <Footer  />
        </div>
    );
}
