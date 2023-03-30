import { useState, useMemo } from "react";

export function useTodos(defaultTodos = [], defaultView = "all") {
  const [todos, setTodos] = useState(defaultTodos);
  const [view, setView] = useState(defaultView);

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

  return {
    todos: filteredTodos,
    addTodo,
    setTodoStatus,
    deleteTodo,
    view,
    setView,
  };
}
