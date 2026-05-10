export const FILTERS = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
};

export default function TodoFilter({ filter, setFilter }) {
  return (
    <div>
      {Object.values(FILTERS).map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          disabled={filter === f}
        >
          {f}
        </button>
      ))}
    </div>
  );
}