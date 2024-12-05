function generarFormulario() {
  const paises = parseInt(document.getElementById('numPaises').value);
  const brigadas = parseInt(document.getElementById('numBrigadas').value);
  const formularioDiv = document.getElementById('formularioEficiencia');
  formularioDiv.innerHTML = '';

  // Crear el formulario dinámico para ingresar las eficiencias
  formularioDiv.innerHTML = `<h3>Ingrese los valores de eficiencia por Fila y Columna:</h3>`;
  for (let i = 1; i <= paises; i++) {
    formularioDiv.innerHTML += `<h4>Fila ${i}</h4>`;
    for (let j = 0; j <= brigadas; j++) {
      formularioDiv.innerHTML += `
              <label for="eficiencia_${i}_${j}">C${j}:</label>
              <input type="number" id="eficiencia_${i}_${j}" min="0" value="0"><br>
              `;
    }
    formularioDiv.innerHTML += '<br><br>';
  }
  formularioDiv.innerHTML += `
      <button onclick="calcular(${paises}, ${brigadas})">Resolver</button>
  `;
}

function calcular(paises, brigadas) {
  // Leer los datos ingresados por el usuario
  const eficiencia = [];
  for (let i = 1; i <= paises; i++) {
    const fila = [];
    for (let j = 0; j <= brigadas; j++) {
      fila.push(
        parseInt(document.getElementById(`eficiencia_${i}_${j}`).value)
      );
    }
    eficiencia.push(fila);
  }

  // Crear tabla DP
  let dp = Array.from({ length: paises + 1 }, () =>
    Array(brigadas + 1).fill(0)
  );
  const proceso = []; // Almacenar los pasos del cálculo

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
  resultadoDiv.innerHTML += `<h3>Proceso Detallado</h3>`;
  resultadoDiv.innerHTML += crearTablaProceso(proceso, paises);
  resultadoDiv.innerHTML += `<h3>Asignación Óptima</h3>`;
  asignacion.forEach((brigadas, i) => {
    resultadoDiv.innerHTML += `<p>Fila ${i + 1}: ${brigadas} Columna</p>`;
  });
}

function crearTablaProceso(proceso, totalPaises) {
  const colores = ['#f8d7da', '#d4edda', '#d1ecf1']; // Colores para los Filaes
  let tabla = `
      <table border="1" style="border-collapse: collapse; width: 100%; text-align: center;">
          <thead>
              <tr>
                  <th>Fila</th>
                  <th>Columna</th>
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
