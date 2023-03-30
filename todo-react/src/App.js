import TodoList from "./components/TodoList";
import { useMemo, useState } from "react";
import TodoForm from "./components/TodoForm";
import ViewToggle from "./components/ViewToggle";

function App() {
  const [todos, setTodos] = useState([
    {
      id: crypto.randomUUID(),
      description: "Active item",
      done: false,
    },
    {
      id: crypto.randomUUID(),
      description: "Completed item",
      done: true,
    },
  ]);

  const [view, setView] = useState("all");

  const filteredTodos = useMemo(
    () =>
      todos.filter((t) => {
        return (
          view === "all" ||
          (view === "active" && !t.done) ||
          (view === "completed" && t.done)
        );
      }),
    [view, todos]
  );

  const addTodo = (description) =>
    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        description,
        done: false,
      },
    ]);

  const setTodoStatus = (id, done) =>
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done } : todo)));

  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));

  return (
    <>
      <header className="container">
        <h1>SPA Lunch &amp; Learn - 3/30/2023</h1>
      </header>

      <main className="container">
        <TodoForm onSave={addTodo} />
        <TodoList
          todos={filteredTodos}
          setStatus={setTodoStatus}
          deleteTodo={deleteTodo}
        />
        <ViewToggle view={view} setView={setView} />
      </main>
    </>
  );
}

export default App;
