function FavoritesPage({ favorites, onBack, onRemove, onSelect }) {
  const handleExport = () => {
    const content = favorites
      .map((item) => `${item.topic}\n${"-".repeat(item.topic.length)}\n${item.text}\n`)
      .join("\n\n")
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "curioo-favorites.txt"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-xl mx-auto animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="font-display text-sm text-line dark:text-line-dark hover:text-amber transition-colors duration-150"
        >
          ← back
        </button>
        {favorites.length > 0 && (
          <button
            onClick={handleExport}
            className="font-display text-xs px-3 py-1.5 rounded-sm border border-line/30 dark:border-line-dark/30 text-ink/70 dark:text-paper-dark/70 hover:border-amber hover:text-amber transition-colors duration-150"
          >
            ⬇ export as .txt
          </button>
        )}
      </div>
      <h2 className="font-display text-2xl font-semibold mb-6">your favorites</h2>

      {favorites.length === 0 ? (
        <p className="font-body italic text-ink/60 dark:text-paper-dark/60">
          nothing saved yet — tap the star on any explanation to keep it here.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {favorites.map((item) => (
            <div
              key={item.topic}
              className="bg-panel dark:bg-blueprint-panel border border-line/20 dark:border-line-dark/20 rounded-md p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-display font-medium">{item.topic}</h3>
                <button
                  onClick={() => onRemove(item)}
                  className="text-lg transition-transform duration-150 hover:scale-125 active:scale-90 shrink-0"
                  aria-label="Remove from favorites"
                >
                  ⭐
                </button>
              </div>
              <p className="font-body text-sm text-ink/70 dark:text-paper-dark/70 line-clamp-2 mb-3">
                {item.text}
              </p>
              <button
                onClick={() => onSelect(item)}
                className="font-display text-xs px-3 py-1.5 rounded-sm border border-line/30 dark:border-line-dark/30 hover:border-amber hover:text-amber transition-colors duration-150"
              >
                view full explanation
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default FavoritesPage
