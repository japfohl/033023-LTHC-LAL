function App() {
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
        <section>
          <ul className="todo-list">
            <li className="todo-item">
              <input type="checkbox" className="todo-item--checkbox" />
              <p className="todo-item--text">Active item</p>
              <button className="contrast outline todo-item--delete-button">
                &Chi;
              </button>
            </li>
            <li className="todo-item">
              <input checked type="checkbox" className="todo-item--checkbox" />
              <p className="todo-item--text todo-item--text__done">
                Completed item
              </p>
              <button className="contrast outline todo-item--delete-button">
                &Chi;
              </button>
            </li>
          </ul>
        </section>
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
