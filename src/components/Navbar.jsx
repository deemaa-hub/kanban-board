import { useTheme, BACKGROUND_OPTIONS } from "../context/ThemeContext";

export default function Navbar({ stats }) {
  const { isDark, toggleTheme, background, setBackground } = useTheme();

  return (
    <div className="navbar">
      <div className="navbar-left">
        <label className="theme-toggle">
          <span>Dark Mode</span>
          <input type="checkbox" checked={isDark} onChange={toggleTheme} />
          <span className="toggle-slider" />
        </label>

        <select
          className="background-select"
          value={background}
          onChange={(e) => setBackground(e.target.value)}
        >
          {BACKGROUND_OPTIONS.map((bg) => (
            <option key={bg.id} value={bg.id}>
              {bg.label}
            </option>
          ))}
        </select>
      </div>

      <div className="navbar-right">
        <div className="stat-widget">
          <span className="stat-dot total" />
          Total: {stats.total}
        </div>
        <div className="stat-widget">
          <span className="stat-dot done" />
          Done: {stats.done}
        </div>
        <div className="stat-widget">
          <span className="stat-dot progress" />
          In Progress: {stats.inProgress}
        </div>
      </div>
    </div>
  );
}