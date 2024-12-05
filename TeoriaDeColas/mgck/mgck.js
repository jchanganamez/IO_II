document.getElementById('calculateBtn').addEventListener('click', () => {
  const lambda = parseFloat(document.getElementById('lambda').value);
  const mu = parseFloat(document.getElementById('mu').value);
  const c = parseInt(document.getElementById('c').value);
  const k = parseInt(document.getElementById('k').value);

  if (
    isNaN(lambda) ||
    isNaN(mu) ||
    isNaN(c) ||
    isNaN(k) ||
    lambda <= 0 ||
    mu <= 0 ||
    c <= 0 ||
    k < c
  ) {
    alert('Por favor, ingresa valores válidos para λ, μ, c y K.');
    return;
  }

  // Parámetros básicos
  const rho = lambda / (c * mu); // Utilización
  if (rho >= 1) {
    alert('El sistema no es estable. Asegúrate de que λ / (c * μ) < 1.');
    return;
  }

  // Cálculo de probabilidades de estado
  let p0 = 0; // Probabilidad de que el sistema esté vacío
  for (let n = 0; n <= c; n++) {
    p0 += Math.pow(lambda / mu, n) / factorial(n);
  }
  p0 = 1 / p0;

  const probabilities = [];
  for (let n = 0; n <= k; n++) {
    if (n < c) {
      probabilities[n] = (Math.pow(lambda / mu, n) / factorial(n)) * p0;
    } else if (n === c) {
      probabilities[n] = (Math.pow(lambda / mu, c) / factorial(c)) * p0;
    } else {
      // Para n > c y n <= K, la probabilidad es la misma que la de n = c (ocupación máxima)
      probabilities[n] = probabilities[c];
    }
  }

  // Número promedio de clientes en el sistema (L)
  const l = probabilities.reduce((sum, p, index) => sum + index * p, 0);
  const w = l / lambda; // Tiempo promedio en el sistema

  // Mostrar resultados
  document.getElementById('rho').innerText = rho.toFixed(2);
  document.getElementById('l').innerText = l.toFixed(2);

  const occupancyList = document.getElementById('occupancyProbabilities');
  occupancyList.innerHTML = ''; // Limpiar lista anterior
  for (let i = 0; i <= k; i++) {
    const listItem = document.createElement('li');
    listItem.innerText = `Probabilidad de que ${i} servidor(es) estén ocupados: ${probabilities[
      i
    ].toFixed(4)}`;
    occupancyList.appendChild(listItem);
  }

  // Mostrar resultados
  document.getElementById('results').classList.remove('hidden');
});

// Factorial helper
function factorial(n) {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
