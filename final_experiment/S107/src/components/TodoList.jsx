import TodoItem from "./TodoItem";
import React from "react";

function TodoList({ tasks, onToggle, onDelete }) {
  return (
    <ul aria-label="Todo list">
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default React.memo(TodoList);