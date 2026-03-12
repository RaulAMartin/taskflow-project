# Reflexión final sobre IA y programación

En este documento recojo una reflexión personal sobre el uso de inteligencia artificial durante el desarrollo del proyecto TaskFlow, analizando en qué me ha ayudado más, en qué ha fallado y qué riesgos tiene depender demasiado de este tipo de herramientas.

## Introducción

Durante el desarrollo de TaskFlow he utilizado herramientas de inteligencia artificial como apoyo para programar, refactorizar, organizar ideas, resolver errores y mejorar la documentación del proyecto. Esta experiencia me ha permitido comprobar que la IA puede ser una ayuda real dentro del flujo de trabajo de un desarrollador, pero también que tiene límites importantes.

## Tareas donde la IA me ha ayudado más

Las tareas en las que más útil me ha resultado la IA han sido las siguientes:

### 1. Detectar problemas estructurales
Uno de los casos más claros fue el problema del layout responsive. En un primer momento parecía que el fallo estaba en Tailwind o en las clases responsive, pero realmente el problema principal estaba en la estructura del HTML. La IA me ayudó a identificar que había etiquetas mal colocadas y que el contenido principal no estaba dentro de la estructura correcta.

### 2. Refactorizar código
La IA también me ha ayudado a mejorar funciones del archivo `app.js`, sobre todo separando responsabilidades y proponiendo nombres más claros para algunas variables y funciones. Esto ha hecho que el código sea más legible y más fácil de mantener.

### 3. Añadir nuevas funcionalidades
Otra ayuda importante ha sido la generación de nuevas funcionalidades como:
- edición de tareas
- filtros por estado
- botones para completar todas
- borrar tareas completadas
- mejoras responsive

La IA ha servido como punto de partida rápido, aunque después he tenido que adaptar y revisar el código manualmente.

### 4. Documentación
La generación de borradores para README y documentación en markdown me ha ahorrado bastante tiempo. Después ha sido necesario corregir, adaptar y personalizar esos textos, pero tener una base inicial acelera mucho el trabajo.

## Casos donde la IA ha fallado o ha generado resultados incorrectos

No todo ha sido perfecto. También he encontrado varios problemas.

### 1. Soluciones correctas en teoría pero no en la práctica
En algunas ocasiones la IA proponía cambios que parecían correctos al leerlos, pero al probarlos no funcionaban como esperaba. Esto me pasó con varias propuestas de layout responsive que no solucionaban del todo el problema.

### 2. Respuestas demasiado confiadas
A veces la IA respondía con mucha seguridad incluso cuando la solución no era exactamente correcta. Eso obliga a comprobar todo en navegador y no confiar ciegamente.

### 3. Código demasiado grande o poco adaptado
En algunos casos la IA devolvía bloques completos de código que había que revisar con cuidado porque podían romper partes ya existentes o no encajar del todo con la estructura actual del proyecto.

### 4. Necesidad de contexto preciso
He comprobado que cuando el prompt no está bien explicado, la calidad de la respuesta baja bastante. La IA necesita contexto claro, restricciones y objetivos concretos para ser realmente útil.

## Riesgos de depender demasiado de la IA

Creo que uno de los mayores riesgos es dejar de pensar por cuenta propia. Si un desarrollador acepta todo lo que propone la IA sin entenderlo, puede acabar con código que funciona parcialmente pero que no sabe mantener, depurar o ampliar.

También existe el riesgo de:

- no desarrollar lógica de programación propia
- no detectar errores ocultos
- aprender menos de los problemas reales
- perder criterio técnico
- generar documentación poco personal o poco precisa

Otro riesgo importante es que la IA puede introducir errores sutiles o decisiones de diseño discutibles que un principiante podría no detectar.

## Cuándo prefiero programar sin asistencia

Prefiero programar sin asistencia en estos casos:

### 1. Problemas pequeños
Si la tarea es sencilla, muchas veces tardo menos haciéndola directamente que preparando un prompt y revisando la respuesta.

### 2. Cuando quiero aprender de verdad
Si estoy practicando una técnica nueva o quiero consolidar conocimientos, me interesa resolver primero el problema por mi cuenta.

### 3. Cuando necesito control total
En partes delicadas del proyecto, como la estructura general del HTML o la lógica principal de filtros, prefiero entender bien cada línea antes de introducir cambios.

## Cuándo sí usaría IA sin dudarlo

La usaría sobre todo para:

- generar borradores iniciales
- refactorizar
- revisar código
- detectar posibles mejoras
- explicar conceptos
- proponer alternativas
- ayudar con documentación

## Conclusión final

Mi conclusión es que la inteligencia artificial puede ser una herramienta muy útil para desarrollar más rápido, revisar ideas y mejorar la productividad, pero no sustituye el criterio del programador. En este proyecto me ha ayudado bastante, especialmente en depuración, refactorización y documentación, pero las decisiones finales importantes han requerido siempre revisión manual.

La IA es mejor cuando se usa como apoyo inteligente, no como piloto automático. Bien utilizada, puede ahorrar tiempo y ayudar a aprender. Mal utilizada, puede crear dependencia y dar una falsa sensación de seguridad.