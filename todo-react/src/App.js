import TodoList from "./components/TodoList";

function App() {
  const todos = [
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
  ];

  return (
    <>
      <header className="container">
        <h1>SPA Lunch &amp; Learn - 3/30/2023</h1>
      </header>

      <main className="container">
        <section>
          <input
            className="todo-form"
            type="text"
            name="todoInput"
            id="todoInput"
            placeholder="What has to be done?"
          />
        </section>
        <TodoList todos={todos} />
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
