import { createContext, useReducer, useEffect } from "react";
import { loadTodos, saveTodos } from "../utils/storage";

export const TodoContext = createContext();

const ACTIONS = {
  ADD: "ADD",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [
        {
          id: crypto.randomUUID(),
          text: action.payload,
          done: false,
          createdAt: Date.now(),
        },
        ...state,
      ];

    case ACTIONS.TOGGLE:
      return state.map((t) =>
        t.id === action.payload ? { ...t, done: !t.done } : t
      );

    case ACTIONS.DELETE:
      return state.filter((t) => t.id !== action.payload);

    default:
      return state;
  }
}

export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(reducer, [], loadTodos);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, dispatch, ACTIONS }}>
      {children}
    </TodoContext.Provider>
  );
}