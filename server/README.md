# TaskFlow – Fase 3

## Descripción

Este repositorio contiene la evolución del proyecto **TaskFlow** hacia una arquitectura cliente-servidor. En esta fase se incorpora un backend con **Node.js + Express** y el frontend deja de usar `LocalStorage` para consumir una **API RESTful**.

El objetivo de esta fase es aplicar principios de ingeniería de software backend:

- diseño de una API REST con semántica HTTP correcta;
- arquitectura por capas (**routes → controllers → services**);
- uso de **middlewares**;
- validación en la frontera de red;
- manejo global de errores;
- configuración mediante variables de entorno;
- integración del frontend con `fetch` o `axios`.

---

## Estructura recomendada del proyecto

```text
TaskFlow/
├─ index.html
├─ src/
│  ├─ api/
│  │  └─ client.js
│  ├─ components/
│  ├─ styles/
│  └─ main.js
├─ server/
│  ├─ .env
│  ├─ .gitignore
│  ├─ package.json
│  └─ src/
│     ├─ config/
│     │  └─ env.js
│     ├─ controllers/
│     │  └─ task.controller.js
│     ├─ middlewares/
│     │  └─ logger.middleware.js
│     ├─ routes/
│     │  └─ task.routes.js
│     ├─ services/
│     │  └─ task.service.js
│     └─ index.js
└─ docs/
   ├─ arquitectura-backend.md
   ├─ backend-api.md
   ├─ pruebas-api.md
   └─ checklist-entrega.md
```

---

## Arquitectura por capas

### 1. Routes
La capa de rutas escucha la red y asocia cada endpoint con su controlador. No debe contener lógica de negocio.

Ejemplo:

```js
router.get('/', getTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);
```

### 2. Controllers
Los controladores reciben `req`, validan datos de entrada, llaman al servicio y construyen la respuesta HTTP.

Responsabilidades:

- leer `req.params` y `req.body`;
- validar datos;
- devolver códigos HTTP adecuados;
- delegar la lógica de negocio a servicios.

### 3. Services
La capa de servicios contiene la lógica de negocio pura. En esta fase se usa un array en memoria como persistencia simulada.

Responsabilidades:

- obtener tareas;
- crear tareas;
- eliminar tareas;
- lanzar errores como `NOT_FOUND` cuando proceda.

---

## Middlewares usados

### `express.json()`
Middleware global de parseo que transforma el cuerpo JSON de la petición en un objeto JavaScript accesible desde `req.body`.

### `cors()`
Permite que el frontend, ejecutándose en otro origen, pueda consumir la API sin que el navegador bloquee la petición.

### `loggerAcademico`
Middleware personalizado para registrar cada petición HTTP y su duración.

Ejemplo:

```js
const loggerAcademico = (req, res, next) => {
  const inicio = performance.now();

  res.on('finish', () => {
    const duracion = performance.now() - inicio;
    console.log(`[${req.method}] ${req.originalUrl} - Estado: ${res.statusCode} (${duracion.toFixed(2)}ms)`);
  });

  next();
};
```

Este middleware aplica el patrón de **pipeline** de Express: la petición atraviesa una cadena de funciones antes de llegar al controlador.

---

## Variables de entorno

Siguiendo el enfoque **12-Factor App**, la configuración sensible o variable no debe ir hardcodeada en el código.

### Archivo `.env`

```env
PORT=3000
```

### Archivo `server/src/config/env.js`

```js
require('dotenv').config();

if (!process.env.PORT) {
  throw new Error('El puerto no está definido');
}

module.exports = {
  port: process.env.PORT,
};
```

### `.gitignore`

```gitignore
node_modules
.env
```

---

## API REST implementada

Base URL:

```text
http://localhost:3000/api/v1/tasks
```

### `GET /api/v1/tasks`
Obtiene todas las tareas.

**Respuesta 200**

