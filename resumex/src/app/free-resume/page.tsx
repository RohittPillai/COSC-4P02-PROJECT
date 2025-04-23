"use client"; // This marks the file as a Client Component in Next.js
// Layout component
import Header from "../_components/Header";
// React hooks
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
// Navigation and file operations
import Link from "next/link";
import { jsPDF } from "jspdf";
// Icons
import { AiOutlineLeft, AiOutlineRight, AiOutlineSync, AiOutlineCheck, AiOutlineUp, AiOutlineDown } from "react-icons/ai";
// PDF and screenshot utility
import html2canvas from "html2canvas";

import { supabase } from "~/lib/supabaseClient";

// Dynamically import resume templates so they are loaded only when needed
const Template1Page = dynamic(() => import("../templates/template1/page"));
const Template2Page = dynamic(() => import("../templates/template2/page"));
const Template3Page = dynamic(() => import("../templates/template3/page"));

// Define available templates with name and component reference
const templates = {
  template1: {
    name: "Modern Clean Resume",
    component: Template1Page,
  },
  template2: {
    name: "Creative Professional Resume",
    component: Template2Page,
  },
  template3: {
    name: "Executive Resume",
    component: Template3Page,
  },
};

/**
 * Retrieves the current user's ID from localStorage.
 * Used to personalize saved resume data.
 * @returns {string | null} The user name or null if not found.
 */
function getLoggedInUserId() {
  const userData = localStorage.getItem("userData");
  if (userData) {
    const parsed = JSON.parse(userData);
    return parsed?.name || null;
  }
  return null;
}

/**
 * FreeResume Component – Core logic and functionality before render
 *
 * - Manages selection of resume template based on URL query parameter `template`.
 * - Persists the last used template to localStorage.
 * - Loads and stores user-specific resume data using localStorage.
 * - Supports autosave functionality every 5 seconds.
 * - Provides methods to export the resume:
 *    - as PDF using html2canvas + jsPDF.
 *    - as Word (.doc) using Blob and HTML conversion.
 * - Supports generating a public sharable link via `copyToClipboard`.
 */
