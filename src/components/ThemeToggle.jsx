function ThemeToggle({ dark, setDark }) {
  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full border border-line/30 dark:border-line-dark/30 bg-panel dark:bg-blueprint-panel hover:scale-110 transition-transform duration-200 text-lg"
      aria-label="Toggle blueprint mode"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  )
}
export default ThemeToggle
