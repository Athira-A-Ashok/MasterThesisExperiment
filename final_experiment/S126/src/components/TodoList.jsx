import { useMemo } from "react";
import { useTodos } from "../context/TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { state } = useTodos();

  const filteredTasks = useMemo(() => {
    switch (state.filter) {
      case "ACTIVE":
        return state.tasks.filter((t) => !t.completed);
      case "COMPLETED":
        return state.tasks.filter((t) => t.completed);
      default:
        return state.tasks;
    }
  }, [state.tasks, state.filter]);

  if (filteredTasks.length === 0) {
    return <p className="empty">No tasks found</p>;
  }

  return (
    <ul className="list">
      {filteredTasks.map((task) => (
        <TodoItem key={task.id} task={task} />
      ))}
    </ul>
  );
}