import React from "react"

function WelcomePage({ onStart, dark = false }) {
  const examples = [
    "How does WiFi work?",
    "How do rainbows form?",
    "How does GPS work?",
    "How does a refrigerator work?",
    "How do airplanes fly?",
    "How does a solar panel work?"
  ]

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        dark
          ? "bg-[#07151c] text-[#e8f1ef]"
          : "bg-[#f6f7f4] text-[#17211c]"
      }`}
      style={{
        fontFamily: "DM Sans, sans-serif"
      }}
    >

      {/* Background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: dark
            ? `
              linear-gradient(rgba(120,160,160,.045) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120,160,160,.045) 1px, transparent 1px)
            `
            : `
              linear-gradient(rgba(49,92,82,.045) 1px, transparent 1px),
              linear-gradient(90deg, rgba(49,92,82,.045) 1px, transparent 1px)
            `,
          backgroundSize: "38px 38px"
        }}
      />

      {/* Main content */}
      <div className="relative z-10">

        {/* Navbar */}
        <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">

          <div
            className="text-xl font-semibold tracking-tight"
            style={{
              fontFamily: "Georgia, serif"
            }}
          >
            ✦Curioo
          </div>

          <button
            onClick={onStart}
            className={`px-5 py-2.5 rounded-full border transition-all duration-200 ${
              dark
                ? "border-[#6d8f91] hover:bg-[#123039]"
                : "border-[#cbd5cf] bg-white hover:border-[#315c52] hover:text-[#315c52]"
            }`}
          >
            Start exploring →
          </button>

        </nav>


        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-14 text-center">

          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-7 ${
              dark
                ? "bg-[#102a31] text-[#b8d4d0]"
                : "bg-white text-[#557067] border border-[#d9e0db]"
            }`}
          >
            ✨ AI-powered curiosity explorer
          </div>


          <h1
            className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight"
            style={{
              fontFamily: "Georgia, serif"
            }}
          >
            Understand
            <br />

            <span
              className={
                dark
                  ? "text-[#91b9b0]"
                  : "text-[#315c52]"
              }
            >
              how things work.
            </span>
          </h1>


          <p
            className={`max-w-2xl mx-auto mt-7 text-lg leading-8 ${
              dark
                ? "text-[#a7b9b7]"
                : "text-[#65736c]"
            }`}
          >
            Curioo turns your curiosity into simple,
            understandable explanations. Ask how something
            works, choose your learning style, and discover
            the idea behind it.
          </p>


          <button
            onClick={onStart}
            className={`mt-9 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:-translate-y-1 ${
              dark
                ? "bg-[#315c52] text-white hover:bg-[#3e7165]"
                : "bg-[#315c52] text-white hover:bg-[#254c43]"
            }`}
            style={{
              boxShadow: dark
                ? "0 15px 40px rgba(0,0,0,.25)"
                : "0 15px 35px rgba(49,92,82,.18)"
            }}
          >
            Start exploring ✦
          </button>

        </section>


        {/* Example questions */}
        <section className="max-w-5xl mx-auto px-6 pb-16">

          <div className="text-center mb-7">

            <p
              className={`text-sm uppercase tracking-[0.2em] ${
                dark
                  ? "text-[#78928f]"
                  : "text-[#87928c]"
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
                    ? "bg-[#0d2229]/80 border-[#29434a] hover:border-[#557a78]"
                    : "bg-white/85 border-[#dce2dd] hover:border-[#9daf a7]".replace(" ", "")
                }`}
              >

                <div
                  className={`text-xs mb-3 ${
                    dark
                      ? "text-[#78928f]"
                      : "text-[#9a6720]"
                  }`}
                >
                  0{index + 1}
                </div>

                <p
                  className="text-lg"
                  style={{
                    fontFamily: "Georgia, serif"
                  }}
                >
                  {example}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* How it works */}
        <section
          className={`py-20 border-y ${
            dark
              ? "border-[#233a40] bg-[#091b22]/70"
              : "border-[#dde3de] bg-white/50"
          }`}
        >

          <div className="max-w-5xl mx-auto px-6">

            <div className="text-center mb-12">

              <p
                className={`text-sm uppercase tracking-[0.2em] mb-3 ${
                  dark
                    ? "text-[#78928f]"
                    : "text-[#87928c]"
                }`}
              >
                How Curioo works
              </p>

              <h2
                className="text-3xl md:text-4xl font-semibold"
                style={{
                  fontFamily: "Georgia, serif"
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


        {/* Features */}
        <section className="max-w-5xl mx-auto px-6 py-20">

          <div className="text-center mb-12">

            <p
              className={`text-sm uppercase tracking-[0.2em] mb-3 ${
                dark
                  ? "text-[#78928f]"
                  : "text-[#87928c]"
              }`}
            >
              What you can do
            </p>

            <h2
              className="text-3xl md:text-4xl font-semibold"
              style={{
                fontFamily: "Georgia, serif"
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


        {/* Supported topics */}
        <section
          className={`max-w-5xl mx-auto px-6 pb-20`}
        >

          <div
            className={`rounded-3xl p-8 md:p-12 border text-center ${
              dark
                ? "bg-[#10272e] border-[#29434a]"
                : "bg-[#fbf7ed] border-[#eadfc9]"
            }`}
          >

            <div className="text-3xl mb-4">
              🌍
            </div>

            <h2
              className="text-3xl font-semibold mb-4"
              style={{
                fontFamily: "Georgia, serif"
              }}
            >
              Built for curiosity.
            </h2>

            <p
              className={`max-w-2xl mx-auto leading-7 ${
                dark
                  ? "text-[#a7b9b7]"
                  : "text-[#65736c]"
              }`}
            >
              Explore how technology, science, nature,
              space, the human body and everyday things
              work.
            </p>


            <div className="flex flex-wrap justify-center gap-2 mt-7">

              {[
                "Science",
                "Technology",
                "Space",
                "Nature",
                "Human Body",
                "Everyday Things"
              ].map((topic) => (

                <span
                  key={topic}
                  className={`px-4 py-2 rounded-full text-sm ${
                    dark
                      ? "bg-[#17343b] text-[#b8d4d0]"
                      : "bg-white border border-[#d8dfda] text-[#506159]"
                  }`}
                >
                  {topic}
                </span>

              ))}

            </div>

          </div>

        </section>


        {/* CTA */}
        <section className="text-center px-6 pb-20">

          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{
              fontFamily: "Georgia, serif"
            }}
          >
            Ready to get curious?
          </h2>

          <p
            className={`mt-3 ${
              dark
                ? "text-[#91a6a3]"
                : "text-[#76827c]"
            }`}
          >
            Start with one question.
          </p>

          <button
            onClick={onStart}
            className="mt-7 px-8 py-4 rounded-2xl bg-[#315c52] text-white font-semibold hover:bg-[#254c43] hover:-translate-y-1 transition-all"
          >
            Explore Curioo →
          </button>

        </section>


        {/* Footer */}
        <footer
          className={`text-center py-7 border-t text-sm ${
            dark
              ? "border-[#233a40] text-[#718783]"
              : "border-[#dde3de] text-[#8a948e]"
          }`}
        >
          ✦ Curioo · understand how anything works
        </footer>

      </div>

    </div>
  )
}


/* =========================================================
   STEP COMPONENT
   ========================================================= */

function Step({ number, icon, title, text, dark }) {
  return (
    <div
      className={`rounded-2xl p-6 border ${
        dark
          ? "bg-[#0d2229] border-[#29434a]"
          : "bg-white border-[#dce2dd]"
      }`}
    >

      <div className="flex items-center justify-between mb-5">

        <span className="text-2xl">
          {icon}
        </span>

        <span
          className={`text-xs tracking-widest ${
            dark
              ? "text-[#67827e]"
              : "text-[#9ba59f]"
          }`}
        >
          {number}
        </span>

      </div>

      <h3 className="font-semibold text-lg mb-2">
        {title}
      </h3>

      <p
        className={`text-sm leading-6 ${
          dark
            ? "text-[#94aaa6]"
            : "text-[#727d77]"
        }`}
      >
        {text}
      </p>

    </div>
  )
}


/* =========================================================
   FEATURE COMPONENT
   ========================================================= */

function Feature({ icon, title, text, dark }) {
  return (
    <div
      className={`rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 ${
        dark
          ? "bg-[#0d2229] border-[#29434a] hover:border-[#557a78]"
          : "bg-white border-[#dce2dd] hover:border-[#aebdb5]"
      }`}
    >

      <div className="text-3xl mb-5">
        {icon}
      </div>

      <h3 className="text-xl font-semibold mb-2">
        {title}
      </h3>

      <p
        className={`leading-7 ${
          dark
            ? "text-[#94aaa6]"
            : "text-[#727d77]"
        }`}
      >
        {text}
      </p>

    </div>
  )
}

export default WelcomePage