"use client";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose, AiOutlineSync, AiOutlineCheck, AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import dynamic from "next/dynamic";
import { useRef } from "react";
import html2canvas from "html2canvas";

const Template1Page = dynamic(() => import("../templates/template1/page"));
const Template2Page = dynamic(() => import("../templates/template2/page"));
const Template3Page = dynamic(() => import("../templates/template3/page"));

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

function getLoggedInUserId() {
  const userData = localStorage.getItem("userData");
  if (userData) {
    const parsed = JSON.parse(userData);
    return parsed?.name || null;
  }
  return null;
}

export default function FreeResume() {
  const searchParams = useSearchParams();
  const template = searchParams.get("template") || "template1";
  const selectedTemplate = templates[template] || templates["template1"];
  const [userId, setUserId] = useState<string | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  const [resumeContent, setResumeContent] = useState("Start typing your resume...");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedContent, setLastSavedContent] = useState("");
  const [isFooterMinimized, setIsFooterMinimized] = useState(true); // Default: Minimized footer

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

  const saveResume = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      if (!userId) return;
      const key = `${userId}_resume`;
      localStorage.setItem(key, JSON.stringify(resumeData));
      setLastSavedContent(JSON.stringify(resumeData));
     // alert("Resume saved for your user ID!");
    }, 500);
  };

  useEffect(() => {
    const autoSaveInterval = setTimeout(() => {
      saveResume();
    }, 5000);

    return () => clearTimeout(autoSaveInterval);
  }, [resumeContent]);

  const downloadAsPDF = async () => {
    if (!resumeRef.current) return;
  
    // Clone the node to capture it without affecting layout.
    const original = resumeRef.current;
    const clone = original.cloneNode(true);
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
  
  const downloadAsWord = () => {
    if (!resumeRef.current) return;

    const content = resumeRef.current.innerHTML;

    const leftContent =
        resumeRef.current.querySelector(".left-column")?.innerHTML ||
        resumeRef.current.querySelector("div[class*='col-span-5']")?.innerHTML;

    const rightContent =
        resumeRef.current.querySelector(".right-column")?.innerHTML ||
        resumeRef.current.querySelector("div[class*='col-span-6']")?.innerHTML;

    const isSplitLayout = template === "template2" || template === "template3";

    const html = `
  <html xmlns:o='urn:schemas-microsoft-com:office:office'
        xmlns:w='urn:schemas-microsoft-com:office:word'
        xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <meta charset='utf-8'>
    <title>Resume</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
        background: white;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      td {
        vertical-align: top;
        padding: 10px;
      }
      .left-column {
        width: 30%;
        background-color: #1e293b;
        color: white;
        padding: 20px;
      }
      .right-column {
        width: 70%;
        background-color: #f9fafb;
        padding: 20px;
      }
      h1, h2, h3 {
        margin-top: 0;
      }
      a {
        color: #3b82f6;
      }
    </style>
  </head>
  <body>
    ${
        isSplitLayout
            ? `
      <table>
        <tr>
          <td class="left-column">
            ${leftContent || "<p>Left side missing</p>"}
          </td>
          <td class="right-column">
            ${rightContent || content}
          </td>
        </tr>
      </table>
    `
            : `
      <div>${content}</div>
    `
    }
  </body>
  </html>
`;

    const blob = new Blob(["\ufeff", html], {
      type: "application/msword",
    });

    saveAs(blob, `${template}-resume.doc`);
  };


  const copyToClipboard = () => {
    if (!userId) {
      alert("Please sign in to generate a shareable link.");
      return;
    }

    const shareLink = `${window.location.origin}/resume-view?user=${encodeURIComponent(userId)}&template=${encodeURIComponent(template)}`;
    navigator.clipboard.writeText(shareLink);
    alert("Shareable resume link copied to clipboard!");
  };


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

  return (
      <div className="flex flex-col min-h-screen w-full bg-gray-100">
        <Header />

        <main className={`flex flex-grow w-full h-screen relative pb-20 transition-all duration-300 
    ${isSidebarOpen ? "ml-[6%]" : "ml-[2%]"}`}>

          <aside className={`${isSidebarOpen ? "w-1/5" : "w-12"} 
          bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg 
          p-4 border-r border-gray-700 flex flex-col transition-all duration-300 
          h-[calc(100vh-4rem)] fixed top-[4rem] left-0 z-0`}>


            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="self-end text-gray-400 hover:text-gray-200 mb-4">
              {isSidebarOpen ? <AiOutlineLeft size={20} /> : <AiOutlineRight size={20} />}
            </button>
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

          <section className="flex-1 p-6 h-[96vh] flex flex-col justify-center items-center bg-gray-100 pt-20 mb-32">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
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
                    onClick={() => {
                      if (!userId) {
                        alert("Please sign in to generate a shareable link.");
                        return;
                      }
                      const link = `${window.location.origin}/resume-view?user=${encodeURIComponent(userId)}&template=${encodeURIComponent(template)}`;
                      navigator.clipboard.writeText(link);
                      alert("Public resume link copied to clipboard!");
                    }}
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

        {/* Collapsible Footer */}
        <div
            className={`bg-gray-900 text-white transition-all duration-300 ${
                isFooterMinimized ? "h-12" : "h-20"
            } flex items-center justify-center relative`}
        >
          {/* Toggle Button */}
          <button
              onClick={() => setIsFooterMinimized((prev) => !prev)}
              className="absolute top-[-10px] bg-gray-900 text-white p-2 rounded-full border border-gray-700"
          >
            {isFooterMinimized ? <AiOutlineUp size={16} /> : <AiOutlineDown size={16} />}
          </button>

          {/*for gap before footer*/}
          <div className="h-40"></div>

          {/* Footer Content */}
          <div className="flex-1 flex justify-between items-center text-sm px-4">
            <span>© 2025 ResumeX</span>
            {!isFooterMinimized && (
                <div className="flex items-center gap-4">
                  <a href="#" className="hover:text-blue-400">About</a>
                  <a href="#" className="hover:text-blue-400">Resume Builder</a>
                  <a href="#" className="hover:text-blue-400">Templates</a>
                  <a href="mailto:support@resumex.com" className="hover:text-blue-400">Contact</a>
                </div>
            )}
          </div>
        </div>
      </div>
  );
}
