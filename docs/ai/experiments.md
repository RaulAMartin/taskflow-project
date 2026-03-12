# Experimentos con IA en programación

En este documento se recogen varios experimentos realizados durante el desarrollo del proyecto **TaskFlow** para comparar cómo cambia el proceso de trabajo al resolver problemas **sin ayuda de inteligencia artificial** y posteriormente **con apoyo de herramientas de IA**.

El objetivo de estos experimentos es analizar de forma práctica cómo influye la IA en el proceso de desarrollo.

---

# Objetivo del documento

Los experimentos se centraron en analizar cuatro aspectos principales:

- tiempo invertido en resolver el problema
- calidad del código obtenido
- comprensión del problema
- utilidad real de la IA dentro del proceso de desarrollo

Para ello, cada problema se resolvió primero **sin utilizar IA**, y posteriormente se repitió con ayuda de herramientas como **ChatGPT o Cursor**.

---

# Experimentos con problemas generales de programación

## Experimento 1: contar vocales en un texto

### Solución sin IA

Primero resolví el problema manualmente escribiendo una función que recorriera cada carácter del texto y comprobara si era una vocal.

Esto requirió pensar la lógica para cubrir tanto **mayúsculas como minúsculas**.

Ejemplo de solución:

```javascript
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
Solución con IA

Posteriormente pedí a la IA una función equivalente en JavaScript.
La solución propuesta fue muy similar y también utilizaba un bucle y una lista de vocales.

Comparación
Aspecto	Sin IA	Con IA
Tiempo	Mayor	Muy rápido
Calidad	Correcta	Correcta
Comprensión	Alta	Media

La principal diferencia fue el tiempo de obtención de la solución, aunque resolver el problema manualmente ayudó a comprender mejor la lógica.

Experimento 2: comprobar si una palabra es palíndroma
Solución sin IA

En este caso resolví el problema utilizando los métodos de JavaScript split(), reverse() y join().

function esPalindromo(texto) {
  const normalizado = texto.toLowerCase();
  return normalizado === normalizado.split("").reverse().join("");
}
Solución con IA

La IA generó prácticamente la misma solución, utilizando exactamente los mismos métodos.

Comparación
Aspecto	Sin IA	Con IA
Tiempo	Bajo	Muy bajo
Calidad	Correcta	Correcta
Comprensión	Alta	Alta

En problemas conocidos o simples, la diferencia entre trabajar con o sin IA es pequeña.

Experimento 3: filtrar elementos de un array
Solución sin IA

Inicialmente escribí una función utilizando un bucle for.

function filtrarCompletadas(tareas) {
  const resultado = [];

  for (let tarea of tareas) {
    if (tarea.completada) {
      resultado.push(tarea);
    }
  }

  return resultado;
}
Solución con IA

La IA propuso utilizar el método filter(), que es una solución más moderna y concisa.

function filtrarCompletadas(tareas) {
  return tareas.filter(tarea => tarea.completada);
}
Comparación
Aspecto	Sin IA	Con IA
Tiempo	Medio	Muy rápido
Calidad	Correcta	Mejor legibilidad
Comprensión	Buena	Buena

En este caso la IA ayudó a recordar una solución más idiomática de JavaScript.

Experimentos aplicados al proyecto TaskFlow
Experimento 4: sistema de filtros de tareas
Sin IA

Intenté diseñar manualmente la lógica para filtrar tareas por:

texto

estado (completada o pendiente)

categoría

La parte más complicada fue organizar bien las condiciones y mantener el código legible.

Con IA

La IA sugirió dividir la lógica en funciones más pequeñas y reutilizables, lo que facilitó el mantenimiento del código.

Ejemplo de estructura sugerida:

function filtrarPorTexto(tareas, texto) {
  return tareas.filter(t => t.texto.includes(texto));
}
Comparación
Aspecto	Sin IA	Con IA
Tiempo	Alto	Medio
Calidad	Correcta	Mejor estructura
Comprensión	Media	Alta tras revisar

La IA ayudó a organizar mejor el código y separar responsabilidades.

Experimento 5: problema de layout responsive
Sin IA

Intenté resolver el problema modificando clases de Tailwind y probando diferentes combinaciones de grid y flexbox.

El proceso fue lento porque el problema real no estaba en el CSS sino en la estructura del HTML.

Con IA

La IA detectó que el layout estaba mal estructurado y sugirió reorganizar los contenedores principales.

Esto permitió resolver el problema de forma más clara y estable.

Comparación
Aspecto	Sin IA	Con IA
Tiempo	Alto	Mucho menor
Calidad	Parcial	Solución completa
Comprensión	Baja al principio	Mejor tras analizar la solución

Este experimento muestra que la IA puede ser especialmente útil en debugging de problemas complejos.

Experimento 6: validaciones del formulario
Sin IA

Inicialmente añadí validaciones básicas para evitar que se guardaran tareas vacías.

Con IA

La IA sugirió añadir validaciones adicionales como:

evitar textos duplicados

limpiar espacios en blanco

mostrar mensajes al usuario

limitar la longitud del texto

Comparación
Aspecto	Sin IA	Con IA
Tiempo	Medio	Bajo
Calidad	Básica	Mejor experiencia de usuario
Comprensión	Media	Alta

La IA ayudó a pensar en casos de uso más reales.

Conclusiones generales

Tras realizar estos experimentos se pueden extraer varias conclusiones:

La IA acelera especialmente tareas de refactorización y debugging.

En problemas sencillos la diferencia de tiempo puede ser pequeña.

Resolver primero un problema sin IA ayuda a entender mejor la lógica.

Usar IA posteriormente permite optimizar y mejorar la solución inicial.

La revisión manual del código sigue siendo imprescindible.

Conclusión final

La inteligencia artificial se ha demostrado como una herramienta muy útil dentro del proceso de desarrollo, especialmente para:

detectar errores

proponer mejoras estructurales

generar soluciones iniciales

revisar código existente

Sin embargo, estos experimentos muestran que la IA funciona mejor como herramienta de apoyo y no como sustituto del proceso de programación.

El mejor resultado se obtiene cuando el desarrollador combina pensamiento propio + revisión crítica + uso inteligente de la IA.
