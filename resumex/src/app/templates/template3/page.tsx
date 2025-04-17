import React, { useState, useEffect } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

function getUserKey(key: string) {
  const userData = localStorage.getItem("userData");
  const userId = userData ? JSON.parse(userData)?.name : "guest";
  return `${userId}_template3_${key}`;
}

export default function Template3Page() {
  const [activeTab, setActiveTab] = useState("profile");
  const tabs = ["profile", "education & projects", "skills", "work", "awards"];

  // Editable Header
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [headerData, setHeaderData] = useState({
    name: "John Doe",
    title: "Frontend Web Developer"
  });
  const [tempHeader, setTempHeader] = useState(headerData);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(getUserKey("Header"));
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.name && parsed?.title) {
          setHeaderData(parsed);
          setTempHeader(parsed);
        }
      }
    } catch (err) {
      console.warn("Failed to load header data:", err);
    }
  }, []);

  // Editable "Hello!" Section
  const [isEditingHello, setIsEditingHello] = useState(false);
  const [helloText, setHelloText] = useState(
    "I'm passionate about technology and human behavior, hardworker and a fast-learner with experience in around 10 different countries studying, working and volunteering."
  );
  const [tempHelloText, setTempHelloText] = useState(helloText);

  useEffect(() => {
    const savedHello = localStorage.getItem(getUserKey("Hello"));
    if (savedHello) {
      setHelloText(savedHello);
      setTempHelloText(savedHello);
    }
  }, []);

  // Editable Contact Info
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    phone: "+1 123 456 789",
    email: "abc@gmail.com",
    addressLine1: "Someplace, 5",
    addressLine2: "ON, Canada",
    addressLine3: "A1B 2C3"
  });
  const [tempContactInfo, setTempContactInfo] = useState(contactInfo);

  useEffect(() => {
    const savedContact = localStorage.getItem(getUserKey("Contact"));
    if (savedContact) {
      const parsed = JSON.parse(savedContact);
      setContactInfo(parsed);
      setTempContactInfo(parsed);
    }
  }, []);

  //for social section
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState(""); // "facebook", "twitter", "linkedin"
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    twitter: "",
    linkedin: ""
  });
  const [tempSocialLinks, setTempSocialLinks] = useState({ ...socialLinks });

  useEffect(() => {
    const saved = localStorage.getItem(getUserKey("Social"));
    if (saved) {
      const parsed = JSON.parse(saved);
      setSocialLinks(parsed);
      setTempSocialLinks(parsed);
    }
  }, []);

  // for profile section
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileText, setProfileText] = useState(
    `"There is no end to education... The whole of life... is a process of learning."`
  );
  const [tempProfileText, setTempProfileText] = useState(profileText);
  const [profileAuthor, setProfileAuthor] = useState("Jiddu Krishnamurti");
  const [tempProfileAuthor, setTempProfileAuthor] = useState(profileAuthor);

  useEffect(() => {
    const savedProfile = localStorage.getItem(getUserKey("Profile"));
    const savedProfileAuthor = localStorage.getItem(getUserKey("ProfileAuthor"));
    if (savedProfile) {
      setProfileText(savedProfile);
      setTempProfileText(savedProfile);
    }
    if (savedProfileAuthor) {
      setProfileAuthor(savedProfileAuthor);
      setTempProfileAuthor(savedProfileAuthor);
    }
  }, []);

  // Few words about me section
  const [aboutMeText, setAboutMeText] = useState(
    "Until now, in my life, I change from active moments... I consider myself a tolerant and respectful person... I really like to listen to people stories..."
  );
  const [tempAboutMeText, setTempAboutMeText] = useState(aboutMeText);
  const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);

  useEffect(() => {
    const savedAboutMe = localStorage.getItem(getUserKey("AboutMe"));
    if (savedAboutMe) {
      setAboutMeText(savedAboutMe);
      setTempAboutMeText(savedAboutMe);
    }
  }, []);

  // for philosophy section
  const [philosophyText, setPhilosophyText] = useState(
    "I believe in ethic and moral, not imposed rules... life is made from different shades of grey... as a human being... our duty is to treat others well..."
  );
  const [tempPhilosophyText, setTempPhilosophyText] = useState(philosophyText);
  const [isEditingPhilosophy, setIsEditingPhilosophy] = useState(false);

  useEffect(() => {
    const savedPhilosophy = localStorage.getItem(getUserKey("Philosophy"));
    if (savedPhilosophy) {
      setPhilosophyText(savedPhilosophy);
      setTempPhilosophyText(savedPhilosophy);
    }
  }, []);

  const [philosophyTraits, setPhilosophyTraits] = useState([
    "Pragmatic",
    "Honest",
    "Respectful",
    "Open-minded",
    "Coherent"
  ]);
  const [tempTraits, setTempTraits] = useState([...philosophyTraits]);

  useEffect(() => {
    const saved = localStorage.getItem(getUserKey("PhilosophyTraits"));
    if (saved) {
      const parsed = JSON.parse(saved);
      setPhilosophyTraits(parsed);
      setTempTraits(parsed);
    }
  }, []);

  // for Interests & Hobbies
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [interestsList, setInterestsList] = useState([
    "Visiting new places",
    "Meeting people",
    "Having new experiences",
    "Hiking and Biking",
    "Web Developing",
    "Computer Gaming",
    "Manga and Anime"
  ]);
  const [tempInterestsList, setTempInterestsList] = useState([...interestsList]);

  useEffect(() => {
    const saved = localStorage.getItem(getUserKey("Interests"));
    if (saved) {
      const parsed = JSON.parse(saved);
      setInterestsList(parsed);
      setTempInterestsList(parsed);
    }
  }, []);

  const [interestIntro, setInterestIntro] = useState(
    "I'm passionate about technology and human behavior, both determine almost all my interests and hobbies:"
  );
  const [tempInterestIntro, setTempInterestIntro] = useState(interestIntro);

  useEffect(() => {
    const saved = localStorage.getItem(getUserKey("InterestIntro"));
    if (saved) {
      setInterestIntro(saved);
      setTempInterestIntro(saved);
    }
  }, []);

  // for education section
  const [educationList, setEducationList] = useState([
    {
      school: "Rotman School of Management, University of Toronto",
      degree: "MBA",
      year: "2022 – 2024",
      location: "Toronto, ON"
    },
    {
      school: "Brock University",
      degree: "BCom, Marketing",
      year: "2018 – 2022",
      location: "St. Catharines, ON"
    }
  ]);
  const [tempEducationList, setTempEducationList] = useState([...educationList]);
  const [editingEducationIndex, setEditingEducationIndex] = useState<number | null>(
    null
  );

  const handleEducationChange = (index: number, field: string, value: string) => {
    const updated = [...tempEducationList];
    updated[index] = { ...updated[index], [field]: value };
    setTempEducationList(updated);
  };

  const saveEducation = () => {
    setEducationList(tempEducationList);
    setEditingEducationIndex(null);
    localStorage.setItem(getUserKey("Education"), JSON.stringify(tempEducationList));
  };

  const cancelEducation = () => {
    setTempEducationList([...educationList]);
  };

  useEffect(() => {
    const saved = localStorage.getItem(getUserKey("Education"));
    if (saved) {
      const parsed = JSON.parse(saved);
      setEducationList(parsed);
      setTempEducationList(parsed);
    }
  }, []);

  // for project highlight section
  const [projectList, setProjectList] = useState([
    {
      title: "Market Expansion Strategy for Lush Cosmetics",
      description1:
        "Led a 4-member team to design a strategic plan for expanding Lush Cosmetics into untapped Canadian markets.",
      description2:
        "Conducted market research, competitor analysis, and consumer behavior profiling to support recommendations.",
      tools: "Tools: SWOT Analysis, PESTEL, SurveyMonkey, Canva"
    },
    {
      title: "Social Media ROI Analysis for a Nonprofit",
      description1:
        "Analyzed engagement metrics and campaign performance across Instagram, LinkedIn, and Twitter for a local nonprofit.",
      description2:
        "Provided recommendations to improve ROI and optimize content scheduling for a 15% reach increase.",
      tools: "Tools: Google Analytics, Hootsuite, Excel, PowerPoint"
    }
  ]);
  const [tempProjectList, setTempProjectList] = useState([...projectList]);
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(
    null
  );

  const handleProjectChange = (index: number, field: string, value: string) => {
    const updated = [...tempProjectList];
    updated[index] = { ...updated[index], [field]: value };
    setTempProjectList(updated);
  };

  const saveProject = () => {
    setProjectList(tempProjectList);
    setEditingProjectIndex(null);
    localStorage.setItem(getUserKey("Project"), JSON.stringify(tempProjectList));
  };

  const cancelProject = () => {
    setTempProjectList([...projectList]);
  };

  useEffect(() => {
    const saved = localStorage.getItem(getUserKey("Project"));
    if (saved) {
      const parsed = JSON.parse(saved);
      setProjectList(parsed);
      setTempProjectList(parsed);
    }
  }, []);

  // for certifications section
  const [certificationList, setCertificationList] = useState([
    {
      title: "Google Digital Marketing & E-commerce Certificate",
      issuer: "Coursera (Offered by Google)",
      date: "Issued: May 2023"
    },
    {
      title: "Financial Markets",
      issuer: "Yale University, Coursera",
      date: "Issued: January 2023"
    },
    {
      title: "Excel Skills for Business: Essentials",
      issuer: "Macquarie University, Coursera",
      date: "Issued: August 2022"
    }
  ]);
  const [tempCertificationList, setTempCertificationList] = useState([
    ...certificationList
  ]);
  const [editingCertIndex, setEditingCertIndex] = useState<number | null>(null);

  const handleCertChange = (index: number, field: string, value: string) => {
    const updated = [...tempCertificationList];
    updated[index] = { ...updated[index], [field]: value };
    setTempCertificationList(updated);
  };

  const saveCert = () => {
    setCertificationList(tempCertificationList);
    setEditingCertIndex(null);
    localStorage.setItem(getUserKey("Certifications"), JSON.stringify(tempCertificationList));
  };

  const cancelCert = () => {
    setTempCertificationList([...certificationList]);
  };

  useEffect(() => {
    const saved = localStorage.getItem(getUserKey("Certifications"));
    if (saved) {
      const parsed = JSON.parse(saved);
      setCertificationList(parsed);
      setTempCertificationList(parsed);
    }
  }, []);

  //for technical skills
  const [isEditingTechSkills, setIsEditingTechSkills] = useState(false);
  const [techSkills, setTechSkills] = useState(
    "Microsoft Excel (VLOOKUP, PivotTables, Macros), PowerPoint, Google Analytics, Hootsuite, Tableau, Power BI, SurveyMonkey, Qualtrics"
  );
  const [tempTechSkills, setTempTechSkills] = useState(techSkills);

  //for soft skills
  const [isEditingSoftSkills, setIsEditingSoftSkills] = useState(false);
  const [softSkills, setSoftSkills] = useState([
    "Strategic Thinking",
    "Team Collaboration",
    "Public Speaking & Presentation",
    "Problem Solving",
    "Adaptability & Time Management"
  ]);
  const [tempSoftSkills, setTempSoftSkills] = useState([...softSkills]);

  //for languages
  const [isEditingLanguages, setIsEditingLanguages] = useState(false);
  const [languages, setLanguages] = useState([
    "English — Full Professional Proficiency",
    "French — Intermediate",
    "Hindi — Native"
  ]);
  const [tempLanguages, setTempLanguages] = useState([...languages]);

  useEffect(() => {
    const saved = localStorage.getItem(getUserKey("TechSkills"));
    if (saved) {
      setTechSkills(saved);
      setTempTechSkills(saved);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(getUserKey("SoftSkills"));
    if (saved) {
      const parsed = JSON.parse(saved);
      setSoftSkills(parsed);
      setTempSoftSkills(parsed);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(getUserKey("Languages"));
    if (saved) {
      const parsed = JSON.parse(saved);
      setLanguages(parsed);
      setTempLanguages(parsed);
    }
  }, []);

  // for work experience
  const [workList, setWorkList] = useState([
    {
      title: "Marketing Intern",
      company: "Nestlé Canada",
      location: "Toronto, ON",
      duration: "May 2023 – Aug 2023",
      description: "Assisted in launching a new snack product line and analyzed consumer engagement."
    },
    {
      title: "Sales Associate",
      company: "Hudson's Bay Company",
      location: "St. Catharines, ON",
      duration: "May 2021 – Aug 2022",
      description: "Provided customer service, maintained merchandising standards, and supported inventory."
    }
  ]);
  const [tempWorkList, setTempWorkList] = useState([...workList]);
  const [editingWorkIndex, setEditingWorkIndex] = useState<number | null>(null);

  const handleWorkChange = (index: number, field: string, value: string) => {
    const updated = [...tempWorkList];
    updated[index] = { ...updated[index], [field]: value };
    setTempWorkList(updated);
  };

  const saveWork = () => {
    setWorkList(tempWorkList);
    localStorage.setItem(getUserKey("Work"), JSON.stringify(tempWorkList));
    setEditingWorkIndex(null);
  };

  const cancelWork = () => {
    setTempWorkList([...workList]);
  };

  useEffect(() => {
    const saved = localStorage.getItem(getUserKey("Work"));
    if (saved) {
      const parsed = JSON.parse(saved);
      setWorkList(parsed);
      setTempWorkList(parsed);
    }
  }, []);

  // for awards
  const [awardList, setAwardList] = useState([
    {
      title: "Business Innovation Hackathon Winner",
      org: "Tech4Impact Hackathon – UofT",
      dateLocation: "2023 | Toronto, ON",
      description: "Developed a retail analytics dashboard that optimized inventory turnover for small businesses using customer behavior insights."
    },
    {
      title: "Academic Excellence Award",
      org: "Brock University",
      dateLocation: "2022 | St. Catharines, ON",
      description: "Awarded for maintaining a GPA in the top 5% of the business faculty cohort."
    },
    {
      title: "Dean’s Honour List",
      org: "Goodman School of Business",
      dateLocation: "2019 – 2022 | St. Catharines, ON",
      description: "Recognized for consistent academic achievement over 6 consecutive terms."
    },
    {
      title: "Marketing Case Competition Finalist",
      org: "Inter-Collegiate Business Competition (ICBC)",
      dateLocation: "2021 | Kingston, ON",
      description: "Selected among top 5 teams nationwide for strategy presentation and solution clarity."
    }
  ]);
  const [tempAwardList, setTempAwardList] = useState([...awardList]);
  const [editingAwardIndex, setEditingAwardIndex] = useState<number | null>(null);

  const handleAwardChange = (index: number, field: string, value: string) => {
    const updated = [...tempAwardList];
    updated[index] = { ...updated[index], [field]: value };
    setTempAwardList(updated);
  };

  const saveAward = () => {
    setAwardList(tempAwardList);
    localStorage.setItem(getUserKey("Awards"), JSON.stringify(tempAwardList));
    setEditingAwardIndex(null);
  };

  const cancelAward = () => {
    setTempAwardList([...awardList]);
  };

  useEffect(() => {
    const saved = localStorage.getItem(getUserKey("Awards"));
    if (saved) {
      const parsed = JSON.parse(saved);
      setAwardList(parsed);
      setTempAwardList(parsed);
    }
  }, []);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-10 py-10 bg-white rounded shadow-sm font-sans text-gray-800 leading-relaxed overflow-y-auto max-h-[calc(100vh-160px)] border border-gray-300">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        {isEditingHeader ? (
          <div className="w-full space-y-2">
            <input
              type="text"
              className="text-3xl font-bold w-full px-3 py-2 border rounded"
              value={tempHeader.name}
              onChange={(e) =>
                setTempHeader({ ...tempHeader, name: e.target.value })
              }
            />
            <input
              type="text"
              className="text-md uppercase text-gray-500 w-full px-3 py-2 border rounded"
              value={tempHeader.title}
              onChange={(e) =>
                setTempHeader({ ...tempHeader, title: e.target.value })
              }
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  setHeaderData(tempHeader);
                  localStorage.setItem(getUserKey("Header"), JSON.stringify(tempHeader));
                  setIsEditingHeader(false);
                }}
                className="bg-green-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
              >
                <AiOutlineCheck size={16} /> Save
              </button>
              <button
                onClick={() => {
                  setTempHeader(headerData);
                  setIsEditingHeader(true);
                }}
                className="bg-red-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
              >
                <AiOutlineClose size={16} /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div onClick={() => setIsEditingHeader(true)} className="cursor-pointer">
            <h1 className="text-4xl font-extrabold">
              {headerData.name ? headerData.name.split(" ")[0] : ""}
              {" "}
              <span className="text-purple-600">
                {headerData.name ? headerData.name.split(" ").slice(1).join(" ") : ""}
              </span>
            </h1>
            <h2 className="text-lg uppercase tracking-wide text-gray-500 mt-1">
              {headerData.title}
            </h2>
          </div>
        )}
      </div>

      {/* TABS */}
      <div className="flex justify-start flex-wrap gap-6 border-b mb-8 text-sm font-medium">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 capitalize ${activeTab === tab ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500 hover:text-purple-600"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LEFT COLUMN */}
        <div className="space-y-10 md:col-span-1 left-column">
          <div className="relative w-32 h-32 rounded-full bg-gray-300 mx-auto">
            {/* Camera icon overlay */}
            <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md cursor-pointer hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                   stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15.75 10.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M2.25 15.75V6.75A2.25 2.25 0 014.5 4.5h2.121a1.5 1.5 0 001.06-.44l.94-.94A1.5 1.5 0 0110.061 3h3.878a1.5 1.5 0 011.06.44l.94.94a1.5 1.5 0 001.061.44H19.5a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25z"/>
              </svg>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold">Hello!</h2>
            {isEditingHello ? (
              <>
                <textarea
                  className="text-sm text-black w-full px-3 py-2 border rounded"
                  rows={4}
                  value={tempHelloText}
                  onChange={(e) => setTempHelloText(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setHelloText(tempHelloText);
                      localStorage.setItem(getUserKey("Hello"), tempHelloText);
                      setIsEditingHello(false);
                    }}
                    className="bg-green-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    <AiOutlineCheck size={16} /> Save
                  </button>
                  <button
                    onClick={() => {
                      setTempHelloText(helloText);
                      setIsEditingHello(true);
                    }}
                    className="bg-red-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    <AiOutlineClose size={16} /> Cancel
                  </button>
                </div>
              </>
            ) : (
              <p
                className="text-sm cursor-pointer"
                onClick={() => {
                  setTempHelloText(helloText);
                  setIsEditingHello(true);
                }}
              >
                {helloText}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold">Contact details</h2>
            {isEditingContact ? (
              <>
                <label className="block text-purple-600 text-sm font-semibold">Phone:</label>
                <input
                  className="w-full text-sm border px-2 py-1 rounded mb-1"
                  value={tempContactInfo.phone}
                  onChange={(e) =>
                    setTempContactInfo({ ...tempContactInfo, phone: e.target.value })
                  }
                />
                <label className="block text-purple-600 text-sm font-semibold">Email:</label>
                <input
                  className="w-full text-sm border px-2 py-1 rounded mb-1"
                  value={tempContactInfo.email}
                  onChange={(e) =>
                    setTempContactInfo({ ...tempContactInfo, email: e.target.value })
                  }
                />
                <label className="block text-purple-600 text-sm font-semibold">Address:</label>
                <input
                  className="w-full text-sm border px-2 py-1 rounded mb-1"
                  value={tempContactInfo.addressLine1}
                  onChange={(e) =>
                    setTempContactInfo({ ...tempContactInfo, addressLine1: e.target.value })
                  }
                />
                <input
                  className="w-full text-sm border px-2 py-1 rounded mb-1"
                  value={tempContactInfo.addressLine2}
                  onChange={(e) =>
                    setTempContactInfo({ ...tempContactInfo, addressLine2: e.target.value })
                  }
                />
                <input
                  className="w-full text-sm border px-2 py-1 rounded"
                  value={tempContactInfo.addressLine3}
                  onChange={(e) =>
                    setTempContactInfo({ ...tempContactInfo, addressLine3: e.target.value })
                  }
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      setContactInfo({ ...tempContactInfo });
                      localStorage.setItem(getUserKey("Contact"), JSON.stringify(tempContactInfo));
                      setIsEditingContact(false);
                      console.log("Updated email to:", tempContactInfo.email);
                    }}
                    className="bg-green-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    <AiOutlineCheck size={16} /> Save
                  </button>
                  <button
                    onClick={() => {
                      setTempContactInfo(contactInfo);
                      setIsEditingContact(true);
                    }}
                    className="bg-red-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    <AiOutlineClose size={16} /> Cancel
                  </button>
                </div>
              </>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setTempContactInfo(contactInfo);
                  setIsEditingContact(true);
                }}
              >
                <p className="text-purple-600 text-sm font-semibold">Phone:</p>
                <p>{contactInfo.phone}</p>
                <p className="text-purple-600 text-sm font-semibold">Email:</p>
                <p>{contactInfo.email}</p>
                <p className="text-purple-600 text-sm font-semibold">Address:</p>
                <p>{contactInfo.addressLine1}</p>
                <p>{contactInfo.addressLine2}</p>
                <p>{contactInfo.addressLine3}</p>
              </div>
            )}
          </div>

          {/* Removed "Send me a message" button */}
          {/*
          {contactInfo.email ? (
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-block bg-purple-600 text-white px-4 py-2 mt-4 rounded-md text-sm hover:bg-purple-700 transition"
            >
              Send me a message
            </a>
          ) : (
            <p className="text-sm text-red-600 mt-4">
              Please enter your email above to activate this button.
            </p>
          )}
          */}

          {/* Removed "Get social" section */}
          {/*
          <div>
            <h2 className="text-lg font-bold mt-8 mb-2">Get social</h2>
            <ul className="text-sm space-y-1">
              {["facebook", "twitter", "linkedin"].map((platform) => (
                <li key={platform}>
                  <button
                    onClick={() => {
                      setEditingPlatform(platform);
                      setShowSocialModal(true);
                    }}
                    className={`text-sm capitalize text-blue-600 hover:underline`}
                  >
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          */}
        </div>

        {/* RIGHT COLUMN CONTENT */}
        <div className="md:col-span-2 space-y-10 right-column">
          {activeTab === "profile" && (
            <>
              <div className="space-y-4">
                <h1 className="text-2xl font-bold">Profile</h1>
                {isEditingProfile ? (
                  <>
                    <textarea
                      className="w-full border px-3 py-2 rounded text-sm"
                      rows={3}
                      value={tempProfileText}
                      onChange={(e) => setTempProfileText(e.target.value)}
                    />
                    <input
                      className="w-full border px-3 py-2 rounded text-sm mt-2"
                      placeholder="Author"
                      value={tempProfileAuthor}
                      onChange={(e) => setTempProfileAuthor(e.target.value)}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => {
                          setProfileText(tempProfileText);
                          setProfileAuthor(tempProfileAuthor);
                          localStorage.setItem(getUserKey("Profile"), tempProfileText);
                          localStorage.setItem(getUserKey("ProfileAuthor"), tempProfileAuthor);
                          setIsEditingProfile(false);
                        }}
                        className="bg-green-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <AiOutlineCheck size={16} /> Save
                      </button>
                      <button
                        onClick={() => {
                          setTempProfileText(profileText);
                          setTempProfileAuthor(profileAuthor);
                          setIsEditingProfile(true);
                        }}
                        className="bg-red-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <AiOutlineClose size={16} /> Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <blockquote
                    className="italic border-l-4 border-purple-600 pl-4 cursor-pointer"
                    onClick={() => {
                      setTempProfileText(profileText);
                      setTempProfileAuthor(profileAuthor);
                      setIsEditingProfile(true);
                    }}
                  >
                    <p>{profileText}</p>
                    <p className="text-sm">- {profileAuthor}</p>
                  </blockquote>
                )}
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">A few words about me</h2>
                {isEditingAboutMe ? (
                  <>
                    <textarea
                      className="w-full border px-3 py-2 rounded text-sm"
                      rows={4}
                      value={tempAboutMeText}
                      onChange={(e) => setTempAboutMeText(e.target.value)}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => {
                          setAboutMeText(tempAboutMeText);
                          localStorage.setItem(getUserKey("AboutMe"), tempAboutMeText);
                          setIsEditingAboutMe(false);
                        }}
                        className="bg-green-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <AiOutlineCheck size={16} /> Save
                      </button>
                      <button
                        onClick={() => {
                          setTempAboutMeText(aboutMeText);
                          setIsEditingAboutMe(true);
                        }}
                        className="bg-red-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <AiOutlineClose size={16} /> Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <p
                    className="text-sm cursor-pointer"
                    onClick={() => {
                      setTempAboutMeText(aboutMeText);
                      setIsEditingAboutMe(true);
                    }}
                  >
                    {aboutMeText}
                  </p>
                )}
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">Philosophy</h2>
                {isEditingPhilosophy ? (
                  <>
                    <textarea
                      className="w-full border px-3 py-2 rounded text-sm"
                      rows={4}
                      value={tempPhilosophyText}
                      onChange={(e) => setTempPhilosophyText(e.target.value)}
                    />
                    <div className="mt-4 space-y-2">
                      {tempTraits.map((trait, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <input
                            className="w-full border px-2 py-1 rounded text-sm"
                            value={trait}
                            onChange={(e) => {
                              const newTraits = [...tempTraits];
                              newTraits[index] = e.target.value;
                              setTempTraits(newTraits);
                            }}
                          />
                          <button
                            onClick={() => {
                              const updated = [...tempTraits];
                              updated.splice(index, 1);
                              setTempTraits(updated);
                            }}
                            className="text-red-600 hover:text-red-800 text-sm"
                            title="Remove"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        className="text-blue-600 text-sm mt-1 underline"
                        onClick={() => setTempTraits([...tempTraits, ""])}
                      >
                        + Add Trait
                      </button>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => {
                          setPhilosophyText(tempPhilosophyText);
                          setPhilosophyTraits(tempTraits);
                          localStorage.setItem(getUserKey("Philosophy"), tempPhilosophyText);
                          localStorage.setItem(getUserKey("PhilosophyTraits"), JSON.stringify(tempTraits));
                          setIsEditingPhilosophy(false);
                        }}
                        className="bg-green-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <AiOutlineCheck size={16} /> Save
                      </button>
                      <button
                        onClick={() => {
                          setTempPhilosophyText(philosophyText);
                          setTempTraits([...philosophyTraits]);
                          setIsEditingPhilosophy(true);
                        }}
                        className="bg-red-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <AiOutlineClose size={16} /> Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p
                      className="text-sm cursor-pointer"
                      onClick={() => {
                        setTempPhilosophyText(philosophyText);
                        setTempTraits([...philosophyTraits]);
                        setIsEditingPhilosophy(true);
                      }}
                    >
                      {philosophyText}
                    </p>
                    <ul className="list-disc list-inside text-sm mt-2">
                      {philosophyTraits.map((trait, i) => (
                        <li key={i}>{trait}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">Interests & Hobbies</h2>
                {isEditingInterests ? (
                  <>
                    <textarea
                      className="text-sm w-full border px-3 py-2 rounded mb-2"
                      rows={2}
                      value={tempInterestIntro}
                      onChange={(e) => setTempInterestIntro(e.target.value)}
                    />
                    <div className="space-y-2">
                      {tempInterestsList.map((item, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <input
                            className="w-full border px-2 py-1 rounded text-sm"
                            value={item}
                            onChange={(e) => {
                              const updated = [...tempInterestsList];
                              updated[idx] = e.target.value;
                              setTempInterestsList(updated);
                            }}
                          />
                          <button
                            onClick={() => {
                              const updated = [...tempInterestsList];
                              updated.splice(idx, 1);
                              setTempInterestsList(updated);
                            }}
                            className="text-red-600 hover:text-red-800 text-sm"
                            title="Remove"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        className="text-blue-600 text-sm mt-1 underline"
                        onClick={() => setTempInterestsList([...tempInterestsList, ""])}
                      >
                        + Add Interest
                      </button>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => {
                          setInterestsList(tempInterestsList);
                          setInterestIntro(tempInterestIntro);
                          localStorage.setItem(getUserKey("Interests"), JSON.stringify(tempInterestsList));
                          localStorage.setItem(getUserKey("InterestIntro"), tempInterestIntro);
                          setIsEditingInterests(false);
                        }}
                        className="bg-green-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <AiOutlineCheck size={16} /> Save
                      </button>
                      <button
                        onClick={() => {
                          setTempInterestsList([...interestsList]);
                          setTempInterestIntro(interestIntro);
                          setIsEditingInterests(true);
                        }}
                        className="bg-red-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <AiOutlineClose size={16} /> Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p
                      className="text-sm cursor-pointer mb-2"
                      onClick={() => {
                        setTempInterestsList([...interestsList]);
                        setTempInterestIntro(interestIntro);
                        setIsEditingInterests(true);
                      }}
                    >
                      {interestIntro}
                    </p>
                    <ul className="list-disc list-inside text-sm mt-2">
                      {/* Only show the interests starting from the fourth item */}
                      {interestsList.slice(3).map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </>
          )}

          {activeTab === "education & projects" && (
              <div className="space-y-10">
                <div className="border-l-4 border-purple-600 pl-4">
                  <h2 className="text-2xl font-bold mb-2">Education</h2>
                  {educationList.map((edu, index) => (
                      <div
                          key={index}
                          className="mb-4 cursor-pointer relative"
                          onClick={
                            editingEducationIndex === index
                                ? undefined
                                : () => setEditingEducationIndex(index)
                          }
                      >
                        {editingEducationIndex === index ? (
                            <>
                              <input
                                  type="text"
                                  value={tempEducationList[index].degree}
                                  onChange={(e) =>
                                      handleEducationChange(index, "degree", e.target.value)
                                  }
                                  className="text-sm font-semibold border-b border-gray-300 w-full"
                              />
                              <input
                                  type="text"
                                  value={tempEducationList[index].school}
                                  onChange={(e) =>
                                      handleEducationChange(index, "school", e.target.value)
                                  }
                                  className="text-sm text-gray-600 border-b border-gray-300 w-full"
                              />
                              <input
                                  type="text"
                                  value={tempEducationList[index].year}
                                  onChange={(e) =>
                                      handleEducationChange(index, "year", e.target.value)
                                  }
                                  className="text-sm text-gray-600 border-b border-gray-300 w-full"
                              />
                              <input
                                  type="text"
                                  value={tempEducationList[index].location}
                                  onChange={(e) =>
                                      handleEducationChange(index, "location", e.target.value)
                                  }
                                  className="text-sm text-gray-600 border-b border-gray-300 w-full"
                              />

                              {/* ❌ Remove Entry */}
                              <button
                                  onClick={() => {
                                    const updated = [...tempEducationList];
                                    updated.splice(index, 1);
                                    setTempEducationList(updated);
                                    setEducationList(updated);
                                    localStorage.setItem(getUserKey("Education"), JSON.stringify(updated));
                                    setEditingEducationIndex(null);
                                  }}
                                  className="absolute top-0 right-0 text-red-600 hover:text-red-800"
                                  title="Remove"
                              >
                                <AiOutlineClose size={18} />
                              </button>

                              {/* ➕ Add Education Entry */}
                              <button
                                  onClick={() => {
                                    const newEntry = { school: "", degree: "", year: "", location: "" };
                                    const updated = [...tempEducationList, newEntry];
                                    setTempEducationList(updated);
                                    setEducationList(updated);
                                    setEditingEducationIndex(updated.length - 1);
                                  }}
                                  className="text-sm text-blue-600 mt-4 underline"
                              >
                                + Add Education
                              </button>

                              {/* ✅ Save & Cancel */}
                              <div className="mt-4 flex justify-center gap-4">
                                <button
                                    onClick={saveEducation}
                                    className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition flex items-center gap-2"
                                >
                                  <AiOutlineCheck size={18} /> Save
                                </button>
                                <button
                                    onClick={cancelEducation}
                                    className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition flex items-center gap-2"
                                >
                                  <AiOutlineClose size={18} /> Cancel
                                </button>
                              </div>
                            </>
                        ) : (
                            <div>
                              <p className="text-sm font-semibold text-gray-800">{edu.degree}</p>
                              <p className="text-sm text-gray-600">{edu.school}</p>
                              <p className="text-sm text-gray-500">{edu.year} | {edu.location}</p>
                            </div>
                        )}
                      </div>
                  ))}
                </div>

                <div className="border-l-4 border-purple-600 pl-4">
                <h2 className="text-2xl font-bold mb-1">Project Highlight</h2>
                {projectList.map((project, index) => (
                  <div
                    key={index}
                    className="mb-4 cursor-pointer relative"
                    onClick={
                      editingProjectIndex === index
                        ? undefined
                        : () => setEditingProjectIndex(index)
                    }
                  >
                    {editingProjectIndex === index ? (
                      <>
                        <input
                          type="text"
                          value={tempProjectList[index].title}
                          onChange={(e) =>
                            handleProjectChange(index, "title", e.target.value)
                          }
                          className="text-sm font-semibold border-b border-gray-300 w-full"
                        />
                        <textarea
                          rows={2}
                          value={tempProjectList[index].description1}
                          onChange={(e) =>
                            handleProjectChange(index, "description1", e.target.value)
                          }
                          className="text-sm text-gray-600 border-b border-gray-300 w-full"
                        />
                        <textarea
                          rows={2}
                          value={tempProjectList[index].description2}
                          onChange={(e) =>
                            handleProjectChange(index, "description2", e.target.value)
                          }
                          className="text-sm text-gray-600 border-b border-gray-300 w-full"
                        />
                        <input
                          type="text"
                          value={tempProjectList[index].tools}
                          onChange={(e) =>
                            handleProjectChange(index, "tools", e.target.value)
                          }
                          className="text-sm text-gray-500 border-b border-gray-300 w-full"
                        />
                        <div className="mt-4 flex justify-center gap-4">
                          <button
                            onClick={saveProject}
                            className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition flex items-center gap-2"
                          >
                            <AiOutlineCheck size={18} /> Save
                          </button>
                          <button
                            onClick={cancelProject}
                            className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition flex items-center gap-2"
                          >
                            <AiOutlineClose size={18} /> Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <div>
                        <p className="text-sm font-semibold text-gray-800 mb-1">{project.title}</p>
                        <p className="text-sm text-gray-600 mb-1">{project.description1}</p>
                        <p className="text-sm text-gray-600 mb-1">{project.description2}</p>
                        <p className="text-sm text-gray-500">{project.tools}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "skills" && (
            <div className="space-y-10">
              {/* TECHNICAL SKILLS */}
              <div className="border-l-4 border-purple-600 pl-4">
                <h2 className="text-2xl font-bold mb-1">Technical Skills</h2>
                {isEditingTechSkills ? (
                  <>
                    <textarea
                      className="w-full border px-3 py-2 rounded text-sm"
                      rows={3}
                      value={tempTechSkills}
                      onChange={(e) => setTempTechSkills(e.target.value)}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => {
                          setTechSkills(tempTechSkills);
                          localStorage.setItem(getUserKey("TechSkills"), tempTechSkills);
                          setIsEditingTechSkills(false);
                        }}
                        className="bg-green-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <AiOutlineCheck size={16} /> Save
                      </button>
                      <button
                        onClick={() => {
                          setTempTechSkills(techSkills);
                          setIsEditingTechSkills(true);
                        }}
                        className="bg-red-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <AiOutlineClose size={16} /> Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <p
                    className="text-sm text-gray-600 cursor-pointer"
                    onClick={() => {
                      setTempTechSkills(techSkills);
                      setIsEditingTechSkills(true);
                    }}
                  >
                    {techSkills}
                  </p>
                )}
              </div>

              {/* SOFT SKILLS */}
              <div className="border-l-4 border-purple-600 pl-4">
                <h2 className="text-2xl font-bold mb-1">Soft Skills</h2>
                {isEditingSoftSkills ? (
                  <>
                    {tempSoftSkills.map((skill, index) => (
                      <div key={index} className="flex gap-2 items-center mb-1">
                        <input
                          className="w-full border px-2 py-1 rounded text-sm"
                          value={skill}
                          onChange={(e) => {
                            const updated = [...tempSoftSkills];
                            updated[index] = e.target.value;
                            setTempSoftSkills(updated);
                          }}
                        />
                        <button
                          onClick={() => {
                            const updated = [...tempSoftSkills];
                            updated.splice(index, 1);
                            setTempSoftSkills(updated);
                          }}
                          className="text-red-600 hover:text-red-800 text-sm"
                          title="Remove"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setTempSoftSkills([...tempSoftSkills, ""])}
                      className="text-blue-600 text-sm underline mt-1"
                    >
                      + Add Skill
                    </button>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => {
                          setSoftSkills(tempSoftSkills);
                          localStorage.setItem(getUserKey("SoftSkills"), JSON.stringify(tempSoftSkills));
                          setIsEditingSoftSkills(false);
                        }}
                        className="bg-green-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <AiOutlineCheck size={16} /> Save
                      </button>
                      <button
                        onClick={() => {
                          setTempSoftSkills([...softSkills]);
                          setIsEditingSoftSkills(true);
                        }}
                        className="bg-red-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <AiOutlineClose size={16} /> Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <ul
                    className="list-disc list-inside text-sm text-gray-600 cursor-pointer"
                    onClick={() => {
                      setTempSoftSkills([...softSkills]);
                      setIsEditingSoftSkills(true);
                    }}
                  >
                    {softSkills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* LANGUAGES */}
              <div className="border-l-4 border-purple-600 pl-4">
                <h2 className="text-2xl font-bold mb-1">Languages</h2>
                {isEditingLanguages ? (
                  <>
                    {tempLanguages.map((lang, index) => (
                      <div key={index} className="flex gap-2 items-center mb-1">
                        <input
                          className="w-full border px-2 py-1 rounded text-sm"
                          value={lang}
                          onChange={(e) => {
                            const updated = [...tempLanguages];
                            updated[index] = e.target.value;
                            setTempLanguages(updated);
                          }}
                        />
                        <button
                          onClick={() => {
                            const updated = [...tempLanguages];
                            updated.splice(index, 1);
                            setTempLanguages(updated);
                          }}
                          className="text-red-600 hover:text-red-800 text-sm"
                          title="Remove"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setTempLanguages([...tempLanguages, ""])}
                      className="text-blue-600 text-sm underline mt-1"
                    >
                      + Add Language
                    </button>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => {
                          setLanguages(tempLanguages);
                          localStorage.setItem(getUserKey("Languages"), JSON.stringify(tempLanguages));
                          setIsEditingLanguages(false);
                        }}
                        className="bg-green-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <AiOutlineCheck size={16} /> Save
                      </button>
                      <button
                        onClick={() => {
                          setTempLanguages([...languages]);
                          setIsEditingLanguages(true);
                        }}
                        className="bg-red-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <AiOutlineClose size={16} /> Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <ul
                    className="list-disc list-inside text-sm text-gray-600 cursor-pointer"
                    onClick={() => {
                      setTempLanguages([...languages]);
                      setIsEditingLanguages(true);
                    }}
                  >
                    {languages.map((lang, index) => (
                      <li key={index}>{lang}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {activeTab === "work" && (
            <div className="space-y-10">
              <div className="border-l-4 border-purple-600 pl-4">
                <h2 className="text-2xl font-bold mb-2">Work Experience</h2>
                {tempWorkList.map((job, index) => (
                  <div key={index} className="mb-6">
                    {editingWorkIndex === index ? (
                      <>
                        <input
                          type="text"
                          value={tempWorkList[index].title}
                          onChange={(e) => handleWorkChange(index, "title", e.target.value)}
                          className="text-sm font-semibold border-b border-gray-300 w-full"
                        />
                        <input
                          type="text"
                          value={tempWorkList[index].company}
                          onChange={(e) => handleWorkChange(index, "company", e.target.value)}
                          className="text-sm text-gray-600 border-b border-gray-300 w-full"
                        />
                        <input
                          type="text"
                          value={tempWorkList[index].location}
                          onChange={(e) => handleWorkChange(index, "location", e.target.value)}
                          className="text-sm text-gray-600 border-b border-gray-300 w-full"
                        />
                        <input
                          type="text"
                          value={tempWorkList[index].duration}
                          onChange={(e) => handleWorkChange(index, "duration", e.target.value)}
                          className="text-sm text-gray-600 border-b border-gray-300 w-full"
                        />
                        <textarea
                          rows={2}
                          value={tempWorkList[index].description}
                          onChange={(e) => handleWorkChange(index, "description", e.target.value)}
                          className="text-sm text-gray-600 border-b border-gray-300 w-full"
                        />
                        <div className="mt-4 flex justify-center gap-4">
                          <button
                            onClick={saveWork}
                            className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition flex items-center gap-2"
                          >
                            <AiOutlineCheck size={18} /> Save
                          </button>
                          <button
                            onClick={cancelWork}
                            className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition flex items-center gap-2"
                          >
                            <AiOutlineClose size={18} /> Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          if (editingWorkIndex === null) {
                            setEditingWorkIndex(index);
                          }
                        }}
                      >
                        <p className="text-sm font-semibold text-gray-800">{job.title}</p>
                        <p className="text-sm text-gray-600">{job.company}</p>
                        <p className="text-sm text-gray-600">{job.duration} | {job.location}</p>
                        <p className="text-sm text-gray-600">{job.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "awards" && (
            <div className="space-y-10">
              <div className="border-l-4 border-purple-600 pl-4">
                <h2 className="text-2xl font-bold mb-4">Awards & Recognition</h2>
                {awardList.map((award, index) => (
                  <div
                    key={index}
                    className="mb-4 cursor-pointer"
                    onClick={editingAwardIndex === index ? undefined : () => setEditingAwardIndex(index)}
                  >
                    {editingAwardIndex === index ? (
                      <>
                        <input
                          type="text"
                          value={tempAwardList[index].title}
                          onChange={(e) =>
                            handleAwardChange(index, "title", e.target.value)
                          }
                          className="text-sm font-semibold border-b border-gray-300 w-full mb-1"
                        />
                        <input
                          type="text"
                          value={tempAwardList[index].org}
                          onChange={(e) =>
                            handleAwardChange(index, "org", e.target.value)
                          }
                          className="text-sm text-gray-600 border-b border-gray-300 w-full mb-1"
                        />
                        <input
                          type="text"
                          value={tempAwardList[index].dateLocation}
                          onChange={(e) =>
                            handleAwardChange(index, "dateLocation", e.target.value)
                          }
                          className="text-sm text-gray-600 border-b border-gray-300 w-full mb-1"
                        />
                        <textarea
                          rows={2}
                          value={tempAwardList[index].description}
                          onChange={(e) =>
                            handleAwardChange(index, "description", e.target.value)
                          }
                          className="text-sm text-gray-600 border-b border-gray-300 w-full"
                        />
                        <div className="mt-3 flex justify-center gap-4">
                          <button
                            onClick={saveAward}
                            className="px-4 py-1 bg-green-600 text-white rounded-full hover:bg-green-700 flex items-center gap-2 text-sm"
                          >
                            <AiOutlineCheck size={16} /> Save
                          </button>
                          <button
                            onClick={cancelAward}
                            className="px-4 py-1 bg-red-600 text-white rounded-full hover:bg-red-700 flex items-center gap-2 text-sm"
                          >
                            <AiOutlineClose size={16} /> Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">{award.title}</h3>
                        <p className="text-sm text-gray-600">{award.org}</p>
                        <p className="text-sm text-gray-600">{award.dateLocation}</p>
                        <p className="text-sm text-gray-600">{award.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
