function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <li className="task-item">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        aria-label={`Mark ${task.text} as complete`}
      />

      {/* Task text */}
      <span className={task.completed ? "completed" : ""}>
        {task.text}
      </span>

      {/* Delete button */}
      <button
        onClick={() => deleteTask(task.id)}
        aria-label={`Delete ${task.text}`}
      >
        🗑
      </button>
    </li>
  );
}

export default TaskItem;