import { useState, useEffect } from "react"
import SearchBar from "./components/SearchBar"
import ResultCard from "./components/ResultCard"
import Loader from "./components/Loader"
import ToneToggle from "./components/ToneToggle"
import History from "./components/History"
import SurpriseButton from "./components/SurpriseButton"
import CategoryBrowser from "./components/CategoryBrowser"
import ThemeToggle from "./components/ThemeToggle"
import FavoritesPage from "./components/FavoritesPage"
import { getExplanation, getQuiz } from "./services/gemini"
import QuizCard from "./components/QuizCard"

function App() {
  const [topic, setTopic] = useState("")
  const [tone, setTone] = useState("kid")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [history, setHistory] = useState([])
  const [view, setView] = useState("home")
  const [relatedTopics, setRelatedTopics] = useState([])
  const [quiz, setQuiz] = useState(null)
  const [quizLoading, setQuizLoading] = useState(false)
  const [log, setLog] = useState(() => {
    const saved = localStorage.getItem("curioo-log")
    return saved ? JSON.parse(saved) : []
  })
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

  useEffect(() => {
    localStorage.setItem("curioo-log", JSON.stringify(log))
  }, [log])

  const handleExplain = async (customTopic) => {
    const searchTopic = customTopic || topic
    setLoading(true)
    setError("")
    setResult("")
    setRelatedTopics([])
    setQuiz(null)
    try {
      const { text, related } = await getExplanation(searchTopic, tone)
      setResult(text)
      setRelatedTopics(related)
      setHistory((prev) => [{ topic: searchTopic, text, id: Date.now() }, ...prev])
      setLog((prev) => [...prev, { topic: searchTopic, timestamp: Date.now() }])
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

  const handleQuiz = async () => {
    setQuizLoading(true)
    try {
      const q = await getQuiz(topic)
      setQuiz(q)
    } catch (err) {
      alert("Couldn't load a quiz right now, try again.")
    } finally {
      setQuizLoading(false)
    }
  }

  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
  const thisWeekCount = log.filter((entry) => entry.timestamp > oneWeekAgo).length

  return (
    <div className="grid-paper min-h-screen bg-paper dark:bg-blueprint text-ink dark:text-paper-dark px-4 py-10 transition-colors duration-300">
      <ThemeToggle dark={dark} setDark={setDark} />

      <button
        onClick={() => setView("favorites")}
        className="fixed top-5 left-5 flex items-center gap-1 px-3 py-2 rounded-full border border-line/30 dark:border-line-dark/30 bg-panel dark:bg-blueprint-panel hover:scale-105 transition-transform duration-200 font-display text-sm"
      >
        ⭐ {favorites.length}
      </button>

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
        <p className="font-display text-xs text-ink/40 dark:text-paper-dark/40 mt-2">
          📊 {log.length} explored · {thisWeekCount} this week
        </p>
      </header>

      {view === "favorites" ? (
        <FavoritesPage
          favorites={favorites}
          onBack={() => setView("home")}
          onRemove={toggleFavorite}
          onSelect={(item) => {
            setTopic(item.topic)
            setResult(item.text)
            setView("home")
          }}
        />
      ) : (
        <>
          <div className="max-w-xl mx-auto bg-panel dark:bg-blueprint-panel border border-line/20 dark:border-line-dark/20 rounded-md p-5">
            <div className="flex justify-end mb-3">
              <SurpriseButton onPick={(picked) => { setTopic(picked); handleExplain(picked) }} />
            </div>
            <SearchBar topic={topic} setTopic={setTopic} onExplain={() => handleExplain()} loading={loading} />
            <ToneToggle tone={tone} setTone={setTone} />
          </div>

          <CategoryBrowser onPick={(picked) => { setTopic(picked); handleExplain(picked) }} />

          {loading && <Loader />}
          {error && <p className="font-body text-red-500 text-center mt-4">{error}</p>}
          {result && (
            <ResultCard
              text={result}
              onFavorite={() => toggleFavorite({ topic, text: result })}
              isFavorite={favorites.some((f) => f.topic === topic)}
              onRegenerate={() => handleExplain(topic)}
              regenerating={loading}
              relatedTopics={relatedTopics}
              onRelatedClick={(picked) => { setTopic(picked); handleExplain(picked) }}
              onQuiz={handleQuiz}
              quizLoading={quizLoading}
            />
          )}

          {quiz && <QuizCard quiz={quiz} onClose={() => setQuiz(null)} />}

          <History
            items={history}
            onSelect={(item) => {
              setTopic(item.topic)
              setResult(item.text)
            }}
          />
        </>
      )}
    </div>
  )
}

export default App
