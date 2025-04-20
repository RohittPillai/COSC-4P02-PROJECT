export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { input, type } = await req.json();

  if (!input || typeof input !== "string") {
    return new Response(JSON.stringify({ error: "Invalid input." }), { status: 400 });
  }

  let prompt = "";
  switch (type) {
    case "summary":
      prompt = `Improve this resume summary under 3 lines:\n\n${input}`;
      break;
    case "skills":
      prompt = `List 6 resume skills based on this input. Comma separated:\n\n${input}`;
      break;
    case "experience":
      prompt = `Rewrite the following job experience into exactly 3 one-line CAR (Challenge, Action, Result) statements. Each line should clearly express the challenge faced, the action taken, and the measurable result. Do not include any bullet symbols like "*", "-", or "•". Format each statement on a new line.:\n\n${input}`;
      break;
    default:
      return new Response(JSON.stringify({ error: "Invalid AI type." }), { status: 400 });
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const json = await res.json();
    console.log("🧠 Gemini 1.5 response:", JSON.stringify(json, null, 2));

    const result =
      json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "⚠️ Gemini returned no output. Try again with better input.";

    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (err) {
    console.error("❌ Gemini API Error:", err);
    return new Response(JSON.stringify({ error: "AI request failed" }), { status: 500 });
  }
}
