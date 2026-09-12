import { useState } from "react";

function SearchBar({ topic, setTopic, onExplain, loading, kidMode, history }) {
  const [listening, setListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input isn't supported in this browser. Try Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setTopic(spokenText);
    };

    recognition.start();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && topic.trim() && !loading) {
      setShowSuggestions(false);
      onExplain();
    }
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const matches = topic.trim()
    ? [...new Set(history.map((h) => h.topic))]
        .filter(
          (t) =>
            t.toLowerCase().includes(topic.toLowerCase()) &&
            t.toLowerCase() !== topic.toLowerCase(),
        )
        .slice(0, 4)
    : [];

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <div className="relative flex-1">
        <input
          type="text"
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. how does WiFi work"
          className={`font-body w-full pl-4 pr-11 py-2 focus:outline-none focus:ring-2 transition-all duration-200 border ${
            kidMode
              ? "rounded-full border-kid-pink/40 bg-paper dark:bg-blueprint text-ink dark:text-paper-dark focus:ring-kid-teal"
              : "rounded-sm border-line/30 dark:border-line-dark/30 bg-paper dark:bg-blueprint text-ink dark:text-paper-dark focus:ring-amber"
          }`}
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

        {showSuggestions && matches.length > 0 && (
          <div className="absolute left-0 right-0 mt-1 bg-panel dark:bg-blueprint-panel border border-line/20 dark:border-line-dark/20 rounded-sm shadow-md z-10 overflow-hidden">
            {matches.map((m) => (
              <button
                key={m}
                onMouseDown={() => {
                  setTopic(m);
                  setShowSuggestions(false);
                }}
                className="font-body block w-full text-left px-4 py-2 text-sm hover:bg-line/5 dark:hover:bg-line-dark/10 text-ink dark:text-paper-dark"
              >
                {m}
              </button>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={onExplain}
        disabled={loading || !topic.trim()}
        className={`font-display font-medium px-5 py-2 hover:opacity-90 disabled:opacity-40 transition-transform duration-150 hover:scale-105 active:scale-95 ${
          kidMode
            ? "rounded-full bg-kid-pink dark:bg-kid-teal text-white"
            : "rounded-sm bg-line dark:bg-amber text-paper dark:text-blueprint"
        }`}
      >
        {loading ? "Thinking…" : "Explain"}
      </button>
    </div>
  );
}
export default SearchBar;
