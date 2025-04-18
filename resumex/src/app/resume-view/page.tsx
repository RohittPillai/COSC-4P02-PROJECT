"use client";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Template1Page = dynamic(() => import("../templates/template1/page"));
const Template2Page = dynamic(() => import("../templates/template2/page"));
const Template3Page = dynamic(() => import("../templates/template3/page"));

const templates = {
    template1: Template1Page,
    template2: Template2Page,
    template3: Template3Page,
};

export default function ResumeViewerPage() {
    const searchParams = useSearchParams();
    const user = searchParams.get("user");
    const template = searchParams.get("template") || "template1";
    const TemplateComponent = templates[template] || templates.template1;

    const [resumeData, setResumeData] = useState(null);

    useEffect(() => {
        if (user) {
            const saved = localStorage.getItem(`${user}_resume`);
            if (saved) {
                setResumeData(JSON.parse(saved));
            }
        }
    }, [user]);

    if (!user || !resumeData) return <p className="p-10 text-center">Loading shared resume...</p>;

    return (
        <div className="p-10 bg-gray-100 min-h-screen flex justify-center items-start">
            <div className="w-full max-w-4xl bg-white p-8 rounded shadow">
                <TemplateComponent data={resumeData} isPublicView={true} />
            </div>
        </div>
    );
}
