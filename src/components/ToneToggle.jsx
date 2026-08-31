function ToneToggle({ tone, setTone }) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        onClick={() => setTone("kid")}
        className={`px-4 py-1.5 rounded-full text-sm font-medium ${
          tone === "kid" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
        }`}
      >
        Explain like I'm 5
      </button>
      <button
        onClick={() => setTone("engineer")}
        className={`px-4 py-1.5 rounded-full text-sm font-medium ${
          tone === "engineer" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
        }`}
      >
        Explain like an engineer
      </button>
    </div>
  )
}
export default ToneToggle