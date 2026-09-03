import { useState } from "react"

function ResultCard({ text, onFavorite, isFavorite, onRegenerate, regenerating, relatedTopics, onRelatedClick, onQuiz, quizLoading }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      alert("Couldn't copy text")
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Curioo explanation", text })
      } catch (err) {
        // user closed the share dialog, nothing to do
      }
    } else {
      handleCopy()
    }
  }

  return (
    <div className="animate-fade-in-up max-w-xl mx-auto mt-8 bg-panel dark:bg-blueprint-panel border border-line/20 dark:border-line-dark/20 rounded-md p-6">
      <div className="flex justify-end gap-3 pb-3 mb-4 border-b border-dashed border-line/25 dark:border-line-dark/25">
        <button onClick={handleShare} className="text-lg transition-transform duration-150 hover:scale-125 active:scale-90" aria-label="Share">
          📤
        </button>
        <button onClick={handleCopy} className="text-lg transition-transform duration-150 hover:scale-125 active:scale-90" aria-label="Copy">
          {copied ? "✅" : "📋"}
        </button>
        <button onClick={onFavorite} className="text-xl transition-transform duration-150 hover:scale-125 active:scale-90" aria-label="Favorite">
          {isFavorite ? "⭐" : "☆"}
        </button>
      </div>

      <div className="font-body whitespace-pre-line leading-relaxed">{text}</div>

      <div className="flex flex-wrap gap-2 mt-5">
        <button
          onClick={onRegenerate}
          disabled={regenerating}
          className="font-display text-xs px-3 py-1.5 rounded-sm border border-line/30 dark:border-line-dark/30 text-ink/70 dark:text-paper-dark/70 hover:border-amber hover:text-amber transition-colors duration-150 disabled:opacity-40"
        >
          {regenerating ? "regenerating…" : "🔄 explain differently"}
        </button>
        <button
          onClick={onQuiz}
          disabled={quizLoading}
          className="font-display text-xs px-3 py-1.5 rounded-sm border border-line/30 dark:border-line-dark/30 text-ink/70 dark:text-paper-dark/70 hover:border-amber hover:text-amber transition-colors duration-150 disabled:opacity-40"
        >
          {quizLoading ? "loading quiz…" : "🧩 quiz me"}
        </button>
      </div>

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
  )
}
export default ResultCard
