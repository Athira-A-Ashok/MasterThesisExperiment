export default function SearchBar({ search, setSearch }) {
  return (
    <input
      placeholder="Search tasks..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}