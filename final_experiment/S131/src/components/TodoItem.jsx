import { memo } from 'react';

function TodoItem({ task, onToggle, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.resolved}
        onChange={() => onToggle(task.id)}
        aria-label="Toggle task"
      />

      <span style={{
        textDecoration: task.resolved ? 'line-through' : 'none'
      }}>
        {task.text}
      </span>

      <button onClick={() => onDelete(task.id)} aria-label="Delete task">
        ✕
      </button>
    </li>
  );
}

export default memo(TodoItem);