// Main component for the free resume builder page
export default function FreeResume() {
  const searchParams = useSearchParams(); // Get query parameters from the URL
  const template = searchParams.get("template") || "template1"; // Get selected template from URL or default to template1
  // Store the last used template in localStorage to preserve user preference
  useEffect(() => {
    if (template) {
      localStorage.setItem("lastUsedTemplate", template);
    }
  }, [template]);

  const selectedTemplate = templates[template] || templates["template1"]; // Get the selected template configuration
  // UI & state refs
  const [userId, setUserId] = useState<string | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const [resumeContent, setResumeContent] = useState("Start typing your resume...");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedContent, setLastSavedContent] = useState("");

  // Fetch user and their saved resume data from localStorage
  useEffect(() => {
    const user = getLoggedInUserId();
    if (user) {
      setUserId(user);
      const saved = localStorage.getItem(`${user}_resume`);
      if (saved) {
        setResumeData(JSON.parse(saved));
      }
    }
  }, []);

  // Save resume to localStorage (triggered manually or on autosave)
  const saveResume = async () => {
    setIsSaving(true);

    // 1. Save to localStorage
    if (userId) {
      const key = `${userId}_resume`;
      localStorage.setItem(key, JSON.stringify(resumeData));
      setLastSavedContent(JSON.stringify(resumeData));
    }

    // 2. Save to Supabase
    try {
      const { data, error } = await supabase
          .from("resumes")
          .upsert([
            {
              user_id: userId,
              template: template, // template1, template2, etc.
              data: resumeData,
            },
          ]);

      if (error) {
        console.error("Supabase save failed:", error);
      } else {
        console.log("Saved to Supabase:", data);
      }
    } catch (err) {
      console.error("Unexpected error saving to Supabase:", err);
    }

    // 3. Reset saving state after delay
    setTimeout(() => {
      setIsSaving(false);
    }, 500);
  };

  // Automatically save resume every 5 seconds when content changes
  useEffect(() => {
    const autoSaveInterval = setTimeout(() => {
      saveResume();
    }, 5000);
    return () => clearTimeout(autoSaveInterval);
  }, [resumeContent]);

  // Export the resume as a high-quality PDF
  const downloadAsPDF = async () => {
    if (!resumeRef.current) return;
  
    // Clone the node to capture it without affecting layout.
    const original = resumeRef.current;
    //const clone = original.cloneNode(true);
    const clone = original.cloneNode(true) as HTMLElement;
    clone.style.maxHeight = "none";
    clone.style.overflow = "visible";
    clone.style.height = "auto";
    clone.style.display = "block";
    clone.style.position = "absolute";
    clone.style.top = "0";
    clone.style.left = "-9999px";
    clone.style.zIndex = "-1";
    clone.style.backgroundColor = "#ffffff";
    document.body.appendChild(clone);
  
    try {
      // Allow the clone to render.
      await new Promise((res) => setTimeout(res, 300));
  
      // Capture the clone as a canvas.
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
  
      // Convert the captured canvas to a data URL.
      const imgData = canvas.toDataURL("image/png");
  
      // Initialize jsPDF with A4 dimensions in portrait (measured in points).
      const pdf = new jsPDF("p", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      // Compute scale factors for width and height.
      const scaleWidth = pdfWidth / canvas.width;
      const scaleHeight = pdfHeight / canvas.height;
      // Choose the smaller scale factor so the whole canvas fits on one page.
      const scaleFactor = Math.min(scaleWidth, scaleHeight);
  
      // Calculate the dimensions of the image when drawn on the PDF.
      const imgDisplayWidth = canvas.width * scaleFactor;
      const imgDisplayHeight = canvas.height * scaleFactor;
  
      // Center the image on the PDF page.
      const marginX = (pdfWidth - imgDisplayWidth) / 2;
      const marginY = (pdfHeight - imgDisplayHeight) / 2;
  
      // Add the image to the PDF on a single page.
      pdf.addImage(imgData, "PNG", marginX, marginY, imgDisplayWidth, imgDisplayHeight);
      pdf.save(`${template}-resume.pdf`);
    } catch (error) {
      console.error("PDF export failed:", error);
      alert("PDF generation failed. Please try again.");
    } finally {
      document.body.removeChild(clone);
    }
  };

  const shareResume = async () => {
    if (!userId) {
      alert("Please sign in to generate a shareable link.");
      return;
    }

    try {
      // Check if a resume already exists
      const { data: existing, error: fetchError } = await supabase
          .from("resumes")
          .select("id")
          .eq("user_id", userId)
          .eq("template", template)
          .single();

      if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

      let resumeId = existing?.id;

      // If not found, insert it
      if (!resumeId) {
        const { data: inserted, error: insertError } = await supabase
            .from("resumes")
            .insert([
              { user_id: userId, template, data: resumeData }
            ])
            .select("id")
            .single();

        if (insertError) throw insertError;
        resumeId = inserted.id;
      }

      // Generate public share link with the resume ID
      const shareLink = `${window.location.origin}/resume-view?id=${resumeId}`;
      try {
        await navigator.clipboard.writeText(shareLink);
        alert("Public resume link copied to clipboard!");
      } catch (clipError) {
        console.error("Clipboard write failed:", clipError);
        alert(`Resume link (copy manually):\n${shareLink}`);
      }
    } catch (err) {
      console.error("Error sharing resume:", JSON.stringify(err, null, 2));
      alert("Failed to generate shareable link.");
    }
  };

  // Default resume data (initial state)
  const [resumeData, setResumeData] = useState<any>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@gmail.com",
    phone: "111-222-3333",
    position: "Front-End Developer",
    description: "I am a front-end developer with 3+ years of experience writing HTML, CSS, and JS. I'm motivated, result-focused, and seeking a team-oriented company with growth opportunities.",
    experienceList: [
      {
        company: "KlowdBox",
        location: "San Francisco, CA",
        duration: "Jan 2011 - Feb 2015",
        position: "Front-End Developer",
        description: "Developed user-friendly interfaces, optimized front-end performance, and improved accessibility.",
      },
      {
        company: "Akount",
        location: "Santa Monica, CA",
        duration: "Jan 2015 - Present",
        position: "Senior Front-End Developer",
        description: "Led front-end team, implemented scalable UI solutions, and improved core web vitals for better SEO.",
      },
    ],
    education: [
      {
        school: "Sample Institute of Technology",
        location: "San Francisco, CA",
        year: "2011 - 2015",
        degree: "BSc in Computer Science",
      },
    ],
    projects: [
      {
        name: "DSP",
        description: "Developed a web application for real-time data visualization and analytics.",
        link: "https://example.com/dsp",
      },
      {
        name: "Portfolio Website",
        description: "Built a responsive personal portfolio using React and Tailwind CSS.",
        link: "https://example.com/portfolio",
      },
    ],
    skills: ["JavaScript", "React", "Node.js", "Next.js", "CSS", "HTML"],
    interests: ["Football", "Programming", "Gaming"],
  });

  useEffect(() => {
    const fetchResumes = async () => {
      const { data, error } = await supabase.from("resumes").select("*");
      console.log("Fetched resumes:", data);
      if (error) console.error("Error fetching resumes:", error);
    };

    fetchResumes();
  }, []);

  return (
      <div className="flex flex-col min-h-screen w-full bg-gray-100">
        <Header /> {/* Top navigation bar with app title, logo, etc. */}
        {/* Main content area including sidebar and selected resume template */}
        <main className={`flex flex-grow w-full h-screen relative pb-20 transition-all duration-300 
        ${isSidebarOpen ? "ml-[6%]" : "ml-[2%]"}`}>
          {/* Sidebar with template selection (collapsible) */}
          <aside className={`${isSidebarOpen ? "w-1/5" : "w-12"} 
          bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg 
          p-4 border-r border-gray-700 flex flex-col transition-all duration-300 
          h-[calc(100vh-4rem)] fixed top-[4rem] left-0 z-0`}>
            {/* Sidebar toggle button */}
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="self-end text-gray-400 hover:text-gray-200 mb-4">
              {isSidebarOpen ? <AiOutlineLeft size={20} /> : <AiOutlineRight size={20} />}
            </button>

            {/* Template selection buttons (visible only when sidebar is open) */}
            {isSidebarOpen && (
                <>
                  <h2 className="text-lg font-semibold mb-4">Choose Template</h2>
                  <div className="space-y-3">
                    {Object.entries(templates).map(([key, templateInfo]) => (
                        <Link
                            key={key}
                            href={`/free-resume?template=${key}`}
                            className={`block px-3 py-2 rounded-lg text-sm text-center font-medium border transition ${
                                template === key
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-800 hover:bg-blue-500 hover:text-white border"
                            }`}
                        >
                          {templateInfo.name}
                        </Link>
                    ))}
                  </div>
                </>
            )}
          </aside>

          {/* Main resume editor area */}
          <section className="flex-1 p-6 h-[96vh] flex flex-col justify-center items-center bg-gray-100 pt-20 mb-32">
            <h1 className={`text-4xl font-extrabold text-gray-900 mb-4 ${
                template === "template1" ? "mt-16" : ""
            }`}
            >
              Editing: {selectedTemplate.name}
              <div className="mt-6 flex gap-4 justify-center">
                <button
                    onClick={saveResume}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition flex items-center gap-1"
                >
                  {isSaving ? (
                      <AiOutlineSync className="animate-spin" size={16} />
                  ) : (
                      <AiOutlineCheck size={16} />
                  )}
                  Save
                </button>

                <button
                    onClick={shareResume}
                    className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded hover:bg-gray-300 transition"
                >
                  Share
                </button>
              </div>
            </h1>
            <div
                className="w-full max-w-2xl p-4 border border-gray-400 rounded-lg shadow-xl bg-white"
            >
              {selectedTemplate.component && (
                  <selectedTemplate.component data={resumeData} />
              )}
            </div>
          </section>

          {/* Hidden Resume for PDF Export */}
          <div
              ref={resumeRef}
              style={{ display: "none" }}
              className="absolute top-0 left-0 w-[794px] min-h-[1123px] bg-white p-6 z-[-1]"
          >
            {selectedTemplate.component && (
                <selectedTemplate.component data={resumeData} />
            )}
          </div>
        </main>
      </div>
  );
}
