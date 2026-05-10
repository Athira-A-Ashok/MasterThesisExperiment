// src/components/TaskList.jsx
import React, { useMemo } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggle, onDelete, filter }) => {
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "completed":
        return tasks.filter(t => t.completed);
      case "active":
        return tasks.filter(t => !t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return (
    <ul>
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default React.memo(TaskList);