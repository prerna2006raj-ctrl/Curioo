import React from "react";

function WelcomePage({ onStart, dark = false }) {
  const examples = [
    "How does WiFi work?",
    "How do rainbows form?",
    "How does GPS work?",
    "How does a refrigerator work?",
    "How do airplanes fly?",
    "How does a solar panel work?",
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        dark ? "bg-[#07151c] text-[#e8f1ef]" : "bg-[#f6f7f4] text-[#17211c]"
      }`}
      style={{
        fontFamily: "DM Sans, sans-serif",
      }}
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      {/* =====================================================
    BACKGROUND
===================================================== */}

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: dark
            ? `radial-gradient(circle, rgba(170,165,75,0.55) 2px, transparent 2px)`
            : `radial-gradient(circle, rgba(236,170,210,0.55) 2px, transparent 2px)`,
          backgroundSize: "26px 26px",
        }}
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative z-10">
        {/* =====================================================
    NAVBAR
===================================================== */}

        <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-center">
          <div
            className={`text-6xl font-semibold tracking-tight ${
              dark ? "text-[#eef7f5]" : "text-[#18242a]"
            }`}
            style={{
              fontFamily: "Georgia, serif",
            }}
          >
            <br />
            ✦Curioo
          </div>
        </nav>

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="max-w-5xl mx-auto px-6 pt-16 pb-14 text-center">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-7 border ${
              dark
                ? "bg-[#10313b] text-[#c5ddda] border-[#244b54]"
                : "bg-white text-[#65736c] border-[#e1e6e2]"
            }`}
          >
            ✨ AI-powered curiosity explorer
          </div>

          <h1
            className="text-4xl md:text-4xl font-semibold tracking-tight leading-tight"
            style={{
              fontFamily: "Georgia, serif",
            }}
          >
            Understand
            <br />
            <span className={dark ? "text-[#9bc8bd]" : "text-[#397468]"}>
              how things work.
            </span>
          </h1>

          <p
            className={`max-w-2xl mx-auto mt-7 text-lg leading-8 ${
              dark ? "text-[#a8bebd]" : "text-[#65736c]"
            }`}
          >
            Curioo turns your curiosity into simple, understandable
            explanations. Ask how something works, choose your learning style,
            and discover the idea behind it.
          </p>

          {/* MAIN CTA */}

          <button
            onClick={onStart}
            className={`mt-9 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:-translate-y-1 ${
              dark
                ? "bg-[#397468] text-white hover:bg-[#438578]"
                : "bg-[#f4a9cc] text-white hover:bg-[#ed91ba]"
            }`}
            style={{
              boxShadow: dark
                ? "0 15px 40px rgba(0,0,0,.28)"
                : "0 15px 35px rgba(236,151,191,.22)",
            }}
          >
            Start exploring ✦
          </button>
        </section>

        {/* =====================================================
            EXAMPLE QUESTIONS
        ===================================================== */}

        <section className="max-w-5xl mx-auto px-6 pb-16">
          <div className="text-center mb-7">
            <p
              className={`text-sm uppercase tracking-[0.2em] ${
                dark ? "text-[#839c99]" : "text-[#87928c]"
              }`}
            >
              Ask questions like
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {examples.map((example, index) => (
              <div
                key={example}
                className={`rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1 ${
                  dark
                    ? "bg-[#0d2933]/90 border-[#28505a] hover:border-[#477b7a]"
                    : "bg-white/90 border-[#e5dfe1] hover:border-[#efb2cf]"
                }`}
              >
                <div
                  className={`text-xs mb-3 ${
                    dark ? "text-[#a2a05d]" : "text-[#c58b32]"
                  }`}
                >
                  0{index + 1}
                </div>

                <p
                  className={`text-lg ${
                    dark ? "text-[#eef7f5]" : "text-[#18242a]"
                  }`}
                  style={{
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {example}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            HOW IT WORKS
        ===================================================== */}

        <section
          className={`py-20 border-y ${
            dark
              ? "border-[#23434b] bg-[#09222b]/80"
              : "border-[#eee0e6] bg-[#fff8fb]/80"
          }`}
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <p
                className={`text-sm uppercase tracking-[0.2em] mb-3 ${
                  dark ? "text-[#819996]" : "text-[#87928c]"
                }`}
              >
                How Curioo works
              </p>

              <h2
                className="text-3xl md:text-4xl font-semibold"
                style={{
                  fontFamily: "Georgia, serif",
                }}
              >
                From curiosity to understanding.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <Step
                number="01"
                icon="💭"
                title="Think"
                text="Choose something you've always wondered about."
                dark={dark}
              />

              <Step
                number="02"
                icon="🔎"
                title="Ask"
                text='Ask a question beginning with "How does..."'
                dark={dark}
              />

              <Step
                number="03"
                icon="🧠"
                title="Understand"
                text="Get an explanation in a style that suits you."
                dark={dark}
              />

              <Step
                number="04"
                icon="🎯"
                title="Test"
                text="Take a quick quiz to see what you learned."
                dark={dark}
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            FEATURES
        ===================================================== */}

        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p
              className={`text-sm uppercase tracking-[0.2em] mb-3 ${
                dark ? "text-[#819996]" : "text-[#87928c]"
              }`}
            >
              What you can do
            </p>

            <h2
              className="text-3xl md:text-4xl font-semibold"
              style={{
                fontFamily: "Georgia, serif",
              }}
            >
              Learn without making it complicated.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Feature
              icon="🤖"
              title="AI Explanations"
              text="Understand the working principle behind everyday technology, science and natural phenomena."
              dark={dark}
            />

            <Feature
              icon="🎨"
              title="Two Learning Styles"
              text="Choose between 'like I'm 5' for simple explanations or 'like an engineer' for deeper technical understanding."
              dark={dark}
            />

            <Feature
              icon="🧩"
              title="Quick Quizzes"
              text="Test your understanding after learning with a timed interactive quiz."
              dark={dark}
            />

            <Feature
              icon="📊"
              title="Learning Progress"
              text="Keep track of your quiz performance and see which topics you understand best."
              dark={dark}
            />
          </div>
        </section>

        {/* =====================================================
            SUPPORTED TOPICS
        ===================================================== */}

        <section className="max-w-5xl mx-auto px-6 pb-20">
          <div
            className={`rounded-3xl p-8 md:p-12 border text-center ${
              dark
                ? "bg-[#102d36] border-[#2a5058]"
                : "bg-[#fff8ee] border-[#eadfc9]"
            }`}
          >
            <div className="text-3xl mb-4">🌍</div>

            <h2
              className="text-3xl font-semibold mb-4"
              style={{
                fontFamily: "Georgia, serif",
              }}
            >
              Built for curiosity.
            </h2>

            <p
              className={`max-w-2xl mx-auto leading-7 ${
                dark ? "text-[#a8bebd]" : "text-[#65736c]"
              }`}
            >
              Explore how technology, science, nature, space, the human body and
              everyday things work.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mt-7">
              {[
                "Science",
                "Technology",
                "Space",
                "Nature",
                "Human Body",
                "Everyday Things",
              ].map((topic) => (
                <span
                  key={topic}
                  className={`px-4 py-2 rounded-full text-sm ${
                    dark
                      ? "bg-[#173a43] text-[#c1dcd8]"
                      : "bg-white border border-[#d8dfda] text-[#506159]"
                  }`}
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="text-center px-6 pb-20">
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{
              fontFamily: "Georgia, serif",
            }}
          >
            Ready to get curious?
          </h2>

          <p className={`mt-3 ${dark ? "text-[#91aaa6]" : "text-[#76827c]"}`}>
            Start with one question.
          </p>

          <button
            onClick={onStart}
            className={`mt-7 px-8 py-4 rounded-2xl text-white font-semibold hover:-translate-y-1 transition-all ${
              dark
                ? "bg-[#397468] hover:bg-[#438578]"
                : "bg-[#f4a9cc] hover:bg-[#ed91ba]"
            }`}
          >
            Explore Curioo →
          </button>
        </section>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <footer
          className={`text-center py-7 border-t text-sm ${
            dark
              ? "border-[#23434b] text-[#718b88]"
              : "border-[#e2e6e3] text-[#8a948e]"
          }`}
        >
          ✦ Curioo · understand how anything works
        </footer>
      </div>
    </div>
  );
}

/* =========================================================
   STEP COMPONENT
========================================================= */

function Step({ number, icon, title, text, dark }) {
  return (
    <div
      className={`rounded-2xl p-6 border ${
        dark ? "bg-[#0d2933] border-[#28505a]" : "bg-white border-[#e5dfe1]"
      }`}
    >
      <div className="flex items-center justify-between mb-5">
        <span className="text-2xl">{icon}</span>

        <span
          className={`text-xs tracking-widest ${
            dark ? "text-[#78928f]" : "text-[#9ba59f]"
          }`}
        >
          {number}
        </span>
      </div>

      <h3 className="font-semibold text-lg mb-2">{title}</h3>

      <p
        className={`text-sm leading-6 ${
          dark ? "text-[#94aaa6]" : "text-[#727d77]"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   FEATURE COMPONENT
========================================================= */

function Feature({ icon, title, text, dark }) {
  return (
    <div
      className={`rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 ${
        dark
          ? "bg-[#0d2933] border-[#28505a] hover:border-[#477b7a]"
          : "bg-white border-[#e5dfe1] hover:border-[#efb2cf]"
      }`}
    >
      <div className="text-3xl mb-5">{icon}</div>

      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      <p className={`leading-7 ${dark ? "text-[#94aaa6]" : "text-[#727d77]"}`}>
        {text}
      </p>
    </div>
  );
}

export default WelcomePage;
