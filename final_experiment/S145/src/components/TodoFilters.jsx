export default function TodoFilters({ clearCompleted }) {
  return (
    <div>
      <button onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
}