const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent"

export async function getExplanation(topic, tone) {
  const prompt = `Explain "${topic}" for someone who is ${tone === "kid" ? "5 years old" : "an engineer"}.
Respond in exactly this format:
Simple explanation: ...
Step-by-step: ...
Analogy: ...
Related: topic one | topic two | topic three`

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": API_KEY
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  })

  if (!response.ok) {
    throw new Error("Something went wrong reaching the AI")
  }

  const data = await response.json()
  const fullText = data.candidates[0].content.parts[0].text

  const relatedMatch = fullText.match(/Related:\s*(.+)/i)
  const related = relatedMatch
    ? relatedMatch[1].split("|").map((t) => t.trim()).filter(Boolean)
    : []
  const explanationText = fullText.replace(/Related:\s*.+/i, "").trim()

  return { text: explanationText, related }
}

export async function getQuiz(topic) {
  const prompt = `Create one multiple-choice question to test understanding of "${topic}".
Respond in exactly this format, nothing else:
Question: ...
A) ...
B) ...
C) ...
D) ...
Answer: <A, B, C or D>`

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": API_KEY
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  })

  if (!response.ok) {
    throw new Error("Something went wrong reaching the AI")
  }

  const data = await response.json()
  const raw = data.candidates[0].content.parts[0].text

  const question = raw.match(/Question:\s*(.+)/i)?.[1]?.trim() || ""
  const options = ["A", "B", "C", "D"].map((letter) => {
    const match = raw.match(new RegExp(`${letter}\\)\\s*(.+)`))
    return match ? match[1].trim() : ""
  })
  const answerLetter = raw.match(/Answer:\s*([A-D])/i)?.[1]?.toUpperCase() || "A"
  const answerIndex = ["A", "B", "C", "D"].indexOf(answerLetter)

  return { question, options, answerIndex }
}
