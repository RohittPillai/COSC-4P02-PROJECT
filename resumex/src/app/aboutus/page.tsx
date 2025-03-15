"use client";

import Header from "../_components/Header";
import Footer from "../_components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white text-center py-24 px-8">
                <h1 className="text-5xl font-extrabold">Empowering Job Seekers with AI</h1>
                <p className="mt-4 text-lg opacity-90 leading-relaxed">
                    Transform the way you build resumes with ResumeX. AI-powered. User-focused.
                </p>
            </section>

            {/* Welcome Section */}
            <section className="max-w-4xl mx-auto text-center py-16 px-8">
                <h2 className="text-3xl font-semibold text-gray-800">Welcome to ResumeX</h2>
                <p className="mt-4 text-gray-600 text-lg">
                    ResumeX started as a passion project by a group of university students who
                    knew the struggles of crafting the perfect resume. We wanted to make job applications
                    easier, stress-free, and accessible to everyone.
                </p>
                <p className="mt-4 text-gray-600 text-lg">
                    That’s why we built an AI-powered resume builder with simple, ready-to-use templates
                    and a choice between a free plan or an affordable premium option with exclusive tools.
                </p>
                <p className="mt-4 text-gray-600 text-lg font-semibold">
                    Your career journey starts here—let’s build something great together!
                </p>
            </section>

            {/* What Makes ResumeX Different */}
            <section className="bg-white py-16 px-8">
                <h2 className="text-3xl font-semibold text-center text-gray-800">What Makes ResumeX Different?</h2>
                <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mt-4">
                    We built ResumeX with one goal in mind—to make resume-building effortless.
                    Unlike traditional tools, we focus on speed, simplicity, and AI-driven enhancements.
                </p>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-8 text-center">
                    <div className="p-6 bg-gray-100 rounded-lg shadow">
                        <h3 className="text-xl font-semibold">AI That Works for You</h3>
                        <p className="mt-2 text-gray-600">Generate job-winning resumes in minutes with intelligent suggestions.</p>
                    </div>
                    <div className="p-6 bg-gray-100 rounded-lg shadow">
                        <h3 className="text-xl font-semibold">Customizable Templates</h3>
                        <p className="mt-2 text-gray-600">Professional, polished designs tailored to your needs.</p>
                    </div>
                    <div className="p-6 bg-gray-100 rounded-lg shadow">
                        <h3 className="text-xl font-semibold">Real-Time Insights</h3>
                        <p className="mt-2 text-gray-600">Resume scores and optimization tips to improve your chances.</p>
                    </div>
                </div>
            </section>

            {/* Meet the Team */}
            <section className="max-w-5xl mx-auto py-16 px-8 text-center">
                <h2 className="text-3xl font-semibold text-gray-800">Meet the Team</h2>
                <p className="mt-4 text-gray-600 text-lg">
                    We are a dedicated team of developers, product strategists, and designers working together to create the best AI-driven resume builder.
                </p>
                <div className="grid md:grid-cols-3 gap-8 mt-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold">{member.name}</h3>
                            <p className="text-gray-500">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gray-900 text-white text-center py-16">
                <h2 className="text-3xl font-bold">Start Building Your Resume Today</h2>
                <p className="mt-4 text-lg">Join thousands of professionals using ResumeX.</p>
                <Link href="/register">
                    <button className="mt-6 px-10 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-md hover:bg-gray-200 transition">
                        Sign Up Now
                    </button>
                </Link>
            </section>

            <Footer />
        </div>
    );
}

// Team Members List
const teamMembers = [
    { name: "Neeti Pandya", role: "Product Owner" },
    { name: "Jenny Dobariya", role: "Scrum Master" },
    { name: "Harsh Kapoor", role: "Developer" },
    { name: "Minhazul Islam Mahim", role: "Developer" },
    { name: "Rohit Pillai", role: "Developer" },
    { name: "Priyanshu Vora", role: "Developer" },
];
