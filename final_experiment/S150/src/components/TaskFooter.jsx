export default function TaskFooter({
  remaining,
  filter,
  dispatch,
  hasCompleted,
}) {
  return (
    <div className="mt-4 space-y-3">

      <div className="text-sm text-gray-600">
        {remaining} tasks remaining
      </div>

      <div className="flex gap-2 flex-wrap">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() =>
              dispatch({ type: "SET_FILTER", payload: f })
            }
            className={`px-3 py-1 rounded-lg border ${
              filter === f ? "bg-blue-500 text-white" : ""
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {hasCompleted && (
        <button
          onClick={() =>
            dispatch({ type: "CLEAR_COMPLETED" })
          }
          className="text-sm text-red-500"
        >
          Clear completed
        </button>
      )}
    </div>
  );
}