import { useState, useCallback } from "react";
import { useTodosReducer } from "../hooks/useTodosReducer";

import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFooter from "./TodoFooter";

export default function TodoApp() {
  const { todos, dispatch } = useTodosReducer();
  const [filter, setFilter] = useState("all");

  const memoSetFilter = useCallback((f) => setFilter(f), []);

  return (
    <div>
      <h1>Todo App</h1>

      <TodoInput dispatch={dispatch} />

      <TodoList
        todos={todos}
        filter={filter}
        dispatch={dispatch}
      />

      <TodoFooter
        todos={todos}
        filter={filter}
        setFilter={memoSetFilter}
        dispatch={dispatch}
      />
    </div>
  );
}