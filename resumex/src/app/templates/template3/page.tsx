import React, {useState} from "react";

export default function Template4Page() {
    const [activeTab, setActiveTab] = useState("profile");

    const tabs = ["profile", "education", "skills", "work", "projects", "awards"];

    return (
        <div
            className="w-full max-w-[1200px] mx-auto px-10 py-10 bg-white rounded shadow-sm font-sans text-gray-800 leading-relaxed overflow-y-auto max-h-[calc(100vh-160px)] border border-gray-300">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-4xl font-extrabold">Javier <span className="text-purple-600">Latorre</span></h1>
                    <h2 className="text-lg uppercase tracking-wide text-gray-500 mt-1">Frontend Web Developer</h2>
                </div>
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
                        <p className="text-sm">I'm passionate about technology and human behavior, hardworker and a
                            fast-learner with experience in around 10 different countries studying, working and
                            volunteering.</p>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-lg font-bold">Contact details</h2>
                        <p className="text-purple-600 text-sm font-semibold">Phone:</p>
                        <p>+1 123 456 789</p>
                        <p className="text-purple-600 text-sm font-semibold">Email:</p>
                        <p>abc@gmail.com</p>
                        <p className="text-purple-600 text-sm font-semibold">Address:</p>
                        <p>Someplace, 5</p>
                        <p>ON, Canada</p>
                        <p>A1B 2C3</p>
                    </div>

                    <a
                        href="mailto:abc@gmail.com"
                        className="inline-block bg-purple-600 text-white px-4 py-2 mt-4 rounded-md text-sm hover:bg-purple-700 transition"
                    >
                        Send me a message
                    </a>

                    <div>
                        <h2 className="text-lg font-bold mt-8 mb-2">Get social</h2>
                        <ul className="text-sm space-y-1">
                            <li><a href="#" className="text-blue-700 hover:underline">Facebook</a></li>
                            <li><a href="#" className="text-blue-500 hover:underline">Twitter</a></li>
                            <li><a href="#" className="text-blue-800 hover:underline">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>

                {/* RIGHT COLUMN CONTENT */}
                <div className="md:col-span-2 space-y-10">
                    {activeTab === "profile" && (
                        <>
                            <div className="space-y-4">
                                <h1 className="text-2xl font-bold">Profile</h1>
                                <blockquote className="italic border-l-4 border-purple-600 pl-4">
                                    <p>"There is no end to education... The whole of life... is a process of
                                        learning."</p>
                                    <p className="text-sm">- Jiddu Krishnamurti</p>
                                </blockquote>
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

                    {activeTab !== "profile" && (
                        <div>
                            <h2 className="text-xl font-bold capitalize">{activeTab}</h2>
                            <p className="text-sm text-gray-700 mt-2">This is the <strong>{activeTab}</strong> section
                                content. You can customize it further.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
