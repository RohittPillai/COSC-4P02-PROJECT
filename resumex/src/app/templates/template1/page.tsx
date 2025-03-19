"use client";

export default function Template1Page({ data }: { data: any }) {
  return (
      <div className="flex justify-center items-start w-full min-h-[calc(100vh-100px)] pt-10 pb-10">
        <div className="bg-white shadow-lg p-8 rounded-lg max-w-[1000px] w-[95%] mx-auto
          max-h-[calc(100vh-180px)] overflow-y-auto flex-grow">

        {/* Header Section */}
          <div className="header text-center pb-4">
            <h1 className="text-4xl font-bold">{data.firstName} {data.lastName}</h1>
            <p className="text-gray-600 mt-2">{data.position}</p>
            <p className="text-gray-500">{data.email} | {data.phone}</p>
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
                      {project.link && <a href={project.link} className="text-blue-600 hover:underline">View Project</a>}
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
