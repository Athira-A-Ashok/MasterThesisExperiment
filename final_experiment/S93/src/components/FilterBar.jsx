import styles from "../styles/FilterBar.module.css";

export default function FilterBar({ dispatch, activeCount }) {
  return (
    <div className={styles.bar}>
      <p tabIndex="0">{activeCount} items left</p>

      <button onClick={() => dispatch({ type: "SET_FILTER", payload: "ALL" })}>
        All
      </button>

      <button onClick={() => dispatch({ type: "SET_FILTER", payload: "ACTIVE" })}>
        Active
      </button>

      <button onClick={() => dispatch({ type: "SET_FILTER", payload: "COMPLETED" })}>
        Completed
      </button>
    </div>
  );
}