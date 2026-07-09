import {
  DndContext,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { useBoard } from "../context/BoardContext";
import Column from "./Column";

export default function Board() {
  const { state, dispatch } = useBoard();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const findColumnByCardId = (cardId) => {
    return Object.values(state.columns).find((col) =>
      col.cardIds.includes(cardId)
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeCardId = active.id;
    const overId = over.id;

    const sourceColumn = findColumnByCardId(activeCardId);
    const destColumn = findColumnByCardId(overId) || state.columns[overId];

    if (!sourceColumn || !destColumn) return;

    const destIndex = destColumn.cardIds.indexOf(overId);

    dispatch({
      type: "MOVE_CARD",
      payload: {
        cardId: activeCardId,
        sourceColumnId: sourceColumn.id,
        destColumnId: destColumn.id,
        destIndex: destIndex === -1 ? destColumn.cardIds.length : destIndex,
      },
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="board">
        {state.columnOrder.map((columnId) => (
          <Column key={columnId} column={state.columns[columnId]} />
        ))}
      </div>
    </DndContext>
  );
}