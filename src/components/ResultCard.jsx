function ResultCard({ text, onFavorite, isFavorite }) {
  return (
    <div className="max-w-xl mx-auto mt-8 bg-white shadow-md rounded-xl p-6 border-l-4 border-blue-500 whitespace-pre-line text-gray-700 leading-relaxed relative">
      <button
        onClick={onFavorite}
        className="absolute top-4 right-4 text-xl"
      >
        {isFavorite ? "⭐" : "☆"}
      </button>
      {text}
    </div>
  )
}
export default ResultCard