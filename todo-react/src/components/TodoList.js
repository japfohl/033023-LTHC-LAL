import TodoItem from "./TodoItem";

function TodoList({ todos, setStatus, deleteTodo }) {
  return (
    <section>
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setStatus={setStatus}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
