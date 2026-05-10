import React from "react";

export default function TodoFilters({
  filter,
  setFilter,
  clearCompleted,
  remaining,
}) {
  return (
    <section aria-label="Todo filters">
      <p>{remaining} items left</p>

      <div>
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
          >
            {f}
          </button>
        ))}
      </div>

      <button onClick={clearCompleted}>Clear completed</button>
    </section>
  );
}