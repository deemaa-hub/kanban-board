import Board from "./components/Board";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { useBoard } from "./context/BoardContext";
import { useTheme } from "./context/ThemeContext";
import "./App.css";

function App() {
  const { state } = useBoard();
  const { backgroundValue } = useTheme();

  const total = Object.keys(state.cards).length;
  const done = state.columns.done ? state.columns.done.cardIds.length : 0;
  const inProgress = state.columns["in-progress"]
    ? state.columns["in-progress"].cardIds.length
    : 0;

  return (
    <div
      className="app"
      style={backgroundValue ? { background: backgroundValue } : undefined}
    >
      <Navbar stats={{ total, done, inProgress }} />
      <div className="app-body">
        <h1>Kanban Board</h1>
        <Board />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
