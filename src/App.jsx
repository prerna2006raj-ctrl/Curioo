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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 px-4 py-10 transition-colors duration-300">
      <ThemeToggle dark={dark} setDark={setDark} />

      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">🔍 Curioo</h1>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Understand how anything really works</p>

      <div className="flex items-center justify-center gap-3 mt-3">
        <SurpriseButton onPick={(picked) => { setTopic(picked); handleExplain(picked) }} />
      </div>

      <SearchBar topic={topic} setTopic={setTopic} onExplain={() => handleExplain()} loading={loading} />
      <ToneToggle tone={tone} setTone={setTone} />

      {loading && <Loader />}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
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
