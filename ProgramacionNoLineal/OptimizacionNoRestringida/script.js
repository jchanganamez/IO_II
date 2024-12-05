// script.js
const bisectionBtn = document.getElementById('bisectionBtn');
const newtonBtn = document.getElementById('newtonBtn');
const bisectionForm = document.getElementById('bisectionForm');
const newtonForm = document.getElementById('newtonForm');
const resultDiv = document.getElementById('result');

bisectionBtn.addEventListener('click', () => {
  bisectionForm.style.display = 'block';
  newtonForm.style.display = 'none';
  resultDiv.innerHTML = '';
});

newtonBtn.addEventListener('click', () => {
  newtonForm.style.display = 'block';
  bisectionForm.style.display = 'none';
  resultDiv.innerHTML = '';
});

function bisection(f, df, a, b, tolerance) {
  let x = (a + b) / 2;
  while (b - a > 2 * tolerance) {
    if (df(x) > 0) {
      a = x;
    } else {
      b = x;
    }
    x = (a + b) / 2;
  }
  return x;
}

function newton(f, df, x0, tolerance) {
  let x = x0;
  let iterations = 0;
  const maxIterations = 100;

  while (iterations < maxIterations) {
    const firstDerivative = df(x);
    const secondDerivative = math
      .derivative(math.derivative(f, 'x'), 'x')
      .evaluate({ x: x });

    if (Math.abs(secondDerivative) < 1e-10) {
      throw new Error(
        'La segunda derivada está muy cerca de cero. El método puede no converger.'
      );
    }

    const dx = firstDerivative / secondDerivative;
    const xNew = x - dx;

    if (Math.abs(xNew - x) < tolerance) {
      return xNew;
    }

    x = xNew;
    iterations++;
  }

  throw new Error('El método no convergió después del máximo de iteraciones');
}

bisectionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const func = document.getElementById('bisectionFunc').value;
  const a = parseFloat(document.getElementById('bisectionA').value);
  const b = parseFloat(document.getElementById('bisectionB').value);
  const tolerance = parseFloat(
    document.getElementById('bisectionTolerance').value
  );

  try {
    const f = (x) => math.evaluate(func, { x: x });
    const df = (x) => math.derivative(func, 'x').evaluate({ x: x });
    const x = bisection(f, df, a, b, tolerance);
    resultDiv.innerHTML = `Método de Bisección: x* ≈ ${x.toFixed(
      6
    )}, f(x*) ≈ ${f(x).toFixed(6)}`;
  } catch (error) {
    resultDiv.innerHTML = `Error: ${error.message}`;
  }
});

newtonForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const func = document.getElementById('newtonFunc').value;
  const x0 = parseFloat(document.getElementById('newtonX0').value);
  const tolerance = parseFloat(
    document.getElementById('newtonTolerance').value
  );

  try {
    const f = (x) => math.evaluate(func, { x: x });
    const df = (x) => math.derivative(func, 'x').evaluate({ x: x });
    const x = newton(func, df, x0, tolerance);
    resultDiv.innerHTML = `Método de Newton: x* ≈ ${x.toFixed(6)}, f(x*) ≈ ${f(
      x
    ).toFixed(6)}`;
  } catch (error) {
    resultDiv.innerHTML = `Error: ${error.message}`;
  }
});
