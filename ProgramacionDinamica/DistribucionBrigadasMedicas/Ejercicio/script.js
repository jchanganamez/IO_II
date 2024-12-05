function calcular() {
  const brigadas = parseInt(document.getElementById('brigadas').value);
  const paises = parseInt(document.getElementById('paises').value);

  // Matriz de eficiencia (ajustable según necesidad)
  const eficiencia = [
    [0, 45, 70, 90, 105, 120], // País 1
    [0, 20, 45, 75, 110, 150], // País 2
    [0, 50, 70, 80, 100, 130], // País 3
  ];

  // Crear tabla DP
  let dp = Array.from({ length: paises + 1 }, () =>
    Array(brigadas + 1).fill(0)
  );
  const proceso = []; // Almacenaremos los pasos del cálculo

  // Llenar la tabla DP y registrar cada cálculo
  for (let p = 1; p <= paises; p++) {
    for (let b = 0; b <= brigadas; b++) {
      dp[p][b] = dp[p - 1][b]; // Sin asignar brigadas al país actual
      for (let k = 0; k <= b; k++) {
        const nuevoValor = dp[p - 1][b - k] + eficiencia[p - 1][k];
        const actualizado = nuevoValor > dp[p][b];
        if (actualizado) dp[p][b] = nuevoValor;

        // Registrar el paso
        proceso.push({
          pais: p,
          brigadas: b,
          asignadas: k,
          valorActual: dp[p][b],
          nuevoValor: nuevoValor,
          actualizado,
        });
      }
    }
  }

  // Reconstruir la asignación óptima
  let asignacion = Array(paises).fill(0);
  let b = brigadas;
  for (let p = paises; p > 0; p--) {
    for (let k = 0; k <= b; k++) {
      if (dp[p][b] === dp[p - 1][b - k] + eficiencia[p - 1][k]) {
        asignacion[p - 1] = k;
        b -= k;
        break;
      }
    }
  }

  // Mostrar resultados
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = `<h2>Máxima eficiencia: ${dp[paises][brigadas]}</h2>`;

  // Mostrar proceso en una tabla
  resultadoDiv.innerHTML += `<h3>Proceso Detallado</h3>`;
  resultadoDiv.innerHTML += crearTablaProceso(proceso, paises);

  // Mostrar asignación final
  resultadoDiv.innerHTML += `<h3>Asignación Óptima</h3>`;
  asignacion.forEach((brigadas, i) => {
    resultadoDiv.innerHTML += `<p>País ${i + 1}: ${brigadas} brigadas</p>`;
  });
}

function crearTablaProceso(proceso, totalPaises) {
  const colores = ['#f8d7da', '#d4edda', '#d1ecf1']; // Colores para los países
  let tabla = `
      <table border="1" style="border-collapse: collapse; width: 100%; text-align: center;">
          <thead>
              <tr>
                  <th>País</th>
                  <th>Brigadas</th>
                  <th>Asignadas</th>
                  <th>Valor Actual</th>
                  <th>Nuevo Valor</th>
                  <th>¿Actualizado?</th>
              </tr>
          </thead>
          <tbody>
  `;
  proceso.forEach((paso) => {
    const colorFondo = colores[(paso.pais - 1) % colores.length];
    const colorActualizado = paso.actualizado
      ? 'font-weight: bold; background-color: #ffffcc;'
      : '';
    tabla += `
          <tr style="background-color: ${colorFondo}; ${colorActualizado}">
              <td>${paso.pais}</td>
              <td>${paso.brigadas}</td>
              <td>${paso.asignadas}</td>
              <td>${paso.valorActual}</td>
              <td>${paso.nuevoValor}</td>
              <td>${paso.actualizado ? 'Sí' : 'No'}</td>
          </tr>
      `;
  });
  tabla += `</tbody></table>`;
  return tabla;
}
