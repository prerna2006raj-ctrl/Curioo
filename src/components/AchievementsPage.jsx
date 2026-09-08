import React from "react"

function AchievementsPage({
  progress,
  log,
  streak,
  longestStreak,
  onBack
}) {
  const totalDiscoveries = log.length

  const totalQuizzes = progress?.total || 0
  const correctAnswers = progress?.correct || 0

  const accuracy =
    totalQuizzes > 0
      ? Math.round((correctAnswers / totalQuizzes) * 100)
      : 0

  const perfectQuiz =
    totalQuizzes > 0 && correctAnswers === totalQuizzes

  const achievements = [
    {
      id: "first-discovery",
      icon: "🌱",
      title: "First Discovery",
      description: "Explore your first topic",
      requirement: "1 discovery",
      unlocked: totalDiscoveries >= 1,
      progress: Math.min(totalDiscoveries, 1),
      target: 1
    },

    {
      id: "three-day-streak",
      icon: "🔥",
      title: "Getting Started",
      description: "Maintain a 3-day learning streak",
      requirement: "3 days",
      unlocked: longestStreak >= 3,
      progress: Math.min(longestStreak, 3),
      target: 3
    },

    {
      id: "seven-day-streak",
      icon: "🔥",
      title: "Week Warrior",
      description: "Learn for 7 days in a row",
      requirement: "7 days",
      unlocked: longestStreak >= 7,
      progress: Math.min(longestStreak, 7),
      target: 7
    },

    {
      id: "ten-discoveries",
      icon: "📚",
      title: "Curious Mind",
      description: "Explore 10 different discoveries",
      requirement: "10 discoveries",
      unlocked: totalDiscoveries >= 10,
      progress: Math.min(totalDiscoveries, 10),
      target: 10
    },

    {
      id: "five-quizzes",
      icon: "🧠",
      title: "Quiz Explorer",
      description: "Complete 5 quizzes",
      requirement: "5 quizzes",
      unlocked: totalQuizzes >= 5,
      progress: Math.min(totalQuizzes, 5),
      target: 5
    },

    {
      id: "accuracy",
      icon: "🎯",
      title: "Sharp Thinker",
      description: "Reach at least 80% quiz accuracy",
      requirement: "80% accuracy",
      unlocked: accuracy >= 80,
      progress: Math.min(accuracy, 80),
      target: 80,
      percentage: true
    },

    {
      id: "perfect",
      icon: "💯",
      title: "Perfect Score",
      description: "Get every completed quiz question correct",
      requirement: "100% accuracy",
      unlocked: perfectQuiz,
      progress: Math.min(accuracy, 100),
      target: 100,
      percentage: true
    },

    {
      id: "twenty-five",
      icon: "🚀",
      title: "Knowledge Seeker",
      description: "Explore 25 topics",
      requirement: "25 discoveries",
      unlocked: totalDiscoveries >= 25,
      progress: Math.min(totalDiscoveries, 25),
      target: 25
    }
  ]

  const unlockedCount = achievements.filter(
    (achievement) => achievement.unlocked
  ).length

  return (
    <main className="max-w-5xl mx-auto px-4 pb-16">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <p className="text-sm opacity-50 mb-1">
            your learning journey
          </p>

          <h2 className="text-3xl font-semibold">
            🏆 Achievements
          </h2>

          <p className="text-sm opacity-60 mt-2">
            {unlockedCount} of {achievements.length} badges unlocked
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


      {/* Achievement summary */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-4
          mb-8
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
            Badges
          </p>

          <p className="text-3xl font-semibold mt-2">
            {unlockedCount}
          </p>

          <p className="text-xs opacity-50 mt-1">
            unlocked
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
            Current streak
          </p>

          <p className="text-3xl font-semibold mt-2">
            🔥 {streak}
          </p>

          <p className="text-xs opacity-50 mt-1">
            {streak === 1 ? "day" : "days"}
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
            Best streak
          </p>

          <p className="text-3xl font-semibold mt-2">
            🔥 {longestStreak}
          </p>

          <p className="text-xs opacity-50 mt-1">
            personal best
          </p>
        </div>

      </div>


      {/* Achievement grid */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-5
        "
      >

        {achievements.map((achievement) => {

          const percentage =
            achievement.target > 0
              ? Math.min(
                  100,
                  Math.round(
                    (achievement.progress /
                      achievement.target) *
                      100
                  )
                )
              : 0

          return (
            <div
              key={achievement.id}
              className={`
                relative
                rounded-3xl
                border
                p-6
                transition-all
                duration-300
                ${
                  achievement.unlocked
                    ? `
                      border-line/30
                      dark:border-line-dark/30
                      bg-panel
                      dark:bg-blueprint-panel
                      shadow-md
                    `
                    : `
                      border-line/10
                      dark:border-line-dark/10
                      bg-panel/50
                      dark:bg-blueprint-panel/50
                      opacity-65
                    `
                }
              `}
            >

              {/* Status */}
              <div className="absolute top-4 right-4 text-xs">
                {achievement.unlocked ? (
                  <span
                    className="
                      px-2
                      py-1
                      rounded-full
                      bg-green-500/10
                      text-green-600
                      dark:text-green-400
                    "
                  >
                    ✓ unlocked
                  </span>
                ) : (
                  <span className="opacity-40">
                    🔒
                  </span>
                )}
              </div>


              {/* Icon */}
              <div
                className={`
                  w-16
                  h-16
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  text-3xl
                  mb-5
                  ${
                    achievement.unlocked
                      ? "bg-amber/10"
                      : "bg-black/5 dark:bg-white/5"
                  }
                `}
              >
                {achievement.icon}
              </div>


              <h3 className="text-lg font-semibold">
                {achievement.title}
              </h3>

              <p className="text-sm opacity-60 mt-1 min-h-[40px]">
                {achievement.description}
              </p>


              {/* Progress */}
              {!achievement.unlocked && (
                <div className="mt-5">

                  <div className="flex justify-between text-xs opacity-50 mb-2">
                    <span>
                      {achievement.progress}
                      {achievement.percentage ? "%" : ""}
                    </span>

                    <span>
                      {achievement.target}
                      {achievement.percentage ? "%" : ""}
                    </span>
                  </div>

                  <div
                    className="
                      h-2
                      rounded-full
                      bg-black/5
                      dark:bg-white/10
                      overflow-hidden
                    "
                  >
                    <div
                      className="
                        h-full
                        rounded-full
                        bg-amber
                        transition-all
                        duration-500
                      "
                      style={{
                        width: `${percentage}%`
                      }}
                    />
                  </div>

                </div>
              )}


              {achievement.unlocked && (
                <p className="text-xs mt-5 opacity-50">
                  ✨ {achievement.requirement} achieved
                </p>
              )}

            </div>
          )
        })}

      </div>

    </main>
  )
}

export default AchievementsPage