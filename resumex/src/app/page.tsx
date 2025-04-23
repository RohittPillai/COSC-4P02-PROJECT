"use client";
import React, { useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import { Sparkles, Palette, FileText, Star } from "lucide-react";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

// For TypeScript users:
declare global {
  interface Window {
    AgentInitializer?: {
      init: (options: any) => void;
    };
  }
}

export default function Homepage() {
  // Initialize the JotForm chatbot when "Start Chat" is clicked
  const handleStartChat = () => {
    if (typeof window !== "undefined" && window.AgentInitializer) {
      window.AgentInitializer.init({
        agentRenderURL: "https://agent.jotform.com/01954e62666e790e93a05f107990fb5bc6b7",
        rootId: "JotformAgent-01954e62666e790e93a05f107990fb5bc6b7",
        formID: "01954e62666e790e93a05f107990fb5bc6b7",
        queryParams: ["skipWelcome=1", "maximizable=1"],
        domain: "https://www.jotform.com",
        isDraggable: false,
        background: "linear-gradient(180deg, #0F53B4 0%, #0F53B4 100%)",
        buttonBackgroundColor: "#0F53B4",
        buttonIconColor: "#FFFFFF",
        variant: false,
        customizations: {
          greeting: "Yes",
          greetingMessage: "Hi! How can I assist you?",
          pulse: "Yes",
          position: "right",
        },
        isVoice: undefined,
      });
    }
  };

  /**
   * Cleanup effect to remove the JotForm agent from the DOM
   * when the user navigates away from the homepage.
   */
  useEffect(() => {
    return () => {
      // Remove the JotForm agent's container if it exists
      const agentRoot = document.getElementById(
          "JotformAgent-01954e62666e790e93a05f107990fb5bc6b7"
      );
      if (agentRoot) {
        agentRoot.remove();
      }
    };
  }, []);

  return (
      <>
        {/* Load JotForm script only on this page */}
        <Script
            src="https://cdn.jotfor.ms/s/umd/latest/for-embedded-agent.js"
            strategy="afterInteractive"
        />

        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header />

          {/* Hero Section */}
          <section className="bg-gray-900 text-white text-center py-20 px-6">
            <h1 className="text-5xl font-extrabold">Build Your Resume with AI</h1>
            <p className="mt-4 text-lg">
              Generate professional resumes effortlessly with AI-powered templates.
            </p>
            <Link href="/templates">
              <button className="mt-6 px-6 py-3 bg-blue-600 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition">
                Get Started for Free
              </button>
            </Link>
          </section>

          {/* Features Section */}
          <section className="py-20 px-6 max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Why Choose <span className="text-blue-600">ResumeX?</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Your AI-powered solution for crafting the perfect resume.
            </p>

            <div className="mt-12 grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 bg-white shadow-xl border border-gray-200 rounded-2xl transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="flex justify-center">
                  <Sparkles className="text-blue-600 w-12 h-12" />
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-gray-800">
                  AI-Powered Suggestions
                </h3>
                <p className="mt-3 text-gray-600">
                  Get personalized resume suggestions tailored to your experience.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 bg-white shadow-xl border border-gray-200 rounded-2xl transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="flex justify-center">
                  <Palette className="text-blue-600 w-12 h-12" />
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-gray-800">
                  Customizable Templates
                </h3>
                <p className="mt-3 text-gray-600">
                  Choose from professional designs that make you stand out.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 bg-white shadow-xl border border-gray-200 rounded-2xl transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="flex justify-center">
                  <FileText className="text-blue-600 w-12 h-12" />
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-gray-800">
                  Instant PDF Export
                </h3>
                <p className="mt-3 text-gray-600">
                  Download your resume instantly in high-quality PDF format.
                </p>
              </div>
            </div>
          </section>

          {/* Google Gemini Section */}
          <section className="py-20 px-6 bg-gray-900 text-white text-center">
            <h2 className="text-5xl font-extrabold tracking-wide">
              ⚡ Powered by <span className="text-blue-400">Google Gemini</span>
            </h2>
            <p className="mt-6 text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              ResumeX leverages the power of <strong>Google Gemini</strong> to generate{" "}
              <strong>job-winning resumes</strong> with AI-driven content recommendations. Whether
              you&apos;re a seasoned professional or a fresh graduate, our AI optimizes your resume
              to make it stand out to recruiters.
            </p>

            <p className="mt-6 text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              With <strong>intelligent keyword suggestions</strong>, <strong>role-specific content</strong>,
              and <strong>real-time feedback</strong>, ResumeX ensures your resume meets industry standards
              and increases your chances of landing interviews.
            </p>

            <p className="mt-6 text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Say goodbye to writer’s block—our AI crafts compelling summaries, bullet points, and
              professional achievements in seconds. <strong>Start building your AI-powered resume today.</strong>
            </p>
          </section>

          {/* Testimonials Section */}
          <section className="bg-gray-50 py-20 px-6">
            <h2 className="text-4xl font-bold text-center text-gray-900">
              What Our Users Say
            </h2>
            <p className="mt-4 text-lg text-center text-gray-600">
              Real stories from professionals who landed jobs with ResumeX.
            </p>

            <div className="mt-12 max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  feedback: "ResumeX made it so easy to craft a stunning resume. Got hired in a week!",
                },
                {
                  name: "Michael Lee",
                  feedback: "The AI suggestions were game-changers. My resume stands out now!",
                },
                {
                  name: "Emily Carter",
                  feedback: "Love the templates! My resume looks polished and professional.",
                },
              ].map((testimonial, index) => (
                  <div
                      key={index}
                      className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-center">
                      <Star className="text-yellow-500 w-10 h-10" />
                    </div>
                    <p className="mt-4 text-gray-700">{testimonial.feedback}</p>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                  </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gray-900 text-white text-center py-20 px-6">
            <h2 className="text-3xl font-bold">Start Building Your Resume Today</h2>
            <p className="mt-4 text-lg">Join thousands of professionals using ResumeX.</p>
            <Link href="/register">
              <button className="mt-6 px-6 py-3 bg-blue-600 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition">
                Sign Up Now
              </button>
            </Link>
          </section>

          {/* Contact Section */}
          <section className="py-20 px-6 bg-gray-100 text-center">
            <h2 className="text-4xl font-bold text-gray-900">Need Help? Contact Us</h2>
            <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
              Have questions or need support? Reach out to us via email or phone, or
              start a chat with our AI-powered assistant.
            </p>

            <div className="mt-12 max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              {/* Contact Info */}
              <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-900">Contact Support</h3>
                <ul className="mt-4 space-y-3 text-left">
                  <li className="flex items-center gap-2">
                    <svg
                        className="w-6 h-6 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 12H3M16 12l-4 4m4-4l-4-4"
                      ></path>
                    </svg>
                    <a href="mailto:support@resumex.com" className="text-blue-600 hover:underline">
                      support@resumex.com
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                        className="w-6 h-6 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5h18M3 12h18M3 19h18"
                      ></path>
                    </svg>
                    <a href="tel:+11234567890" className="text-blue-600 hover:underline">
                      +1 (123) 456-7890
                    </a>
                  </li>
                </ul>
              </div>

              {/* Chat with AI Assistant */}
              <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Chat with AI Assistant
                </h3>
                <p className="mt-2 text-gray-600">
                  Need quick answers? Our chatbot can assist you instantly.
                </p>
                <div className="mt-12">
                  {/* Clicking this button initializes JotForm's chatbot */}
                  <button
                      onClick={handleStartChat}
                      className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                  >
                    Start Chat
                  </button>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </>
  );
}
