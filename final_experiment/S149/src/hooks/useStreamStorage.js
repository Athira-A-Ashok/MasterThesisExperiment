import { useEffect } from "react";

const STORAGE_KEY = "task_stream";

export function useStreamStorage(tasks, dispatch) {
  // Load
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      dispatch({
        type: "HYDRATE",
        payload: JSON.parse(stored),
      });
    }
  }, [dispatch]);

  // Save
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);
}