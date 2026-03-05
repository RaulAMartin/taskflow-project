// ===== Taskflow - App JS =====

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

const pillStudy = document.getElementById("pillStudy");
const pillWork = document.getElementById("pillWork");
const pillPersonal = document.getElementById("pillPersonal");

const newTaskBtn = document.getElementById("newTaskBtn");

const STORAGE_KEY = "taskflow_tasks_v4";
let tasks = [];

function saveTasks(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks(){
  const data = localStorage.getItem(STORAGE_KEY);
  tasks = data ? JSON.parse(data) : [];
}

function seedIfEmpty(){
  if (tasks.length > 0) return;

  tasks = [
    {
      id: crypto.randomUUID(),
      text: "Terminar el proyecto",
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

function escapeHtml(str){
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function priorityClass(p){
  if (p === "Alta") return "high";
  if (p === "Media") return "mid";
  return "low";
}

function syncSearchInputs(v){
  if (searchInput && searchInput.value !== v) searchInput.value = v;
  if (topSearchInput && topSearchInput.value !== v) topSearchInput.value = v;
}

function getSearchText(){
  const a = topSearchInput ? topSearchInput.value : "";
  const b = searchInput ? searchInput.value : "";
  return a.length >= b.length ? a : b;
}

function getAllowedPriorities(){
  const set = new Set();
  if (filterHigh?.checked) set.add("Alta");
  if (filterMid?.checked) set.add("Media");
  if (filterLow?.checked) set.add("Baja");
  return set;
}

function applyFilters(list){
  const q = getSearchText().trim().toLowerCase();
  const allowed = getAllowedPriorities();

  return list.filter(t => {
    const matchesText = q === "" || t.text.toLowerCase().includes(q);
    const matchesPriority = allowed.size === 0 ? false : allowed.has(t.priority);
    return matchesText && matchesPriority;
  });
}

function updateStats(){
  const total = tasks.length;
  const pending = tasks.filter(t => !t.done).length;
  const urgent = tasks.filter(t => t.priority === "Alta").length;

  statTotal.textContent = String(total);
  statPending.textContent = String(pending);
  statHigh.textContent = String(urgent);

  pillStudy.textContent = String(tasks.filter(t => t.category === "Estudio").length);
  pillWork.textContent = String(tasks.filter(t => t.category === "Trabajo").length);
  pillPersonal.textContent = String(tasks.filter(t => t.category === "Personal").length);
}

function createTaskElement(task){
  const card = document.createElement("article");
  card.className = "task-card";
  card.dataset.id = task.id;
  if (task.done) card.classList.add("done");

  const pClass = priorityClass(task.priority);

  card.innerHTML = `
    <div class="task-main">
      <div class="task-title">${escapeHtml(task.text)}</div>
      <div class="task-desc muted">${escapeHtml(task.category)}</div>
      <div class="task-tags">
        <span class="tag">${escapeHtml(task.category)}</span>
        <span class="tag">${escapeHtml(task.priority)}</span>
      </div>
    </div>

    <div class="task-side">
      <div class="meta-col">
        <div class="meta-label">Estado</div>
        <button class="btn-ghost" data-action="toggle">
          ${task.done ? "Reabrir" : "Completar"}
        </button>
      </div>

      <div class="meta-col">
        <div class="meta-label">Prioridad</div>
        <span class="badge ${pClass}">${escapeHtml(task.priority)}</span>
      </div>

      <div class="meta-col">
        <div class="meta-label">Acciones</div>
        <button class="btn-danger" data-action="delete">Eliminar</button>
      </div>
    </div>
  `;

  return card;
}

function render(){
  taskList.innerHTML = "";
  const filtered = applyFilters(tasks);
  filtered.forEach(t => taskList.appendChild(createTaskElement(t)));
  updateStats();
}

function addTask(text, category, priority){
  const clean = text.trim();
  if (!clean) return;

  tasks.unshift({
    id: crypto.randomUUID(),
    text: clean,
    category,
    priority,
    done: false,
    createdAt: Date.now()
  });

  saveTasks();
  syncSearchInputs(""); // para que se vea siempre la nueva tarea
  taskInput.value = "";
  taskInput.focus();
  render();
}

function toggleDone(id){
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  t.done = !t.done;
  saveTasks();
  render();
}

function deleteTask(id, cardEl){
  if (cardEl){
    cardEl.classList.add("removing");
    setTimeout(() => {
      tasks = tasks.filter(t => t.id !== id);
      saveTasks();
      render();
    }, 180);
  } else {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    render();
  }
}

// Eventos
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

if (searchInput){
  searchInput.addEventListener("input", (e) => {
    syncSearchInputs(e.target.value);
    render();
  });
}
if (topSearchInput){
  topSearchInput.addEventListener("input", (e) => {
    syncSearchInputs(e.target.value);
    render();
  });
}

filterHigh?.addEventListener("change", render);
filterMid?.addEventListener("change", render);
filterLow?.addEventListener("change", render);

newTaskBtn?.addEventListener("click", () => {
  taskInput.focus();
});

// Inicio
loadTasks();
seedIfEmpty();
render();
