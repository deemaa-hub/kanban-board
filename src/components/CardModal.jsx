import { useState } from "react";
import { useBoard, TAG_OPTIONS, PRIORITY_LEVELS } from "../context/BoardContext";

export default function CardModal({ card, onClose }) {
  const { dispatch } = useBoard();
  const [newChecklistText, setNewChecklistText] = useState("");

  const toggleTag = (tag) => {
    const isSelected = card.tags.some((t) => t.id === tag.id);
    const updatedTags = isSelected
      ? card.tags.filter((t) => t.id !== tag.id)
      : [...card.tags, tag];

    dispatch({
      type: "UPDATE_CARD",
      payload: { cardId: card.id, updates: { tags: updatedTags } },
    });
  };

  const setPriority = (priority) => {
    dispatch({
      type: "UPDATE_CARD",
      payload: { cardId: card.id, updates: { priority } },
    });
  };

  const setDueDate = (e) => {
    dispatch({
      type: "UPDATE_CARD",
      payload: { cardId: card.id, updates: { dueDate: e.target.value } },
    });
  };

  const handleAddChecklistItem = (e) => {
    e.preventDefault();
    if (!newChecklistText.trim()) return;
    dispatch({
      type: "ADD_CHECKLIST_ITEM",
      payload: { cardId: card.id, text: newChecklistText },
    });
    setNewChecklistText("");
  };

  const toggleChecklistItem = (itemId) => {
    dispatch({
      type: "TOGGLE_CHECKLIST_ITEM",
      payload: { cardId: card.id, itemId },
    });
  };

  const deleteChecklistItem = (itemId) => {
    dispatch({
      type: "DELETE_CHECKLIST_ITEM",
      payload: { cardId: card.id, itemId },
    });
  };

  const doneCount = card.checklist.filter((item) => item.done).length;
  const totalCount = card.checklist.length;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2>{card.content}</h2>

        <div className="modal-section">
          <label>Tags</label>
          <div className="tag-options">
            {TAG_OPTIONS.map((tag) => {
              const isSelected = card.tags.some((t) => t.id === tag.id);
              return (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag)}
                  className={`tag-chip ${isSelected ? "selected" : ""}`}
                  style={{
                    backgroundColor: isSelected ? tag.color : "transparent",
                    borderColor: tag.color,
                    color: isSelected ? "white" : tag.color,
                  }}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="modal-section">
          <label>Priority</label>
          <div className="priority-options">
            {PRIORITY_LEVELS.map((level) => (
              <button
                key={level}
                onClick={() => setPriority(level)}
                className={`priority-btn priority-${level} ${
                  card.priority === level ? "selected" : ""
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="modal-section">
          <label>Due Date</label>
          <input
            type="date"
            lang="en"
            value={card.dueDate || ""}
            onChange={setDueDate}
          />
        </div>

        <div className="modal-section">
          <label>
            Checklist {totalCount > 0 && `(${doneCount}/${totalCount})`}
          </label>

          {totalCount > 0 && (
            <div className="progress-row">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(doneCount / totalCount) * 100}%`,
                  }}
                />
              </div>
              <span className="progress-count">
                {doneCount}/{totalCount}
              </span>
            </div>
          )}

          <ul className="checklist">
            {card.checklist.map((item) => (
              <li key={item.id} className="checklist-item">
                <label>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleChecklistItem(item.id)}
                  />
                  <span className={item.done ? "done" : ""}>
                    {item.text}
                  </span>
                </label>
                <button
                  className="checklist-delete-btn"
                  onClick={() => deleteChecklistItem(item.id)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          <form onSubmit={handleAddChecklistItem} className="checklist-form">
            <input
              value={newChecklistText}
              onChange={(e) => setNewChecklistText(e.target.value)}
              placeholder="Add a checklist item..."
            />
            <button type="submit">+</button>
          </form>
        </div>
      </div>
    </div>
  );
}