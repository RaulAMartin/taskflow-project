const API_URL = "http://localhost:3000/api/v1/tasks";

console.log("client.js cargado correctamente");

export async function getTasks() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error || "No se pudieron cargar las tareas.");
  }

  return await response.json();
}

export async function createTask(taskData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || "No se pudo crear la tarea.");
  }

  return data;
}

export async function deleteTaskById(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error || "No se pudo eliminar la tarea.");
  }

  return true;
}
