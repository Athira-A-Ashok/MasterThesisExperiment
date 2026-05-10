import { createContext, useContext, useReducer, useEffect } from "react";

const TodoContext = createContext();

const STORAGE_KEY = "todos_v1";
const FILTER_KEY = "filter_v1";

// Safe localStorage helpers
const load = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // fail silently
  }
};

// Initial state
const initialState = {
  todos: load(STORAGE_KEY, []),
  filter: load(FILTER_KEY, "all"),
  lastDeleted: null,
};

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO": {
      const text = action.payload.trim();
      if (!text) return state;

      const newTodo = {
        id: Date.now(),
        text,
        completed: false,
      };

      return {
        ...state,
        todos: [newTodo, ...state.todos],
      };
    }

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };

    case "DELETE_TODO": {
      const deleted = state.todos.find((t) => t.id === action.payload);
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
        lastDeleted: deleted || null,
      };
    }

    case "UNDO_DELETE":
      if (!state.lastDeleted) return state;
      return {
        ...state,
        todos: [state.lastDeleted, ...state.todos],
        lastDeleted: null,
      };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter((t) => !t.completed),
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    save(STORAGE_KEY, state.todos);
  }, [state.todos]);

  useEffect(() => {
    save(FILTER_KEY, state.filter);
  }, [state.filter]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodos = () => useContext(TodoContext);