document.getElementById('calculateBtn').addEventListener('click', () => {
  const lambda = parseFloat(document.getElementById('lambda').value);
  const mu = parseFloat(document.getElementById('mu').value);
  const maxStates = parseInt(document.getElementById('states').value);

  if (
    isNaN(lambda) ||
    isNaN(mu) ||
    isNaN(maxStates) ||
    lambda <= 0 ||
    mu <= 0 ||
    maxStates <= 0
  ) {
    alert('Por favor, ingresa valores válidos para \u03bb, \u03bc y n.');
    return;
  }

  if (lambda >= mu) {
    alert('El sistema no es estable. \u03bb debe ser menor que \u03bc.');
    return;
  }

  const rho = lambda / mu; // Utilización del sistema
  const ratios = [];

  // Calcular la sumatoria para P0
  let denominator = 0;
  for (let i = 0; i <= maxStates; i++) {
    const ratio = Math.pow(rho, i);
    ratios.push(ratio);
    denominator += ratio;
  }

  const P0 = 1 / denominator; // Probabilidad de que el sistema esté vacío

  // Calcular probabilidades estacionarias
  const probabilities = ratios.map((ratio) => P0 * ratio);

  // Calcular longitud promedio de la cola
  let Lq = 0;
  for (let i = 1; i <= maxStates; i++) {
    Lq += i * probabilities[i];
  }

  // Calcular métricas derivadas
  const Wq = Lq / lambda; // Tiempo promedio en la cola
  const L = Lq + rho; // Número promedio en el sistema
  const W = L / lambda; // Tiempo promedio en el sistema

  // Actualizar resultados en el DOM
  document.getElementById('P0').innerText = P0.toFixed(4);
  const stateProbabilitiesContainer =
    document.getElementById('stateProbabilities');
  stateProbabilitiesContainer.innerHTML = '';

  probabilities.forEach((p, index) => {
    const pElement = document.createElement('p');
    pElement.innerText = `P(${index}) = ${p.toFixed(4)}`;
    stateProbabilitiesContainer.appendChild(pElement);
  });

  document.getElementById('lq').innerText = Lq.toFixed(4);
  document.getElementById('wq').innerText = Wq.toFixed(4);
  document.getElementById('l').innerText = L.toFixed(4);
  document.getElementById('w').innerText = W.toFixed(4);
  document.getElementById('rho').innerText = (1 - P0).toFixed(4);

  document.getElementById('results').classList.remove('hidden');
});
