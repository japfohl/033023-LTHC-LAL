import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import ViewToggle from "./components/ViewToggle";
import { useTodos } from "./hooks/useTodos";

function App() {
  const { todos, view, addTodo, setTodoStatus, deleteTodo, setView } =
    useTodos();

  return (
    <>
      <header className="container">
        <h1>SPA Lunch &amp; Learn - 3/30/2023</h1>
      </header>

      <main className="container">
        <TodoForm onSave={addTodo} />
        <TodoList
          todos={todos}
          setStatus={setTodoStatus}
          deleteTodo={deleteTodo}
        />
        <ViewToggle view={view} setView={setView} />
      </main>
    </>
  );
}

export default App;
