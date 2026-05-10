export default function TodoFooter({ remaining, clearCompleted }) {
  return (
    <div>
      <span>{remaining} items left</span>
      <button onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
}