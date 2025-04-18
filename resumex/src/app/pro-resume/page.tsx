"use client";

import { useState, useRef } from "react";
import Header from "src/app/_components/Header";
import Footer from "src/app/_components/Footer";

const ResumePage = () => {
  const resumeRef = useRef(null);

  const [resumeData, setResumeData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    summary: "Aspiring software developer passionate about building impactful tools.",
    skills: ["JavaScript", "React", "Node.js"],
    experience: [{ jobTitle: "", company: "", description: "" }],
    education: [{ degree: "", school: "", year: "" }],
    customSections: [
      {
        heading: "Projects / Certifications",
        items: [{ title: "", description: "" }],
      },
    ],
  });

  const [theme, setTheme] = useState("modern");
  const [sectionOrder, setSectionOrder] = useState([
    "summary",
    "skills",
    "experience",
    "education",
    "extras",
  ]);

  const [aiLoading, setAiLoading] = useState({
    summary: false,
    skills: false,
    exp: {} as Record<number, boolean>,
  });

  const moveSection = (section: string, direction: "up" | "down") => {
    const index = sectionOrder.indexOf(section);
    const newOrder = [...sectionOrder];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < sectionOrder.length) {
      [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
      setSectionOrder(newOrder);
    }
  };

  const callAI = async (
    type: "summary" | "skills" | "experience",
    input: string
  ): Promise<string> => {
    try {
      const res = await fetch("/api/ai-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, input }),
      });
      const data = await res.json();
      return data.result || "";
    } catch {
      alert("Failed to contact AI.");
      return "";
    }
  };

  const exportPDF = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    if (resumeRef.current) {
      html2pdf()
        .from(resumeRef.current)
        .set({
          margin: 0.5,
          filename: `${resumeData.name.replace(/\s+/g, "_")}_Resume.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .save();
    }
  };

  const themeClasses = {
    modern: "text-left font-sans text-gray-900",
    classic: "text-left font-serif text-gray-900 underline decoration-gray-300",
    compact: "text-left text-sm font-sans text-gray-800 leading-tight",
  };

  const deleteEntry = (section: string, index: number, customIndex?: number) => {
    if (section === "customSections" && customIndex !== undefined) {
      const updated = [...resumeData.customSections];
      updated[customIndex].items.splice(index, 1);
      setResumeData({ ...resumeData, customSections: updated });
    } else {
      const updated = [...(resumeData as any)[section]];
      updated.splice(index, 1);
      setResumeData({ ...resumeData, [section]: updated });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left Editor Panel */}
        <div className="bg-white p-6 rounded-xl shadow space-y-6">
          <h2 className="text-xl font-semibold">Edit Resume</h2>

          {/* Theme Selector */}
          <div>
            <label className="block font-medium mb-1">Select Theme</label>
            <select
              className="w-full border rounded p-2"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="compact">Compact</option>
            </select>
          </div>

          {/* Name/Email/Phone */}
          <div>
            <label className="block font-medium">Name</label>
            <input
              className="w-full border p-2 rounded"
              value={resumeData.name}
              onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              className="w-full border p-2 rounded"
              value={resumeData.email}
              onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-medium">Phone</label>
            <input
              className="w-full border p-2 rounded"
              value={resumeData.phone}
              onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
            />
          </div>

          {/* Section Reorder */}
          <div>
            <h3 className="font-semibold">Reorder Sections</h3>
            {sectionOrder.map((sec, idx) => (
              <div
                key={sec}
                className="flex justify-between items-center mt-2 text-sm bg-gray-100 px-3 py-1 rounded"
              >
                <span className="capitalize">{sec}</span>
                <div className="space-x-2">
                  <button onClick={() => moveSection(sec, "up")} disabled={idx === 0}>
                    ↑
                  </button>
                  <button
                    onClick={() => moveSection(sec, "down")}
                    disabled={idx === sectionOrder.length - 1}
                  >
                    ↓
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <label className="block font-medium">Summary</label>
            <textarea
              className="w-full border p-2 rounded"
              rows={3}
              value={resumeData.summary}
              onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
            />
            <button
              onClick={async () => {
                setAiLoading((prev) => ({ ...prev, summary: true }));
                const newSummary = await callAI("summary", resumeData.summary);
                setResumeData({ ...resumeData, summary: newSummary });
                setAiLoading((prev) => ({ ...prev, summary: false }));
              }}
              disabled={aiLoading.summary}
              className="mt-2 text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200 transition disabled:opacity-50"
            >
              {aiLoading.summary ? "Improving..." : "✨ Improve Summary with AI"}
            </button>
          </div>

          {/* Skills */}
          <div>
            <label className="block font-medium">Skills (comma separated)</label>
            <input
              className="w-full border p-2 rounded"
              value={resumeData.skills.join(", ")}
              onChange={(e) =>
                setResumeData({
                  ...resumeData,
                  skills: e.target.value.split(",").map((s) => s.trim()),
                })
              }
            />
            <button
              onClick={async () => {
                setAiLoading((prev) => ({ ...prev, skills: true }));
                const newSkills = await callAI("skills", resumeData.summary);
                setResumeData({
                  ...resumeData,
                  skills: newSkills.split(",").map((s) => s.trim()),
                });
                setAiLoading((prev) => ({ ...prev, skills: false }));
              }}
              disabled={aiLoading.skills}
              className="mt-2 text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200 transition disabled:opacity-50"
            >
              {aiLoading.skills ? "Generating..." : "⚡ Generate Skills with AI"}
            </button>
          </div>

          {/* Experience */}
          {/* ... Your experience and education editors remain the same ... */}

          {/* Custom Sections */}
          {resumeData.customSections.map((section, sIdx) => (
            <div key={sIdx} className="mt-4">
              <input
                className="w-full border p-2 rounded font-semibold"
                placeholder="Section Heading"
                value={section.heading}
                onChange={(e) => {
                  const updated = [...resumeData.customSections];
                  updated[sIdx].heading = e.target.value;
                  setResumeData({ ...resumeData, customSections: updated });
                }}
              />
              {section.items.map((item, idx) => (
                <div key={idx} className="border-t pt-2 mt-2 space-y-2">
                  <input
                    className="w-full border p-2 rounded"
                    placeholder="Title"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...resumeData.customSections];
                      updated[sIdx].items[idx].title = e.target.value;
                      setResumeData({ ...resumeData, customSections: updated });
                    }}
                  />
                  <textarea
                    className="w-full border p-2 rounded"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => {
                      const updated = [...resumeData.customSections];
                      updated[sIdx].items[idx].description = e.target.value;
                      setResumeData({ ...resumeData, customSections: updated });
                    }}
                  />
                  <button
                    onClick={() => deleteEntry("customSections", idx, sIdx)}
                    className="text-xs text-red-600 hover:underline"
                  >
                    ❌ Delete
                  </button>
                </div>
              ))}
              <button
                className="mt-2 text-sm text-indigo-700 hover:underline"
                onClick={() => {
                  const updated = [...resumeData.customSections];
                  updated[sIdx].items.push({ title: "", description: "" });
                  setResumeData({ ...resumeData, customSections: updated });
                }}
              >
                ➕ Add Item
              </button>
            </div>
          ))}
          <button
            className="mt-4 text-sm text-green-700 hover:underline"
            onClick={() =>
              setResumeData({
                ...resumeData,
                customSections: [
                  ...resumeData.customSections,
                  { heading: "New Section", items: [{ title: "", description: "" }] },
                ],
              })
            }
          >
            ➕ Add Custom Section
          </button>

          {/* Export */}
          <div className="pt-4">
            <button
              onClick={exportPDF}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              🖨 Export to PDF
            </button>
          </div>
        </div>

        {/* Right Preview Panel */}
        <div
          ref={resumeRef}
          className={`bg-white p-6 rounded-xl shadow h-fit space-y-6 ${themeClasses[theme]}`}
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold">{resumeData.name}</h1>
            <p className="text-sm text-gray-600">
              {resumeData.email}
              {resumeData.email && resumeData.phone && " | "}
              {resumeData.phone}
            </p>
            <hr className="my-4 border-gray-300" />
          </div>

          {sectionOrder.map((sectionKey) => {
            switch (sectionKey) {
              case "summary":
                return (
                  <section key="summary">
                    <h2 className="text-lg font-semibold">Professional Summary</h2>
                    <p className="mt-2">{resumeData.summary}</p>
                  </section>
                );
              case "skills":
                return (
                  <section key="skills">
                    <h2 className="text-lg font-semibold">Skills</h2>
                    <ul className="list-disc ml-6">
                      {resumeData.skills.map((skill, idx) => (
                        <li key={idx}>{skill}</li>
                      ))}
                    </ul>
                  </section>
                );
              case "experience":
                return (
                  <section key="experience">
                    <h2 className="text-lg font-semibold">Experience</h2>
                    {resumeData.experience.map((exp, idx) => (
                      <div key={idx} className="mt-3">
                        <h3 className="text-md font-medium">{exp.jobTitle}</h3>
                        <p className="text-sm italic">{exp.company}</p>
                        <p className="text-sm">{exp.description}</p>
                      </div>
                    ))}
                  </section>
                );
              case "education":
                return (
                  <section key="education">
                    <h2 className="text-lg font-semibold">Education</h2>
                    {resumeData.education.map((edu, idx) => (
                      <div key={idx} className="mt-3">
                        <h3 className="text-md font-medium">{edu.degree}</h3>
                        <p className="text-sm italic">{edu.school}</p>
                        <p className="text-sm">{edu.year}</p>
                      </div>
                    ))}
                  </section>
                );
              case "extras":
                return (
                  <>
                    {resumeData.customSections.map((section, sIdx) => {
                      const hasContent = section.items.some(
                        (item) => item.title.trim() || item.description.trim()
                      );
                      return hasContent ? (
                        <section key={`custom-${sIdx}`}>
                          <h2 className="text-lg font-semibold">{section.heading}</h2>
                          {section.items.map((item, idx) => (
                            <div key={idx} className="mt-3">
                              {item.title && <h3 className="text-md font-medium">{item.title}</h3>}
                              {item.description && <p className="text-sm">{item.description}</p>}
                            </div>
                          ))}
                        </section>
                      ) : null;
                    })}
                  </>
                );
              default:
                return null;
            }
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResumePage;
