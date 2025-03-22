"use client";

import { useState } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";

export default function AboutUs() {
    const [current, setCurrent] = useState(0);

    return (
        <div className="flex flex-col min-h-screen bg-[#0A0F1F] text-white">
            <Header />

            {/*  Section */}
            <section className="relative text-center py-24 px-8 bg-[#0A0F1F]">
                <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#12203F] to-transparent"></div>

                <div className="relative z-10 max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-12 rounded-2xl border border-white/15 shadow-md">
                    <h1 className="text-5xl font-extrabold text-white">
                        Empowering Job Seekers with AI
                    </h1>
                    <p className="mt-4 text-lg text-gray-300 leading-relaxed">
                        Transform the way you build resumes with ResumeX. AI-powered. User-focused.
                    </p>
                </div>
            </section>

            {/* Section */}
            <section className="py-20 bg-[#E3E7F1] text-gray-900 text-center">
                <h2 className="text-4xl font-extrabold">Resumes Optimized for Applicant Tracking Systems (ATS)</h2>
                <p className="mt-4 text-lg text-gray-700 max-w-4xl mx-auto">
                    ResumeX ensures your resume meets ATS standards, increasing your chances of passing initial screenings and landing interviews effortlessly.
                </p>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mt-12 text-left">
                    {atsFeatures.map((feature, index) => (
                        <div key={index} className="flex gap-4">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-full">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                                <p className="mt-2 text-gray-700">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/*  Section */}
            <section className="flex flex-col md:flex-row items-center justify-between py-20 px-8 bg-[#0A0F1F]">
                <div className="w-full md:w-1/2 max-w-lg text-left bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/15 shadow-md">
                    <p className="text-xl italic text-gray-300">
                        "{testimonials[current].quote}"
                    </p>
                    <div className="mt-4">
                        <p className="font-bold text-white">{testimonials[current].name}</p>
                        <p className="text-sm text-gray-400">{testimonials[current].role}</p>
                    </div>

                    <div className="flex space-x-2 mt-6">
                        {testimonials.map((_, index) => (
                            <span
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`w-3 h-3 rounded-full cursor-pointer ${
                                    current === index ? "bg-blue-500" : "bg-gray-600"
                                }`}
                            ></span>
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-1/2 max-w-xl text-left mt-10 md:mt-0">
                    <h2 className="text-4xl font-extrabold">
                        Your resume is the key to your future
                    </h2>
                    <p className="mt-4 text-lg text-gray-300">
                        ResumeX helps you craft resumes that make an impact. Start building today!
                    </p>
                    <a href="/templates">
                        <button className="mt-6 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                            Browse Templates
                        </button>
                    </a>
                </div>
            </section>

            {/* Meet Our Team Section */}
            <section className="py-20 bg-[#E3E7F1] text-gray-900 text-center">
                <h2 className="text-4xl font-extrabold">Meet Our Team</h2>
                

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mt-12 text-left">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex flex-col bg-white/10 p-6 rounded-lg shadow-lg border border-white/15">
                            <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                            <p className="text-gray-600">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sign Up Section  */}
            <section className="py-16 bg-[#0A0F1F] text-center text-white">
                <h2 className="text-4xl font-extrabold">Join ResumeX Today</h2>
                <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                    Unlock the power of AI-driven resume building and land your dream job faster. 
                </p>
                <a href="/register">
                    <button className="mt-6 px-10 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition">
                        Sign Up Now
                    </button>
                </a>
            </section>

            <Footer />
        </div>
    );
}

// ATS Features Data
const atsFeatures = [
    { title: "Avoids Grammar & Spelling Mistakes", description: "AI-powered spell-check and grammar suggestions ensure your resume remains polished and error-free.", icon: <span className="text-blue-600 text-2xl">🔤</span> },
    { title: "Simultaneous Editing", description: "Update and refine multiple resumes at the same time, allowing seamless collaboration and quick adjustments.", icon: <span className="text-green-600 text-2xl">🔑</span> },
    { title: "Content Suggestions That Work", description: "Get AI-driven content recommendations tailored to specific job descriptions, making your resume stand out.", icon: <span className="text-yellow-600 text-2xl">🤖</span> },
    { title: "One-Click Create Multiple Versions", description: "Generate multiple versions of your resume instantly, customized for different job applications with just one click.", icon: <span className="text-purple-600 text-2xl">📄</span> },
];

// Client Testimonials Data
const testimonials = [
    { quote: "ResumeX transformed my job search!", name: "Samantha Lee", role: "Marketing Specialist" },
    { quote: "Best AI resume builder I’ve used!", name: "David Kim", role: "Software Engineer" },
    { quote: "Got hired faster than expected!", name: "Alicia Rivera", role: "Project Manager" },
];

// Team Members Data with Full Roles
const teamMembers = [
    { name: "Neeti Pandya", role: "Product Owner" },
    { name: "Jenny Dobariya", role: "Scrum Master" },
    { name: "Harsh Kapoor", role: " Developer" },
    { name: "Minhazul Islam Mahim", role: "Developer" },
    { name: "Rohit Pillai", role: " Developer" },
    { name: "Priyanshu Vora", role: "Developer" },
];
