const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const dateTime = document.getElementById("dateTime");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

/* Hiển thị giờ hiện tại */
function updateTime() {
  const now = new Date();
  dateTime.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}
setInterval(updateTime, 1000);
updateTime();

/* Render danh sách việc */
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach(todo => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " completed" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const span = document.createElement("span");
    span.textContent = todo.text;

    const time = document.createElement("span");
    time.className = "todo-time";
    time.textContent = new Date(todo.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(time);

    todoList.appendChild(li);
  });
}

/* Thêm việc mới */
todoForm.addEventListener("submit", e => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) {
    alert("⚠️ Không được để trống!");
    return;
  }

  const newTodo = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date().toISOString()
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos();
  todoInput.value = "";
});

/* Toggle hoàn thành */
function toggleTodo(id) {
  todos = todos.map(todo =>
    todo.id === id ? {...todo, completed: !todo.completed} : todo
  );
  saveTodos();
  renderTodos();
}

/* Lưu vào localStorage */
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

/* Khởi động */
renderTodos();
