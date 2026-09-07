function ProgressPage({
  progress,
  onBack
}) {
  const total =
    progress?.total || 0

  const correct =
    progress?.correct || 0

  const timedOut =
    progress?.timedOut || 0

  const accuracy =
    total > 0
      ? Math.round(
          (correct / total) * 100
        )
      : 0

  const topics = Object.entries(
    progress?.byTopic || {}
  )

  return (

    <div
      className="
        max-w-3xl
        mx-auto
        animate-fade-in-up
      "
    >

      {/* HEADER */}

      <div
        className="
          flex
          items-center
          justify-between
          mb-6
        "
      >

        <div>

          <p
            className="
              font-display
              text-xs
              uppercase
              tracking-widest
              text-ink/40
              dark:text-paper-dark/40
            "
          >
            Your learning
          </p>

          <h2
            className="
              font-display
              text-2xl
              font-semibold
              mt-1
            "
          >
            📈 Quiz Progress
          </h2>

        </div>


        <button
          onClick={onBack}
          className="
            px-4
            py-2

            rounded-xl

            border
            border-line/20
            dark:border-line-dark/20

            bg-panel
            dark:bg-blueprint-panel

            font-display
            text-xs

            hover:border-amber
            hover:text-amber

            transition-all
          "
        >
          ← Back
        </button>

      </div>


      {/* STAT CARDS */}

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-3
          mb-6
        "
      >

        {/* TOTAL */}

        <div
          className="
            p-4
            rounded-2xl

            bg-panel
            dark:bg-blueprint-panel

            border
            border-line/10
            dark:border-line-dark/10
          "
        >

          <span className="text-xl">
            🧩
          </span>

          <p
            className="
              font-display
              text-2xl
              font-semibold
              mt-2
            "
          >
            {total}
          </p>

          <p
            className="
              text-xs
              text-ink/50
              dark:text-paper-dark/50
            "
          >
            Quizzes
          </p>

        </div>


        {/* CORRECT */}

        <div
          className="
            p-4
            rounded-2xl

            bg-panel
            dark:bg-blueprint-panel

            border
            border-line/10
            dark:border-line-dark/10
          "
        >

          <span className="text-xl">
            ✅
          </span>

          <p
            className="
              font-display
              text-2xl
              font-semibold
              mt-2
            "
          >
            {correct}
          </p>

          <p
            className="
              text-xs
              text-ink/50
              dark:text-paper-dark/50
            "
          >
            Correct
          </p>

        </div>


        {/* ACCURACY */}

        <div
          className="
            p-4
            rounded-2xl

            bg-panel
            dark:bg-blueprint-panel

            border
            border-line/10
            dark:border-line-dark/10
          "
        >

          <span className="text-xl">
            🎯
          </span>

          <p
            className="
              font-display
              text-2xl
              font-semibold
              mt-2
            "
          >
            {accuracy}%
          </p>

          <p
            className="
              text-xs
              text-ink/50
              dark:text-paper-dark/50
            "
          >
            Accuracy
          </p>

        </div>


        {/* TIMEOUT */}

        <div
          className="
            p-4
            rounded-2xl

            bg-panel
            dark:bg-blueprint-panel

            border
            border-line/10
            dark:border-line-dark/10
          "
        >

          <span className="text-xl">
            ⏰
          </span>

          <p
            className="
              font-display
              text-2xl
              font-semibold
              mt-2
            "
          >
            {timedOut}
          </p>

          <p
            className="
              text-xs
              text-ink/50
              dark:text-paper-dark/50
            "
          >
            Timed out
          </p>

        </div>

      </div>


      {/* OVERALL PROGRESS */}

      <div
        className="
          p-6

          rounded-3xl

          bg-panel
          dark:bg-blueprint-panel

          border
          border-kid-pink/20

          mb-6
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            mb-3
          "
        >

          <div>

            <h3
              className="
                font-display
                font-medium
              "
            >
              Overall accuracy
            </h3>

            <p
              className="
                text-xs
                text-ink/40
                dark:text-paper-dark/40
                mt-1
              "
            >
              Keep exploring and
              learning!
            </p>

          </div>

          <span
            className="
              font-display
              font-semibold
              text-amber
            "
          >
            {accuracy}%
          </span>

        </div>


        <div
          className="
            w-full
            h-3

            rounded-full

            bg-gray-200
            dark:bg-white/10

            overflow-hidden
          "
        >

          <div
            className="
              h-full

              rounded-full

              bg-gradient-to-r
              from-pink-400
              to-amber-400

              transition-all
              duration-700
            "
            style={{
              width: `${accuracy}%`
            }}
          />

        </div>

      </div>


      {/* TOPIC PROGRESS */}

      <div
        className="
          p-6

          rounded-3xl

          bg-panel
          dark:bg-blueprint-panel

          border
          border-line/10
          dark:border-line-dark/10
        "
      >

        <div className="mb-5">

          <h3
            className="
              font-display
              font-medium
            "
          >
            Topic progress
          </h3>

          <p
            className="
              text-xs
              text-ink/40
              dark:text-paper-dark/40
              mt-1
            "
          >
            See where you're getting
            stronger.
          </p>

        </div>


        {topics.length === 0 ? (

          <div
            className="
              py-10
              text-center
            "
          >

            <div className="text-3xl mb-3">
              🚀
            </div>

            <p
              className="
                font-display
                text-sm
              "
            >
              No quiz progress yet
            </p>

            <p
              className="
                font-body
                text-xs
                text-ink/40
                dark:text-paper-dark/40
                mt-1
              "
            >
              Take your first quiz
              to start tracking!
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {topics.map(
              ([topic, data]) => {

                const attempts =
                  data.attempts || 0

                const topicCorrect =
                  data.correct || 0

                const topicAccuracy =
                  attempts > 0
                    ? Math.round(
                        (topicCorrect /
                          attempts) *
                          100
                      )
                    : 0

                return (

                  <div
                    key={topic}
                  >

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        mb-2
                      "
                    >

                      <div className="min-w-0">

                        <p
                          className="
                            font-body
                            text-sm
                            truncate
                          "
                        >
                          {topic}
                        </p>

                        <p
                          className="
                            text-[10px]
                            text-ink/40
                            dark:text-paper-dark/40
                          "
                        >
                          {topicCorrect}
                          {" "}
                          correct out of{" "}
                          {attempts}
                        </p>

                      </div>

                      <span
                        className="
                          font-display
                          text-xs
                          text-amber
                        "
                      >
                        {topicAccuracy}%
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
                        className="
                          h-full

                          rounded-full

                          bg-gradient-to-r
                          from-pink-400
                          to-amber-400

                          transition-all
                          duration-700
                        "
                        style={{
                          width:
                            `${topicAccuracy}%`
                        }}
                      />

                    </div>

                  </div>

                )
              }
            )}

          </div>

        )}

      </div>

    </div>
  )
}

export default ProgressPage