export default function TodoFooter({ count, onClear }) {
  return (
    <div>
      <span>{count} items left</span>
      <button onClick={onClear}>Clear Completed</button>
    </div>
  );
}