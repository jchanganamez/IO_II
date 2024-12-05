let currentOperation = null;

// Mostrar u ocultar el formulario de entrada
function mostrarFormulario(operacion) {
  currentOperation = operacion;
  const inputLabel = document.getElementById('input-label');
  const inputsDiv = document.getElementById('inputs');
  const resultadoDiv = document.getElementById('resultado');

  resultadoDiv.style.display = 'none'; // Ocultar resultados previos
  inputsDiv.style.display = 'block';

  if (operacion === 'volumen') {
    inputLabel.textContent = 'Ingrese el área fija de la caja (en m²):';
  } else if (operacion === 'area') {
    inputLabel.textContent = 'Ingrese el volumen deseado de la caja (en m³):';
  }
}

// Calcular el volumen máximo
function calcularVolumenMaximo(area) {
  const x1 = Math.sqrt(area / 3.0);
  const x2 = x1;
  const x3 = x1 / 2;
  const volumenOptimo = x1 * x2 * x3;

  return {
    x1,
    x2,
    x3,
    volumenOptimo,
  };
}

// Calcular el área mínima
function calcularAreaMinima(volumen) {
  const x1 = Math.pow(4, 1 / 6) * Math.pow(volumen, 1 / 3); // Largo y Ancho
  const x2 = x1; // Largo y Ancho iguales
  const x3 = x1 / 2; // Altura
  const areaMinima = 3 * Math.pow(4, 1 / 3) * Math.pow(volumen, 2 / 3);

  return {
    x1,
    x2,
    x3,
    areaMinima,
  };
}

// Manejar el cálculo según la operación seleccionada
function manejarCalculo() {
  const inputValue = parseFloat(document.getElementById('input-value').value);
  const resultadoDiv = document.getElementById('resultado');

  if (isNaN(inputValue) || inputValue <= 0) {
    resultadoDiv.style.display = 'block';
    resultadoDiv.innerHTML = `<p id="error">El valor debe ser un número positivo.</p>`;
    return;
  }

  let resultadoHTML = '';

  if (currentOperation === 'volumen') {
    const { x1, x2, x3, volumenOptimo } = calcularVolumenMaximo(inputValue);
    resultadoHTML = `
            <h3>Resultados: Volumen Máximo</h3>
            <p><strong>Largo (x1):</strong> ${x1.toFixed(2)} m</p>
            <p><strong>Ancho (x2):</strong> ${x2.toFixed(2)} m</p>
            <p><strong>Alto (x3):</strong> ${x3.toFixed(2)} m</p>
            <p><strong>Volumen Máximo:</strong> ${volumenOptimo.toFixed(
              2
            )} m³</p>
        `;
  } else if (currentOperation === 'area') {
    const { x1, x2, x3, areaMinima } = calcularAreaMinima(inputValue);
    resultadoHTML = `
            <h3>Resultados: Área Mínima</h3>
            <p><strong>Largo (x1):</strong> ${x1.toFixed(2)} m</p>
            <p><strong>Ancho (x2):</strong> ${x2.toFixed(2)} m</p>
            <p><strong>Alto (x3):</strong> ${x3.toFixed(2)} m</p>
            <p><strong>Área Mínima:</strong> ${areaMinima.toFixed(2)} m²</p>
        `;
  }

  resultadoDiv.style.display = 'block';
  resultadoDiv.innerHTML = resultadoHTML;
}

// Asociar eventos a los botones
document
  .getElementById('volumen-maximo-btn')
  .addEventListener('click', () => mostrarFormulario('volumen'));
document
  .getElementById('area-minima-btn')
  .addEventListener('click', () => mostrarFormulario('area'));
document
  .getElementById('calcular-btn')
  .addEventListener('click', manejarCalculo);
