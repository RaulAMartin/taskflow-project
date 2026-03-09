// ===== Taskflow - App JS (Tailwind refactor + Dark mode toggle) =====

// Elementos base
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskCategory = document.getElementById("taskCategory");
const taskPriority = document.getElementById("taskPriority");
const taskList = document.getElementById("taskList");

const searchInput = document.getElementById("searchInput");
const topSearchInput = document.getElementById("topSearchInput");
const topSearchInputMobile = document.getElementById("topSearchInputMobile");

const filterHigh = document.getElementById("filterHigh");
const filterMid = document.getElementById("filterMid");
const filterLow = document.getElementById("filterLow");

const statTotal = document.getElementById("statTotal");
const statPending = document.getElementById("statPending");
const statHigh = document.getElementById("statHigh");

const pillStudy = document.getElementById("pillStudy");
const pillWork = document.getElementById("pillWork");
const pillPersonal = document.getElementById("pillPersonal");

const categoryFilterButtons = document.querySelectorAll(".category-filter");
const clearCategoryFiltersBtn = document.getElementById("clearCategoryFilters");

const themeToggle = document.getElementById("themeToggle");

const STORAGE_KEY = "taskflow_tasks_v4";
const THEME_KEY = "taskflow_theme";

let tasks = [];
let selectedCategories = new Set();

// ---------- Persistencia ----------
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const data = localStorage.getItem(STORAGE_KEY);
  tasks = data ? JSON.parse(data) : [];
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
      createdAt: Date.now(),
    },
    {
      id: crypto.randomUUID(),
      text: "Preparar presentación",
      category: "Personal",
      priority: "Media",
      done: false,
      createdAt: Date.now(),
    },
  ];

  saveTasks();
}

// ---------- Seguridad HTML ----------
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ---------- Filtros / búsqueda ----------
function syncSearchInputs(v) {
  if (searchInput && searchInput.value !== v) searchInput.value = v;
  if (topSearchInput && topSearchInput.value !== v) topSearchInput.value = v;
  if (topSearchInputMobile && topSearchInputMobile.value !== v) topSearchInputMobile.value = v;
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

  return list.filter((t) => {
    const matchesText = q === "" || t.text.toLowerCase().includes(q);
    const matchesPriority =
      allowedPriorities.size === 0 ? false : allowedPriorities.has(t.priority);

    const matchesCategory =
      selectedCategories.size === 0 ? true : selectedCategories.has(t.category);

    return matchesText && matchesPriority && matchesCategory;
  });
}

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

// ---------- Stats ----------
function updateStats() {
  const total = tasks.length;
  const pending = tasks.filter((t) => !t.done).length;
  const urgent = tasks.filter((t) => t.priority === "Alta").length;

  statTotal.textContent = String(total);
  statPending.textContent = String(pending);
  statHigh.textContent = String(urgent);

  pillStudy.textContent = String(tasks.filter((t) => t.category === "Estudio").length);
  pillWork.textContent = String(tasks.filter((t) => t.category === "Trabajo").length);
  pillPersonal.textContent = String(tasks.filter((t) => t.category === "Personal").length);
}

