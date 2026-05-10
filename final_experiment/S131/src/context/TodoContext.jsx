import { createContext, useReducer, useEffect } from 'react';
import { todoReducer } from '../utils/reducer';

export const TodoContext = createContext();

const STORAGE_KEY = 'todos_v1';

function init() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, [], init);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}