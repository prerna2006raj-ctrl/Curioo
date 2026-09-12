# ✦ Curioo

> **Understand how things work.**
Curioo is an AI-powered curiosity and learning platform that turns everyday questions into simple, understandable explanations.
Whether you want to understand how WiFi works, how airplanes fly, how GPS works, or explore topics in science, technology, space, and nature — Curioo helps you learn in an engaging way.

## 🌟 Features

### 🤖 AI-Powered Explanations
Ask questions about how things work and get clear explanations powered by AI.
Examples:

- How does WiFi work?
- How do rainbows form?
- How does GPS work?
- How does a refrigerator work?
- How do airplanes fly?
- How does a solar panel work?
- 
### 🎨 Two Learning Styles
Curioo provides different explanation styles based on your learning preference:
- 🧒 **Like I'm 5** — Simple and easy-to-understand explanations
- 👨‍💻 **Like an Engineer** — More detailed and technical explanations

### 🧩 Interactive Quizzes
After learning about a topic, users can test their understanding with interactive quizzes.
Features include:

- Multiple-choice questions
- Difficulty selection
  - Easy
  - Medium
  - Hard
- Timed questions
- Score calculation
- Quiz progress tracking
- Results and performance feedback

### 📊 Learning Progress
Curioo tracks your learning activity and quiz performance.
Progress information includes:

- Questions answered
- Quizzes completed
- Average score
- Best topic
- Weakest topic
- Topic accuracy
- Learning streak
- Daily learning goals

### ⭐ Favorites
Save interesting explanations to your Favorites so they can be accessed later.

Users can:

- Save discoveries
- View saved explanations
- Remove favorites
- Revisit previously learned topics

### 📚 Learning Library
Organize saved knowledge into learning collections.

Example collections:

- 🔬 Science
- ☕ Java
- 🤖 AI
- 🚀 Space
Collections can be managed and organized according to your learning needs.

### 🕘 Recent Topics
Curioo keeps track of recently explored topics so users can quickly return to previous discoveries.
Recent topics are displayed in the sidebar and can be accessed without searching again.

### 🌞 Day & 🌙 Night Themes
Curioo includes two visual themes:

- ☀️ Day Theme
- 🌙 Night Theme
The interface automatically changes backgrounds, cards, borders, text, and accent colors to maintain readability in both modes.

### 📱 Responsive Design
Curioo is designed to work across different screen sizes.
On desktop:

- Fixed sidebar
- Workspace navigation
- Recent topics
- Profile section

On mobile:

- Compact interface
- ☰ menu button
- Sidebar opens as an overlay
- Mobile-friendly layout

## 🖥️ Main Sections
Curioo includes the following major areas:

| Section | Purpose |
|---|---|
| 🏠 Home | Ask questions and explore topics |
| ⭐ Favorites | View saved discoveries |
| 📈 Progress | Track learning performance |
| 📚 Library | Manage learning collections |
| 🕘 Recent | Revisit recently explored topics |
| 👤 Profile | User profile area |

## 🛠️ Tech Stack
### Frontend

- React
- JavaScript
- Vite
- HTML
- CSS
- Tailwind CSS
- 
### AI

- Google Gemini API

### Storage

Curioo uses browser `localStorage` for storing user-side information such as:

- Recent topics
- Favorites
- Learning progress
- Daily goals
- Saved collections
- Pinned topics

## 📂 Project Structure

```text
Curioo/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── ResultCard.jsx
│   │   ├── Loader.jsx
│   │   ├── QuizCard.jsx
│   │   ├── Sidebar.jsx
│   │   ├── History.jsx
│   │   ├── FavoritesPage.jsx
│   │   ├── Progress.jsx
│   │   ├── Library.jsx
│   │   └── ...
│   │
│   ├── services/
│   │   └── gemini.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
