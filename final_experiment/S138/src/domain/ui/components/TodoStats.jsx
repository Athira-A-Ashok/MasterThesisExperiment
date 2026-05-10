export default function TodoStats({ remaining }) {
  return (
    <p aria-live="polite">
      {remaining} items left
    </p>
  );
}