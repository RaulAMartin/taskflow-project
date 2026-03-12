# Flujo de trabajo con Cursor

## Introducción

En este documento se describe cómo se ha utilizado **Cursor** como IDE asistido por inteligencia artificial dentro del desarrollo del proyecto **TaskFlow**.

Cursor es un editor basado en **VS Code** que incorpora herramientas de inteligencia artificial capaces de analizar el contexto completo del proyecto. Esto permite generar código, refactorizar funciones y modificar múltiples archivos con mayor facilidad.

Durante esta práctica se exploraron distintas funcionalidades del editor para comprobar cómo puede integrarse dentro del flujo de trabajo de un desarrollador.

---

# Objetivo del documento

El objetivo es documentar:

- Cómo se integró Cursor en el proyecto TaskFlow
- Qué herramientas de IA ofrece el editor
- Qué tareas de desarrollo se pudieron acelerar
- Ejemplos reales de mejoras aplicadas al código

---

# Primer contacto con Cursor

Para comenzar, instalé Cursor y abrí el repositorio del proyecto **TaskFlow**.

La interfaz es muy similar a **Visual Studio Code**, lo que facilita mucho la adaptación. Las secciones principales que exploré fueron:

- Explorador de archivos
- Editor de código
- Terminal integrada
- Chat contextual con IA
- Edición inline
- Composer (generación de cambios en múltiples archivos)

Gracias a esta estructura familiar, pude empezar a utilizar las herramientas de IA rápidamente dentro del propio proyecto.

---

# Funcionalidades probadas

## 1. Autocompletado a partir de comentarios

Una de las primeras pruebas consistió en escribir comentarios que describieran la funcionalidad deseada.

### Ejemplo

```javascript
// función para guardar tareas en localStorage

Cursor generó automáticamente una posible implementación:

function guardarTareas(tareas) {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

Este tipo de autocompletado es útil para generar rápidamente funciones sencillas y repetitivas.

2. Chat contextual

El chat contextual permite preguntar directamente sobre el código del proyecto.

Por ejemplo, se puede seleccionar una función y preguntar algo como:

Explica qué hace esta función y cómo podría simplificarse.

Esto fue útil para entender mejor partes del proyecto relacionadas con:

renderizado de tareas

uso de localStorage

funciones de filtrado

manipulación del DOM

Además, el chat puede sugerir mejoras en:

nombres de variables

estructura de funciones

reutilización de código

3. Edición inline

La edición inline permite pedir modificaciones directamente sobre un fragmento de código seleccionado.

Por ejemplo, se puede seleccionar una función y escribir una instrucción como:

Simplifica esta función y mejora los nombres de las variables.

Esto fue especialmente útil para:

simplificar condiciones complejas

eliminar código repetido

mejorar legibilidad

4. Uso de Composer

Composer permite generar cambios que afectan a varios archivos del proyecto al mismo tiempo.

Por ejemplo, se puede pedir algo como:

Añade una funcionalidad para filtrar tareas completadas y actualiza el HTML, JavaScript y los eventos necesarios.

Cursor puede entonces:

modificar el archivo JavaScript

añadir nuevos elementos al HTML

actualizar eventos o funciones relacionadas

Esta funcionalidad es especialmente útil para:

añadir nuevas funcionalidades

realizar refactorizaciones amplias

mantener coherencia entre archivos del proyecto

Mejoras obtenidas con Cursor
Ejemplo 1: simplificación de funciones

Durante la revisión del código, Cursor ayudó a identificar funciones que podían dividirse en partes más pequeñas.

Antes:

function procesarTareas(tareas) {
  const filtradas = tareas.filter(t => !t.completada);
  const ordenadas = filtradas.sort((a, b) => a.texto.localeCompare(b.texto));

  renderizarTareas(ordenadas);
}

Después de aplicar sugerencias:

function filtrarTareasPendientes(tareas) {
  return tareas.filter(t => !t.completada);
}

function ordenarTareas(tareas) {
  return tareas.sort((a, b) => a.texto.localeCompare(b.texto));
}

Esto mejoró la legibilidad y reutilización del código.

Ejemplo 2: mejoras en el formulario de tareas

Cursor también ayudó a mejorar la lógica del formulario de creación de tareas.

Se añadieron validaciones como:

evitar tareas vacías

limpiar espacios innecesarios

prevenir duplicados

mostrar mensajes al usuario

Ejemplo de validación añadida:

function validarTarea(texto) {
  const textoLimpio = texto.trim();

  if (textoLimpio === "") {
    return false;
  }

  return true;
}

Estas mejoras ayudan a prevenir errores en la entrada de datos.

Atajos y acciones frecuentes utilizadas

Durante las pruebas utilicé principalmente:

Acción	Uso
Ctrl + K	Abrir chat contextual
Cmd / Ctrl + I	Edición inline
Autocompletado automático	Generación de funciones
Terminal integrada	Ejecutar comandos del proyecto
Selección + prompt	Pedir refactorización

Estos atajos permiten trabajar de forma rápida sin salir del editor.

Valoración personal

Cursor me ha parecido una herramienta muy útil para acelerar tareas repetitivas y analizar código existente.

Una de sus principales ventajas es que puede trabajar con todo el contexto del proyecto, lo que permite realizar modificaciones coherentes entre varios archivos.

Sin embargo, es importante no aceptar automáticamente todo el código generado. Siempre es necesario revisar:

nombres de variables

lógica de negocio

estructura del HTML

posibles errores en el JavaScript

comportamiento real en el navegador

Conclusión

Cursor es una herramienta muy interesante para mejorar la productividad durante el desarrollo.

En el proyecto TaskFlow resultó especialmente útil para:

refactorizar funciones

entender código existente

generar funciones repetitivas

mejorar validaciones

realizar cambios en varios archivos

Aun así, debe utilizarse como una herramienta de apoyo, no como sustituto del análisis y revisión del desarrollador.