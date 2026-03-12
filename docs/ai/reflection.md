# Reflexión final sobre IA y programación

En este documento recojo una reflexión personal sobre el uso de inteligencia artificial durante el desarrollo del proyecto **TaskFlow**. A lo largo del proyecto he utilizado herramientas de IA como apoyo para programar, refactorizar código, detectar errores y mejorar la documentación. Esta experiencia me ha permitido comprobar tanto las ventajas como las limitaciones que tienen este tipo de herramientas dentro del trabajo de un desarrollador.

---

# Introducción

Durante el desarrollo de TaskFlow utilicé herramientas de inteligencia artificial como **ChatGPT, Claude y Cursor** para ayudarme en distintas tareas del proyecto. Estas herramientas me han servido principalmente como asistentes que permiten acelerar ciertos procesos, generar ideas o revisar código.

Sin embargo, también he comprobado que la inteligencia artificial no sustituye el criterio del desarrollador. En muchos casos ha sido necesario revisar cuidadosamente las respuestas generadas y comprobar su funcionamiento real dentro del proyecto.

---

# Tareas donde la IA me ha ayudado más

## 1. Detectar problemas estructurales

Uno de los casos más claros fue un problema relacionado con el **layout responsive** del proyecto. En un primer momento parecía que el fallo estaba en las clases de Tailwind o en las reglas responsive, pero realmente el problema estaba en la estructura del HTML.

La IA me ayudó a identificar que algunas etiquetas estaban mal organizadas y que el contenido principal no estaba dentro de la estructura adecuada del layout. Esto permitió reorganizar el HTML y resolver el problema.

---

## 2. Refactorizar código

La IA también resultó útil para **refactorizar funciones del archivo `app.js`**. En particular ayudó a:

- separar responsabilidades entre funciones
- mejorar nombres de variables
- simplificar algunas condiciones
- hacer el código más legible

Estas mejoras hicieron que el código fuera más fácil de mantener y entender.

---

## 3. Añadir nuevas funcionalidades

Otra ayuda importante fue la generación inicial de ideas y código para nuevas funcionalidades del proyecto, como por ejemplo:

- edición de tareas
- filtros por estado
- botón para completar todas las tareas
- opción para borrar tareas completadas
- mejoras en el comportamiento responsive

En muchos casos la IA generó una buena base inicial, aunque fue necesario revisar y adaptar el código para integrarlo correctamente en el proyecto.

---

## 4. Generación de documentación

La IA también fue útil para generar **primeros borradores de documentación**, como el README o algunos archivos markdown.

Esto permitió ahorrar tiempo en la redacción inicial, aunque después fue necesario revisar, corregir y adaptar el contenido para que reflejara correctamente el funcionamiento real del proyecto.

---

# Casos donde la IA ha fallado o ha generado resultados incorrectos

Aunque la IA ha sido útil en muchas situaciones, también he encontrado varios casos donde sus respuestas no eran completamente correctas.

## 1. Soluciones correctas en teoría pero no en la práctica

En algunas ocasiones la IA proponía soluciones que parecían correctas al leerlas, pero al probarlas en el navegador no resolvían realmente el problema.

Esto ocurrió especialmente en algunas propuestas relacionadas con **layout responsive**.

---

## 2. Respuestas demasiado confiadas

Otra situación frecuente es que la IA puede responder con mucha seguridad incluso cuando la solución no es del todo correcta. Esto obliga a comprobar siempre el resultado en el código real y no confiar completamente en la primera respuesta.

---

## 3. Código demasiado grande o poco adaptado

A veces la IA genera bloques completos de código que no encajan del todo con la estructura existente del proyecto. Esto obliga a revisar cuidadosamente cada parte antes de integrarla.

---

## 4. Falta de contexto

He comprobado que cuando el prompt no describe bien el contexto del problema, la calidad de la respuesta baja bastante.

La IA funciona mejor cuando el prompt incluye:

- contexto claro
- objetivo concreto
- restricciones técnicas
- descripción del problema

---

# Riesgos de depender demasiado de la IA

Uno de los principales riesgos es dejar de desarrollar la **capacidad de razonamiento propio** como programador.

Si un desarrollador acepta automáticamente todo el código generado por la IA sin entenderlo, puede terminar con un proyecto que funciona parcialmente pero que no sabe mantener, ampliar o depurar.

Algunos riesgos adicionales son:

- No desarrollar una lógica de programación sólida
- No detectar errores ocultos
- Depender demasiado de soluciones externas
- Perder criterio técnico al tomar decisiones de diseño
- Generar documentación poco personalizada

También existe el riesgo de introducir **errores sutiles o malas decisiones de arquitectura** que un programador con poca experiencia podría no detectar.

---

# Cuándo prefiero programar sin asistencia

Hay situaciones en las que prefiero programar sin utilizar herramientas de IA.

## 1. Problemas pequeños

Cuando la tarea es sencilla, muchas veces resulta más rápido escribir el código directamente que preparar un prompt y revisar la respuesta generada.

---

## 2. Cuando quiero aprender un concepto

Si estoy aprendiendo una técnica nueva o practicando un concepto de programación, prefiero intentar resolver el problema por mi cuenta antes de pedir ayuda a la IA.

---

## 3. Partes críticas del proyecto

En las partes más importantes del proyecto, como la estructura principal del HTML o la lógica central de las funciones, prefiero entender completamente cada línea de código antes de hacer cambios.

---

# Cuándo sí usaría IA sin dudarlo

La inteligencia artificial resulta especialmente útil para:

- Generar borradores iniciales de código
- Refactorizar funciones
- Revisar posibles mejoras del código
- Detectar errores comunes
- Explicar conceptos de programación
- Proponer alternativas de implementación
- Generar documentación inicial

En estas tareas puede ahorrar bastante tiempo y ayudar a mejorar la productividad.

---

# Conclusión final

Mi conclusión es que la inteligencia artificial puede ser una herramienta muy útil dentro del desarrollo de software, pero siempre debe utilizarse como **apoyo al programador y no como sustituto de su criterio**.

Durante el desarrollo de TaskFlow me ha ayudado especialmente en tareas de depuración, refactorización y documentación. Sin embargo, todas las decisiones importantes han requerido revisión manual y comprensión del código generado.

La IA funciona mejor cuando se utiliza como **una herramienta que complementa el trabajo del desarrollador**, permitiendo acelerar ciertas tareas y explorar soluciones alternativas.
