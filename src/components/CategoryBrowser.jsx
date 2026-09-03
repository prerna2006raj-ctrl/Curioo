const CATEGORIES = {
  Science: ["how does gravity work", "how does electricity work", "how do magnets work"],
  Technology: ["how does WiFi work", "how does GPS work", "how does a computer chip work"],
  Space: ["how do rockets escape gravity", "how do satellites stay in orbit", "how do black holes form"],
  Nature: ["how do bees make honey", "how does photosynthesis work", "how do volcanoes erupt"],
  "Human Body": ["how does the immune system work", "how does the heart pump blood", "how do vaccines work"],
  History: [
    "how did the printing press change the world",
    "how was the pyramid of Giza built",
    "how did the internet start"
  ]
}

function CategoryBrowser({ onPick }) {
  const handleClick = (category) => {
    const topics = CATEGORIES[category]
    const random = topics[Math.floor(Math.random() * topics.length)]
    onPick(random)
  }

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="font-display text-xs tracking-wide text-ink/50 dark:text-paper-dark/50 mb-2">
        browse by category
      </h2>
      <div className="flex flex-wrap gap-2">
        {Object.keys(CATEGORIES).map((category) => (
          <button
            key={category}
            onClick={() => handleClick(category)}
            className="font-display text-xs px-3 py-1.5 rounded-sm border border-line/25 dark:border-line-dark/25 text-ink/70 dark:text-paper-dark/70 hover:border-amber hover:text-amber transition-colors duration-150"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
export default CategoryBrowser
