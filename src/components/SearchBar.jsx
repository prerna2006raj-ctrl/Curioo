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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && topic.trim() && !loading) {
      onExplain()
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <div className="relative flex-1">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. how does WiFi work"
          className="font-body w-full border border-line/30 dark:border-line-dark/30 bg-paper dark:bg-blueprint text-ink dark:text-paper-dark rounded-sm pl-4 pr-11 py-2 focus:outline-none focus:ring-2 focus:ring-amber transition-shadow duration-200"
        />
        <button
          onClick={handleVoiceInput}
          type="button"
          className={`absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full transition-transform duration-150 hover:scale-110 ${
            listening
              ? "bg-red-500 text-white animate-pulse"
              : "bg-line/10 dark:bg-line-dark/10 text-line dark:text-line-dark"
          }`}
          aria-label="Voice input"
        >
          🎤
        </button>
      </div>
      <button
        onClick={onExplain}
        disabled={loading || !topic.trim()}
        className="font-display font-medium bg-line dark:bg-amber text-paper dark:text-blueprint px-5 py-2 rounded-sm hover:opacity-90 disabled:opacity-40 transition-transform duration-150 hover:scale-105 active:scale-95"
      >
        {loading ? "Thinking…" : "Explain"}
      </button>
    </div>
  )
}
export default SearchBar
