function Sidebar({
  favorites,
  progress,
  recent,
  currentUser,
  view,
  setView,
  onRecentClick,
  onLogout,
  mobileOpen,
  setMobileOpen,
}) {
  const completed = progress?.completed || 0
  const correct = progress?.correct || 0

  const accuracy =
    completed > 0
      ? Math.round((correct / completed) * 100)
      : 0

  const closeMobile = () => {
    if (setMobileOpen) {
      setMobileOpen(false)
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeMobile}
        />
      )}

      {/* Mobile menu button */}
      <button
        className="sidebar-mobile-button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
      >
        ☰
      </button>

      <aside
        className={`curioo-sidebar ${
          mobileOpen ? "sidebar-open" : ""
        }`}
      >
        {/* Logo */}
        <div className="sidebar-brand">
          <div className="sidebar-logo-mark">
            <span />
            <span />
            <span />
          </div>

          <div>
            <div className="sidebar-logo-text">
              Curioo
            </div>

            <div className="sidebar-logo-subtitle">
              curiosity, explained
            </div>
          </div>

          <button
            className="sidebar-close-mobile"
            onClick={closeMobile}
            aria-label="Close navigation"
          >
            ×
          </button>
        </div>

        {/* Main navigation */}
        <div className="sidebar-section">
          <div className="sidebar-section-label">
            workspace
          </div>

          <button
            className={`sidebar-nav-item ${
              view === "home"
                ? "sidebar-nav-active"
                : ""
            }`}
            onClick={() => {
              setView("home")
              closeMobile()
            }}
          >
            <span className="sidebar-nav-icon">⌂</span>

            <span className="sidebar-nav-text">
              Explore
            </span>
          </button>

          <button
            className={`sidebar-nav-item ${
              view === "favorites"
                ? "sidebar-nav-active"
                : ""
            }`}
            onClick={() => {
              setView("favorites")
              closeMobile()
            }}
          >
            <span className="sidebar-nav-icon">
              ⭐
            </span>

            <span className="sidebar-nav-text">
              Favorites
            </span>

            <span className="sidebar-count">
              {favorites.length}
            </span>
          </button>

          <button
            className={`sidebar-nav-item ${
              view === "progress"
                ? "sidebar-nav-active"
                : ""
            }`}
            onClick={() => {
              setView("progress")
              closeMobile()
            }}
          >
            <span className="sidebar-nav-icon">
              📈
            </span>

            <span className="sidebar-nav-text">
              Progress
            </span>

            {completed > 0 && (
              <span className="sidebar-count">
                {accuracy}%
              </span>
            )}
          </button>
        </div>

        {/* Quick stats */}
        <div className="sidebar-stats">
          <div className="sidebar-stat">
            <span className="sidebar-stat-icon">
              🧠
            </span>

            <div>
              <strong>{completed}</strong>
              <span>quizzes</span>
            </div>
          </div>

          <div className="sidebar-stat">
            <span className="sidebar-stat-icon">
              🎯
            </span>

            <div>
              <strong>{accuracy}%</strong>
              <span>accuracy</span>
            </div>
          </div>
        </div>

        {/* Recent */}
        <div className="sidebar-section sidebar-recent-section">
          <div className="sidebar-section-heading">
            <span>recent</span>

            {recent.length > 0 && (
              <span className="sidebar-recent-number">
                {recent.length}
              </span>
            )}
          </div>

          {recent.length === 0 ? (
            <div className="sidebar-empty">
              <span>⌕</span>
              <p>Your explored topics will appear here.</p>
            </div>
          ) : (
            <div className="sidebar-recent-list">
              {recent.slice(0, 8).map((item, index) => (
                <button
                  key={`${item.topic}-${item.timestamp}-${index}`}
                  className="sidebar-recent-item"
                  onClick={() => {
                    onRecentClick(item.topic)
                    closeMobile()
                  }}
                  title={item.topic}
                >
                  <span className="sidebar-recent-dot" />

                  <span className="sidebar-recent-topic">
                    {item.topic}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bottom user card */}
        <div className="sidebar-bottom">
          <div className="sidebar-user-card">
            <div className="sidebar-avatar">
              {currentUser?.name
                ? currentUser.name
                    .charAt(0)
                    .toUpperCase()
                : "U"}
            </div>

            <div className="sidebar-user-info">
              <strong>
                {currentUser?.name || "Curioo explorer"}
              </strong>

              <span>
                curious mind ✦
              </span>
            </div>

            <button
              onClick={onLogout}
              className="sidebar-logout"
              title="Log out"
            >
              ↗
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar