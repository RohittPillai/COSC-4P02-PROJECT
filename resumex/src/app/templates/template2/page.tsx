import React from "react";

export default function Template2Page() {
  return (
      <div className="w-full max-w-[1200px] mx-auto px-10 py-10 bg-white rounded shadow-sm font-sans text-sm text-gray-800 leading-relaxed overflow-y-auto max-h-[calc(100vh-160px)] border border-gray-300">
        <header className="border-b border-gray-400 pb-3 mb-5">
          <h1 className="text-3xl font-bold text-gray-900">Anna Taylor</h1>
          <p className="text-md font-semibold text-gray-700">Certified Medical Assistant</p>
          <p className="mt-2 text-gray-600">
            Motivated, patient-focused Certified Medical Assistant with 10+ years of experience providing a variety of healthcare services. Excels at prioritizing tasks, supporting organizational objectives, and ensuring excellent patient care.
          </p>
          <div className="border-t border-gray-400 pt-2 mt-3 text-gray-600 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-4 justify-items-center sm:justify-items-start text-center sm:text-left gap-x-10">
              <span className="pr-6 underline">anna@youremail.com</span>
              <span className="underline">123-4567</span>
              <span className="underline">Houston, TX</span>
              <span className="underline">LinkedIn.com/anna.taylor</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section className="space-y-6">
            <h2 className="font-bold text-sm text-gray-700 uppercase mb-3">Work Experience</h2>

            <div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Medical Assistant</span>
                <span className="italic text-gray-600">Houston, TX</span>
              </div>
              <div className="text-gray-700 font-medium">First Choice Health Institute</div>
              <ul className="list-disc list-inside text-gray-700 mt-1">
                <li>Supported quality assurance, infection control, and safety procedures within the clinic.</li>
                <li>Assisted with exams and procedures and ensured all equipment was sterilized.</li>
                <li>Recorded patients’ vitals, maintained medical records, and facilitated smooth clinic operations.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Medical Assistant</span>
                <span className="italic text-gray-600">Houston, TX</span>
              </div>
              <div className="text-gray-700 font-medium">Brightheart Medical Services</div>
              <ul className="list-disc list-inside text-gray-700 mt-1">
                <li>Coordinated patient intake and supported patient triage, including EKGs and venipuncture.</li>
                <li>Communicated with insurance providers for pre-authorizations.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Medical Office Assistant</span>
                <span className="italic text-gray-600">Houston, TX</span>
              </div>
              <div className="text-gray-700 font-medium">Health & Wellness Medical Center</div>
              <ul className="list-disc list-inside text-gray-700 mt-1">
                <li>Scheduled patient appointments and supported front desk responsibilities.</li>
                <li>Verified insurance, updated EMRs, and handled billing inquiries.</li>
              </ul>
            </div>
          </section>

          <aside className="space-y-8">
            <div>
              <h2 className="font-bold text-sm text-gray-700 uppercase mb-3">Skills</h2>
              <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-gray-700 text-sm">
                <span className="block before:content-['•'] before:mr-2 before:font-bold">Patient Care</span>
                <span className="block before:content-['•'] before:mr-2 before:font-bold">Database Management</span>
                <span className="block before:content-['•'] before:mr-2 before:font-bold">Inventory Management</span>
                <span className="block before:content-['•'] before:mr-2 before:font-bold">Medical Billing</span>
                <span className="block before:content-['•'] before:mr-2 before:font-bold">Administrative Support</span>
                <span className="block before:content-['•'] before:mr-2 before:font-bold">Prioritization</span>
                <span className="block before:content-['•'] before:mr-2 before:font-bold">Health Regulatory Compliance</span>
                <span className="block before:content-['•'] before:mr-2 before:font-bold">Conflict Resolution</span>
              </div>
            </div>

            <div>
              <h2 className="font-bold text-sm text-gray-700 uppercase mb-3">Certificates</h2>
              <ul className="text-gray-700 space-y-1 list-disc list-inside">
                <li>Certified Phlebotomy Technician</li>
                <li>CPR & First Aid Training</li>
                <li>Medical Billing and Coding Certification</li>
                <li>Certified Medical Assistant</li>
                <li>Advanced Care Life Support Certification</li>
                <li>Basic Life Support Certification</li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-sm text-gray-700 uppercase mb-3">Education</h2>
              <p className="text-gray-800 font-semibold">Bachelor of Science in Healthcare Management</p>
              <p className="text-gray-600">University of Houston — 2015</p>
            </div>

            <div>
              <h2 className="font-bold text-sm text-gray-700 uppercase mb-3">Languages</h2>
              <p className="text-gray-700">English (Fluent), Spanish (Conversational)</p>
            </div>
          </aside>
        </div>
      </div>
  );
}
