import { useMemo } from "react";
import { useTodos } from "../context/TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { state } = useTodos();

  const filteredTodos = useMemo(() => {
    switch (state.filter) {
      case "active":
        return state.todos.filter((t) => !t.completed);
      case "completed":
        return state.todos.filter((t) => t.completed);
      default:
        return state.todos;
    }
  }, [state.todos, state.filter]);

  return (
    <ul>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}