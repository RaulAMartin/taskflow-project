// ===== Taskflow - App JS =====

// Elementos del DOM
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskCategory = document.getElementById("taskCategory");
const taskPriority = document.getElementById("taskPriority");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

// Clave para LocalStorage
const STORAGE_KEY = "taskflow_tasks_v1";

// Estado (array de tareas)
let tasks = [];

// Utilidades LocalStorage
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const data = localStorage.getItem(STORAGE_KEY);
  tasks = data ? JSON.parse(data) : [];
}

// Crear HTML de una tarea
function createTaskElement(task) {
  const card = document.createElement("article");
  card.className = "task-card";
  card.dataset.id = task.id;

  // prioridad -> clase visual
  const priorityClass =
    task.priority === "Alta" ? "high" : task.priority === "Media" ? "mid" : "low";

  card.innerHTML = `
    <div class="task-main">
      <div class="task-title">${escapeHtml(task.text)}</div>
      <div class="task-desc muted">${escapeHtml(task.category)}</div>
      <div class="task-tags">
        <span class="tag tag-soft">${escapeHtml(task.category)}</span>
        <span class="tag tag-soft">${escapeHtml(task.priority)}</span>
      </div>
    </div>

    <div class="task-side">
      <div class="meta-col">
        <div class="meta-label muted">Prioridad</div>
        <span class="badge ${priorityClass}">${escapeHtml(task.priority)}</span>
      </div>

      <div class="meta-col">
        <div class="meta-label muted">Acciones</div>
        <button class="btn-danger" data-action="delete">Eliminar</button>
      </div>
    </div>
  `;

  return card;
}

// Pintar todas las tareas
function renderTasks(filterText = "") {
  taskList.innerHTML = "";

  const normalized = filterText.trim().toLowerCase();

  const filtered = tasks.filter((t) =>
    t.text.toLowerCase().includes(normalized)
  );

  filtered.forEach((task) => {
    const el = createTaskElement(task);
    taskList.appendChild(el);
  });
}

// Añadir tarea
function addTask(text, category, priority) {
  const newTask = {
    id: crypto.randomUUID(),
    text: text.trim(),
    category,
    priority,
  };

  tasks.unshift(newTask); // la metemos al principio
  saveTasks();
  renderTasks(searchInput.value);

  // limpiar input
  taskInput.value = "";
  taskInput.focus();
}

// Eliminar tarea
function deleteTask(taskId) {
  tasks = tasks.filter((t) => t.id !== taskId);
  saveTasks();
  renderTasks(searchInput.value);
}

// Escape para evitar que se rompa el HTML con caracteres raros
function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ===== Eventos =====

// 1) Enviar formulario (añadir tarea)
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = taskInput.value;
  if (!text.trim()) return;

  addTask(text, taskCategory.value, taskPriority.value);
});

// 2) Delegación de eventos para eliminar (un listener para toda la lista)
taskList.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action='delete']");
  if (!btn) return;

  const card = e.target.closest(".task-card");
  if (!card) return;

  deleteTask(card.dataset.id);
});

// 3) Bonus: filtro de búsqueda
searchInput.addEventListener("input", (e) => {
  renderTasks(e.target.value);
});

// ===== Inicio =====
loadTasks();
renderTasks();