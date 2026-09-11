import {
  useState,
  useEffect
} from "react"

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
import WelcomePage from "./components/WelcomePage"
import LearningMode from "./components/LearningMode"
import {
  getExplanation,
  getQuiz,
  getLearningLesson
} from "./services/gemini"


function App() {

  // =====================================================
  // BASIC
  // =====================================================

  const [topic, setTopic] =
    useState("")

  const [tone, setTone] =
    useState("kid")

  const [result, setResult] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")
  const [difficulty, setDifficulty] = useState("Easy")

  const [showWelcome, setShowWelcome] = useState(true)

  
  // =====================================================
  // HISTORY
  // =====================================================

  const [history, setHistory] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "curioo-history"
        )

      return saved
        ? JSON.parse(saved)
        : []
    })


  // =====================================================
  // VIEW
  // =====================================================

  const [view, setView] =
    useState("home")


  const [relatedTopics, setRelatedTopics] =
    useState([])


  // =====================================================
  // QUIZ
  // =====================================================

  const [quiz, setQuiz] =
    useState(null)

  const [quizLoading, setQuizLoading] =
    useState(false)

  const [learningMode, setLearningMode] = useState(false)
  const [lessonStep, setLessonStep] = useState(0)
  const [lesson, setLesson] = useState([])

  const [explainAgainLoading, setExplainAgainLoading] = useState(false)
  // =====================================================
  // LOG
  // =====================================================

  const [log, setLog] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "curioo-log"
        )

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
  // THEME
  // =====================================================

  const [dark, setDark] =
    useState(() => {

      return (
        localStorage.getItem(
          "curioo-theme"
        ) === "dark"
      )

    })


  // =====================================================
  // USER
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
  // PROGRESS
  // =====================================================

    const [progress, setProgress] = useState(() => {
  const saved = localStorage.getItem("curioo-progress")

  if (saved) {
    const parsed = JSON.parse(saved)

    const total = Number(parsed.total) || 0
    const correct = Number(parsed.correct) || 0
    const timedOut = Number(parsed.timedOut) || 0

    return {
      total,
      correct,
      timedOut,

      // Repair old progress data
      questionsAnswered:
        parsed.questionsAnswered ??
        Math.max(0, total - timedOut),

      byTopic: parsed.byTopic || {}
    }
  }

  return {
    total: 0,
    questionsAnswered: 0,
    correct: 0,
    timedOut: 0,
    byTopic: {}
  }
})
    const [dailyGoal, setDailyGoal] = useState(() => {
      const saved = localStorage.getItem("curioo-daily-goal")
      return saved ? Number(saved) : 3
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

    document.documentElement.classList.toggle(
      "dark",
      dark
    )

    localStorage.setItem(
      "curioo-theme",
      dark
        ? "dark"
        : "light"
    )

  }, [dark])


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
  // EXPLAIN
  // =====================================================

  const handleExplain =
    async (
      customTopic
    ) => {

      const searchTopic =
        (
          customTopic ||
          topic
        ).trim()


      if (!searchTopic) {

        setError(
          "Please enter a topic first."
        )

        return
      }


      // Prevent duplicate requests

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
        } =
          await getExplanation(
            searchTopic,
            tone
          )


        setTopic(
          searchTopic
        )

        setResult(
          text
        )

        setRelatedTopics(
          related || []
        )


        // HISTORY

        setHistory(
          (prev) => [

            {
              topic:
                searchTopic,

              text,

              id:
                Date.now()
            },

            ...prev.filter(
              (item) =>
                item.topic.toLowerCase() !==
                searchTopic.toLowerCase()
            )

          ]
        )


        // LOG

        setLog(
          (prev) => [

            ...prev,

            {
              topic:
                searchTopic,

              timestamp:
                Date.now()
            }

          ]
        )


      } catch (err) {

        console.error(
          "Curioo API error:",
          err
        )


        if (
          err.message ===
          "TIMEOUT"
        ) {

          setError(
            "The AI is taking longer than expected. Please try again."
          )

        } else if (
          err.message ===
          "RATE_LIMIT"
        ) {

          setError(
            "Too many requests right now. Please wait a little and try again."
          )

        } else if (
          err.message ===
          "API_KEY_MISSING"
        ) {

          setError(
            "Gemini API key is missing. Check your .env file."
          )

        } else if (
          err.message ===
          "API_AUTH"
        ) {

          setError(
            "Your Gemini API key is invalid or not authorized."
          )

        } else if (
          err.message ===
          "SERVER_ERROR"
        ) {

          setError(
            "The AI service is temporarily unavailable. Please try again."
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

  const handleRetry =
    () => {

      if (!topic.trim()) {
        return
      }

      handleExplain(
        topic
      )

    }
  const startLearningMode = async () => {
      if (!topic.trim()) return

      setExplainAgainLoading(true)
      setError("")

      try {
        const { steps } = await getLearningLesson(
          topic,
          tone
        )

        const lessonSteps = steps.map(
          (step) => `${step.title}: ${step.text}`
        )

        setLesson(lessonSteps)
        setLessonStep(0)
        setLearningMode(true)
      } catch (err) {
        console.error("Learning Mode error:", err)
        setError("Couldn't start learning mode. Try again.")
      } finally {
        setExplainAgainLoading(false)
      }
    }
  const explainAgain = async (style) => {
    if (!topic.trim()) return

    setExplainAgainLoading(true)
    setError("")

    try {
      const { text, related } = await getExplanation(
        topic,
        style
      )

      setResult(text)
      setRelatedTopics(related || [])

      setHistory((prev) => [
        {
          topic: topic,
          text,
          id: Date.now()
        },
        ...prev
      ])
    } catch (err) {
      setError("Couldn't generate the new explanation. Try again.")
    } finally {
      setExplainAgainLoading(false)
    }
  }
  // =====================================================
  // FAVORITE
  // =====================================================

  const toggleFavorite =
    (item) => {

      setFavorites(
        (prev) => {

          const exists =
            prev.find(
              (f) =>
                f.topic ===
                item.topic
            )


          if (exists) {

            return prev.filter(
              (f) =>
                f.topic !==
                item.topic
            )

          }


          return [
            {
              ...item,
              id:
                item.id ||
                Date.now()
            },

            ...prev
          ]

        }
      )

    }


  // =====================================================
  // BOOKMARK
  // =====================================================

  const toggleBookmark =
    () => {

      if (
        !topic.trim() ||
        !result
      ) {
        return
      }


      setBookmarks(
        (prev) => {

          const exists =
            prev.find(
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
              id:
                Date.now(),

              topic,

              text:
                result,

              savedAt:
                Date.now()
            },

            ...prev
          ]

        }
      )

    }


  // =====================================================
  // LEARN LATER
  // =====================================================

  const toggleLearnLater =
    () => {

      if (
        !topic.trim() ||
        !result
      ) {
        return
      }


      setLearnLater(
        (prev) => {

          const exists =
            prev.find(
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
              id:
                Date.now(),

              topic,

              text:
                result,

              savedAt:
                Date.now()
            },

            ...prev
          ]

        }
      )

    }


  // =====================================================
  // COLLECTION
  // =====================================================

  const saveToCollection =
    (collectionId) => {

      if (
        !topic.trim() ||
        !result
      ) {
        return
      }


      setCollections(
        (prev) =>

          prev.map(
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
                    id:
                      Date.now(),

                    topic,

                    text:
                      result,

                    savedAt:
                      Date.now()
                  },

                  ...collection.items

                ]
              }

            }
          )
      )

    }


  // =====================================================
  // QUIZ
  // =====================================================

  const handleQuiz =
    async () => {

      if (
        !topic.trim() ||
        quizLoading
      ) {
        return
      }


      setQuizLoading(
        true
      )


      try {

        const q =
          await getQuiz(
            topic
          )


        setQuiz(q)

      } catch (err) {

        console.error(
          "Quiz error:",
          err
        )

        alert(
          err.message ===
          "RATE_LIMIT"
            ? "Too many requests. Please wait and try again."
            : "Couldn't load the quiz. Please try again."
        )

      } finally {

        setQuizLoading(
          false
        )

      }

    }


  // =====================================================
  // QUIZ COMPLETE
  // =====================================================

  const handleQuizComplete = (
  isCorrect,
  didTimeOut
) => {
  setProgress((prev) => {

    const previousTopic =
      prev.byTopic?.[topic] || {
        attempts: 0,
        correct: 0,
        answered: 0,
        timedOut: 0
      }

    const previousAnswered =
      Number(prev.questionsAnswered) || 0

    const previousCorrect =
      Number(prev.correct) || 0

    const previousTotal =
      Number(prev.total) || 0

    const previousTimedOut =
      Number(prev.timedOut) || 0

    return {
      ...prev,

      // Every finished quiz counts
      total:
        previousTotal + 1,

      // Selected answer = answered
      // Timeout = NOT answered
      questionsAnswered:
        previousAnswered +
        (didTimeOut ? 0 : 1),

      // Correct selected answer
      correct:
        previousCorrect +
        (isCorrect ? 1 : 0),

      // Timeout count
      timedOut:
        previousTimedOut +
        (didTimeOut ? 1 : 0),

      byTopic: {
        ...prev.byTopic,

        [topic]: {
          attempts:
            (Number(previousTopic.attempts) || 0) + 1,

          answered:
            (Number(previousTopic.answered) || 0) +
            (didTimeOut ? 0 : 1),

          correct:
            (Number(previousTopic.correct) || 0) +
            (isCorrect ? 1 : 0),

          timedOut:
            (Number(previousTopic.timedOut) || 0) +
            (didTimeOut ? 1 : 0)
        }
      }
    }
  })
}



  // =====================================================
  // STREAK
  // =====================================================

  const getDateKey =
    (timestamp) => {

      const date =
        new Date(timestamp)

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


  const learningDays =
    [
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
        learningDays.length ===
        0
      ) {
        return 0
      }


      const dates =
        new Set(
          learningDays
        )


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
        yesterday.getDate() -
        1
      )


      const yesterdayKey =
        getDateKey(
          yesterday.getTime()
        )


      let currentDate


      if (
        dates.has(
          todayKey
        )
      ) {

        currentDate =
          today

      } else if (
        dates.has(
          yesterdayKey
        )
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


        if (
          !dates.has(key)
        ) {
          break
        }


        streak++


        const previous =
          new Date(
            currentDate
          )


        previous.setDate(
          previous.getDate() -
          1
        )


        currentDate =
          previous

      }


      return streak

    }


  const currentStreak = calculateCurrentStreak()

