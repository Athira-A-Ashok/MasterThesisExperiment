function SortControls({ setSortType }) {
  return (
    <div>
      <button onClick={() => setSortType("date")}>Sort by Date</button>
      <button onClick={() => setSortType("alpha")}>
        Sort A-Z
      </button>
    </div>
  );
}

export default SortControls;