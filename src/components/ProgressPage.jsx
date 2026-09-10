function ProgressPage({
  progress,
  dailyGoal,
  todayTopics,
  streak,
  onGoalChange,
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


  // =====================================================
  // TOPIC ANALYTICS
  // =====================================================

  const topicEntries = Object.entries(
    progress?.byTopic || {}
  )


  const topicStats =
    topicEntries.map(
      ([topic, data]) => {

        const attempts =
          data?.attempts || 0

        const topicCorrect =
          data?.correct || 0

        const topicAccuracy =
          attempts > 0
            ? Math.round(
                (topicCorrect /
                  attempts) *
                  100
              )
            : 0

        return {
          topic,
          attempts,
          correct: topicCorrect,
          accuracy: topicAccuracy
        }
      }
    )


  const sortedTopics =
    [...topicStats].sort(
      (a, b) =>
        b.accuracy -
        a.accuracy
    )


  const bestTopic =
    sortedTopics.length > 0
      ? sortedTopics[0]
      : null


  const weakestTopic =
    sortedTopics.length > 0
      ? sortedTopics[
          sortedTopics.length - 1
        ]
      : null


  // Because each generated quiz currently
  // contains one question, average score
  // is the same as overall accuracy.
  const averageScore =
    accuracy


  // =====================================================
  // DAILY GOAL
  // =====================================================

  const safeGoal =
    Number(dailyGoal) || 3

  const goalProgress =
    Math.min(
      safeGoal,
      todayTopics
    )

  const goalPercent =
    Math.min(
      100,
      Math.round(
        (goalProgress /
          safeGoal) *
          100
      )
    )


  // =====================================================
  // BAR
  // =====================================================

  const progressBar =
    `${Math.min(
      100,
      accuracy
    )}%`


  return (

    <section className="max-w-4xl mx-auto">

      {/* =================================================
          HEADER
          ================================================= */}

      <div className="flex items-center justify-between gap-4 mb-6">

        <div>

          <p className="text-xs uppercase tracking-wider font-display text-ink/40 dark:text-paper-dark/40">
            Learning dashboard
          </p>

          <h2 className="font-display text-2xl font-semibold mt-1">
            Your Progress
          </h2>

          <p className="font-body text-sm mt-1 text-ink/60 dark:text-paper-dark/60">
            See how your learning is going.
          </p>

        </div>


        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl border border-line/20 dark:border-line-dark/20 font-display text-sm hover:border-amber transition"
        >
          ← Home
        </button>

      </div>


      {/* =================================================
          DAILY GOAL
          ================================================= */}

      <div className="rounded-3xl border border-line/20 dark:border-line-dark/20 bg-panel dark:bg-blueprint-panel p-6 mb-5">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>

            <p className="text-xs uppercase tracking-wider font-display text-ink/40 dark:text-paper-dark/40">
              🎯 Today's Goal
            </p>

            <h3 className="font-display text-xl font-semibold mt-1">
              {goalProgress} / {safeGoal} topics today
            </h3>

            <p className="font-body text-sm mt-1 text-ink/60 dark:text-paper-dark/60">
              Choose how many unique topics you want to explore each day.
            </p>

          </div>


          {/* GOAL SELECTOR */}

          <div className="flex gap-2">

            {[1, 3, 5].map(
              (goal) => (

                <button
                  key={goal}
                  onClick={() =>
                    onGoalChange(goal)
                  }
                  className={`px-4 py-2 rounded-xl border font-display text-sm transition ${
                    safeGoal === goal
                      ? "bg-line text-paper dark:bg-amber dark:text-blueprint border-transparent"
                      : "border-line/20 dark:border-line-dark/20 hover:border-amber"
                  }`}
                >
                  {goal}
                </button>

              )
            )}

          </div>

        </div>


        {/* GOAL BAR */}

        <div className="mt-5">

          <div className="flex justify-between text-xs font-display mb-2">

            <span>
              Daily progress
            </span>

            <span>
              {goalPercent}%
            </span>

          </div>


          <div className="h-3 rounded-full bg-ink/10 dark:bg-white/10 overflow-hidden">

            <div
              className="h-full rounded-full bg-amber transition-all duration-500"
              style={{
                width: `${goalPercent}%`
              }}
            />

          </div>

        </div>

      </div>


      {/* =================================================
          STAT CARDS
          ================================================= */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">

        <div className="rounded-2xl border border-line/20 dark:border-line-dark/20 bg-panel dark:bg-blueprint-panel p-4">

          <p className="text-xs opacity-50 font-display">
            Quizzes completed
          </p>

          <p className="text-2xl font-display font-semibold mt-2">
            {total}
          </p>

        </div>


        <div className="rounded-2xl border border-line/20 dark:border-line-dark/20 bg-panel dark:bg-blueprint-panel p-4">

          <p className="text-xs opacity-50 font-display">
            Questions answered
          </p>

          <p className="text-2xl font-display font-semibold mt-2">
            {total}
          </p>

        </div>


        <div className="rounded-2xl border border-line/20 dark:border-line-dark/20 bg-panel dark:bg-blueprint-panel p-4">

          <p className="text-xs opacity-50 font-display">
            Average score
          </p>

          <p className="text-2xl font-display font-semibold mt-2">
            {averageScore}%
          </p>

        </div>


        <div className="rounded-2xl border border-line/20 dark:border-line-dark/20 bg-panel dark:bg-blueprint-panel p-4">

          <p className="text-xs opacity-50 font-display">
            Learning streak
          </p>

          <p className="text-2xl font-display font-semibold mt-2">
            🔥 {streak}
          </p>

        </div>

      </div>


      {/* =================================================
          BEST / WEAKEST
          ================================================= */}

      <div className="grid md:grid-cols-2 gap-4 mb-5">

        {/* BEST */}

        <div className="rounded-3xl border border-green-300/40 bg-green-50 dark:bg-green-900/10 p-5">

          <p className="text-xs uppercase tracking-wider font-display text-green-700 dark:text-green-300">
            🏆 Best Topic
          </p>


          {bestTopic ? (

            <>

              <h3 className="font-display text-xl font-semibold mt-2">
                {bestTopic.topic}
              </h3>

              <p className="font-body text-sm mt-1 opacity-70">
                {bestTopic.accuracy}% accuracy ·{" "}
                {bestTopic.attempts} attempt
                {bestTopic.attempts !== 1
                  ? "s"
                  : ""}
              </p>

            </>

          ) : (

            <p className="font-body text-sm mt-3 opacity-60">
              Complete a quiz to discover your best topic.
            </p>

          )}

        </div>


        {/* WEAKEST */}

        <div className="rounded-3xl border border-red-300/40 bg-red-50 dark:bg-red-900/10 p-5">

          <p className="text-xs uppercase tracking-wider font-display text-red-700 dark:text-red-300">
            📚 Needs Practice
          </p>


          {weakestTopic ? (

            <>

              <h3 className="font-display text-xl font-semibold mt-2">
                {weakestTopic.topic}
              </h3>

              <p className="font-body text-sm mt-1 opacity-70">
                {weakestTopic.accuracy}% accuracy ·{" "}
                {weakestTopic.attempts} attempt
                {weakestTopic.attempts !== 1
                  ? "s"
                  : ""}
              </p>

            </>

          ) : (

            <p className="font-body text-sm mt-3 opacity-60">
              Complete quizzes to find topics that need practice.
            </p>

          )}

        </div>

      </div>


      {/* =================================================
          OVERALL ACCURACY
          ================================================= */}

      <div className="rounded-3xl border border-line/20 dark:border-line-dark/20 bg-panel dark:bg-blueprint-panel p-6 mb-5">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-xs uppercase tracking-wider font-display opacity-50">
              Overall Accuracy
            </p>

            <p className="font-display text-3xl font-semibold mt-1">
              {accuracy}%
            </p>

          </div>


          <div className="text-right">

            <p className="font-display text-sm">
              {correct} correct
            </p>

            <p className="font-body text-xs opacity-50 mt-1">
              {timedOut} timed out
            </p>

          </div>

        </div>


        <div className="h-3 bg-ink/10 dark:bg-white/10 rounded-full overflow-hidden mt-5">

          <div
            className="h-full bg-amber rounded-full transition-all duration-500"
            style={{
              width: progressBar
            }}
          />

        </div>

      </div>


      {/* =================================================
          ACCURACY BY TOPIC
          ================================================= */}

      <div className="rounded-3xl border border-line/20 dark:border-line-dark/20 bg-panel dark:bg-blueprint-panel p-6">

        <div className="mb-5">

          <p className="text-xs uppercase tracking-wider font-display opacity-50">
            Topic Performance
          </p>

          <h3 className="font-display text-xl font-semibold mt-1">
            Accuracy by topic
          </h3>

        </div>


        {topicStats.length === 0 ? (

          <div className="text-center py-8">

            <div className="text-3xl">
              🧠
            </div>

            <p className="font-body text-sm mt-3 opacity-60">
              Complete your first quiz to see topic analytics.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {topicStats
              .sort(
                (a, b) =>
                  b.attempts -
                  a.attempts
              )
              .map(
                (item) => (

                  <div
                    key={item.topic}
                  >

                    <div className="flex justify-between gap-3 mb-2">

                      <span className="font-display text-sm font-medium truncate">
                        {item.topic}
                      </span>

                      <span className="font-display text-sm shrink-0">
                        {item.accuracy}%
                      </span>

                    </div>


                    <div className="h-2 bg-ink/10 dark:bg-white/10 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-amber rounded-full transition-all duration-500"
                        style={{
                          width: `${item.accuracy}%`
                        }}
                      />

                    </div>


                    <p className="font-body text-xs opacity-50 mt-1">

                      {item.correct} correct out of{" "}
                      {item.attempts}

                    </p>

                  </div>

                )
              )}

          </div>

        )}

      </div>

    </section>
  )
}


export default ProgressPage