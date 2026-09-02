import { useState, useEffect } from "react"
import SearchBar from "./components/SearchBar"
import ResultCard from "./components/ResultCard"
import Loader from "./components/Loader"
import ToneToggle from "./components/ToneToggle"
import History from "./components/History"
import SurpriseButton from "./components/SurpriseButton"
import ThemeToggle from "./components/ThemeToggle"
import { getExplanation } from "./services/gemini"

function App() {
  const [topic, setTopic] = useState("")
  const [tone, setTone] = useState("kid")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [history, setHistory] = useState([])
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("curioo-favorites")
    return saved ? JSON.parse(saved) : []
  })
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("curioo-theme") === "dark"
  })

  useEffect(() => {
    localStorage.setItem("curioo-favorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("curioo-theme", dark ? "dark" : "light")
  }, [dark])

  const handleExplain = async (customTopic) => {
    const searchTopic = customTopic || topic
    setLoading(true)
    setError("")
    setResult("")
    try {
      const text = await getExplanation(searchTopic, tone)
      setResult(text)
      setHistory((prev) => [{ topic: searchTopic, text, id: Date.now() }, ...prev])
    } catch (err) {
      setError("Couldn't get an explanation. Check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.topic === item.topic)
      if (exists) return prev.filter((f) => f.topic !== item.topic)
      return [item, ...prev]
    })
  }

  return (
    <div className="grid-paper min-h-screen bg-paper dark:bg-blueprint text-ink dark:text-paper-dark px-4 py-10 transition-colors duration-300">
      <ThemeToggle dark={dark} setDark={setDark} />

      <header className="flex flex-col items-center mb-10">
        <div className="flex items-center gap-2 mb-1">
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none" className="text-line dark:text-line-dark">
            <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.5" />
            <line x1="14" y1="1" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" />
            <line x1="14" y1="21" x2="14" y2="27" stroke="currentColor" strokeWidth="1.5" />
            <line x1="1" y1="14" x2="7" y2="14" stroke="currentColor" strokeWidth="1.5" />
            <line x1="21" y1="14" x2="27" y2="14" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="14" cy="14" r="2.5" fill="currentColor" />
          </svg>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Curioo</h1>
        </div>
        <p className="font-body italic text-ink/60 dark:text-paper-dark/60">
          understand how anything really works
        </p>
      </header>

      <div className="max-w-xl mx-auto bg-panel dark:bg-blueprint-panel border border-line/20 dark:border-line-dark/20 rounded-md p-5">
        <div className="flex justify-end mb-3">
          <SurpriseButton onPick={(picked) => { setTopic(picked); handleExplain(picked) }} />
        </div>
        <SearchBar topic={topic} setTopic={setTopic} onExplain={() => handleExplain()} loading={loading} />
        <ToneToggle tone={tone} setTone={setTone} />
      </div>

      {loading && <Loader />}
      {error && <p className="font-body text-red-500 text-center mt-4">{error}</p>}
      {result && (
        <ResultCard
          text={result}
          onFavorite={() => toggleFavorite({ topic, text: result })}
          isFavorite={favorites.some((f) => f.topic === topic)}
        />
      )}

      <History
        items={history}
        onSelect={(item) => {
          setTopic(item.topic)
          setResult(item.text)
        }}
      />
    </div>
  )
}

export default App
