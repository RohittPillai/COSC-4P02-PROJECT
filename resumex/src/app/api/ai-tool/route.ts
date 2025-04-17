export const dynamic = "force-dynamic"; // For Vercel edge functions (optional)

export async function POST(req: Request) {
  const { input, type } = await req.json();

  if (!input || typeof input !== "string") {
    return new Response(JSON.stringify({ error: "Invalid input." }), { status: 400 });
  }

  // Step 1: Create the prompt
  let prompt = "";
  switch (type) {
    case "summary":
      prompt = `Improve this resume summary to sound more professional:\n\n"${input}"`;
      break;
    case "skills":
      prompt = `Generate a comma-separated list of resume skills based on this profile:\n\n"${input}"`;
      break;
    case "experience":
      prompt = `Rewrite this resume work experience to sound more concise and impactful:\n\n"${input}"`;
      break;
    default:
      return new Response(JSON.stringify({ error: "Invalid AI type." }), { status: 400 });
  }

  // Step 2: Choose a model
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
    console.log("✅ Raw Hugging Face response:", JSON.stringify(data, null, 2));

    const result =
      Array.isArray(data) && data[0]?.generated_text?.trim()
        ? data[0].generated_text.trim()
        : "⚠️ AI returned no content. Try again or change your input.";

    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (err) {
    console.error("❌ Hugging Face API Error:", err);
    return new Response(JSON.stringify({ error: "AI request failed" }), { status: 500 });
  }
}
