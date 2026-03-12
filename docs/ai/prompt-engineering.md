
# Prompt engineering aplicado al desarrollo

En este documento recojo prompts utilizados durante el desarrollo del proyecto TaskFlow para generar código, refactorizar funciones, mejorar la estructura y documentar el trabajo realizado.

## Objetivo del documento

El objetivo es mostrar cómo diferentes tipos de prompts pueden mejorar la calidad de las respuestas generadas por la IA y hacer más útil su aplicación en desarrollo web.

## Prompt 1: definir un rol

### Prompt
Actúa como un desarrollador frontend senior. Revisa este código y propón mejoras de estructura, legibilidad y responsive sin romper la funcionalidad existente.

### Por qué funciona bien
Define un contexto claro y orienta la respuesta hacia revisión técnica y buenas prácticas.

---

## Prompt 2: pedir razonamiento paso a paso

### Prompt
Analiza este problema paso a paso: en móvil se ve bien, pero en escritorio los bloques no aparecen uno al lado del otro. Explica qué está mal y cómo corregirlo.

### Por qué funciona bien
Hace que la IA no salte directamente al código y primero identifique la causa del problema.

---

## Prompt 3: pedir solo código listo para copiar

### Prompt
Devuélveme únicamente el código completo de index.html listo para copiar y pegar, sin resumir ni omitir partes.

### Por qué funciona bien
Evita respuestas parciales y hace la salida más práctica.

---

## Prompt 4: pedir refactorización

### Prompt
Refactoriza este archivo app.js manteniendo exactamente la funcionalidad actual, pero mejorando nombres, reutilización de funciones y legibilidad.

### Por qué funciona bien
Obliga a respetar el comportamiento existente y centra el cambio en la calidad interna del código.

---

## Prompt 5: restricciones claras

### Prompt
No uses frameworks adicionales. Solo HTML, JavaScript y Tailwind CSS. Quiero una solución compatible con mi estructura actual.

### Por qué funciona bien
Limita la respuesta y evita propuestas que no encajan con el proyecto.

---

## Prompt 6: few-shot prompting

### Prompt
Quiero que sigas este estilo de función:

```js
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

Ahora escribe funciones similares para cargar tareas, borrar tareas completadas y marcar todas como completadas.

Por qué funciona bien

Dar un ejemplo previo ayuda a que el estilo del código generado sea consistente con el proyecto.

Prompt 7: explicación para principiante
Prompt

Explícame este bloque de código como si estuviera aprendiendo JavaScript y CSS responsive por primera vez.

Por qué funciona bien

Ajusta el nivel de complejidad de la respuesta.

Prompt 8: generación de documentación
Prompt

Genera una primera versión de documentación técnica para este proyecto, incluyendo funcionalidades, tecnologías, estructura y pasos de uso.

Por qué funciona bien

Sirve para obtener una base rápida para README u otros archivos markdown.

Prompt 9: revisión de accesibilidad
Prompt

Revisa este HTML y dime qué aspectos básicos de accesibilidad faltan o podrían mejorarse.

Por qué funciona bien

Enfoca la respuesta en un aspecto concreto de calidad del proyecto.

Prompt 10: debugging de layout
Prompt

Mi diseño debería mostrar un sidebar a la izquierda y el contenido a la derecha en escritorio, pero sigue apareciendo en columna. Encuentra el error real y propón una solución robusta.

Por qué funciona bien

Describe el resultado esperado, el fallo real y pide una solución estable.

Conclusión

He comprobado que los mejores prompts suelen tener estas características:

indican claramente el objetivo

añaden restricciones

especifican el nivel de detalle esperado

explican el contexto del proyecto

piden revisar antes de cambiar

obligan a mantener la funcionalidad existente

Cuanto más claro y concreto es el prompt, más útil y precisa es la respuesta de la IA.
