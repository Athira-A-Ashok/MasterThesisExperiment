export default function TodoStats({ stats }) {
  return (
    <div>
      <p>Total: {stats.total}</p>
      <p>Active: {stats.active}</p>
    </div>
  );
}