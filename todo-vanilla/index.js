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

function clearTodoList() {
  const list = getTodoList();

  for (let node of list.childNodes) {
    list.removeChild(node);
  }
}

function addTodos() {
  getTodoList().append(...todos.map(createTodo));
}

function renderTodos() {
  clearTodoList();
  addTodos();
}

function main() {
  renderTodos();
}

document.addEventListener("DOMContentLoaded", () => main());
