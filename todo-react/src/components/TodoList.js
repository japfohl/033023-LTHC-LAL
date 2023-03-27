import TodoItem from "./TodoItem";

function TodoList({ todos }) {
  return (
    <section>
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
