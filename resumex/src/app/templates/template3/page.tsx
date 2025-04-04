import React, {useState, useEffect} from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

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
            const saved = localStorage.getItem("template3Header");
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
    const [helloText, setHelloText] = useState("I'm passionate about technology and human behavior, hardworker and a fast-learner with experience in around 10 different countries studying, working and volunteering.");
    const [tempHelloText, setTempHelloText] = useState(helloText);

    useEffect(() => {
        const savedHello = localStorage.getItem("template3Hello");
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
        const savedContact = localStorage.getItem("template3Contact");
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
        const saved = localStorage.getItem("template3Social");
        if (saved) {
            const parsed = JSON.parse(saved);
            setSocialLinks(parsed);
            setTempSocialLinks(parsed);
        }
    }, []);

    //for profile section
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileText, setProfileText] = useState(`"There is no end to education... The whole of life... is a process of learning."`);
    const [tempProfileText, setTempProfileText] = useState(profileText);
    const [profileAuthor, setProfileAuthor] = useState("Jiddu Krishnamurti");
    const [tempProfileAuthor, setTempProfileAuthor] = useState(profileAuthor);

    useEffect(() => {
        const savedProfile = localStorage.getItem("template3Profile");
        const savedProfileAuthor = localStorage.getItem("template3ProfileAuthor");
        if (savedProfile) {
            setProfileText(savedProfile);
            setTempProfileText(savedProfile);
        }
        if (savedProfileAuthor) {
            setProfileAuthor(savedProfileAuthor);
            setTempProfileAuthor(savedProfileAuthor);
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
                                    localStorage.setItem("template3Header", JSON.stringify(tempHeader));
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
                    <div
                        onClick={() => setIsEditingHeader(true)}
                        className="cursor-pointer"
                    >
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
                <div className="space-y-10 md:col-span-1">
                    <div className="relative w-32 h-32 rounded-full bg-gray-300 mx-auto">
                        {/* Camera icon overlay */}
                        <div
                            className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md cursor-pointer hover:bg-gray-100">
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
                                            localStorage.setItem("template3Hello", tempHelloText);
                                            setIsEditingHello(false);
                                        }}
                                        className="bg-green-600 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1"
                                    >
                                        <AiOutlineCheck size={16} /> Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            setTempHelloText(helloText);
                                            setIsEditingHello(true); // stay in edit mode
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
                                    onChange={(e) => setTempContactInfo({ ...tempContactInfo, phone: e.target.value })}
                                />

                                <label className="block text-purple-600 text-sm font-semibold">Email:</label>
                                <input
                                    className="w-full text-sm border px-2 py-1 rounded mb-1"
                                    value={tempContactInfo.email}
                                    onChange={(e) => setTempContactInfo({ ...tempContactInfo, email: e.target.value })}
                                />

                                <label className="block text-purple-600 text-sm font-semibold">Address:</label>
                                <input
                                    className="w-full text-sm border px-2 py-1 rounded mb-1"
                                    value={tempContactInfo.addressLine1}
                                    onChange={(e) => setTempContactInfo({ ...tempContactInfo, addressLine1: e.target.value })}
                                />
                                <input
                                    className="w-full text-sm border px-2 py-1 rounded mb-1"
                                    value={tempContactInfo.addressLine2}
                                    onChange={(e) => setTempContactInfo({ ...tempContactInfo, addressLine2: e.target.value })}
                                />
                                <input
                                    className="w-full text-sm border px-2 py-1 rounded"
                                    value={tempContactInfo.addressLine3}
                                    onChange={(e) => setTempContactInfo({ ...tempContactInfo, addressLine3: e.target.value })}
                                />

                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={() => {
                                            setContactInfo({ ...tempContactInfo }); // ensure fresh reference
                                            localStorage.setItem("template3Contact", JSON.stringify(tempContactInfo));
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

                    {contactInfo.email ? (
                        <a
                            href={`mailto:${contactInfo.email}`}
                            className="inline-block bg-purple-600 text-white px-4 py-2 mt-4 rounded-md text-sm hover:bg-purple-700 transition"
                        >
                            Send me a message
                        </a>
                    ) : (
                        <p className="text-sm text-red-600 mt-4">Please enter your email above to activate this button.</p>
                    )}

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
                    {showSocialModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                                <h2 className="text-lg font-bold mb-4">
                                    {`Edit ${editingPlatform.charAt(0).toUpperCase() + editingPlatform.slice(1)} Link`}
                                </h2>

                                <input
                                    type="text"
                                    placeholder={`https://${editingPlatform}.com/your-profile`}
                                    value={tempSocialLinks[editingPlatform]}
                                    onChange={(e) =>
                                        setTempSocialLinks({
                                            ...tempSocialLinks,
                                            [editingPlatform]: e.target.value
                                        })
                                    }
                                    className="w-full border px-3 py-2 rounded mb-4 text-sm"
                                />

                                <div className="flex justify-end gap-2">
                                    <a
                                        href={tempSocialLinks[editingPlatform]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-600 text-white px-4 py-1 rounded text-sm"
                                    >
                                        Open
                                    </a>
                                    <button
                                        onClick={() => {
                                            const updated = { ...socialLinks, [editingPlatform]: tempSocialLinks[editingPlatform] };
                                            setSocialLinks(updated);
                                            localStorage.setItem("template3Social", JSON.stringify(updated));
                                            setShowSocialModal(false);
                                            setEditingPlatform("");
                                        }}
                                        className="bg-green-600 text-white px-4 py-1 rounded text-sm"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            const clearedLinks = { ...socialLinks, [editingPlatform]: "" };
                                            setSocialLinks(clearedLinks);
                                            setTempSocialLinks(clearedLinks);
                                            localStorage.setItem("template3Social", JSON.stringify(clearedLinks));
                                            setShowSocialModal(false);
                                            setEditingPlatform("");
                                        }}
                                        className="bg-gray-400 text-white px-4 py-1 rounded-full text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN CONTENT */}
                <div className="md:col-span-2 space-y-10">
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
                                                    localStorage.setItem("template3Profile", tempProfileText);
                                                    localStorage.setItem("template3ProfileAuthor", tempProfileAuthor);
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
                                <p className="text-sm">Until now, in my life, I change from active moments... I consider
                                    myself a tolerant and respectful person... I really like to listen to people
                                    stories...</p>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold mb-2">Philosophy</h2>
                                <p className="text-sm">I believe in ethic and moral, not imposed rules... life is made
                                    from different shades of grey... as a human being... our duty is to treat others
                                    well...</p>
                                <ul className="list-disc list-inside text-sm mt-2">
                                    <li>Pragmatic</li>
                                    <li>Honest</li>
                                    <li>Respectful</li>
                                    <li>Open-minded</li>
                                    <li>Coherent</li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold mb-2">Interests & Hobbies</h2>
                                <p className="text-sm">I'm passionate about technology and human behavior, both
                                    determine almost all my interests and hobbies:</p>
                                <ul className="list-disc list-inside text-sm mt-2">
                                    <li>Visiting new places</li>
                                    <li>Meeting people</li>
                                    <li>Having new experiences</li>
                                    <li>Hiking and Biking</li>
                                    <li>Web Developing</li>
                                    <li>Computer Gaming</li>
                                    <li>Manga and Anime</li>
                                </ul>
                            </div>
                        </>
                    )}

                    {activeTab === "education & projects" && (
                        <div className="space-y-10">
                            <div className="border-l-4 border-purple-600 pl-4">
                                <h2 className="text-2xl font-bold mb-1">Education</h2>

                                {/* Master's Degree */}
                                <div className="mb-4">
                                    <p className="text-sm font-semibold text-gray-800">Master of Business Administration
                                        (MBA)</p>
                                    <p className="text-sm text-gray-600">Rotman School of Management, University of
                                        Toronto</p>
                                    <p className="text-sm text-gray-500">2022 – 2024 | Toronto, ON</p>
                                </div>

                                {/* Bachelor's Degree */}
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">Bachelor of Commerce (BCom),
                                        Marketing</p>
                                    <p className="text-sm text-gray-600">Brock University</p>
                                    <p className="text-sm text-gray-500">2018 – 2022 | St. Catharines, ON</p>
                                </div>
                            </div>

                            <div className="border-l-4 border-purple-600 pl-4">
                                <h2 className="text-2xl font-bold mb-1">Project Highlight</h2>

                                {/* Project 1 */}
                                <div className="mb-4">
                                    <p className="text-sm font-semibold text-gray-800 mb-1">Market Expansion Strategy
                                        for Lush Cosmetics</p>
                                    <p className="text-sm text-gray-600 mb-1">
                                        Led a 4-member team to design a strategic plan for expanding Lush Cosmetics into
                                        untapped Canadian markets.
                                    </p>
                                    <p className="text-sm text-gray-600 mb-1">
                                        Conducted market research, competitor analysis, and consumer behavior profiling
                                        to support recommendations.
                                    </p>
                                    <p className="text-sm text-gray-500">Tools: SWOT Analysis, PESTEL, SurveyMonkey,
                                        Canva</p>
                                </div>

                                {/* Project 2 */}
                                <div>
                                    <p className="text-sm font-semibold text-gray-800 mb-1">Social Media ROI Analysis
                                        for a Nonprofit</p>
                                    <p className="text-sm text-gray-600 mb-1">
                                        Analyzed engagement metrics and campaign performance across Instagram, LinkedIn,
                                        and Twitter for a local nonprofit.
                                    </p>
                                    <p className="text-sm text-gray-600 mb-1">
                                        Provided recommendations to improve ROI and optimize content scheduling for a
                                        15% reach increase.
                                    </p>
                                    <p className="text-sm text-gray-500">Tools: Google Analytics, Hootsuite, Excel,
                                        PowerPoint</p>
                                </div>
                            </div>

                            <div className="border-l-4 border-purple-600 pl-4">
                                <h2 className="text-2xl font-bold mb-1">Certifications</h2>

                                {/* Certification 1 */}
                                <div className="mb-4">
                                    <p className="text-sm font-semibold text-gray-800 mb-1">Google Digital Marketing &
                                        E-commerce Certificate</p>
                                    <p className="text-sm text-gray-600">Coursera (Offered by Google) — Issued: May
                                        2023</p>
                                </div>

                                {/* Certification 2 */}
                                <div className="mb-4">
                                    <p className="text-sm font-semibold text-gray-800 mb-1">Financial Markets</p>
                                    <p className="text-sm text-gray-600">Yale University, Coursera — Issued: January
                                        2023</p>
                                </div>

                                {/* Certification 3 */}
                                <div>
                                    <p className="text-sm font-semibold text-gray-800 mb-1">Excel Skills for Business:
                                        Essentials</p>
                                    <p className="text-sm text-gray-600">Macquarie University, Coursera — Issued: August
                                        2022</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "skills" && (
                        <div className="space-y-10">
                            <div className="border-l-4 border-purple-600 pl-4">
                                <h2 className="text-2xl font-bold mb-1">Technical Skills</h2>
                                <p className="text-sm text-gray-600">
                                    Microsoft Excel (VLOOKUP, PivotTables, Macros), PowerPoint, Google Analytics,
                                    Hootsuite, Tableau, Power BI, SurveyMonkey, Qualtrics
                                </p>
                            </div>

                            <div className="border-l-4 border-purple-600 pl-4">
                                <h2 className="text-2xl font-bold mb-1">Soft Skills</h2>
                                <ul className="list-disc list-inside text-sm text-gray-600">
                                    <li>Strategic Thinking</li>
                                    <li>Team Collaboration</li>
                                    <li>Public Speaking & Presentation</li>
                                    <li>Problem Solving</li>
                                    <li>Adaptability & Time Management</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-purple-600 pl-4">
                                <h2 className="text-2xl font-bold mb-1">Languages</h2>
                                <ul className="list-disc list-inside text-sm text-gray-600">
                                    <li>English — Full Professional Proficiency</li>
                                    <li>French — Intermediate</li>
                                    <li>Hindi — Native</li>
                                </ul>
                            </div>

                        </div>
                    )}

                    {activeTab === "work" && (
                        <div className="space-y-10">
                            {/* Recent Role */}
                            <div className="border-l-4 border-purple-600 pl-4 space-y-2">
                                <h2 className="text-2xl font-bold">Recent Role</h2>
                                <p className="text-sm font-semibold text-gray-800">Marketing Intern</p>
                                <p className="text-sm text-gray-600">Nestlé Canada</p>
                                <p className="text-sm text-gray-600">May 2023 – August 2023 | Toronto, ON</p>
                                <p className="text-sm text-gray-600">Assisted in launching a new snack product line
                                    through campaign planning and consumer engagement analysis.</p>
                                <p className="text-sm text-gray-600">Collaborated with cross-functional teams to align
                                    digital and in-store marketing efforts.</p>
                            </div>

                            {/* Previous Experience */}
                            <div className="border-l-4 border-purple-600 pl-4 space-y-2">
                                <h2 className="text-2xl font-bold">Previous Experience</h2>
                                <p className="text-sm font-semibold text-gray-800">Sales Associate</p>
                                <p className="text-sm text-gray-600">Hudson's Bay Company</p>
                                <p className="text-sm text-gray-600">May 2021 – August 2022 | St. Catharines, ON</p>
                                <p className="text-sm text-gray-600">Provided customer service, maintained merchandising
                                    standards, and supported inventory tracking.</p>
                                <p className="text-sm text-gray-600">Frequently praised for communication and
                                    interpersonal skills with a diverse customer base.</p>
                            </div>

                            {/* Part-Time Marketing Assistant */}
                            <div className="border-l-4 border-purple-600 pl-4 space-y-2">
                                <h2 className="text-2xl font-bold">Other Experience</h2>
                                <p className="text-sm font-semibold text-gray-800">Part-Time Marketing Assistant</p>
                                <p className="text-sm text-gray-600">Brock University – Goodman School of Business</p>
                                <p className="text-sm text-gray-600">January 2020 – April 2021 | St. Catharines, ON</p>
                                <p className="text-sm text-gray-600">Supported the marketing team in promoting academic events
                                    and workshops through social media and email campaigns.</p>
                                <p className="text-sm text-gray-600">Designed student-facing promotional material and assisted
                                    with data entry and survey analysis.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === "awards" && (
                        <div className="space-y-10">
                            {/* Business Innovation Hackathon Winner */}
                            <div className="border-l-4 border-purple-600 pl-4 space-y-1">
                                <h2 className="text-2xl font-bold">Business Innovation Hackathon Winner</h2>
                                <p className="text-sm text-gray-600">Tech4Impact Hackathon – UofT</p>
                                <p className="text-sm text-gray-600">2023 | Toronto, ON</p>
                                <p className="text-sm text-gray-600">Developed a retail analytics dashboard that optimized inventory turnover for small businesses using customer behavior insights.</p>
                            </div>

                            {/* Academic Excellence Award */}
                            <div className="border-l-4 border-purple-600 pl-4 space-y-1">
                                <h2 className="text-2xl font-bold">Academic Excellence Award</h2>
                                <p className="text-sm text-gray-600">Brock University</p>
                                <p className="text-sm text-gray-600">2022 | St. Catharines, ON</p>
                                <p className="text-sm text-gray-600">Awarded for maintaining a GPA in the top 5% of the business faculty cohort.</p>
                            </div>

                            {/* Dean’s Honour List */}
                            <div className="border-l-4 border-purple-600 pl-4 space-y-1">
                                <h2 className="text-2xl font-bold">Dean’s Honour List</h2>
                                <p className="text-sm text-gray-600">Goodman School of Business</p>
                                <p className="text-sm text-gray-600">2019 – 2022 | St. Catharines, ON</p>
                                <p className="text-sm text-gray-600">Recognized for consistent academic achievement over 6 consecutive terms.</p>
                            </div>

                            {/* Marketing Case Competition Finalist */}
                            <div className="border-l-4 border-purple-600 pl-4 space-y-1">
                                <h2 className="text-2xl font-bold">Marketing Case Competition Finalist</h2>
                                <p className="text-sm text-gray-600">Inter-Collegiate Business Competition (ICBC)</p>
                                <p className="text-sm text-gray-600">2021 | Kingston, ON</p>
                                <p className="text-sm text-gray-600">Selected among top 5 teams nationwide for strategy presentation and solution clarity.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}