// ---------- Tailwind helpers ----------
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
    "rounded-xl border border-slate-200 bg-white p-4 shadow-sm",
    "transition duration-200",
    "hover:-translate-y-0.5 hover:shadow-md",
    "dark:border-slate-800 dark:bg-slate-900",
    task.done ? "opacity-80" : "",
  ]
    .filter(Boolean)
    .join(" ");

  card.dataset.id = task.id;

  const titleClass = task.done ? "line-through decoration-2" : "";
  const badgeClass = badgeTailwind(task.priority);

  card.innerHTML = `
    <div class="grid gap-4 md:grid-cols-[1fr_220px]">
      <!-- Columna principal -->
      <div class="min-w-0">
        <div class="text-sm font-extrabold ${titleClass}">
          ${escapeHtml(task.text)}
        </div>

        <div class="mt-1 text-xs text-slate-600 dark:text-slate-400">
          ${escapeHtml(task.category)}
        </div>

        <div class="mt-3 flex flex-wrap gap-2">
          <span class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700
                       dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
            ${escapeHtml(task.category)}
          </span>

          <span class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700
                       dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
            ${escapeHtml(task.priority)}
          </span>
        </div>
      </div>

      <!-- Panel derecho -->
      <div class="min-w-0 flex flex-col gap-3">
        <div class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center
                    dark:border-slate-800 dark:bg-slate-950">
          <div class="mb-2 text-[11px] font-semibold text-slate-600 dark:text-slate-400">Estado</div>

          <button
            class="w-full rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-800
                   hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400
                   dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus:ring-slate-600
                   transition"
            data-action="toggle"
            type="button"
          >
            ${task.done ? "Reabrir" : "Completar"}
          </button>
        </div>

        <div class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center
                    dark:border-slate-800 dark:bg-slate-950">
          <div class="mb-2 text-[11px] font-semibold text-slate-600 dark:text-slate-400">Prioridad</div>
          <span class="inline-flex w-full items-center justify-center rounded-full px-3 py-2 text-xs font-extrabold text-white ${badgeClass}">
            ${escapeHtml(task.priority)}
          </span>
        </div>

        <div class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center
                    dark:border-slate-800 dark:bg-slate-950">
          <div class="mb-2 text-[11px] font-semibold text-slate-600 dark:text-slate-400">Acciones</div>

          <button
            class="w-full rounded-full bg-red-500/15 px-3 py-2 text-xs font-extrabold text-red-700
                   hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-400
                   dark:text-red-200 dark:focus:ring-red-500
                   transition"
            data-action="delete"
            type="button"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  `;

  return card;
}

function render() {
  taskList.innerHTML = "";

  const filtered = applyFilters(tasks);
  filtered.forEach((t) => taskList.appendChild(createTaskElement(t)));

  updateStats();
  updateCategoryFilterUI();
}

// ---------- CRUD ----------
function addTask(text, category, priority) {
  const clean = text.trim();
  if (!clean) return;

  tasks.unshift({
    id: crypto.randomUUID(),
    text: clean,
    category,
    priority,
    done: false,
    createdAt: Date.now(),
  });

  saveTasks();
  syncSearchInputs("");
  taskInput.value = "";
  taskInput.focus();
  render();
}

function toggleDone(id) {
  const t = tasks.find((x) => x.id === id);
  if (!t) return;

  t.done = !t.done;
  saveTasks();
  render();
}

function deleteTask(id, cardEl) {
  if (cardEl) {
    cardEl.classList.add("opacity-0", "translate-y-1.5", "pointer-events-none");
    setTimeout(() => {
      tasks = tasks.filter((t) => t.id !== id);
      saveTasks();
      render();
    }, 200);
  } else {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks();
    render();
  }
}

// ---------- Modo oscuro ----------
function initThemeToggle() {
  if (!themeToggle) return;

  const root = document.documentElement;

  function updateIcon() {
    const isDark = root.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-label", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    themeToggle.setAttribute("title", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
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
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask(taskInput.value, taskCategory.value, taskPriority.value);
});

taskList.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const card = e.target.closest(".task-card");
  if (!card) return;

  const id = card.dataset.id;
  const action = btn.dataset.action;

  if (action === "toggle") toggleDone(id);
  if (action === "delete") deleteTask(id, card);
});

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    syncSearchInputs(e.target.value);
    render();
  });
}

if (topSearchInput) {
  topSearchInput.addEventListener("input", (e) => {
    syncSearchInputs(e.target.value);
    render();
  });
}

if (topSearchInputMobile) {
  topSearchInputMobile.addEventListener("input", (e) => {
    syncSearchInputs(e.target.value);
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

// ---------- Inicio ----------
loadTasks();
seedIfEmpty();
initThemeToggle();
render();
