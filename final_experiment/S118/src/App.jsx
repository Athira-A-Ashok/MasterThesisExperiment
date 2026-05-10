import { useReducer, useState } from "react";
import styles from "./App.module.css";

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [
        {
          id: crypto.randomUUID(),
          text: action.payload,
          completed: false,
          createdAt: Date.now(),
          isRemoving: false,
        },
        ...state,
      ];

    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.id
          ? { ...task, completed: !task.completed }
          : task
      );

    case "MARK_REMOVING":
      return state.map((task) =>
        task.id === action.id ? { ...task, isRemoving: true } : task
      );

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.id);

    default:
      return state;
  }
}

export default function App() {
  const [tasks, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState("");

  const addTask = () => {
    const value = text.trim();
    if (!value) return;

    dispatch({ type: "ADD_TASK", payload: value });
    setText("");
  };

  const handleDelete = (id) => {
    dispatch({ type: "MARK_REMOVING", id });
    setTimeout(() => {
      dispatch({ type: "DELETE_TASK", id });
    }, 250);
  };

  return (
    <main className={styles.app}>
      <h1 className={styles.title}>Todo</h1>

      <section className={styles.inputSection}>
        <label htmlFor="taskInput" className={styles.label}>
          Add task
        </label>

        <div className={styles.inputRow}>
          <input
            id="taskInput"
            className={styles.input}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Write a task..."
            aria-label="Task input"
          />

          <button className={styles.button} onClick={addTask}>
            Add
          </button>
        </div>
      </section>

      <ul className={styles.list} aria-live="polite">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={[
              styles.task,
              task.completed ? styles.completed : "",
              task.isRemoving ? styles.removing : "",
            ].join(" ")}
          >
            <label className={styles.taskLabel}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  dispatch({ type: "TOGGLE_TASK", id: task.id })
                }
                aria-label={`Mark ${task.text} as completed`}
              />

              <span className={styles.text}>{task.text}</span>
            </label>

            <button
              className={styles.delete}
              onClick={() => handleDelete(task.id)}
              aria-label="Delete task"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}