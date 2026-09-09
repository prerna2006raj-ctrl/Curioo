const API_TIMEOUT = 25000

const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent"


// =====================================================
// FETCH WITH TIMEOUT
// =====================================================

async function fetchWithTimeout(
  url,
  options = {},
  timeout = API_TIMEOUT
) {
  const controller = new AbortController()

  const timeoutId = setTimeout(() => {
    controller.abort()
  }, timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })

    return response

  } catch (error) {

    if (error.name === "AbortError") {
      throw new Error(
        "TIMEOUT"
      )
    }

    throw error

  } finally {

    clearTimeout(timeoutId)

  }
}


// =====================================================
// API REQUEST
// =====================================================

async function generateContent(prompt) {

  const apiKey =
    import.meta.env.VITE_GEMINI_API_KEY

  if (!apiKey) {
    throw new Error(
      "API_KEY_MISSING"
    )
  }


  const response =
    await fetchWithTimeout(
      `${API_URL}?key=${apiKey}`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
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
          ],

          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1200
          }
        })
      }
    )


  // ===================================================
  // HANDLE API ERRORS
  // ===================================================

  if (!response.ok) {

    let errorData = null

    try {
      errorData =
        await response.json()
    } catch {
      errorData = null
    }


    const status =
      response.status


    if (status === 429) {
      throw new Error(
        "RATE_LIMIT"
      )
    }


    if (status === 401 ||
        status === 403) {
      throw new Error(
        "API_AUTH"
      )
    }


    if (status >= 500) {
      throw new Error(
        "SERVER_ERROR"
      )
    }


    console.error(
      "Gemini API error:",
      errorData
    )

    throw new Error(
      "API_ERROR"
    )
  }


  const data =
    await response.json()


  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim()


  if (!text) {
    throw new Error(
      "EMPTY_RESPONSE"
    )
  }


  return text
}


// =====================================================
// EXPLANATION
// =====================================================

export async function getExplanation(
  topic,
  tone = "kid"
) {

  const prompt = `
You are Curioo, an intelligent learning assistant.

Explain the following topic:

"${topic}"

Tone:
${tone === "kid"
  ? "Explain simply and clearly so a young learner can understand it."
  : "Explain clearly and intelligently for a student."}

Requirements:
- Start with a simple definition.
- Explain how it works.
- Give a practical example.
- Use short sections.
- Avoid unnecessary complexity.
- Do not use excessive emojis.
- End with 3 related topics.

Return the explanation followed by:

RELATED:
topic 1
topic 2
topic 3
`


  const text =
    await generateContent(
      prompt
    )


  let explanation = text
  let related = []


  const relatedIndex =
    text.indexOf("RELATED:")


  if (relatedIndex !== -1) {

    explanation =
      text
        .slice(0, relatedIndex)
        .trim()

    related =
      text
        .slice(
          relatedIndex +
          "RELATED:".length
        )
        .split("\n")
        .map(
          (item) =>
            item
              .replace(/^[-•*]\s*/, "")
              .trim()
        )
        .filter(Boolean)
        .slice(0, 3)

  }


  return {
    text: explanation,
    related
  }
}


// =====================================================
// QUIZ
// =====================================================

export async function getQuiz(
  topic
) {

  const prompt = `
Create a multiple-choice quiz question about:

"${topic}"

Return ONLY valid JSON.

Format:

{
  "question": "question here",
  "options": [
    "option 1",
    "option 2",
    "option 3",
    "option 4"
  ],
  "answerIndex": 0
}

Rules:
- Exactly 4 options.
- answerIndex must be 0, 1, 2 or 3.
- Make only one option correct.
`


  const text =
    await generateContent(
      prompt
    )


  try {

    const cleaned =
      text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim()


    const quiz =
      JSON.parse(cleaned)


    if (
      !quiz.question ||
      !Array.isArray(
        quiz.options
      ) ||
      quiz.options.length !== 4 ||
      typeof quiz.answerIndex !==
        "number"
    ) {
      throw new Error(
        "INVALID_QUIZ"
      )
    }


    return quiz

  } catch (error) {

    console.error(
      "Quiz parsing error:",
      error
    )

    throw new Error(
      "INVALID_QUIZ"
    )
  }
}