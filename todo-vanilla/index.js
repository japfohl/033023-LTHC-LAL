let todos = [
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

let view = "all";

function getTodoList() {
  return document.querySelector("#todo-list");
}

function toggleTodo(id, done) {
  todos = todos.map((t) => (t.id === id ? { ...t, done } : t));
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  renderTodos();
}

function createTodo(todo) {
  // create the base list element
  const li = document.createElement("li");
  li.classList.add("todo-item");
  li.dataset.todoId = todo.id;

  // create the input
  const input = document.createElement("input");
  input.type = "checkbox";
  input.classList.add("todo-item--checkbox");
  input.checked = todo.done;

  // handle input toggles
  input.addEventListener("change", () => toggleTodo(todo.id, !todo.done));

  // create the paragraph
  const p = document.createElement("p");
  p.textContent = todo.description;
  p.classList.add("todo-item--text");
  if (todo.done) p.classList.add("todo-item--text__done");

  // create the button
  const button = document.createElement("button");
  button.classList.add("contrast", "outline", "todo-item--delete-button");
  button.textContent = "X";

  button.addEventListener("click", () => deleteTodo(todo.id));

  li.append(input, p, button);

  return li;
}

function renderTodos() {
  const list = getTodoList();

  while (list.firstChild) {
    list.removeChild(list.lastChild);
  }

  list.append(
    ...todos
      .filter((t) => {
        return (
          view === "all" ||
          (view === "active" && !t.done) ||
          (view === "completed" && t.done)
        );
      })
      .map(createTodo)
  );
}

function initTodoForm() {
  document.querySelector("#todo-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const description = data.get("description");

    todos.push({
      id: crypto.randomUUID(),
      description,
      done: false,
    });

    document.querySelector("#todoInput").value = "";
    renderTodos();
  });
}

function setButtonState() {
  const names = ["all", "active", "completed"];

  for (let name of names) {
    document.querySelector(`#${name}-toggle`).classList =
      view === name ? "primary" : "secondary outline";
  }
}

function setTodoListView(viewName) {
  view = viewName;
  renderTodos();
  setButtonState();
}

function initViewToggles() {
  document
    .querySelector("#all-toggle")
    .addEventListener("click", () => setTodoListView("all"));

  document
    .querySelector("#active-toggle")
    .addEventListener("click", () => setTodoListView("active"));

  document
    .querySelector("#completed-toggle")
    .addEventListener("click", () => setTodoListView("completed"));
}

function main() {
  renderTodos();
  initTodoForm();
  initViewToggles();
}

document.addEventListener("DOMContentLoaded", () => main());
