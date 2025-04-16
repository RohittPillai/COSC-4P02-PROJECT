"use client";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onUpdate({ name, summary });
  }, [name, summary]);

  const improveSummary = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary }),
      });
      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      alert("Failed to improve summary");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Edit Resume</h2>

      <div>
        <label className="block text-sm font-medium">Full Name</label>
        <input
          type="text"
          value={name}
          className="w-full border p-2 rounded mt-1"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Professional Summary</label>
        <textarea
          value={summary}
          className="w-full border p-2 rounded mt-1"
          rows={5}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>

      <button
        onClick={improveSummary}
        disabled={loading}
        className={`bg-indigo-600 text-white px-4 py-2 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
        }`}
      >
        {loading ? "Improving..." : "✨ Improve My Summary"}
      </button>
    </div>
  );
}
