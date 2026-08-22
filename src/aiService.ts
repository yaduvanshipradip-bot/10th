// Google Gemini AI Engine with Strict Chapter & Category Isolation
const GEMINI_API_KEY = "AIzaSyC-L0taKk5NVRsGH1_Sr7c0hz0rmOzCfFw";

export async function getAIChapterQuestions(subjectName: string, chapterName: string, category: string) {
  const prompt = `
    You are an expert CBSE Class 10 Paper Setter.
    STRICT RULE: Focus ONLY on Chapter "${chapterName}" from Subject "${subjectName}". DO NOT mix other chapters.
    Category: "${category}".

    Task: Provide EXACTLY 5 high-probability questions for Chapter "${chapterName}".

    Formatting Rules based on Category:
    - If Category contains "MCQs" or "Assertion": You MUST include "options" array with 4 options ["A) ...", "B) ...", "C) ...", "D) ..."].
    - If "Case Study": Provide a short 3-line case scenario text in question.

    Format response in STRICT VALID JSON Array with 5 objects:
    [
      {
        "id": 1,
        "question": "Question text specific to ${chapterName}",
        "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
        "marks": "${category.includes('MCQ') ? '1' : category.includes('Case') ? '4' : '3'}",
        "tag": "${category} - ${chapterName}",
        "hint1": "Specific Hint 1 for this question",
        "hint2": "Specific Hint 2 for this question",
        "answer": "Correct Option & Detailed CBSE Marking Scheme Answer"
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

  // EXACT CHAPTER FALLBACKS (NO MIXING!)
  return getChapterFallback(chapterName, category);
}

// Chapter-Wise Isolated Fallbacks
function getChapterFallback(chapterName: string, category: string) {
  const chap = chapterName.toLowerCase();

  // 1. Nelson Mandela
  if (chap.includes("nelson") || chap.includes("mandela")) {
    return [
      {
        id: 1,
        question: "On which date was the historic inauguration ceremony held in South Africa?",
        options: ["A) 10th May 1994", "B) 15th April 1994", "C) 20th May 1995", "D) 10th March 1994"],
        marks: "1",
        tag: "MCQs - Nelson Mandela",
        hint1: "🔍 Hint 1: It took place in an amphitheatre in Pretoria during autumn season.",
        hint2: "💡 Hint 2: May 10th was the day South Africa's first democratic government was installed.",
        answer: "Option A) 10th May 1994. The historic inauguration ceremony took place in Pretoria."
      },
      {
        id: 2,
        question: "Assertion (A): Mandela felt that the oppressor must be liberated just as surely as the oppressed.\nReason (R): A man who takes away another's freedom is a prisoner of hatred.",
        options: ["A) Both A and R are true and R explains A", "B) Both A & R true but R does not explain A", "C) A is true, R false", "D) A is false, R true"],
        marks: "1",
        tag: "Assertion & Reason - Mandela",
        hint1: "🔍 Hint 1: Consider Mandela's views on prejudice and hatred.",
        hint2: "💡 Hint 2: Both oppressor and oppressed are robbed of humanity.",
        answer: "Option A) Both Assertion and Reason are true and Reason is the correct explanation."
      },
      {
        id: 3,
        question: "What did courage mean to Nelson Mandela?",
        marks: "3",
        tag: "Short Answer - Nelson Mandela",
        hint1: "🔍 Hint 1: Courage is not the absence of fear.",
        hint2: "💡 Hint 2: It is the triumph over fear.",
        answer: "To Mandela, courage was not the absence of fear, but the triumph over it. The brave man is not he who does not feel afraid, but he who conquers that fear."
      },
      {
        id: 4,
        question: "Why were two national anthems sung on the day of the inauguration?",
        marks: "3",
        tag: "Short Answer - Nelson Mandela",
        hint1: "🔍 Hint 1: Think about equality between white and black communities.",
        hint2: "💡 Hint 2: One was 'Nkosi Sikelel' (Black) and 'Die Stem' (White).",
        answer: "Two national anthems were sung to symbolize equality between whites and blacks, signifying the end of Apartheid and unity of the nation."
      },
      {
        id: 5,
        question: "Describe the 'twin obligations' mentioned by Nelson Mandela in the chapter.",
        marks: "5",
        tag: "5-Mark Long Question",
        hint1: "🔍 Hint 1: One obligation is towards family, parents, and wife.",
        hint2: "💡 Hint 2: The second obligation is towards his people, community, and country.",
        answer: "Mandela mentions twin obligations:\n1. Obligation to his family, parents, wife, and children.\n2. Obligation to his people, community, and his country South Africa."
      }
    ];
  }

  // 2. A Letter to God
  if (chap.includes("letter") || chap.includes("god")) {
    return [
      {
        id: 1,
        question: "How much money did Lencho ask God for in his letter?",
        options: ["A) 100 Pesos", "B) 70 Pesos", "C) 50 Pesos", "D) 150 Pesos"],
        marks: "1",
        tag: "MCQs - Letter to God",
        hint1: "🔍 Hint 1: He needed it to sow his field and live until next crop.",
        hint2: "💡 Hint 2: The postmaster could only collect 70 pesos, but Lencho asked for 100.",
        answer: "Option A) 100 Pesos. Lencho wrote asking for 100 pesos to resow his damaged corn field."
      },
      {
        id: 2,
        question: "Why did Lencho call the post office employees 'a bunch of crooks'?",
        marks: "3",
        tag: "Short Answer - Lencho",
        hint1: "🔍 Hint 1: He received only 70 pesos instead of 100.",
        hint2: "💡 Hint 2: He believed God could not make a mistake, so post office workers stole 30 pesos.",
        answer: "Lencho asked for 100 pesos but received only 70. Having firm faith in God, he believed God couldn't make a mistake and suspected the post office employees took the remaining 30 pesos."
      },
      {
        id: 3,
        question: "What destroyed Lencho's corn fields completely?",
        options: ["A) Hailstorm", "B) Drought", "C) Flood", "D) Locust attack"],
        marks: "1",
        tag: "MCQs - Letter to God",
        hint1: "🔍 Hint 1: Large frozen rain stones fell for an hour.",
        hint2: "💡 Hint 2: It left the field white as if covered with salt.",
        answer: "Option A) Hailstorm completely destroyed Lencho's field."
      },
      {
        id: 4,
        question: "Describe Lencho's faith in God. Was it blind or deep conviction?",
        marks: "3",
        tag: "Short Answer - Lencho",
        hint1: "🔍 Hint 1: He treated God as a living helper.",
        hint2: "💡 Hint 2: He didn't hesitate to write a letter to God.",
        answer: "Lencho had unshakable and single-minded faith in God. He believed God sees everything and wrote a letter to Him as a friend."
      },
      {
        id: 5,
        question: "Write a short character sketch of the Postmaster in 'A Letter to God'.",
        marks: "5",
        tag: "5-Mark Character Sketch",
        hint1: "🔍 Hint 1: He was fat, amiable, and kind-hearted.",
        hint2: "💡 Hint 2: He gave part of his salary to preserve Lencho's faith.",
        answer: "The Postmaster was a fat, amiable, and compassionate human being. He was deeply moved by Lencho's faith and collected 70 pesos to help him anonymously."
      }
    ];
  }

  // 3. Chemical Reactions (Science)
  if (chap.includes("chemical") || chap.includes("equation")) {
    return [
      {
        id: 1,
        question: "What type of chemical reaction is: CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat?",
        options: ["A) Exothermic Combination", "B) Endothermic Decomposition", "C) Displacement", "D) Double Displacement"],
        marks: "1",
        tag: "MCQs - Chemical Reactions",
        hint1: "🔍 Hint 1: Two reactants combine into one single product.",
        hint2: "💡 Hint 2: Large amount of heat is evolved.",
        answer: "Option A) Exothermic Combination Reaction."
      },
      {
        id: 2,
        question: "Why is respiration considered an exothermic reaction?",
        marks: "2",
        tag: "Conceptual Predictor",
        hint1: "🔍 Hint 1: Glucose breaks down with oxygen in cells.",
        hint2: "💡 Hint 2: Energy in the form of ATP is released.",
        answer: "During respiration, glucose combines with oxygen in cells releasing energy (ATP) + CO2 + H2O. Thus it is exothermic."
      },
      {
        id: 3,
        question: "What happens when an iron nail is dipped in copper sulphate solution?",
        marks: "3",
        tag: "Displacement Reaction",
        hint1: "🔍 Hint 1: Iron is more reactive than copper.",
        hint2: "💡 Hint 2: Blue CuSO4 solution turns pale green (FeSO4).",
        answer: "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s). Iron displaces copper forming pale green Ferrous Sulphate solution."
      },
      {
        id: 4,
        question: "Define Corrosion and Rancidity with one preventive measure each.",
        marks: "3",
        tag: "Definition & Prevention",
        hint1: "🔍 Hint 1: Corrosion is rusting of metals. Rancidity is oxidation of fats/oils.",
        hint2: "💡 Hint 2: Prevention: Galvanization for corrosion, Nitrogen gas for rancidity.",
        answer: "Corrosion: Deterioration of metals by air/moisture (Prevention: Galvanization).\nRancidity: Oxidation of fats/oils in food (Prevention: Flush chips bags with N2 gas)."
      },
      {
        id: 5,
        question: "Balance the equation: Fe + H₂O → Fe₃O₄ + H₂ and identify oxidized and reduced species.",
        marks: "5",
        tag: "5-Mark Balancing",
        hint1: "🔍 Hint 1: 3 Fe + 4 H2O → Fe3O4 + 4 H2.",
        hint2: "💡 Hint 2: Fe gains oxygen (oxidized), H2O loses oxygen (reduced).",
        answer: "Balanced Equation: 3Fe(s) + 4H₂O(g) → Fe₃O₄(s) + 4H₂(g)\n- Oxidized: Fe\n- Reduced: H₂O\n- Oxidizing Agent: H₂O\n- Reducing Agent: Fe."
      }
    ];
  }

  // Generic Default fallback if new chapter
  return Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    question: `Q${i + 1}: Important Board Question for ${chapterName} (${category})`,
    options: ["A) Standard Option A", "B) Standard Option B", "C) Standard Option C", "D) Standard Option D"],
    marks: category.includes('MCQ') ? "1" : "3",
    tag: `${category} - ${chapterName}`,
    hint1: `🔍 Hint 1: Focus on core NCERT definitions for ${chapterName}.`,
    hint2: `💡 Hint 2: Follow standard step-by-step CBSE marking scheme.`,
    answer: `Official CBSE Board Solution for ${chapterName}: Refer to standard NCERT evaluation scheme.`
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
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
  } catch (error) {
    console.error("Live Hint Error:", error);
  }

  return hintLevel === 1 
    ? "💡 Hint 1: Identify the main concept from NCERT textbook for this question."
    : "💡 Hint 2: Apply the step-by-step standard CBSE evaluation marking scheme.";
}