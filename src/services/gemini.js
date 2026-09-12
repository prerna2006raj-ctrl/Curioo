const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

const URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent"


async function callGemini(prompt) {

  const response = await fetch(URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": API_KEY
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
  })


  if (!response.ok) {
    throw new Error(
      "Something went wrong reaching the AI"
    )
  }


  const data = await response.json()

  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    ""
  )
}


/* =========================================================
   NORMAL EXPLANATION
   ========================================================= */

export async function getExplanation(
  topic,
  tone,
  mode = "standard"
) {

  const focus = {

    standard:
      "Give a balanced explanation.",

    simpler:
      "Make the explanation much simpler, using very easy words and short sentences.",

    example:
      "Explain the idea using a clear everyday example.",

    steps:
      "Focus strongly on a logical step-by-step explanation.",

    realworld:
      "Focus on a practical real-world example or situation.",

    analogy:
      "Explain the idea using one strong, easy-to-understand analogy."

  }[mode] || "Give a balanced explanation."


  const prompt = `
Explain "${topic}" for someone who is ${
    tone === "kid"
      ? "5 years old"
      : "an engineer"
  }.

${focus}

Respond in exactly this format:

Simple explanation: ...

Step-by-step: ...

Analogy: ...

Related: topic one | topic two | topic three
`


  const fullText = await callGemini(prompt)


  const relatedMatch =
    fullText.match(/Related:\s*(.+)/i)


  const related = relatedMatch
    ? relatedMatch[1]
        .split("|")
        .map((t) => t.trim())
        .filter(Boolean)
    : []


  const explanationText =
    fullText
      .replace(/Related:\s*.+/i, "")
      .trim()


  return {
    text: explanationText,
    related
  }
}


/* =========================================================
   LEARNING MODE
   ========================================================= */

export async function getLearningLesson(
  topic,
  tone
) {

  const prompt = `
Create a short interactive mini lesson about "${topic}".

The learner is ${
    tone === "kid"
      ? "5 years old"
      : "an engineer"
  }.

Create exactly 4 learning steps.

Each step should teach one important part of the topic.

Use simple, clear language.

Respond in exactly this format:

Title: ...

Goal: ...

Step 1: short step title | explanation

Step 2: short step title | explanation

Step 3: short step title | explanation

Step 4: short step title | explanation

Remember: one important takeaway

Question: one quick check question
`


  const raw = await callGemini(prompt)


  const title =
    raw.match(/Title:\s*(.+)/i)?.[1]?.trim() ||
    topic


  const goal =
    raw.match(/Goal:\s*(.+)/i)?.[1]?.trim() ||
    "Build a clear understanding of the topic."


  const steps = [1, 2, 3, 4].map(
    (number) => {

      const match = raw.match(
        new RegExp(
          `Step ${number}:\\s*([^|\\n]+)\\s*\\|\\s*([^\\n]+)`,
          "i"
        )
      )


      return {

        title:
          match?.[1]?.trim() ||
          `Step ${number}`,

        text:
          match?.[2]?.trim() ||
          "Let's understand this part of the topic."

      }

    }
  )


  const remember =
    raw.match(
      /Remember:\s*(.+)/i
    )?.[1]?.trim() || ""


  const question =
    raw.match(
      /Question:\s*(.+)/i
    )?.[1]?.trim() ||
    "What is the main idea you learned?"


  return {
    title,
    goal,
    steps,
    remember,
    question
  }
}


/* =========================================================
   QUIZ
   ========================================================= */

export async function getQuiz(topic, difficulty = "medium") {

  const difficultyInstructions = {
    easy: "Use basic recall and simple understanding. Keep the question straightforward.",
    medium: "Test understanding and application. Require some reasoning but stay accessible.",
    hard: "Make the question challenging. Test deeper understanding, application, or careful reasoning."
  }

  const prompt = `
Create one multiple-choice question to test understanding of "${topic}".

Difficulty: ${difficulty}

${difficultyInstructions[difficulty]}

Create exactly 4 options.

Also provide a brief explanation for EVERY option.
The explanation should explain why that option is correct or why it is incorrect.

Respond ONLY in this JSON format:

{
  "question": "Question here",
  "options": [
    "Option A",
    "Option B",
    "Option C",
    "Option D"
  ],
  "answerIndex": 0,
  "explanations": [
    "Explanation for option A",
    "Explanation for option B",
    "Explanation for option C",
    "Explanation for option D"
  ]
}
`

   const raw = await callGemini(prompt)

  let parsed

  try {

    // Remove possible markdown JSON formatting
    const cleaned = raw
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim()

    parsed = JSON.parse(cleaned)

  } catch (error) {

    console.error(
      "Quiz JSON parsing error:",
      error,
      raw
    )

    throw new Error(
      "Couldn't understand the quiz response"
    )
  }


  return {
    question: parsed.question,
    options: parsed.options,
    answerIndex: parsed.answerIndex,
    explanations: parsed.explanations
  }
}