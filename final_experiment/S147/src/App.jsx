import React, { useReducer, useCallback, useMemo } from "react";
import { reducer, initialState, ACTIONS } from "./reducer";
import { useLocalStorage } from "./hooks/useLocalStorage";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilters from "./components/TodoFilters";

export default function App() {
  const [persistedState, setPersistedState] = useLocalStorage(
    "todos",
    initialState
  );

  const [state, dispatch] = useReducer(reducer, persistedState);

  // sync reducer state → localStorage
  React.useEffect(() => {
    setPersistedState(state);
  }, [state, setPersistedState]);

  const addTask = useCallback((text) => {
    const task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };

    dispatch({ type: ACTIONS.ADD, payload: task });
  }, []);

  const toggleTask = useCallback((id) => {
    dispatch({ type: ACTIONS.TOGGLE, payload: id });
  }, []);

  const deleteTask = useCallback((id) => {
    dispatch({ type: ACTIONS.DELETE, payload: id });
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_COMPLETED });
  }, []);

  const setFilter = useCallback((filter) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
  }, []);

  const filteredTasks = useMemo(() => {
    switch (state.filter) {
      case "active":
        return state.tasks.filter((t) => !t.completed);
      case "completed":
        return state.tasks.filter((t) => t.completed);
      default:
        return state.tasks;
    }
  }, [state.tasks, state.filter]);

  const remaining = useMemo(
    () => state.tasks.filter((t) => !t.completed).length,
    [state.tasks]
  );

  return (
    <main style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Todo App</h1>

      <TodoInput addTask={addTask} />

      <TodoFilters
        filter={state.filter}
        setFilter={setFilter}
        clearCompleted={clearCompleted}
        remaining={remaining}
      />

      <TodoList
        tasks={filteredTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
    </main>
  );
}