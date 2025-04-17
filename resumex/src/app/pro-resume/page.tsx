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
    extras: [{ title: "", description: "" }],
  });

  const [showExtras, setShowExtras] = useState(false);
  const [sectionOrder, setSectionOrder] = useState([
    "summary",
    "skills",
    "experience",
    "education",
    "extras",
  ]);

  const [theme, setTheme] = useState("modern");

  const moveSection = (section: string, direction: "up" | "down") => {
    const index = sectionOrder.indexOf(section);
    const newOrder = [...sectionOrder];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < sectionOrder.length) {
      [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
      setSectionOrder(newOrder);
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

  const deleteEntry = (section: string, index: number) => {
    const updated = [...(resumeData as any)[section]];
    updated.splice(index, 1);
    setResumeData({ ...resumeData, [section]: updated });
  };

  const themeClasses = {
    modern: "text-left font-sans text-gray-900",
    classic: "text-left font-serif text-gray-900 underline decoration-gray-300 decoration-1",
    compact: "text-left text-sm font-sans text-gray-800 leading-tight",
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left Panel */}
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

          {/* Name / Email / Phone */}
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
              <div key={sec} className="flex justify-between items-center mt-2 text-sm bg-gray-100 px-3 py-1 rounded">
                <span className="capitalize">{sec}</span>
                <div className="space-x-2">
                  <button onClick={() => moveSection(sec, "up")} disabled={idx === 0}>↑</button>
                  <button onClick={() => moveSection(sec, "down")} disabled={idx === sectionOrder.length - 1}>↓</button>
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
          </div>

          {/* Skills */}
          <div>
            <label className="block font-medium">Skills (comma separated)</label>
            <input
              className="w-full border p-2 rounded"
              value={resumeData.skills.join(", ")}
              onChange={(e) =>
                setResumeData({ ...resumeData, skills: e.target.value.split(",").map((s) => s.trim()) })
              }
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block font-medium">Experience</label>
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="border-t pt-2 mt-2 space-y-2">
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Job Title"
                  value={exp.jobTitle}
                  onChange={(e) => {
                    const updated = [...resumeData.experience];
                    updated[idx].jobTitle = e.target.value;
                    setResumeData({ ...resumeData, experience: updated });
                  }}
                />
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => {
                    const updated = [...resumeData.experience];
                    updated[idx].company = e.target.value;
                    setResumeData({ ...resumeData, experience: updated });
                  }}
                />
                <textarea
                  className="w-full border p-2 rounded"
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => {
                    const updated = [...resumeData.experience];
                    updated[idx].description = e.target.value;
                    setResumeData({ ...resumeData, experience: updated });
                  }}
                />
                <button
                  onClick={() => deleteEntry("experience", idx)}
                  className="text-xs text-red-600 hover:underline"
                >
                  🗑 Delete
                </button>
              </div>
            ))}
            <button
              className="mt-2 text-sm text-indigo-700 hover:underline"
              onClick={() =>
                setResumeData({
                  ...resumeData,
                  experience: [...resumeData.experience, { jobTitle: "", company: "", description: "" }],
                })
              }
            >
              ➕ Add Experience
            </button>
          </div>

          {/* Education */}
          <div>
            <label className="block font-medium">Education</label>
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="border-t pt-2 mt-2 space-y-2">
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => {
                    const updated = [...resumeData.education];
                    updated[idx].degree = e.target.value;
                    setResumeData({ ...resumeData, education: updated });
                  }}
                />
                <input
                  className="w-full border p-2 rounded"
                  placeholder="School"
                  value={edu.school}
                  onChange={(e) => {
                    const updated = [...resumeData.education];
                    updated[idx].school = e.target.value;
                    setResumeData({ ...resumeData, education: updated });
                  }}
                />
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) => {
                    const updated = [...resumeData.education];
                    updated[idx].year = e.target.value;
                    setResumeData({ ...resumeData, education: updated });
                  }}
                />
                <button
                  onClick={() => deleteEntry("education", idx)}
                  className="text-xs text-red-600 hover:underline"
                >
                  🗑 Delete
                </button>
              </div>
            ))}
            <button
              className="mt-2 text-sm text-indigo-700 hover:underline"
              onClick={() =>
                setResumeData({
                  ...resumeData,
                  education: [...resumeData.education, { degree: "", school: "", year: "" }],
                })
              }
            >
              ➕ Add Education
            </button>
          </div>

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
        <div ref={resumeRef} className={`bg-white p-6 rounded-xl shadow h-fit space-y-6 ${themeClasses[theme]}`}>
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
                  showExtras && (
                    <section key="extras">
                      <h2 className="text-lg font-semibold">Projects / Certifications</h2>
                      {resumeData.extras.map((item, idx) => (
                        <div key={idx} className="mt-3">
                          <h3 className="text-md font-medium">{item.title}</h3>
                          <p className="text-sm">{item.description}</p>
                        </div>
                      ))}
                    </section>
                  )
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
