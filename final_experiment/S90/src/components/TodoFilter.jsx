import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/todo/todoSlice";

export default function TodoFilter() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.todo.filter);

  return (
    <div className="filters">
      {["all", "completed", "pending"].map(f => (
        <button
          key={f}
          className={filter === f ? "active" : ""}
          onClick={() => dispatch(setFilter(f))}
        >
          {f}
        </button>
      ))}
    </div>
  );
}