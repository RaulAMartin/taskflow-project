// ===== Taskflow - App JS mejorado =====

// ---------- Elementos base ----------
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskCategory = document.getElementById("taskCategory");
const taskPriority = document.getElementById("taskPriority");
const taskList = document.getElementById("taskList");
const formMessage = document.getElementById("formMessage");

const searchInput = document.getElementById("searchInput");
const topSearchInput = document.getElementById("topSearchInput");
const topSearchInputMobile = document.getElementById("topSearchInputMobile");

const filterHigh = document.getElementById("filterHigh");
const filterMid = document.getElementById("filterMid");
const filterLow = document.getElementById("filterLow");

const statTotal = document.getElementById("statTotal");
const statCompleted = document.getElementById("statCompleted");
const statPending = document.getElementById("statPending");
const statHigh = document.getElementById("statHigh");

const pillStudy = document.getElementById("pillStudy");
const pillWork = document.getElementById("pillWork");
const pillPersonal = document.getElementById("pillPersonal");

const categoryFilterButtons = document.querySelectorAll(".category-filter");
const clearCategoryFiltersBtn = document.getElementById("clearCategoryFilters");

const viewAllBtn = document.getElementById("viewAll");
const viewPendingBtn = document.getElementById("viewPending");
const viewCompletedBtn = document.getElementById("viewCompleted");

const markAllDoneBtn = document.getElementById("markAllDone");
const clearCompletedBtn = document.getElementById("clearCompleted");
const sortTasks = document.getElementById("sortTasks");

const themeToggle = document.getElementById("themeToggle");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const progressMeta = document.getElementById("progressMeta");

// ---------- Config ----------
const STORAGE_KEY = "taskflow_tasks_v6";
const THEME_KEY = "taskflow_theme";

let tasks = [];
let selectedCategories = new Set();
let currentView = "all";
let currentSort = "manual";
let draggedTaskId = null;

// ---------- Utilidades ----------
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeText(text) {
  return String(text).trim().replace(/\s+/g, " ");
}

