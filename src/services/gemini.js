const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent"

export async function getExplanation(topic, tone) {
  const prompt = `Explain "${topic}" for someone who is ${tone === "kid" ? "5 years old" : "an engineer"}.
Respond in exactly this format:
Simple explanation: ...
Step-by-step: ...
Analogy: ...`

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
  return data.candidates[0].content.parts[0].text
}
