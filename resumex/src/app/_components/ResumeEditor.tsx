import { useState, useEffect } from "react";

type ResumeData = {
  name: string;
  summary: string;
};

type Props = {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
};

export default function ResumeEditor({ data, onUpdate }: Props) {
  const [name, setName] = useState(data.name);
  const [summary, setSummary] = useState(data.summary);

  useEffect(() => {
    onUpdate({ name, summary });
  }, [name, summary]);

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-semibold">Edit Resume</h2>
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          className="w-full border p-2 rounded"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Summary</label>
        <textarea
          value={summary}
          className="w-full border p-2 rounded"
          rows={4}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>
    </div>
  );
}
