// Google Gemini AI Live Dynamic Content Generator (CBSE 2025 Pattern)
const GEMINI_API_KEY = "AIzaSyC-L0taKk5NVRsGH1_Sr7c0hz0rmOzCfFw";

export async function getAIChapterQuestions(subjectName: string, chapterName: string, category: string) {
  const prompt = `
    You are an expert CBSE Class 10 Board Exam Paper Setter following the LATEST 2024-2025 CBSE Exam Pattern.
    Subject: ${subjectName}
    Chapter: ${chapterName}
    Category: ${category}

    Task: Provide EXACTLY 5 high-probability questions strictly belonging to category "${category}".
    
    Category Formatting Rules:
    - If "Assertion & Reason": Frame as 'Assertion (A)' and 'Reason (R)' with options A, B, C, D.
    - If "Case Study": Provide a short 3-line scenario/case paragraph followed by questions.
    - If "MCQs": Provide question with 4 clear options (A, B, C, D).
    - If Short/Long: Provide classic board subjective questions with step-by-step marking answers.

    Format response in VALID JSON array like this:
    [
      {
        "id": 1,
        "question": "Question text here",
        "marks": "${category.includes('MCQ') ? '1' : category.includes('Case') ? '4' : '3'}",
        "tag": "${category} - CBSE 2025",
        "hint1": "Hint 1 text",
        "hint2": "Hint 2 text",
        "answer": "Complete CBSE marking scheme answer text"
      }
    ]
    Return ONLY valid JSON array with EXACTLY 5 objects.
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

  // Fallback 5 Questions if network fails
  return Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    question: `Q${i + 1}: Sample CBSE 2025 ${category} Question for ${chapterName}`,
    marks: "3",
    tag: `${category} Predictor`,
    hint1: "Apply core NCERT conceptual understanding.",
    hint2: "Follow latest marking scheme steps.",
    answer: "Refer to standard NCERT solutions for full step-by-step evaluation."
  }));
}

export async function getLiveAIHint(questionText: string, hintLevel: number): Promise<string> {
  const prompt = `
    You are an expert CBSE Class 10 AI Tutor Agent.
    Question: "${questionText}"
    
    Task: Provide ${hintLevel === 1 ? 'Hint 1 (A small conceptual clue without revealing direct answer)' : 'Hint 2 (A step-by-step guidance hint)'}.
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
    return "Focus on the key concepts and standard definitions given in NCERT.";
  }
}