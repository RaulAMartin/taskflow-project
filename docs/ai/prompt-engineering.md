# Prompt engineering aplicado al desarrollo

## Introducción

En este documento se recogen distintos **prompts utilizados durante el desarrollo del proyecto TaskFlow** para interactuar con herramientas de inteligencia artificial como ChatGPT o Claude.

El objetivo es mostrar cómo diferentes técnicas de **prompt engineering** pueden mejorar la calidad de las respuestas generadas por la IA y facilitar su uso en tareas de desarrollo web como:

- generación de código
- refactorización
- debugging
- documentación
- revisión de calidad del código

Durante la práctica se experimentó con varias estrategias como **role prompting, few-shot prompting, razonamiento paso a paso y restricciones claras**.

---

# Objetivo del documento

Este documento pretende:

- recopilar prompts útiles utilizados durante el proyecto
- explicar qué técnica de prompting se está aplicando
- analizar por qué el prompt produce mejores resultados

---

# Prompts utilizados

## Prompt 1: Definir un rol (Role Prompting)

### Prompt


Actúa como un desarrollador frontend senior.
Revisa este código y propón mejoras de estructura, legibilidad y responsive sin romper la funcionalidad existente.


### Técnica utilizada

**Role prompting**

### Por qué funciona bien

Definir un rol ayuda a orientar el tipo de respuesta que genera la IA.  
Al pedir que actúe como un **desarrollador senior**, la respuesta suele centrarse en:

- buenas prácticas
- calidad del código
- mejoras estructurales
- optimización del diseño

Esto produce respuestas más cercanas a una revisión profesional de código.

---

## Prompt 2: Razonamiento paso a paso (Chain of Thought)

### Prompt


Analiza este problema paso a paso: en móvil se ve bien, pero en escritorio los bloques no aparecen uno al lado del otro.
Explica qué está mal y cómo corregirlo.


### Técnica utilizada

**Chain-of-thought prompting**

### Por qué funciona bien

Este tipo de prompt obliga a la IA a **razonar antes de generar la solución**, lo que ayuda a:

- identificar correctamente el problema
- evitar soluciones incorrectas
- explicar mejor el origen del error

Es especialmente útil para **debugging**.

---

## Prompt 3: Solicitar código completo

### Prompt


Devuélveme únicamente el código completo de index.html listo para copiar y pegar, sin resumir ni omitir partes.


### Técnica utilizada

**Restricción de formato de salida**

### Por qué funciona bien

Este prompt evita respuestas incompletas o resumidas.  
Es útil cuando se necesita **código directamente utilizable**, sin explicaciones intermedias.

---

## Prompt 4: Refactorización controlada

### Prompt


Refactoriza este archivo app.js manteniendo exactamente la funcionalidad actual,
pero mejorando nombres de variables, reutilización de funciones y legibilidad.


### Técnica utilizada

**Refactorización con restricciones**

### Por qué funciona bien

La restricción de **mantener exactamente la funcionalidad actual** evita que la IA cambie la lógica del programa.

Esto permite mejorar el código sin introducir errores funcionales.

---

## Prompt 5: Restricciones técnicas claras

### Prompt


No uses frameworks adicionales.
Solo HTML, JavaScript y Tailwind CSS.
Quiero una solución compatible con mi estructura actual.


### Técnica utilizada

**Constraint prompting**

### Por qué funciona bien

Las restricciones reducen la probabilidad de que la IA genere soluciones incompatibles con el proyecto.

Esto es importante cuando el proyecto tiene **limitaciones tecnológicas concretas**.

---

## Prompt 6: Few-shot prompting

### Prompt


Quiero que sigas este estilo de función:

function saveTasks() {
localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

Ahora escribe funciones similares para:

cargar tareas

borrar tareas completadas

marcar todas como completadas


### Técnica utilizada

**Few-shot prompting**

### Por qué funciona bien

Proporcionar un ejemplo previo ayuda a que la IA:

- imite el estilo del código
- mantenga consistencia
- respete convenciones del proyecto

Esto es especialmente útil cuando se trabaja en **proyectos reales con estructura definida**.

---

## Prompt 7: Ajustar el nivel de explicación

### Prompt


Explícame este bloque de código como si estuviera aprendiendo JavaScript y CSS responsive por primera vez.


### Técnica utilizada

**Audience targeting**

### Por qué funciona bien

Permite adaptar el nivel de complejidad de la explicación.

Esto es útil para:

- comprender código complejo
- aprender conceptos nuevos
- generar documentación didáctica.

---

## Prompt 8: Generación de documentación

### Prompt


Genera una primera versión de documentación técnica para este proyecto, incluyendo:

funcionalidades

tecnologías utilizadas

estructura del proyecto

pasos de uso


### Técnica utilizada

**Document generation prompting**

### Por qué funciona bien

Permite obtener una **base inicial de documentación** que luego puede revisarse manualmente.

Esto acelera la creación de archivos como:

- README
- documentación técnica
- guías de uso

---

## Prompt 9: Revisión de accesibilidad

### Prompt


Revisa este HTML y dime qué aspectos básicos de accesibilidad faltan o podrían mejorarse.


### Técnica utilizada

**Quality review prompting**

### Por qué funciona bien

Este prompt enfoca la respuesta en un aspecto específico de calidad del software: **accesibilidad web**.

Permite detectar problemas como:

- falta de etiquetas semánticas
- ausencia de atributos `alt`
- problemas de contraste
- falta de etiquetas ARIA.

---

## Prompt 10: Debugging de layout

### Prompt


Mi diseño debería mostrar un sidebar a la izquierda y el contenido a la derecha en escritorio,
pero sigue apareciendo en columna.

Encuentra el error real y propón una solución robusta.


### Técnica utilizada

**Problem-oriented prompting**

### Por qué funciona bien

Este prompt describe claramente:

- el comportamiento esperado
- el problema observado
- la necesidad de una solución estable

Cuanto más contexto se proporciona, más precisa suele ser la respuesta de la IA.

---

# Conclusiones

Tras experimentar con distintos prompts, he observado que las respuestas más útiles suelen aparecer cuando el prompt:

- define claramente el **objetivo**
- añade **restricciones técnicas**
- proporciona **contexto del proyecto**
- indica el **nivel de detalle esperado**
- pide mantener la **funcionalidad existente**
- utiliza ejemplos previos cuando es necesario

En general, cuanto **más específico y estructurado es el prompt**, mayor es la calidad de la respuesta generada por la inteligencia artificial.

El prompt engineering se convierte así en una habilidad importante para utilizar herramientas de IA de forma eficaz dentro del desarrollo de software.
