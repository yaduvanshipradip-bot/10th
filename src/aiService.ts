// Google Gemini AI Engine with Strict Category & Chapter Isolation
const GEMINI_API_KEY = "AIzaSyC-L0taKk5NVRsGH1_Sr7c0hz0rmOzCfFw";

export async function getAIChapterQuestions(subjectName: string, chapterName: string, category: string) {
  const prompt = `
    You are an expert CBSE Class 10 Paper Setter.
    Subject: "${subjectName}"
    Chapter: "${chapterName}"
    Category: "${category}"

    STRICT RULES:
    1. Provide EXACTLY 5 questions strictly matching category "${category}".
    2. If category is "MCQs (1 Mark)" or "Assertion & Reason": You MUST provide 4 options ["A) ...", "B) ...", "C) ...", "D) ..."].
    3. If category is "Short Qs (2-3 Marks)" or "Long Qs (5 Marks)": Do NOT provide options! Provide pure subjective questions.
    4. NEVER use the word 'NCERT' or 'book' in hints or answers. Give direct smart conceptual hints.

    Format response in STRICT VALID JSON Array with 5 objects:
    [
      {
        "id": 1,
        "question": "Question text specific to ${chapterName} and category ${category}",
        "marks": "${category.includes('MCQ') ? '1' : category.includes('Long') ? '5' : '3'}",
        "tag": "${category}",
        "hint1": "Direct conceptual hint 1 without mentioning NCERT",
        "hint2": "Direct step-by-step hint 2 without mentioning NCERT",
        "answer": "Complete direct CBSE Marking Scheme Answer"
      }
    ]
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      }
    );

    const data = await response.json();
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      const parsed = JSON.parse(data.candidates[0].content.parts[0].text);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("AI Generation Error:", e);
  }

  return getIsolatedCategoryFallback(chapterName, category);
}

// Category-Specific Clean Fallbacks (NO NCERT WORD & NO CATEGORY LEAKAGE)
function getIsolatedCategoryFallback(chapterName: string, category: string) {
  const isMCQ = category.includes("MCQ") || category.includes("Assertion");
  const isShort = category.includes("Short");
  const isLong = category.includes("Long");

  // Nelson Mandela Chapter
  if (chapterName.toLowerCase().includes("mandela")) {
    if (isShort) {
      return [
        {
          id: 1,
          question: "What did courage mean to Nelson Mandela in the chapter 'Long Walk to Freedom'?",
          marks: "3",
          tag: "Short Qs (2-3 Marks)",
          hint1: "💡 Hint 1: Courage is not the absence of fear.",
          hint2: "💡 Hint 2: It is the triumph over fear.",
          answer: "To Mandela, courage was not the absence of fear, but the triumph over it. A brave man is not he who does not feel afraid, but he who conquers that fear."
        },
        {
          id: 2,
          question: "Why were two national anthems sung on the inauguration day in South Africa?",
          marks: "3",
          tag: "Short Qs (2-3 Marks)",
          hint1: "💡 Hint 1: Think about equality between black and white communities.",
          hint2: "💡 Hint 2: One anthem was 'Nkosi Sikelel' and the other was 'Die Stem'.",
          answer: "Two national anthems were sung to symbolize equality between whites and blacks, signifying the end of Apartheid and unity of the nation."
        },
        {
          id: 3,
          question: "What 'twin obligations' does Nelson Mandela mention in the lesson?",
          marks: "3",
          tag: "Short Qs (2-3 Marks)",
          hint1: "💡 Hint 1: One obligation is towards family and wife.",
          hint2: "💡 Hint 2: The second obligation is towards people and country.",
          answer: "Mandela mentions twin obligations: 1) Obligation to his family, parents, wife, and children. 2) Obligation to his people, community, and his country South Africa."
        },
        {
          id: 4,
          question: "How did Mandela's understanding of freedom change with age and experience?",
          marks: "3",
          tag: "Short Qs (2-3 Marks)",
          hint1: "💡 Hint 1: As a boy, freedom meant running in fields and swimming.",
          hint2: "💡 Hint 2: As an adult, he realized freedom meant dignity for his entire community.",
          answer: "As a boy, freedom meant personal liberty like running in fields. As an adult, he realized true freedom meant dignity and rights for all black South Africans."
        },
        {
          id: 5,
          question: "Why was Mandela overwhelmed with a sense of history on the day of the inauguration?",
          marks: "3",
          tag: "Short Qs (2-3 Marks)",
          hint1: "💡 Hint 1: He remembered the sacrifices of uncounted freedom fighters.",
          hint2: "💡 Hint 2: It was the culmination of decades of struggle against Apartheid.",
          answer: "He was overwhelmed remembering thousands of African patriots who sacrificed their lives to end the brutal system of Apartheid."
        }
      ];
    }

    if (isMCQ) {
      return [
        {
          id: 1,
          question: "On which date was the historic inauguration ceremony held in South Africa?",
          options: ["A) 10th May 1994", "B) 15th April 1994", "C) 20th May 1995", "D) 10th March 1994"],
          marks: "1",
          tag: "MCQs (1 Mark)",
          hint1: "💡 Hint 1: It took place in an amphitheatre in Pretoria.",
          hint2: "💡 Hint 2: It was an autumn day in South Africa.",
          answer: "Option A) 10th May 1994. The inauguration ceremony took place in Pretoria."
        },
        {
          id: 2,
          question: "Assertion (A): Mandela felt that the oppressor must be liberated just as surely as the oppressed.\nReason (R): A man who takes away another's freedom is a prisoner of hatred.",
          options: ["A) Both A and R are true and R explains A", "B) Both A & R true but R does not explain A", "C) A is true, R false", "D) A is false, R true"],
          marks: "1",
          tag: "Assertion & Reason",
          hint1: "💡 Hint 1: Consider Mandela's views on prejudice and hatred.",
          hint2: "💡 Hint 2: Both oppressor and oppressed are robbed of humanity.",
          answer: "Option A) Both Assertion and Reason are true and Reason is the correct explanation."
        },
        {
          id: 3,
          question: "Who was sworn in as the first Deputy President before Nelson Mandela?",
          options: ["A) Thabo Mbeki", "B) Mr. de Klerk", "C) Zenani", "D) Oliver Tambo"],
          marks: "1",
          tag: "MCQs (1 Mark)",
          hint1: "💡 Hint 1: Mr. de Klerk was second deputy president.",
          hint2: "💡 Hint 2: Thabo Mbeki was sworn in as first deputy president.",
          answer: "Option A) Thabo Mbeki was sworn in as first deputy president."
        },
        {
          id: 4,
          question: "The spectacular array of South African jets was a display of military's loyalty to:",
          options: ["A) Democracy", "B) Dictatorship", "C) President only", "D) Army Chief"],
          marks: "1",
          tag: "MCQs (1 Mark)",
          hint1: "💡 Hint 1: It was loyalty to a newly formed free government.",
          hint2: "💡 Hint 2: Loyalty to democracy and fair elections.",
          answer: "Option A) Loyalty to democracy and a freely elected government."
        },
        {
          id: 5,
          question: "According to Mandela, what is the greatest wealth of a nation?",
          options: ["A) Its minerals and gems", "B) Its people", "C) Its technology", "D) Its army"],
          marks: "1",
          tag: "MCQs (1 Mark)",
          hint1: "💡 Hint 1: Finer and truer than the purest diamonds.",
          hint2: "💡 Hint 2: It is the human citizens of the nation.",
          answer: "Option B) Its people are finer and truer than the purest diamonds."
        }
      ];
    }
  }

  // General Fallback matching category strictly
  return Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    question: isMCQ 
      ? `Q${i + 1}: Important Board MCQ Question for ${chapterName}?`
      : `Q${i + 1}: Explain the important board concept of ${chapterName} in detail.`,
    options: isMCQ ? ["A) Option A", "B) Option B", "C) Option C", "D) Option D"] : undefined,
    marks: isMCQ ? "1" : isLong ? "5" : "3",
    tag: category,
    hint1: `💡 Hint 1: Identify the main concept given in ${chapterName}.`,
    hint2: `💡 Hint 2: Apply standard step-by-step board exam evaluation logic.`,
    answer: `Official CBSE Board Solution for ${chapterName}: State core points clearly as per marking scheme.`
  }));
}

export async function getLiveAIHint(questionText: string, hintLevel: number): Promise<string> {
  const prompt = `
    You are an expert CBSE Class 10 AI Tutor Agent.
    Question: "${questionText}"
    
    Task: Provide ${hintLevel === 1 ? 'Hint 1 (A small conceptual clue without revealing direct answer)' : 'Hint 2 (A step-by-step guidance hint)'}.
    Rules: NEVER mention the word 'NCERT' or 'book'. Keep it short (2 sentences max). Encouraging tone.
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
    ? "💡 Hint 1: Identify the main core concept required for this question."
    : "💡 Hint 2: Apply the step-by-step standard evaluation marking scheme.";
}