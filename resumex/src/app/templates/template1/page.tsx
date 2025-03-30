"use client";
import { useState, useEffect, useRef } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"; // Icons for Save & Cancel

export default function Template1Page({ data }: { data: any }) {
  const [resumeData, setResumeData] = useState(() => {
    const savedData = localStorage.getItem("resumeData");
    return savedData ? JSON.parse(savedData) : data;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState<number | null>(null); //
  const [isEditingEducation, setIsEditingEducation] = useState<number | null>(null); // Track education edit mode
  const [isEditingProject, setIsEditingProject] = useState<number | null>(null); // Track project edit mode
  const [isEditingSkills, setIsEditingSkills] = useState(false); // Track skills edit mode

  const [tempData, setTempData] = useState(resumeData); // Store temporary changes
  const [tempExperience, setTempExperience] = useState(resumeData.experienceList); // Store experience changes
  const [tempEducation, setTempEducation] = useState(resumeData.education); // Store education edits
  const [tempProjects, setTempProjects] = useState(resumeData.projects); // Store project edits
  const [tempSkills, setTempSkills] = useState(resumeData.skills); // Store skills edits

  const headerRef = useRef<HTMLDivElement>(null); // Ref to track header section

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempSkills(e.target.value.split(",")); // Convert comma-separated input into an array
  };

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

  const cancelProjectEdit = () => {
    setIsEditingProject(null);
    setTempProjects([...resumeData.projects]); // Restore original project data
  };

  const saveProjectEdit = () => {
    setIsSaving(true);
    const updatedData = { ...resumeData, projects: tempProjects };
    localStorage.setItem("resumeData", JSON.stringify(updatedData));
    setResumeData(updatedData);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditingProject(null);
    }, 1000);
  };

  const saveSkillsEdit = () => {
    setIsSaving(true);
    const updatedData = { ...resumeData, skills: tempSkills };
    localStorage.setItem("resumeData", JSON.stringify(updatedData));
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
    localStorage.setItem("resumeData", JSON.stringify(updatedData));
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
    localStorage.setItem("resumeData", JSON.stringify(updatedData));
    setResumeData(updatedData);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditingExperience(null); // Exit edit mode after saving
    }, 1000);
  };

  // Save changes
  const saveResume = () => {
    setIsSaving(true);
    localStorage.setItem("resumeData", JSON.stringify(tempData));
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

  return (
      <div className="flex justify-center items-start w-full min-h-[calc(100vh-100px)] pt-10 pb-10">
        <div className="bg-white shadow-lg p-8 rounded-lg max-w-[1000px] w-[95%] mx-auto
        max-h-[calc(100vh-180px)] overflow-y-auto flex-grow">

          {/* Header Section */}
          <div
              ref={headerRef} // Attach ref to header section
              className="header text-center pb-4 cursor-pointer relative"
              onClick={() => setIsEditingHeader(true)}
          >
            {isEditingHeader ? (
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
            <h3 className="text-2xl font-semibold text-gray-800">Experience</h3>
            <div className="mt-4">
              {tempExperience.map((job: any, index: number) => (
                  <div key={index} className="mb-4 cursor-pointer relative" onClick={() => setIsEditingExperience(index)}>
                    {isEditingExperience === index ? (
                        <>
                          <input type="text" value={tempExperience[index].company} onChange={(e) => handleExperienceChange(e, index, "company")} className="text-lg font-semibold border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full" />
                          <input type="text" value={tempExperience[index].location} onChange={(e) => handleExperienceChange(e, index, "location")} className="text-sm text-gray-600 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full" />
                          <input type="text" value={tempExperience[index].duration} onChange={(e) => handleExperienceChange(e, index, "duration")} className="text-sm text-gray-600 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full" />
                          <textarea value={tempExperience[index].description} onChange={(e) => handleExperienceChange(e, index, "description")} className="text-gray-700 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full" />

                          {/* Save and Cancel Buttons */}
                          <div className="mt-4 flex justify-center gap-4">
                            <button onClick={saveExperienceEdit} className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition flex items-center gap-2">
                              <AiOutlineCheck size={18} /> Save
                            </button>
                            <button onClick={cancelExperienceEdit} className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition flex items-center gap-2">
                              <AiOutlineClose size={18} /> Cancel
                            </button>
                          </div>
                        </>
                    ) : (
                        <div>
                          <h4 className="text-lg font-semibold">{job.company}</h4>
                          <p className="text-sm text-gray-600">{job.location} ({job.duration})</p>
                          <p className="text-gray-700">{job.description}</p>
                        </div>
                    )}
                  </div>
              ))}
            </div>

            {/* Education Section */}
            <div className="section mt-6">
              <h3 className="text-2xl font-semibold text-gray-800">Education</h3>
              <div className="mt-4">
                {tempEducation.map((edu: any, index: number) => (
                    <div key={index} className="mb-4 cursor-pointer relative" onClick={() => setIsEditingEducation(index)}>
                      {isEditingEducation === index ? (
                          <>
                            <input type="text" value={tempEducation[index].school} onChange={(e) => handleEducationChange(e, index, "school")} className="text-lg font-semibold border-b border-gray-300 w-full" />
                            <input type="text" value={tempEducation[index].location} onChange={(e) => handleEducationChange(e, index, "location")} className="text-sm text-gray-600 border-b border-gray-300 w-full" />
                            <input type="text" value={tempEducation[index].year} onChange={(e) => handleEducationChange(e, index, "year")} className="text-sm text-gray-600 border-b border-gray-300 w-full" />

                            {/* Save and Cancel Buttons */}
                            {/* Save and Cancel Buttons */}
                            <div className="mt-4 flex justify-center gap-4">
                              <button
                                  onClick={saveEducationEdit}
                                  className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition flex items-center gap-2"
                              >
                                <AiOutlineCheck size={18} /> Save
                              </button>
                              <button
                                  onClick={cancelEducationEdit}
                                  className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition flex items-center gap-2"
                              >
                                <AiOutlineClose size={18} /> Cancel
                              </button>
                            </div>

                          </>
                      ) : (
                          <div>
                            <h4 className="text-lg font-semibold">{edu.school}</h4>
                            <p className="text-sm text-gray-600">{edu.location} ({edu.year})</p>
                          </div>
                      )}
                    </div>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            <div className="section mt-6">
              <h3 className="text-2xl font-semibold text-gray-800">Projects</h3>
              <div className="mt-4">
                {tempProjects.map((project: any, index: number) => (
                    <div key={index} className="mb-4 cursor-pointer relative" onClick={() => setIsEditingProject(index)}>
                      {isEditingProject === index ? (
                          <>
                            <input
                                type="text"
                                value={tempProjects[index].name}
                                onChange={(e) => handleProjectChange(e, index, "name")}
                                className="text-lg font-semibold border-b border-gray-300 w-full"
                            />
                            <textarea
                                value={tempProjects[index].description}
                                onChange={(e) => handleProjectChange(e, index, "description")}
                                className="text-gray-700 border-b border-gray-300 w-full"
                            />

                            {/* Save and Cancel Buttons */}
                            <div className="mt-4 flex justify-center gap-4">
                              <button onClick={saveProjectEdit} className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition flex items-center gap-2">
                                <AiOutlineCheck size={18} /> Save
                              </button>
                              <button onClick={cancelProjectEdit} className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition flex items-center gap-2">
                                <AiOutlineClose size={18} /> Cancel
                              </button>
                            </div>
                          </>
                      ) : (
                          <div>
                            <h4 className="text-lg font-semibold">{project.name}</h4>
                            <p className="text-gray-700">{project.description}</p>
                          </div>
                      )}
                    </div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className="section mt-6">
              <h3 className="text-2xl font-semibold text-gray-800">Skills</h3>
              <div className="mt-4 cursor-pointer" onClick={() => setIsEditingSkills(true)}>
                {isEditingSkills ? (
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
              <p className="text-gray-700">{data.interests.join(", ")}</p>
            </div>
          </div>
        </div>
      </div>
  );
}
