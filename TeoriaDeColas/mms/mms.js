document.getElementById('calculateBtn').addEventListener('click', () => {
  const lambda = parseFloat(document.getElementById('lambda').value);
  const mu = parseFloat(document.getElementById('mu').value);
  const c = parseInt(document.getElementById('servers').value);

  if (
    isNaN(lambda) ||
    isNaN(mu) ||
    isNaN(c) ||
    lambda <= 0 ||
    mu <= 0 ||
    c <= 0
  ) {
    alert('Por favor, ingresa valores válidos para λ, μ y c.');
    return;
  }

  const rho = lambda / (c * mu); // Utilización del sistema
  if (rho >= 1) {
    alert('El sistema no es estable. λ/(c*μ) debe ser menor que 1.');
    return;
  }

  // Cálculo de P0 (probabilidad de sistema vacío)
  let sum = 0;
  for (let n = 0; n < c; n++) {
    sum += Math.pow(lambda / mu, n) / factorial(n);
  }
  const term = Math.pow(lambda / mu, c) / (factorial(c) * (1 - rho));
  const p0 = 1 / (sum + term);

  // Número promedio en cola Lq
  const lq =
    (Math.pow(lambda / mu, c) * rho * p0) /
    (factorial(c) * Math.pow(1 - rho, 2));

  // Número promedio en el sistema L
  const l = lq + lambda / mu;

  // Tiempo promedio en la cola Wq
  const wq = lq / lambda;

  // Tiempo promedio en el sistema W
  const w = l / lambda;

  // Actualizar resultados en el DOM
  document.getElementById('rho').innerText = rho.toFixed(2);
  document.getElementById('p0').innerText = p0.toFixed(4);
  document.getElementById('l').innerText = l.toFixed(2);
  document.getElementById('lq').innerText = lq.toFixed(2);
  document.getElementById('w').innerText = w.toFixed(2);
  document.getElementById('wq').innerText = wq.toFixed(2);

  document.getElementById('results').classList.remove('hidden');
});

// Función para calcular factorial
function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}
