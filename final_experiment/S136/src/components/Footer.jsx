export default function Footer({ remaining, onClear }) {
  return (
    <div>
      <span>{remaining} items left</span>
      <button onClick={onClear}>Clear completed</button>
    </div>
  );
}