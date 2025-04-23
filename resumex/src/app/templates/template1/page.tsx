"use client"; // Enables client-side rendering for this component
import { useState, useEffect, useRef } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"; // Icons for Save & Cancel
import html2canvas from "html2canvas"; // Used to capture DOM elements as images for PDF generation
import jsPDF from "jspdf"; // PDF generation library
import { FiDownload } from "react-icons/fi"; // Icon used for download button

// Utility function to create a unique localStorage key per user
function getUserKey(key: string) {
  const userData = localStorage.getItem("userData");
  const userId = userData ? JSON.parse(userData)?.name : "guest";
  return `${userId}_${key}`;
}

// Main component for rendering and editing Resume Template 1
export default function Template1Page({ data, isPublicView = false }: { data: any, isPublicView?: boolean }) { // Tracks if data is currently being saved
  // Initialize resume data from localStorage or fallback to passed-in prop `data`
  const [resumeData, setResumeData] = useState(() => {
    const savedData = localStorage.getItem(getUserKey("resumeData"));
    return savedData ? JSON.parse(savedData) : data;
  });

  const [isSaving, setIsSaving] = useState(false); // Tracks if data is currently being saved
  const [isEditingHeader, setIsEditingHeader] = useState(false); // Edit mode for header
  const [isEditingExperience, setIsEditingExperience] = useState<number | null>(null); // Tracks which experience entry is being edited
  const [isEditingEducation, setIsEditingEducation] = useState<number | null>(null); // Track education edit mode
  const [isEditingProject, setIsEditingProject] = useState<number | null>(null); // Track project edit mode
  const [isEditingSkills, setIsEditingSkills] = useState(false); // Track skills edit mode
  const [isEditingInterests, setIsEditingInterests] = useState(false); // Edit mode for interests section
  // Section-wide toggle modes for batch editing
  const [isExperienceEditingMode, setIsExperienceEditingMode] = useState(false);
  const [isEducationEditingMode, setIsEducationEditingMode] = useState(false);
  const [isProjectsEditingMode, setIsProjectsEditingMode] = useState(false);

  const [showDownloadIcon, setShowDownloadIcon] = useState(true); // Controls visibility of floating download button

  // Temporary states to hold edits before saving
  const [tempData, setTempData] = useState(resumeData); // Store temporary changes
  const [tempExperience, setTempExperience] = useState(resumeData.experienceList); // Store experience changes
  const [tempEducation, setTempEducation] = useState(resumeData.education); // Store education edits
  const [tempProjects, setTempProjects] = useState(resumeData.projects); // Store project edits
  const [tempSkills, setTempSkills] = useState(resumeData.skills); // Store skills edits
  const [tempInterests, setTempInterests] = useState(resumeData.interests); // array of strings

  const headerRef = useRef<HTMLDivElement>(null); // Ref to track header section

  // Handles updating temporary interests from comma-separated input
  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempInterests(e.target.value.split(',').map((item) => item.trim()));
  };

  // Saves the edited interests to localStorage and updates main resume data
  const saveInterestsEdit = () => {
    setIsSaving(true);
    const updatedData = { ...resumeData, interests: tempInterests };
    localStorage.setItem(getUserKey("resumeData"), JSON.stringify(updatedData));
    setResumeData(updatedData);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditingInterests(false);
    }, 1000);
  };

  // Cancels interests editing and restores original data
  const cancelInterestsEdit = () => {
    setTempInterests([...resumeData.interests]);
    setIsEditingInterests(false);
  };

  // Handles skills update from comma-separated string to array
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempSkills(e.target.value.split(",")); // Convert comma-separated input into an array
  };

  // Cancels skills editing and restores previous values
  const cancelSkillsEdit = () => {
    setIsEditingSkills(false);
    setTempSkills([...resumeData.skills]); // Restore original skills data
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setTempData({ ...tempData, [field]: e.target.value });
  };

  // Handle input changes for experience section
  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, field: string) => {
    const updatedExperience = [...tempExperience];
    updatedExperience[index] = { ...updatedExperience[index], [field]: e.target.value };
    setTempExperience(updatedExperience);
  };

  // Handle input changes for education section
  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => {
    const updatedEducation = [...tempEducation];
    updatedEducation[index] = { ...updatedEducation[index], [field]: e.target.value };
    setTempEducation(updatedEducation);
  };

  // Updates the temporary project data as the user types in input or textarea fields
  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, field: string) => {
    const updatedProjects = [...tempProjects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: e.target.value };
    setTempProjects(updatedProjects);
  };

  // Cancel editing for experience section
  const cancelExperienceEdit = () => {
    setIsEditingExperience(null);
    setTempExperience([...resumeData.experienceList]); // Restore original experience data
  };

  // Cancel editing for education section
  const cancelEducationEdit = () => {
    setIsEditingEducation(null);
    setTempEducation([...resumeData.education]); // Restore original education data
  };

  // Cancels project editing and resets temporary project state to original resume data
  const cancelProjectEdit = () => {
    setIsEditingProject(null);
    setTempProjects([...resumeData.projects]); // Restore original project data
  };

  // Saves updated project data to localStorage and main resume state
  const saveProjectEdit = () => {
    setIsSaving(true);
    const updatedData = { ...resumeData, projects: tempProjects };
    localStorage.setItem(getUserKey("resumeData"), JSON.stringify(updatedData));
    setResumeData(updatedData);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditingProject(null);
    }, 1000);
  };

  // Saves updated skills data to localStorage and updates resume state
  const saveSkillsEdit = () => {
    setIsSaving(true);
    const updatedData = { ...resumeData, skills: tempSkills };
    localStorage.setItem(getUserKey("resumeData"), JSON.stringify(updatedData));
    setResumeData(updatedData);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditingSkills(false);
    }, 1000);
  };

  // Save only the education section
  const saveEducationEdit = () => {
    setIsSaving(true);
    const updatedData = { ...resumeData, education: tempEducation };
    localStorage.setItem(getUserKey("resumeData"), JSON.stringify(updatedData));
    setResumeData(updatedData);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditingEducation(null);
    }, 1000);
  };

  // Save only the experience section
  const saveExperienceEdit = () => {
    setIsSaving(true);
    const updatedData = { ...resumeData, experienceList: tempExperience };
    localStorage.setItem(getUserKey("resumeData"), JSON.stringify(updatedData));
    setResumeData(updatedData);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditingExperience(null); // Exit edit mode after saving
    }, 1000);
  };

  // Save changes
  const saveResume = () => {
    setIsSaving(true);
    localStorage.setItem(getUserKey("resumeData"), JSON.stringify(tempData));
    setResumeData(tempData);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditingHeader(false);
    }, 1000);
  };

  // Cancel editing and restore original values
  const cancelEditing = () => {
    setIsEditingHeader(false);
    setTempData(resumeData); // Restore previous data
  };

  // Detect clicks outside header & auto-save
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        if (isEditingHeader) {
          saveResume();
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditingHeader, tempData]); // Dependency ensures effect updates

  // Handles showing/hiding the floating download icon based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setShowDownloadIcon(scrollTop < 100); // only show when near top
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //for downloading as pdf
  const downloadAsPDF = async () => {
    const resumeElement = document.querySelector(".shadow-lg.p-8.rounded-lg");

    if (!resumeElement) return;

    // Clone the resume content
    const clone = resumeElement.cloneNode(true) as HTMLElement;

    // Remove scroll limit styles from the clone
    clone.style.position = "absolute";
    clone.style.top = "-9999px";
    clone.style.left = "-9999px";
    clone.style.zIndex = "-1";
    clone.style.maxHeight = "none"; // Important: remove max-height
    clone.style.overflow = "visible"; // Show everything

    document.body.appendChild(clone);

    try {
      await new Promise((res) => setTimeout(res, 300)); // Let browser render the clone

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        windowWidth: clone.scrollWidth, // ensure full rendering
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const scale = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
      const imgWidth = canvas.width * scale;
      const imgHeight = canvas.height * scale;
      const marginX = (pdfWidth - imgWidth) / 2;
      const marginY = 20;

      pdf.addImage(imgData, "PNG", marginX, marginY, imgWidth, imgHeight);
      pdf.save("resume-template1.pdf");
    } catch (err) {
      console.error("PDF Download Failed", err);
      alert("PDF download failed. Try again.");
    } finally {
      document.body.removeChild(clone);
    }
  };

  return (
      <div className="relative w-full">
        {/* Download Icon Button (only visible at top) */}
        {!isPublicView && showDownloadIcon && (
            <div className="absolute top-4 right-4 z-50">
              <button
                  onClick={downloadAsPDF}
                  title="Download PDF"
                  className="text-blue-600 hover:text-blue-800 transition text-3xl"
              >
                <FiDownload />
              </button>
            </div>
        )}

        <div className="relative w-full">
        <div className="flex justify-center items-start w-full min-h-[calc(100vh-100px)] pt-10 pb-10">
        <div className="bg-white shadow-lg p-8 rounded-lg max-w-[1000px] w-[95%] mx-auto
        max-h-[calc(100vh-180px)] overflow-y-auto flex-grow">

          {/* Header Section */}
          <div
              ref={headerRef} // Attach ref to header section
              className="header text-center pb-4 cursor-pointer relative"
              onClick={() => setIsEditingHeader(true)}
          >
            {!isPublicView && isEditingHeader ? (
                <>
                  <input
                      type="text"
                      value={tempData.firstName}
                      onChange={(e) => handleChange(e, "firstName")}
                      className="text-4xl font-bold border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full text-center"
                  />
                  <input
                      type="text"
                      value={tempData.lastName}
                      onChange={(e) => handleChange(e, "lastName")}
                      className="text-4xl font-bold border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full text-center"
                  />
                  <input
                      type="text"
                      value={tempData.position}
                      onChange={(e) => handleChange(e, "position")}
                      className="text-gray-600 mt-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full text-center"
                  />
                  <input
                      type="text"
                      value={tempData.email}
                      onChange={(e) => handleChange(e, "email")}
                      className="text-gray-500 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full text-center"
                  />
                  <input
                      type="text"
                      value={tempData.phone}
                      onChange={(e) => handleChange(e, "phone")}
                      className="text-gray-500 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full text-center"
                  />

                  {/* Save and Cancel Buttons */}
                  <div className="mt-4 flex justify-center gap-4">
                    <button
                        onClick={saveResume}
                        className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition flex items-center gap-2"
                    >
                      <AiOutlineCheck size={18} /> Save
                    </button>
                    <button
                        onClick={cancelEditing}
                        className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition flex items-center gap-2"
                    >
                      <AiOutlineClose size={18} /> Cancel
                    </button>
                  </div>
                </>
            ) : (
                <div>
                  <h1 className="text-4xl font-bold">{resumeData.firstName} {resumeData.lastName}</h1>
                  <p className="text-gray-600 mt-2">{resumeData.position}</p>
                  <p className="text-gray-500">{resumeData.email} | {resumeData.phone}</p>
                </div>
            )}
          </div>

          {/* Experience Section */}
          <div className="section mt-6">
            <h3
                className="text-2xl font-semibold text-gray-800 cursor-pointer"
                onClick={() => {
                  if (!isPublicView) {
                  setIsExperienceEditingMode(true);
                  setTempExperience([...resumeData.experienceList]);
                }
                }}
            >
              Experience
            </h3>
            <div className="mt-4">
              {tempExperience.map((job: any, index: number) => (
                  <div key={index} className="mb-4 relative">
                    {!isPublicView && isExperienceEditingMode ? (
                        <>
                          <input
                              type="text"
                              value={job.company}
                              onChange={(e) => handleExperienceChange(e, index, "company")}
                              className="text-lg font-semibold border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                              placeholder="Company"
                          />
                          <input
                              type="text"
                              value={job.location}
                              onChange={(e) => handleExperienceChange(e, index, "location")}
                              className="text-sm text-gray-600 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                              placeholder="Location"
                          />
                          <input
                              type="text"
                              value={job.duration}
                              onChange={(e) => handleExperienceChange(e, index, "duration")}
                              className="text-sm text-gray-600 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                              placeholder="Duration"
                          />
                          <textarea
                              value={job.description}
                              onChange={(e) => handleExperienceChange(e, index, "description")}
                              className="text-gray-700 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                              placeholder="Description"
                          />
                          <button
                              onClick={() => {
                                const updated = tempExperience.filter((_, i) => i !== index);
                                setTempExperience(updated);
                              }}
                              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                          >
                            <AiOutlineClose size={20} />
                          </button>
                        </>
                    ) : (
                        <div
                            onClick={() => {
                              setIsExperienceEditingMode(true);
                              setTempExperience([...resumeData.experienceList]);
                            }}
                        >
                          <h4 className="text-lg font-semibold">{job.company}</h4>
                          <p className="text-sm text-gray-600">
                            {job.location} ({job.duration})
                          </p>
                          <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
                        </div>
                    )}
                  </div>
              ))}

              {/* + Add Experience */}
              {!isPublicView && isExperienceEditingMode && (
                  <div className="text-center mt-4">
                    <button
                        onClick={() => {
                          setTempExperience([
                            ...tempExperience,
                            { company: "", location: "", duration: "", description: "" }
                          ]);
                          setIsExperienceEditingMode(true);
                        }}
                        className="px-4 py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                    >
                      + Add Experience
                    </button>
                  </div>
              )}

              {/* Save/Cancel Buttons */}
              {!isPublicView && isExperienceEditingMode && (
                  <div className="mt-4 flex justify-center gap-4">
                    <button
                        onClick={() => {
                          saveExperienceEdit();
                          setIsExperienceEditingMode(false);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition flex items-center gap-2"
                    >
                      <AiOutlineCheck size={18} /> Save
                    </button>
                    <button
                        onClick={() => {
                          cancelExperienceEdit();
                          setIsExperienceEditingMode(false);
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition flex items-center gap-2"
                    >
                      <AiOutlineClose size={18} /> Cancel
                    </button>
                  </div>
              )}
            </div>

            {/* Education Section */}
            <div className="section mt-6">
              <h3
                  className="text-2xl font-semibold text-gray-800 cursor-pointer"
                  onClick={() => {
                    if (!isPublicView) {
                      setIsEducationEditingMode(true);
                      setTempEducation([...resumeData.education]);
                    }
                  }}
              >
                Education
              </h3>
              <div className="mt-4">
                {tempEducation.map((edu: any, index: number) => (
                    <div key={index} className="mb-4 relative">
                      {!isPublicView && isEducationEditingMode ? (
                          <>
                            <input
                                type="text"
                                value={edu.school}
                                onChange={(e) => handleEducationChange(e, index, "school")}
                                className="text-lg font-semibold border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                                placeholder="School"
                            />
                            <input
                                type="text"
                                value={edu.location}
                                onChange={(e) => handleEducationChange(e, index, "location")}
                                className="text-sm text-gray-600 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                                placeholder="Location"
                            />
                            <input
                                type="text"
                                value={edu.year}
                                onChange={(e) => handleEducationChange(e, index, "year")}
                                className="text-sm text-gray-600 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                                placeholder="Year"
                            />
                            <button
                                onClick={() => {
                                  const updated = tempEducation.filter((_, i) => i !== index);
                                  setTempEducation(updated);
                                }}
                                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                            >
                              <AiOutlineClose size={20} />
                            </button>
                          </>
                      ) : (
                          <div
                              onClick={() => {
                                setIsEducationEditingMode(true);
                                setTempEducation([...resumeData.education]);
                              }}
                          >
                            <h4 className="text-lg font-semibold">{edu.school}</h4>
                            <p className="text-sm text-gray-600">
                              {edu.location} ({edu.year})
                            </p>
                          </div>
                      )}
                    </div>
                ))}

                {/* + Add Education */}
                {!isPublicView && isEducationEditingMode && (
                    <div className="text-center mt-4">
                      <button
                          onClick={() =>
                              setTempEducation([
                                ...tempEducation,
                                { school: "", location: "", year: "" }
                              ])
                          }
                          className="px-4 py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                      >
                        + Add Education
                      </button>
                    </div>
                )}

                {/* Save / Cancel Buttons */}
                {!isPublicView && isEducationEditingMode && (
                    <div className="mt-4 flex justify-center gap-4">
                      <button
                          onClick={() => {
                            saveEducationEdit();
                            setIsEducationEditingMode(false);
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition flex items-center gap-2"
                      >
                        <AiOutlineCheck size={18} /> Save
                      </button>
                      <button
                          onClick={() => {
                            cancelEducationEdit();
                            setIsEducationEditingMode(false);
                          }}
                          className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition flex items-center gap-2"
                      >
                        <AiOutlineClose size={18} /> Cancel
                      </button>
                    </div>
                )}
              </div>
            </div>

            {/* Projects Section */}
            <div className="section mt-6">
              <h3
                  className="text-2xl font-semibold text-gray-800 cursor-pointer"
                  onClick={() => {
                    if (!isPublicView) {
                      setIsProjectsEditingMode(true);
                      setTempProjects([...resumeData.projects]);
                    }
                  }}
              >
                Projects
              </h3>
              <div className="mt-4">
                {tempProjects.map((project: any, index: number) => (
                    <div key={index} className="mb-4 relative">
                      {!isPublicView && isProjectsEditingMode ? (
                          <>
                            <input
                                type="text"
                                value={project.name}
                                onChange={(e) => handleProjectChange(e, index, "name")}
                                className="text-lg font-semibold border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full mb-2"
                                placeholder="Project Title"
                            />
                            <textarea
                                value={project.description}
                                onChange={(e) => handleProjectChange(e, index, "description")}
                                className="text-gray-700 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                                placeholder="Project Description"
                            />
                            <button
                                onClick={() => {
                                  const updated = tempProjects.filter((_, i) => i !== index);
                                  setTempProjects(updated);
                                }}
                                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                            >
                              <AiOutlineClose size={20} />
                            </button>
                          </>
                      ) : (
                          <div
                              onClick={() => {
                                setIsProjectsEditingMode(true);
                                setTempProjects([...resumeData.projects]);
                              }}
                          >
                            <h4 className="text-lg font-semibold">{project.name}</h4>
                            <p className="text-gray-700">{project.description}</p>
                          </div>
                      )}
                    </div>
                ))}

                {/* + Add Project */}
                {!isPublicView && isProjectsEditingMode && (
                    <div className="text-center mt-4">
                      <button
                          onClick={() =>
                              setTempProjects([
                                ...tempProjects,
                                { name: "", description: "" }
                              ])
                          }
                          className="px-4 py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                      >
                        + Add Project
                      </button>
                    </div>
                )}

                {/* Save / Cancel Buttons */}
                {!isPublicView && isProjectsEditingMode && (
                    <div className="mt-4 flex justify-center gap-4">
                      <button
                          onClick={() => {
                            saveProjectEdit();
                            setIsProjectsEditingMode(false);
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition flex items-center gap-2"
                      >
                        <AiOutlineCheck size={18} /> Save
                      </button>
                      <button
                          onClick={() => {
                            cancelProjectEdit();
                            setIsProjectsEditingMode(false);
                          }}
                          className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition flex items-center gap-2"
                      >
                        <AiOutlineClose size={18} /> Cancel
                      </button>
                    </div>
                )}
              </div>
            </div>

            {/* Skills Section */}
            <div className="section mt-6">
              <h3 className="text-2xl font-semibold text-gray-800">Skills</h3>
              <div className={`${!isPublicView ? "cursor-pointer" : ""} mt-4`}
                   onClick={() => {
                     if (!isPublicView) setIsEditingSkills(true);
                   }}
                >
                {!isPublicView && isEditingSkills ? (
                    <>
                      <input
                          type="text"
                          value={tempSkills.join(", ")} // Convert array back to string
                          onChange={handleSkillsChange}
                          className="text-gray-700 border-b border-gray-300 w-full focus:outline-none focus:border-blue-500"
                      />

                      {/* Save and Cancel Buttons */}
                      <div className="mt-4 flex justify-center gap-4">
                        <button
                            onClick={saveSkillsEdit}
                            className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition flex items-center gap-2"
                        >
                          <AiOutlineCheck size={18} /> Save
                        </button>
                        <button
                            onClick={cancelSkillsEdit}
                            className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition flex items-center gap-2"
                        >
                          <AiOutlineClose size={18} /> Cancel
                        </button>
                      </div>
                    </>
                ) : (
                    <p className="text-gray-700">{resumeData.skills.join(", ")}</p>
                )}
              </div>
            </div>

            {/* Interests Section */}
            <div className="section mt-6">
              <h3 className="text-2xl font-semibold text-gray-800">Interests</h3>
              <div className={`${!isPublicView ? "cursor-pointer" : ""} mt-2`}
                   onClick={() => {
                     if (!isPublicView) setIsEditingInterests(true);
                   }}
              >
                {!isPublicView && isEditingInterests ? (
                    <>
                      <input
                          type="text"
                          value={tempInterests.join(", ")}
                          onChange={handleInterestsChange}
                          className="text-gray-700 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                      />
                      <div className="mt-4 flex justify-center gap-4">
                        <button onClick={saveInterestsEdit} className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition flex items-center gap-2">
                          <AiOutlineCheck size={18} /> Save
                        </button>
                        <button onClick={cancelInterestsEdit} className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition flex items-center gap-2">
                          <AiOutlineClose size={18} /> Cancel
                        </button>
                      </div>
                    </>
                ) : (
                    <p className="text-gray-700">{resumeData.interests.join(", ")}</p>
                )}
              </div>
            </div>
            <div className="h-[120px] w-full" />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
