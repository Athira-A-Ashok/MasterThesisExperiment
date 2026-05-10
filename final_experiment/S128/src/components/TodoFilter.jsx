import styles from "./TodoFilter.module.css";

export default function TodoFilter({ filter, onChange }) {
  const filters = ["all", "active", "completed"];

  return (
    <div className={`${styles.filters} flex gap-2 justify-center`}>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-3 py-1 rounded ${
            filter === f ? "bg-blue-500 text-white" : "border"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}


