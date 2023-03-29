import TodoItem from "./TodoItem";

function TodoList({ todos, setStatus }) {
  return (
    <section>
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} setStatus={setStatus} />
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
