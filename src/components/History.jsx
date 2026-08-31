function History({ items, onSelect }) {
  if (items.length === 0) return null
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-sm font-semibold text-gray-500 mb-2">Recent</h2>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="text-left px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700"
          >
            {item.topic}
          </button>
        ))}
      </div>
    </div>
  )
}
export default History