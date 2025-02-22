"use client";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Link from "next/link";

export default function Homepage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header /> {/* Header at the top */}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold">Build Your Resume with AI</h1>
        <p className="mt-4 text-lg">
          Generate professional resumes effortlessly with AI-powered templates.
        </p>
        <Link href="/free-resume">
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 transition">
            Get Started for Free
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800">Why Choose ResumeX?</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">AI-Powered Suggestions</h3>
            <p className="mt-2 text-gray-600">Get personalized resume suggestions tailored to your experience.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Customizable Templates</h3>
            <p className="mt-2 text-gray-600">Choose from professional designs that make you stand out.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Instant PDF Export</h3>
            <p className="mt-2 text-gray-600">Download your resume instantly in high-quality PDF format.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-200 py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">How It Works</h2>
        <div className="mt-8 max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-6 bg-white shadow-lg rounded-lg p-6">
            <span className="text-2xl font-bold text-blue-500">1</span>
            <p className="text-lg text-gray-600">Sign up and create your account.</p>
          </div>
          <div className="flex items-center gap-6 bg-white shadow-lg rounded-lg p-6">
            <span className="text-2xl font-bold text-blue-500">2</span>
            <p className="text-lg text-gray-600">Select a template and enter your details.</p>
          </div>
          <div className="flex items-center gap-6 bg-white shadow-lg rounded-lg p-6">
            <span className="text-2xl font-bold text-blue-500">3</span>
            <p className="text-lg text-gray-600">Generate and download your AI-optimized resume.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800">What Our Users Say</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-lg">
          <p className="text-gray-600 italic">
  &quot;ResumeX helped me land my dream job! The AI suggestions were spot on.&quot;
</p>

            <h4 className="mt-4 text-sm font-semibold text-gray-800">- Alex Johnson</h4>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <p className="text-gray-600 italic">
            &quot;Super easy to use! The templates look professional and modern.&quot;
            </p>
            <h4 className="mt-4 text-sm font-semibold text-gray-800">- Sarah Lee</h4>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white text-center py-16">
        <h2 className="text-3xl font-bold">Start Building Your Resume Today</h2>
        <p className="mt-4 text-lg">Join thousands of professionals using ResumeX.</p>
        <Link href="/register">
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 transition">
            Sign Up Now
          </button>
        </Link>
      </section>

      <Footer /> {/* Footer at the bottom */}
    </div>
  );
}
