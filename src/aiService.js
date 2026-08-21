// Google Gemini AI Live Service
const GEMINI_API_KEY = "AIzaSyC-L0taKk5NVRsGH1_Sr7c0hz0rmOzCfFw";

export async function getLiveAIHint(questionText, hintLevel) {
  const prompt = `
    You are an expert CBSE Class 10 Science & Maths AI Tutor Agent.
    Question: "${questionText}"
    
    Task: Provide ${hintLevel === 1 ? 'Hint 1 (A small conceptual clue/formula without revealing direct answer)' : 'Hint 2 (A step-by-step guidance hint)'}.
    
    Rules:
    - Keep it short (2-3 sentences max).
    - Friendly and encouraging tone for a 10th-grade student.
    - Strictly aligned with CBSE Board Exam marking scheme.
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    return "💡 AI Hint: Review the basic formula and standard units for this chapter!";
  } catch (error) {
    console.error("AI Error:", error);
    return "💡 AI Hint: Focus on the key terms given in the question and apply the core concept.";
  }
}