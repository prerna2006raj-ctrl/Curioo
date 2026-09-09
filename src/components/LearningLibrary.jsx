import { useState } from "react"

function LearningLibrary({
  collections,
  setCollections,
  bookmarks,
  setBookmarks,
  learnLater,
  setLearnLater,
  onBack,
  onOpenExplanation
}) {
  const [activeTab, setActiveTab] = useState("collections")
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [newCollection, setNewCollection] = useState("")
  const [editingCollection, setEditingCollection] = useState(null)
  const [editName, setEditName] = useState("")

  // =========================================
  // CREATE COLLECTION
  // =========================================

  const createCollection = () => {
    const name = newCollection.trim()

    if (!name) return

    const exists = collections.some(
      (collection) =>
        collection.name.toLowerCase() === name.toLowerCase()
    )

    if (exists) {
      alert("A collection with this name already exists.")
      return
    }

    setCollections((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        items: []
      }
    ])

    setNewCollection("")
  }

  // =========================================
  // DELETE COLLECTION
  // =========================================

  const deleteCollection = (id) => {
    const confirmed = window.confirm(
      "Delete this collection? The saved explanations inside it will also be removed."
    )

    if (!confirmed) return

    setCollections((prev) =>
      prev.filter((collection) => collection.id !== id)
    )

    if (selectedCollection === id) {
      setSelectedCollection(null)
    }
  }

  // =========================================
  // RENAME COLLECTION
  // =========================================

  const startRename = (collection) => {
    setEditingCollection(collection.id)
    setEditName(collection.name)
  }

  const saveRename = (id) => {
    const name = editName.trim()

    if (!name) return

    setCollections((prev) =>
      prev.map((collection) =>
        collection.id === id
          ? {
              ...collection,
              name
            }
          : collection
      )
    )

    setEditingCollection(null)
    setEditName("")
  }

  // =========================================
  // REMOVE FROM COLLECTION
  // =========================================

  const removeFromCollection = (
    collectionId,
    itemId
  ) => {
    setCollections((prev) =>
      prev.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              items: collection.items.filter(
                (item) => item.id !== itemId
              )
            }
          : collection
      )
    )
  }

  // =========================================
  // REMOVE BOOKMARK
  // =========================================

  const removeBookmark = (id) => {
    setBookmarks((prev) =>
      prev.filter((item) => item.id !== id)
    )
  }

  // =========================================
  // REMOVE LEARN LATER
  // =========================================

  const removeLearnLater = (id) => {
    setLearnLater((prev) =>
      prev.filter((item) => item.id !== id)
    )
  }

  // =========================================
  // OPEN EXPLANATION
  // =========================================

  const openItem = (item) => {
    if (onOpenExplanation) {
      onOpenExplanation(item)
    }
  }

  // =========================================
  // COLLECTION VIEW
  // =========================================

  if (selectedCollection) {
    const collection = collections.find(
      (item) => item.id === selectedCollection
    )

    if (!collection) {
      setSelectedCollection(null)
      return null
    }

    return (
      <main className="max-w-5xl mx-auto py-8">

        <button
          onClick={() => setSelectedCollection(null)}
          className="mb-6 px-4 py-2 rounded-xl border border-line/30 dark:border-line-dark/30 bg-panel dark:bg-blueprint-panel hover:-translate-x-1 transition-all"
        >
          ← Back to collections
        </button>

        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-ink/40 dark:text-paper-dark/40 mb-2">
            Learning Collection
          </p>

          <h1 className="text-3xl font-display font-semibold">
            📚 {collection.name}
          </h1>

          <p className="mt-2 text-sm text-ink/50 dark:text-paper-dark/50">
            {collection.items.length} saved explanation
            {collection.items.length !== 1 ? "s" : ""}
          </p>
        </div>

        {collection.items.length === 0 ? (
          <div className="rounded-2xl border border-line/20 dark:border-line-dark/20 bg-panel dark:bg-blueprint-panel p-12 text-center">

            <div className="text-4xl mb-4">
              📖
            </div>

            <h2 className="text-xl font-display mb-2">
              This collection is empty
            </h2>

            <p className="text-sm text-ink/50 dark:text-paper-dark/50">
              Explore a topic and save its explanation
              here.
            </p>

          </div>
        ) : (
          <div className="grid gap-4">

            {collection.items.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-line/20 dark:border-line-dark/20 bg-panel dark:bg-blueprint-panel p-5 hover:shadow-lg transition-all"
              >

                <div className="flex items-start justify-between gap-4">

                  <button
                    onClick={() => openItem(item)}
                    className="text-left flex-1"
                  >
                    <h2 className="font-display text-lg font-semibold">
                      {item.topic}
                    </h2>

                    <p className="mt-2 text-sm text-ink/60 dark:text-paper-dark/60 line-clamp-3">
                      {item.text}
                    </p>
                  </button>

                  <button
                    onClick={() =>
                      removeFromCollection(
                        collection.id,
                        item.id
                      )
                    }
                    className="px-3 py-2 rounded-lg text-sm hover:bg-red-50 dark:hover:bg-red-950/30"
                    title="Remove"
                  >
                    🗑️
                  </button>

                </div>

                <div className="mt-4 text-xs text-ink/40 dark:text-paper-dark/40">
                  Saved{" "}
                  {new Date(
                    item.savedAt
                  ).toLocaleDateString()}
                </div>

              </article>
            ))}

          </div>
        )}

      </main>
    )
  }

  return (
    <main className="max-w-5xl mx-auto py-8">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-8">

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ink/40 dark:text-paper-dark/40 mb-2">
            Your Learning Library
          </p>

          <h1 className="text-3xl font-display font-semibold">
            📚 Library
          </h1>

          <p className="mt-2 text-sm text-ink/50 dark:text-paper-dark/50">
            Organize the explanations you want to remember.
          </p>
        </div>

        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl border border-line/30 dark:border-line-dark/30 bg-panel dark:bg-blueprint-panel hover:-translate-y-0.5 transition-all"
        >
          ← Home
        </button>

      </div>


      {/* TABS */}

      <div className="flex gap-2 p-1 mb-8 rounded-xl bg-black/5 dark:bg-white/5 w-fit">

        <button
          onClick={() => setActiveTab("collections")}
          className={`px-5 py-2 rounded-lg text-sm transition-all ${
            activeTab === "collections"
              ? "bg-white dark:bg-blueprint-panel shadow-sm font-semibold"
              : "text-ink/60 dark:text-paper-dark/60"
          }`}
        >
          📚 Collections
        </button>

        <button
          onClick={() => setActiveTab("bookmarks")}
          className={`px-5 py-2 rounded-lg text-sm transition-all ${
            activeTab === "bookmarks"
              ? "bg-white dark:bg-blueprint-panel shadow-sm font-semibold"
              : "text-ink/60 dark:text-paper-dark/60"
          }`}
        >
          🔖 Bookmarks
          <span className="ml-2 opacity-50">
            {bookmarks.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("later")}
          className={`px-5 py-2 rounded-lg text-sm transition-all ${
            activeTab === "later"
              ? "bg-white dark:bg-blueprint-panel shadow-sm font-semibold"
              : "text-ink/60 dark:text-paper-dark/60"
          }`}
        >
          🕐 Learn Later
          <span className="ml-2 opacity-50">
            {learnLater.length}
          </span>
        </button>

      </div>


      {/* =========================================
          COLLECTIONS
          ========================================= */}

      {activeTab === "collections" && (
        <section>

          {/* CREATE */}

          <div className="rounded-2xl border border-line/20 dark:border-line-dark/20 bg-panel dark:bg-blueprint-panel p-5 mb-6">

            <h2 className="font-display font-semibold mb-3">
              Create a collection
            </h2>

            <div className="flex gap-2">

              <input
                value={newCollection}
                onChange={(e) =>
                  setNewCollection(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    createCollection()
                  }
                }}
                placeholder="e.g. Data Science"
                className="flex-1 px-4 py-3 rounded-xl border border-line/30 dark:border-line-dark/30 bg-paper dark:bg-blueprint outline-none"
              />

              <button
                onClick={createCollection}
                className="px-5 py-3 rounded-xl bg-ink text-white dark:bg-paper-dark dark:text-ink hover:-translate-y-0.5 transition-all"
              >
                + Create
              </button>

            </div>

          </div>


          {/* COLLECTION GRID */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {collections.map((collection) => (
              <article
                key={collection.id}
                className="group relative rounded-2xl border border-line/20 dark:border-line-dark/20 bg-panel dark:bg-blueprint-panel p-5 hover:-translate-y-1 hover:shadow-xl transition-all"
              >

                <button
                  onClick={() =>
                    setSelectedCollection(collection.id)
                  }
                  className="text-left w-full"
                >

                  <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-2xl mb-4">
                    📚
                  </div>

                  <h2 className="font-display font-semibold">
                    {collection.name}
                  </h2>

                  <p className="text-xs text-ink/50 dark:text-paper-dark/50 mt-1">
                    {collection.items.length} saved
                  </p>

                </button>


                {/* ACTIONS */}

                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() =>
                      startRename(collection)
                    }
                    className="flex-1 px-2 py-2 rounded-lg border border-line/20 dark:border-line-dark/20 text-xs hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    Rename
                  </button>

                  <button
                    onClick={() =>
                      deleteCollection(collection.id)
                    }
                    className="px-3 py-2 rounded-lg border border-red-200 dark:border-red-900/30 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    🗑
                  </button>

                </div>

              </article>
            ))}

          </div>


          {/* RENAME MODAL */}

          {editingCollection && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">

              <div className="w-full max-w-md rounded-2xl bg-white dark:bg-blueprint-panel border border-line/20 dark:border-line-dark/20 p-6 shadow-2xl">

                <h2 className="text-xl font-display font-semibold mb-4">
                  Rename collection
                </h2>

                <input
                  autoFocus
                  value={editName}
                  onChange={(e) =>
                    setEditName(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveRename(editingCollection)
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-line/30 dark:border-line-dark/30 bg-paper dark:bg-blueprint outline-none"
                />

                <div className="flex justify-end gap-2 mt-5">

                  <button
                    onClick={() => {
                      setEditingCollection(null)
                      setEditName("")
                    }}
                    className="px-4 py-2 rounded-xl border border-line/20 dark:border-line-dark/20"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() =>
                      saveRename(editingCollection)
                    }
                    className="px-4 py-2 rounded-xl bg-ink text-white dark:bg-paper-dark dark:text-ink"
                  >
                    Save
                  </button>

                </div>

              </div>

            </div>
          )}

        </section>
      )}


      {/* =========================================
          BOOKMARKS
          ========================================= */}

      {activeTab === "bookmarks" && (
        <section>

          {bookmarks.length === 0 ? (
            <EmptyState
              icon="🔖"
              title="No bookmarks yet"
              text="Bookmark explanations that you want to quickly access later."
            />
          ) : (
            <div className="grid gap-4">

              {bookmarks.map((item) => (
                <LibraryItem
                  key={item.id}
                  item={item}
                  icon="🔖"
                  onOpen={() => openItem(item)}
                  onRemove={() =>
                    removeBookmark(item.id)
                  }
                />
              ))}

            </div>
          )}

        </section>
      )}


      {/* =========================================
          LEARN LATER
          ========================================= */}

      {activeTab === "later" && (
        <section>

          {learnLater.length === 0 ? (
            <EmptyState
              icon="🕐"
              title="Nothing to learn later"
              text="Mark explanations as Learn Later when you want to study them again."
            />
          ) : (
            <div className="grid gap-4">

              {learnLater.map((item) => (
                <LibraryItem
                  key={item.id}
                  item={item}
                  icon="🕐"
                  onOpen={() => openItem(item)}
                  onRemove={() =>
                    removeLearnLater(item.id)
                  }
                />
              ))}

            </div>
          )}

        </section>
      )}

    </main>
  )
}


