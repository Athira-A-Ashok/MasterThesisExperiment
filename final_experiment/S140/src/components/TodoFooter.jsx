import styles from "../styles/TodoFooter.module.css";

export default function TodoFooter({
  activeCount,
  filter,
  setFilter,
  clearCompleted,
  hasCompleted,
  FILTERS,
}) {
  return (
    <div className="mt-4 flex flex-col gap-3">
      <div className="text-sm text-gray-600">
        {activeCount} items left
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2 text-sm">
          {Object.values(FILTERS).map((f) => (
            <button
              key={f}
              className={filter === f ? "font-bold" : ""}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {hasCompleted && (
          <button
            className="text-sm text-red-500"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}