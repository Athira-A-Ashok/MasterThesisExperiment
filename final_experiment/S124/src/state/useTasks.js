import { useReducer, useEffect } from "react";
import { taskReducer, ACTIONS } from "./taskReducer";
import { loadTasks, saveTasks } from "../utils/storage";

export function useTasks() {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  // Load on mount
  useEffect(() => {
    const stored = loadTasks();
    if (stored) {
      dispatch({ type: ACTIONS.SET, payload: stored });
    }
  }, []);

  // Persist on change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    dispatch({
      type: ACTIONS.ADD,
      payload: {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
        createdAt: Date.now()
      }
    });
  };

  const toggleTask = (id) => {
    dispatch({ type: ACTIONS.TOGGLE, payload: id });
  };

  const deleteTask = (id) => {
    dispatch({ type: ACTIONS.DELETE, payload: id });
  };

  return { tasks, addTask, toggleTask, deleteTask };
}