# 🗂️ Kanban Board

A professional, feature-rich Kanban board built with React + Vite — created as a portfolio project.

 **Live Demo:** [https://deemaa-hub.github.io/kanban-board/](https://deemaa-hub.github.io/kanban-board/)

##  Features

- **Drag & Drop** — smooth card dragging between columns using `@dnd-kit`
- **Dark Mode** — full light/dark theme toggle with persistent CSS variables
- **Custom Backgrounds** — Ocean, Sunset, Forest, and Midnight gradient themes
- **Tags & Labels** — color-coded Bug / Feature / Refactor tags
- **Priority Levels** — Low, Medium, High priority per card
- **Due Dates** — with visual warnings for approaching or overdue tasks
- **Checklists** — per-card checklist items with a live progress bar
- **Dashboard** — donut chart (pure CSS `conic-gradient`, no external libraries) showing task distribution
- **Responsive Design** — adapts across desktop, tablet, and mobile breakpoints
- **Persistent State** — all data saved automatically to `localStorage`

## Tech Stack

- React (JavaScript) + Vite
- `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
- Context API + `useReducer` for state management
- Plain CSS with CSS variables (no UI framework)

##  Running Locally

```bash
git clone https://github.com/deemaa-hub/kanban-board.git
cd kanban-board
npm install
npm run dev
```

##  Deployment

This project is deployed to GitHub Pages via `gh-pages`:

```bash
npm run deploy
```

##  Project Structure
src/
├── context/
│   ├── BoardContext.jsx     # Board state (columns, cards, checklist logic)
│   └── ThemeContext.jsx     # Dark mode + background theme state
├── components/
│   ├── Board.jsx            # DndContext + drag logic
│   ├── Column.jsx           # Single column (To Do / In Progress / Done)
│   ├── Card.jsx              # Single draggable card
│   ├── CardModal.jsx        # Card details modal (tags, priority, due date, checklist)
│   ├── AddCardForm.jsx       # Add new card form
│   ├── Navbar.jsx            # Dark mode toggle, background picker, stats
│   └── Dashboard.jsx          # Progress overview donut chart
├── App.jsx
├── App.css
├── index.css
└── main.jsx

##  Author

Made by [deemaa-hub](https://github.com/deemaa-hub)
