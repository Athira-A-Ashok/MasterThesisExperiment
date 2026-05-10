import { useMemo } from "react";
import { useTodos } from "../hooks/useTodos";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos, filter } = useTodos();

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "ACTIVE":
        return todos.filter(t => !t.completed);
      case "COMPLETED":
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <ul>
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}