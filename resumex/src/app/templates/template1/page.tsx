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
  const [tempData, setTempData] = useState(resumeData); // Store temporary changes

  const headerRef = useRef<HTMLDivElement>(null); // Ref to track header section

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setTempData({ ...tempData, [field]: e.target.value });
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
          <div className="details mt-6">
            <div className="section">
              <h3 className="text-2xl font-semibold text-gray-800">Experience</h3>
              <div className="mt-4">
                {data.experienceList.map((job: any, index: number) => (
                    <div key={index} className="mb-4">
                      <h4 className="text-lg font-semibold">{job.company}</h4>
                      <p className="text-sm text-gray-600">{job.location} ({job.duration})</p>
                      <p className="text-gray-700">{job.description}</p>
                    </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="section mt-6">
              <h3 className="text-2xl font-semibold text-gray-800">Education</h3>
              <div className="mt-4">
                {data.education.map((edu: any, index: number) => (
                    <div key={index} className="mb-4">
                      <h4 className="text-lg font-semibold">{edu.school}</h4>
                      <p className="text-sm text-gray-600">{edu.location} ({edu.year})</p>
                      <p className="text-gray-700">{edu.degree}</p>
                    </div>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            <div className="section mt-6">
              <h3 className="text-2xl font-semibold text-gray-800">Projects</h3>
              <div className="mt-4">
                {data.projects.map((project: any, index: number) => (
                    <div key={index} className="mb-4">
                      <h4 className="text-lg font-semibold">{project.name}</h4>
                      <p className="text-gray-700">{project.description}</p>
                    </div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className="section mt-6">
              <h3 className="text-2xl font-semibold text-gray-800">Skills</h3>
              <p className="text-gray-700">{data.skills.join(", ")}</p>
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
