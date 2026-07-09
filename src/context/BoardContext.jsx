import { createContext, useReducer, useContext, useEffect } from "react";

const BoardContext = createContext();

export const TAG_OPTIONS = [
  { id: "bug", label: "Bug", color: "#ff5e5e" },
  { id: "feature", label: "Feature", color: "#2ecc71" },
  { id: "refactor", label: "Refactor", color: "#4f6bff" },
];

export const PRIORITY_LEVELS = ["low", "medium", "high"];

const initialState = {
  columns: {
    todo: { id: "todo", title: "To Do", cardIds: ["c1", "c2"] },
    "in-progress": { id: "in-progress", title: "In Progress", cardIds: ["c3", "c4"] },
    done: { id: "done", title: "Done", cardIds: ["c5", "c6"] },
  },
  cards: {
    c1: {
      id: "c1",
      content: "Add user authentication",
      tags: [TAG_OPTIONS[1]],
      priority: "high",
      dueDate: null,
      checklist: [],
    },
    c2: {
      id: "c2",
      content: "Write project documentation",
      tags: [TAG_OPTIONS[1]],
      priority: "low",
      dueDate: null,
      checklist: [],
    },
    c3: {
      id: "c3",
      content: "Implement drag & drop",
      tags: [TAG_OPTIONS[2]],
      priority: "medium",
      dueDate: null,
      checklist: [
        { id: "cl1", text: "Install dnd-kit", done: true },
        { id: "cl2", text: "Enable card sorting", done: true },
        { id: "cl3", text: "Handle cross-column drops", done: false },
      ],
    },
    c4: {
      id: "c4",
      content: "Add dark mode support",
      tags: [TAG_OPTIONS[1]],
      priority: "medium",
      dueDate: null,
      checklist: [
        { id: "cl4", text: "Set up CSS variables", done: true },
        { id: "cl5", text: "Add theme toggle", done: false },
      ],
    },
    c5: {
      id: "c5",
      content: "Set up project structure",
      tags: [TAG_OPTIONS[2]],
      priority: "low",
      dueDate: null,
      checklist: [
        { id: "cl6", text: "Initialize Vite + React", done: true },
        { id: "cl7", text: "Organize components folder", done: true },
      ],
    },
    c6: {
      id: "c6",
      content: "Design UI components",
      tags: [TAG_OPTIONS[1]],
      priority: "medium",
      dueDate: null,
      checklist: [
        { id: "cl8", text: "Style cards and columns", done: true },
        { id: "cl9", text: "Design modal layout", done: true },
      ],
    },
  },
  columnOrder: ["todo", "in-progress", "done"],
};

function boardReducer(state, action) {
  switch (action.type) {
    case "ADD_CARD": {
      const { columnId, content } = action.payload;
      const newCardId = `c${Date.now()}`;
      return {
        ...state,
        cards: {
          ...state.cards,
          [newCardId]: {
            id: newCardId,
            content,
            tags: [],
            priority: null,
            dueDate: null,
            checklist: [],
          },
        },
        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            cardIds: [...state.columns[columnId].cardIds, newCardId],
          },
        },
      };
    }

    case "DELETE_CARD": {
      const { columnId, cardId } = action.payload;
      const { [cardId]: _, ...remainingCards } = state.cards;
      return {
        ...state,
        cards: remainingCards,
        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            cardIds: state.columns[columnId].cardIds.filter(
              (id) => id !== cardId
            ),
          },
        },
      };
    }

    case "MOVE_CARD": {
      const { cardId, sourceColumnId, destColumnId, destIndex } = action.payload;

      if (sourceColumnId === destColumnId) {
        const cardIds = state.columns[sourceColumnId].cardIds.filter(
          (id) => id !== cardId
        );
        cardIds.splice(destIndex, 0, cardId);

        return {
          ...state,
          columns: {
            ...state.columns,
            [sourceColumnId]: {
              ...state.columns[sourceColumnId],
              cardIds,
            },
          },
        };
      }

      const sourceCardIds = state.columns[sourceColumnId].cardIds.filter(
        (id) => id !== cardId
      );
      const destCardIds = [...state.columns[destColumnId].cardIds];
      destCardIds.splice(destIndex, 0, cardId);

      return {
        ...state,
        columns: {
          ...state.columns,
          [sourceColumnId]: {
            ...state.columns[sourceColumnId],
            cardIds: sourceCardIds,
          },
          [destColumnId]: {
            ...state.columns[destColumnId],
            cardIds: destCardIds,
          },
        },
      };
    }

    case "UPDATE_CARD": {
      const { cardId, updates } = action.payload;
      return {
        ...state,
        cards: {
          ...state.cards,
          [cardId]: {
            ...state.cards[cardId],
            ...updates,
          },
        },
      };
    }

    case "ADD_CHECKLIST_ITEM": {
      const { cardId, text } = action.payload;
      const newItem = { id: `cl${Date.now()}`, text, done: false };
      return {
        ...state,
        cards: {
          ...state.cards,
          [cardId]: {
            ...state.cards[cardId],
            checklist: [...state.cards[cardId].checklist, newItem],
          },
        },
      };
    }

    case "TOGGLE_CHECKLIST_ITEM": {
      const { cardId, itemId } = action.payload;
      const updatedChecklist = state.cards[cardId].checklist.map((item) =>
        item.id === itemId ? { ...item, done: !item.done } : item
      );
      return {
        ...state,
        cards: {
          ...state.cards,
          [cardId]: {
            ...state.cards[cardId],
            checklist: updatedChecklist,
          },
        },
      };
    }

    case "DELETE_CHECKLIST_ITEM": {
      const { cardId, itemId } = action.payload;
      const updatedChecklist = state.cards[cardId].checklist.filter(
        (item) => item.id !== itemId
      );
      return {
        ...state,
        cards: {
          ...state.cards,
          [cardId]: {
            ...state.cards[cardId],
            checklist: updatedChecklist,
          },
        },
      };
    }

    default:
      return state;
  }
}

export function BoardProvider({ children }) {
  const [state, dispatch] = useReducer(boardReducer, initialState, () => {
    const saved = localStorage.getItem("kanban-board");
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("kanban-board", JSON.stringify(state));
  }, [state]);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  return useContext(BoardContext);
}