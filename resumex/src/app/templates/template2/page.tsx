import React from "react";
import { useState, useEffect, useRef } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

export default function Template2Page() {

  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactData, setContactData] = useState({
    phone: "+123-456-7890",
    email: "john.doe@gmail.com",
    address: "123 Anywhere St, Any City",
    website: "www.johndoesite.com",
  });
  const [tempContact, setTempContact] = useState(contactData);

  useEffect(() => {
    const saved = localStorage.getItem("template2Contact");
    if (saved) {
      setContactData(JSON.parse(saved));
      setTempContact(JSON.parse(saved));
    }
  }, []);

  //for education section
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
    const savedEducation = localStorage.getItem("template2Education");
    if (savedEducation) {
      setEducationData(JSON.parse(savedEducation));
      setTempEducation(JSON.parse(savedEducation));
    }
  }, []);

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
    const savedSkills = localStorage.getItem("template2Skills");
    if (savedSkills) {
      setSkillsData(JSON.parse(savedSkills));
      setTempSkills(JSON.parse(savedSkills));
    }
  }, []);

  const [isEditingLanguages, setIsEditingLanguages] = useState(false);
  const [languagesData, setLanguagesData] = useState([
    "English (Fluent)",
    "French (Fluent)",
    "Spanish (Intermediate)",
  ]);
  const [tempLanguages, setTempLanguages] = useState(languagesData);

  useEffect(() => {
    const savedLanguages = localStorage.getItem("template2Languages");
    if (savedLanguages) {
      setLanguagesData(JSON.parse(savedLanguages));
      setTempLanguages(JSON.parse(savedLanguages));
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75V6.75A2.25 2.25 0 014.5 4.5h2.121a1.5 1.5 0 001.06-.44l.94-.94A1.5 1.5 0 0110.061 3h3.878a1.5 1.5 0 011.06.44l.94.94a1.5 1.5 0 001.061.44H19.5a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25z" />
                </svg>
              </div>
            </div>

            {/* Contact (Editable) */}
            <div className="space-y-2">
              <h2 className="text-lg font-bold tracking-wide border-b border-white pb-2">CONTACT</h2>

              {isEditingContact ? (
                  <>
                    <input
                        type="text"
                        className="text-sm text-black w-full px-2 py-1 rounded"
                        value={tempContact.phone}
                        onChange={(e) => setTempContact({ ...tempContact, phone: e.target.value })}
                    />
                    <input
                        type="text"
                        className="text-sm text-black w-full px-2 py-1 rounded"
                        value={tempContact.email}
                        onChange={(e) => setTempContact({ ...tempContact, email: e.target.value })}
                    />
                    <input
                        type="text"
                        className="text-sm text-black w-full px-2 py-1 rounded"
                        value={tempContact.address}
                        onChange={(e) => setTempContact({ ...tempContact, address: e.target.value })}
                    />
                    <input
                        type="text"
                        className="text-sm text-black w-full px-2 py-1 rounded"
                        value={tempContact.website}
                        onChange={(e) => setTempContact({ ...tempContact, website: e.target.value })}
                    />

                    {/* Save & Cancel Buttons */}
                    <div className="mt-4 flex gap-3">
                      <button
                          onClick={() => {
                            setContactData(tempContact);
                            localStorage.setItem("template2Contact", JSON.stringify(tempContact));
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
                  <div onClick={() => setIsEditingContact(true)} className="cursor-pointer space-y-1">
                    <p className="text-sm break-words">{contactData.phone}</p>
                    <p className="text-sm break-words">{contactData.email}</p>
                    <p className="text-sm break-words">{contactData.address}</p>
                    <p className="text-sm break-words">{contactData.website}</p>
                  </div>
              )}
            </div>

            {/* Education (Editable) */}
            <div className="space-y-2">
              <h2 className="text-lg font-bold tracking-wide border-b border-white pb-2">EDUCATION</h2>

              {isEditingEducation ? (
                  <>
                    {tempEducation.map((edu, index) => (
                        <div key={index} className="space-y-1">
                          <input
                              type="text"
                              className="text-sm text-black w-full px-2 py-1 rounded"
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
                              value={edu.degree}
                              onChange={(e) => {
                                const updated = [...tempEducation];
                                updated[index] = { ...updated[index], degree: e.target.value };
                                setTempEducation(updated);
                              }}
                          />
                        </div>
                    ))}

                    {/* Save & Cancel Buttons */}
                    <div className="mt-4 flex gap-3">
                      <button
                          onClick={() => {
                            setEducationData(tempEducation);
                            localStorage.setItem("template2Education", JSON.stringify(tempEducation));
                            setIsEditingEducation(false);
                          }}
                          className="px-3 py-1 bg-green-600 text-white rounded-full text-sm flex items-center gap-1 whitespace-nowrap"
                      >
                        <AiOutlineCheck size={16} /> Save
                      </button>
                      <button
                          onClick={() => {
                            setTempEducation(educationData.map(entry => ({ ...entry }))); // deep copy!
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
                        setTempEducation(educationData.map(entry => ({ ...entry }))); // deep copy!
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
              <h2 className="text-lg font-bold tracking-wide border-b border-white pb-2">SKILLS</h2>

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
                            localStorage.setItem("template2Skills", JSON.stringify(tempSkills));
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

            {/* Languages (Editable) */}
            <div className="space-y-2">
              <h2 className="text-lg font-bold tracking-wide border-b border-white pb-2">LANGUAGES</h2>

              {isEditingLanguages ? (
                  <>
                    {tempLanguages.map((lang, index) => (
                        <input
                            key={index}
                            type="text"
                            className="text-sm text-black w-full px-2 py-1 rounded"
                            value={lang}
                            onChange={(e) => {
                              const updated = [...tempLanguages];
                              updated[index] = e.target.value;
                              setTempLanguages(updated);
                            }}
                        />
                    ))}

                    {/* Save & Cancel Buttons */}
                    <div className="mt-4 flex gap-3">
                      <button
                          onClick={() => {
                            setLanguagesData(tempLanguages);
                            localStorage.setItem("template2Languages", JSON.stringify(tempLanguages));
                            setIsEditingLanguages(false);
                          }}
                          className="px-3 py-1 bg-green-600 text-white rounded-full text-sm flex items-center gap-1 whitespace-nowrap"
                      >
                        <AiOutlineCheck size={16} /> Save
                      </button>
                      <button
                          onClick={() => {
                            setTempLanguages([...languagesData]);
                            setIsEditingLanguages(true); // stay in edit mode
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
                        setTempLanguages([...languagesData]);
                        setIsEditingLanguages(true);
                      }}
                      className="cursor-pointer space-y-1"
                  >
                    {languagesData.map((lang, index) => (
                        <p key={index} className="text-sm">{lang}</p>
                    ))}
                  </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="md:col-span-6 pr-12 pl-4 space-y-10">
            {/* Header */}
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold text-[#1B2A41] uppercase">John Doe</h1>
              <h2 className="text-md font-semibold text-[#2D72D9]">Marketing Manager</h2>
            </div>

            {/* Profile */}
            <div>
              <h2 className="text-md font-bold text-[#1B2A41] border-b border-gray-300 pb-1 mb-2 uppercase">Profile</h2>
              <p className="text-sm text-gray-800">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.
              </p>
            </div>

            {/* Work Experience */}
            <div>
              <h2 className="text-md font-bold text-[#1B2A41] border-b border-gray-300 pb-1 mb-2 uppercase">Work Experience</h2>
              <div className="mb-5">
                <p className="text-sm font-bold">Borcelle Studio</p>
                <p className="text-sm text-gray-600">Marketing Manager & Specialist | 2030 – Present</p>
                <ul className="list-disc list-inside text-sm text-gray-800 mt-1">
                  <li>Develop and execute comprehensive marketing strategies and campaigns aligned with the company’s goals and objectives.</li>
                  <li>Lead, mentor, and manage a high-performing marketing team.</li>
                  <li>Collaborate with cross-functional departments to ensure brand consistency.</li>
                </ul>
              </div>
              <div className="mb-5">
                <p className="text-sm font-bold">Fauget Studios</p>
                <p className="text-sm text-gray-600">Marketing Manager & Specialist | 2025 – 2029</p>
                <ul className="list-disc list-inside text-sm text-gray-800 mt-1">
                  <li>Create and manage the marketing budget, ensuring efficient allocation of resources.</li>
                  <li>Oversee market research to identify emerging trends, customer needs, and competitors’ activities.</li>
                  <li>Coordinate the production of marketing materials.</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-bold">Studio Showdeo</p>
                <p className="text-sm text-gray-600">Marketing Manager & Specialist | 2024 – 2025</p>
                <ul className="list-disc list-inside text-sm text-gray-800 mt-1">
                  <li>Develop and manage relationships with partners, agencies, and vendors.</li>
                  <li>Monitor and assess brand consistency across all marketing channels and materials.</li>
                </ul>
              </div>
            </div>

            {/* Reference */}
            <div>
              <h2 className="text-md font-bold text-[#1B2A41] border-b border-gray-300 pb-1 mb-2 uppercase">Reference</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-800">
                <div>
                  <p className="font-semibold">Estelle Darcy</p>
                  <p>Wardiere Inc. / CTO</p>
                  <p>Phone: +123-456-7890</p>
                </div>
                <div>
                  <p className="font-semibold">Harper Richard</p>
                  <p>Wardiere Inc. / CEO</p>
                  <p>Phone: +123-456-7890</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
