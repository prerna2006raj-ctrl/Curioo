# ✦ Curioo

> **Understand how things work.**

Curioo is an AI-powered curiosity and learning platform that helps users explore topics, understand complex concepts through simple explanations, and test their knowledge with interactive quizzes.

Whether you want to understand how WiFi works, how airplanes fly, how GPS works, or explore topics in science, technology, space, nature, and programming — Curioo makes learning simple, interactive, and engaging.

---

## 🌟 Features

### 🤖 AI-Powered Explanations

Ask questions about any topic and get clear, AI-generated explanations using the Google Gemini API.

Examples:

- How does WiFi work?
- How do rainbows form?
- How does GPS work?
- How does a refrigerator work?
- How do airplanes fly?
- How does a solar panel work?

### 🎨 Learning Modes

Choose how you want a topic explained:

- 🧒 **Like I'm 5** — Simple and beginner-friendly explanations
- 👨‍💻 **Like an Engineer** — Detailed and technical explanations

---

## 🧩 Interactive AI Quizzes

After learning about a topic, users can test their understanding through interactive quizzes.

Features include:

- Multiple-choice questions
- Easy, Medium, and Hard difficulty
- Timed quizzes
- Quiz timer
- Score calculation
- Question navigation
- Answer tracking
- Automatic progress tracking
- Results and performance feedback
- Detailed explanations

---

## 📊 Progress Tracking

Curioo tracks learning and quiz activity to help users understand their progress.

Progress features include:

- Questions answered
- Correct answers
- Quiz performance
- Topic accuracy
- Best-performing topics
- Weakest topics
- Learning streak
- Daily learning goals
- Recent learning activity

---

## 🔥 Learning Streaks

Stay consistent with learning by maintaining a daily learning streak.

Curioo tracks learning activity and displays streak information to encourage regular learning.

---

## 🏆 Achievements

Users can unlock achievements based on their learning and quiz activity.

Achievements can be earned through activities such as:

- Completing quizzes
- Answering questions
- Maintaining learning streaks
- Exploring different topics
- Reaching learning goals

---

## ⭐ Favorites

Save interesting explanations and discoveries for later.

Users can:

- Save topics
- View saved explanations
- Remove favorites
- Revisit previously learned topics

---

## 📚 Learning Library

Organize saved knowledge into collections.

Example collections:

- 🔬 Science
- ☕ Java
- 🤖 AI
- 🚀 Space

Collections help users organize topics according to their interests.

---

## 🕘 Recent Topics

Curioo keeps track of recently explored topics.

Users can:

- Quickly revisit recent topics
- Open a recent topic without searching again
- Manage recent topic entries
- Remove recent topics

---

## 🎯 Daily Learning Goals

Set a daily learning target and track progress toward it.

Available goals can include:

- 1 activity per day
- 3 activities per day
- 5 activities per day

---

## 🌞 Day & 🌙 Night Themes

Curioo supports light and dark themes.

The theme affects:

- Backgrounds
- Cards
- Borders
- Text
- Navigation
- Accent elements

---

## 📱 Responsive Design

Curioo is designed to work across desktop and mobile devices.

### Desktop

- Sidebar navigation
- Recent topics
- Profile section
- Learning workspace
- Navigation controls

### Mobile

- Responsive layout
- ☰ Menu button
- Sidebar overlay
- Sidebar close button
- Mobile-friendly navigation

---

## 👤 User Features

Curioo includes user-focused functionality for managing the learning experience.

Users can access:

- Profile
- Favorites
- Progress
- Learning Library
- Recent Topics
- Learning goals
- Achievements
- Theme settings

---

## 🖥️ Main Sections

| Section | Purpose |
|---|---|
| 🏠 Home | Ask questions and explore topics |
| ⭐ Favorites | View saved discoveries |
| 📈 Progress | Track learning performance |
| 📚 Library | Manage learning collections |
| 🕘 Recent | Revisit recently explored topics |
| 🏆 Achievements | View learning achievements |
| 👤 Profile | Manage user information |

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript
- Vite
- HTML
- CSS
- Tailwind CSS

### AI

- Google Gemini API

### Storage

Curioo uses browser `localStorage` for storing user-side information such as:

- Recent topics
- Favorites
- Learning progress
- Daily goals
- Collections
- Bookmarks
- Learn-later topics
- Theme preferences
- Current user information

---

## 📂 Project Structure

```text
Curioo/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── AuthPage.jsx
│   │   ├── SearchBar.jsx
│   │   ├── ResultCard.jsx
│   │   ├── QuizCard.jsx
│   │   ├── QuizDifficulty.jsx
│   │   ├── ProgressPage.jsx
│   │   ├── StreakPage.jsx
│   │   ├── AchievementsPage.jsx
│   │   ├── LearningLibrary.jsx
│   │   ├── FavoritesPage.jsx
│   │   ├── Sidebar.jsx
│   │   ├── History.jsx
│   │   ├── TopicOfDay.jsx
│   │   └── ...
│   │
│   ├── services/
│   │   ├── auth.js
│   │   └── gemini.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
