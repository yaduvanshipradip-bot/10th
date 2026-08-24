const GEMINI_API_KEY = "AIzaSyC-L0taKk5NVRsGH1_Sr7c0hz0rmOzCfFw";

export async function getLiveAIHint(questionText: string, hintLevel: number): Promise<string> {
  const prompt = `
    You are an expert CBSE Class 10 AI Tutor.
    Question: "${questionText}"
    Task: Provide ${hintLevel === 1 ? 'Hint 1 (A small conceptual clue without revealing direct answer)' : 'Hint 2 (A step-by-step guidance hint)'}.
    Rules: NEVER mention the word 'NCERT' or 'book'. Keep it short (2 sentences max).
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );

    const data = await response.json();
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
  } catch (error) {
    console.error("Live Hint Error:", error);
  }

  return hintLevel === 1 
    ? "💡 Hint 1: Identify the main core concept required to solve this specific question."
    : "💡 Hint 2: Apply the step-by-step standard evaluation marking scheme.";
}