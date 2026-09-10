import { useState, useEffect } from "react"

import SearchBar from "./components/SearchBar"
import ResultCard from "./components/ResultCard"
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
import ApiLoader from "./components/ApiLoader"
import ApiError from "./components/ApiError"

import {
  getExplanation,
  getQuiz
} from "./services/gemini"


function App() {

  // =====================================================
  // BASIC
  // =====================================================

  const [topic, setTopic] = useState("")
  const [tone, setTone] = useState("kid")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [relatedTopics, setRelatedTopics] = useState([])


  // =====================================================
  // VIEW
  // =====================================================

  const [view, setView] = useState("home")


  // =====================================================
  // HISTORY
  // =====================================================

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("curioo-history")
    return saved ? JSON.parse(saved) : []
  })


  // =====================================================
  // FAVORITES
  // =====================================================

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("curioo-favorites")
    return saved ? JSON.parse(saved) : []
  })


  // =====================================================
  // THEME
  // =====================================================

  const [dark, setDark] = useState(() => {
    return localStorage.getItem("curioo-theme") === "dark"
  })


  // =====================================================
  // USER
  // =====================================================

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("curioo-current-user")
    return saved ? JSON.parse(saved) : null
  })


  // =====================================================
  // LOG
  // =====================================================

  const [log, setLog] = useState(() => {
    const saved = localStorage.getItem("curioo-log")
    return saved ? JSON.parse(saved) : []
  })


  // =====================================================
  // QUIZ
  // =====================================================

  const [quiz, setQuiz] = useState(null)
  const [quizLoading, setQuizLoading] = useState(false)

  // IMPORTANT:
  // Difficulty is NOT shown on the home page.
  // It is shown only after clicking Quiz.
  const [difficulty, setDifficulty] = useState("Medium")
  const [showDifficulty, setShowDifficulty] = useState(false)


  // =====================================================
  // PROGRESS
  // =====================================================

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem("curioo-progress")

    if (saved) {
      return JSON.parse(saved)
    }

    return {
      total: 0,
      correct: 0,
      timedOut: 0,
      byTopic: {}
    }
  })


  // =====================================================
  // DAILY GOAL
  // =====================================================

  const [dailyGoal, setDailyGoal] = useState(() => {
    const saved = localStorage.getItem("curioo-daily-goal")
    return saved ? Number(saved) : 3
  })


  // =====================================================
  // COLLECTIONS
  // =====================================================

  const [collections, setCollections] = useState(() => {
    const saved = localStorage.getItem("curioo-collections")

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

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("curioo-bookmarks")
    return saved ? JSON.parse(saved) : []
  })


  // =====================================================
  // LEARN LATER
  // =====================================================

  const [learnLater, setLearnLater] = useState(() => {
    const saved = localStorage.getItem("curioo-learn-later")
    return saved ? JSON.parse(saved) : []
  })


  // =====================================================
  // LOCAL STORAGE
  // =====================================================

  useEffect(() => {
    localStorage.setItem(
      "curioo-history",
      JSON.stringify(history)
    )
  }, [history])


  useEffect(() => {
    localStorage.setItem(
      "curioo-favorites",
      JSON.stringify(favorites)
    )
  }, [favorites])


  useEffect(() => {
    localStorage.setItem(
      "curioo-log",
      JSON.stringify(log)
    )
  }, [log])


  useEffect(() => {
    localStorage.setItem(
      "curioo-progress",
      JSON.stringify(progress)
    )
  }, [progress])


  useEffect(() => {
    localStorage.setItem(
      "curioo-daily-goal",
      String(dailyGoal)
    )
  }, [dailyGoal])


  useEffect(() => {
    localStorage.setItem(
      "curioo-collections",
      JSON.stringify(collections)
    )
  }, [collections])


  useEffect(() => {
    localStorage.setItem(
      "curioo-bookmarks",
      JSON.stringify(bookmarks)
    )
  }, [bookmarks])


  useEffect(() => {
    localStorage.setItem(
      "curioo-learn-later",
      JSON.stringify(learnLater)
    )
  }, [learnLater])


  // =====================================================
  // THEME
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
  // EXPLAIN
  // =====================================================

  const handleExplain = async (customTopic) => {

    const searchTopic = (
      customTopic || topic
    ).trim()


    if (!searchTopic) {
      setError("Please enter a topic first.")
      return
    }


    if (loading) {
      return
    }


    setLoading(true)
    setError("")
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


      setTopic(searchTopic)
      setResult(text)
      setRelatedTopics(
        related || []
      )


      // -------------------------
      // HISTORY
      // -------------------------

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


      // -------------------------
      // LEARNING LOG
      // -------------------------

      setLog((prev) => [
        ...prev,
        {
          topic: searchTopic,
          timestamp: Date.now()
        }
      ])

    } catch (err) {

      console.error(
        "Curioo API error:",
        err
      )


      if (err.message === "TIMEOUT") {

        setError(
          "The AI is taking longer than expected. Please try again."
        )

      } else if (err.message === "RATE_LIMIT") {

        setError(
          "Too many requests right now. Please wait a little and try again."
        )

      } else if (err.message === "API_KEY_MISSING") {

        setError(
          "Gemini API key is missing. Check your .env file."
        )

      } else if (err.message === "API_AUTH") {

        setError(
          "Your Gemini API key is invalid or not authorized."
        )

      } else {

        setError(
          "Couldn't get an explanation right now. Please try again."
        )
      }

    } finally {

      setLoading(false)

    }
  }


  // =====================================================
  // RETRY
  // =====================================================

  const handleRetry = () => {

    if (!topic.trim()) {
      return
    }

    handleExplain(topic)
  }


  // =====================================================
  // FAVORITE
  // =====================================================

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
  // COLLECTION
  // =====================================================

  const saveToCollection = (collectionId) => {

    if (!topic.trim() || !result) {
      return
    }


    setCollections((prev) =>
      prev.map((collection) => {

        if (collection.id !== collectionId) {
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
      })
    )
  }


  // =====================================================
  // QUIZ - STEP 1
  // =====================================================

  const handleQuiz = () => {

    if (!topic.trim()) {

      alert(
        "Please enter a topic first."
      )

      return
    }


    // IMPORTANT:
    // This only opens the difficulty popup.
    setShowDifficulty(true)
  }


  // =====================================================
  // QUIZ - STEP 2
  // =====================================================

  const startQuiz = async (
    selectedDifficulty
  ) => {

    const quizTopic = topic.trim()

    if (!quizTopic) {
      return
    }


    setDifficulty(
      selectedDifficulty
    )

    setShowDifficulty(false)
    setQuizLoading(true)
    setQuiz(null)


    try {

      const generatedQuiz =
        await getQuiz(
          quizTopic,
          selectedDifficulty
        )


      setQuiz({
        ...generatedQuiz,
        topic: quizTopic,
        difficulty: selectedDifficulty
      })

    } catch (err) {

      console.error(
        "Quiz error:",
        err
      )

      alert(
        "Couldn't load a quiz right now. Please try again."
      )

    } finally {

      setQuizLoading(false)

    }
  }


  // =====================================================
  // QUIZ COMPLETE
  // =====================================================

  const handleQuizComplete = (
    isCorrect,
    didTimeOut,
    quizTopic
  ) => {

    const safeTopic =
      quizTopic || topic.trim()


    if (!safeTopic) {
      return
    }


    setProgress((prev) => {

      const previousTopic =
        prev.byTopic[safeTopic] || {
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

          [safeTopic]: {

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
  // DATE HELPERS
  // =====================================================

  const getDateKey = (timestamp) => {

    const date = new Date(timestamp)

    return (
      `${date.getFullYear()}-` +
      `${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-` +
      `${String(
        date.getDate()
      ).padStart(2, "0")}`
    )
  }


  // =====================================================
  // TODAY'S TOPICS
  // =====================================================

  const todayKey = getDateKey(
    Date.now()
  )


  const todayTopics = new Set(
    log
      .filter(
        (item) =>
          getDateKey(
            item.timestamp
          ) === todayKey
      )
      .map(
        (item) =>
          item.topic.toLowerCase()
      )
  ).size


  // =====================================================
  // LEARNING STREAK
  // =====================================================

  const learningDays = new Set(
    log.map(
      (item) =>
        getDateKey(
          item.timestamp
        )
    )
  )


  const calculateStreak = () => {

    if (learningDays.size === 0) {
      return 0
    }


    const today = new Date()

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
      learningDays.has(
        todayKey
      )
    ) {

      currentDate = today

    } else if (
      learningDays.has(
        yesterdayKey
      )
    ) {

      currentDate = yesterday

    } else {

      return 0
    }


    let streak = 0


    while (true) {

      const key =
        getDateKey(
          currentDate.getTime()
        )


      if (!learningDays.has(key)) {
        break
      }


      streak++


      const previous =
        new Date(currentDate)

      previous.setDate(
        previous.getDate() - 1
      )


      currentDate = previous
    }


    return streak
  }


  const currentStreak =
    calculateStreak()


  // =====================================================
  // WEEKLY
  // =====================================================

  const oneWeekAgo =
    Date.now() -
    7 *
      24 *
      60 *
      60 *
      1000


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
  // OPEN SAVED ITEM
  // =====================================================

  const openLibraryItem = (item) => {

    setTopic(item.topic)
    setResult(item.text)
    setRelatedTopics([])
    setQuiz(null)
    setError("")
    setView("home")
  }


  // =====================================================
  // LOGIN
  // =====================================================

  if (!currentUser) {

    return (

      <div className="grid-paper min-h-screen bg-paper dark:bg-blueprint px-4 py-10 flex items-center justify-center">

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
      className={`min-h-screen px-4 py-10 transition-colors duration-300 text-ink dark:text-paper-dark ${
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

          <br />


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


          {/* LIBRARY */}

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

                      setRelatedTopics([])

                      setQuiz(null)

                      setError("")

                      setView("home")

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

              {
                currentUser.name
                  ? currentUser.name
                      .charAt(0)
                      .toUpperCase()
                  : "U"
              }

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

        <h1
          className={`text-3xl font-semibold tracking-tight ${
            kidMode
              ? "font-kid"
              : "font-display"
          }`}
        >
          Curioo
        </h1>


        <p className="font-body italic text-ink/60 dark:text-paper-dark/60">

          {kidMode
            ? "let's find out how things work! ✨"
            : "understand how anything really works"}

        </p>


        <p className="font-display text-xs text-ink/40 dark:text-paper-dark/40 mt-2">

          📊 {log.length} explored ·{" "}
          {thisWeekCount} this week ·{" "}
          🔥 {currentStreak} day streak

        </p>

      </header>


      {/* =================================================
          VIEWS
          ================================================= */}

      {view === "favorites" ? (

        <FavoritesPage
          favorites={favorites}

          onBack={() =>
            setView("home")
          }

          onRemove={
            toggleFavorite
          }

          onSelect={(item) => {

            setTopic(
              item.topic
            )

            setResult(
              item.text
            )

            setError("")

            setView("home")

          }}
        />

      ) : view === "progress" ? (

        <ProgressPage

          progress={progress}

          dailyGoal={dailyGoal}

          todayTopics={todayTopics}

          streak={currentStreak}

          onGoalChange={
            setDailyGoal
          }

          onBack={() =>
            setView("home")
          }

        />

      ) : view === "library" ? (

        <LearningLibrary

          collections={
            collections
          }

          setCollections={
            setCollections
          }

          bookmarks={
            bookmarks
          }

          setBookmarks={
            setBookmarks
          }

          learnLater={
            learnLater
          }

          setLearnLater={
            setLearnLater
          }

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
            className={`max-w-xl mx-auto p-5 ${
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


          {/* CATEGORY */}

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

          {loading && (
            <ApiLoader />
          )}


          {/* ERROR */}

          {error && !loading && (

            <ApiError
              message={error}
              onRetry={handleRetry}
            />

          )}


          {/* RESULT */}

          {result && !loading && (

            <div className="max-w-xl mx-auto">

              <ResultCard

                text={result}

                onFavorite={() =>
                  toggleFavorite({
                    topic,
                    text: result
                  })
                }

                isFavorite={
                  favorites.some(
                    (f) =>
                      f.topic === topic
                  )
                }

                onRegenerate={() =>
                  handleExplain(topic)
                }

                regenerating={loading}

                relatedTopics={
                  relatedTopics
                }

                onRelatedClick={(picked) => {

                  setTopic(picked)

                  handleExplain(picked)

                }}

                onQuiz={
                  handleQuiz
                }

                quizLoading={
                  quizLoading
                }

                kidMode={
                  kidMode
                }

              />


              {/* SAVE ACTIONS */}

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
                    className="curioo-save-button"
                  >

                    ⭐{" "}

                    {
                      favorites.some(
                        (f) =>
                          f.topic === topic
                      )
                        ? "Favorited"
                        : "Favorite"
                    }

                  </button>


                  {/* BOOKMARK */}

                  <button
                    onClick={
                      toggleBookmark
                    }
                    className="curioo-save-button"
                  >

                    🔖{" "}

                    {
                      bookmarks.some(
                        (item) =>
                          item.topic.toLowerCase() ===
                          topic.toLowerCase()
                      )
                        ? "Bookmarked"
                        : "Bookmark"
                    }

                  </button>


                  {/* LEARN LATER */}

                  <button
                    onClick={
                      toggleLearnLater
                    }
                    className="curioo-save-button"
                  >

                    🕐{" "}

                    {
                      learnLater.some(
                        (item) =>
                          item.topic.toLowerCase() ===
                          topic.toLowerCase()
                      )
                        ? "Added to Learn Later"
                        : "Learn Later"
                    }

                  </button>

                </div>


                {/* COLLECTION */}

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

                            className="curioo-collection-button"
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
                      className="curioo-collection-button"
                    >
                      + Manage
                    </button>

                  </div>

                </div>

              </div>

            </div>

          )}

        </>

      )}


      {/* =================================================
          DIFFICULTY POPUP
          ================================================= */}

      {showDifficulty && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
          onClick={() =>
            setShowDifficulty(false)
          }
        >

          <div
            className="w-full max-w-md rounded-2xl border border-line/20 dark:border-line-dark/20 bg-panel dark:bg-blueprint-panel p-6 shadow-2xl animate-pop-in"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="text-center">

              <div className="text-3xl mb-2">
                🧠
              </div>

              <h2 className="font-display text-xl font-semibold">
                Choose quiz difficulty
              </h2>

              <p className="font-body text-sm mt-2 text-ink/60 dark:text-paper-dark/60">
                How challenging should your quiz be?
              </p>

            </div>


            <div className="grid grid-cols-3 gap-3 mt-6">

              {/* EASY */}

              <button
                onClick={() =>
                  startQuiz("Easy")
                }
                disabled={quizLoading}
                className="rounded-xl border border-green-300/60 bg-green-50 dark:bg-green-900/20 p-4 hover:scale-105 hover:shadow-md transition-all duration-200 disabled:opacity-50"
              >

                <div className="text-2xl">
                  🟢
                </div>

                <div className="font-display font-semibold mt-2 text-green-700 dark:text-green-300">
                  Easy
                </div>

                <div className="font-body text-xs mt-1 text-ink/50 dark:text-paper-dark/50">
                  Beginner
                </div>

              </button>


              {/* MEDIUM */}

              <button
                onClick={() =>
                  startQuiz("Medium")
                }
                disabled={quizLoading}
                className="rounded-xl border border-amber-300/60 bg-amber-50 dark:bg-amber-900/20 p-4 hover:scale-105 hover:shadow-md transition-all duration-200 disabled:opacity-50"
              >

                <div className="text-2xl">
                  🟡
                </div>

                <div className="font-display font-semibold mt-2 text-amber-700 dark:text-amber-300">
                  Medium
                </div>

                <div className="font-body text-xs mt-1 text-ink/50 dark:text-paper-dark/50">
                  Balanced
                </div>

              </button>


              {/* HARD */}

              <button
                onClick={() =>
                  startQuiz("Hard")
                }
                disabled={quizLoading}
                className="rounded-xl border border-red-300/60 bg-red-50 dark:bg-red-900/20 p-4 hover:scale-105 hover:shadow-md transition-all duration-200 disabled:opacity-50"
              >

                <div className="text-2xl">
                  🔴
                </div>

                <div className="font-display font-semibold mt-2 text-red-700 dark:text-red-300">
                  Hard
                </div>

                <div className="font-body text-xs mt-1 text-ink/50 dark:text-paper-dark/50">
                  Challenging
                </div>

              </button>

            </div>


            {quizLoading && (

              <p className="text-center text-sm mt-5 opacity-60">
                Generating your quiz...
              </p>

            )}


            <button
              onClick={() =>
                setShowDifficulty(false)
              }
              disabled={quizLoading}
              className="w-full mt-5 py-2 rounded-lg font-display text-sm text-ink/60 dark:text-paper-dark/60 hover:bg-ink/5 dark:hover:bg-white/5 transition disabled:opacity-40"
            >
              Cancel
            </button>

          </div>

        </div>

      )}


      {/* =================================================
          QUIZ CARD
          ================================================= */}

      {quiz && (

        <QuizCard

          quiz={quiz}

          topic={
            quiz.topic || topic
          }

          difficulty={
            quiz.difficulty ||
            difficulty
          }

          onClose={() =>
            setQuiz(null)
          }

          onComplete={
            handleQuizComplete
          }

        />

      )}

    </div>
  )
}


export default App