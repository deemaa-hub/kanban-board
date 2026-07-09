import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useBoard } from "../context/BoardContext";
import Card from "./Card";
import AddCardForm from "./AddCardForm";

export default function Column({ column }) {
  const { state } = useBoard();
  const { setNodeRef } = useDroppable({ id: column.id });

  const cards = column.cardIds.map((id) => state.cards[id]);

  return (
    <div className="column">
      <h3>{column.title}</h3>
      <div ref={setNodeRef} className="card-list">
        <SortableContext
          items={column.cardIds}
          strategy={verticalListSortingStrategy}
        >
          {cards.map((card) => (
            <Card key={card.id} card={card} columnId={column.id} />
          ))}
        </SortableContext>
      </div>
      <AddCardForm columnId={column.id} />
    </div>
  );
}