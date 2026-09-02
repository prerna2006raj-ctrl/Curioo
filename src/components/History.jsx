function History({ items, onSelect }) {
  if (items.length === 0) return null
  return (
    <div className="animate-fade-in-up max-w-xl mx-auto mt-10">
      <h2 className="font-display text-xs tracking-wide text-ink/50 dark:text-paper-dark/50 mb-2">recent</h2>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="font-body text-left px-4 py-2 bg-panel dark:bg-blueprint-panel border border-line/15 dark:border-line-dark/15 rounded-sm hover:border-amber text-ink dark:text-paper-dark transition-all duration-150 hover:translate-x-1"
          >
            {item.topic}
          </button>
        ))}
      </div>
    </div>
  )
}
export default History
