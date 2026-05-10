import styles from "./TodoItem.module.css";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={`${styles.item} flex items-center justify-between p-2 border-b`}>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span
          className={todo.completed ? "line-through text-gray-400" : ""}
        >
          {todo.text}
        </span>
      </div>
      <button onClick={() => onDelete(todo.id)} className="text-red-500">
        ✕
      </button>
    </div>
  );
}



