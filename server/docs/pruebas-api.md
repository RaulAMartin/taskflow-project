# Pruebas de integración y prueba de errores

Este documento es la parte más importante de la entrega, porque demuestra que la API no solo funciona en el caso feliz, sino también cuando recibe entradas inválidas o se enfrenta a errores controlados.

## Herramienta utilizada

Se recomienda indicar una de estas opciones:

- **Postman**
- **Thunder Client**

En la memoria puedes escribir:

> Las pruebas de integración de la API se realizaron con Postman, verificando tanto casos correctos como errores intencionados de validación, recursos inexistentes y fallos internos del servidor.

---

## URL base

```text
http://localhost:3000/api/v1/tasks
```

---

## Prueba 1 – Obtener todas las tareas

### Petición

```http
GET /api/v1/tasks
```

### Objetivo

Verificar que la API responde correctamente a una petición de lectura.

### Resultado esperado

- Código HTTP: `200 OK`
- Respuesta: array JSON de tareas

### Ejemplo de respuesta

```json
[]
```

### Qué escribir en la documentación

> La prueba de lectura de tareas devolvió un `200 OK`, confirmando que el endpoint `GET /api/v1/tasks` responde correctamente y entrega un array JSON como colección de recursos.

---

## Prueba 2 – Crear tarea válida

### Petición

```http
POST /api/v1/tasks
Content-Type: application/json
```

### Body

```json
{
  "title": "Documentar la API",
  "completed": false
}
```

### Objetivo

Verificar que la creación de recursos funciona correctamente.

### Resultado esperado

- Código HTTP: `201 Created`
- Respuesta: tarea creada

### Qué escribir en la documentación

> La creación de una tarea válida devolvió `201 Created`, cumpliendo la semántica REST esperada para operaciones `POST`. El servidor devolvió el recurso recién creado con su identificador y metadatos.

---

## Prueba 3 – Error 400: POST sin título

### Petición

```http
POST /api/v1/tasks
Content-Type: application/json
```

### Body erróneo

```json
{
  "completed": false
}
```

### Objetivo

Comprobar que la validación de entrada impide crear tareas sin el campo obligatorio.

### Resultado esperado

- Código HTTP: `400 Bad Request`
- Mensaje de error claro

### Ejemplo de respuesta

```json
{
  "error": "El título es obligatorio y debe tener al menos 3 caracteres."
}
```

### Qué escribir en la documentación

> Se forzó un error de validación enviando un `POST` sin el campo `title`. El servidor respondió con `400 Bad Request`, demostrando que la frontera de red valida los datos antes de invocar la lógica de negocio.

### Captura recomendada

Haz una captura donde se vea:

- método `POST`;
- URL;
- body enviado;
- código `400`;
- JSON de error.

---

## Prueba 4 – Error 400: título demasiado corto

### Body erróneo

```json
{
  "title": "Hi",
  "completed": false
}
```

### Objetivo

Comprobar que la validación no solo revisa existencia, sino también formato y longitud mínima.

### Resultado esperado

- Código HTTP: `400 Bad Request`

### Qué escribir en la documentación

> También se validó la longitud mínima del título. Al enviar un texto de menos de 3 caracteres, la API respondió con `400`, confirmando una validación defensiva más allá de la mera presencia del campo.

---

## Prueba 5 – Error 400: tipo inválido

### Body erróneo

```json
{
  "title": "Preparar README",
  "completed": "no"
}
```

### Objetivo

Verificar la validación estricta de tipos.

### Resultado esperado

- Código HTTP: `400 Bad Request`

### Ejemplo de respuesta

```json
{
  "error": "El campo completed debe ser booleano."
}
```

### Qué escribir en la documentación

> Se comprobó la robustez de la validación enviando un tipo incorrecto en `completed`. La API rechazó la petición con `400`, evitando que datos inconsistentes alcanzasen la capa de servicios.

---

## Prueba 6 – Eliminar tarea existente

### Petición

```http
DELETE /api/v1/tasks/:id
```

### Objetivo

Verificar que la eliminación funciona correctamente sobre un recurso existente.

### Resultado esperado

- Código HTTP: `204 No Content`
- Sin cuerpo de respuesta

### Qué escribir en la documentación

