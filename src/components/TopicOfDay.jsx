const DAILY_TOPICS = [
  "how do rainbows form",
  "how does bread rise",
  "how do bees communicate",
  "how does a zipper work",
  "how do clouds stay in the sky",
  "how does sunscreen protect skin",
  "how do seasons change",
  "how does a compass work",
  "how do plants know which way is up",
  "how does a rainbow prism split light",
];

function getTopicOfDay() {
  const startOfYear = new Date(new Date().getFullYear(), 0, 0);
  const dayOfYear = Math.floor((Date.now() - startOfYear) / 86400000);
  return DAILY_TOPICS[dayOfYear % DAILY_TOPICS.length];
}

function TopicOfDay({ onExplore }) {
  const topic = getTopicOfDay();
  return (
    <div className="max-w-xl mx-auto mt-6 animate-fade-in-up bg-amber/10 border border-amber/30 rounded-md p-4 flex items-center justify-between gap-3 flex-wrap">
      <p className="font-body text-sm">
        <span className="font-display text-amber">🌟 topic of the day:</span>{" "}
        {topic}
      </p>
      <button
        onClick={() => onExplore(topic)}
        className="font-display text-xs px-3 py-1.5 rounded-sm border border-amber text-amber hover:bg-amber hover:text-blueprint transition-colors duration-150 shrink-0"
      >
        explore it
      </button>
    </div>
  );
}
export default TopicOfDay;
