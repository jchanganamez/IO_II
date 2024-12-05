document
  .getElementById('optimization-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    // Capturar los datos del formulario
    const c1 = parseFloat(document.getElementById('c1').value);
    const c2 = parseFloat(document.getElementById('c2').value);
    const c1sq = parseFloat(document.getElementById('c1sq').value);
    const c2sq = parseFloat(document.getElementById('c2sq').value);
    const r1 = parseFloat(document.getElementById('r1').value);
    const r2 = parseFloat(document.getElementById('r2').value);

    // Función objetivo
    function objetivo(x1, x2) {
      return (
        c1 * x1 + c2 * x2 - c1sq * Math.pow(x1, 2) - c2sq * Math.pow(x2, 2)
      );
    }

    // Restricciones
    function cumpleRestricciones(x1, x2) {
      return x1 + x2 <= r1 && 2 * x1 + 3 * x2 <= r2 && x1 >= 0 && x2 >= 0;
    }

    // Búsqueda de la solución óptima
    let mejorZ = -Infinity;
    let mejorX1 = 0;
    let mejorX2 = 0;

    // Búsqueda de soluciones con una cuadrícula
    const pasos = 100; // Precisión
    for (let i = 0; i <= pasos; i++) {
      for (let j = 0; j <= pasos; j++) {
        let x1 = i / pasos;
        let x2 = j / pasos;
        if (cumpleRestricciones(x1, x2)) {
          let z = objetivo(x1, x2);
          if (z > mejorZ) {
            mejorZ = z;
            mejorX1 = x1;
            mejorX2 = x2;
          }
        }
      }
    }

    // Mostrar resultados
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `
      <p><strong>Valor óptimo de Z:</strong> ${mejorZ.toFixed(4)}</p>
      <p><strong>Solución óptima (x1, x2):</strong> (${mejorX1.toFixed(
        4
      )}, ${mejorX2.toFixed(4)})</p>
  `;
  });