```json
[
  {
    "id": "1",
    "title": "Estudiar Express",
    "completed": false,
    "createdAt": "2026-03-23T10:00:00.000Z"
  }
]
```

### `POST /api/v1/tasks`
Crea una nueva tarea.

**Body esperado**

```json
{
  "title": "Preparar documentación",
  "completed": false
}
```

**Respuesta 201**

```json
{
  "id": "2",
  "title": "Preparar documentación",
  "completed": false,
  "createdAt": "2026-03-23T10:05:00.000Z"
}
```

### `DELETE /api/v1/tasks/:id`
Elimina una tarea por identificador.

**Respuesta 204**

Sin contenido.

**Respuesta 404**

```json
{
  "error": "Recurso no encontrado"
}
```

---

## Validación defensiva

La validación se realiza en la frontera de red, antes de invocar el servicio.

Ejemplo de validación en el controlador:

```js
const createTask = (req, res, next) => {
  try {
    const { title, completed = false } = req.body;

    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      return res.status(400).json({
        error: 'El título es obligatorio y debe tener al menos 3 caracteres.'
      });
    }

    if (typeof completed !== 'boolean') {
      return res.status(400).json({
        error: 'El campo completed debe ser booleano.'
      });
    }

    const task = taskService.crearTarea({ title: title.trim(), completed });
    return res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};
```

Esto protege al backend frente a entradas inválidas o maliciosas.

---

## Manejo global de errores

Al final de `server/src/index.js` debe existir un middleware global de errores:

```js
app.use((err, req, res, next) => {
  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({ error: 'Recurso no encontrado' });
  }

  console.error(err);
  return res.status(500).json({ error: 'Error interno del servidor' });
});
```

### Decisiones semánticas

- `400 Bad Request`: datos inválidos enviados por el cliente.
- `404 Not Found`: el recurso solicitado no existe.
- `500 Internal Server Error`: error inesperado del servidor.

---

## Integración del frontend

El frontend elimina `LocalStorage` y pasa a comunicarse con la API mediante una capa de red dedicada.

### `src/api/client.js`

Ejemplo con `fetch`:

```js
const API_URL = 'http://localhost:3000/api/v1/tasks';

export const getTasks = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('No se pudieron cargar las tareas');
  return response.json();
};

export const createTask = async (taskData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || 'Error al crear la tarea');
  }

  return data;
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error || 'Error al eliminar la tarea');
  }
};
```

### Estados de UI obligatorios

La interfaz debe contemplar tres estados:

1. **Carga**: mostrar un mensaje como “Cargando tareas...” mientras la petición está pendiente.
2. **Éxito**: renderizar las tareas recibidas desde la API.
3. **Error**: mostrar feedback visual si la petición falla, por ejemplo “No se ha podido conectar con el servidor”.

---

## Cómo ejecutar el backend

```bash
cd server
npm install
npm run dev
```

Servidor disponible en:

```text
http://localhost:3000
```

---

## Scripts recomendados de `package.json`

```json
{
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js"
  }
}
```

---

## Pruebas manuales recomendadas

Se recomienda usar **Postman** o **Thunder Client** para probar:

- `GET /tasks` correcto;
- `POST /tasks` correcto;
- `POST /tasks` sin `title` → error 400;
- `POST /tasks` con `title` corto → error 400;
- `DELETE /tasks/:id` correcto → 204;
- `DELETE /tasks/:id` inexistente → 404;
- error 500 forzado para demostrar el middleware global.

La documentación detallada de estas pruebas está en `docs/pruebas-api.md`.

---

## Despliegue

Para el entregable final se puede desplegar el backend en **Vercel**, configurando las variables de entorno necesarias en el panel del proyecto.

---

## Conclusión

Esta fase transforma TaskFlow de una aplicación puramente cliente a un sistema distribuido simple, donde el navegador consume un backend desacoplado. La aportación principal no es solo “tener endpoints”, sino haber aplicado criterios formales de arquitectura, validación, observabilidad y manejo robusto de errores.
