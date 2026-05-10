import { useReducer } from "react";
import { todoReducer, initialState } from "./reducer";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./styles.css";

function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <div className="container">
      <h1>Todo List</h1>

      <TodoInput dispatch={dispatch} />

      <TodoList todos={state.todos} dispatch={dispatch} />
    </div>
  );
}

export default App;