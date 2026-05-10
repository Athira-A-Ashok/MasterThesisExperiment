export default function FilterBar({ filter, setFilter, activeCount }) {
  return (
    <div>
      <div role="group" aria-label="Filter tasks">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <p aria-live="polite">{activeCount} tasks remaining</p>
    </div>
  );
}