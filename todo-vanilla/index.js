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

function getTodoList() {
  return document.querySelector("#todo-list");
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

  // create the paragraph
  const p = document.createElement("p");
  p.textContent = todo.description;
  p.classList.add("todo-item--text");
  if (todo.done) p.classList.add("todo-item--text__done");

  // create the button
  const button = document.createElement("button");
  button.classList.add("contrast", "outline", "todo-item--delete-button");
  button.textContent = "X";

  li.append(input, p, button);

  return li;
}

function renderTodos() {
  const list = getTodoList();

  while (list.firstChild) {
    list.removeChild(list.lastChild);
  }

  list.append(...todos.map(createTodo));
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

    renderTodos();
    event.target.value = "";
  });
}

function main() {
  renderTodos();
  initTodoForm();
}

document.addEventListener("DOMContentLoaded", () => main());
