document.getElementById('calculateBtn').addEventListener('click', () => {
  const parseFraction = (input) => {
    const parts = input.split('/');
    return parts.length === 2
      ? parseFloat(parts[0]) / parseFloat(parts[1])
      : parseFloat(input);
  };

  const lambdaInput = document.getElementById('lambda').value;
  const muInput = document.getElementById('mu').value;
  const sigma = parseFloat(document.getElementById('sigma').value);

  const lambda = parseFraction(lambdaInput);
  const mu = parseFraction(muInput);

  if (
    isNaN(lambda) ||
    isNaN(mu) ||
    isNaN(sigma) ||
    lambda <= 0 ||
    mu <= 0 ||
    sigma < 0
  ) {
    alert('Por favor, ingresa valores válidos para λ, μ y σ.');
    return;
  }

  if (lambda >= mu) {
    alert('El sistema no es estable. λ debe ser menor que μ.');
    return;
  }

  // Cálculos
  const rho = lambda / mu; // Porcentaje de tiempo ocupado
  const lq =
    (Math.pow(lambda, 2) * Math.pow(sigma, 2) + Math.pow(lambda / mu, 2)) /
    (2 * (1 - rho)); // Lq
  const wq = lq / lambda; // Wq
  const l = lq + rho; // L
  const w = l / lambda; // W

  // Actualizar resultados en el DOM
  document.getElementById('lambdaResult').innerText = lambda.toFixed(4);
  document.getElementById('muResult').innerText = mu.toFixed(4);
  document.getElementById('lq').innerText = lq.toFixed(4);
  document.getElementById('wq').innerText = wq.toFixed(4);
  document.getElementById('w').innerText = w.toFixed(4);
  document.getElementById('rho').innerText = (rho * 100).toFixed(2) + '%';

  document.getElementById('results').classList.remove('hidden');
});
