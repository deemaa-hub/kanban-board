import { useState } from "react";
import { useBoard } from "../context/BoardContext";

export default function AddCardForm({ columnId }) {
  const [content, setContent] = useState("");
  const { dispatch } = useBoard();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    dispatch({ type: "ADD_CARD", payload: { columnId, content } });
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-card-form">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a card..."
      />
      <button type="submit">+</button>
    </form>
  );
}