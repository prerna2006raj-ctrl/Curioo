import { useState, useEffect } from "react"
import SearchBar from "./components/SearchBar"
import ResultCard from "./components/ResultCard"
import Loader from "./components/Loader"
import ToneToggle from "./components/ToneToggle"
import SurpriseButton from "./components/SurpriseButton"
import CategoryBrowser from "./components/CategoryBrowser"
import ThemeToggle from "./components/ThemeToggle"
import FavoritesPage from "./components/FavoritesPage"
import AuthPage from "./components/AuthPage"
import TopicOfDay from "./components/TopicOfDay"
import { getExplanation, getQuiz } from "./services/gemini"
import QuizCard from "./components/QuizCard"
import ProgressPage from "./components/ProgressPage"

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

  // =========================
  // LOG
  // =========================

  const [log, setLog] = useState(() => {
    const saved = localStorage.getItem("curioo-log")
    return saved ? JSON.parse(saved) : []
  })

  // =========================
  // FAVORITES
  // =========================

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("curioo-favorites")
    return saved ? JSON.parse(saved) : []
  })

  // =========================
  // DARK MODE
  // =========================

  const [dark, setDark] = useState(() => {
    return localStorage.getItem("curioo-theme") === "dark"
  })

  // =========================
  // CURRENT USER
  // =========================

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("curioo-current-user")
    return saved ? JSON.parse(saved) : null
  })

  // =========================
  // QUIZ PROGRESS
  // =========================

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem("curioo-progress")

    return saved
      ? JSON.parse(saved)
      : {
          total: 0,
          correct: 0,
          timedOut: 0,
          byTopic: {}
        }
  })

  // =========================
  // SAVE FAVORITES
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "curioo-favorites",
      JSON.stringify(favorites)
    )
  }, [favorites])

  // =========================
  // SAVE THEME
  // =========================

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)

    localStorage.setItem(
      "curioo-theme",
      dark ? "dark" : "light"
    )
  }, [dark])

  // =========================
  // SAVE LOG
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "curioo-log",
      JSON.stringify(log)
    )
  }, [log])

  // =========================
  // SAVE QUIZ PROGRESS
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "curioo-progress",
      JSON.stringify(progress)
    )
  }, [progress])

  // =========================
  // EXPLAIN TOPIC
  // =========================

  const handleExplain = async (customTopic) => {
    const searchTopic = customTopic || topic

    if (!searchTopic.trim()) {
      return
    }

    setLoading(true)
    setError("")
    setResult("")
    setRelatedTopics([])
    setQuiz(null)

    try {
      const { text, related } = await getExplanation(
        searchTopic,
        tone
      )

      setResult(text)
      setRelatedTopics(related)

      // Add to recent history
      setHistory((prev) => [
        {
          topic: searchTopic,
          text,
          id: Date.now()
        },
        ...prev.filter(
          (item) => item.topic !== searchTopic
        )
      ])

      // Add to exploration log
      setLog((prev) => [
        ...prev,
        {
          topic: searchTopic,
          timestamp: Date.now()
        }
      ])
    } catch (err) {
      console.error(err)

      setError(
        "Couldn't get an explanation. Check your connection and try again."
      )
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // FAVORITES
  // =========================

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.find(
        (f) => f.topic === item.topic
      )

      if (exists) {
        return prev.filter(
          (f) => f.topic !== item.topic
        )
      }

      return [item, ...prev]
    })
  }

  // =========================
  // GENERATE QUIZ
  // =========================

  const handleQuiz = async () => {
    if (!topic.trim()) {
      return
    }

    setQuizLoading(true)

    try {
      const q = await getQuiz(topic)

      setQuiz(q)
    } catch (err) {
      console.error(err)

      alert(
        "Couldn't load a quiz right now, try again."
      )
    } finally {
      setQuizLoading(false)
    }
  }

  // =========================
  // QUIZ COMPLETED
  // =========================

  const handleQuizComplete = (
    isCorrect,
    didTimeOut
  ) => {
    setProgress((prev) => {
      const previousTopic =
        prev.byTopic[topic] || {
          attempts: 0,
          correct: 0
        }

      return {
        ...prev,

        total:
          prev.total + 1,

        correct:
          prev.correct +
          (isCorrect ? 1 : 0),

        timedOut:
          prev.timedOut +
          (didTimeOut ? 1 : 0),

        byTopic: {
          ...prev.byTopic,

          [topic]: {
            attempts:
              previousTopic.attempts + 1,

            correct:
              previousTopic.correct +
              (isCorrect ? 1 : 0)
          }
        }
      }
    })
  }

  // =========================
  // WEEKLY EXPLORATION
  // =========================

  const oneWeekAgo =
    Date.now() -
    7 * 24 * 60 * 60 * 1000

  const thisWeekCount = log.filter(
    (entry) =>
      entry.timestamp > oneWeekAgo
  ).length

  // =========================
  // KID MODE
  // =========================

  const kidMode = tone === "kid"

  // =========================
  // AUTH
  // =========================

  const handleAuth = (user) => {
    setCurrentUser(user)

    localStorage.setItem(
      "curioo-current-user",
      JSON.stringify(user)
    )
  }

  const handleLogout = () => {
    setCurrentUser(null)

    localStorage.removeItem(
      "curioo-current-user"
    )
  }

  // =========================
  // LOGIN PAGE
  // =========================

  if (!currentUser) {
    return (
      <div className="grid-paper min-h-screen bg-paper dark:bg-blueprint px-4 py-10 flex items-center justify-center transition-colors duration-300">

        <ThemeToggle
          dark={dark}
          setDark={setDark}
        />

        <AuthPage onAuth={handleAuth} />

      </div>
    )
  }

  // =========================
  // MAIN APP
  // =========================

  return (
    <div
      className={`min-h-screen ml-64 px-4 py-10 transition-colors duration-300 text-ink dark:text-paper-dark ${
        kidMode
          ? "dot-paper bg-paper dark:bg-blueprint"
          : "grid-paper bg-paper dark:bg-blueprint"
      }`}
    >

      {/* =========================
          LEFT SIDEBAR
          ========================= */}

      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-panel dark:bg-blueprint-panel border-r border-line/20 dark:border-line-dark/20 z-30 flex flex-col">

        {/* Sidebar Header */}

        <div className="p-5 border-b border-line/20 dark:border-line-dark/20">

          <button
            onClick={() => setView("home")}
            className={`font-semibold hover:opacity-70 transition ${
              kidMode
                ? "font-kid text-xl"
                : "font-display text-xl"
            }`}
          >
            Curioo
          </button>

        </div>

        {/* =========================
            NAVIGATION
            ========================= */}

        <div className="p-4 space-y-2">

          {/* Favorites */}

          <button
            onClick={() => setView("favorites")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition text-left ${
              view === "favorites"
                ? "bg-black/5 dark:bg-white/10"
                : "hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >

            <span className="font-display text-sm">
              ⭐ Favorites
            </span>

            <span className="text-xs opacity-60">
              {favorites.length}
            </span>

          </button>

          {/* Progress */}

          <button
            onClick={() => setView("progress")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-left ${
              view === "progress"
                ? "bg-black/5 dark:bg-white/10"
                : "hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >

            <span>
              📈
            </span>

            <span className="font-display text-sm">
              Progress
            </span>

          </button>

        </div>

        {/* =========================
            RECENT
            ========================= */}

        <div className="flex-1 overflow-y-auto px-4 pb-5">

          <p className="font-display text-xs text-ink/50 dark:text-paper-dark/50 px-4 py-3 uppercase tracking-wider">
            Recent
          </p>

          <div className="space-y-1">

            {history.length === 0 ? (

              <p className="px-4 py-3 text-sm text-ink/40 dark:text-paper-dark/40">
                No recent topics
              </p>

            ) : (

              history.map((item) => (

                <button
                  key={item.id}
                  onClick={() => {
                    setTopic(item.topic)
                    setResult(item.text)
                    setView("home")
                    setQuiz(null)
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition"
                >

                  <p className="font-body text-sm truncate">
                    {item.topic}
                  </p>

                </button>

              ))

            )}

          </div>

        </div>

        {/* =========================
            USER SECTION
            ========================= */}

        <div className="p-4 border-t border-line/20 dark:border-line-dark/20">

          <div className="flex items-center justify-between gap-2">

            <div className="min-w-0">

              <p className="font-display text-sm truncate">
                {currentUser.name}
              </p>

              <p className="font-body text-xs opacity-50">
                Curioo explorer
              </p>

            </div>

            <button
              onClick={handleLogout}
              className="text-xs underline opacity-60 hover:opacity-100 transition"
            >
              logout
            </button>

          </div>

        </div>

      </aside>

      {/* =========================
          THEME TOGGLE
          ========================= */}

      <ThemeToggle
        dark={dark}
        setDark={setDark}
      />

      {/* =========================
          HEADER
          ========================= */}

      <header className="flex flex-col items-center mb-10">

        <div className="font-display text-xs text-ink/50 dark:text-paper-dark/50 mb-3 flex items-center gap-2">

          <span>
            hi, {currentUser.name} 👋
          </span>

          <button
            onClick={handleLogout}
            className="underline hover:text-amber transition-colors duration-150"
          >
            log out
          </button>

        </div>

        <div className="flex items-center gap-2 mb-1">

          <svg
            width="26"
            height="26"
            viewBox="0 0 28 28"
            fill="none"
            className={
              kidMode
                ? "text-kid-pink dark:text-kid-yellow"
                : "text-line dark:text-line-dark"
            }
          >

            <circle
              cx="14"
              cy="14"
              r="11"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            <line
              x1="14"
              y1="1"
              x2="14"
              y2="7"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            <line
              x1="14"
              y1="21"
              x2="14"
              y2="27"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            <line
              x1="1"
              y1="14"
              x2="7"
              y2="14"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            <line
              x1="21"
              y1="14"
              x2="27"
              y2="14"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            <circle
              cx="14"
              cy="14"
              r="2.5"
              fill="currentColor"
            />

          </svg>

          <h1
            className={`text-3xl font-semibold tracking-tight transition-all duration-300 ${
              kidMode
                ? "font-kid"
                : "font-display"
            }`}
          >
            Curioo
          </h1>

        </div>

        <p className="font-body italic text-ink/60 dark:text-paper-dark/60">
          {kidMode
            ? "let's find out how things work! ✨"
            : "understand how anything really works"}
        </p>

        <p className="font-display text-xs text-ink/40 dark:text-paper-dark/40 mt-2">
          📊 {log.length} explored ·{" "}
          {thisWeekCount} this week
        </p>

      </header>

      {/* =========================
          PAGE CONTENT
          ========================= */}

      {view === "favorites" ? (

        <FavoritesPage
          favorites={favorites}
          onBack={() => setView("home")}
          onRemove={toggleFavorite}
          onSelect={(item) => {
            setTopic(item.topic)
            setResult(item.text)
            setView("home")
            setQuiz(null)
          }}
        />

      ) : view === "progress" ? (

        <ProgressPage
          progress={progress}
          onBack={() => setView("home")}
        />

      ) : (

        <>

          {/* =========================
              SEARCH CARD
              ========================= */}

          <div
            className={`max-w-xl mx-auto p-5 transition-all duration-300 ${
              kidMode
                ? "rounded-3xl border-2 border-kid-pink/40 bg-panel dark:bg-blueprint-panel"
                : "rounded-md border border-line/20 dark:border-line-dark/20 bg-panel dark:bg-blueprint-panel"
            }`}
          >

            <div className="flex justify-end mb-3">

              <SurpriseButton
                onPick={(picked) => {
                  setTopic(picked)
                  handleExplain(picked)
                }}
              />

            </div>

            <SearchBar
              topic={topic}
              setTopic={setTopic}
              onExplain={() => handleExplain()}
              loading={loading}
              kidMode={kidMode}
              history={history}
            />

            <ToneToggle
              tone={tone}
              setTone={setTone}
            />

          </div>

          {/* =========================
              CATEGORY BROWSER
              ========================= */}

          <CategoryBrowser
            onPick={(picked) => {
              setTopic(picked)
              handleExplain(picked)
            }}
          />

          {/* =========================
              TOPIC OF THE DAY
              ========================= */}

          {!result && !loading && (

            <TopicOfDay
              onExplore={(picked) => {
                setTopic(picked)
                handleExplain(picked)
              }}
            />

          )}

          {/* =========================
              LOADING
              ========================= */}

          {loading && <Loader />}

          {/* =========================
              ERROR
              ========================= */}

          {error && (

            <p className="font-body text-red-500 text-center mt-4">
              {error}
            </p>

          )}

          {/* =========================
              RESULT
              ========================= */}

          {result && (

            <ResultCard
              text={result}

              onFavorite={() =>
                toggleFavorite({
                  topic,
                  text: result
                })
              }

              isFavorite={favorites.some(
                (f) => f.topic === topic
              )}

              onRegenerate={() =>
                handleExplain(topic)
              }

              regenerating={loading}

              relatedTopics={relatedTopics}

              onRelatedClick={(picked) => {
                setTopic(picked)
                handleExplain(picked)
              }}

              onQuiz={handleQuiz}

              quizLoading={quizLoading}

              kidMode={kidMode}
            />

          )}

          {/* =========================
              QUIZ
              ========================= */}

          {quiz && (

            <QuizCard
              quiz={quiz}
              topic={topic}
              onClose={() => setQuiz(null)}
              onComplete={handleQuizComplete}
            />

          )}

        </>

      )}

    </div>
  )
}

export default App