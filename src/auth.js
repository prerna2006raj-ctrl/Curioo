const USERS_KEY = "curioo-users"

function getUsers() {
  const saved = localStorage.getItem(USERS_KEY)
  return saved ? JSON.parse(saved) : []
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function signUp({ name, email, password }) {
  const users = getUsers()
  const exists = users.find((u) => u.email === email)
  if (exists) {
    throw new Error("An account with this email already exists")
  }
  const newUser = { name, email, password }
  saveUsers([...users, newUser])
  return newUser
}

export function logIn({ email, password }) {
  const users = getUsers()
  const user = users.find((u) => u.email === email && u.password === password)
  if (!user) {
    throw new Error("Incorrect email or password")
  }
  return user
}
