import { ACTIONS } from "../../state/actions";

export default function TodoFilters({ dispatch, current }) {
  return (
    <div role="tablist" aria-label="Todo filters">
      {["ALL", "ACTIVE", "COMPLETED"].map((f) => (
        <button
          key={f}
          aria-pressed={current === f}
          onClick={() =>
            dispatch({ type: ACTIONS.SET_FILTER, payload: f })
          }
        >
          {f}
        </button>
      ))}
    </div>
  );
}