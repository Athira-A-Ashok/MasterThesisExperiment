export default function TodoFilter({ filter, setFilter }) {
  const filters = ["all", "active", "completed"];

  return (
    <div className="flex justify-center gap-2 mb-4">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 rounded border ${
            filter === f ? "bg-blue-500 text-white" : ""
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}