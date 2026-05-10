export default function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md transition
      ${todo.completed ? "opacity-60" : ""}`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="w-4 h-4 accent-purple-500"
        />

        <span
          className={`text-sm md:text-base ${
            todo.completed ? "line-through text-white/50" : ""
          }`}
        >
          {todo.text}
        </span>
      </div>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-400 hover:text-red-500 transition text-sm"
      >
        Delete
      </button>
    </div>
  );
}