"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { supabase } from "~/lib/supabaseClient";

const Template1 = dynamic(() => import("../templates/template1/page"), { ssr: false });
const Template2 = dynamic(() => import("../templates/template2/page"), { ssr: false });
const Template3 = dynamic(() => import("../templates/template3/page"), { ssr: false });

const templateMap: Record<string, any> = {
    template1: Template1,
    template2: Template2,
    template3: Template3,
};

export default function ResumeViewPage() {
    const searchParams = useSearchParams();
    const resumeId = searchParams.get("id");

    const [resumeData, setResumeData] = useState<any>(null);
    const [templateName, setTemplateName] = useState("template1");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResume = async () => {
            if (!resumeId) return;

            const { data, error } = await supabase
                .from("resumes")
                .select("*")
                .eq("id", resumeId)
                .single();

            if (error) {
                console.error("Error fetching public resume:", error);
            } else {
                setResumeData(data.data);
                setTemplateName(data.template || "template1");
            }
            setLoading(false);
        };
        fetchResume();
    }, [resumeId]);

    if (loading) return <p className="text-center mt-10">Loading resume...</p>;
    if (!resumeData) return <p className="text-center mt-10 text-red-600">Resume not found.</p>;

    const SelectedTemplate = templateMap[templateName] || Template1;

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Public Resume View</h1>
                {SelectedTemplate && <SelectedTemplate data={resumeData} isPublicView={true} />}
            </div>
        </div>
    );
}
