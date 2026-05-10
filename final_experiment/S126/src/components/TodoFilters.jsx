import { useTodos } from "../context/TodoContext";

export default function TodoFilters() {
  const { state, dispatch } = useTodos();

  const filters = ["ALL", "ACTIVE", "COMPLETED"];

  return (
    <div className="filters">
      {filters.map((f) => (
        <button
          key={f}
          className={state.filter === f ? "active" : ""}
          onClick={() => dispatch({ type: "SET_FILTER", payload: f })}
        >
          {f}
        </button>
      ))}
    </div>
  );
}