function getPriorityValue(priority) {
  if (priority === "Alta") return 0;
  if (priority === "Media") return 1;
  return 2;
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString("es-ES", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function showFormMessage(text, type = "info") {
  if (!formMessage) return;

  formMessage.textContent = text;
  formMessage.classList.remove("hidden");

  const baseClasses = "mt-3 rounded-lg border px-3 py-2 text-sm";
  let colorClasses = "";

  if (type === "error") {
    colorClasses =
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200";
  } else if (type === "success") {
    colorClasses =
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200";
  } else {
    colorClasses =
      "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200";
  }

  formMessage.className = `${baseClasses} ${colorClasses}`;
}

function hideFormMessage() {
  if (!formMessage) return;
  formMessage.textContent = "";
  formMessage.className = "mt-3 hidden rounded-lg border px-3 py-2 text-sm";
}

function validateTaskText(text, ignoreId = null) {
  const clean = normalizeText(text);

  if (!clean) return "La tarea no puede estar vacía.";
  if (clean.length < 3) return "La tarea debe tener al menos 3 caracteres.";
  if (clean.length > 120) return "La tarea no puede superar los 120 caracteres.";

  const duplicated = tasks.some(
    (task) =>
      task.id !== ignoreId &&
      task.text.toLowerCase() === clean.toLowerCase()
  );

  if (duplicated) return "Ya existe una tarea con ese mismo texto.";

  return null;
}

// ---------- Persistencia ----------
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const data = localStorage.getItem(STORAGE_KEY);

  try {
    const parsed = data ? JSON.parse(data) : [];
    tasks = Array.isArray(parsed) ? parsed : [];
  } catch {
    tasks = [];
  }
}

function seedIfEmpty() {
  if (tasks.length > 0) return;

  tasks = [
    {
      id: crypto.randomUUID(),
      text: "Terminar el proyecto",
      category: "Estudio",
      priority: "Alta",
      done: false,
      createdAt: Date.now(),
    },
    {
      id: crypto.randomUUID(),
      text: "Revisar correos",
      category: "Trabajo",
      priority: "Baja",
      done: false,
      createdAt: Date.now() - 1000 * 60 * 10,
    },
    {
      id: crypto.randomUUID(),
      text: "Preparar presentación",
      category: "Personal",
      priority: "Media",
      done: false,
      createdAt: Date.now() - 1000 * 60 * 20,
    },
  ];

  saveTasks();
}

// ---------- Búsqueda y filtros ----------
function syncSearchInputs(value) {
  if (searchInput && searchInput.value !== value) searchInput.value = value;
  if (topSearchInput && topSearchInput.value !== value) topSearchInput.value = value;
  if (topSearchInputMobile && topSearchInputMobile.value !== value) {
    topSearchInputMobile.value = value;
  }
}

function getSearchText() {
  const values = [
    searchInput?.value || "",
    topSearchInput?.value || "",
    topSearchInputMobile?.value || "",
  ];

  return values.sort((a, b) => b.length - a.length)[0] || "";
}

function getAllowedPriorities() {
  const set = new Set();

  if (filterHigh?.checked) set.add("Alta");
  if (filterMid?.checked) set.add("Media");
  if (filterLow?.checked) set.add("Baja");

  return set;
}

function applyFilters(list) {
  const q = getSearchText().trim().toLowerCase();
  const allowedPriorities = getAllowedPriorities();

  return list.filter((task) => {
    const matchesText = q === "" || task.text.toLowerCase().includes(q);

    const matchesPriority =
      allowedPriorities.size === 0 ? false : allowedPriorities.has(task.priority);

    const matchesCategory =
      selectedCategories.size === 0 ? true : selectedCategories.has(task.category);

    const matchesView =
      currentView === "all"
        ? true
        : currentView === "pending"
        ? !task.done
        : task.done;

    return matchesText && matchesPriority && matchesCategory && matchesView;
  });
}

function applySort(list) {
  const sorted = [...list];

  if (currentSort === "manual") {
    return sorted;
  }

  if (currentSort === "oldest") {
    sorted.sort((a, b) => a.createdAt - b.createdAt);
  }

  if (currentSort === "newest") {
    sorted.sort((a, b) => b.createdAt - a.createdAt);
  }

  if (currentSort === "priority") {
    sorted.sort((a, b) => {
      const priorityDiff = getPriorityValue(a.priority) - getPriorityValue(b.priority);
      if (priorityDiff !== 0) return priorityDiff;
      return b.createdAt - a.createdAt;
    });
  }

  if (currentSort === "alphabetical") {
    sorted.sort((a, b) => a.text.localeCompare(b.text, "es"));
  }

  return sorted;
}

// ---------- UI ----------
function updateCategoryFilterUI() {
  categoryFilterButtons.forEach((btn) => {
    const category = btn.dataset.category;
    const isActive = selectedCategories.has(category);

    btn.setAttribute("aria-pressed", String(isActive));

    btn.className = [
      "category-filter",
      "flex",
      "w-full",
      "items-center",
      "justify-between",
      "rounded-lg",
      "border",
      "px-3",
      "py-2",
      "text-left",
      "transition",
      isActive
        ? "border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900"
        : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700 dark:hover:bg-slate-900",
    ].join(" ");

    const badge = btn.querySelector("span:last-child");

    if (badge) {
      badge.className = isActive
        ? "rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold text-white dark:bg-slate-900/10 dark:text-slate-900"
        : "rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-100";
    }
  });
}

function updateViewButtonsUI() {
  const map = [
    { btn: viewAllBtn, view: "all" },
    { btn: viewPendingBtn, view: "pending" },
    { btn: viewCompletedBtn, view: "completed" },
  ];

  map.forEach(({ btn, view }) => {
    if (!btn) return;

    const isActive = currentView === view;

    btn.className = isActive
      ? "rounded-lg border border-slate-200 bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:border-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
      : "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800";
  });
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.done).length;
  const pending = tasks.filter((task) => !task.done).length;
  const urgent = tasks.filter((task) => task.priority === "Alta").length;

  statTotal.textContent = String(total);
  statCompleted.textContent = String(completed);
  statPending.textContent = String(pending);
  statHigh.textContent = String(urgent);

  pillStudy.textContent = String(tasks.filter((task) => task.category === "Estudio").length);
  pillWork.textContent = String(tasks.filter((task) => task.category === "Trabajo").length);
  pillPersonal.textContent = String(tasks.filter((task) => task.category === "Personal").length);
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.done).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }

  if (progressText) {
    progressText.textContent = `${percentage}%`;
  }

  if (progressMeta) {
    progressMeta.textContent = `${completed} de ${total} completadas`;
  }
}

function badgeTailwind(priority) {
  if (priority === "Alta") return "bg-red-500";
  if (priority === "Media") return "bg-amber-500";
  return "bg-emerald-500";
}

