// ===== Taskflow - App JS (final) =====

// --------- DOM ---------
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskCategory = document.getElementById("taskCategory");
const taskPriority = document.getElementById("taskPriority");
const taskList = document.getElementById("taskList");

const searchInput = document.getElementById("searchInput");
const topSearchInput = document.getElementById("topSearchInput");

const filterHigh = document.getElementById("filterHigh");
const filterMid = document.getElementById("filterMid");
const filterLow = document.getElementById("filterLow");

const statTotal = document.getElementById("statTotal");
const statPending = document.getElementById("statPending");
const statHigh = document.getElementById("statHigh");

// --------- LocalStorage ---------
const STORAGE_KEY = "taskflow_tasks_v3";

// Estado
let tasks = [];

// --------- Storage helpers ---------
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const data = localStorage.getItem(STORAGE_KEY);
  tasks = data ? JSON.parse(data) : [];
}

// --------- Seed (3 tareas iniciales) ---------
function seedTasksIfEmpty() {
  if (tasks.length > 0) return;

  tasks = [
    {
      id: crypto.randomUUID(),
      text: "Terminar práctica DAM",
      category: "Estudio",
      priority: "Alta",
      done: false,
      createdAt: Date.now()
    },
    {
      id: crypto.randomUUID(),
      text: "Revisar correos",
      category: "Trabajo",
      priority: "Baja",
      done: false,
      createdAt: Date.now()
    },
    {
      id: crypto.randomUUID(),
      text: "Preparar presentación",
      category: "Personal",
      priority: "Media",
      done: false,
      createdAt: Date.now()
    }
  ];

  saveTasks();
}

// --------- Seguridad HTML ---------
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// --------- UI helpers ---------
function getPriorityClass(priority) {
  if (priority === "Alta") return "high";
  if (priority === "Media") return "mid";
  return "low";
}

function normalizeText(s) {
  return s.trim().toLowerCase();
}

// Sincroniza ambos buscadores (arriba y abajo)
function syncSearchInputs(value) {
  if (searchInput && searchInput.value !== value) searchInput.value = value;
  if (topSearchInput && topSearchInput.value !== value) topSearchInput.value = value;
}

function getSearchText() {
  const a = topSearchInput ? topSearchInput.value : "";
  const b = searchInput ? searchInput.value : "";
  // usamos el que tenga más contenido (por si uno está vacío)
  return a.length >= b.length ? a : b;
}

// --------- Stats ---------
function updateStats() {
  const total = tasks.length;
  const pending = tasks.filter(t => !t.done).length;
  const high = tasks.filter(t => t.priority === "Alta").length;

  if (statTotal) statTotal.textContent = String(total);
  if (statPending) statPending.textContent = String(pending);
  if (statHigh) statHigh.textContent = String(high);
}

// --------- Crear tarjeta DOM ---------
function createTaskElement(task) {
  const card = document.createElement("article");
  card.className = "task-card";
  card.dataset.id = task.id;

  if (task.done) card.classList.add("done");

  const priorityClass = getPriorityClass(task.priority);

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
        <div class="meta-label muted">Estado</div>
        <button class="btn-ghost" data-action="toggle">
          ${task.done ? "Reabrir" : "Completar"}
        </button>
      </div>

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

// --------- Filtros ---------
function getAllowedPriorities() {
  const set = new Set();
  if (filterHigh?.checked) set.add("Alta");
  if (filterMid?.checked) set.add("Media");
  if (filterLow?.checked) set.add("Baja");
  return set;
}

function applyFilters(list) {
  const q = normalizeText(getSearchText());
  const allowed = getAllowedPriorities();

  return list.filter(t => {
    const matchesText = q === "" || t.text.toLowerCase().includes(q);
    const matchesPriority = allowed.size === 0 ? false : allowed.has(t.priority);
    return matchesText && matchesPriority;
  });
}

// --------- Render ---------
function render() {
  const filtered = applyFilters(tasks);

  taskList.innerHTML = "";
  filtered.forEach(t => taskList.appendChild(createTaskElement(t)));

  updateStats();
}

// --------- Acciones ---------
function addTask(text, category, priority) {
  const clean = text.trim();
  if (!clean) return;

  const newTask = {
    id: crypto.randomUUID(),
    text: clean,
    category,
    priority,
    done: false,
    createdAt: Date.now()
  };

  tasks.unshift(newTask);
  saveTasks();
  render();

  taskInput.value = "";
  taskInput.focus();
}

function toggleDone(taskId) {
  const t = tasks.find(x => x.id === taskId);
  if (!t) return;

  t.done = !t.done;
  saveTasks();
  render();
}

function deleteTaskAnimated(taskId, cardEl) {
  if (cardEl) {
    cardEl.classList.add("removing");
    setTimeout(() => {
      tasks = tasks.filter(t => t.id !== taskId);
      saveTasks();
      render();
    }, 180);
  } else {
    tasks = tasks.filter(t => t.id !== taskId);
    saveTasks();
    render();
  }
}

// --------- Eventos ---------

// Añadir tarea
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask(taskInput.value, taskCategory.value, taskPriority.value);
});

// Clicks (delegación)
taskList.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const card = e.target.closest(".task-card");
  if (!card) return;

  const id = card.dataset.id;
  const action = btn.dataset.action;

  if (action === "delete") {
    deleteTaskAnimated(id, card);
  } else if (action === "toggle") {
    toggleDone(id);
  }
});

// Búsqueda inferior
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    syncSearchInputs(e.target.value);
    render();
  });
}

// Búsqueda superior
if (topSearchInput) {
  topSearchInput.addEventListener("input", (e) => {
    syncSearchInputs(e.target.value);
    render();
  });
}

// Filtros prioridad
filterHigh?.addEventListener("change", render);
filterMid?.addEventListener("change", render);
filterLow?.addEventListener("change", render);

// --------- Inicio ---------
loadTasks();
seedTasksIfEmpty();
render();
