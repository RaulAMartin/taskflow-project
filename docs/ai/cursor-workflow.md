
# Flujo de trabajo con Cursor

En este documento voy a explicar cómo he utilizado Cursor dentro del proyecto TaskFlow, qué herramientas he probado y en qué tareas me ha ayudado durante el desarrollo.

## Objetivo del documento

El objetivo es documentar el uso de Cursor como IDE asistido por IA dentro del flujo de desarrollo del proyecto.

## Primer contacto con Cursor

Instalé Cursor y abrí el proyecto TaskFlow para probar su funcionamiento sobre una base real de código. La interfaz es muy parecida a VS Code, por lo que la adaptación fue bastante rápida.

Las partes principales que exploré fueron:

- Explorador de archivos
- Editor de código
- Terminal integrada
- Chat contextual
- Edición inline
- Composer

## Funciones que probé

## 1. Autocompletado con comentarios
Probé a escribir comentarios describiendo funciones, por ejemplo:

```js
// función para guardar tareas en localStorage

Cursor fue capaz de sugerir implementaciones bastante razonables y cercanas a lo que necesitaba.

2. Chat contextual

Usé el chat para pedir explicaciones sobre partes concretas del código del proyecto, especialmente funciones relacionadas con filtros, renderizado y localStorage.

Esto me ayudó a entender mejor:

qué hacía cada función

cómo dividir funciones largas

qué podía mejorar en nombres y estructura

3. Edición inline

Probé la edición inline para modificar funciones concretas sin tener que reescribirlas completas. Fue útil para:

mejorar nombres de variables

simplificar condiciones

reorganizar partes repetitivas

4. Composer

También probé Composer para generar cambios más grandes, afectando varios archivos. Este tipo de herramienta resulta útil cuando se quiere:

añadir nuevas funcionalidades

cambiar estructura HTML y JS a la vez

hacer refactorizaciones amplias

Mejoras obtenidas con Cursor
Ejemplo 1: simplificación de funciones

Cursor me ayudó a detectar que algunas funciones podían ser más reutilizables. Por ejemplo:

separar validación

separar filtros

centralizar renderizado

Esto mejoró la legibilidad del código.

Ejemplo 2: mejoras del formulario

Cursor me ayudó a añadir validaciones extra y a pensar mejor la lógica del formulario:

evitar tareas vacías

limpiar texto

comprobar textos duplicados

mostrar mensajes al usuario

Atajos o acciones frecuentes utilizadas

Durante las pruebas utilicé sobre todo:

apertura del chat contextual

edición inline sobre selecciones

autocompletado en el editor

terminal integrada para ejecutar comandos del proyecto

Valoración personal

Cursor me ha parecido útil para trabajar más rápido cuando ya tengo claro lo que quiero construir. Su mayor ventaja es que entiende el contexto del proyecto y puede ayudar a modificar varias partes del código de forma más conectada que un chat aislado.

Aun así, no conviene aceptar cambios automáticamente. Es importante revisar siempre:

nombres de variables

lógica de negocio

estructura final del HTML

posibles errores de maquetación

funcionamiento real en navegador

Conclusión

Cursor es una herramienta interesante para acelerar el desarrollo, especialmente en tareas como:

refactorización

documentación

explicación de código

generación de funciones repetitivas

cambios en varios archivos

En este proyecto me ha resultado útil como apoyo, pero no como sustituto de la revisión manual.
