type ResumeData = {
    name: string;
    summary: string;
  };
  
  export default function ResumePreview({ data }: { data: ResumeData }) {
    return (
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <p className="mt-4 text-gray-700">{data.summary}</p>
      </div>
    );
  }
  