document.getElementById('calculateBtn').addEventListener('click', () => {
  const lambda = parseFloat(document.getElementById('lambda').value);
  const mu = parseFloat(document.getElementById('mu').value);

  if (isNaN(lambda) || isNaN(mu) || lambda <= 0 || mu <= 0) {
    alert('Por favor, ingresa valores válidos para λ y μ.');
    return;
  }

  if (lambda >= mu) {
    alert('El sistema no es estable. λ debe ser menor que μ.');
    return;
  }

  const rho = lambda / mu; // Utilización del servidor
  const l = rho / (1 - rho); // Número promedio de clientes en el sistema
  const lq = Math.pow(lambda, 2) / (mu * (mu - lambda)); // Número promedio en la cola
  const w = 1 / (mu - lambda); // Tiempo promedio en el sistema
  const wq = rho / (mu - lambda); // Tiempo promedio en la cola
  const P0 = 1 - rho; // Probabilidad de que no haya clientes
  const Pw = 1 - rho; // Probabilidad de que un cliente tenga que esperar

  document.getElementById('rho').innerText = rho.toFixed(2);
  document.getElementById('l').innerText = l.toFixed(2);
  document.getElementById('lq').innerText = lq.toFixed(2);
  document.getElementById('w').innerText = w.toFixed(2);
  document.getElementById('wq').innerText = wq.toFixed(2);
  document.getElementById('P0').innerText = P0.toFixed(2);
  document.getElementById('Pw').innerText = Pw.toFixed(2);

  // Mostrar el bloque de resultados
  document.getElementById('results').classList.remove('hidden');
});
