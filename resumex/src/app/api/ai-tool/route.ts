export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { input, type } = await req.json();

  if (!input || typeof input !== "string") {
    return new Response(JSON.stringify({ error: "Invalid input." }), { status: 400 });
  }

  // 🎯 Optimized prompts for flan-t5-base
  let prompt = "";
  switch (type) {
    case "summary":
      prompt = `Improve the following resume summary to sound professional and polished. Keep it short and fluent.\n\nInput:\n${input}\n\nOutput:\n`;
      break;
    case "skills":
      prompt = `List 8 to 10 relevant resume skills based on the following background. Return them comma separated.\n\nInput:\n${input}\n\nOutput:\n`;
      break;
    case "experience":
      prompt = `Rewrite the following job experience entry to be concise and professional. Use action verbs where possible.\n\nInput:\n${input}\n\nOutput:\n`;
      break;
    default:
      return new Response(JSON.stringify({ error: "Invalid AI type." }), { status: 400 });
  }

  const modelUrl = "https://api-inference.huggingface.co/models/google/flan-t5-base?wait_for_model=true";

  try {
    const hfResponse = await fetch(modelUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    const data = await hfResponse.json();
    console.log("✅ Hugging Face response:", JSON.stringify(data, null, 2));

    const raw = Array.isArray(data) && data[0]?.generated_text?.trim();

    const cleaned =
      raw
        ?.replace(/^Output:/i, "")
        .replace(/^(Improved|Rewritten|Skills|Summary):?/i, "")
        .trim() || "⚠️ AI returned no content. Try again or improve your input.";

    return new Response(JSON.stringify({ result: cleaned }), { status: 200 });
  } catch (err) {
    console.error("❌ Hugging Face API Error:", err);
    return new Response(JSON.stringify({ error: "AI request failed" }), { status: 500 });
  }
}
