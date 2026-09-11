import { useEffect, useRef, useState } from "react"

const QUIZ_TIME = 60


function QuizCard({
  quiz,
  topic,
  difficulty = "Medium",
  onClose,
  onComplete
}) {

  const [selected, setSelected] = useState(null)
  const [timeLeft, setTimeLeft] =
    useState(QUIZ_TIME)

  const [finished, setFinished] =
    useState(false)

  const [timedOut, setTimedOut] =
    useState(false)

  const completedRef =
    useRef(false)


  // Keep latest callback
  const onCompleteRef =
    useRef(onComplete)


  useEffect(() => {
    onCompleteRef.current =
      onComplete
  }, [onComplete])


  // =====================================================
  // COMPLETE QUIZ
  // =====================================================

  const finishQuiz = (
    isCorrect,
    didTimeOut
  ) => {

    if (completedRef.current) {
      return
    }


    completedRef.current = true

    setFinished(true)

    onCompleteRef.current?.(
      isCorrect,
      didTimeOut,
      topic
    )
  }


  // =====================================================
  // TIMER
  // =====================================================

  useEffect(() => {

    if (finished) {
      return
    }


    const timer =
      window.setInterval(() => {

        setTimeLeft((previous) => {

          if (previous <= 1) {

            window.clearInterval(
              timer
            )

            setTimedOut(true)

            finishQuiz(
              false,
              true
            )

            return 0
          }


          return previous - 1

        })

      }, 1000)


    return () =>
      window.clearInterval(timer)

  }, [finished])


  // =====================================================
  // ANSWER
  // =====================================================

  const handleAnswer = (index) => {

    if (finished) {
      return
    }


    setSelected(index)


    const isCorrect =
      Number(index) ===
      Number(quiz.answerIndex)


    finishQuiz(
      isCorrect,
      false
    )
  }


  // =====================================================
  // TIMER DISPLAY
  // =====================================================

  const minutes =
    Math.floor(
      timeLeft / 60
    )

  const seconds =
    timeLeft % 60


  const timerText =
    `${minutes}:${String(
      seconds
    ).padStart(2, "0")}`


  const timerPercent =
    Math.max(
      0,
      Math.round(
        (timeLeft /
          QUIZ_TIME) *
          100
      )
    )


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-line/20 dark:border-line-dark/20 bg-panel dark:bg-blueprint-panel shadow-2xl p-6 animate-pop-in">


        {/* HEADER */}

        <div className="flex items-start justify-between gap-4">

          <div>

            <p className="text-xs uppercase tracking-wider font-display text-ink/40 dark:text-paper-dark/40">
              Curioo Quiz
            </p>

            <h2 className="font-display text-xl font-semibold mt-1">
              {topic}
            </h2>

          </div>


          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-line/20 dark:border-line-dark/20 hover:bg-ink/5 dark:hover:bg-white/5 transition"
          >
            ✕
          </button>

        </div>


        {/* DIFFICULTY + TIMER */}

        <div className="flex flex-wrap items-center justify-between gap-3 mt-5">

          <span className="px-3 py-1 rounded-full text-xs font-display border border-line/20 dark:border-line-dark/20">
            {difficulty}
          </span>


          <span
            className={`font-display text-sm font-semibold ${
              timeLeft <= 10
                ? "text-red-500"
                : "text-ink/70 dark:text-paper-dark/70"
            }`}
          >
            ⏱ {timerText}
          </span>

        </div>


        {/* TIMER BAR */}

        <div className="h-2 bg-ink/10 dark:bg-white/10 rounded-full overflow-hidden mt-3">

          <div
            className={`h-full transition-all duration-1000 ${
              timeLeft <= 10
                ? "bg-red-500"
                : "bg-amber"
            }`}
            style={{
              width: `${timerPercent}%`
            }}
          />

        </div>


        {/* QUESTION */}

        <div className="mt-7">

          <p className="font-display text-lg font-semibold leading-relaxed">
            {quiz.question}
          </p>

        </div>


        {/* OPTIONS */}

        <div className="grid gap-3 mt-6">

          {quiz.options.map(
            (option, index) => {

              const isCorrect =
                Number(index) ===
                Number(
                  quiz.answerIndex
                )

              const isSelected =
                selected === index


              let optionClass =
                "border-line/20 dark:border-line-dark/20 hover:border-amber hover:scale-[1.01]"


              if (finished) {

                if (isCorrect) {

                  optionClass =
                    "border-green-500 bg-green-50 dark:bg-green-900/20"

                } else if (
                  isSelected &&
                  !isCorrect
                ) {

                  optionClass =
                    "border-red-500 bg-red-50 dark:bg-red-900/20"

                }

              }


              return (

                <button
                  key={index}
                  onClick={() =>
                    handleAnswer(index)
                  }
                  disabled={finished}
                  className={`w-full text-left rounded-2xl border p-4 font-body transition-all duration-200 ${optionClass} disabled:cursor-default`}
                >

                  <div className="flex items-start gap-3">

                    <span className="w-8 h-8 shrink-0 rounded-full border border-current/20 flex items-center justify-center font-display text-sm">
                      {String.fromCharCode(
                        65 + index
                      )}
                    </span>

                    <span className="pt-1">
                      {option}
                    </span>

                  </div>

                </button>

              )
            }
          )}

        </div>


        {/* RESULT */}

        {finished && (

          <div className="mt-6 rounded-2xl border border-line/20 dark:border-line-dark/20 bg-paper/60 dark:bg-blueprint p-5">

            {timedOut ? (

              <>

                <h3 className="font-display font-semibold text-red-500">
                  ⏰ Time's up!
                </h3>

                <p className="font-body text-sm mt-2">
                  The correct answer is:
                </p>

              </>

            ) : Number(selected) ===
                  Number(quiz.answerIndex) ? (

              <h3 className="font-display font-semibold text-green-600 dark:text-green-400">
                ✓ Correct!
              </h3>

            ) : (

              <>

                <h3 className="font-display font-semibold text-red-500">
                  ✕ Incorrect
                </h3>

                <p className="font-body text-sm mt-2">
                  Correct answer:
                </p>

              </>

            )}


            <p className="font-display font-medium mt-2">

              {quiz.options[
                quiz.answerIndex
              ]}

            </p>


            {quiz.explanation && (

              <div className="mt-4 pt-4 border-t border-line/10 dark:border-line-dark/10">

                <p className="text-xs uppercase tracking-wider font-display text-ink/40 dark:text-paper-dark/40">
                  Explanation
                </p>

                <p className="font-body text-sm mt-2 leading-relaxed">
                  {quiz.explanation}
                </p>

              </div>

            )}

          </div>

        )}


        {/* CLOSE */}

        {finished && (

          <button
            onClick={onClose}
            className="w-full mt-5 rounded-xl bg-line dark:bg-amber text-paper dark:text-blueprint font-display font-medium py-3 hover:opacity-90 transition"
          >
            Done
          </button>

        )}

      </div>

    </div>
  )
}


export default QuizCard