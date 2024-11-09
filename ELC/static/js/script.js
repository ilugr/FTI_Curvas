let index = 0;
let animating = false;
let longitud = 4;
let angulo = 90;
let dibujo = document.getElementById('config').getAttribute('data-dibujo');
let cadena = [];  // Variable global para almacenar la cadena

// Verifica si el valor recibido es válido
if (!['curva_dragon', 'curva_hilbert'].includes(dibujo)) {
    console.error("El tipo de dibujo no es válido.");
    dibujo = 'curva_dragon';  // Valor por defecto si es inválido
}

function iniciarDibujo() {
    const iteraciones = parseInt(document.getElementById('iteraciones').value);
    longitud = parseInt(document.getElementById('longitud').value);
    angulo = parseInt(document.getElementById('angulo').value);

    document.getElementById('btnDibujar').disabled = true;
    document.getElementById('btnFinalizar').disabled = false;

    fetch('/generar_cadena', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ iteraciones: iteraciones, dibujo: dibujo })
    })
        .then(response => response.json())
        .then(data => {
            cadena = data.cadena;  // Asigna la cadena obtenida a la variable global
            index = 0;
            animating = true;

            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'gray';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.translate(canvas.width / 2, canvas.height / 2);

            requestAnimationFrame(function animate() {
                if (index < cadena.length && animating) {
                    dibujarCadena(ctx, cadena[index], longitud, angulo);
                    index++;
                    setTimeout(() => requestAnimationFrame(animate), 1);
                }
            });
        });
}

function finalizarDibujo() {
    const canvasFinal = document.getElementById('canvasFinal');
    const ctxFinal = canvasFinal.getContext('2d');
    ctxFinal.clearRect(0, 0, canvasFinal.width, canvasFinal.height);
    ctxFinal.fillStyle = 'gray';
    ctxFinal.fillRect(0, 0, canvasFinal.width, canvasFinal.height);
    ctxFinal.strokeStyle = 'white';
    ctxFinal.lineWidth = 2;
    ctxFinal.translate(canvasFinal.width / 2, canvasFinal.height / 2);

    // Usa la variable global cadena para dibujar en el canvas final
    for (let i = 0; i < cadena.length; i++) {
        dibujarCadena(ctxFinal, cadena[i], longitud, angulo);
    }

    canvasFinal.style.display = 'block';
    document.getElementById('btnFinalizar').disabled = true;
    document.getElementById('btnRecargar').style.display = 'block';
}

function recargarPagina() {
    location.reload();
}

function dibujarCadena(ctx, simbolo, longitud, angulo) {
    if (simbolo === "F") {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(longitud, 0);
        ctx.stroke();
        ctx.translate(longitud, 0);
    } else if (simbolo === "+") {
        ctx.rotate(radians(angulo));
    } else if (simbolo === "-") {
        ctx.rotate(radians(-angulo));
    }
}

function radians(degrees) {
    return degrees * (Math.PI / 180);
}

function regresarADibujo() {
    // Aquí puedes poner la URL de la página de dibujo
    window.location.href = "/pagina_de_dibujo";  // Cambia la URL según tu ruta en Flask
}