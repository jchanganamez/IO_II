document.getElementById("calculate").addEventListener("click", () => {
    const N = parseInt(document.getElementById("n").value);
    const lambda = parseFloat(document.getElementById("lambda").value);
    const mu = parseFloat(document.getElementById("mu").value);

    // Cálculo de P₀
    let sum = 0;
    for (let n = 0; n <= N; n++) {
        sum += factorial(N) / factorial(N - n) * Math.pow(lambda / mu, n);
    }
    const P0 = 1 / sum;

    // Cálculo de Lq
    const Lq = N - ((lambda + mu) / lambda) * (1 - P0);

    // Cálculo de L
    const L = Lq + (1 - P0);

    // Cálculo de Wq
    const Wq = Lq / ((N - L) * lambda);

    // Cálculo de W
    const W = Wq + (1 / mu);

    // Cálculo de Pw
    const Pw = 1 - P0;

    // Cálculo de Pₙ
    const Pn = (factorial(N) / factorial(N - N)) * Math.pow(lambda / mu, N) * P0;

    // Mostrar resultados
    document.getElementById("p0").textContent = P0.toFixed(4);
    document.getElementById("pn").textContent = Pn.toFixed(4);
    document.getElementById("lq").textContent = Lq.toFixed(4);
    document.getElementById("l").textContent = L.toFixed(4);
    document.getElementById("wq").textContent = Wq.toFixed(4);
    document.getElementById("w").textContent = W.toFixed(4);
    document.getElementById("pw").textContent = Pw.toFixed(4);
});

// Función para calcular factorial
function factorial(num) {
    if (num <= 1) return 1;
    return num * factorial(num - 1);
}
