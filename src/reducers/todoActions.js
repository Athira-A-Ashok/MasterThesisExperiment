export const ACTIONS = {
  ADD: "ADD",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
  CLEAR_COMPLETED: "CLEAR_COMPLETED",
  SET_FILTER: "SET_FILTER",
  SET_SEARCH: "SET_SEARCH",
};

export const addTodo = (text) => ({
  type: ACTIONS.ADD,
  payload: text,
});

export const toggleTodo = (id) => ({
  type: ACTIONS.TOGGLE,
  payload: id,
});

export const deleteTodo = (id) => ({
  type: ACTIONS.DELETE,
  payload: id,
});

export const clearCompleted = () => ({
  type: ACTIONS.CLEAR_COMPLETED,
});

export const setFilter = (filter) => ({
  type: ACTIONS.SET_FILTER,
  payload: filter,
});

export const setSearch = (text) => ({
  type: ACTIONS.SET_SEARCH,
  payload: text,
});