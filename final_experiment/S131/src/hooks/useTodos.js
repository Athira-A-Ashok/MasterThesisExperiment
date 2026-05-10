import { useContext, useCallback } from 'react';
import { TodoContext } from '../context/TodoContext';
import { ACTIONS } from '../utils/reducer';

export function useTodos() {
  const { state, dispatch } = useContext(TodoContext);

  const addTask = useCallback((task) => {
    dispatch({ type: ACTIONS.ADD, payload: task });
  }, [dispatch]);

  const deleteTask = useCallback((id) => {
    dispatch({ type: ACTIONS.DELETE, payload: id });
  }, [dispatch]);

  const toggleTask = useCallback((id) => {
    dispatch({ type: ACTIONS.TOGGLE, payload: id });
  }, [dispatch]);

  return {
    tasks: state,
    addTask,
    deleteTask,
    toggleTask
  };
}