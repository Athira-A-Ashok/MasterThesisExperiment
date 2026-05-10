import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";
import { useMemo } from "react";

function TodoList() {
  const { state } = useTodo();

  const filtered = useMemo(() => {
    return state.todos.filter((t) => {
      const matchesSearch = t.text
        .toLowerCase()
        .includes(state.search.toLowerCase());

      if (!matchesSearch) return false;

      if (state.filter === "ACTIVE") return !t.completed;
      if (state.filter === "COMPLETED") return t.completed;
      return true;
    });
  }, [state.todos, state.filter, state.search]);

  return (
    <ul>
      {filtered.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;