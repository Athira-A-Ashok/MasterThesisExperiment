// src/components/TaskList.jsx
import { useMemo } from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, filter, dispatch }) {
  const filteredTasks = useMemo(() => {
    if (filter === "ACTIVE") return tasks.filter(t => !t.completed);
    if (filter === "COMPLETED") return tasks.filter(t => t.completed);
    return tasks;
  }, [tasks, filter]);

  return (
    <div role="list">
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} dispatch={dispatch} />
      ))}
    </div>
  );
}