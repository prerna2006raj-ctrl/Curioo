import { useState } from "react"

function QuizCard({ quiz, onClose }) {
  const [selected, setSelected] = useState(null)

  const handleSelect = (index) => {
    if (selected !== null) return
    setSelected(index)
  }

  return (
    <div className="animate-pop-in max-w-xl mx-auto mt-6 bg-panel dark:bg-blueprint-panel border border-amber/40 rounded-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-sm tracking-wide text-amber">🧩 quick quiz</h3>
        <button
          onClick={onClose}
          className="font-display text-xs text-ink/50 dark:text-paper-dark/50 hover:text-amber transition-colors duration-150"
        >
          close
        </button>
      </div>

      <p className="font-body mb-4">{quiz.question}</p>

      <div className="flex flex-col gap-2">
        {quiz.options.map((option, index) => {
          const isCorrect = index === quiz.answerIndex
          const isSelected = index === selected
          let stateClasses = "border-line/25 dark:border-line-dark/25 hover:border-amber"
          if (selected !== null) {
            if (isCorrect) stateClasses = "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400"
            else if (isSelected) stateClasses = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400"
            else stateClasses = "border-line/15 dark:border-line-dark/15 opacity-60"
          }
          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={`font-body text-left px-4 py-2 rounded-sm border transition-colors duration-150 ${stateClasses}`}
            >
              {option}
            </button>
          )
        })}
      </div>

      {selected !== null && (
        <p className="font-display text-sm mt-4">
          {selected === quiz.answerIndex
            ? "✅ nice, that's right!"
            : "❌ not quite — the correct answer is highlighted above."}
        </p>
      )}
    </div>
  )
}
export default QuizCard
