function ThemeToggle({ dark, setDark }) {
  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed top-5 right-5 w-11 h-11 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md hover:scale-110 transition-transform duration-200 text-xl"
      aria-label="Toggle dark mode"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  )
}
export default ThemeToggle