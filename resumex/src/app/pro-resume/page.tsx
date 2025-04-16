"use client";
import { useState } from "react";
import ResumeEditor from "src/app/_components/ResumeEditor";
import ResumePreview from "src/app/_components/ResumePreview";
import Header from "src/app/_components/Header";
import Footer from "src/app/_components/Footer";

export default function ResumePage() {
  const [resumeData, setResumeData] = useState({
    name: "John Doe",
    summary: "A passionate developer who loves building cool tools.",
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <ResumeEditor data={resumeData} onUpdate={setResumeData} />
        <ResumePreview data={resumeData} />
      </main>

      <Footer />
    </div>
  );
}