function createTaskElement(task) {
  const card = document.createElement("article");

  card.className = [
    "task-card",
    "overflow-hidden",
    "rounded-xl",
    "border",
    "border-slate-200",
    "bg-white",
    "p-4",
    "shadow-sm",
    "transition",
    "duration-200",
    "ease-out",
    "hover:-translate-y-0.5",
    "hover:shadow-md",
    "dark:border-slate-800",
    "dark:bg-slate-900",
    "opacity-0",
    "translate-y-2",
    "cursor-move",
    task.done ? "opacity-80" : "",
  ]
    .filter(Boolean)
    .join(" ");

  card.dataset.id = task.id;
  card.draggable = true;

  const titleClass = task.done ? "line-through decoration-2" : "";
  const badgeClass = badgeTailwind(task.priority);

  card.innerHTML = `
    <div class="grid gap-4 lg:grid-cols-[1fr_220px]">
      <div class="min-w-0">
        <div class="flex flex-wrap items-start justify-between gap-2">
          <h3 class="text-sm font-extrabold ${titleClass}">
            ${escapeHtml(task.text)}
          </h3>

          <span class="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${
            task.done
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
              : "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
          }">
            ${task.done ? "Completada" : "Pendiente"}
          </span>
        </div>

        <div class="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Creada: ${escapeHtml(formatDate(task.createdAt))}
        </div>

        <div class="mt-3 flex flex-wrap gap-2">
          <span class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
            ${escapeHtml(task.category)}
          </span>

          <span class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
            ${escapeHtml(task.priority)}
          </span>
        </div>
      </div>

      <div class="min-w-0 flex flex-col gap-3">
        <div class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-950">
          <div class="mb-2 text-[11px] font-semibold text-slate-600 dark:text-slate-400">Estado</div>

          <button
            class="w-full rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus:ring-slate-600 transition"
            data-action="toggle"
            type="button"
          >
            ${task.done ? "Reabrir" : "Completar"}
          </button>
        </div>

        <div class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-950">
          <div class="mb-2 text-[11px] font-semibold text-slate-600 dark:text-slate-400">Prioridad</div>
          <span class="inline-flex w-full items-center justify-center rounded-full px-3 py-2 text-xs font-extrabold text-white ${badgeClass}">
            ${escapeHtml(task.priority)}
          </span>
        </div>

        <div class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-950">
          <div class="mb-2 text-[11px] font-semibold text-slate-600 dark:text-slate-400">Acciones</div>

          <div class="flex gap-2">
            <button
              class="w-full rounded-full bg-slate-900 px-3 py-2 text-xs font-extrabold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus:ring-slate-600 transition"
              data-action="edit"
              type="button"
            >
              Editar
            </button>

            <button
              class="w-full rounded-full bg-red-500/15 px-3 py-2 text-xs font-extrabold text-red-700 hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-400 dark:text-red-200 dark:focus:ring-red-500 transition"
              data-action="delete"
              type="button"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  return card;
}

function animateTaskEntry(element) {
  requestAnimationFrame(() => {
    element.classList.remove("opacity-0", "translate-y-2");
  });
}

function renderEmptyState() {
  taskList.innerHTML = `
    <article class="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div class="text-base font-semibold">No hay tareas que mostrar</div>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Prueba a cambiar los filtros o añade una nueva tarea.
      </p>
    </article>
  `;
}

function render() {
  taskList.innerHTML = "";

  const filtered = applyFilters(tasks);
  const sorted = applySort(filtered);

  if (sorted.length === 0) {
    renderEmptyState();
  } else {
    sorted.forEach((task) => {
      const taskElement = createTaskElement(task);
      taskList.appendChild(taskElement);
      animateTaskEntry(taskElement);
    });
  }

  updateStats();
  updateProgress();
  updateCategoryFilterUI();
  updateViewButtonsUI();
  initDragAndDrop();
}

// ---------- CRUD ----------
function addTask(text, category, priority) {
  const clean = normalizeText(text);
  const error = validateTaskText(clean);

  if (error) {
    showFormMessage(error, "error");
    taskInput.focus();
    return;
  }

  tasks.unshift({
    id: crypto.randomUUID(),
    text: clean,
    category,
    priority,
    done: false,
    createdAt: Date.now(),
  });

  saveTasks();
  taskInput.value = "";
  hideFormMessage();
  showFormMessage("Tarea añadida correctamente.", "success");
  taskInput.focus();
  render();
}

function toggleDone(id) {
  const task = tasks.find((item) => item.id === id);
  if (!task) return;

  task.done = !task.done;
  saveTasks();
  render();

  const card = document.querySelector(`[data-id="${id}"]`);
  if (card && task.done) {
    card.classList.add("ring-2", "ring-emerald-400");
    setTimeout(() => {
      card.classList.remove("ring-2", "ring-emerald-400");
    }, 500);
  }
}

function editTask(id) {
  const task = tasks.find((item) => item.id === id);
  if (!task) return;

  const newText = window.prompt("Edita el texto de la tarea:", task.text);
  if (newText === null) return;

  const clean = normalizeText(newText);
  const error = validateTaskText(clean, id);

  if (error) {
    showFormMessage(error, "error");
    return;
  }

  task.text = clean;
  saveTasks();
  showFormMessage("Tarea editada correctamente.", "success");
  render();
}

function deleteTask(id, cardEl = null) {
  if (cardEl) {
    cardEl.classList.add("opacity-0", "translate-y-1.5", "pointer-events-none");

    setTimeout(() => {
      tasks = tasks.filter((task) => task.id !== id);
      saveTasks();
      render();
    }, 200);

    return;
  }

  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  render();
}

function markAllAsDone() {
  const hasPending = tasks.some((task) => !task.done);

  if (!hasPending) {
    showFormMessage("Todas las tareas ya están completadas.", "info");
    return;
  }

  tasks = tasks.map((task) => ({ ...task, done: true }));
  saveTasks();
  showFormMessage("Todas las tareas han sido completadas.", "success");
  render();
}

function clearCompletedTasks() {
  const completedCount = tasks.filter((task) => task.done).length;

  if (completedCount === 0) {
    showFormMessage("No hay tareas completadas para borrar.", "info");
    return;
  }

  tasks = tasks.filter((task) => !task.done);
  saveTasks();
  showFormMessage("Tareas completadas eliminadas.", "success");
  render();
}

function moveTask(draggedId, targetId) {
  if (draggedId === targetId) return;
  if (currentSort !== "manual") return;

  const draggedIndex = tasks.findIndex((task) => task.id === draggedId);
  const targetIndex = tasks.findIndex((task) => task.id === targetId);

  if (draggedIndex === -1 || targetIndex === -1) return;

  const [draggedTask] = tasks.splice(draggedIndex, 1);
  tasks.splice(targetIndex, 0, draggedTask);

  saveTasks();
  render();
}

function initDragAndDrop() {
  const taskCards = document.querySelectorAll(".task-card");

  taskCards.forEach((card) => {
    card.addEventListener("dragstart", () => {
      draggedTaskId = card.dataset.id;
      card.classList.add("opacity-50");
    });

    card.addEventListener("dragend", () => {
      draggedTaskId = null;
      card.classList.remove("opacity-50");
    });

    card.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    card.addEventListener("drop", () => {
      const targetId = card.dataset.id;
      if (!draggedTaskId || !targetId) return;
      moveTask(draggedTaskId, targetId);
    });
  });
}

// ---------- Tema ----------
function initThemeToggle() {
  if (!themeToggle) return;

  const root = document.documentElement;

  function updateIcon() {
    const isDark = root.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
    );
    themeToggle.setAttribute(
      "title",
      isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
    );
  }

  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark") root.classList.add("dark");
  if (saved === "light") root.classList.remove("dark");

  updateIcon();

  themeToggle.addEventListener("click", () => {
    const isDark = root.classList.toggle("dark");
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    updateIcon();
  });
}

// ---------- Eventos ----------
taskForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask(taskInput.value, taskCategory.value, taskPriority.value);
});

taskList?.addEventListener("click", (event) => {
  const btn = event.target.closest("button[data-action]");
  if (!btn) return;

  const card = event.target.closest(".task-card");
  if (!card) return;

  const id = card.dataset.id;
  const action = btn.dataset.action;

  if (action === "toggle") toggleDone(id);
  if (action === "edit") editTask(id);
  if (action === "delete") deleteTask(id, card);
});

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    syncSearchInputs(event.target.value);
    render();
  });
}

if (topSearchInput) {
  topSearchInput.addEventListener("input", (event) => {
    syncSearchInputs(event.target.value);
    render();
  });
}

if (topSearchInputMobile) {
  topSearchInputMobile.addEventListener("input", (event) => {
    syncSearchInputs(event.target.value);
    render();
  });
}

filterHigh?.addEventListener("change", render);
filterMid?.addEventListener("change", render);
filterLow?.addEventListener("change", render);

categoryFilterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    if (!category) return;

    if (selectedCategories.has(category)) {
      selectedCategories.delete(category);
    } else {
      selectedCategories.add(category);
    }

    render();
  });
});

clearCategoryFiltersBtn?.addEventListener("click", () => {
  selectedCategories.clear();
  render();
});

viewAllBtn?.addEventListener("click", () => {
  currentView = "all";
  render();
});

viewPendingBtn?.addEventListener("click", () => {
  currentView = "pending";
  render();
});

viewCompletedBtn?.addEventListener("click", () => {
  currentView = "completed";
  render();
});

sortTasks?.addEventListener("change", (event) => {
  currentSort = event.target.value;
  render();
});

markAllDoneBtn?.addEventListener("click", markAllAsDone);
clearCompletedBtn?.addEventListener("click", clearCompletedTasks);

// ---------- Inicio ----------
loadTasks();
seedIfEmpty();
initThemeToggle();
render();
