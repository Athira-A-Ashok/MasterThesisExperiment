import React from "react";

function TodoFooter({ count, filter, setFilter }) {
  return (
    <div>
      <p>{count} items left</p>

      <div>
        {["ALL", "ACTIVE", "COMPLETED"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-label={`Filter ${f}`}
            style={{ fontWeight: filter === f ? "bold" : "normal" }}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}

export default React.memo(TodoFooter);