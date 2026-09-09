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
import QuizCard from "./components/QuizCard"
import ProgressPage from "./components/ProgressPage"
import LearningLibrary from "./components/LearningLibrary"

import {
  getExplanation,
  getQuiz
} from "./services/gemini"


function App() {

  // =====================================================
  // BASIC STATES
  // =====================================================

  const [topic, setTopic] = useState("")
  const [tone, setTone] = useState("kid")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  // =====================================================
  // HISTORY
  // =====================================================

  const [history, setHistory] = useState(() => {
    const saved =
      localStorage.getItem("curioo-history")

    return saved
      ? JSON.parse(saved)
      : []
  })


  // =====================================================
  // VIEW
  // =====================================================

  const [view, setView] = useState("home")

  const [relatedTopics, setRelatedTopics] =
    useState([])


  // =====================================================
  // QUIZ
  // =====================================================

  const [quiz, setQuiz] = useState(null)

  const [quizLoading, setQuizLoading] =
    useState(false)


  // =====================================================
  // LOG
  // =====================================================

  const [log, setLog] = useState(() => {
    const saved =
      localStorage.getItem("curioo-log")

    return saved
      ? JSON.parse(saved)
      : []
  })


  // =====================================================
  // FAVORITES
  // =====================================================

  const [favorites, setFavorites] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "curioo-favorites"
        )

      return saved
        ? JSON.parse(saved)
        : []
    })


  // =====================================================
  // DARK MODE
  // =====================================================

  const [dark, setDark] = useState(() => {
    return (
      localStorage.getItem(
        "curioo-theme"
      ) === "dark"
    )
  })


  // =====================================================
  // CURRENT USER
  // =====================================================

  const [currentUser, setCurrentUser] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "curioo-current-user"
        )

      return saved
        ? JSON.parse(saved)
        : null
    })


  // =====================================================
  // QUIZ PROGRESS
  // =====================================================

  const [progress, setProgress] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "curioo-progress"
        )

      return saved
        ? JSON.parse(saved)
        : {
            total: 0,
            correct: 0,
            timedOut: 0,
            byTopic: {}
          }
    })


  // =====================================================
  // COLLECTIONS
  // =====================================================

  const [collections, setCollections] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "curioo-collections"
        )

      if (saved) {
        return JSON.parse(saved)
      }

      return [
        {
          id: 1,
          name: "Science",
          items: []
        },
        {
          id: 2,
          name: "Java",
          items: []
        },
        {
          id: 3,
          name: "AI",
          items: []
        },
        {
          id: 4,
          name: "Space",
          items: []
        }
      ]
    })


  // =====================================================
  // BOOKMARKS
  // =====================================================

  const [bookmarks, setBookmarks] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "curioo-bookmarks"
        )

      return saved
        ? JSON.parse(saved)
        : []
    })


  // =====================================================
  // LEARN LATER
  // =====================================================

  const [learnLater, setLearnLater] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "curioo-learn-later"
        )

      return saved
        ? JSON.parse(saved)
        : []
    })


  // =====================================================
  // SAVE HISTORY
  // =====================================================

  useEffect(() => {

    localStorage.setItem(
      "curioo-history",
      JSON.stringify(history)
    )

  }, [history])


  // =====================================================
  // SAVE FAVORITES
  // =====================================================

  useEffect(() => {

    localStorage.setItem(
      "curioo-favorites",
      JSON.stringify(favorites)
    )

  }, [favorites])


  // =====================================================
  // SAVE THEME
  // =====================================================

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


  // =====================================================
  // SAVE LOG
  // =====================================================

  useEffect(() => {

    localStorage.setItem(
      "curioo-log",
      JSON.stringify(log)
    )

  }, [log])


  // =====================================================
  // SAVE QUIZ PROGRESS
  // =====================================================

  useEffect(() => {

    localStorage.setItem(
      "curioo-progress",
      JSON.stringify(progress)
    )

  }, [progress])


  // =====================================================
  // SAVE COLLECTIONS
  // =====================================================

  useEffect(() => {

    localStorage.setItem(
      "curioo-collections",
      JSON.stringify(collections)
    )

  }, [collections])


  // =====================================================
  // SAVE BOOKMARKS
  // =====================================================

  useEffect(() => {

    localStorage.setItem(
      "curioo-bookmarks",
      JSON.stringify(bookmarks)
    )

  }, [bookmarks])


  // =====================================================
  // SAVE LEARN LATER
  // =====================================================

  useEffect(() => {

    localStorage.setItem(
      "curioo-learn-later",
      JSON.stringify(learnLater)
    )

  }, [learnLater])


  // =====================================================
  // EXPLAIN
  // =====================================================

  const handleExplain = async (
    customTopic
  ) => {

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

      const {
        text,
        related
      } = await getExplanation(
        searchTopic,
        tone
      )

      setResult(text)

      setRelatedTopics(
        related || []
      )


      // HISTORY

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


      // LOG

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


  // =====================================================
  // FAVORITE
  // =====================================================

  const toggleFavorite = (item) => {

    setFavorites((prev) => {

      const exists = prev.find(
        (f) =>
          f.topic === item.topic
      )

      if (exists) {

        return prev.filter(
          (f) =>
            f.topic !== item.topic
        )

      }

      return [
        {
          ...item,
          id: item.id || Date.now()
        },
        ...prev
      ]

    })
  }


  // =====================================================
  // BOOKMARK
  // =====================================================

  const toggleBookmark = () => {

    if (!topic.trim() || !result) {
      return
    }

    setBookmarks((prev) => {

      const exists = prev.find(
        (item) =>
          item.topic.toLowerCase() ===
          topic.toLowerCase()
      )

      if (exists) {

        return prev.filter(
          (item) =>
            item.topic.toLowerCase() !==
            topic.toLowerCase()
        )

      }

      return [
        {
          id: Date.now(),
          topic,
          text: result,
          savedAt: Date.now()
        },
        ...prev
      ]

    })
  }


  // =====================================================
  // LEARN LATER
  // =====================================================

  const toggleLearnLater = () => {

    if (!topic.trim() || !result) {
      return
    }

    setLearnLater((prev) => {

      const exists = prev.find(
        (item) =>
          item.topic.toLowerCase() ===
          topic.toLowerCase()
      )

      if (exists) {

        return prev.filter(
          (item) =>
            item.topic.toLowerCase() !==
            topic.toLowerCase()
        )

      }

      return [
        {
          id: Date.now(),
          topic,
          text: result,
          savedAt: Date.now()
        },
        ...prev
      ]

    })
  }


  // =====================================================
  // SAVE CURRENT EXPLANATION TO COLLECTION
  // =====================================================

  const saveToCollection = (
    collectionId
  ) => {

    if (!topic.trim() || !result) {
      return
    }

    setCollections((prev) => {

      return prev.map(
        (collection) => {

          if (
            collection.id !==
            collectionId
          ) {
            return collection
          }

          const exists =
            collection.items.some(
              (item) =>
                item.topic.toLowerCase() ===
                topic.toLowerCase()
            )

          if (exists) {
            return collection
          }

          return {
            ...collection,

            items: [
              {
                id: Date.now(),
                topic,
                text: result,
                savedAt: Date.now()
              },

              ...collection.items
            ]
          }

        }
      )

    })

  }


  // =====================================================
  // QUIZ
  // =====================================================

  const handleQuiz = async () => {

    if (!topic.trim()) {
      return
    }

    setQuizLoading(true)

    try {

      const q =
        await getQuiz(topic)

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


  // =====================================================
  // QUIZ COMPLETION
  // =====================================================

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


  // =====================================================
  // STREAK
  // =====================================================

  const getDateKey = (
    timestamp
  ) => {

    const date =
      new Date(timestamp)

    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`

  }


  const learningDays = [
    ...new Set(
      log.map(
        (item) =>
          getDateKey(
            item.timestamp
          )
      )
    )
  ]


  const calculateCurrentStreak =
    () => {

      if (
        learningDays.length === 0
      ) {
        return 0
      }

      const dates =
        new Set(learningDays)

      const today =
        new Date()

      today.setHours(
        0,
        0,
        0,
        0
      )

      const todayKey =
        getDateKey(
          today.getTime()
        )

      const yesterday =
        new Date(today)

      yesterday.setDate(
        yesterday.getDate() - 1
      )

      const yesterdayKey =
        getDateKey(
          yesterday.getTime()
        )

      let currentDate

      if (
        dates.has(todayKey)
      ) {
        currentDate = today
      } else if (
        dates.has(yesterdayKey)
      ) {
        currentDate =
          yesterday
      } else {
        return 0
      }

      let streak = 0

      while (true) {

        const key =
          getDateKey(
            currentDate.getTime()
          )

        if (!dates.has(key)) {
          break
        }

        streak++

        const previous =
          new Date(currentDate)

        previous.setDate(
          previous.getDate() - 1
        )

        currentDate =
          previous
      }

      return streak
    }


  const currentStreak =
    calculateCurrentStreak()


  // =====================================================
  // WEEKLY COUNT
  // =====================================================

  const oneWeekAgo =
    Date.now() -
    7 * 24 * 60 * 60 * 1000

  const thisWeekCount =
    log.filter(
      (entry) =>
        entry.timestamp >
        oneWeekAgo
    ).length


  // =====================================================
  // MODE
  // =====================================================

  const kidMode =
    tone === "kid"


  // =====================================================
  // AUTH
  // =====================================================

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


  // =====================================================
  // OPEN LIBRARY ITEM
  // =====================================================

  const openLibraryItem = (
    item
  ) => {

    setTopic(item.topic)
    setResult(item.text)
    setRelatedTopics([])
    setQuiz(null)
    setView("home")

  }


  // =====================================================
  // LOGIN
  // =====================================================

  if (!currentUser) {

    return (

      <div className="grid-paper min-h-screen bg-paper dark:bg-blueprint px-4 py-10 flex items-center justify-center transition-colors duration-300">

        <ThemeToggle
          dark={dark}
          setDark={setDark}
        />

        <AuthPage
          onAuth={handleAuth}
        />

      </div>

    )

  }


  // =====================================================
  // MAIN APP
  // =====================================================

  return (

    <div
      className={`min-h-screen ml-72 px-4 py-10 transition-colors duration-300 text-ink dark:text-paper-dark ${
        kidMode
          ? "dot-paper bg-paper dark:bg-blueprint"
          : "grid-paper bg-paper dark:bg-blueprint"
      }`}
    >

      {/* =================================================
          SIDEBAR
          ================================================= */}

      <aside className="curioo-sidebar">

        {/* BRAND */}

        <div className="sidebar-brand">

          <button
            onClick={() =>
              setView("home")
            }
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

            <span className="sidebar-nav-icon">
              ⭐
            </span>

            <div className="sidebar-nav-text">

              <span>
                Favorites
              </span>
              <br />
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

            <span className="sidebar-nav-icon">
              📈
            </span>

            <div className="sidebar-nav-text">

              <span>
                Progress
              </span>
              <br />
              <small>
                Track your learning
              </small>

            </div>

          </button>


          {/* LEARNING LIBRARY */}

          <button
            onClick={() =>
              setView("library")
            }
            className={`sidebar-nav-item ${
              view === "library"
                ? "sidebar-nav-active"
                : ""
            }`}
          >

            {view === "library" && (
              <span className="sidebar-active-line" />
            )}

            <span className="sidebar-nav-icon">
              📚
            </span>

            <div className="sidebar-nav-text">

              <span>
                Library
              </span>
              <br />
              <small>
                Collections & saved learning
              </small>

            </div>

            <span className="sidebar-count">
              {
                bookmarks.length +
                learnLater.length
              }
            </span>

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

                      setTopic(
                        item.topic
                      )

                      setResult(
                        item.text
                      )

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


      {/* THEME */}

      <ThemeToggle
        dark={dark}
        setDark={setDark}
      />


      {/* =================================================
          HEADER
          ================================================= */}

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
          {" · "}
          🔥 {currentStreak} day streak

        </p>

      </header>


      {/* =================================================
          FAVORITES
          ================================================= */}

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

        <ProgressPage
          progress={progress}
          onBack={() =>
            setView("home")
          }
        />

      ) : view === "library" ? (

        <LearningLibrary
          collections={collections}
          setCollections={setCollections}

          bookmarks={bookmarks}
          setBookmarks={setBookmarks}

          learnLater={learnLater}
          setLearnLater={setLearnLater}

          onBack={() =>
            setView("home")
          }

          onOpenExplanation={
            openLibraryItem
          }
        />

      ) : (

        <>
          {/* =================================================
              SEARCH
              ================================================= */}

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

                  handleExplain(
                    picked
                  )

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


          {/* =================================================
              CATEGORIES
              ================================================= */}

          <CategoryBrowser
            onPick={(picked) => {

              setTopic(picked)

              handleExplain(
                picked
              )

            }}
          />


          {/* =================================================
              TOPIC OF DAY
              ================================================= */}

          {!result && !loading && (

            <TopicOfDay
              onExplore={(picked) => {

                setTopic(picked)

                handleExplain(
                  picked
                )

              }}
            />

          )}


          {/* =================================================
              LOADING
              ================================================= */}

          {loading && <Loader />}


          {/* =================================================
              ERROR
              ================================================= */}

          {error && (

            <p className="font-body text-red-500 text-center mt-4">
              {error}
            </p>

          )}


          {/* =================================================
              RESULT
              ================================================= */}

          {result && (

            <div className="max-w-xl mx-auto">

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

                relatedTopics={
                  relatedTopics
                }

                onRelatedClick={(picked) => {

                  setTopic(picked)

                  handleExplain(
                    picked
                  )

                }}

                onQuiz={handleQuiz}

                quizLoading={
                  quizLoading
                }

                kidMode={kidMode}
              />


              {/* =================================================
                  SAVE ACTIONS
                  ================================================= */}

              <div className="mt-4 rounded-2xl border border-line/20 dark:border-line-dark/20 bg-panel dark:bg-blueprint-panel p-4">

                <div className="flex flex-wrap gap-2">

                  {/* FAVORITE */}

                  <button
                    onClick={() =>
                      toggleFavorite({
                        topic,
                        text: result
                      })
                    }
                    className={`px-4 py-2.5 rounded-xl border text-sm transition-all ${
                      favorites.some(
                        (f) =>
                          f.topic === topic
                      )
                        ? "bg-amber-100 dark:bg-amber-950/30 border-amber-300"
                        : "border-line/30 dark:border-line-dark/30 hover:-translate-y-0.5"
                    }`}
                  >
                    ⭐{" "}
                    {favorites.some(
                      (f) =>
                        f.topic === topic
                    )
                      ? "Favorited"
                      : "Favorite"}
                  </button>


                  {/* BOOKMARK */}

                  <button
                    onClick={
                      toggleBookmark
                    }
                    className={`px-4 py-2.5 rounded-xl border text-sm transition-all ${
                      bookmarks.some(
                        (item) =>
                          item.topic.toLowerCase() ===
                          topic.toLowerCase()
                      )
                        ? "bg-blue-100 dark:bg-blue-950/30 border-blue-300"
                        : "border-line/30 dark:border-line-dark/30 hover:-translate-y-0.5"
                    }`}
                  >
                    🔖{" "}
                    {bookmarks.some(
                      (item) =>
                        item.topic.toLowerCase() ===
                        topic.toLowerCase()
                    )
                      ? "Bookmarked"
                      : "Bookmark"}
                  </button>


                  {/* LEARN LATER */}

                  <button
                    onClick={
                      toggleLearnLater
                    }
                    className={`px-4 py-2.5 rounded-xl border text-sm transition-all ${
                      learnLater.some(
                        (item) =>
                          item.topic.toLowerCase() ===
                          topic.toLowerCase()
                      )
                        ? "bg-orange-100 dark:bg-orange-950/30 border-orange-300"
                        : "border-line/30 dark:border-line-dark/30 hover:-translate-y-0.5"
                    }`}
                  >
                    🕐{" "}
                    {learnLater.some(
                      (item) =>
                        item.topic.toLowerCase() ===
                        topic.toLowerCase()
                    )
                      ? "Added to Learn Later"
                      : "Learn Later"}
                  </button>

                </div>


                {/* COLLECTIONS */}

                <div className="mt-4 pt-4 border-t border-line/10 dark:border-line-dark/10">

                  <p className="text-xs font-mono uppercase tracking-wider text-ink/40 dark:text-paper-dark/40 mb-3">
                    Save to collection
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {collections.map(
                      (collection) => {

                        const alreadySaved =
                          collection.items.some(
                            (item) =>
                              item.topic.toLowerCase() ===
                              topic.toLowerCase()
                          )

                        return (

                          <button
                            key={
                              collection.id
                            }
                            onClick={() =>
                              saveToCollection(
                                collection.id
                              )
                            }
                            disabled={
                              alreadySaved
                            }
                            className={`px-3 py-2 rounded-lg text-xs border transition-all ${
                              alreadySaved
                                ? "opacity-50 cursor-default bg-black/5 dark:bg-white/5"
                                : "border-line/20 dark:border-line-dark/20 hover:-translate-y-0.5"
                            }`}
                          >

                            📚{" "}
                            {collection.name}

                            {alreadySaved &&
                              " ✓"}

                          </button>

                        )

                      }
                    )}

                    <button
                      onClick={() =>
                        setView("library")
                      }
                      className="px-3 py-2 rounded-lg text-xs border border-dashed border-line/30 dark:border-line-dark/30 hover:-translate-y-0.5"
                    >
                      + Manage collections
                    </button>

                  </div>

                </div>

              </div>

            </div>

          )}


          {/* =================================================
              QUIZ
              ================================================= */}

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


          {/* =================================================
              HISTORY
              ================================================= */}

          {/* Existing sidebar handles recent history */}

        </>

      )}

    </div>

  )
}

export default App