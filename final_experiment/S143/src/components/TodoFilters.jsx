import { FILTERS } from "../utils/filters";

export default function TodoFilters({ filter, setFilter }) {
  return (
    <div>
      {Object.values(FILTERS).map(f => (
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