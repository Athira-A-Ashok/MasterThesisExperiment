import { useTodoContext } from "../context/TodoContext";

export default function TodoFilter() {
  const { dispatch } = useTodoContext();

  return (
    <div>
      {["all", "active", "completed"].map(f => (
        <button
          key={f}
          onClick={() => dispatch({ type: "SET_FILTER", payload: f })}
        >
          {f}
        </button>
      ))}
    </div>
  );
}