> La eliminación de una tarea existente devolvió `204 No Content`, respuesta adecuada en una operación `DELETE` exitosa cuando no es necesario devolver un cuerpo.

---

## Prueba 7 – Error 404: eliminar tarea inexistente

### Petición

```http
DELETE /api/v1/tasks/999999
```

### Objetivo

Verificar que el servicio detecta la ausencia del recurso y que el middleware global traduce el error correctamente.

### Resultado esperado

- Código HTTP: `404 Not Found`

### Ejemplo de respuesta

```json
{
  "error": "Recurso no encontrado"
}
```

### Qué escribir en la documentación

> Se intentó eliminar una tarea con un identificador inexistente. El servicio lanzó el error `NOT_FOUND` y el middleware global lo tradujo a `404 Not Found`, demostrando un mapeo semántico correcto entre errores internos y respuestas HTTP.

---

## Prueba 8 – Error 500: fallo interno forzado

Esta prueba es muy recomendable porque el enunciado menciona expresamente el `500`.

## Opción A: crear temporalmente una ruta de prueba

En desarrollo puedes añadir temporalmente una ruta como esta:

```js
app.get('/api/v1/test-error', (req, res, next) => {
  next(new Error('ERROR_FORZADO'));
});
```

### Petición

```http
GET /api/v1/test-error
```

### Resultado esperado

- Código HTTP: `500 Internal Server Error`

### Respuesta esperada

```json
{
  "error": "Error interno del servidor"
}
```

### Qué escribir en la documentación

> Para comprobar el middleware global de excepciones, se forzó un error interno del servidor mediante una ruta de prueba. La API respondió con `500 Internal Server Error` y un mensaje genérico, evitando exponer detalles técnicos al cliente.

## Opción B: forzar una excepción desde el servicio

Otra opción es introducir temporalmente una instrucción como:

```js
throw new Error('FALLO_INTERNO_SIMULADO');
```

solo con fines de prueba.

### Qué escribir si eliges esta opción

> Se simuló una excepción no controlada en la capa de servicios para verificar el comportamiento del middleware global. El servidor devolvió un `500` y registró la traza en consola mediante `console.error(err)`.

---

## Tabla resumen de pruebas

| Nº | Endpoint | Caso | Resultado esperado |
|---|---|---|---|
| 1 | `GET /tasks` | obtener tareas | `200` |
| 2 | `POST /tasks` | creación válida | `201` |
| 3 | `POST /tasks` | sin título | `400` |
| 4 | `POST /tasks` | título corto | `400` |
| 5 | `POST /tasks` | tipo inválido | `400` |
| 6 | `DELETE /tasks/:id` | existente | `204` |
| 7 | `DELETE /tasks/:id` | inexistente | `404` |
| 8 | `/test-error` | error interno forzado | `500` |

---

## Cómo presentarlo en la entrega

La forma más sólida de entregarlo es incluir:

1. una subsección por prueba;
2. la petición realizada;
3. el body enviado;
4. el código de estado obtenido;
5. la respuesta JSON;
6. una captura de pantalla de Postman o Thunder Client;
7. una breve interpretación técnica.

---

## Texto final listo para pegar en la memoria

> Se realizaron pruebas de integración manuales sobre la API REST de TaskFlow mediante Postman. No solo se validaron los casos funcionales (`GET`, `POST` y `DELETE` correctos), sino también escenarios de error diseñados intencionadamente. En concreto, se verificaron errores `400 Bad Request` para entradas inválidas, un `404 Not Found` al intentar eliminar un recurso inexistente y un `500 Internal Server Error` forzado para comprobar el middleware global de excepciones. Estas pruebas demuestran que la API aplica validación en la frontera de red, mantiene la semántica HTTP adecuada y responde de forma robusta ante fallos.

---

## Nombres sugeridos para capturas

- `01-get-tasks-200.png`
- `02-post-task-201.png`
- `03-post-sin-title-400.png`
- `04-post-title-corto-400.png`
- `05-post-tipo-invalido-400.png`
- `06-delete-task-204.png`
- `07-delete-no-existe-404.png`
- `08-error-interno-500.png`

Con esos nombres luego puedes referenciarlas dentro del README o en una carpeta `docs/img/`.
