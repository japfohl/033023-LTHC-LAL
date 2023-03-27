function TodoItem({ todo }) {
  return (
    <li className="todo-item">
      <input
        checked={todo.done}
        type="checkbox"
        className="todo-item--checkbox"
      />
      <p
        className={`todo-item--text ${
          todo.done ? "todo-item--text__done" : null
        }`}
      >
        {todo.description}
      </p>
      <button className="contrast outline todo-item--delete-button">X</button>
    </li>
  );
}

export default TodoItem;
