TaskFlow


TaskFlow es una aplicación web de gestión de tareas que permite organizar actividades de forma sencilla y visual.

La aplicación permite crear, completar, eliminar, filtrar y ordenar tareas, guardando los datos automáticamente en LocalStorage para mantener la información incluso después de recargar la página.

Este proyecto fue desarrollado como práctica de desarrollo frontend completo, cubriendo desde la estructura HTML hasta el despliegue en producción.

Demo

Aplicación en producción:

https://taskflow-project-orcin.vercel.app/

Repositorio del proyecto:

https://github.com/RaulAMartin/taskflow-project

Características principales
Gestión de tareas

Crear nuevas tareas

Editar tareas existentes

Marcar tareas como completadas

Eliminar tareas

Marcar todas las tareas como completadas

Eliminar todas las tareas completadas

Organización

Filtrar tareas por texto

Filtrar por prioridad

Filtrar por categoría

Mostrar tareas:

todas

pendientes

completadas

Ordenar tareas por diferentes criterios

Estadísticas

El panel lateral muestra:

número total de tareas

tareas completadas

tareas pendientes

tareas urgentes

barra de progreso de completado

Experiencia de usuario

diseño responsive

modo oscuro / modo claro

animaciones suaves

drag & drop para reordenar tareas

guardado automático en LocalStorage

Tecnologías utilizadas

Este proyecto utiliza tecnologías modernas de desarrollo web:

HTML5 semántico

CSS3

Tailwind CSS

JavaScript ES6+

LocalStorage

Git

GitHub

Vercel

Arquitectura del proyecto
taskflow-project
│
├── docs
│   └── ai
│       ├── ai-comparison.md
│       ├── cursor-workflow.md
│       ├── prompt-engineering.md
│       ├── experiments.md
│       └── reflection.md
│
├── dist
│   └── output.css
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
Cómo funciona
Crear una tarea

Escribe una tarea en el campo de texto.

Pulsa Añadir o presiona Enter.

La tarea aparecerá automáticamente en la lista.

Gestionar tareas

Cada tarea permite:

marcar como completada

editar el texto

eliminarla

Filtros y búsqueda

La aplicación permite:

buscar tareas por texto

filtrar por prioridad

filtrar por categoría

mostrar tareas pendientes o completadas

Responsive design

La aplicación está diseñada para funcionar correctamente en:

móviles

tablets

escritorio

Escritorio

Layout de dos columnas:

Sidebar (estadísticas y filtros)
Contenido principal (tareas)

Móvil

El layout se reorganiza en una sola columna para facilitar la navegación.

Instalación local

Si quieres ejecutar el proyecto localmente:

Clona el repositorio:

git clone https://github.com/RaulAMartin/taskflow-project.git
cd taskflow-project

Instala dependencias:

npm install

Compila Tailwind:

npx tailwindcss -i ./style.css -o ./dist/output.css --watch

Después abre index.html usando Live Server en VS Code.

Persistencia de datos

Las tareas se almacenan en LocalStorage.

Esto permite:

mantener las tareas tras recargar la página

guardar cambios automáticamente

recuperar el estado de la aplicación al iniciar

Testing manual

Se realizaron pruebas manuales para verificar:

añadir tareas

eliminar tareas

completar tareas

editar tareas

filtros de búsqueda

persistencia en LocalStorage

funcionamiento responsive

cambio de tema

Los resultados fueron correctos.

Inteligencia Artificial aplicada

Durante el desarrollo del proyecto se utilizaron herramientas de IA para mejorar el proceso de desarrollo.

Se utilizaron para:

análisis de código

refactorización

detección de errores

generación de documentación

mejora de estructura del proyecto

La documentación completa se encuentra en:

docs/ai

Incluye:

comparación de asistentes de IA

workflow con Cursor

prompt engineering

experimentos

reflexión final

Despliegue

La aplicación está desplegada en Vercel.

Cada vez que se realiza un push al repositorio, Vercel genera automáticamente un nuevo despliegue.

Bonus implementados

El proyecto incluye varias funcionalidades extra:

animaciones al crear y eliminar tareas

drag & drop para reordenar tareas

sistema de prioridades

sistema de categorías

barra de progreso de tareas completadas

estadísticas en tiempo real

Autor

Proyecto desarrollado por:

Raúl Martín

GitHub
https://github.com/RaulAMartin

Repositorio del proyecto
https://github.com/RaulAMartin/taskflow-project

Objetivos de aprendizaje

Este proyecto demuestra conocimientos en:

HTML semántico

diseño responsive

Tailwind CSS

manipulación del DOM

gestión de estado con JavaScript

persistencia de datos en LocalStorage

control de versiones con Git

despliegue de aplicaciones web con Vercel

Licencia

Proyecto desarrollado con fines educativos como parte de un bootcamp de desarrollo web.
