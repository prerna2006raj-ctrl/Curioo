function ProgressPage({ progress, onBack }) {

  const accuracy =
    progress.total > 0
      ? Math.round((progress.correct / progress.total) * 100)
      : 0

  const topicEntries = Object.entries(progress.byTopic)
    .sort((a, b) => b[1].attempts - a[1].attempts)

  return (

    <div className="animate-fade-in-up max-w-xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="font-display text-2xl font-semibold">
            your progress
          </h2>

          <p className="font-body text-sm text-ink/60 dark:text-paper-dark/60">
            Keep learning, one quiz at a time.
          </p>

        </div>

        <button
          onClick={onBack}
          className="
            font-display text-xs px-3 py-2 rounded-sm
            border border-line/30 dark:border-line-dark/30
            hover:border-amber hover:text-amber
            transition-colors
          "
        >
          ← back
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

        {[
          ["🧩", "quizzes", progress.total],
          ["✅", "correct", progress.correct],
          ["🎯", "accuracy", `${accuracy}%`],
          ["⏱️", "timed out", progress.timedOut],
        ].map(([icon, label, value]) => (

          <div
            key={label}
            className="
              bg-panel dark:bg-blueprint-panel
              border border-line/20 dark:border-line-dark/20
              rounded-md p-4 text-center
            "
          >

            <div className="text-xl">
              {icon}
            </div>

            <div className="font-display text-xl font-semibold mt-1">
              {value}
            </div>

            <div className="
              font-display text-[10px]
              uppercase tracking-wide
              text-ink/50 dark:text-paper-dark/50
            ">
              {label}
            </div>

          </div>

        ))}

      </div>

      {/* Overall accuracy */}
      <div className="
        mt-5
        bg-panel dark:bg-blueprint-panel
        border border-line/20 dark:border-line-dark/20
        rounded-md p-5
      ">

        <div className="flex items-center justify-between mb-2">

          <h3 className="font-display text-sm">
            overall quiz accuracy
          </h3>

          <span className="font-display text-sm text-amber">
            {accuracy}%
          </span>

        </div>

        <div className="
          h-3 rounded-full
          bg-line/10 dark:bg-line-dark/10
          overflow-hidden
        ">

          <div
            className="h-full bg-amber transition-all duration-500"
            style={{
              width: `${accuracy}%`
            }}
          />

        </div>

        <p className="
          font-body text-xs
          text-ink/50 dark:text-paper-dark/50
          mt-2
        ">
          {progress.correct} correct out of {progress.total} completed quizzes.
        </p>

      </div>

      {/* Topic progress */}
      {topicEntries.length > 0 ? (

        <div className="
          mt-5
          bg-panel dark:bg-blueprint-panel
          border border-line/20 dark:border-line-dark/20
          rounded-md p-5
        ">

          <h3 className="font-display text-sm mb-4">
            topics you've practiced
          </h3>

          <div className="flex flex-col gap-4">

            {topicEntries.map(([topic, stats]) => {

              const topicAccuracy =
                stats.attempts > 0
                  ? Math.round(
                      (stats.correct / stats.attempts) * 100
                    )
                  : 0

              return (

                <div key={topic}>

                  <div className="flex items-center justify-between gap-3 mb-1">

                    <span className="font-body text-sm truncate">
                      {topic}
                    </span>

                    <span className="
                      font-display text-xs
                      text-ink/50 dark:text-paper-dark/50
                      whitespace-nowrap
                    ">
                      {stats.correct}/{stats.attempts} · {topicAccuracy}%
                    </span>

                  </div>

                  <div className="
                    h-2 rounded-full
                    bg-line/10 dark:bg-line-dark/10
                    overflow-hidden
                  ">

                    <div
                      className="h-full bg-kid-teal transition-all duration-500"
                      style={{
                        width: `${topicAccuracy}%`
                      }}
                    />

                  </div>

                </div>

              )
            })}

          </div>

        </div>

      ) : (

        <div className="
          mt-5
          bg-panel dark:bg-blueprint-panel
          border border-dashed
          border-line/20 dark:border-line-dark/20
          rounded-md p-8 text-center
        ">

          <div className="text-3xl mb-2">
            📚
          </div>

          <p className="font-display text-sm">
            no quiz progress yet
          </p>

          <p className="
            font-body text-xs
            text-ink/50 dark:text-paper-dark/50
            mt-1
          ">
            Take your first quiz and your progress will appear here.
          </p>

        </div>

      )}

    </div>
  )
}

export default ProgressPage