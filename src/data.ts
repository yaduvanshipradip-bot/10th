export interface QuestionItem {
  id: number;
  question: string;
  options?: string[];
  marks: string;
  tag: string;
  hint1: string;
  hint2: string;
  answer: string;
}

export interface ChapterItem {
  id: number;
  name: string;
  probability: string;
  frequency: string;
  questions: QuestionItem[];
}

export interface SubjectItem {
  subjectId: string;
  subjectName: string;
  chapters: ChapterItem[];
}

export const cbseData: SubjectItem[] = [
  {
    subjectId: "english",
    subjectName: "📖 English",
    chapters: [
      {
        id: 401,
        name: "1. A Letter to God",
        probability: "HIGH (90% Chance)",
        frequency: "Asked 9/10 years",
        questions: [
          {
            id: 4001,
            question: "Why did Lencho write a letter to God? What specific help did he ask for?",
            options: ["A) 100 Pesos for seeds & food", "B) 50 Pesos for house", "C) 500 Pesos for tractor", "D) 70 Pesos for rain"],
            marks: "3",
            tag: "Literature - Letter to God",
            hint1: "💡 Hint 1: Lencho's entire corn crop was destroyed by a devastating hailstorm.",
            hint2: "💡 Hint 2: He had immense faith in God and needed money to resow his field.",
            answer: "Lencho's corn field was completely destroyed by a severe hailstorm. Having unshakable faith in God, he wrote asking for 100 pesos to resow his field and feed his family until the next harvest."
          },
          {
            id: 4002,
            question: "Why did Lencho call the post office employees 'a bunch of crooks'?",
            marks: "3",
            tag: "Irony - Letter to God",
            hint1: "💡 Hint 1: He asked for 100 pesos but found only 70 pesos in the envelope.",
            hint2: "💡 Hint 2: He believed God couldn't make a mistake, so workers must have stolen 30 pesos.",
            answer: "Lencho asked God for 100 pesos but received only 70. Believing God would never make a mistake, he suspected the post office employees stole the missing 30 pesos, calling them 'a bunch of crooks'."
          }
        ]
      },
      {
        id: 402,
        name: "2. Nelson Mandela: Long Walk to Freedom",
        probability: "VERY HIGH (95% Chance)",
        frequency: "Asked 10/10 years",
        questions: [
          {
            id: 4003,
            question: "What did courage mean to Nelson Mandela in his autobiography?",
            options: ["A) Triumph over fear", "B) Absence of fear", "C) Physical power", "D) Avoiding danger"],
            marks: "1",
            tag: "MCQ - Nelson Mandela",
            hint1: "💡 Hint 1: Courage is not the absence of fear.",
            hint2: "💡 Hint 2: It is the victory/triumph over fear.",
            answer: "Option A) Triumph over fear. To Mandela, courage was not the absence of fear, but the triumph over it. A brave man is not he who does not feel afraid, but he who conquers that fear."
          },
          {
            id: 4004,
            question: "Describe the 'twin obligations' mentioned by Nelson Mandela.",
            marks: "5",
            tag: "5-Mark Long Question - Mandela",
            hint1: "💡 Hint 1: First obligation is to family (parents, wife, children).",
            hint2: "💡 Hint 2: Second obligation is to his people, community, and country.",
            answer: "Mandela mentions twin obligations:\n1. Obligation to Family: To care for parents, wife, children, and home.\n2. Obligation to Country: To serve his people, community, and nation South Africa."
          }
        ]
      }
    ]
  },
  {
    subjectId: "maths",
    subjectName: "📐 Mathematics",
    chapters: [
      {
        id: 201,
        name: "1. Real Numbers",
        probability: "HIGH (88% Chance)",
        frequency: "Asked 9/10 years",
        questions: [
          {
            id: 2001,
            question: "Prove that √5 is an Irrational Number using the method of contradiction.",
            marks: "3",
            tag: "Guaranteed Board Question - Maths",
            hint1: "💡 Hint 1: Assume √5 = a/b where 'a' and 'b' are co-prime integers (b ≠ 0).",
            hint2: "💡 Hint 2: Show that 5 divides both 'a' and 'b', contradicting co-prime assumption.",
            answer: "1. Let √5 = a/b (co-prime integers, b ≠ 0).\n2. 5b² = a² => 5 divides a² => 5 divides a.\n3. Let a = 5c => 5b² = 25c² => b² = 5c² => 5 divides b.\n4. Contradiction! 'a' and 'b' have common factor 5. Hence √5 is irrational."
          }
        ]
      },
      {
        id: 202,
        name: "2. Quadratic Equations",
        probability: "VERY HIGH (92% Chance)",
        frequency: "Asked 10/10 years",
        questions: [
          {
            id: 2002,
            question: "Find the discriminant of 2x² - 4x + 3 = 0 and determine the nature of its roots.",
            options: ["A) D = -8 (No real roots)", "B) D = 8 (Two distinct roots)", "C) D = 0 (Equal roots)", "D) D = 16"],
            marks: "2",
            tag: "Discriminant Formula - Maths",
            hint1: "💡 Hint 1: Discriminant formula D = b² - 4ac.",
            hint2: "💡 Hint 2: Here a = 2, b = -4, c = 3.",
            answer: "Option A) D = -8 (No real roots).\nCalculation: D = (-4)² - 4(2)(3) = 16 - 24 = -8. Since D < 0, no real roots exist."
          }
        ]
      }
    ]
  },
  {
    subjectId: "science",
    subjectName: "🧪 Science",
    chapters: [
      {
        id: 101,
        name: "1. Chemical Reactions and Equations",
        probability: "HIGH (90% Chance)",
        frequency: "Asked 8/10 years",
        questions: [
          {
            id: 1001,
            question: "What happens when Calcium Oxide (Quicklime) reacts with Water? Write balanced chemical equation.",
            options: ["A) Exothermic Combination", "B) Endothermic Decomposition", "C) Displacement", "D) Neutralization"],
            marks: "3",
            tag: "Chemistry - Chemical Reactions",
            hint1: "💡 Hint 1: Think whether heat is released or absorbed during this reaction.",
            hint2: "💡 Hint 2: CaO + H₂O produces Slaked Lime [Ca(OH)₂].",
            answer: "Option A) Exothermic Combination Reaction.\nEquation: CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat.\n1. Slaked Lime is formed.\n2. Large amount of heat is evolved."
          }
        ]
      },
      {
        id: 102,
        name: "2. Electricity",
        probability: "VERY HIGH (95% Chance)",
        frequency: "Asked 10/10 years",
        questions: [
          {
            id: 1002,
            question: "State Joule's Law of Heating. Express it mathematically and state unit of power.",
            marks: "5",
            tag: "5-Mark Long Question - Physics",
            hint1: "💡 Hint 1: Heat produced H is directly proportional to square of current I².",
            hint2: "💡 Hint 2: Formula H = I²Rt. Power P = VI = I²R.",
            answer: "1. Joule's Law of Heating: Heat produced in a resistor is directly proportional to:\n   - Square of current (H ∝ I²)\n   - Resistance (H ∝ R)\n   - Time (H ∝ t)\n   => H = I²Rt Joules.\n2. Electric Power P = V × I = I²R = V²/R. S.I. unit is Watt (W)."
          }
        ]
      }
    ]
  }
];