import { useState } from "react"

function SearchBar({ topic, setTopic, onExplain, loading }) {
  const [listening, setListening] = useState(false)

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert("Voice input isn't supported in this browser. Try Chrome or Edge.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = "en-US"
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => setListening(true)
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript
      setTopic(spokenText)
    }

    recognition.start()
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xl mx-auto">
      <div className="relative flex-1">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. how does WiFi work"
          className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg pl-4 pr-11 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
        />
        <button
          onClick={handleVoiceInput}
          type="button"
          className={`absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full transition-transform duration-150 hover:scale-110 ${
            listening
              ? "bg-red-500 text-white animate-pulse"
              : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300"
          }`}
          aria-label="Voice input"
        >
          🎤
        </button>
      </div>
      <button
        onClick={onExplain}
        disabled={loading || !topic.trim()}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-transform duration-150 hover:scale-105 active:scale-95"
      >
        {loading ? "Thinking..." : "Explain"}
      </button>
    </div>
  )
}
export default SearchBar
