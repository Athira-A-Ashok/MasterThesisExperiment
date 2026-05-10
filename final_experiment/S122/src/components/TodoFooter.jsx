export default function TodoFooter({
  activeCount,
  clearCompleted,
  hasCompleted,
}) {
  return (
    <div className="flex justify-between items-center mt-4 pt-3 border-t">
      <span className="text-sm text-gray-600">
        {activeCount} tasks left
      </span>

      {hasCompleted && (
        <button
          onClick={clearCompleted}
          className="text-sm text-red-500"
        >
          Clear Completed
        </button>
      )}
    </div>
  );
}