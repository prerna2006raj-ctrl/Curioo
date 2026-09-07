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
  // =========================
  // BASIC STATES
  // =========================

  const [topic, setTopic] = useState("")
  const [tone, setTone] = useState("kid")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // =========================
  // RECENT HISTORY
  // =========================

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("curioo-history")
    return saved ? JSON.parse(saved) : []
  })

  // =========================
  // PAGE VIEW
  // =========================

  const [view, setView] = useState("home")

  const [relatedTopics, setRelatedTopics] = useState([])

  // =========================
  // QUIZ
  // =========================

  const [quiz, setQuiz] = useState(null)
  const [quizLoading, setQuizLoading] = useState(false)

  // =========================
  // EXPLORATION LOG
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
  // SAVE HISTORY
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "curioo-history",
      JSON.stringify(history)
    )
  }, [history])

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
    document.documentElement.classList.toggle(
      "dark",
      dark
    )

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
    const searchTopic = (
      customTopic || topic
    ).trim()

    if (!searchTopic) {
      return
    }

    setLoading(true)
    setError("")
    setResult("")
    setRelatedTopics([])
    setQuiz(null)

    try {
      const { text, related } =
        await getExplanation(
          searchTopic,
          tone
        )

      setResult(text)
      setRelatedTopics(related || [])

      // Add topic to recent history
      setHistory((prev) => [
        {
          topic: searchTopic,
          text,
          id: Date.now()
        },
        ...prev.filter(
          (item) =>
            item.topic.toLowerCase() !==
            searchTopic.toLowerCase()
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
  // QUIZ GENERATION
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
  // QUIZ COMPLETION
  // =========================

  const handleQuizComplete = (
    isCorrect,
    didTimeOut,
    quizTopic
  ) => {
    setProgress((prev) => {
      const previousTopic =
        prev.byTopic[quizTopic] || {
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

          [quizTopic]: {
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
  // WEEKLY COUNT
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
  // LOGIN SCREEN
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
      className={`min-h-screen ml-72 px-4 py-10 transition-colors duration-300 text-ink dark:text-paper-dark ${
        kidMode
          ? "dot-paper bg-paper dark:bg-blueprint"
          : "grid-paper bg-paper dark:bg-blueprint"
      }`}
    >

      {/* =================================
          ADVANCED SIDEBAR
          ================================= */}

      <aside className="curioo-sidebar">

        {/* BRAND */}

        <div className="sidebar-brand">

          <button
            onClick={() => setView("home")}
            className="sidebar-logo-button"
          >

            <span className="sidebar-logo">
              ✦
            </span>

            <span className="sidebar-brand-name">
              Curioo
            </span>

          </button>

          <span className="sidebar-live-dot" />

        </div>


        {/* NAVIGATION */}

        <div className="sidebar-navigation">

          <p className="sidebar-section-title">
            Workspace
          </p>


          {/* FAVORITES */}

          <button
            onClick={() =>
              setView("favorites")
            }
            className={`sidebar-nav-item ${
              view === "favorites"
                ? "sidebar-nav-active"
                : ""
            }`}
          >

            {view === "favorites" && (
              <span className="sidebar-active-line" />
            )}

            <span className="sidebar-nav-icon favorites-icon">
              ⭐
            </span>

            <div className="sidebar-nav-text">

              <span>
                Favorites
              </span>

              <small>
                Saved discoveries
              </small>

            </div>

            <span className="sidebar-count">
              {favorites.length}
            </span>

          </button>


          {/* PROGRESS */}

          <button
            onClick={() =>
              setView("progress")
            }
            className={`sidebar-nav-item ${
              view === "progress"
                ? "sidebar-nav-active"
                : ""
            }`}
          >

            {view === "progress" && (
              <span className="sidebar-active-line" />
            )}

            <span className="sidebar-nav-icon progress-icon">
              📈
            </span>

            <div className="sidebar-nav-text">

              <span>
                Progress
              </span>

              <small>
                Track your learning
              </small>

            </div>

          </button>

        </div>


        {/* RECENT */}

        <div className="sidebar-recent">

          <div className="sidebar-recent-header">

            <p className="sidebar-section-title">
              Recent
            </p>

            {history.length > 0 && (
              <span className="sidebar-recent-count">
                {history.length}
              </span>
            )}

          </div>


          <div className="sidebar-recent-list">

            {history.length === 0 ? (

              <div className="sidebar-empty">

                <span>
                  🧠
                </span>

                <p>
                  Your discoveries
                  will appear here
                </p>

              </div>

            ) : (

              history.map(
                (item, index) => (

                  <button
                    key={item.id}
                    onClick={() => {
                      setTopic(item.topic)
                      setResult(item.text)
                      setView("home")
                      setQuiz(null)
                    }}
                    className="sidebar-recent-item"
                  >

                    <span className="recent-dot" />

                    <div className="recent-topic-container">

                      <span className="recent-topic">
                        {item.topic}
                      </span>

                      {index === 0 && (
                        <span className="recent-latest">
                          latest
                        </span>
                      )}

                    </div>

                    <span className="recent-arrow">
                      →
                    </span>

                  </button>

                )
              )

            )}

          </div>

        </div>


        {/* USER */}

        <div className="sidebar-user-section">

          <div className="sidebar-user-card">

            <div className="sidebar-avatar">
              {currentUser.name
                ? currentUser.name
                    .charAt(0)
                    .toUpperCase()
                : "U"}
            </div>

            <div className="sidebar-user-info">

              <p>
                {currentUser.name}
              </p>

              <small>
                Curious explorer ✨
              </small>

            </div>

            <button
              onClick={handleLogout}
              className="sidebar-logout"
              title="Log out"
            >
              ↪
            </button>

          </div>

        </div>

      </aside>


      {/* =================================
          THEME TOGGLE
          ================================= */}

      <ThemeToggle
        dark={dark}
        setDark={setDark}
      />


      {/* =================================
          HEADER
          ================================= */}

      <header className="flex flex-col items-center mb-10">

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
            className={`text-3xl font-semibold tracking-tight ${
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


      {/* =================================
          FAVORITES PAGE
          ================================= */}

      {view === "favorites" ? (

        <FavoritesPage
          favorites={favorites}
          onBack={() =>
            setView("home")
          }
          onRemove={toggleFavorite}
          onSelect={(item) => {
            setTopic(item.topic)
            setResult(item.text)
            setView("home")
            setQuiz(null)
          }}
        />

      ) : view === "progress" ? (

        /* =================================
           PROGRESS PAGE
           ================================= */

        <ProgressPage
          progress={progress}
          onBack={() =>
            setView("home")
          }
        />

      ) : (

        /* =================================
           HOME
           ================================= */

        <>

          {/* SEARCH */}

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
              onExplain={() =>
                handleExplain()
              }
              loading={loading}
              kidMode={kidMode}
              history={history}
            />


            <ToneToggle
              tone={tone}
              setTone={setTone}
            />

          </div>


          {/* CATEGORIES */}

          <CategoryBrowser
            onPick={(picked) => {
              setTopic(picked)
              handleExplain(picked)
            }}
          />


          {/* TOPIC OF DAY */}

          {!result && !loading && (

            <TopicOfDay
              onExplore={(picked) => {
                setTopic(picked)
                handleExplain(picked)
              }}
            />

          )}


          {/* LOADING */}

          {loading && <Loader />}


          {/* ERROR */}

          {error && (

            <p className="font-body text-red-500 text-center mt-4">
              {error}
            </p>

          )}


          {/* RESULT */}

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
                (f) =>
                  f.topic === topic
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


          {/* QUIZ */}

          {quiz && (

            <QuizCard
              quiz={quiz}
              topic={topic}
              onClose={() =>
                setQuiz(null)
              }
              onComplete={(
                isCorrect,
                didTimeOut
              ) =>
                handleQuizComplete(
                  isCorrect,
                  didTimeOut,
                  topic
                )
              }
            />

          )}

        </>

      )}

    </div>
  )
}

export default App