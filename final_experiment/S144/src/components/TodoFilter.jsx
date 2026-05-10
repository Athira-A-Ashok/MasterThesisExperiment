export default function TodoFilter({ filter, setFilter }) {
  return (
    <div>
      {["all", "active", "completed"].map(f => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          style={{ fontWeight: filter === f ? "bold" : "normal" }}
        >
          {f}
        </button>
      ))}
    </div>
  );
}