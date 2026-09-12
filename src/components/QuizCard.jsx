import { useEffect, useState } from "react";
import Confetti from "./Confetti";

const QUIZ_TIME = 60;

function QuizCard({ quiz, topic, difficulty, onClose, onComplete }) {
  const [selected, setSelected] = useState(null);

  const [showConfetti, setShowConfetti] = useState(false);

  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);

  const [timedOut, setTimedOut] = useState(false);

  // =========================================
  // FINISH QUIZ
  // =========================================

  const finishQuiz = (index, didTimeOut = false) => {
    setSelected(index);

    setTimedOut(didTimeOut);

    onComplete(index === quiz.answerIndex, didTimeOut);
  };

  // =========================================
  // TIMER
  // =========================================

  useEffect(() => {
    if (selected !== null) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          window.clearInterval(timer);

          finishQuiz(-1, true);

          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [selected]);

  // =========================================
  // CONFETTI
  // =========================================

  useEffect(() => {
    if (selected !== null && selected === quiz.answerIndex) {
      setShowConfetti(true);

      const confettiTimer = window.setTimeout(() => {
        setShowConfetti(false);
      }, 2500);

      return () => {
        window.clearTimeout(confettiTimer);
      };
    }
  }, [selected, quiz.answerIndex]);

  // =========================================
  // SELECT ANSWER
  // =========================================

  const handleSelect = (index) => {
    if (selected !== null) {
      return;
    }

    finishQuiz(index);
  };

  const timerPercent = (timeLeft / QUIZ_TIME) * 100;

  const timerWarning = timeLeft <= 10 && selected === null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      {showConfetti && <Confetti />}

      <div className="animate-pop-in w-full max-w-xl bg-panel dark:bg-blueprint-panel border border-amber/40 rounded-md p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* =====================================
            HEADER
        ===================================== */}

        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-sm tracking-wide text-amber">
            🧩 quick quiz · {difficulty || "medium"}
          </h3>

          <button
            onClick={onClose}
            className="font-display text-xs text-ink/50 dark:text-paper-dark/50 hover:text-amber transition-colors"
          >
            close
          </button>
        </div>

        {/* =====================================
            TIMER
        ===================================== */}

        <div className="mb-5">
          <div className="flex items-center justify-between font-display text-xs mb-1">
            <span className="text-ink/50 dark:text-paper-dark/50">
              time remaining
            </span>

            <span
              className={
                timerWarning ? "text-red-500 font-semibold" : "text-amber"
              }
            >
              ⏱️ {timeLeft}s
            </span>
          </div>

          <div className="h-2 rounded-full bg-line/10 dark:bg-line-dark/10 overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${
                timerWarning ? "bg-red-500" : "bg-amber"
              }`}
              style={{
                width: `${timerPercent}%`,
              }}
            />
          </div>
        </div>

        {/* =====================================
            QUESTION
        ===================================== */}

        <p className="font-body text-base mb-5">{quiz.question}</p>

        {/* =====================================
            OPTIONS
        ===================================== */}

        <div className="flex flex-col gap-3">
          {quiz.options.map((option, index) => {
            const isCorrect = index === quiz.answerIndex;

            const isSelected = index === selected;

            let stateClasses =
              "border-line/25 dark:border-line-dark/25 hover:border-amber";

            if (selected !== null) {
              if (isCorrect) {
                stateClasses =
                  "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
              } else if (isSelected) {
                stateClasses =
                  "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400";
              } else {
                stateClasses =
                  "border-line/15 dark:border-line-dark/15 opacity-60";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={selected !== null}
                className={`font-body text-left px-4 py-3 rounded-sm border transition-all duration-150 ${stateClasses}`}
              >
                <div className="flex items-start gap-3">
                  <span className="font-display">
                    {String.fromCharCode(65 + index)}.
                  </span>

                  <span>{option}</span>
                </div>

                {/* =================================
                    EXPLANATION
                ================================= */}

                {selected !== null &&
                  quiz.explanations &&
                  quiz.explanations[index] && (
                    <div
                      className={`mt-3 pt-3 border-t text-xs leading-relaxed ${
                        isCorrect ? "border-green-500/30" : "border-red-500/30"
                      }`}
                    >
                      <strong>
                        {isCorrect
                          ? "Why this is correct:"
                          : "Why this is not correct:"}
                      </strong>

                      <p className="mt-1 opacity-80">
                        {quiz.explanations[index]}
                      </p>
                    </div>
                  )}
              </button>
            );
          })}
        </div>

        {/* =====================================
            RESULT
        ===================================== */}

        {selected !== null && (
          <div className="mt-5 rounded-md border border-line/20 dark:border-line-dark/20 p-4">
            {timedOut ? (
              <>
                <p className="font-display text-sm text-red-500">
                  ⏰ Time's up!
                </p>

                <p className="font-body text-sm mt-2">
                  The correct answer is highlighted above.
                </p>
              </>
            ) : selected === quiz.answerIndex ? (
              <>
                <p className="font-display text-sm text-green-600 dark:text-green-400">
                  🎉 Correct! Great job!
                </p>

                <p className="font-body text-xs mt-1 opacity-70">
                  You got the answer right.
                </p>
              </>
            ) : (
              <>
                <p className="font-display text-sm text-red-500">
                  ❌ Not quite!
                </p>

                <p className="font-body text-xs mt-1 opacity-70">
                  The correct answer is highlighted above.
                </p>
              </>
            )}

            <p className="font-body text-xs text-ink/50 dark:text-paper-dark/50 mt-3">
              {topic} · {selected === quiz.answerIndex ? "1 point" : "0 points"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizCard;
