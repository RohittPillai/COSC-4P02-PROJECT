type ResumeData = {
  name: string;
  summary: string;
};

export default function ResumePreview({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow h-fit">
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <h2 className="text-lg text-gray-600 mt-2 mb-4">Professional Summary</h2>
      <p className="text-gray-800 whitespace-pre-line">{data.summary}</p>
    </div>
  );
}
