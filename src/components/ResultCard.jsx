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
    <div className="animate-fade-in-up max-w-xl mx-auto mt-8 bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 border-l-4 border-blue-500 text-gray-700 dark:text-gray-200 leading-relaxed">
      <div className="flex justify-end gap-3 mb-3">
        <button
          onClick={handleShare}
          className="text-lg transition-transform duration-150 hover:scale-125 active:scale-90"
          aria-label="Share"
        >
          📤
        </button>
        <button
          onClick={handleCopy}
          className="text-lg transition-transform duration-150 hover:scale-125 active:scale-90"
          aria-label="Copy"
        >
          {copied ? "✅" : "📋"}
        </button>
        <button
          onClick={onFavorite}
          className="text-xl transition-transform duration-150 hover:scale-125 active:scale-90"
          aria-label="Favorite"
        >
          {isFavorite ? "⭐" : "☆"}
        </button>
      </div>
      <div className="whitespace-pre-line">{text}</div>
    </div>
  )
}
export default ResultCard
