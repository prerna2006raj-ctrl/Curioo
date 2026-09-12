import React from "react";

export default function Sidebar({
  recent = [],
  activePage = "home",
  onNavigate,
}) {
  const handleNavigate = (page, item = null) => {
    if (onNavigate) {
      onNavigate(page, item);
    }
  };

  return (
    <aside className="sidebar" style={{ display: "flex", flexDirection: "column" }}>
      {/* =====================================================
          HEADER
          ===================================================== */}
      <div className="sidebar-header">
        <div className="sidebar-logo">✦Curioo</div>

        <hr />
      </div>

      {/* =====================================================
          WORKSPACE
          This section stays fixed.
          ===================================================== */}
      <div className="sidebar-workspace">
        <div className="sidebar-section-title">Workspace</div>

        {/* Favorites */}
        <button
          type="button"
          className={`sidebar-nav-item ${
            activePage === "favorites" ? "active" : ""
          }`}
          onClick={() => handleNavigate("favorites")}
        >
          <span className="sidebar-nav-icon">⭐</span>

          <span className="sidebar-nav-text">
            <strong>Favorites</strong>
            <small>Saved discoveries</small>
          </span>

          <span className="sidebar-count">6</span>
        </button>

        {/* Progress */}
        <button
          type="button"
          className={`sidebar-nav-item ${
            activePage === "progress" ? "active" : ""
          }`}
          onClick={() => handleNavigate("progress")}
        >
          <span className="sidebar-nav-icon">📈</span>

          <span className="sidebar-nav-text">
            <strong>Progress</strong>
            <small>Track your learning</small>
          </span>
        </button>

        {/* Library */}
        <button
          type="button"
          className={`sidebar-nav-item ${
            activePage === "library" ? "active" : ""
          }`}
          onClick={() => handleNavigate("library")}
        >
          <span className="sidebar-nav-icon">📚</span>

          <span className="sidebar-nav-text">
            <strong>Library</strong>
            <small>Collections & saved learning</small>
          </span>

          <span className="sidebar-count">0</span>
        </button>
      </div>

      {/* =====================================================
    RECENT

    IMPORTANT:
    Only the Recent list scrolls.
    The sidebar itself NEVER moves.
    ===================================================== */}

      <div className="sidebar-recent">
        <div className="sidebar-section-title">Recent</div>

        {recent.length === 0 ? (
          <div className="sidebar-empty">
            <span>🕘</span>
            <p>No recent searches yet.</p>
          </div>
        ) : (
          <div className="sidebar-recent-list">
            {recent.map((item, index) => {
              /*
          Support different possible structures
          used by App.jsx.
        */

              const topic =
                typeof item === "string"
                  ? item
                  : item?.topic ||
                    item?.query ||
                    item?.question ||
                    item?.title ||
                    "Untitled topic";

              return (
                <button
                  type="button"
                  key={item?.id ?? `${topic}-${index}`}
                  className="sidebar-recent-item"
                  onClick={() => handleNavigate("recent", item)}
                  title={topic}
                >
                  <span className="sidebar-recent-topic">{topic}</span>

                  <span className="sidebar-recent-arrow">→</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* =====================================================
          FOOTER / PROFILE
          
          This stays at the bottom and does NOT scroll.
          ===================================================== */}
      <div className="sidebar-footer" style={{ marginTop: "auto" }}>
        <div className="sidebar-profile">
          <div className="sidebar-profile-avatar">P</div>

          <div className="sidebar-profile-info">
            <strong>Prerna Raj</strong>
            <small>Curioo explorer</small>
          </div>

          <button
            type="button"
            className="sidebar-profile-action"
            title="Profile"
            onClick={() => handleNavigate("profile")}
          >
            ↗
          </button>
        </div>
      </div>
    </aside>
  );
}
