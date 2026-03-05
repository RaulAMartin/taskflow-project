# Taskflow Project
Proyecto inicial

Aplicación web (HTML + CSS + JavaScript) para gestionar tareas con persistencia en LocalStorage.

## 🚀 Demo
https://taskflow-project-orcin.vercel.app/

## ✨ Funcionalidades
- Añadir tareas con texto
- Eliminar tareas
- Persistencia de datos con LocalStorage
- Filtro de búsqueda por texto
- Diseño responsive
- Sistema de diseño con Tailwind CSS
- Modo oscuro con selector de tema

## 🧰 Tecnologías
- HTML semántico
- CSS (variables `:root`, Flexbox, Media Queries, Transiciones)
- JavaScript (DOM, eventos, LocalStorage)
- Tailwind CSS

---

# 📚 Desarrollo del proyecto

## 1️⃣ Estructura y diseño con HTML y CSS

Creación de la estructura visual inicial de la aplicación y despliegue en internet.

### Implementaciones realizadas

- Creación del archivo `index.html` utilizando etiquetas semánticas:
  - `<header>`
  - `<main>`
  - `<aside>`
  - `<section>`

- Definición de variables CSS en `:root` para gestionar:
  - Colores
  - Fuentes
  - Espaciados

- Maquetación de la lista de tareas utilizando **Flexbox** (`display: flex`) para alinear:
  - Título de tarea
  - Categoría
  - Badge de prioridad

- Implementación de **Media Queries** para asegurar que la barra lateral se adapte correctamente en dispositivos móviles.

- Publicación del proyecto conectando el repositorio de **Git** con **Vercel** para obtener una URL pública.

### Bonus implementado
- Transición suave en las tarjetas de tareas utilizando la propiedad `transition`.

---

## 2️⃣ Interactividad con JavaScript y el DOM

Transformación de la página estática en una aplicación dinámica utilizando JavaScript.

### Implementaciones realizadas

- Creación del archivo `app.js`.
- Conexión del formulario de entrada de tareas mediante `addEventListener`.
- Implementación de la función **añadir tarea**:
  - Captura el texto del input
  - Crea un nuevo elemento en la lista
  - Limpia el campo de entrada.

- Implementación de botón **Eliminar** en cada tarea:
  - Elimina el nodo correspondiente del DOM.

- Persistencia de datos usando **LocalStorage**:
  - Guardado del array de tareas con `JSON.stringify`.
  - Actualización automática cuando hay cambios.

- Carga automática de tareas guardadas al iniciar la aplicación.

### Bonus implementado
- Filtro de búsqueda que oculta las tareas que no coinciden con el texto introducido.

---

## 3️⃣ Sistema de diseño con Tailwind CSS

Optimización del diseño mediante un sistema de utilidades CSS y soporte para temas.

### Implementaciones realizadas

- Instalación y configuración de **Tailwind CSS** en el proyecto.
- Configuración del archivo `tailwind.config.js`.
- Sustitución del CSS personalizado por **clases de utilidad de Tailwind**.
- Implementación de **modo oscuro** utilizando el prefijo `dark:`.

- Creación de un botón que alterna el modo oscuro:
  - Añadiendo o eliminando la clase `dark` en el elemento raíz.

- Uso de la escala de espaciado y colores por defecto de Tailwind para mantener coherencia visual.

### Bonus implementado
- Estados `hover` y `focus` en botones e inputs con transiciones personalizadas.

---

## 📝 Uso

1. Escribe una tarea en el campo de entrada.
2. Pulsa **Añadir** o presiona **Enter**.
3. Usa el buscador para filtrar tareas.
4. Elimina tareas usando el botón **Eliminar**.
5. Cambia entre **modo claro y modo oscuro** con el selector de tema.

---

## 🎯 Objetivo del proyecto

El objetivo de estas tareas es verificar que se poseen los conocimientos técnicos necesarios para comenzar a trabajar en proyectos web completos, así como reforzar progresivamente habilidades en:

- HTML semántico
- CSS moderno y responsive
- Manipulación del DOM con JavaScript
- Persistencia de datos en el navegador
- Uso de frameworks CSS modernos como Tailwind
- Despliegue de aplicaciones web