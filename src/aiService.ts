// Google Gemini AI Live Dynamic Content Generator
const GEMINI_API_KEY = "AIzaSyC-L0taKk5NVRsGH1_Sr7c0hz0rmOzCfFw";

export async function getAIChapterQuestions(subjectName: string, chapterName: string) {
  const prompt = `
    You are a CBSE Class 10 Board Exam Expert.
    Subject: ${subjectName}
    Chapter: ${chapterName}

    Task: Provide 2 most repeated and high-probability CBSE Board exam questions for this chapter.
    Format your response in JSON format like this:
    [
      {
        "id": 1,
        "question": "Question text here",
        "marks": 3,
        "tag": "Most Repeated in 10-Years",
        "hint1": "Hint 1 text",
        "hint2": "Hint 2 text",
        "answer": "Complete CBSE marking scheme answer text"
      }
    ]
    Return ONLY valid JSON array.
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
    const rawText = data.candidates[0].content.parts[0].text;
    const jsonMatch = rawText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error("AI Generation Error:", e);
  }

  // Default fallback
  return [
    {
      id: 1,
      question: `Explain the most important core concept of ${chapterName} for CBSE 10th Board Exam.`,
      marks: 3,
      tag: "CBSE High Probability",
      hint1: "Focus on the fundamental definitions and key standard formulas.",
      hint2: "Apply the standard step-by-step NCERT methodology.",
      answer: `Refer to NCERT standard solution for ${chapterName}. Ensure key terms and balanced steps are highlighted.`
    }
  ];
}

export async function getLiveAIHint(questionText: string, hintLevel: number): Promise<string> {
  const prompt = `
    You are an expert CBSE Class 10 AI Tutor Agent.
    Question: "${questionText}"
    
    Task: Provide ${hintLevel === 1 ? 'Hint 1 (A small conceptual clue/formula)' : 'Hint 2 (A step-by-step guidance hint)'}.
    Keep it short (2 sentences max). Encouraging tone.
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
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    return "Focus on the key standard formulas and definitions given in NCERT.";
  }
}