/* =========================================================
   LIBRARY ITEM
   ========================================================= */

function LibraryItem({
  item,
  icon,
  onOpen,
  onRemove
}) {
  return (
    <article className="rounded-2xl border border-line/20 dark:border-line-dark/20 bg-panel dark:bg-blueprint-panel p-5 hover:shadow-lg transition-all">

      <div className="flex gap-4">

        <div className="w-11 h-11 shrink-0 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-xl">
          {icon}
        </div>

        <div className="flex-1 min-w-0">

          <button
            onClick={onOpen}
            className="text-left w-full"
          >

            <h2 className="font-display font-semibold text-lg">
              {item.topic}
            </h2>

            <p className="mt-2 text-sm text-ink/60 dark:text-paper-dark/60 line-clamp-3">
              {item.text}
            </p>

          </button>

          <div className="flex items-center justify-between mt-4">

            <span className="text-xs text-ink/40 dark:text-paper-dark/40">
              Saved{" "}
              {new Date(
                item.savedAt
              ).toLocaleDateString()}
            </span>

            <div className="flex gap-2">

              <button
                onClick={onOpen}
                className="px-3 py-1.5 rounded-lg border border-line/20 dark:border-line-dark/20 text-xs"
              >
                Open
              </button>

              <button
                onClick={onRemove}
                className="px-3 py-1.5 rounded-lg text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                Remove
              </button>

            </div>

          </div>

        </div>

      </div>

    </article>
  )
}


/* =========================================================
   EMPTY STATE
   ========================================================= */

function EmptyState({
  icon,
  title,
  text
}) {
  return (
    <div className="rounded-2xl border border-line/20 dark:border-line-dark/20 bg-panel dark:bg-blueprint-panel p-12 text-center">

      <div className="text-4xl mb-4">
        {icon}
      </div>

      <h2 className="font-display text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-sm text-ink/50 dark:text-paper-dark/50">
        {text}
      </p>

    </div>
  )
}

export default LearningLibrary