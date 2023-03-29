import TodoList from "./components/TodoList";
import { useState } from "react";
import TodoForm from "./components/TodoForm";

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

  return (
    <>
      <header className="container">
        <h1>SPA Lunch &amp; Learn - 3/30/2023</h1>
      </header>

      <main className="container">
        <TodoForm onSave={addTodo} />
        <TodoList todos={todos} setStatus={setTodoStatus} />
        <section className="grid">
          <button className="primary">All</button>
          <button className="secondary outline">Active</button>
          <button className="secondary outline">Completed</button>
        </section>
      </main>
    </>
  );
}

export default App;
