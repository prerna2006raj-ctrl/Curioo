import { useState } from "react"
import { signUp, logIn } from "../services/auth"

function AuthPage({ onAuth }) {
  const [mode, setMode] = useState("signup")

  const [name, setName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [error, setError] =
    useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    try {
      const user =
        mode === "signup"
          ? signUp({
              name,
              email,
              password,
            })
          : logIn({
              email,
              password,
            })

      onAuth(user)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="auth-container">
      {/* Decorative side text */}

      <div className="auth-side-decoration auth-side-left">
        <span>01</span>
        <div />
        <span>curiosity</span>
      </div>

      <div className="auth-side-decoration auth-side-right">
        <span>explore</span>
        <div />
        <span>∞</span>
      </div>

      {/* Main card */}

      <div className="auth-card">
        {/* Brand */}

        <div className="auth-brand">
          <div className="auth-brand-icon">
            <span />
            <span />
            <span />
          </div>

          <h1>Curioo</h1>
        </div>

        <div className="auth-brand-subtitle">
          understand how anything really works
        </div>

        {/* Header */}

        <div className="auth-heading">
          <span className="auth-eyebrow">
            {mode === "signup"
              ? "START EXPLORING"
              : "WELCOME BACK"}
          </span>

          <h2>
            {mode === "signup"
              ? "Create your account"
              : "Good to see you again"}
          </h2>

          <p>
            {mode === "signup"
              ? "Save your discoveries, favorites and quiz progress."
              : "Continue your journey of curiosity."}
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >
          {mode === "signup" && (
            <div className="auth-field">
              <label htmlFor="name">
                YOUR NAME
              </label>

              <div className="auth-input-wrapper">
                <span className="auth-input-icon">
                  ◎
                </span>

                <input
                  id="name"
                  type="text"
                  placeholder="what should we call you?"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  required
                />
              </div>
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="email">
              EMAIL
            </label>

            <div className="auth-input-wrapper">
              <span className="auth-input-icon">
                @
              </span>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="password">
              PASSWORD
            </label>

            <div className="auth-input-wrapper">
              <span className="auth-input-icon">
                ◆
              </span>

              <input
                id="password"
                type="password"
                placeholder="minimum 4 characters"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
                minLength={4}
              />
            </div>
          </div>

          {error && (
            <div className="auth-error">
              <span>!</span>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="auth-submit"
          >
            <span>
              {mode === "signup"
                ? "Create account"
                : "Log in"}
            </span>

            <span className="auth-submit-arrow">
              →
            </span>
          </button>
        </form>

        {/* Switch mode */}

        <div className="auth-switch">
          <span>
            {mode === "signup"
              ? "Already have an account?"
              : "New to Curioo?"}
          </span>

          <button
            type="button"
            onClick={() => {
              setMode(
                mode === "signup"
                  ? "login"
                  : "signup"
              )

              setError("")
            }}
          >
            {mode === "signup"
              ? "Log in"
              : "Create account"}
          </button>
        </div>

        {/* Footer */}

        <div className="auth-footer">
          <span>✦</span>

          Your data stays saved locally
          on this device.

          <span>✦</span>
        </div>
      </div>
    </div>
  )
}

export default AuthPage