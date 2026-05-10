import { useState, useMemo } from "react";
import { useTodos } from "./hooks/useTodos";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Filters from "./components/Filters";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import styles from "./styles/App.module.css";

export default function App() {
  const { state } = useTodos();

  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const filteredTodos = useMemo(() => {
    return state.todos
      .filter(todo => {
        if (filter === "ACTIVE") return !todo.completed;
        if (filter === "COMPLETED") return todo.completed;
        return true;
      })
      .filter(todo =>
        todo.text.toLowerCase().includes(search.toLowerCase())
      );
  }, [state.todos, filter, search]);

  const itemsLeft = state.todos.filter(t => !t.completed).length;

  return (
    <div className={styles.container}>
      <Header itemsLeft={itemsLeft} />

      <TodoInput />
      <SearchBar search={search} setSearch={setSearch} />
      <Filters filter={filter} setFilter={setFilter} />

      <TodoList todos={filteredTodos} />
    </div>
  );
}