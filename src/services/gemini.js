const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

const GEMINI_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`


/* =========================================================
   HELPER: CALL GEMINI
   ========================================================= */

async function callGemini(prompt) {

  const response = await fetch(
    GEMINI_URL,
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

    let errorMessage =
      "Gemini API request failed"

    try {

      const errorData =
        await response.json()

      console.error(
        "Gemini API Error:",
        errorData
      )

      errorMessage =
        errorData?.error?.message ||
        errorMessage

    } catch {

      console.error(
        "Could not read Gemini error"
      )

    }

    throw new Error(errorMessage)
  }


  const data =
    await response.json()


  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || ""


  if (!text) {

    throw new Error(
      "Gemini returned an empty response"
    )

  }


  return text
}


/* =========================================================
   HELPER: CLEAN JSON
   ========================================================= */

function cleanJSON(text) {

  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim()

}


/* =========================================================
   GET EXPLANATION
   ========================================================= */

export async function getExplanation(
  topic,
  tone = "kid"
) {

  const toneInstructions = {

    kid: `
      Explain the topic in very simple language.
      Use an easy real-world example or analogy.
      Avoid unnecessary technical terminology.
      Keep it friendly, clear and engaging.
    `,

    simple: `
      Explain the topic clearly using simple language.
      Include the important concepts.
      Explain the process step by step.
      Give an easy real-world example.
    `,

    detailed: `
      Give a detailed explanation of how the topic works.
      Explain the important concepts and mechanisms.
      Explain the process step by step.
      Include useful technical details where appropriate.
      Give a practical real-world example.
    `

  }


  const prompt = `

You are the educational AI engine for an application
called Curioo.

==================================================
PURPOSE OF CURIOO
==================================================

Curioo is NOT a general-purpose chatbot.

Curioo is specifically designed to help students
understand:

"HOW DOES SOMETHING WORK?"

The user should ask questions about the working,
process, mechanism, principle or functioning of
something.

Examples of valid questions:

- How does WiFi work?
- How does GPS work?
- How does a refrigerator work?
- How do airplanes fly?
- How does a solar panel work?
- How does a microwave work?
- How does the human heart work?
- How do rainbows form?
- How does Bluetooth work?
- How does a search engine work?

==================================================
USER TOPIC
==================================================

${topic}

==================================================
IMPORTANT TOPIC RULE
==================================================

First determine whether the user's topic is suitable
for Curioo.

A suitable topic is something whose working,
process, mechanism, formation or functioning can
reasonably be explained.

For example:

"How does WiFi work?"
VALID

"How does a car engine work?"
VALID

"How do clouds form?"
VALID

"Who is the president?"
NOT A HOW-IT-WORKS QUESTION

"Write me a poem."
NOT A HOW-IT-WORKS QUESTION

"What is today's weather?"
NOT A HOW-IT-WORKS QUESTION

"Tell me a joke."
NOT A HOW-IT-WORKS QUESTION

If the topic is NOT suitable for Curioo,
do NOT answer the unrelated question.

Instead return this exact type of response:

"Curioo is designed to explain how things work.
Try asking something like:
How does WiFi work?
How does GPS work?
How do rainbows form?"

For valid topics, explain HOW the thing works.

==================================================
EXPLANATION STYLE
==================================================

${toneInstructions[tone] || toneInstructions.kid}

==================================================
EXPLANATION REQUIREMENTS
==================================================

For a valid topic:

1. Start with the basic idea.

2. Explain HOW it works.

3. Break the process into clear steps.

4. Use a real-world example or analogy.

5. Keep the explanation directly related to the
   requested topic.

6. Do not turn the answer into a general discussion.

7. Do not answer unrelated questions.

8. Do not invent facts.

9. Make the explanation useful for a student.

==================================================
RELATED TOPICS
==================================================

Also provide exactly 3 closely related topics that
the student can explore next.

