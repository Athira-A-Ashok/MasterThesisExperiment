export default function FilterSort({ setSortType }) {
  return (
    <div>
      <button onClick={() => setSortType("date")}>Sort by Date</button>
      <button onClick={() => setSortType("alpha")}>
        Sort Alphabetically
      </button>
    </div>
  );
}