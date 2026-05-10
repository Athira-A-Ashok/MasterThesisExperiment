import styles from "./TodoFooter.module.css";

export default function TodoFooter({ activeCount, hasCompleted, onClear }) {
  return (
    <div className={`${styles.footer} flex justify-between items-center mt-2`}>
      <span>{activeCount} items left</span>
      {hasCompleted && (
        <button onClick={onClear} className="text-sm text-red-500">
          Clear completed
        </button>
      )}
    </div>
  );
}
