"use client";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Link from "next/link";
import { Sparkles, Palette, FileText, Star, X, Send } from "lucide-react";
import React, { useState } from "react";


export default function Homepage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { text: "Hi! How can I assist you today?", sender: "bot" }
  ]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setChatMessages([...chatMessages, { text: message, sender: "user" }]);
      setMessage("");
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header /> {/* Header at the top */}

      {/* Hero Section */}
      <section className="bg-gray-900 text-white text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold">Build Your Resume with AI</h1>
        <p className="mt-4 text-lg">
          Generate professional resumes effortlessly with AI-powered templates.
        </p>
        <Link href="/free-resume">
          <button className="mt-6 px-6 py-3 bg-blue-600 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition">
            Get Started for Free
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-gray-900">Why Choose <span className="text-blue-600">ResumeX?</span></h2>
      <p className="mt-4 text-lg text-gray-600">Your AI-powered solution for crafting the perfect resume.</p>

      <div className="mt-12 grid md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="p-8 bg-white shadow-xl border border-gray-200 rounded-2xl transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="flex justify-center">
            <Sparkles className="text-blue-600 w-12 h-12" />
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-800">AI-Powered Suggestions</h3>
          <p className="mt-3 text-gray-600">Get personalized resume suggestions tailored to your experience.</p>
        </div>

        {/* Feature 2 */}
        <div className="p-8 bg-white shadow-xl border border-gray-200 rounded-2xl transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="flex justify-center">
            <Palette className="text-blue-600 w-12 h-12" />
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-800">Customizable Templates</h3>
          <p className="mt-3 text-gray-600">Choose from professional designs that make you stand out.</p>
        </div>

        {/* Feature 3 */}
        <div className="p-8 bg-white shadow-xl border border-gray-200 rounded-2xl transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="flex justify-center">
            <FileText className="text-blue-600 w-12 h-12" />
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-800">Instant PDF Export</h3>
          <p className="mt-3 text-gray-600">Download your resume instantly in high-quality PDF format.</p>
        </div>
      </div>
    </section>

      {/* ChatGPT Section */}
      <section className="py-20 px-6 bg-gray-900 text-white text-center">
      <h2 className="text-5xl font-extrabold tracking-wide">
        ⚡ Powered by <span className="text-blue-400">ChatGPT</span>
      </h2>
      <p className="mt-6 text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
        ResumeX leverages the power of <strong>OpenAI&apos;s ChatGPT</strong> to generate <strong>job-winning resumes</strong> 
        with AI-driven content recommendations. Whether you&apos;re a seasoned professional or a fresh graduate, 
        our AI optimizes your resume to make it stand out to recruiters.
      </p>

      <p className="mt-6 text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
        With <strong>intelligent keyword suggestions</strong>, <strong>role-specific content</strong>, and <strong>real-time feedback</strong>, 
        ResumeX ensures your resume meets industry standards and increases your chances of landing interviews.
      </p>

      <p className="mt-6 text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
        Say goodbye to writer’s block—our AI crafts compelling summaries, bullet points, and 
        professional achievements in seconds. <strong>Start building your AI-powered resume today.</strong>
      </p>

    </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20 px-6">
      <h2 className="text-4xl font-bold text-center text-gray-900">What Our Users Say</h2>
      <p className="mt-4 text-lg text-center text-gray-600">Real stories from professionals who landed jobs with ResumeX.</p>

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
          <div key={index} className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
            <div className="flex justify-center">
              <Star className="text-yellow-500 w-10 h-10" />
            </div>
            <p className="mt-4 text-gray-700">{testimonial.feedback}</p>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{testimonial.name}</h3>
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

      <section className="py-20 px-6 bg-gray-100 text-center">
  <h2 className="text-4xl font-bold text-gray-900">Need Help? Contact Us</h2>
  <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
    Have questions or need support? Reach out to us via email or phone, or start a chat with our AI-powered assistant.
  </p>

  <div className="mt-12 max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
    {/* Contact Info */}
    <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-900">Contact Support</h3>
      <ul className="mt-4 space-y-3 text-left">
        <li className="flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H3M16 12l-4 4m4-4l-4-4"></path>
          </svg>
          <span>support@resumex.com</span>
        </li>
        <li className="flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M3 12h18M3 19h18"></path>
          </svg>
          <span>+1 (123) 456-7890</span>
        </li>
      </ul>
    </div>

    {/*Chatbot Help */}
    <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-900">Chat with AI Assistant</h3>
      <p className="mt-2 text-gray-600">
        Need quick answers? Our chatbot can assist you instantly.
      </p>
      <div className="mt-12">
          <button
            onClick={() => setChatOpen(true)}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            Start Chat
          </button>
        </div>
    </div>
  </div>
</section>
 
         {/* Chatbot Sidebar */}
      {chatOpen && (
        <div className="fixed bottom-20 right-10 bg-white shadow-xl border border-gray-300 rounded-xl p-4 w-80 h-[450px] flex flex-col">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-lg font-semibold text-gray-900">ResumeX AI Chatbot</h3>
            <button onClick={() => setChatOpen(false)} className="text-gray-600 hover:text-gray-800">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-3 space-y-3 text-gray-600">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`p-3 rounded-lg max-w-[80%] ${msg.sender === "bot" ? "bg-gray-200 text-gray-900 self-start" : "bg-blue-500 text-white self-end"}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="flex items-center border-t pt-3">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      <Footer /> {/* Footer at the bottom */}
    </div>
  );
}