const todayKey = getDateKey(Date.now())

const todayTopicNames = [
  ...new Set(
    log
      .filter(
        (item) =>
          getDateKey(item.timestamp) === todayKey
      )
      .map(
        (item) =>
          item.topic.toLowerCase()
      )
  )
]

const todayTopicCount =
  todayTopicNames.length
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


  const kidMode =
    tone === "kid"


  // =====================================================
  // AUTH
  // =====================================================

  const handleAuth =
    (user) => {

      setCurrentUser(
        user
      )

      localStorage.setItem(
        "curioo-current-user",
        JSON.stringify(user)
      )

    }


  const handleLogout =
    () => {

      setCurrentUser(
        null
      )

      localStorage.removeItem(
        "curioo-current-user"
      )

    }


  // =====================================================
  // OPEN SAVED ITEM
  // =====================================================

  const openLibraryItem =
    (item) => {

      setTopic(
        item.topic
      )

      setResult(
        item.text
      )

      setRelatedTopics(
        []
      )

      setQuiz(
        null
      )

      setError(
        ""
      )

      setView(
        "home"
      )

    }
    // ==========================================
  // 1. WELCOME PAGE
  // ==========================================

  if (showWelcome) {
    return (
      <WelcomePage
        onStart={() => setShowWelcome(false)}
        dark={dark}
      />
    )
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
  // MAIN
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


        <div className="sidebar-navigation">

          <p className="sidebar-section-title">
            Workspace
          </p>
          <br />

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
            <br/>
              <small>
                Track your learning
              </small>

            </div>

          </button>


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
                (
                  item,
                  index
                ) => (

                  <button
                    key={item.id}
                    onClick={() => {

                      setTopic(
                        item.topic
                      )

                      setResult(
                        item.text
                      )

                      setView(
                        "home"
                      )

                      setQuiz(
                        null
                      )

                      setError(
                        ""
                      )

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
              onClick={
                handleLogout
              }
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
          {thisWeekCount} this week ·{" "}
          🔥 {currentStreak} day streak

        </p>

      </header>


      {/* =================================================
          VIEWS
          ================================================= */}

      {view === "favorites" ? (

        <FavoritesPage
          favorites={
            favorites
          }

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

            setError(
              ""
            )

            setView(
              "home"
            )

          }}
        />

      ) : view === "progress" ? (

        <ProgressPage
            progress={progress}
            log={log}
            dailyGoal={dailyGoal}
            todayTopics={todayTopicCount}
            streak={currentStreak}
            onGoalChange={setDailyGoal}
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
                onPick={(
                  picked
                ) => {

                  setTopic(
                    picked
                  )

                  handleExplain(
                    picked
                  )

                }}
              />

            </div>


            <SearchBar
              topic={
                topic
              }

              setTopic={
                setTopic
              }

              onExplain={() =>
                handleExplain()
              }

              loading={
                loading
              }

              kidMode={
                kidMode
              }

              history={
                history
              }
            />


            <ToneToggle
              tone={
                tone
              }

              setTone={
                setTone
              }
            />

          </div>


          <CategoryBrowser
            onPick={(
              picked
            ) => {

              setTopic(
                picked
              )

              handleExplain(
                picked
              )

            }}
          />


          {!result &&
            !loading && (

              <TopicOfDay
                onExplore={(
                  picked
                ) => {

                  setTopic(
                    picked
                  )

                  handleExplain(
                    picked
                  )

                }}
              />

            )}


          {/* =================================================
              API LOADING
              ================================================= */}

          {loading && (

            <ApiLoader />

          )}


          {/* =================================================
              API ERROR
              ================================================= */}

          {error && !loading && (

            <ApiError
              message={
                error
              }

              onRetry={
                handleRetry
              }
            />

          )}


          {/* =================================================
              RESULT
              ================================================= */}

          {result && !loading && (

            <div className="max-w-xl mx-auto">

              <ResultCard

                text={
                  result
                }

                onFavorite={() =>
                  toggleFavorite({
                    topic,
                    text:
                      result
                  })
                }
                onLearning={startLearningMode}
                learningLoading={explainAgainLoading}
                onExplainAgain={explainAgain}
                isFavorite={
                  favorites.some(
                    (f) =>
                      f.topic ===
                      topic
                  )
                }

                onRegenerate={() =>
                  handleExplain(
                    topic
                  )
                }

                regenerating={
                  loading
                }

                relatedTopics={
                  relatedTopics
                }

                onRelatedClick={(
                  picked
                ) => {

                  setTopic(
                    picked
                  )

                  handleExplain(
                    picked
                  )

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
                        text:
                          result
                      })
                    }

                    className="curioo-save-button"
                  >
                    ⭐{" "}
                    {favorites.some(
                      (f) =>
                        f.topic ===
                        topic
                    )
                      ? "Favorited"
                      : "Favorite"}
                  </button>


                  {/* BOOKMARK */}

                  <button
                    onClick={
                      toggleBookmark
                    }

                    className="curioo-save-button"
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

                    className="curioo-save-button"
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


                {/* COLLECTION */}

                <div className="mt-4 pt-4 border-t border-line/10 dark:border-line-dark/10">

                  <p className="text-xs font-mono uppercase tracking-wider text-ink/40 dark:text-paper-dark/40 mb-3">
                    Save to collection
                  </p>


                  <div className="flex flex-wrap gap-2">

                    {collections.map(
                      (
                        collection
                      ) => {

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
                            {
                              collection.name
                            }

                            {alreadySaved &&
                              " ✓"}

                          </button>

                        )

                      }
                    )}


                    <button
                      onClick={() =>
                        setView(
                          "library"
                        )
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
          {learningMode && lesson.length > 0 && (
             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
              <div className="w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-3xl border border-line/20 dark:border-line-dark/20 bg-panel dark:bg-blueprint-panel p-6 shadow-2xl">

                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="font-display text-xs text-ink/50 dark:text-paper-dark/50">
                      🎓 learning mode
                    </p>

                    <h2 className="text-xl font-semibold mt-1">
                      {topic}
                    </h2>
                  </div>

                  <button
                    onClick={() => setLearningMode(false)}
                    className="text-sm opacity-60 hover:opacity-100"
                  >
                    close
                  </button>
                </div>

                <div className="mb-5">
                  <div className="flex justify-between text-xs mb-2 opacity-60">
                    <span>
                      Step {lessonStep + 1} of {lesson.length}
                    </span>

                    <span>
                      {Math.round(
                        ((lessonStep + 1) / lesson.length) * 100
                      )}%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-ink/10 dark:bg-paper-dark/10 overflow-hidden">
                    <div
                      className="h-full bg-amber transition-all duration-300"
                      style={{
                        width: `${
                          ((lessonStep + 1) / lesson.length) * 100
                        }%`
                      }}
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-line/20 dark:border-line-dark/20 p-5 min-h-[180px]">
                  <p className="font-display text-sm opacity-50 mb-3">
                    Step {lessonStep + 1}
                  </p>

                  <p className="font-body text-lg leading-relaxed">
                    {lesson[lessonStep]}
                  </p>
                </div>

                <div className="flex justify-between mt-5">

                  <button
                    disabled={lessonStep === 0}
                    onClick={() =>
                      setLessonStep((prev) => prev - 1)
                    }
                    className="px-4 py-2 rounded-xl border border-line/30 dark:border-line-dark/30 disabled:opacity-30"
                  >
                    ← Previous
                  </button>

                  {lessonStep < lesson.length - 1 ? (
                    <button
                      onClick={() =>
                        setLessonStep((prev) => prev + 1)
                      }
                      className="px-5 py-2 rounded-xl bg-amber text-white hover:scale-105 transition-transform"
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      onClick={() => setLearningMode(false)}
                      className="px-5 py-2 rounded-xl bg-amber text-white hover:scale-105 transition-transform"
                    >
                      ✓ Finish
                    </button>
                  )}

                </div>
              </div>
            </div>
          )}

          {/* =================================================
              QUIZ
              ================================================= */}

          {quiz && (

            <QuizCard
              quiz={
                quiz
              }

              topic={
                topic
              }
              difficulty={difficulty} 
              onClose={() =>
                setQuiz(
                  null
                )
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