let todos = [];
let nextId = 1;

const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");

function render() {
  list.innerHTML = "";

  todos.forEach(function (todo) {
    const li = document.createElement("li");
    li.textContent = todo.text;

    if (todo.done) {
      li.style.textDecoration = "line-through";
    }

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✔";
    doneBtn.onclick = function () {
      toggleTodo(todo.id);
    };
    li.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
      editTodo(todo.id);
    };
    li.appendChild(editBtn);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = function () {
      deleteTodo(todo.id);
    };
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

function deleteTodo(id) {
  todos = todos.filter(function (t) {
    return t.id !== id;
  });
  render();
}

const dialog = document.getElementById("editDialog");
const editInput = document.getElementById("editInput");
let editingTodo = null;

function editTodo(id) {
  editingTodo = todos.find(function (t) {
    return t.id === id;
  });
  editInput.value = editingTodo.text;
  dialog.showModal();
}

function saveEdit() {
  const newText = editInput.value.trim();
  if (newText === "") return;

  editingTodo.text = newText;
  dialog.close();
  render();
}

document.getElementById("saveBtn").addEventListener("click", saveEdit);
document.getElementById("cancelBtn").addEventListener("click", function () {
  dialog.close();
});
editInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") saveEdit();
});

function toggleTodo(id) {
  const todo = todos.find(function (t) {
    return t.id === id;
  });
  todo.done = !todo.done;
  render();
}

function addTodo() {
  const text = input.value.trim();
  if (text === "") return;

  todos.push({ id: nextId++, text: text, done: false });
  input.value = "";

  render();
}

document.getElementById("addBtn").addEventListener("click", addTodo);