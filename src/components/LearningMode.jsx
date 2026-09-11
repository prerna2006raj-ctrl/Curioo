import { useState } from "react"

function LearningMode({ lesson, topic, onClose }) {
  const [step, setStep] = useState(0)

  const total = lesson?.steps?.length || 0
  const currentStep = lesson?.steps?.[step]

  if (!lesson || !total) return null

  const isLast = step === total - 1

  return (
    <div className="animate-pop-in max-w-xl mx-auto mt-6 bg-panel dark:bg-blueprint-panel border border-line/20 dark:border-line-dark/20 rounded-2xl p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5">

        <div>
          <p className="font-display text-xs uppercase tracking-widest text-amber mb-1">
            🎓 learning mode
          </p>

          <h2 className="font-display text-xl font-semibold text-ink dark:text-paper-dark">
            {lesson.title || topic}
          </h2>

          {lesson.goal && (
            <p className="font-body text-sm text-ink/60 dark:text-paper-dark/60 mt-1">
              {lesson.goal}
            </p>
          )}
        </div>

        <button
          onClick={onClose}
          className="font-display text-xs text-ink/50 dark:text-paper-dark/50 hover:text-amber transition-colors"
        >
          close
        </button>

      </div>


      {/* Step counter */}
      <div className="flex items-center justify-between mb-3">

        <span className="font-display text-xs text-ink/50 dark:text-paper-dark/50">
          Step {step + 1} of {total}
        </span>

        <span className="font-display text-xs text-ink/50 dark:text-paper-dark/50">
          {Math.round(((step + 1) / total) * 100)}%
        </span>

      </div>


      {/* Progress bar */}
      <div className="h-2 rounded-full bg-line/10 dark:bg-line-dark/10 overflow-hidden mb-6">

        <div
          className="h-full bg-amber transition-all duration-300"
          style={{
            width: `${((step + 1) / total) * 100}%`
          }}
        />

      </div>


      {/* Current lesson */}
      <div className="min-h-44 rounded-2xl border border-line/15 dark:border-line-dark/15 bg-paper/60 dark:bg-blueprint p-5 flex flex-col justify-center">

        <div className="text-3xl mb-3">
          💡
        </div>

        <h3 className="font-display text-lg font-semibold mb-2 text-ink dark:text-paper-dark">
          {currentStep.title}
        </h3>

        <p className="font-body leading-relaxed text-ink/80 dark:text-paper-dark/80">
          {currentStep.text}
        </p>

      </div>


      {/* Final takeaway */}
      {isLast && lesson.remember && (
        <div className="mt-4 rounded-xl border border-amber/30 bg-amber/5 p-4">

          <p className="font-display text-xs uppercase tracking-widest text-amber mb-1">
            remember
          </p>

          <p className="font-body text-sm leading-relaxed">
            {lesson.remember}
          </p>

        </div>
      )}


      {/* Quick check */}
      {isLast && lesson.question && (
        <div className="mt-4 rounded-xl border border-line/15 dark:border-line-dark/15 p-4">

          <p className="font-display text-xs uppercase tracking-widest text-ink/50 dark:text-paper-dark/50 mb-1">
            quick check
          </p>

          <p className="font-body text-sm">
            {lesson.question}
          </p>

        </div>
      )}


      {/* Navigation */}
      <div className="flex justify-between items-center mt-5 gap-3">

        <button
          onClick={() =>
            setStep((value) => Math.max(0, value - 1))
          }
          disabled={step === 0}
          className="font-display text-sm px-4 py-2 rounded-xl border border-line/20 dark:border-line-dark/20 disabled:opacity-30 hover:border-amber transition-colors"
        >
          ← Back
        </button>


        {!isLast ? (
          <button
            onClick={() =>
              setStep((value) =>
                Math.min(total - 1, value + 1)
              )
            }
            className="font-display text-sm px-5 py-2 rounded-xl bg-amber text-white hover:brightness-95 transition-all"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={onClose}
            className="font-display text-sm px-5 py-2 rounded-xl bg-amber text-white hover:brightness-95 transition-all"
          >
            Finish ✓
          </button>
        )}

      </div>

    </div>
  )
}

export default LearningMode