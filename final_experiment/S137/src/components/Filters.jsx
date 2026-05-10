export default function Filters({ filter, setFilter }) {
  return (
    <div>
      {["ALL", "ACTIVE", "COMPLETED"].map(f => (
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