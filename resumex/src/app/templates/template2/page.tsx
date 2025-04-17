import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

function getUserKey(key: string) {
  const userData = localStorage.getItem("userData");
  const userId = userData ? JSON.parse(userData)?.name : "guest";
  return `${userId}_template2_${key}`;
}

export default function Template2Page() {
  // For contact section
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactData, setContactData] = useState({
    phone: "+123-456-7890",
    email: "john.doe@gmail.com",
    address: "123 Anywhere St, Any City",
    website: "www.johndoesite.com",
  });
  const [tempContact, setTempContact] = useState(contactData);

  useEffect(() => {
    const saved = localStorage.getItem(getUserKey("contact"));
    if (saved) {
      const parsed = JSON.parse(saved);
      setContactData(parsed);
      setTempContact(parsed);
    }
  }, []);

  // For education section
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [educationData, setEducationData] = useState([
    {
      year: "2029 – 2030",
      school: "Wardiere University",
      degree: "Master of Business Management",
    },
    {
      year: "2025 – 2029",
      school: "Wardiere University",
      degree: "Bachelor of Business, GPA: 3.8 / 4.0",
    },
  ]);
  const [tempEducation, setTempEducation] = useState(educationData);

  useEffect(() => {
    const savedEducation = localStorage.getItem(getUserKey("education"));
    if (savedEducation) {
      const parsed = JSON.parse(savedEducation);
      setEducationData(parsed);
      setTempEducation(parsed);
    }
  }, []);

  // For skills section
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [skillsData, setSkillsData] = useState([
    "Project Management",
    "Public Relations",
    "Teamwork",
    "Time Management",
    "Critical Thinking",
    "Effective Communication",
  ]);
  const [tempSkills, setTempSkills] = useState(skillsData);

  useEffect(() => {
    const savedSkills = localStorage.getItem(getUserKey("skills"));
    if (savedSkills) {
      const parsed = JSON.parse(savedSkills);
      setSkillsData(parsed);
      setTempSkills(parsed);
    }
  }, []);

  // For header section
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [headerData, setHeaderData] = useState({
    name: "John Doe",
    title: "Marketing Manager",
  });
  const [tempHeader, setTempHeader] = useState(headerData);

  useEffect(() => {
    const savedHeader = localStorage.getItem(getUserKey("header"));
    if (savedHeader) {
      const parsed = JSON.parse(savedHeader);
      setHeaderData(parsed);
      setTempHeader(parsed);
    }
  }, []);

  // For profile section
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation."
  );
  const [tempProfile, setTempProfile] = useState(profileData);

  useEffect(() => {
    const savedProfile = localStorage.getItem(getUserKey("profile"));
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfileData(parsed);
      setTempProfile(parsed);
    }
  }, []);

  // For work experience section
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [experienceData, setExperienceData] = useState([
    {
      company: "Borcelle Studio",
      role: "Marketing Manager & Specialist",
      years: "2030 – Present",
      bullets: [
        "Develop and execute comprehensive marketing strategies and campaigns aligned with the company’s goals and objectives.",
        "Lead, mentor, and manage a high-performing marketing team.",
        "Collaborate with cross-functional departments to ensure brand consistency.",
      ],
    },
    {
      company: "Fauget Studios",
      role: "Marketing Manager & Specialist",
      years: "2025 – 2029",
      bullets: [
        "Create and manage the marketing budget, ensuring efficient allocation of resources.",
        "Oversee market research to identify emerging trends, customer needs, and competitors’ activities.",
        "Coordinate the production of marketing materials.",
      ],
    },
   
  ]);
  const [tempExperience, setTempExperience] = useState(experienceData);

  useEffect(() => {
    const savedExp = localStorage.getItem(getUserKey("experience"));
    if (savedExp) {
      const parsed = JSON.parse(savedExp);
      setExperienceData(parsed);
      setTempExperience(parsed);
    }
  }, []);

  return (
    <div className="w-full max-w-[850px] mx-auto px-6 py-10 bg-white shadow-xl overflow-y-auto max-h-[calc(100vh-160px)]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* LEFT COLUMN */}
        <div className="md:col-span-5 bg-[#1B2A41] text-white px-10 py-10 space-y-10">
          {/* Profile Picture */}
          <div className="relative w-28 h-28 rounded-full bg-gray-300 mx-auto">
            {/* Camera icon overlay */}
            <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md cursor-pointer hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75V6.75A2.25 2.25 0 014.5 4.5h2.121a1.5 1.5 0 001.06-.44l.94-.94A1.5 1.5 0 0110.061 3h3.878a1.5 1.5 0 011.06.44l.94.94a1.5 1.5 0 001.061.44H19.5a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25z"
                />
              </svg>
            </div>
          </div>

          {/* Contact (Editable) */}
          <div className="space-y-2">
            <h2 className="text-lg font-bold tracking-wide border-b border-white pb-2">
              CONTACT
            </h2>
            {isEditingContact ? (
              <>
                <input
                  type="text"
                  className="text-sm text-black w-full px-2 py-1 rounded"
                  value={tempContact.phone}
                  onChange={(e) =>
                    setTempContact({ ...tempContact, phone: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="text-sm text-black w-full px-2 py-1 rounded"
                  value={tempContact.email}
                  onChange={(e) =>
                    setTempContact({ ...tempContact, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="text-sm text-black w-full px-2 py-1 rounded"
                  value={tempContact.address}
                  onChange={(e) =>
                    setTempContact({ ...tempContact, address: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="text-sm text-black w-full px-2 py-1 rounded"
                  value={tempContact.website}
                  onChange={(e) =>
                    setTempContact({ ...tempContact, website: e.target.value })
                  }
                />
                {/* Save & Cancel Buttons */}
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => {
                      setContactData(tempContact);
                      localStorage.setItem(
                        getUserKey("contact"),
                        JSON.stringify(tempContact)
                      );
                      setIsEditingContact(false);
                    }}
                    className="px-3 py-1 bg-green-600 text-white rounded-full text-sm flex items-center gap-1 whitespace-nowrap"
                  >
                    <AiOutlineCheck size={16} /> Save
                  </button>
                  <button
                    onClick={() => {
                      setTempContact(contactData);
                      setIsEditingContact(true);
                    }}
                    className="px-3 py-1 bg-red-600 text-white rounded-full text-sm flex items-center gap-1 whitespace-nowrap"
                  >
                    <AiOutlineClose size={16} /> Cancel
                  </button>
                </div>
              </>
            ) : (
              <div
                onClick={() => setIsEditingContact(true)}
                className="cursor-pointer space-y-1"
              >
                <p className="text-sm break-words">{contactData.phone}</p>
                <p className="text-sm break-words">{contactData.email}</p>
                <p className="text-sm break-words">{contactData.address}</p>
                <p className="text-sm break-words">{contactData.website}</p>
              </div>
            )}
          </div>

          {/* Education (Editable) */}
          <div className="space-y-2">
            <h2
                className="text-lg font-bold tracking-wide border-b border-white pb-2 cursor-pointer"
                onClick={() => {
                  setTempEducation(educationData.map((entry) => ({ ...entry })));
                  setIsEditingEducation(true);
                }}
            >
              EDUCATION
            </h2>

            {isEditingEducation ? (
                <>
                  {tempEducation.map((edu, index) => (
                      <div key={index} className="space-y-1 relative bg-white/10 p-2 rounded">
                        <input
                            type="text"
                            className="text-sm text-black w-full px-2 py-1 rounded"
                            placeholder="Year"
                            value={edu.year}
                            onChange={(e) => {
                              const updated = [...tempEducation];
                              updated[index] = { ...updated[index], year: e.target.value };
                              setTempEducation(updated);
                            }}
                        />
                        <input
                            type="text"
                            className="text-sm text-black w-full px-2 py-1 rounded"
                            placeholder="School"
                            value={edu.school}
                            onChange={(e) => {
                              const updated = [...tempEducation];
                              updated[index] = { ...updated[index], school: e.target.value };
                              setTempEducation(updated);
                            }}
                        />
                        <input
                            type="text"
                            className="text-sm text-black w-full px-2 py-1 rounded"
                            placeholder="Degree"
                            value={edu.degree}
                            onChange={(e) => {
                              const updated = [...tempEducation];
                              updated[index] = { ...updated[index], degree: e.target.value };
                              setTempEducation(updated);
                            }}
                        />
                        {/* Remove Entry Button */}
                        <button
                            onClick={() => {
                              const updated = tempEducation.filter((_, i) => i !== index);
                              setTempEducation(updated);
                            }}
                            className="absolute top-1 right-1 text-red-300 hover:text-red-600"
                            title="Remove"
                        >
                          <AiOutlineClose size={18} />
                        </button>
                      </div>
                  ))}

                  {/* Add Entry Button */}
                  <button
                      onClick={() =>
                          setTempEducation([
                            ...tempEducation,
                            { year: "", school: "", degree: "" },
                          ])
                      }
                      className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600"
                  >
                    + Add Education
                  </button>

                  {/* Save & Cancel Buttons */}
                  <div className="mt-4 flex gap-3">
                    <button
                        onClick={() => {
                          setEducationData(tempEducation);
                          localStorage.setItem(
                              getUserKey("education"),
                              JSON.stringify(tempEducation)
                          );
                          setIsEditingEducation(false);
                        }}
                        className="px-3 py-1 bg-green-600 text-white rounded-full text-sm flex items-center gap-1 whitespace-nowrap"
                    >
                      <AiOutlineCheck size={16} /> Save
                    </button>
                    <button
                        onClick={() => {
                          setTempEducation(educationData.map((entry) => ({ ...entry })));
                          setIsEditingEducation(true); // stay in edit mode
                        }}
                        className="px-3 py-1 bg-red-600 text-white rounded-full text-sm flex items-center gap-1 whitespace-nowrap"
                    >
                      <AiOutlineClose size={16} /> Cancel
                    </button>
                  </div>
                </>
            ) : (
                <div
                    onClick={() => {
                      setTempEducation(educationData.map((entry) => ({ ...entry })));
                      setIsEditingEducation(true);
                    }}
                    className="cursor-pointer space-y-3"
                >
                  {educationData.map((edu, index) => (
                      <div key={index}>
                        <p className="text-sm font-bold">{edu.year}</p>
                        <p className="text-sm font-semibold">{edu.school}</p>
                        <p className="text-sm">{edu.degree}</p>
                      </div>
                  ))}
                </div>
            )}
          </div>

          {/* Skills (Editable) */}
          <div className="space-y-2">
            <h2 className="text-lg font-bold tracking-wide border-b border-white pb-2">
              SKILLS
            </h2>
            {isEditingSkills ? (
              <>
                {tempSkills.map((skill, index) => (
                  <input
                    key={index}
                    type="text"
                    className="text-sm text-black w-full px-2 py-1 rounded"
                    value={skill}
                    onChange={(e) => {
                      const updated = [...tempSkills];
                      updated[index] = e.target.value;
                      setTempSkills(updated);
                    }}
                  />
                ))}
                {/* Save & Cancel Buttons */}
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => {
                      setSkillsData(tempSkills);
                      localStorage.setItem(
                        getUserKey("skills"),
                        JSON.stringify(tempSkills)
                      );
                      setIsEditingSkills(false);
                    }}
                    className="px-3 py-1 bg-green-600 text-white rounded-full text-sm flex items-center gap-1 whitespace-nowrap"
                  >
                    <AiOutlineCheck size={16} /> Save
                  </button>
                  <button
                    onClick={() => {
                      setTempSkills([...skillsData]);
                      setIsEditingSkills(true); // stay in edit mode
                    }}
                    className="px-3 py-1 bg-red-600 text-white rounded-full text-sm flex items-center gap-1 whitespace-nowrap"
                  >
                    <AiOutlineClose size={16} /> Cancel
                  </button>
                </div>
              </>
            ) : (
              <ul
                className="text-sm space-y-1 list-disc list-inside cursor-pointer"
                onClick={() => {
                  setTempSkills([...skillsData]);
                  setIsEditingSkills(true);
                }}
              >
                {skillsData.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            )}
          </div>

          {/* --- Languages Section Removed --- */}
          {/* The entire block rendering the LANGUAGES section has been removed. */}
        </div>

        {/* RIGHT COLUMN */}
        <div className="md:col-span-6 pr-12 pl-4 space-y-10">
          {/* Header */}
          <div className="space-y-1">
            {isEditingHeader ? (
              <>
                <input
                  type="text"
                  className="text-2xl font-extrabold text-[#1B2A41] uppercase w-full px-2 py-1 rounded border text-black"
                  value={tempHeader.name}
                  onChange={(e) =>
                    setTempHeader({ ...tempHeader, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="text-md font-semibold text-[#2D72D9] w-full px-2 py-1 rounded border text-black"
                  value={tempHeader.title}
                  onChange={(e) =>
                    setTempHeader({ ...tempHeader, title: e.target.value })
                  }
                />

                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => {
                      setHeaderData(tempHeader);
                      localStorage.setItem(
                        getUserKey("header"),
                        JSON.stringify(tempHeader)
                      );
                      setIsEditingHeader(false);
                    }}
                    className="px-3 py-1 bg-green-600 text-white rounded-full text-sm flex items-center gap-1 whitespace-nowrap"
                  >
                    <AiOutlineCheck size={16} /> Save
                  </button>
                  <button
                    onClick={() => {
                      setTempHeader(headerData);
                      setIsEditingHeader(true); // stay in edit
                    }}
                    className="px-3 py-1 bg-red-600 text-white rounded-full text-sm flex items-center gap-1 whitespace-nowrap"
                  >
                    <AiOutlineClose size={16} /> Cancel
                  </button>
                </div>
              </>
            ) : (
              <div
                onClick={() => {
                  setTempHeader(headerData);
                  setIsEditingHeader(true);
                }}
                className="cursor-pointer space-y-1"
              >
                <h1 className="text-3xl font-extrabold text-[#1B2A41] uppercase">
                  {headerData.name}
                </h1>
                <h2 className="text-md font-semibold text-[#2D72D9]">
                  {headerData.title}
                </h2>
              </div>
            )}
          </div>

          {/* Profile */}
          <div>
            <h2 className="text-md font-bold text-[#1B2A41] border-b border-gray-300 pb-1 mb-2 uppercase">
              Profile
            </h2>
            {isEditingProfile ? (
              <>
                <textarea
                  className="w-full text-sm text-black p-2 rounded border"
                  rows={5}
                  value={tempProfile}
                  onChange={(e) => setTempProfile(e.target.value)}
                />
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => {
                      setProfileData(tempProfile);
                      localStorage.setItem(
                        getUserKey("profile"),
                        JSON.stringify(tempProfile)
                      );
                      setIsEditingProfile(false);
                    }}
                    className="px-3 py-1 bg-green-600 text-white rounded-full text-sm flex items-center gap-1"
                  >
                    <AiOutlineCheck size={16} /> Save
                  </button>
                  <button
                    onClick={() => {
                      setTempProfile(profileData);
                      setIsEditingProfile(true); // stay in edit
                    }}
                    className="px-3 py-1 bg-red-600 text-white rounded-full text-sm flex items-center gap-1"
                  >
                    <AiOutlineClose size={16} /> Cancel
                  </button>
                </div>
              </>
            ) : (
              <p
                className="text-sm text-gray-800 cursor-pointer"
                onClick={() => {
                  setTempProfile(profileData);
                  setIsEditingProfile(true);
                }}
              >
                {profileData}
              </p>
            )}
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-md font-bold text-[#1B2A41] border-b border-gray-300 pb-1 mb-2 uppercase">
              Work Experience
            </h2>
            {isEditingExperience ? (
              <>
                {tempExperience.map((exp, i) => (
                  <div key={i} className="mb-5 space-y-1">
                    <input
                      type="text"
                      className="text-sm text-black w-full px-2 py-1 rounded border"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = [...tempExperience];
                        updated[i].company = e.target.value;
                        setTempExperience(updated);
                      }}
                    />
                    <input
                      type="text"
                      className="text-sm text-black w-full px-2 py-1 rounded border"
                      value={exp.role}
                      onChange={(e) => {
                        const updated = [...tempExperience];
                        updated[i].role = e.target.value;
                        setTempExperience(updated);
                      }}
                    />
                    <input
                      type="text"
                      className="text-sm text-black w-full px-2 py-1 rounded border"
                      value={exp.years}
                      onChange={(e) => {
                        const updated = [...tempExperience];
                        updated[i].years = e.target.value;
                        setTempExperience(updated);
                      }}
                    />
                    {exp.bullets.map((b, j) => (
                      <input
                        key={j}
                        type="text"
                        className="text-sm text-black w-full px-2 py-1 rounded border"
                        value={b}
                        onChange={(e) => {
                          const updated = [...tempExperience];
                          updated[i].bullets[j] = e.target.value;
                          setTempExperience(updated);
                        }}
                      />
                    ))}
                  </div>
                ))}
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => {
                      setExperienceData(tempExperience);
                      localStorage.setItem(
                        getUserKey("experience"),
                        JSON.stringify(tempExperience)
                      );
                      setIsEditingExperience(false);
                    }}
                    className="px-3 py-1 bg-green-600 text-white rounded-full text-sm flex items-center gap-1"
                  >
                    <AiOutlineCheck size={16} /> Save
                  </button>
                  <button
                    onClick={() => {
                      setTempExperience(JSON.parse(JSON.stringify(experienceData)));
                      setIsEditingExperience(true);
                    }}
                    className="px-3 py-1 bg-red-600 text-white rounded-full text-sm flex items-center gap-1"
                  >
                    <AiOutlineClose size={16} /> Cancel
                  </button>
                </div>
              </>
            ) : (
              <div
                onClick={() => {
                  setTempExperience(JSON.parse(JSON.stringify(experienceData)));
                  setIsEditingExperience(true);
                }}
                className="cursor-pointer"
              >
                {experienceData.map((exp, i) => (
                  <div key={i} className="mb-5">
                    <p className="text-sm font-bold">{exp.company}</p>
                    <p className="text-sm text-gray-600">
                      {exp.role} | {exp.years}
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-800 mt-1">
                      {exp.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
