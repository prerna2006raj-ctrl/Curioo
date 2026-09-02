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
      className="font-display text-xs tracking-wide px-3 py-1.5 rounded-sm border border-amber/50 text-amber hover:bg-amber hover:text-blueprint transition-all duration-150 hover:-rotate-1 active:scale-95"
    >
      🎲 surprise me
    </button>
  )
}
export default SurpriseButton
