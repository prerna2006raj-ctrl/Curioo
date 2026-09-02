function ToneToggle({ tone, setTone }) {
  return (
    <div className="font-display text-sm mt-4 inline-flex w-full rounded-sm border border-line/30 dark:border-line-dark/30 overflow-hidden">
      <button
        onClick={() => setTone("kid")}
        className={`flex-1 py-1.5 transition-colors duration-200 ${
          tone === "kid"
            ? "bg-line dark:bg-amber text-paper dark:text-blueprint"
            : "bg-transparent text-ink/70 dark:text-paper-dark/70 hover:bg-line/5 dark:hover:bg-line-dark/10"
        }`}
      >
        like I'm 5
      </button>
      <button
        onClick={() => setTone("engineer")}
        className={`flex-1 py-1.5 border-l border-line/30 dark:border-line-dark/30 transition-colors duration-200 ${
          tone === "engineer"
            ? "bg-line dark:bg-amber text-paper dark:text-blueprint"
            : "bg-transparent text-ink/70 dark:text-paper-dark/70 hover:bg-line/5 dark:hover:bg-line-dark/10"
        }`}
      >
        like an engineer
      </button>
    </div>
  )
}
export default ToneToggle
