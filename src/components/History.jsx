function History({ items, onSelect }) {
  if (items.length === 0) return null
  return (
    <div className="animate-fade-in-up max-w-xl mx-auto mt-10">
      <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Recent</h2>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="text-left px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-all duration-150 hover:translate-x-1"
          >
            {item.topic}
          </button>
        ))}
      </div>
    </div>
  )
}
export default History