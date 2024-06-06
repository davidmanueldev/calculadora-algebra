function confirmarDatos() {
    const numDatos = document.getElementById('numDatos').value;
    const datosContainer = document.getElementById('datosContainer');
    datosContainer.innerHTML = '';  // Clear any previous inputs

    if (numDatos < 2) {
        alert("Introduce un número válido de datos (mayor que 1).");
        return;
    }

    for (let i = 0; i < numDatos; i++) {
        const xInput = document.createElement('input');
        xInput.type = 'number';
        xInput.placeholder = x[${i + 1}];

        const yInput = document.createElement('input');
        yInput.type = 'text';
        yInput.placeholder = f(x[${i + 1}]);

        datosContainer.appendChild(xInput);
        datosContainer.appendChild(yInput);
    }

    document.getElementById('btnCalcular').disabled = false;
}

function calcularInterpolacion() {
    const inputs = document.querySelectorAll('#datosContainer input');
    const numDatos = inputs.length / 2;
    const x = [];
    const y = [];

    for (let i = 0; i < numDatos; i++) {
        const xValue = parseFloat(inputs[i * 2].value);
        const yValue = inputs[i * 2 + 1].value.toLowerCase() === 'f' ? NaN : parseFloat(inputs[i * 2 + 1].value);

        if (isNaN(xValue)) {
            alert(Valor inválido en x[${i + 1}]);
            return;
        }

        if (isNaN(yValue) && inputs[i * 2 + 1].value.toLowerCase() !== 'f') {
            alert(Valor inválido en f(x[${i + 1}]));
            return;
        }

        x.push(xValue);
        y.push(yValue);
    }

    if (new Set(x).size !== x.length) {
        alert("Los valores de x deben ser distintos.");
        return;
    }

    for (let i = 0; i < numDatos; i++) {
        if (isNaN(y[i])) {
            let interpolatedValue = 0;
            let canInterpolate = false;

            if (i > 0 && i < numDatos - 1 && !isNaN(y[i - 1]) && !isNaN(y[i + 1])) {
                interpolatedValue = interpolate(x[i - 1], y[i - 1], x[i + 1], y[i + 1], x[i]);
                canInterpolate = true;
            } else if (i == 0 && numDatos > 2 && !isNaN(y[i + 1]) && !isNaN(y[i + 2])) {
                interpolatedValue = extrapolate(x[i + 1], y[i + 1], x[i + 2], y[i + 2], x[i]);
                canInterpolate = true;
            } else if (i == numDatos - 1 && numDatos > 2 && !isNaN(y[i - 1]) && !isNaN(y[i - 2])) {
                interpolatedValue = extrapolate(x[i - 1], y[i - 1], x[i - 2], y[i - 2], x[i]);
                canInterpolate = true;
            }

            if (canInterpolate) {
                y[i] = interpolatedValue;
                inputs[i * 2 + 1].value = interpolatedValue.toFixed(2);
            } else {
                alert(Interpolación no posible para x = ${x[i]} con los datos actuales.);
            }
        }
    }
}

function interpolate(x1, y1, x2, y2, x) {
    return y1 + (x - x1) * ((y2 - y1) / (x2 - x1));
}

function extrapolate(x1, y1, x2, y2, x) {
    return y1 + (x - x1) * ((y2 - y1) / (x2 - x1));
}