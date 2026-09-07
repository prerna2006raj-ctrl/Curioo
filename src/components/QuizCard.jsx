import { useEffect, useState } from "react"
import Confetti from "./Confetti"

const QUIZ_TIME = 60

function QuizCard({ quiz, topic, onClose, onComplete }) {
  const [selected, setSelected] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME)
  const [timedOut, setTimedOut] = useState(false)

  const finishQuiz = (index, didTimeOut = false) => {
    if (selected !== null) return

    setSelected(index)
    setTimedOut(didTimeOut)

    const isCorrect = index === quiz.answerIndex

    onComplete(isCorrect, didTimeOut)
  }

  // Quiz timer
  useEffect(() => {
    if (selected !== null) return

    const timer = window.setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          window.clearInterval(timer)

          // Time is over
          setSelected(-1)
          setTimedOut(true)
          onComplete(false, true)

          return 0
        }

        return previous - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [selected, onComplete])

  // Confetti for correct answer
  useEffect(() => {
    if (selected === quiz.answerIndex) {
      setShowConfetti(true)

      const timer = window.setTimeout(() => {
        setShowConfetti(false)
      }, 2000)

      return () => window.clearTimeout(timer)
    }
  }, [selected, quiz.answerIndex])

  const handleSelect = (index) => {
    if (selected !== null) return

    finishQuiz(index)
  }

  const timerPercent = (timeLeft / QUIZ_TIME) * 100
  const timerWarning = timeLeft <= 10 && selected === null

  return (
    <div className="animate-pop-in max-w-xl mx-auto mt-6 bg-panel dark:bg-blueprint-panel border border-amber/40 rounded-md p-6">

      {showConfetti && <Confetti />}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-sm tracking-wide text-amber">
          🧩 quick quiz
        </h3>

        <button
          onClick={onClose}
          className="font-display text-xs text-ink/50 dark:text-paper-dark/50 hover:text-amber transition-colors"
        >
          close
        </button>
      </div>

      {/* Timer */}
      <div className="mb-5">

        <div className="flex items-center justify-between font-display text-xs mb-1">

          <span className="text-ink/50 dark:text-paper-dark/50">
            time remaining
          </span>

          <span
            className={
              timerWarning
                ? "text-red-500 font-semibold"
                : "text-amber"
            }
          >
            {timeLeft}s
          </span>

        </div>

        {/* Timer progress bar */}
        <div className="h-2 rounded-full bg-line/10 dark:bg-line-dark/10 overflow-hidden">

          <div
            className={`h-full transition-all duration-1000 ${
              timerWarning ? "bg-red-500" : "bg-amber"
            }`}
            style={{
              width: `${timerPercent}%`
            }}
          />

        </div>

      </div>

      {/* Question */}
      <p className="font-body mb-4">
        {quiz.question}
      </p>

      {/* Options */}
      <div className="flex flex-col gap-2">

        {quiz.options.map((option, index) => {

          const isCorrect = index === quiz.answerIndex
          const isSelected = index === selected

          let stateClasses =
            "border-line/25 dark:border-line-dark/25 hover:border-amber"

          if (selected !== null) {

            if (isCorrect) {

              stateClasses =
                "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400"

            } else if (isSelected) {

              stateClasses =
                "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400"

            } else {

              stateClasses =
                "border-line/15 dark:border-line-dark/15 opacity-60"

            }
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={selected !== null}
              className={`
                font-body text-left px-4 py-2 rounded-sm border
                transition-colors duration-150
                ${stateClasses}
              `}
            >
              {option}
            </button>
          )
        })}

      </div>

      {/* Result */}
      {selected !== null && (

        <div className="mt-4">

          {timedOut ? (

            <p className="font-display text-sm text-red-500">
              ⏰ Time's up! The correct answer is highlighted above.
            </p>

          ) : (

            <p className="font-display text-sm">

              {selected === quiz.answerIndex
                ? "✅ Nice, that's right!"
                : "❌ Not quite — the correct answer is highlighted above."
              }

            </p>

          )}

          <p className="font-body text-xs text-ink/50 dark:text-paper-dark/50 mt-1">

            {topic} ·{" "}

            {selected === quiz.answerIndex
              ? "1 point"
              : "0 points"
            }

          </p>

        </div>

      )}

    </div>
  )
}

export default QuizCard