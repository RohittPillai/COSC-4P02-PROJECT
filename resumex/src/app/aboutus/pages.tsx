"use client";

import Header from "../_components/Header";
import Footer from "../_components/Footer";
import Image from "next/image";

export default function AboutUs() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white text-center py-24 px-8">
                <h1 className="text-5xl font-extrabold">Who We Are & What We Do</h1>
                <p className="mt-4 text-lg opacity-90 leading-relaxed">
                    Empowering job seekers with AI-powered resume tools.
                </p>
            </section>

            {/* Mission & Vision */}
            <section className="max-w-5xl mx-auto text-center py-16 px-8">
                <h2 className="text-3xl font-semibold text-gray-800">Our Mission</h2>
                <p className="mt-4 text-gray-600 text-lg">
                    We aim to simplify resume building and career growth with AI-driven tools.
                </p>
                <h2 className="text-3xl font-semibold text-gray-800 mt-12">Our Vision</h2>
                <p className="mt-4 text-gray-600 text-lg">
                    Helping job seekers land their dream job with modern, automated tools.
                </p>
            </section>

            {/* Key Features */}
            <section className="bg-white py-16 px-8">
                <h2 className="text-3xl font-semibold text-center text-gray-800">Why Choose Us?</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-8 text-center">
                    <div className="p-6 bg-gray-100 rounded-lg shadow">
                        <h3 className="text-xl font-semibold">AI Resume Builder</h3>
                        <p className="mt-2 text-gray-600">Create professional resumes with AI assistance.</p>
                    </div>
                    <div className="p-6 bg-gray-100 rounded-lg shadow">
                        <h3 className="text-xl font-semibold">Custom Templates</h3>
                        <p className="mt-2 text-gray-600">Choose from multiple resume designs.</p>
                    </div>
                    <div className="p-6 bg-gray-100 rounded-lg shadow">
                        <h3 className="text-xl font-semibold">Resume Score & Analytics</h3>
                        <p className="mt-2 text-gray-600">Get feedback and track your resume performance.</p>
                    </div>
                </div>
            </section>

            {/* Meet the Team */}
            <section className="max-w-5xl mx-auto py-16 px-8 text-center">
                <h2 className="text-3xl font-semibold text-gray-800">Meet the Team</h2>
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
                <h2 className="text-3xl font-bold">Join ResumeX Today!</h2>
                <p className="mt-4 text-lg">Start building your resume with AI-powered tools.</p>
                <a href="/register">
                    <button className="mt-6 px-10 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-md hover:bg-gray-200 transition">
                        Sign Up Now
                    </button>
                </a>
            </section>

            <Footer />
        </div>
    );
}

const teamMembers = [
    { name: "Neeti Pandya", role: "Product Owner" },
    { name: "Harsh Kapoor", role: "Developer" },
    { name: "Minhazul Islam Mahim", role: "Developer" },
    { name: "Rohit Pillai", role: "Developer" },
    { name: "Jenny Dobariya", role: "Scrum Master" },
    { name: "Priyanshu Vora", role: "Developer" },
];