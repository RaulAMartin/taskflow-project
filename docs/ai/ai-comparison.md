# Comparativa entre asistentes de IA

## Introducción

En este documento se realiza una comparativa entre dos asistentes de inteligencia artificial aplicados al desarrollo de software: **ChatGPT** y **Claude**.  
El objetivo es analizar cómo responden ante diferentes tareas relacionadas con programación, especialmente en el contexto del desarrollo del proyecto **TaskFlow**.

Durante la práctica se evaluaron tres aspectos principales:

- Explicación de conceptos técnicos de JavaScript
- Detección de errores en funciones con bugs intencionados
- Generación de código a partir de descripciones en lenguaje natural

A partir de estos experimentos se comparó la **claridad de las explicaciones**, la **profundidad técnica** y la **calidad del código generado**.

---

# Explicación de conceptos técnicos

## Concepto 1: Closures

### Prompt utilizado


Explica qué es un closure en JavaScript con un ejemplo sencillo y fácil de entender.


### Resultado observado en ChatGPT

ChatGPT explicó el concepto de **closure** como una función que mantiene acceso a las variables de su **entorno léxico**, incluso después de que la función exterior haya terminado su ejecución.

Además, incluyó un ejemplo sencillo:

```javascript
function crearContador() {
  let contador = 0;

  return function() {
    contador++;
    return contador;
  };
}

const contar = crearContador();
console.log(contar()); // 1
console.log(contar()); // 2

La explicación fue clara y fácil de seguir, enfocada en la utilidad práctica del concepto.

Resultado observado en Claude

Claude ofreció una explicación más detallada desde el punto de vista conceptual, explicando la relación entre:

Scope

Entorno léxico

Persistencia en memoria

También proporcionó un ejemplo similar, aunque con una explicación más extensa sobre cómo JavaScript gestiona el contexto de ejecución.

Conclusión

ChatGPT: explicación más directa y fácil de entender.

Claude: explicación más profunda y teórica.

Para principiantes: ChatGPT resulta más accesible.

Para comprender el funcionamiento interno: Claude ofrece más detalle.

Concepto 2: Event Loop
Prompt utilizado
Explícame el event loop en JavaScript como si fuera un estudiante que está empezando.
Resultado observado en ChatGPT

ChatGPT explicó el event loop utilizando un lenguaje sencillo e introdujo conceptos como:

Call Stack

Web APIs

Callback Queue

Incluyó además un ejemplo con setTimeout:

console.log("Inicio");

setTimeout(() => {
  console.log("Esto se ejecuta después");
}, 0);

console.log("Fin");

La explicación se centró en mostrar cómo JavaScript gestiona tareas asíncronas.

Resultado observado en Claude

Claude ofreció una explicación más estructurada y técnica. Además de explicar el flujo de ejecución, añadió detalles sobre:

Gestión de tareas asincrónicas

Diferencias entre tareas síncronas y asíncronas

Funcionamiento del motor JavaScript

Aunque fue más completo, resultó ligeramente más complejo para una primera aproximación.

Conclusión

ChatGPT: simplifica mejor conceptos complejos.

Claude: profundiza más en el funcionamiento interno.

Para aprendizaje inicial: ChatGPT resulta más claro.

Concepto 3: DOM
Prompt utilizado
¿Qué es el DOM y para qué sirve en JavaScript? Pon ejemplos prácticos.
Resultado observado en ChatGPT

ChatGPT explicó el DOM (Document Object Model) como una representación en forma de árbol de la estructura de un documento HTML.

Incluyó ejemplos prácticos como:

document.querySelector("#titulo").textContent = "Nuevo título";

document.querySelector("button").addEventListener("click", () => {
  alert("Botón pulsado");
});

Los ejemplos facilitaban entender cómo interactuar con la página web.

Resultado observado en Claude

Claude explicó el DOM de forma correcta y más formal, centrándose en cómo el navegador representa la estructura del documento y cómo JavaScript puede manipularla.

Los ejemplos también fueron correctos, aunque menos orientados a casos prácticos inmediatos.

Conclusión

Ambos asistentes ofrecieron buenas respuestas, pero ChatGPT resultó más práctico para pasar rápidamente de la teoría al código.

Detección de errores en funciones JavaScript
Ejemplo 1
Código enviado
function suma(a, b) {
  return a - b;
}
Prompt utilizado
Encuentra el error en esta función y explícalo.
Resultado observado

Ambos asistentes detectaron correctamente que la función realiza una resta en lugar de una suma.

Corrección propuesta
function suma(a, b) {
  return a + b;
}
Conclusión

Los dos asistentes detectaron este bug sin dificultad.

Ejemplo 2
Código enviado
function saludar(nombre) {
  console.log("Hola " + nombe);
}
Prompt utilizado
Detecta el bug de esta función y explica por qué falla.
Resultado observado

Ambos asistentes detectaron correctamente el error tipográfico en la variable nombe, que debería ser nombre.

Corrección propuesta
function saludar(nombre) {
  console.log("Hola " + nombre);
}
Conclusión

Los asistentes identifican fácilmente errores simples de referencia en variables.

Ejemplo 3
Código enviado
function obtenerPrimerElemento(array) {
  return array[1];
}
Prompt utilizado
Encuentra el error lógico y corrígelo.
Resultado observado

Ambos asistentes detectaron que la función debería devolver el índice 0 para obtener el primer elemento del array.

Corrección propuesta
function obtenerPrimerElemento(array) {
  return array[0];
}
Conclusión

Los dos asistentes identificaron correctamente el error lógico.

Generación de funciones a partir de descripciones
Función 1: Contar vocales
Prompt utilizado
Escribe una función en JavaScript que reciba un texto y devuelva cuántas vocales contiene.
Ejemplo de solución generada
function contarVocales(texto) {
  const vocales = "aeiouAEIOU";
  let contador = 0;

  for (let letra of texto) {
    if (vocales.includes(letra)) {
      contador++;
    }
  }

  return contador;
}
Conclusión

Ambos asistentes generaron funciones correctas y fáciles de entender.

Función 2: Comprobar palíndromo
Prompt utilizado
Crea una función que compruebe si una palabra es palíndroma ignorando mayúsculas.
Ejemplo de solución generada
function esPalindromo(palabra) {
  const normalizada = palabra.toLowerCase();
  const invertida = normalizada.split("").reverse().join("");

  return normalizada === invertida;
}
Conclusión

Las implementaciones generadas por ambos asistentes fueron correctas y eficientes.

Función 3: Filtrar tareas completadas
Prompt utilizado
Escribe una función que reciba un array de tareas y devuelva solo las completadas.
Ejemplo de solución generada
function obtenerTareasCompletadas(tareas) {
  return tareas.filter(tarea => tarea.completada);
}
Conclusión

En tareas simples y comunes de JavaScript, ambos asistentes generan soluciones limpias y adecuadas.

Valoración general
Claridad

ChatGPT ofrece respuestas generalmente más claras, directas y fáciles de entender, lo que lo hace muy útil para resolver dudas rápidas durante el desarrollo.

Profundidad

Claude tiende a proporcionar explicaciones más detalladas y teóricas, lo que puede resultar útil cuando se busca comprender mejor el funcionamiento interno de ciertos conceptos.

Ejemplos prácticos

ChatGPT suele incluir más ejemplos prácticos y aplicables directamente al código, lo que facilita llevar la teoría a la práctica.

Calidad del código

Ambos asistentes generan código funcional y correcto para problemas de dificultad baja o media.
Sin embargo, siempre es necesario revisar manualmente el código generado antes de integrarlo en un proyecto real.

Conclusión final

Ambos asistentes resultan herramientas útiles para el desarrollo de software. No obstante, durante esta práctica he encontrado más práctico utilizar ChatGPT dentro de mi flujo de trabajo con el proyecto TaskFlow, especialmente para:

Resolver dudas rápidas

Refactorizar funciones

Generar pequeñas utilidades

Mejorar la estructura del código

Por otro lado, Claude resulta especialmente útil cuando se buscan explicaciones más profundas o teóricas sobre conceptos de programación.

En conclusión, ambos asistentes pueden complementarse dentro del proceso de desarrollo, pero para tareas rápidas y prácticas durante la programación diaria, ChatGPT me ha resultado más ágil y directo.
