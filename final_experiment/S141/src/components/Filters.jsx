import { FILTERS } from "../utils/constants";

export default function Filters({ filter, setFilter }) {
  return (
    <div>
      {Object.values(FILTERS).map((f) => (
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