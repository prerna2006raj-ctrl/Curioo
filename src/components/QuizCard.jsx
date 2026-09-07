import {
  useEffect,
  useState
} from "react"

import Confetti from "./Confetti"

const QUIZ_TIME = 60

function QuizCard({
  quiz,
  topic,
  onClose,
  onComplete
}) {
  const [selected, setSelected] =
    useState(null)

  const [showConfetti, setShowConfetti] =
    useState(false)

  const [timeLeft, setTimeLeft] =
    useState(QUIZ_TIME)

  const [timedOut, setTimedOut] =
    useState(false)

  // =========================
  // TIMER
  // =========================

  useEffect(() => {
    if (selected !== null) {
      return
    }

    const timer = window.setInterval(() => {

      setTimeLeft((previous) => {

        if (previous <= 1) {

          window.clearInterval(timer)

          setSelected(-1)
          setTimedOut(true)

          onComplete(false, true)

          return 0
        }

        return previous - 1
      })

    }, 1000)

    return () =>
      window.clearInterval(timer)

  }, [selected, onComplete])

  // =========================
  // SELECT ANSWER
  // =========================

  const handleSelect = (index) => {

    if (selected !== null) {
      return
    }

    setSelected(index)

    const correct =
      index === quiz.answerIndex

    if (correct) {

      setShowConfetti(true)

      setTimeout(() => {
        setShowConfetti(false)
      }, 2000)

    }

    onComplete(
      correct,
      false
    )
  }

  // =========================
  // TIMER PERCENTAGE
  // =========================

  const timerPercentage =
    (timeLeft / QUIZ_TIME) * 100

  const timerWarning =
    timeLeft <= 10

  return (

    <div
      className="
        animate-pop-in

        max-w-xl
        mx-auto
        mt-6

        bg-panel
        dark:bg-blueprint-panel

        border
        border-amber/40

        rounded-md

        p-6

        shadow-sm
      "
    >

      {/* CONFETTI */}

      {showConfetti && (
        <Confetti />
      )}


      {/* HEADER */}

      <div
        className="
          flex
          items-center
          justify-between
          mb-4
        "
      >

        <div>

          <h3
            className="
              font-display
              text-sm
              tracking-wide
              text-amber
            "
          >
            🧩 quick quiz
          </h3>

          {topic && (
            <p
              className="
                font-display
                text-[10px]
                text-ink/40
                dark:text-paper-dark/40
                mt-1
              "
            >
              {topic}
            </p>
          )}

        </div>


        <button
          onClick={onClose}
          className="
            font-display
            text-xs
            text-ink/50
            dark:text-paper-dark/50

            hover:text-amber

            transition-colors
            duration-150
          "
        >
          close
        </button>

      </div>


      {/* TIMER */}

      <div className="mb-5">

        <div
          className="
            flex
            items-center
            justify-between
            mb-1
          "
        >

          <span
            className="
              font-display
              text-xs
              text-ink/50
              dark:text-paper-dark/50
            "
          >
            time remaining
          </span>

          <span
            className={`
              font-display
              text-xs
              font-semibold

              ${
                timerWarning
                  ? "text-red-500 animate-pulse"
                  : "text-amber"
              }
            `}
          >
            {timeLeft}s
          </span>

        </div>


        <div
          className="
            w-full
            h-2

            rounded-full

            bg-gray-200
            dark:bg-white/10

            overflow-hidden
          "
        >

          <div
            className={`
              h-full
              rounded-full

              transition-all
              duration-1000

              ${
                timerWarning
                  ? "bg-red-500"
                  : "bg-amber"
              }
            `}
            style={{
              width: `${timerPercentage}%`
            }}
          />

        </div>

      </div>


      {/* QUESTION */}

      <p
        className="
          font-body
          mb-4
          text-base
          leading-relaxed
        "
      >
        {quiz.question}
      </p>


      {/* OPTIONS */}

      <div
        className="
          flex
          flex-col
          gap-2
        "
      >

        {quiz.options.map(
          (option, index) => {

            const isCorrect =
              index ===
              quiz.answerIndex

            const isSelected =
              index === selected

            let stateClasses =
              "border-line/25 dark:border-line-dark/25 hover:border-amber hover:bg-amber/5"

            if (
              selected !== null
            ) {

              if (isCorrect) {

                stateClasses =
                  "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400"

              } else if (
                isSelected
              ) {

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
                onClick={() =>
                  handleSelect(index)
                }
                disabled={
                  selected !== null
                }
                className={`
                  font-body
                  text-left

                  px-4
                  py-3

                  rounded-xl
                  border

                  transition-all
                  duration-200

                  ${stateClasses}
                `}
              >
                {option}
              </button>

            )
          }
        )}

      </div>


      {/* TIMEOUT */}

      {timedOut && (

        <div
          className="
            mt-4
            p-3

            rounded-xl

            bg-red-500/10
            border
            border-red-500/30

            text-red-600
            dark:text-red-400
          "
        >

          <p
            className="
              font-display
              text-sm
              font-medium
            "
          >
            ⏰ Time's up!
          </p>

          <p
            className="
              font-body
              text-xs
              mt-1
            "
          >
            The correct answer is
            highlighted above.
          </p>

        </div>

      )}


      {/* RESULT MESSAGE */}

      {selected !== null &&
        !timedOut && (

          <p
            className="
              font-display
              text-sm
              mt-4
            "
          >
            {selected ===
            quiz.answerIndex
              ? "✅ nice, that's right!"
              : "❌ not quite — the correct answer is highlighted above."}
          </p>

        )}

    </div>

  )
}

export default QuizCard