import { useState } from "react"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"


function ProgressPage({
  progress,
  dailyGoal,
  todayTopics,
  streak,
  log,
  onGoalChange,
  onBack
}) {

  const [selectedTopic, setSelectedTopic] = useState(null)
  const [streakView, setStreakView] = useState(null)

  const total =
    progress?.total || 0


  const correct =
    progress?.correct || 0

  const timedOut =
    progress?.timedOut || 0

  const answered = progress.questionsAnswered || 0

  const accuracy =
    answered > 0
      ? Math.round((progress.correct / answered) * 100)
      : 0 
    const [chartType, setChartType] = useState("bar")

  // =====================================================
  // TOPIC ANALYTICS
  // =====================================================

  const topicEntries = Object.entries(
    progress?.byTopic || {}
  )

  const chartData = Object.entries(
        progress?.byTopic || {}
      ).map(([topic, data]) => ({
        topic:
          topic.length > 12
            ? topic.substring(0, 12) + "..."
            : topic,
        fullTopic: topic,
        attempts: data.attempts || 0,
        correct: data.correct || 0,
      }))
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
      Number(todayTopics) || 0
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
      <>

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
            {progress.questionsAnswered || 0}
          </p>

        </div>

        <div
          onClick={() => setStreakView("week")}
          className="rounded-2xl border border-line/20 dark:border-line-dark/20 bg-panel dark:bg-blueprint-panel p-4 cursor-pointer hover:border-amber transition"
        >

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

        <div
          onClick={() =>
            bestTopic &&
            setSelectedTopic({
              ...bestTopic,
              type: "best"
            })
          }
          className="rounded-3xl border border-green-300/40 bg-green-50 dark:bg-green-900/10 p-5 cursor-pointer hover:scale-[1.01] transition"
        >

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

        <div
          onClick={() =>
            weakestTopic &&
            setSelectedTopic({
              ...weakestTopic,
              type: "weak"
            })
          }
          className="rounded-3xl border border-red-300/40 bg-red-50 dark:bg-red-900/10 p-5 cursor-pointer hover:scale-[1.01] transition"
        >

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
            {/* =====================================================
    QUIZ PERFORMANCE CHART
===================================================== */}

<div
  className="
    rounded-2xl
    border border-line/20
    dark:border-line-dark/20
    bg-panel
    dark:bg-blueprint-panel
    p-6
    mb-8
  "
>

  {/* Chart Header */}

  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

    <div>
      <h3 className="font-display text-lg font-semibold">
        Quiz Performance
      </h3>

      <p className="text-xs opacity-50 mt-1">
        Compare your attempts and correct answers.
      </p>
    </div>


    {/* Chart Toggle Buttons */}

    <div
      className="
        flex
        rounded-xl
        border
        border-line/20
        dark:border-line-dark/20
        bg-black/5
        dark:bg-white/5
        p-1
      "
    >

      <button
        onClick={() => setChartType("bar")}
        className={`
          px-4
          py-2
          rounded-lg
          text-sm
          font-display
          transition-all
          duration-200
          ${
            chartType === "bar"
              ? "bg-ink text-white dark:bg-paper-dark dark:text-ink shadow-sm"
              : "opacity-60 hover:opacity-100"
          }
        `}
      >
        📊 Bar
      </button>


      <button
        onClick={() => setChartType("line")}
        className={`
          px-4
          py-2
          rounded-lg
          text-sm
          font-display
          transition-all
          duration-200
          ${
            chartType === "line"
              ? "bg-ink text-white dark:bg-paper-dark dark:text-ink shadow-sm"
              : "opacity-60 hover:opacity-100"
          }
        `}
      >
        📈 Line
      </button>

    </div>

  </div>


  {/* Chart */}

  {chartData.length === 0 ? (

    <div className="h-72 flex items-center justify-center">

      <div className="text-center">

        <div className="text-4xl mb-3">
          📊
        </div>

        <p className="font-display">
          No quiz data yet
        </p>

        <p className="text-sm opacity-50 mt-1">
          Complete a quiz to see your chart.
        </p>

      </div>

    </div>

  ) : (

    <div className="w-full h-80">

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        {chartType === "bar" ? (

          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.15}
            />

            <XAxis
              dataKey="topic"
              tick={{ fontSize: 11 }}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11 }}
            />

            <Tooltip
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.fullTopic || ""
              }
            />

            <Bar
              dataKey="attempts"
              name="Attempts"
              radius={[6, 6, 0, 0]}
            />

            <Bar
              dataKey="correct"
              name="Correct"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>

        ) : (

          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.15}
            />

            <XAxis
              dataKey="topic"
              tick={{ fontSize: 11 }}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11 }}
            />

            <Tooltip
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.fullTopic || ""
              }
            />

            <Line
              type="monotone"
              dataKey="attempts"
              name="Attempts"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="correct"
              name="Correct"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

          </LineChart>

        )}

      </ResponsiveContainer>

    </div>

  )}

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
                    onClick={() => setSelectedTopic(item)}
                    className="cursor-pointer rounded-2xl p-3 -mx-3 hover:bg-ink/5 dark:hover:bg-white/5 transition"
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
    {streakView && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

    <div className="w-full max-w-lg rounded-3xl bg-panel dark:bg-blueprint-panel border border-line/20 dark:border-line-dark/20 p-6 shadow-2xl">

      <div className="flex items-center justify-between mb-5">

        <div>
          <p className="text-xs uppercase tracking-wider font-display opacity-50">
            🔥 Learning Streak
          </p>

          <h3 className="font-display text-2xl font-semibold mt-1">
            {streak} day streak
          </h3>
        </div>

        <button
          onClick={() => setStreakView(null)}
          className="text-sm opacity-60 hover:opacity-100"
        >
          ✕
        </button>

      </div>

      {/* RANGE BUTTONS */}

      <div className="flex gap-2 mb-6">

          {["week", "month"].map(
            (range) => (

              <button
                key={range}
                onClick={() =>
                  setStreakView(range)
                }
                className={`px-4 py-2 rounded-xl border font-display text-sm capitalize transition ${
                  streakView === range
                    ? "bg-line text-white dark:bg-amber dark:text-blueprint"
                    : "border-line/20 dark:border-line-dark/20 hover:border-amber"
                }`}
              >
                {range}
              </button>

            )
          )}

        </div>

      <StreakCalendar
        log={log}
        range={streakView}
      />

      <button
        onClick={() => setStreakView(null)}
        className="w-full mt-6 px-4 py-2 rounded-xl bg-amber text-white"
      >
        Close
      </button>

    </div>

  </div>
)}
    {selectedTopic && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

    <div className="w-full max-w-md rounded-3xl bg-panel dark:bg-blueprint-panel border border-line/20 dark:border-line-dark/20 p-6 shadow-2xl">

      <div className="flex items-center justify-between mb-5">

        <div>
          <p className="text-xs uppercase tracking-wider font-display opacity-50">
            📊 Topic Performance
          </p>

          <h3 className="font-display text-xl font-semibold mt-1">
            {selectedTopic.topic}
          </h3>
        </div>

        <button
          onClick={() => setSelectedTopic(null)}
          className="text-sm opacity-60 hover:opacity-100"
        >
          ✕
        </button>

      </div>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Accuracy</span>
          <strong>{selectedTopic.accuracy}%</strong>
        </div>

        <div className="h-3 bg-ink/10 dark:bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber rounded-full"
            style={{
              width: `${selectedTopic.accuracy}%`
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5">

          <div className="rounded-2xl border border-line/10 p-4">
            <p className="text-xs opacity-50">
              Attempts
            </p>
            <p className="text-xl font-display font-semibold mt-1">
              {selectedTopic.attempts}
            </p>
          </div>

          <div className="rounded-2xl border border-line/10 p-4">
            <p className="text-xs opacity-50">
              Correct
            </p>
            <p className="text-xl font-display font-semibold mt-1">
              {selectedTopic.correct}
            </p>
          </div>

        </div>

      </div>

      <button
        onClick={() => setSelectedTopic(null)}
        className="w-full mt-6 px-4 py-2 rounded-xl bg-amber text-white"
      >
        Close
      </button>

    </div>

  </div>
)}
    </>
  )
}
export default ProgressPage
function StreakCalendar({ log, range }) {

  const getKey = (date) => {
    const d = new Date(date)

    return `${d.getFullYear()}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`
  }


  const learningDays = new Set(
    (log || []).map(
      (item) => getKey(item.timestamp)
    )
  )


  const today = new Date()


  // =====================================================
  // WEEK VIEW
  // =====================================================

  if (range === "week") {

    const start = new Date(today)

    start.setDate(
      today.getDate() -
      today.getDay() +
      1
    )

    const days = []

    for (let i = 0; i < 7; i++) {

      const date = new Date(start)

      date.setDate(
        start.getDate() + i
      )

      days.push(date)
    }


    return (
      <div>

        {/* WEEK RANGE */}
        <div className="text-center font-semibold text-lg mb-5">

          {days[0].toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric"
            }
          )}

          {" – "}

          {days[6].toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric"
            }
          )}

        </div>


        {/* WEEK DAYS */}
        <div className="grid grid-cols-7 gap-2">

          {days.map((date) => {

            const active =
              learningDays.has(
                getKey(date)
              )


            return (
              <div
                key={date.toISOString()}
                className="flex flex-col items-center gap-2"
              >

                {/* DAY NAME */}
                <span className="text-xs font-medium opacity-60">

                  {date.toLocaleDateString(
                    "en-US",
                    {
                      weekday: "short"
                    }
                  )}

                </span>


                {/* DATE */}
                <span className="text-sm">

                  {date.getDate()}

                </span>


                {/* STATUS */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                    active
                      ? "bg-green-500"
                      : "bg-ink/5 dark:bg-white/10"
                  }`}
                >

                  {active && "✓"}

                </div>

              </div>
            )
          })}

        </div>


        {/* LEGEND */}
        <div className="flex items-center gap-5 mt-6 text-xs opacity-60">

          <span>
            ⚪ No learning
          </span>

          <span>
            🟢 Learning day
          </span>

        </div>

      </div>
    )
  }


  // =====================================================
  // MONTH VIEW
  // =====================================================

  const year =
    today.getFullYear()

  const month =
    today.getMonth()

  const monthName =
    today.toLocaleDateString(
      "en-US",
      {
        month: "long",
        year: "numeric"
      }
    )


  const firstDay =
    new Date(
      year,
      month,
      1
    ).getDay()


  const lastDay =
    new Date(
      year,
      month + 1,
      0
    ).getDate()


  const days = []


  // Empty spaces before first day
  for (
    let i = 1;
    i < firstDay;
    i++
  ) {
    days.push(null)
  }


  // Actual dates
  for (
    let day = 1;
    day <= lastDay;
    day++
  ) {
    days.push(
      new Date(
        year,
        month,
        day
      )
    )
  }


  return (
    <div>

      {/* MONTH NAME */}
      <div className="text-center font-semibold text-lg mb-5">

        {monthName}

      </div>


      {/* WEEK DAYS */}
      <div className="grid grid-cols-7 gap-2 mb-2">

        {[
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat"
        ].map((day) => (

          <div
            key={day}
            className="text-center text-xs font-medium opacity-60"
          >
            {day}
          </div>

        ))}

      </div>


      {/* DATES */}
      <div className="grid grid-cols-7 gap-2">

        {days.map((date, index) => {

          if (!date) {
            return (
              <div
                key={`empty-${index}`}
                className="aspect-square"
              />
            )
          }


          const active =
            learningDays.has(
              getKey(date)
            )


          return (
            <div
              key={date.toISOString()}
              className={`aspect-square rounded-full flex items-center justify-center text-sm ${
                active
                  ? "bg-green-500 text-white"
                  : "bg-ink/5 dark:bg-white/10"
              }`}
            >

              {date.getDate()}

            </div>
          )
        })}

      </div>


      {/* LEGEND */}
      <div className="flex items-center gap-5 mt-6 text-xs opacity-60">

        <span>
          ⚪ No learning
        </span>

        <span>
          🟢 Learning day
        </span>

      </div>

    </div>
  )
}