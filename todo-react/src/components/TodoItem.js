function TodoItem({ todo, setStatus, deleteTodo }) {
  return (
    <li className="todo-item">
      <input
        checked={todo.done}
        type="checkbox"
        className="todo-item--checkbox"
        onChange={() => setStatus(todo.id, !todo.done)}
      />
      <p
        className={`todo-item--text ${
          todo.done ? "todo-item--text__done" : null
        }`}
      >
        {todo.description}
      </p>
      <button
        className="contrast outline todo-item--delete-button"
        onClick={() => deleteTodo(todo.id)}
      >
        X
      </button>
    </li>
  );
}

export default TodoItem;
