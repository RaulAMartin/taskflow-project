# Comparativa entre asistentes de IA

En este documento voy a comparar diferentes asistentes de inteligencia artificial aplicados al desarrollo, centrándome en ChatGPT y Claude. El objetivo es analizar cómo explican conceptos técnicos, cómo detectan errores en código JavaScript y cómo generan código a partir de descripciones en lenguaje natural.

## Objetivo de la comparativa

Durante esta práctica he utilizado ChatGPT y Claude para:

- Explicar conceptos técnicos de JavaScript
- Detectar errores en funciones con bugs intencionados
- Generar funciones a partir de descripciones
- Comparar claridad, profundidad y calidad del código generado

## Concepto 1: Closures

### Prompt usado
Explica qué es un closure en JavaScript con un ejemplo sencillo y fácil de entender.

### Resultado observado en ChatGPT
ChatGPT explicó el closure de forma clara, definiéndolo como una función que recuerda el entorno en el que fue creada. Dio un ejemplo sencillo con una función que devuelve otra función y mostró cómo una variable interna seguía disponible.

### Resultado observado en Claude
Claude también explicó correctamente el concepto, con un tono algo más académico. Dio un ejemplo parecido, pero más detallado, explicando mejor la relación entre scope y memoria.

### Conclusión
- ChatGPT: explicación más directa y fácil de entender.
- Claude: explicación más detallada y teórica.
- Mejor para principiantes: ChatGPT.
- Mejor para profundizar: Claude.

---

## Concepto 2: Event Loop

### Prompt usado
Explícame el event loop en JavaScript como si fuera un estudiante que está empezando.

### Resultado observado en ChatGPT
ChatGPT usó un lenguaje sencillo, habló del call stack, Web APIs y cola de tareas con un ejemplo práctico usando `setTimeout`.

### Resultado observado en Claude
Claude explicó el event loop de forma más completa y estructurada, aunque algo menos simple. Dio más contexto sobre la ejecución asíncrona.

### Conclusión
- ChatGPT simplifica mejor.
- Claude profundiza más.
- Para una primera toma de contacto me resultó más útil ChatGPT.

---

## Concepto 3: DOM

### Prompt usado
¿Qué es el DOM y para qué sirve en JavaScript? Pon ejemplos prácticos.

### Resultado observado en ChatGPT
La explicación fue clara, uniendo teoría y práctica. Mostró ejemplos como seleccionar elementos, cambiar texto y escuchar eventos.

### Resultado observado en Claude
Claude explicó el DOM con precisión, aunque de una forma algo más formal. Los ejemplos fueron correctos.

### Conclusión
Ambos asistentes respondieron bien. ChatGPT fue más útil para llevarlo a código real de forma inmediata.

---

## Funciones JavaScript con errores intencionales

## Ejemplo 1

### Código enviado
```js
function suma(a, b) {
  return a - b;
}

Prompt usado

Encuentra el error en esta función y explícalo.

Resultado observado

Ambos asistentes detectaron correctamente que la operación era incorrecta y debía ser una suma en lugar de una resta.

Conclusión

Los dos asistentes detectaron este bug sin problemas.

Ejemplo 2
Código enviado
function saludar(nombre) {
  console.log("Hola " + nombe);
}
Prompt usado

Detecta el bug de esta función y explica por qué falla.

Resultado observado

Ambos detectaron el error de escritura en la variable nombe en lugar de nombre.

Conclusión

Ambos asistentes fueron útiles detectando errores sencillos de referencia.

Ejemplo 3
Código enviado
function obtenerPrimerElemento(array) {
  return array[1];
}
Prompt usado

Encuentra el error lógico y corrígelo.

Resultado observado

Los dos asistentes detectaron que si la función pretende devolver el primer elemento debería usar array[0].

Conclusión

Ambos fueron precisos al detectar errores lógicos básicos.

Generación de funciones a partir de descripciones
Función 1: contar vocales
Prompt usado

Escribe una función en JavaScript que reciba un texto y devuelva cuántas vocales contiene.

Resultado observado en ChatGPT

La función fue correcta, legible y fácil de entender.

Resultado observado en Claude

Claude generó una función también correcta, con una implementación algo más detallada.

Conclusión

Ambos generaron código válido. ChatGPT fue más conciso.

Función 2: comprobar palíndromo
Prompt usado

Crea una función que compruebe si una palabra es palíndroma, ignorando mayúsculas.

Resultado observado

Los dos asistentes devolvieron una implementación válida y correcta.

Conclusión

En tareas comunes, ambos asistentes ofrecen resultados bastante similares.

Función 3: filtrar tareas completadas
Prompt usado

Escribe una función que reciba un array de tareas y devuelva solo las completadas.

Resultado observado

Ambos asistentes propusieron usar filter(), que era la solución más limpia y adecuada.

Conclusión

En generación de código corto y práctico, ambos son útiles.

Valoración general
Claridad

ChatGPT me ha parecido más claro y directo en la mayoría de respuestas.

Profundidad

Claude me ha parecido más profundo y detallado en explicaciones teóricas.

Ejemplos

ChatGPT suele acompañar mejor las explicaciones con ejemplos rápidos y prácticos.

Calidad del código

Ambos generan código correcto en problemas sencillos e intermedios, aunque siempre conviene revisarlo manualmente.

Conclusión final

Mi conclusión es que ambos asistentes son útiles, pero en este proyecto he encontrado más práctico ChatGPT para:

Resolver dudas rápidas

Refactorizar código

Generar funciones

Mejorar estructura y diseño del proyecto

Claude también es útil, especialmente cuando quiero una explicación más desarrollada o más teórica. Aun así, en mi flujo de trabajo diario para TaskFlow me ha resultado más ágil ChatGPT.
