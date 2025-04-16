"use client";

import { useState, useRef } from "react";
import Header from "src/app/_components/Header";
import Footer from "src/app/_components/Footer";

const ResumePage = () => {
  const resumeRef = useRef(null);

  const [resumeData, setResumeData] = useState({
    name: "John Doe",
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

  const renderEditor = (key: string) => {
    switch (key) {
      case "summary":
        return (
          <div className="space-y-2">
            <label className="block font-medium">Summary</label>
            <textarea
              className="w-full border p-2 rounded"
              rows={4}
              value={resumeData.summary}
              onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
            />
          </div>
        );
      case "skills":
        return (
          <div className="space-y-2">
            <label className="block font-medium">Skills (comma-separated)</label>
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
          </div>
        );
      case "experience":
        return (
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
        );
      case "education":
        return (
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
        );
      case "extras":
        return showExtras ? (
          <div>
            <label className="block font-medium">Projects / Certifications</label>
            {resumeData.extras.map((item, idx) => (
              <div key={idx} className="border-t pt-2 mt-2 space-y-2">
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Title"
                  value={item.title}
                  onChange={(e) => {
                    const updated = [...resumeData.extras];
                    updated[idx].title = e.target.value;
                    setResumeData({ ...resumeData, extras: updated });
                  }}
                />
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Description or link"
                  value={item.description}
                  onChange={(e) => {
                    const updated = [...resumeData.extras];
                    updated[idx].description = e.target.value;
                    setResumeData({ ...resumeData, extras: updated });
                  }}
                />
                <button
                  onClick={() => deleteEntry("extras", idx)}
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
                  extras: [...resumeData.extras, { title: "", description: "" }],
                })
              }
            >
              ➕ Add Project / Certification
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowExtras(true)}
            className="mt-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded hover:bg-indigo-200"
          >
            ➕ Add Projects / Certifications
          </button>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left: Editor */}
        <div className="bg-white p-6 rounded-xl shadow space-y-6">
          <h2 className="text-xl font-semibold">Edit Resume</h2>

          {/* Name */}
          <div>
            <label className="block font-medium">Name</label>
            <input
              className="w-full border p-2 rounded"
              value={resumeData.name}
              onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
            />
          </div>

          {/* Reorder Controls */}
          <div>
            <h3 className="font-semibold mt-4">Reorder Sections</h3>
            {sectionOrder.map((sec, idx) => (
              <div key={sec} className="flex justify-between items-center mt-2 text-sm bg-gray-100 px-3 py-1 rounded">
                <span className="capitalize">{sec}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => moveSection(sec, "up")}
                    className="text-blue-600 hover:underline"
                    disabled={idx === 0}
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveSection(sec, "down")}
                    className="text-blue-600 hover:underline"
                    disabled={idx === sectionOrder.length - 1}
                  >
                    ↓
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Section Inputs */}
          {sectionOrder.map((section) => (
            <div key={section}>{renderEditor(section)}</div>
          ))}

          {/* Export Button */}
          <div className="pt-4">
            <button
              onClick={exportPDF}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              🖨 Export to PDF
            </button>
          </div>
        </div>

        {/* Right: Preview */}
        <div ref={resumeRef} className="bg-white p-6 rounded-xl shadow h-fit space-y-6 text-left">
          <h1 className="text-3xl font-bold text-gray-900">{resumeData.name}</h1>
          {sectionOrder.map((section) => {
            const render = {
              summary: (
                <>
                  <h2 className="text-lg font-semibold text-gray-600">Professional Summary</h2>
                  <p className="mt-2 text-gray-800 whitespace-pre-line">{resumeData.summary}</p>
                </>
              ),
              skills: (
                <>
                  <h2 className="text-lg font-semibold text-gray-600">Skills</h2>
                  <ul className="list-disc ml-6 text-gray-800">
                    {resumeData.skills.map((skill, idx) => <li key={idx}>{skill}</li>)}
                  </ul>
                </>
              ),
              experience: (
                <>
                  <h2 className="text-lg font-semibold text-gray-600">Experience</h2>
                  {resumeData.experience.map((exp, idx) => (
                    <div key={idx} className="mt-3">
                      <h3 className="text-md font-medium">{exp.jobTitle}</h3>
                      <p className="text-sm italic">{exp.company}</p>
                      <p className="text-sm">{exp.description}</p>
                    </div>
                  ))}
                </>
              ),
              education: (
                <>
                  <h2 className="text-lg font-semibold text-gray-600">Education</h2>
                  {resumeData.education.map((edu, idx) => (
                    <div key={idx} className="mt-3">
                      <h3 className="text-md font-medium">{edu.degree}</h3>
                      <p className="text-sm italic">{edu.school}</p>
                      <p className="text-sm">{edu.year}</p>
                    </div>
                  ))}
                </>
              ),
              extras: showExtras && (
                <>
                  <h2 className="text-lg font-semibold text-gray-600">Projects / Certifications</h2>
                  {resumeData.extras.map((item, idx) => (
                    <div key={idx} className="mt-3">
                      <h3 className="text-md font-medium">{item.title}</h3>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  ))}
                </>
              ),
            };
            return <div key={section}>{render[section]}</div>;
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResumePage;
