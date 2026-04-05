const taskService = require("../services/task.service");

const getAllTasks = (req, res, next) => {
  try {
    const tasks = taskService.obtenerTodas();
    return res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const createTask = (req, res, next) => {
  try {
    const { titulo, prioridad } = req.body;

    if (!titulo || typeof titulo !== "string" || titulo.trim().length < 3) {
      return res.status(400).json({
        error: "El título es obligatorio y debe tener al menos 3 caracteres",
      });
    }

    if (
      prioridad !== undefined &&
      (!Number.isFinite(prioridad) || prioridad < 1)
    ) {
      return res.status(400).json({
        error: "La prioridad debe ser un número positivo",
      });
    }

    const nuevaTarea = taskService.crearTarea({
      titulo,
      prioridad,
    });

    return res.status(201).json(nuevaTarea);
  } catch (error) {
    next(error);
  }
};

const deleteTask = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        error: "El id debe ser un número entero positivo",
      });
    }

    taskService.eliminarTarea(id);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
};
