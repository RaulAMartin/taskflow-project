# Checklist de entrega – TaskFlow Fase 3

## Backend

- [ ] Carpeta `server/` creada.
- [ ] `npm init -y` ejecutado.
- [ ] Dependencias instaladas: `express`, `cors`, `dotenv`.
- [ ] Dependencia de desarrollo instalada: `nodemon`.
- [ ] Archivo `.env` creado.
- [ ] `.env` incluido en `.gitignore`.
- [ ] `src/config/env.js` valida `PORT`.
- [ ] `src/services/task.service.js` implementado.
- [ ] `src/controllers/task.controller.js` implementado.
- [ ] `src/routes/task.routes.js` implementado.
- [ ] `src/index.js` monta `/api/v1/tasks`.
- [ ] Middleware global de errores implementado.

## API

- [ ] `GET /api/v1/tasks` funcionando.
- [ ] `POST /api/v1/tasks` funcionando.
- [ ] `DELETE /api/v1/tasks/:id` funcionando.
- [ ] Validación de `title` implementada.
- [ ] Validación de tipos implementada.
- [ ] Error `404` mapeado desde `NOT_FOUND`.
- [ ] Error `500` manejado globalmente.

## Frontend

- [ ] Eliminado `LocalStorage`.
- [ ] Creado `src/api/client.js`.
- [ ] El frontend consume la API.
- [ ] Estado de carga implementado.
- [ ] Estado de error implementado.
- [ ] Estado de éxito implementado.

## Documentación

- [ ] `README.md` creado en server/docs.
- [ ] `docs/backend-api.md` creado.
- [ ] `docs/arquitectura-backend.md` creado.
- [ ] `docs/pruebas-api.md` creado.
- [ ] Capturas de Postman/Thunder Client añadidas.
- [ ] Ejemplos request/response incluidos.

## Bonus

- [ ] Colección Postman exportada.
- [ ] Swagger documentado o implementado.
- [ ] Backend desplegado en Vercel.
