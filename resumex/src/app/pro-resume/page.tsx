"use client";

import { useState } from "react";
import Header from "src/app/_components/Header";
import Footer from "src/app/_components/Footer";

export default function ResumePage() {
  const [resumeData, setResumeData] = useState({
    name: "John Doe",
    summary: "Aspiring software developer passionate about building impactful tools.",
    skills: ["JavaScript", "React", "Node.js"],
    experience: [
      { jobTitle: "", company: "", description: "" },
    ],
    education: [
      { degree: "", school: "", year: "" },
    ],
  });

  const [loading, setLoading] = useState(false);

  const improveSummary = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary: resumeData.summary }),
      });
  
      const data = await res.json();
  
      if (!data.summary) {
        throw new Error("No summary received");
      }
  
      setResumeData({ ...resumeData, summary: data.summary });
    } catch (error) {
      console.error("Failed to improve summary:", error);
      alert("AI summary improvement failed.");
    }
    setLoading(false);
  };

  const addExperience = () =>
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, { jobTitle: "", company: "", description: "" }],
    });

  const addEducation = () =>
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { degree: "", school: "", year: "" }],
    });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Editor */}
        <div className="bg-white p-6 rounded-xl shadow space-y-6">
          <h2 className="text-xl font-semibold">Edit Resume</h2>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={resumeData.name}
              className="w-full border p-2 rounded mt-1"
              onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium">Professional Summary</label>
            <textarea
              value={resumeData.summary}
              className="w-full border p-2 rounded mt-1"
              rows={4}
              onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
            />
            <button
              onClick={improveSummary}
              disabled={loading}
              className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Improving..." : "✨ Improve My Summary"}
            </button>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium">Skills (comma separated)</label>
            <input
              type="text"
              value={resumeData.skills.join(", ")}
              className="w-full border p-2 rounded mt-1"
              onChange={(e) =>
                setResumeData({
                  ...resumeData,
                  skills: e.target.value.split(",").map((s) => s.trim()),
                })
              }
            />
          </div>

          {/* Experience */}
          <div>
            <h3 className="font-medium mt-4">Work Experience</h3>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="border-t pt-4 space-y-2">
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Job Title"
                  value={exp.jobTitle}
                  onChange={(e) => {
                    const updated = [...resumeData.experience];
                    updated[index].jobTitle = e.target.value;
                    setResumeData({ ...resumeData, experience: updated });
                  }}
                />
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => {
                    const updated = [...resumeData.experience];
                    updated[index].company = e.target.value;
                    setResumeData({ ...resumeData, experience: updated });
                  }}
                />
                <textarea
                  className="w-full border p-2 rounded"
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => {
                    const updated = [...resumeData.experience];
                    updated[index].description = e.target.value;
                    setResumeData({ ...resumeData, experience: updated });
                  }}
                />
              </div>
            ))}
            <button
              className="mt-2 text-sm text-indigo-700 hover:underline"
              onClick={addExperience}
            >
              ➕ Add Experience
            </button>
          </div>

          {/* Education */}
          <div>
            <h3 className="font-medium mt-4">Education</h3>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="border-t pt-4 space-y-2">
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => {
                    const updated = [...resumeData.education];
                    updated[index].degree = e.target.value;
                    setResumeData({ ...resumeData, education: updated });
                  }}
                />
                <input
                  className="w-full border p-2 rounded"
                  placeholder="School"
                  value={edu.school}
                  onChange={(e) => {
                    const updated = [...resumeData.education];
                    updated[index].school = e.target.value;
                    setResumeData({ ...resumeData, education: updated });
                  }}
                />
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) => {
                    const updated = [...resumeData.education];
                    updated[index].year = e.target.value;
                    setResumeData({ ...resumeData, education: updated });
                  }}
                />
              </div>
            ))}
            <button
              className="mt-2 text-sm text-indigo-700 hover:underline"
              onClick={addEducation}
            >
              ➕ Add Education
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white p-6 rounded-xl shadow h-fit">
          <h1 className="text-3xl font-bold">{resumeData.name}</h1>

          <h2 className="mt-4 text-lg font-semibold text-gray-600">Professional Summary</h2>
          <p className="mt-2 text-gray-800 whitespace-pre-line">{resumeData.summary}</p>

          <h2 className="mt-6 text-lg font-semibold text-gray-600">Skills</h2>
          <ul className="list-disc ml-6 text-gray-800">
            {resumeData.skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>

          <h2 className="mt-6 text-lg font-semibold text-gray-600">Experience</h2>
          {resumeData.experience.map((exp, idx) => (
            <div key={idx} className="mt-3">
              <h3 className="text-md font-medium">{exp.jobTitle}</h3>
              <p className="text-sm italic">{exp.company}</p>
              <p className="text-sm">{exp.description}</p>
            </div>
          ))}

          <h2 className="mt-6 text-lg font-semibold text-gray-600">Education</h2>
          {resumeData.education.map((edu, idx) => (
            <div key={idx} className="mt-3">
              <h3 className="text-md font-medium">{edu.degree}</h3>
              <p className="text-sm italic">{edu.school}</p>
              <p className="text-sm">{edu.year}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
