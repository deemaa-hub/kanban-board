import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBoard } from "../context/BoardContext";
import CardModal from "./CardModal";

function getDueDateInfo(dueDate) {
  if (!dueDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24));

  let label;
  if (diffDays < 0) label = `Overdue by ${Math.abs(diffDays)}d`;
  else if (diffDays === 0) label = "Due today";
  else if (diffDays === 1) label = "Due tomorrow";
  else label = `Due in ${diffDays} days`;

  const isUrgent = diffDays <= 2;

  return { label, isUrgent };
}

export default function Card({ card, columnId }) {
  const { dispatch } = useBoard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch({ type: "DELETE_CARD", payload: { columnId, cardId: card.id } });
  };

  const handleCardClick = () => {
    if (!isDragging) {
      setIsModalOpen(true);
    }
  };

  const dueInfo = getDueDateInfo(card.dueDate);
  const checklistTotal = card.checklist.length;
  const checklistDone = card.checklist.filter((item) => item.done).length;

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="card"
        onClick={handleCardClick}
      >
        <div className="card-top">
          <span className="card-content">{card.content}</span>
          <button
            onClick={handleDelete}
            onPointerDown={(e) => e.stopPropagation()}
            className="delete-btn"
          >
            ×
          </button>
        </div>

        {card.tags.length > 0 && (
          <div className="card-tags">
            {card.tags.map((tag) => (
              <span
                key={tag.id}
                className="card-tag"
                style={{ backgroundColor: tag.color }}
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}

        <div className="card-meta">
          {dueInfo && (
            <span className={`card-due ${dueInfo.isUrgent ? "urgent" : ""}`}>
              🕐 {dueInfo.label}
            </span>
          )}
          {checklistTotal > 0 && (
            <span className="card-checklist-count">
              ☑ {checklistDone}/{checklistTotal}
            </span>
          )}
        </div>
      </div>

      {isModalOpen && (
        <CardModal card={card} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}