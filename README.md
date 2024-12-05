README - Métodos de Programación y Teoría de Colas
Descripción General
Este trabajo aborda tres enfoques fundamentales de resolución de problemas en matemáticas aplicadas y computación: teoría de colas, programación dinámica y programación lineal. Cada uno de estos métodos se ilustra mediante ejemplos prácticos y herramientas interactivas que permiten analizar, resolver y visualizar soluciones óptimas.

El propósito principal es desarrollar un entendimiento práctico de estos conceptos y aplicarlos a problemas reales que surgen en operaciones, planificación y optimización de sistemas.

Contenido del Proyecto
1. Teoría de Colas
Este módulo se centra en el análisis de sistemas de espera. Incluye un ejemplo práctico con formularios para calcular el rendimiento de un sistema de colas, como el tiempo promedio de espera, la tasa de servicio y la probabilidad de estado estacionario.

Características:
Análisis de colas M/M/1 y otros modelos.
Cálculo de métricas clave: tiempo promedio en cola, utilización del servidor, entre otros.
Interfaz interactiva para la entrada de parámetros como tasa de llegada (
𝜆
λ) y tasa de servicio (
𝜇
μ).
Archivos Relacionados:
teoria_colas.html - Interfaz principal.
colas.js - Cálculos y lógica implementados en JavaScript.
colas.css - Estilos para la presentación del formulario.
2. Programación Dinámica
Explora la técnica de dividir un problema complejo en subproblemas más simples, resolviendo cada uno de manera óptima y combinándolos para obtener la solución global.

Caso Práctico:
Un ejemplo destacado es un problema de juego de apuestas, donde se busca maximizar la probabilidad de alcanzar una meta de fichas mediante decisiones óptimas en cada turno.

Características:
Uso de una tabla de decisiones (matriz DP) para almacenar soluciones de subproblemas.
Política óptima para decisiones basadas en probabilidades dinámicas.
Formulario interactivo para ingresar parámetros como el número inicial de fichas, la probabilidad de ganar, y el número de jugadas permitidas.

3. Programación Lineal
Incluye métodos para la optimización de problemas donde la función objetivo y las restricciones son lineales.

Características:
Interfaz para ingresar los coeficientes de la función objetivo y las restricciones.
Solución interactiva mediante simulación de pasos iterativos del método de gradiente.
Visualización del resultado con valores óptimos para cada variable.
Archivos Relacionados:


Tecnologías Utilizadas
HTML/CSS: Construcción de la interfaz de usuario.
JavaScript: Implementación de la lógica y los algoritmos.
PHP (Opcional): Para el manejo de formularios y cálculos en el servidor (opcional en el módulo de programación dinámica).
Visual Studio Code / Navegador Web: Para desarrollo y ejecución local.
Estructura del Proyecto

Los archivos del proyecto están organizados en las siguientes carpetas:

/teoria_colas: Modelos relacionados con sistemas de colas, incluyendo:

Modelo de líneas de espera de múltiples servidores
Modelo de línea de espera con fuentes finitas
Modelo de línea de espera con un servidor con llegadas Poisson
Modelo de línea de espera con un servidor
Esquema de nacimiento y muerte en sistemas de colas
Modelo de múltiples canales con llegadas Poisson
/programacion_lineal: Modelos de optimización y programación lineal, tales como:

Programación separable
Programación No Convexa
Programación Fraccionaria
Programación Cuadrática
Optimización no restringida con una variable
Programación Convexa
/programacion_dinamica: Aplicaciones de programación dinámica en diversos problemas, como:

Distribución de Científicos entre grupos de investigación
Determinación de Holgura por rechazos
Programación del Nivel de Empleados
Modelo de Tamaño de la Fuerza de Trabajo
Programación Dinámica Probabilística
Distribución de Brigadas Médicas entre países
README.md: Documento de introducción y descripción general del proyecto.

Autor
Este trabajo fue realizado como parte de un proyecto educativo sobre métodos avanzados de optimización. Para preguntas o sugerencias, por favor contacta a:
  - Angel Eduardo Vivanco Laura 2022-119101
  - Jhosep Marel Changana Meza 2022-119062
