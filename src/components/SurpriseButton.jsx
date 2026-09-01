const TOPICS = [
  "how does WiFi work",
  "how does a vaccine work",
  "how does a lock and key work",
  "how does a refrigerator keep things cold",
  "how does an airplane fly",
  "how does a microwave heat food",
  "how does GPS know your location",
  "how does a battery store energy",
  "how does the internet actually work",
  "how does a camera capture an image"
]

function SurpriseButton({ onPick }) {
  const handleClick = () => {
    const random = TOPICS[Math.floor(Math.random() * TOPICS.length)]
    onPick(random)
  }

  return (
    <button
      onClick={handleClick}
      className="px-4 py-1.5 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-800 transition-transform duration-150 hover:scale-105 hover:-rotate-2 active:scale-95"
    >
      🎲 Surprise Me
    </button>
  )
}
export default SurpriseButton
