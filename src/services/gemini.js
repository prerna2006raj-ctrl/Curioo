export async function getExplanation(topic, tone = "kid") {
  const toneInstructions = {
    kid: `
      Explain the topic in very simple language.
      Use an easy example or analogy.
      Keep it friendly and engaging.
    `,

    simple: `
      Explain the topic clearly using simple language.
      Include important concepts and an easy example.
    `,

    detailed: `
      Give a detailed explanation of the topic.
      Explain the important concepts, how they work,
      and provide a useful example.
    `
  }

  const prompt = `
You are an educational assistant for a learning application called Curioo.

Topic: ${topic}

Tone:
${toneInstructions[tone] || toneInstructions.kid}

Explain the topic in a way that helps a student understand it.

Also provide 3 related topics that the student can explore.

Return ONLY valid JSON in this exact format:

{
  "text": "explanation here",
  "related": [
    "related topic 1",
    "related topic 2",
    "related topic 3"
  ]
}

Rules:

- Do not include markdown code fences.
- Do not include unnecessary fields.
- The explanation must be related to the requested topic.
- Related topics should be closely connected to the topic.
`

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    }
  )

  if (!response.ok) {
    throw new Error("Failed to generate explanation")
  }

  const data = await response.json()

  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || ""

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim()

  try {
    const parsed = JSON.parse(cleaned)

    return {
      text: parsed.text || "",
      related: Array.isArray(parsed.related)
        ? parsed.related
        : []
    }
  } catch {
    return {
      text: cleaned,
      related: []
    }
  }
}


export async function getQuiz(topic, difficulty = "Medium") {
  const difficultyInstructions = {
    Easy: `
      Create a beginner-friendly question.
      Use simple concepts and straightforward options.
      Avoid tricky wording.
    `,

    Medium: `
      Create a moderately challenging question.
      Test understanding and application of the concept.
      Include plausible distractor options.
    `,

    Hard: `
      Create a difficult question.
      Test deeper understanding, reasoning, edge cases,
      or application of the concept.
      Make the incorrect options believable.
    `
  }

  const prompt = `
You are creating a quiz for a learning application called Curioo.

Topic: ${topic}

Difficulty: ${difficulty}

${difficultyInstructions[difficulty]}

Create exactly ONE multiple-choice question.

Return ONLY valid JSON in this exact format:

{
  "question": "question here",
  "options": [
    "option 1",
    "option 2",
    "option 3",
    "option 4"
  ],
  "answerIndex": 0,
  "explanation": "short explanation of the correct answer"
}

Rules:

- Exactly 4 options
- answerIndex must be 0, 1, 2, or 3
- Only one option can be correct
- Do not include markdown
- Do not include code fences
- The question must be related to the topic
- Difficulty must match ${difficulty}
`

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    }
  )

  if (!response.ok) {
    throw new Error("Failed to generate quiz")
  }

  const data = await response.json()

  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || ""

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim()

  return JSON.parse(cleaned)
}