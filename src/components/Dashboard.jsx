import { useBoard } from "../context/BoardContext";

export default function Dashboard() {
  const { state } = useBoard();

  const todoCount = state.columns.todo?.cardIds.length || 0;
  const inProgressCount = state.columns["in-progress"]?.cardIds.length || 0;
  const doneCount = state.columns.done?.cardIds.length || 0;
  const total = todoCount + inProgressCount + doneCount;

  if (total === 0) {
    return (
      <div className="dashboard">
        <h3>Progress Overview</h3>
        <p className="dashboard-empty">Add some cards to see your progress.</p>
      </div>
    );
  }

  const todoPercent = (todoCount / total) * 100;
  const progressPercent = (inProgressCount / total) * 100;
  const donePercent = (doneCount / total) * 100;

  const todoEnd = todoPercent;
  const progressEnd = todoEnd + progressPercent;
  const doneEnd = progressEnd + donePercent;

  const conicGradient = `conic-gradient(
    #94a3b8 0% ${todoEnd}%,
    #f5a623 ${todoEnd}% ${progressEnd}%,
    #2ecc71 ${progressEnd}% ${doneEnd}%
  )`;

  const completionRate = Math.round((doneCount / total) * 100);

  return (
    <div className="dashboard">
      <h3>Progress Overview</h3>
      <div className="dashboard-content">
        <div className="pie-chart" style={{ background: conicGradient }}>
          <div className="pie-chart-center">
            <span className="pie-chart-percent">{completionRate}%</span>
            <span className="pie-chart-label">Complete</span>
          </div>
        </div>

        <div className="dashboard-legend">
          <div className="legend-item">
            <span className="legend-dot" style={{ background: "#94a3b8" }} />
            To Do — {todoCount}
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: "#f5a623" }} />
            In Progress — {inProgressCount}
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: "#2ecc71" }} />
            Done — {doneCount}
          </div>
          <div className="legend-item legend-total">
            Total tasks — {total}
          </div>
        </div>
      </div>
    </div>
  );
}