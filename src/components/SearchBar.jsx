function SearchBar({ topic, setTopic, onExplain, loading }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xl mx-auto">
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="e.g. how does WiFi work"
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onExplain}
        disabled={loading || !topic.trim()}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Explain"}
      </button>
    </div>
  )
}

export default SearchBar