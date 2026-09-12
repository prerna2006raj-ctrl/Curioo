function QuizDifficulty({ onSelect, onClose }) {
  const difficulties = [
    {
      value: "easy",
      title: "Easy",
      description: "Basic questions to build confidence.",
      icon: "🌱",
    },
    {
      value: "medium",
      title: "Medium",
      description: "A balanced challenge to test understanding.",
      icon: "🧠",
    },
    {
      value: "hard",
      title: "Hard",
      description: "Tricky questions that require deeper thinking.",
      icon: "🔥",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-panel dark:bg-blueprint-panel p-6 shadow-2xl border border-amber/40">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="font-display text-lg text-ink dark:text-paper-dark">
              Choose Quiz Difficulty
            </h2>

            <p className="font-body text-sm text-ink/55 dark:text-paper-dark/55 mt-1">
              Pick a level before your quiz starts.
            </p>
          </div>

          <button
            onClick={onClose}
            className="font-display text-xs text-ink/50 dark:text-paper-dark/50 hover:text-amber"
          >
            close
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty.value}
              onClick={() => onSelect(difficulty.value)}
              className="flex items-center gap-4 rounded-lg border border-line/25 dark:border-line-dark/25 bg-paper/40 dark:bg-blueprint/40 px-4 py-3 text-left hover:border-amber hover:bg-amber/5 transition-all"
            >
              <span className="text-2xl">{difficulty.icon}</span>

              <span className="flex-1">
                <span className="block font-display text-sm text-ink dark:text-paper-dark">
                  {difficulty.title}
                </span>

                <span className="block font-body text-xs text-ink/55 dark:text-paper-dark/55 mt-1">
                  {difficulty.description}
                </span>
              </span>

              <span className="text-ink/30 dark:text-paper-dark/30">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuizDifficulty;
