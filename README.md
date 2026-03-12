# TaskFlow

TaskFlow es una aplicación web sencilla para gestionar tareas. Permite crear, completar, eliminar y filtrar tareas directamente desde el navegador, guardando la información en LocalStorage.

El objetivo de este proyecto es practicar desarrollo frontend completo utilizando HTML, JavaScript, Tailwind CSS y despliegue en la nube.

---

# Demo

https://taskflow-project-orcin.vercel.app/

---

# Funcionalidades

La aplicación permite:

- Crear nuevas tareas
- Marcar tareas como completadas
- Eliminar tareas
- Filtrar tareas por texto
- Filtrar por prioridad
- Filtrar por categoría
- Ver estadísticas de tareas
- Marcar todas las tareas como completadas
- Eliminar todas las tareas completadas
- Ordenar tareas
- Cambiar entre modo claro y modo oscuro
- Guardar automáticamente las tareas en LocalStorage

---

# Tecnologías utilizadas

- HTML semántico
- CSS moderno
- Tailwind CSS
- JavaScript
- LocalStorage
- Git
- GitHub
- Vercel

---

# Estructura del proyecto

taskflow-project
│
├── docs
│ └── ai
│ ├── ai-comparison.md
│ ├── cursor-workflow.md
│ ├── prompt-engineering.md
│ ├── experiments.md
│ └── reflection.md
│
├── dist
│ └── output.css
│
├── index.html
├── app.js
├── style.css
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── package-lock.json
└── README.md

# Cómo usar la aplicación

1. Escribe una tarea en el campo de texto.
2. Pulsa el botón **Añadir** o presiona Enter.
3. Usa el buscador para encontrar tareas.
4. Usa los filtros para mostrar tareas específicas.
5. Marca tareas como completadas o elimínalas.
6. Cambia entre modo claro y oscuro.

Las tareas se guardan automáticamente en el navegador.

---

# Responsive

La aplicación funciona correctamente en:

- móviles
- tablets
- escritorio

En escritorio se muestra un layout de dos columnas:


Sidebar (estadísticas, filtros)
Contenido principal (tareas)


En móvil todo se reorganiza en una sola columna.

---

# Inteligencia Artificial aplicada

Durante el desarrollo se utilizaron herramientas de IA para:

- analizar código
- refactorizar funciones
- detectar errores
- mejorar la estructura del proyecto
- generar documentación

Toda la documentación se encuentra en:


docs/ai


Incluye:

- comparación de asistentes de IA
- workflow con Cursor
- prompt engineering
- experimentos
- reflexión final

---

# Instalación local

Si quieres ejecutar el proyecto localmente:

```bash
git clone https://github.com/tu-usuario/taskflow-project.git
cd taskflow-project
npm install

Para compilar Tailwind:

npx tailwindcss -i ./style.css -o ./dist/output.css --watch

Después abre index.html con Live Server.

Testing manual

Se realizaron pruebas manuales para comprobar:

añadir tareas

eliminar tareas

completar tareas

persistencia en LocalStorage

funcionamiento responsive

cambio de tema

filtros

Los resultados son correctos.

Despliegue

El proyecto está desplegado en Vercel.

Cada push al repositorio genera automáticamente un nuevo despliegue.

Autor

Proyecto desarrollado por Raul Martin como parte del bootcamp de desarrollo web.


---

# 3. Estructura final recomendada

Tu repo debería quedar así:


taskflow-project
│
├── docs
│ └── ai
│ ├── ai-comparison.md
│ ├── cursor-workflow.md
│ ├── prompt-engineering.md
│ ├── experiments.md
│ └── reflection.md
│
├── dist
│ └── output.css
│
├── index.html
├── app.js
├── style.css
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md


Y **sin `node_modules` en GitHub**.

---

# 4. Subir todo a GitHub

Ejecuta:

```bash
git add .
git commit -m "Finalize project documentation and cleanup repository"
git push
5. Resultado final

Tu proyecto ahora cumple:

Semana 1

✔ HTML semántico
✔ Responsive
✔ Tailwind
✔ LocalStorage
✔ CRUD tareas
✔ Filtros
✔ Dark mode
✔ Deploy en Vercel

Semana 2

✔ docs/ai completos
✔ comparativa IA
✔ prompt engineering
✔ experiments
✔ reflection
✔ README documentado