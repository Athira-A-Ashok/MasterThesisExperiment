export default function Header({ itemsLeft }) {
  return (
    <div>
      <h1>Todo App</h1>
      <p>{itemsLeft} items left</p>
    </div>
  );
}