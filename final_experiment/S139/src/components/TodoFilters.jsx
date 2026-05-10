export const TodoFilters = ({ filter, setFilter, clearCompleted }) => {
  return (
    <div>
      {["all", "active", "completed"].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          style={{ fontWeight: filter === f ? "bold" : "normal" }}
        >
          {f}
        </button>
      ))}

      <button onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
};