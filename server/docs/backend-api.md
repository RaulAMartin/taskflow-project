# Backend-api

Este archivo responde a la información sobre qué es Axios, Postman, Sentry, Swagger y por qué se usan”.

## Axios

**Axios** es un cliente HTTP basado en promesas para navegador y Node.js. Su documentación oficial lo describe como un cliente HTTP para el navegador y Node.js, usable en ambos entornos con una API consistente. citeturn834827search0turn834827search4

### ¿Para qué se usa?

Se usa para hacer peticiones HTTP a una API desde frontend o backend, por ejemplo:

- `GET` para leer datos;
- `POST` para crear recursos;
- `PUT`, `PATCH` y `DELETE` para actualizar o borrar.

### ¿Por qué podría usarse en TaskFlow?

Aunque en esta fase puedes usar `fetch`, Axios resulta útil porque:

- simplifica la sintaxis de las peticiones;
- permite configurar una `baseURL` común;
- facilita interceptores para manejar errores o tokens;
- ofrece una API consistente tanto en frontend como en Node.js. La documentación oficial incluye la creación de instancias configurables mediante `axios.create(...)`. citeturn834827search16turn834827search20

### Ejemplo

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};
```

---

## Postman

**Postman** es una plataforma para diseñar, probar, documentar y gestionar APIs. Su documentación oficial y su página de producto la presentan como un entorno unificado para trabajar con APIs a lo largo de su ciclo de vida. citeturn834827search17turn834827search25

### ¿Para qué se usa?

Se usa para:

- enviar peticiones HTTP manualmente;
- inspeccionar respuestas, cabeceras y códigos de estado;
- guardar colecciones de endpoints;
- automatizar pruebas;
- compartir documentación de API con otros miembros del equipo.

### ¿Por qué es importante en esta fase?

Porque el enunciado exige **probar la API** y **forzar errores intencionados**. Postman permite demostrar de forma profesional que tu backend responde correctamente ante:

- operaciones válidas;
- errores de validación (`400`);
- recursos inexistentes (`404`);
- errores internos (`500`).

### Qué puedes documentar con Postman

- colección `TaskFlow API`;
- carpeta `Happy path`;
- carpeta `Error cases`;
- capturas de cada prueba;
- exportación de colección JSON como evidencia.

---

## Sentry

**Sentry** es una plataforma de seguimiento de errores y monitorización de rendimiento orientada a desarrolladores. Su documentación oficial la define como una herramienta para identificar y depurar errores y problemas de rendimiento a través de sistemas y servicios. citeturn834827search2turn834827search14

### ¿Para qué se usa?

Se usa para:

- registrar excepciones en producción;
- capturar trazas y contexto de los errores;
- monitorizar rendimiento;
- recibir alertas cuando falla una parte de la aplicación.

### ¿Por qué se menciona en una práctica como esta?

Aunque quizá no lo implementes en esta fase, es relevante mencionarlo porque conecta con el concepto de **observabilidad** del backend. En un entorno real, un `console.error(err)` es útil en local, pero en producción suele ser insuficiente. Herramientas como Sentry permiten:

- centralizar errores;
- saber cuándo falla una ruta concreta;
- ver el stack trace;
- priorizar incidencias.

### Cómo puedes explicarlo en tu entrega

Puedes indicar que en esta práctica el manejo global de errores se hace con un middleware de Express, y que **Sentry sería una mejora natural en producción** para registrar excepciones reales del servidor y del frontend.

---

## Swagger

**Swagger** se usa para describir y documentar APIs. La especificación OpenAPI, antes conocida como Swagger Specification, define un formato estándar para describir una API REST, incluyendo endpoints, operaciones, parámetros y respuestas. citeturn834827search3turn834827search7

Además, el ecosistema Swagger incluye herramientas como **Swagger UI** y **Swagger Editor**, orientadas a visualizar, editar y explorar documentación de APIs. citeturn834827search19turn834827search23

### ¿Para qué se usa?

Se usa para:

- documentar formalmente una API;
- generar documentación interactiva;
- estandarizar contratos entre frontend y backend;
- facilitar pruebas manuales desde una interfaz web;
- mejorar la mantenibilidad del proyecto.

### ¿Por qué es útil en TaskFlow?

Porque el backend ya tiene endpoints claros (`GET`, `POST`, `DELETE`) y Swagger permite dejarlos documentados con:

- URL base;
- parámetros;
- cuerpos de petición;
- respuestas esperadas;
- códigos de error (`400`, `404`, `500`).

### Ejemplo de lo que podrías documentar con Swagger

- `GET /api/v1/tasks` → devuelve lista de tareas.
- `POST /api/v1/tasks` → crea tarea nueva.
- `DELETE /api/v1/tasks/{id}` → elimina tarea por id.

### Valor académico

En esta práctica, Swagger encaja especialmente bien como **bonus**, porque demuestra madurez en la documentación técnica del backend y deja claro que la API no es solo funcional, sino también consumible por otros desarrolladores.

---

## Conclusión

En el contexto de TaskFlow:

- **Axios** sirve para consumir la API desde frontend o backend. citeturn834827search0turn834827search16
- **Postman** sirve para probar, validar y documentar manualmente la API. citeturn834827search17turn834827search21
- **Sentry** sirve para monitorizar errores y rendimiento en entornos reales. citeturn834827search6turn834827search14
- **Swagger / OpenAPI** sirve para describir y publicar la documentación técnica de la API. citeturn834827search7turn834827search19

No es obligatorio implementar todos en el código para esta fase, pero sí es muy recomendable explicar qué papel juegan en un backend profesional.
