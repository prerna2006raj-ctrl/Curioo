function ToneToggle({ tone, setTone }) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        onClick={() => setTone("kid")}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
          tone === "kid"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
        }`}
      >
        Explain like I'm 5
      </button>
      <button
        onClick={() => setTone("engineer")}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
          tone === "engineer"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
        }`}
      >
        Explain like an engineer
      </button>
    </div>
  )
}
export default ToneToggle
