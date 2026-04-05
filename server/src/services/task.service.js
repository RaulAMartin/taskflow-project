let tasks = [];
let currentId = 1;

const obtenerTodas = () => {
  return tasks;
};

const crearTarea = ({ titulo, prioridad = 1 }) => {
  const nuevaTarea = {
    id: currentId++,
    titulo: titulo.trim(),
    prioridad,
    completada: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(nuevaTarea);
  return nuevaTarea;
};

const eliminarTarea = (id) => {
  const indice = tasks.findIndex((task) => task.id === id);

  if (indice === -1) {
    throw new Error("NOT_FOUND");
  }

  tasks.splice(indice, 1);
};

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea,
};
