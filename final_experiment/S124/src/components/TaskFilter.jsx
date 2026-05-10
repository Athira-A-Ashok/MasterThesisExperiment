export default function TaskFilter({ current, setFilter }) {
  return (
    <div>
      {["all", "active", "completed"].map(type => (
        <button
          key={type}
          onClick={() => setFilter(type)}
          style={{
            fontWeight: current === type ? "bold" : "normal"
          }}
        >
          {type}
        </button>
      ))}
    </div>
  );
}