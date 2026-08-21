export const cbseData = [
  {
    subjectId: "science",
    subjectName: "🧪 Science",
    chapters: [
      {
        id: 101,
        name: "Chemical Reactions and Equations",
        probability: "HIGH (90% Chance)",
        frequency: "Asked 8/10 years in Board Exams",
        questions: [
          {
            id: 1001,
            question: "What happens when quicklime is added to water? Write the balanced chemical equation.",
            marks: 3,
            tag: "Most Repeated (5 Times)",
            hint1: "🔍 Hint 1: Think whether heat is released or absorbed (Exothermic vs Endothermic).",
            hint2: "💡 Hint 2: Quicklime is Calcium Oxide (CaO). Mixing with water forms Slaked Lime.",
            answer: "CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat (Exothermic Reaction)"
          },
          {
            id: 1002,
            question: "Why is respiration considered an exothermic reaction? Explain.",
            marks: 2,
            tag: "Conceptual Predictor",
            hint1: "🔍 Hint 1: Think about how glucose breaks down in presence of oxygen in our cells.",
            hint2: "💡 Hint 2: Energy is released during the breakdown of glucose.",
            answer: "Glucose combines with oxygen in cells to release energy (ATP) + CO2 + Water. Hence Exothermic."
          }
        ]
      },
      {
        id: 102,
        name: "Light - Reflection and Refraction",
        probability: "VERY HIGH (95% Chance)",
        frequency: "Asked 10/10 years in Board Exams",
        questions: [
          {
            id: 1003,
            question: "A concave mirror produces a real image 3 times the size of object at 10 cm in front of it. Find image distance.",
            marks: 3,
            tag: "Numerical Predictor 2025",
            hint1: "🔍 Hint 1: Real image magnification m = -3. Object distance u = -10 cm.",
            hint2: "💡 Hint 2: Use magnification formula: m = -v/u.",
            answer: "m = -v/u => -3 = -v / (-10) => v = -30 cm."
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
        name: "Real Numbers",
        probability: "HIGH (88% Chance)",
        frequency: "Asked 9/10 years in Board Exams",
        questions: [
          {
            id: 2001,
            question: "Prove that √5 is an irrational number.",
            marks: 3,
            tag: "Guaranteed Board Question",
            hint1: "🔍 Hint 1: Use method of contradiction. Assume √5 = a/b where a and b are co-prime.",
            hint2: "💡 Hint 2: Show that both 'a' and 'b' have 5 as a common factor.",
            answer: "Assume √5 = a/b (co-prime). 5b² = a² => 5 divides a. Let a=5c => 5 divides b. Contradiction! Hence √5 is irrational."
          }
        ]
      },
      {
        id: 202,
        name: "Quadratic Equations",
        probability: "VERY HIGH (92% Chance)",
        frequency: "Asked 10/10 years in Board Exams",
        questions: [
          {
            id: 2002,
            question: "Find the nature of roots of 2x² - 4x + 3 = 0.",
            marks: 2,
            tag: "Discriminant Formula",
            hint1: "🔍 Hint 1: Calculate Discriminant D = b² - 4ac.",
            hint2: "💡 Hint 2: Here a=2, b=-4, c=3. If D < 0, roots are no real roots.",
            answer: "D = (-4)² - 4(2)(3) = 16 - 24 = -8 (< 0). No real roots exist."
          }
        ]
      }
    ]
  },
  {
    subjectId: "sst",
    subjectName: "🌍 Social Science",
    chapters: [
      {
        id: 301,
        name: "The Rise of Nationalism in Europe",
        probability: "HIGH (90% Chance)",
        frequency: "Asked 9/10 years in Board Exams",
        questions: [
          {
            id: 3001,
            question: "Explain the main features of the Napoleonic Code of 1804.",
            marks: 5,
            tag: "5-Mark High Weightage",
            hint1: "🔍 Hint 1: Think about equality before law, right to property, and abolition of feudal system.",
            hint2: "💡 Hint 2: Mention removal of guild restrictions and transport improvement.",
            answer: "1. Established equality before law. 2. Secured Right to Property. 3. Abolished feudal system. 4. Freed peasants from serfdom. 5. Standardized weights & measures."
          }
        ]
      }
    ]
  }
];