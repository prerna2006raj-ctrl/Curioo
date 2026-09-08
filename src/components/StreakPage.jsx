import React from "react"

function StreakPage({
  streak,
  longestStreak,
  learningDays,
  log,
  onBack
}) {

  const getDateKey = (timestamp) => {
    const date = new Date(timestamp)

    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`
  }


  const todayKey = getDateKey(Date.now())

  const learningDaySet = new Set(
    log.map((item) => getDateKey(item.timestamp))
  )


  const todayActive =
    learningDaySet.has(todayKey)


  const lastSevenDays = []

  for (let i = 6; i >= 0; i--) {

    const date = new Date()

    date.setHours(0, 0, 0, 0)

    date.setDate(
      date.getDate() - i
    )

    const key = getDateKey(
      date.getTime()
    )

    lastSevenDays.push({
      key,
      date,
      active: learningDaySet.has(key)
    })
  }


  return (
    <main className="max-w-4xl mx-auto px-4 pb-16">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <p className="text-sm opacity-50 mb-1">
            consistency matters
          </p>

          <h2 className="text-3xl font-semibold">
            🔥 Learning Streak
          </h2>

          <p className="text-sm opacity-60 mt-2">
            Keep exploring something new every day.
          </p>
        </div>

        <button
          onClick={onBack}
          className="
            px-4
            py-2
            rounded-xl
            border
            border-line/30
            dark:border-line-dark/30
            hover:scale-105
            transition
          "
        >
          ← Back
        </button>

      </div>


      {/* Main streak */}
      <div
        className="
          rounded-3xl
          border
          border-line/20
          dark:border-line-dark/20
          bg-panel
          dark:bg-blueprint-panel
          p-8
          text-center
          shadow-sm
        "
      >

        <div className="text-6xl mb-4">
          🔥
        </div>

        <p className="text-sm opacity-50">
          current streak
        </p>

        <div className="text-6xl font-semibold mt-2">
          {streak}
        </div>

        <p className="opacity-60 mt-2">
          {streak === 1 ? "day" : "days"} in a row
        </p>


        <div
          className="
            mt-6
            inline-flex
            px-4
            py-2
            rounded-full
            text-sm
          "
          style={{
            background: todayActive
              ? "rgba(76, 175, 80, 0.10)"
              : "rgba(0, 0, 0, 0.04)"
          }}
        >
          {todayActive
            ? "✓ You've learned today"
            : "○ Explore something today"}
        </div>

      </div>


      {/* Stats */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-4
          mt-5
        "
      >

        <div
          className="
            rounded-2xl
            border
            border-line/20
            dark:border-line-dark/20
            bg-panel
            dark:bg-blueprint-panel
            p-5
          "
        >
          <p className="text-sm opacity-50">
            Current streak
          </p>

          <p className="text-3xl font-semibold mt-2">
            🔥 {streak}
          </p>
        </div>


        <div
          className="
            rounded-2xl
            border
            border-line/20
            dark:border-line-dark/20
            bg-panel
            dark:bg-blueprint-panel
            p-5
          "
        >
          <p className="text-sm opacity-50">
            Longest streak
          </p>

          <p className="text-3xl font-semibold mt-2">
            🏆 {longestStreak}
          </p>
        </div>


        <div
          className="
            rounded-2xl
            border
            border-line/20
            dark:border-line-dark/20
            bg-panel
            dark:bg-blueprint-panel
            p-5
          "
        >
          <p className="text-sm opacity-50">
            Learning days
          </p>

          <p className="text-3xl font-semibold mt-2">
            📚 {learningDays}
          </p>
        </div>

      </div>


      {/* Weekly activity */}
      <div
        className="
          mt-5
          rounded-3xl
          border
          border-line/20
          dark:border-line-dark/20
          bg-panel
          dark:bg-blueprint-panel
          p-6
        "
      >

        <h3 className="font-semibold text-lg">
          This week
        </h3>

        <p className="text-sm opacity-50 mt-1">
          Your learning activity over the last 7 days.
        </p>


        <div
          className="
            grid
            grid-cols-7
            gap-2
            mt-7
          "
        >

          {lastSevenDays.map((day) => {

            const weekday = day.date.toLocaleDateString(
              undefined,
              { weekday: "short" }
            )

            return (
              <div
                key={day.key}
                className="text-center"
              >

                <p className="text-xs opacity-50 mb-2">
                  {weekday}
                </p>

                <div
                  className={`
                    aspect-square
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-lg
                    border
                    transition-all
                    ${
                      day.active
                        ? `
                          bg-green-500/10
                          border-green-500/30
                        `
                        : `
                          bg-black/5
                          dark:bg-white/5
                          border-transparent
                        `
                    }
                  `}
                >
                  {day.active ? "✓" : "·"}
                </div>

                <p className="text-xs opacity-40 mt-2">
                  {day.date.getDate()}
                </p>

              </div>
            )
          })}

        </div>

      </div>


      {/* Motivation */}
      <div
        className="
          mt-5
          rounded-2xl
          border
          border-amber/20
          bg-amber/5
          p-5
          text-center
        "
      >

        {todayActive ? (
          <>
            <p className="text-lg">
              ✨ Nice work!
            </p>

            <p className="text-sm opacity-60 mt-1">
              You've already kept your streak alive today.
            </p>
          </>
        ) : (
          <>
            <p className="text-lg">
              🌱 Your streak is waiting.
            </p>

            <p className="text-sm opacity-60 mt-1">
              Explore one topic today to keep learning.
            </p>
          </>
        )}

      </div>

    </main>
  )
}

export default StreakPage