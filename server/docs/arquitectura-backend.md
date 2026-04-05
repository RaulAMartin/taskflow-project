# Arquitectura del backend de TaskFlow

## Objetivo

El backend de TaskFlow se ha diseñado siguiendo una **arquitectura por capas** para mejorar la mantenibilidad, la claridad del código y la facilidad de prueba.

## Capas

### 1. `routes/`
Responsable de definir los endpoints y asociarlos a los controladores.

Ejemplo:

```js
router.get('/', getTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);
```

### 2. `controllers/`
Responsable de:

- extraer datos de la petición;
- validar entrada;
- llamar al servicio;
- construir la respuesta HTTP.

Ejemplo conceptual:

```js
const createTask = (req, res, next) => {
  try {
    const { title, completed } = req.body;

    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      return res.status(400).json({
        error: 'El título es obligatorio y debe tener al menos 3 caracteres.'
      });
    }

    const task = taskService.crearTarea({ title, completed });
    return res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};
```

### 3. `services/`
Responsable de la lógica de negocio. No conoce Express.

Ejemplo conceptual:

```js
let tasks = [];

const obtenerTodas = () => tasks;

const crearTarea = ({ title, completed = false }) => {
  const newTask = {
    id: crypto.randomUUID(),
    title,
    completed,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  return newTask;
};

const eliminarTarea = (id) => {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    throw new Error('NOT_FOUND');
  }

  tasks.splice(index, 1);
};
```

## Flujo de una petición

1. El cliente hace una petición HTTP.
2. Express la recibe en una ruta.
3. La petición atraviesa middlewares globales como `cors`, `express.json` y el logger.
4. El controlador valida la entrada.
5. El controlador invoca al servicio.
6. El servicio devuelve datos o lanza un error.
7. El controlador responde o delega el error al middleware global.
8. El middleware global traduce el error a una respuesta HTTP.

## Middlewares

### `express.json()`
Convierte el JSON entrante en `req.body`.

### `cors()`
Permite el acceso desde el frontend cuando está en otro origen.

### `loggerAcademico`
Registra método, ruta, estado HTTP y duración.

### Middleware global de errores
Traducirá excepciones JavaScript a errores HTTP controlados.

## Decisiones de diseño

- Se usa una lista en memoria para simplificar la fase y centrarse en arquitectura.
- Se usan códigos HTTP semánticamente correctos.
- La validación se realiza antes de llegar al servicio.
- Los errores técnicos no se exponen al cliente.

## Posibles mejoras futuras

- persistencia con base de datos;
- validación con librerías como Zod o Joi;
- documentación automática con Swagger;
- monitorización con Sentry;
- tests automatizados con Jest y Supertest.
