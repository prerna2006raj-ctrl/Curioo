import { useState } from "react"
import { signUp, logIn } from "../services/auth"

function AuthPage({ onAuth }) {
  const [mode, setMode] = useState("signup")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    try {
      const user = mode === "signup"
        ? signUp({ name, email, password })
        : logIn({ email, password })
      onAuth(user)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-sm w-full animate-fade-in-up bg-panel dark:bg-blueprint-panel border border-line/20 dark:border-line-dark/20 rounded-md p-6">
      <h2 className="font-display text-xl font-semibold mb-1 text-center">
        {mode === "signup" ? "create your account" : "welcome back"}
      </h2>
      <p className="font-body text-sm text-center text-ink/60 dark:text-paper-dark/60 mb-6">
        {mode === "signup" ? "saved locally on this device" : "log in to continue"}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {mode === "signup" && (
          <input
            type="text"
            placeholder="your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="font-body border border-line/30 dark:border-line-dark/30 bg-paper dark:bg-blueprint text-ink dark:text-paper-dark rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber"
          />
        )}
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="font-body border border-line/30 dark:border-line-dark/30 bg-paper dark:bg-blueprint text-ink dark:text-paper-dark rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={4}
          className="font-body border border-line/30 dark:border-line-dark/30 bg-paper dark:bg-blueprint text-ink dark:text-paper-dark rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber"
        />

        {error && <p className="font-body text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="font-display font-medium bg-line dark:bg-amber text-paper dark:text-blueprint px-5 py-2 rounded-sm hover:opacity-90 transition-transform duration-150 hover:scale-105 active:scale-95 mt-1"
        >
          {mode === "signup" ? "sign up" : "log in"}
        </button>
      </form>

      <button
        onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setError("") }}
        className="font-body text-sm text-center w-full mt-4 text-line dark:text-line-dark hover:text-amber transition-colors duration-150"
      >
        {mode === "signup" ? "already have an account? log in" : "new here? sign up"}
      </button>
    </div>
  )
}
export default AuthPage
