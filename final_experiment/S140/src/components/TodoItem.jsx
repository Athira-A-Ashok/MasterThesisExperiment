import styles from "../styles/TodoItem.module.css";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between border p-2 rounded">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />

        <span
          className={
            todo.completed
              ? `${styles.completed} line-through text-gray-400`
              : ""
          }
        >
          {todo.text}
        </span>
      </div>

      <button
        className="text-red-500"
        onClick={() => onDelete(todo.id)}
      >
        ✕
      </button>
    </div>
  );
}