import { useState } from "react"

function ResultCard({ text, onFavorite, isFavorite }) {
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
    </div>
  )
}
export default ResultCard
