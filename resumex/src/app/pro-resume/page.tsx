"use client"

import React from "react"
import { useState, useRef } from "react"
import Header from "../_components/Header"
import Footer from "../_components/Footer"

// Add type declaration for html2pdf.js
declare module "html2pdf.js" {
  interface Html2PdfOptions {
    margin?: number
    filename?: string
    image?: { type: string; quality: number }
    html2canvas?: { scale: number }
    jsPDF?: { unit: string; format: string; orientation: string }
  }

  interface Html2PdfResult {
    from: (element: HTMLElement) => {
      set: (options: Html2PdfOptions) => {
        save: () => void
      }
    }
  }

  function html2pdf(): Html2PdfResult
  export default html2pdf
}

interface ResumeData {
  name: string
  email: string
  phone: string
  summary: string
  skills: string[]
  experience: Array<{
    jobTitle: string
    company: string
    description: string
    from: string
    to: string
  }>
  education: Array<{
    degree: string
    school: string
    year: string
    from: string
    to: string
  }>
  customSections: Array<{
    heading: string
    items: Array<{
      title: string
      description: string
    }>
  }>
}

interface AIResponse {
  result: string
}

interface SectionData {
  [key: string]: any[]
}

const ResumePage = () => {
  const resumeRef = useRef<HTMLDivElement>(null)

  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    summary: "Aspiring software developer passionate about building impactful tools.",
    skills: ["JavaScript", "React", "Node.js"],
    experience: [{ jobTitle: "", company: "", description: "", from: "", to: "" }],
    education: [{ degree: "", school: "", year: "", from: "", to: "" }],
    customSections: [
      {
        heading: "Projects / Certifications",
        items: [{ title: "", description: "" }],
      },
    ],
  })

  type ResumeSection = keyof ResumeData

  const [theme, setTheme] = useState("modern")
  const [sectionOrder, setSectionOrder] = useState([
    "summary",
    "skills",
    "experience",
    "education",
    ...resumeData.customSections.map((_, idx) => `custom-${idx}`),
  ])

  const [aiLoading, setAiLoading] = useState({
    summary: false,
    skills: false,
    exp: {} as Record<number, boolean>,
  })

  const moveSection = (section: string, direction: "up" | "down") => {
    const index = sectionOrder.indexOf(section)
    // If section not found (like for new custom sections), add it to the end
    if (index === -1 && section.startsWith("custom-")) {
      setSectionOrder([...sectionOrder, section])
      return
    }

    const newOrder = [...sectionOrder]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex >= 0 && targetIndex < sectionOrder.length) {
      ;[newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]]
      setSectionOrder(newOrder)
    }
  }

  // Update sectionOrder when custom sections change
  React.useEffect(() => {
    // Get current custom section IDs
    const currentCustomSections = sectionOrder.filter((s) => s.startsWith("custom-"))
    // Get what custom sections should be based on resumeData
    const expectedCustomSections = resumeData.customSections.map((_, idx) => `custom-${idx}`)

    // If they're different, update sectionOrder
    if (JSON.stringify(currentCustomSections.sort()) !== JSON.stringify(expectedCustomSections.sort())) {
      // Keep non-custom sections in their current order
      const nonCustomSections = sectionOrder.filter((s) => !s.startsWith("custom-"))
      // Add the current custom sections
      setSectionOrder([...nonCustomSections, ...expectedCustomSections])
    }
  }, [resumeData.customSections.length])

  const callAI = async (type: "summary" | "skills" | "experience", input: string): Promise<string> => {
    try {
      const res = await fetch("/api/ai-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, input }),
      })
      const data = (await res.json()) as AIResponse
      return data.result
    } catch {
      alert("Failed to contact AI.")
      return ""
    }
  }

  const exportPDF = async () => {
    const html2pdf = (await import("html2pdf.js")).default
    const element = resumeRef.current
    if (element) {
      html2pdf()
        .from(element)
        .set({
          margin: 0.5,
          filename: `${resumeData.name.replace(/\s+/g, "_")}_Resume.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .save()
    }
  }

  const themeClasses = {
    modern:
      "text-left font-sans text-gray-900 space-y-6 leading-relaxed tracking-normal text-base [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-semibold",
    classic:
      "text-left font-serif text-gray-800 space-y-8 border border-gray-300 p-6 rounded-xl bg-[#fdfaf5] shadow-md [&_h2]:text-xl [&_h2]:underline decoration-gray-500 [&_h3]:italic",
    compact:
      "text-left text-xs font-mono text-gray-700 leading-snug space-y-2 tracking-tight [&_h2]:text-sm [&_h2]:uppercase [&_h2]:text-blue-600 [&_h2]:font-bold [&_h3]:text-xs [&_h3]:font-medium",
  }

  const deleteEntry = (section: ResumeSection, index: number, customIndex?: number) => {
    if (section === "customSections" && typeof customIndex === "number") {
      const updated = [...resumeData.customSections]
      const items = updated[customIndex]?.items
      if (items) {
        items.splice(index, 1)
        setResumeData({ ...resumeData, customSections: updated })
      }
    } else {
      const sectionData = resumeData[section]
      if (Array.isArray(sectionData)) {
        const updated = [...sectionData]
        updated.splice(index, 1)
        setResumeData({ ...resumeData, [section]: updated })
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left Editor Panel */}
        <div className="bg-white p-6 rounded-xl shadow space-y-6">
          <h2 className="text-xl font-semibold">Edit Resume</h2>

          {/* Theme Selector */}
          <div>
            <label htmlFor="theme" className="block font-medium mb-1">
              Select Theme
            </label>
            <select
              id="theme"
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
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <input
              id="name"
              className="w-full border p-2 rounded"
              value={resumeData.name}
              onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              id="email"
              className="w-full border p-2 rounded"
              value={resumeData.email}
              onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium">
              Phone
            </label>
            <input
              id="phone"
              className="w-full border p-2 rounded"
              value={resumeData.phone}
              onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
            />
          </div>

          {/* Summary */}
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="summary" className="block font-medium">
                Summary
              </label>
              <div className="space-x-2">
                <button
                  onClick={() => moveSection("summary", "up")}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveSection("summary", "down")}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
                >
                  ↓
                </button>
              </div>
            </div>
            <textarea
              id="summary"
              className="w-full border p-2 rounded"
              rows={3}
              value={resumeData.summary}
              onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
            />
            <button
              onClick={async () => {
                setAiLoading((prev) => ({ ...prev, summary: true }))
                const newSummary = await callAI("summary", resumeData.summary)
                setResumeData({ ...resumeData, summary: newSummary })
                setAiLoading((prev) => ({ ...prev, summary: false }))
              }}
              disabled={aiLoading.summary}
              className="mt-2 text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200 transition disabled:opacity-50"
            >
              {aiLoading.summary ? "Generating..." : "⚡ Rewrite Summary with AI"}
            </button>
          </div>

          {/* Skills */}
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="skills" className="block font-medium">
                Skills (comma separated)
              </label>
              <div className="space-x-2">
                <button
                  aria-label="Move section up"
                  onClick={() => moveSection("skills", "up")}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
                >
                  ↑
                </button>
                <button
                  aria-label="Move section down"
                  onClick={() => moveSection("skills", "down")}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
                >
                  ↓
                </button>
              </div>
            </div>

            <input
              id="skills"
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
                setAiLoading((prev) => ({ ...prev, skills: true }))
                const newSkills = await callAI("skills", resumeData.summary) // Use summary for AI input
                setResumeData({
                  ...resumeData,
                  skills: newSkills.split(",").map((s) => s.trim()),
                })
                setAiLoading((prev) => ({ ...prev, skills: false }))
              }}
              disabled={aiLoading.skills}
              className="mt-2 text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200 transition disabled:opacity-50"
            >
              {aiLoading.skills ? "Generating..." : "⚡ Generate Skills with AI"}
            </button>
          </div>

          {/* Experience */}
          <div>
            <div className="flex justify-between items-center mt-4">
              <h3 className="font-semibold text-lg">Experience</h3>
              <div className="space-x-2">
                <button
                  onClick={() => moveSection("experience", "up")}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
                  aria-label="Move experience section up"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveSection("experience", "down")}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
                  aria-label="Move experience section down"
                >
                  ↓
                </button>
              </div>
            </div>
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="border-t pt-2 mt-2 space-y-2">
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Job Title"
                  value={exp.jobTitle}
                  onChange={(e) => {
                    const updated = [...resumeData.experience]
                    updated[idx].jobTitle = e.target.value
                    setResumeData({ ...resumeData, experience: updated })
                  }}
                />
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => {
                    const updated = [...resumeData.experience]
                    updated[idx].company = e.target.value
                    setResumeData({ ...resumeData, experience: updated })
                  }}
                />
                <input
                  className="w-full border p-2 rounded"
                  placeholder="From (e.g. 2020)"
                  value={exp.from}
                  onChange={(e) => {
                    const updated = [...resumeData.experience]
                    updated[idx].from = e.target.value
                    setResumeData({ ...resumeData, experience: updated })
                  }}
                />
                <input
                  className="w-full border p-2 rounded"
                  placeholder="To (e.g. 2023 or Present)"
                  value={exp.to}
                  onChange={(e) => {
                    const updated = [...resumeData.experience]
                    updated[idx].to = e.target.value
                    setResumeData({ ...resumeData, experience: updated })
                  }}
                />
                <textarea
                  className="w-full border p-2 rounded"
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => {
                    const updated = [...resumeData.experience]
                    updated[idx].description = e.target.value
                    setResumeData({ ...resumeData, experience: updated })
                  }}
                />
                <button
                  onClick={async () => {
                    setAiLoading((prev) => ({
                      ...prev,
                      exp: { ...prev.exp, [idx]: true },
                    }))
                    const newDesc = await callAI("experience", exp.description)
                    const updated = [...resumeData.experience]
                    updated[idx].description = newDesc
                    setResumeData({ ...resumeData, experience: updated })
                    setAiLoading((prev) => ({
                      ...prev,
                      exp: { ...prev.exp, [idx]: false },
                    }))
                  }}
                  disabled={aiLoading.exp[idx]}
                  className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded hover:bg-purple-200 transition disabled:opacity-50"
                >
                  {aiLoading.exp[idx] ? "Rewriting..." : "✨ Rewrite with AI"}
                </button>
                <button onClick={() => deleteEntry("experience", idx)} className="text-xs text-red-600 hover:underline">
                  ❌ Delete
                </button>
              </div>
            ))}
            <button
              className="mt-2 text-sm text-indigo-700 hover:underline"
              onClick={() =>
                setResumeData({
                  ...resumeData,
                  experience: [
                    ...resumeData.experience,
                    { jobTitle: "", company: "", description: "", from: "", to: "" },
                  ],
                })
              }
            >
              ➕ Add Experience
            </button>
          </div>

          {/* Education */}
          <div>
            <div className="flex justify-between items-center mt-4">
              <h3 className="font-semibold text-lg">Education</h3>
              <div className="space-x-2">
                <button
                  onClick={() => moveSection("education", "up")}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
                  aria-label="Move education section up"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveSection("education", "down")}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
                  aria-label="Move education section down"
                >
                  ↓
                </button>
              </div>
            </div>
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="border-t pt-2 mt-2 space-y-2">
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => {
                    const updated = [...resumeData.education]
                    updated[idx].degree = e.target.value
                    setResumeData({ ...resumeData, education: updated })
                  }}
                />
                <input
                  className="w-full border p-2 rounded"
                  placeholder="School"
                  value={edu.school}
                  onChange={(e) => {
                    const updated = [...resumeData.education]
                    updated[idx].school = e.target.value
                    setResumeData({ ...resumeData, education: updated })
                  }}
                />
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) => {
                    const updated = [...resumeData.education]
                    updated[idx].year = e.target.value
                    setResumeData({ ...resumeData, education: updated })
                  }}
                />
                <button onClick={() => deleteEntry("education", idx)} className="text-xs text-red-600 hover:underline">
                  ❌ Delete
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

          {/* Custom Sections */}
          {resumeData.customSections.map((section, sIdx) => (
            <div key={sIdx} className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <button
                  onClick={() => {
                    const updated = [...resumeData.customSections]
                    updated.splice(sIdx, 1)
                    setResumeData({ ...resumeData, customSections: updated })
                  }}
                  className="text-xs text-red-600 hover:underline"
                >
                  ❌ Delete Entire Section
                </button>
                <div className="space-x-2">
                  <button
                    onClick={() => moveSection(`custom-${sIdx}`, "up")}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
                    aria-label="Move section up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveSection(`custom-${sIdx}`, "down")}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
                    aria-label="Move section down"
                  >
                    ↓
                  </button>
                </div>
              </div>
              <input
                className="w-full border p-2 rounded font-semibold"
                placeholder="Section Heading"
                value={section.heading}
                onChange={(e) => {
                  const updated = [...resumeData.customSections]
                  updated[sIdx].heading = e.target.value
                  setResumeData({ ...resumeData, customSections: updated })
                }}
              />
              {section.items.map((item, idx) => (
                <div key={idx} className="border-t pt-2 mt-2 space-y-2">
                  <input
                    className="w-full border p-2 rounded"
                    placeholder="Title"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...resumeData.customSections]
                      updated[sIdx].items[idx].title = e.target.value
                      setResumeData({ ...resumeData, customSections: updated })
                    }}
                  />
                  <textarea
                    className="w-full border p-2 rounded"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => {
                      const updated = [...resumeData.customSections]
                      updated[sIdx].items[idx].description = e.target.value
                      setResumeData({ ...resumeData, customSections: updated })
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
                  const updated = [...resumeData.customSections]
                  updated[sIdx].items.push({ title: "", description: "" })
                  setResumeData({ ...resumeData, customSections: updated })
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
                )
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
                )
              case "experience":
                return (
                  <section key="experience">
                    <h2 className="text-lg font-semibold">Experience</h2>
                    {resumeData.experience.map((exp, idx) => (
                      <div key={idx} className="mt-3">
                        <h3 className="text-md font-medium">{exp.jobTitle}</h3>
                        <p className="text-sm italic">
                          {exp.company}
                          {(exp.from || exp.to) && ` | ${exp.from} - ${exp.to}`}
                        </p>
                        <ul className="list-disc ml-6 text-sm space-y-1">
                          {exp.description
                            .split("\n")
                            .filter((line) => line.trim() !== "")
                            .map((line, i) => (
                              <li key={i}>{line}</li>
                            ))}
                        </ul>
                      </div>
                    ))}
                  </section>
                )
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
                )
              default:
                // Handle custom sections
                if (sectionKey.startsWith("custom-")) {
                  const sIdx = Number.parseInt(sectionKey.split("-")[1])
                  const section = resumeData.customSections[sIdx]
                  if (!section) return null

                  const hasContent = section.items.some((item) => item.title.trim() || item.description.trim())
                  return hasContent ? (
                    <section key={sectionKey}>
                      <h2 className="text-lg font-semibold">{section.heading}</h2>
                      {section.items.map((item, idx) => (
                        <div key={idx} className="mt-3">
                          {item.title && <h3 className="text-md font-medium">{item.title}</h3>}
                          {item.description && <p className="text-sm">{item.description}</p>}
                        </div>
                      ))}
                    </section>
                  ) : null
                }
                return null
            }
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ResumePage
