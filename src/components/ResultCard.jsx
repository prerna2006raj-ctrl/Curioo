import { useEffect, useState } from "react";

function ResultCard({
  text,
  onFavorite,
  isFavorite,
  onRegenerate,
  regenerating,
  relatedTopics,
  onRelatedClick,
  onQuiz,
  quizLoading,
  onLearning,
  learningLoading,
  onExplainAgain,
  kidMode,
}) {
  const [copied, setCopied] = useState(false);

  const [speaking, setSpeaking] = useState(false);

  const [showExplainAgain, setShowExplainAgain] = useState(false);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text]);

  /* COPY */

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Couldn't copy text");
    }
  };

  /* SHARE */

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Curioo explanation",
          text,
        });
      } catch (err) {
        // User closed share dialog
      }
    } else {
      handleCopy();
    }
  };

  /* READ ALOUD */

  const handleReadAloud = () => {
    if (speaking) {
      window.speechSynthesis.cancel();

      setSpeaking(false);

      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = 0.95;

    utterance.onend = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);

    setSpeaking(true);
  };

  /* EXPLAIN AGAIN OPTIONS */

  const explainAgainOptions = [
    ["simpler", "🧒 Explain simpler"],

    ["example", "💡 Explain with example"],

    ["steps", "🪜 Explain step-by-step"],

    ["realworld", "🌍 Give real-world example"],

    ["analogy", "🔗 Give analogy"],
  ];

  return (
    <div
      className={`animate-fade-in-up max-w-xl mx-auto mt-8 bg-panel dark:bg-blueprint-panel p-6 transition-all duration-300 ${
        kidMode
          ? "rounded-3xl border-2 border-kid-pink/40"
          : "rounded-md border border-line/20 dark:border-line-dark/20"
      }`}
    >
      {/* ACTION BAR */}

      <div className="flex justify-end gap-3 pb-3 mb-4 border-b border-dashed border-line/25 dark:border-line-dark/25">
        <button
          onClick={handleReadAloud}
          title="Read explanation aloud"
          className={`text-lg transition-transform duration-150 hover:scale-125 active:scale-90 ${
            speaking ? "animate-pulse" : ""
          }`}
          aria-label="Read aloud"
        >
          {speaking ? "⏹️" : "🔊"}
        </button>

        <button
          onClick={handleShare}
          title="Share"
          className="text-lg transition-transform duration-150 hover:scale-125 active:scale-90"
          aria-label="Share"
        >
          📤
        </button>

        <button
          onClick={handleCopy}
          title="Copy to clipboard"
          className="text-lg transition-transform duration-150 hover:scale-125 active:scale-90"
          aria-label="Copy"
        >
          {copied ? "✅" : "📋"}
        </button>

        <button
          onClick={onFavorite}
          title="Save to favorites"
          className="text-xl transition-transform duration-150 hover:scale-125 active:scale-90"
          aria-label="Favorite"
        >
          {isFavorite ? "⭐" : "☆"}
        </button>
      </div>

      {/* EXPLANATION */}

      <div className="font-body whitespace-pre-line leading-relaxed">
        {text}
      </div>

      {/* MAIN CONTROLS */}

      <div className="flex flex-wrap gap-2 mt-5">
        {/* Explain Again */}

        <button
          onClick={() => setShowExplainAgain((value) => !value)}
          className="font-display text-xs px-3 py-1.5 rounded-sm border border-amber/40 text-amber hover:bg-amber/10 transition-colors duration-150"
        >
          ✨ explain again
        </button>

        {/* Learning Mode */}

        <button
          onClick={onLearning}
          disabled={learningLoading}
          className="font-display text-xs px-3 py-1.5 rounded-sm border border-line/30 dark:border-line-dark/30 text-ink/70 dark:text-paper-dark/70 hover:border-amber hover:text-amber transition-colors duration-150 disabled:opacity-40"
        >
          {learningLoading ? "building lesson…" : "🎓 learning mode"}
        </button>

        {/* Quiz */}

        <button
          onClick={onQuiz}
          disabled={quizLoading}
          className="font-display text-xs px-3 py-1.5 rounded-sm border border-line/30 dark:border-line-dark/30 text-ink/70 dark:text-paper-dark/70 hover:border-amber hover:text-amber transition-colors duration-150 disabled:opacity-40"
        >
          {quizLoading ? "loading quiz…" : "🧩 quiz me"}
        </button>
      </div>

      {/* EXPLAIN AGAIN MENU */}

      {showExplainAgain && (
        <div className="mt-3 p-3 rounded-xl border border-amber/20 bg-amber/5 animate-fade-in-up">
          <p className="font-display text-xs text-ink/50 dark:text-paper-dark/50 mb-2">
            Choose how you want to understand it:
          </p>

          <div className="flex flex-wrap gap-2">
            {explainAgainOptions.map(([mode, label]) => (
              <button
                key={mode}
                onClick={() => onExplainAgain(mode)}
                className="font-display text-xs px-3 py-2 rounded-lg border border-line/20 dark:border-line-dark/20 hover:border-amber hover:text-amber transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* RELATED */}

      {relatedTopics && relatedTopics.length > 0 && (
        <div className="mt-6 pt-4 border-t border-dashed border-line/25 dark:border-line-dark/25">
          <h3 className="font-display text-xs tracking-wide text-ink/50 dark:text-paper-dark/50 mb-2">
            explore next
          </h3>

          <div className="flex flex-wrap gap-2">
            {relatedTopics.map((rt) => (
              <button
                key={rt}
                onClick={() => onRelatedClick(rt)}
                className="font-display text-xs px-3 py-1.5 rounded-sm border border-amber/40 text-amber hover:bg-amber hover:text-blueprint transition-colors duration-150"
              >
                {rt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultCard;