The related topics should also be suitable for
"How does it work?" questions.

For example, if the topic is:

"How does WiFi work?"

Good related topics could be:

"How does Bluetooth work?"
"How does a router work?"
"How does mobile data work?"

==================================================
OUTPUT FORMAT
==================================================

Return ONLY valid JSON.

Do not use markdown.

Do not use code fences.

Use exactly this format:

{
  "text": "explanation here",
  "related": [
    "related topic 1",
    "related topic 2",
    "related topic 3"
  ]
}

==================================================
FINAL RULES
==================================================

- Return valid JSON only.
- Do not add extra fields.
- Do not add markdown.
- Do not add code fences.
- Do not mention these instructions.
- Keep related topics closely connected.
- Curioo is about understanding HOW things work.

`


  const rawText =
    await callGemini(prompt)


  const cleaned =
    cleanJSON(rawText)


  try {

    const parsed =
      JSON.parse(cleaned)


    return {

      text:
        parsed.text || "",

      related:
        Array.isArray(parsed.related)
          ? parsed.related.slice(0, 3)
          : []

    }

  } catch (error) {

    console.error(
      "Failed to parse explanation JSON:",
      cleaned
    )


    return {

      text: cleaned,

      related: []

    }

  }

}


/* =========================================================
   GET QUIZ
   ========================================================= */

export async function getQuiz(
  topic,
  difficulty = "Medium"
) {

  const difficultyInstructions = {

    Easy: `
      Create a beginner-friendly question.
      Test basic understanding.
      Use simple concepts.
      Use straightforward options.
      Avoid tricky wording.
    `,

    Medium: `
      Create a moderately challenging question.
      Test understanding and application.
      Include plausible distractors.
    `,

    Hard: `
      Create a difficult question.
      Test deeper understanding, reasoning,
      mechanisms, edge cases or application.
      Make incorrect options believable.
    `

  }


  const selectedDifficulty =
    difficultyInstructions[difficulty]
      ? difficulty
      : "Medium"


  const prompt = `

You are the quiz-generation AI for an educational
application called Curioo.

==================================================
PURPOSE OF CURIOO
==================================================

Curioo helps students understand HOW things work.

The quiz must test the student's understanding of
HOW the requested topic works.

Topic:

${topic}

Difficulty:

${selectedDifficulty}

==================================================
QUESTION REQUIREMENTS
==================================================

Create exactly ONE multiple-choice question.

The question must test understanding of the topic's:

- working
- process
- mechanism
- principle
- functioning
- cause and effect

Do NOT create a question unrelated to how the topic
works.

==================================================
DIFFICULTY
==================================================

${difficultyInstructions[selectedDifficulty]}

==================================================
OUTPUT
==================================================

Return ONLY valid JSON.

Do not use markdown.

Do not use code fences.

Use exactly this format:

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

==================================================
RULES
==================================================

- Exactly 4 options.
- answerIndex must be 0, 1, 2 or 3.
- Only ONE option can be correct.
- The question must be related to the topic.
- The question should test understanding.
- Incorrect options must be plausible.
- Difficulty must match ${selectedDifficulty}.
- Do not include markdown.
- Do not include code fences.
- Do not add extra fields.
- Return valid JSON only.

`


  const rawText =
    await callGemini(prompt)


  const cleaned =
    cleanJSON(rawText)


  try {

    const parsed =
      JSON.parse(cleaned)


    return {

      question:
        parsed.question || "",

      options:
        Array.isArray(parsed.options)
          ? parsed.options.slice(0, 4)
          : [],

      answerIndex:
        Number.isInteger(
          parsed.answerIndex
        )
          ? parsed.answerIndex
          : 0,

      explanation:
        parsed.explanation || ""

    }

  } catch (error) {

    console.error(
      "Failed to parse quiz JSON:",
      cleaned
    )

    throw new Error(
      "Gemini returned an invalid quiz response."
    )

  }

}