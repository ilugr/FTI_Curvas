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

            if (dibujo === 'curva_dragon') {
                ctx.fillStyle = '#2c2f33';
                let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                gradient.addColorStop(0, '#ff4500');
                gradient.addColorStop(1, '#ff6347');
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.shadowColor = 'rgba(255, 69, 0, 0.5)';
                ctx.shadowBlur = 0;
                ctx.translate(canvas.width / 2, canvas.height / 2);
            } else if (dibujo === 'curva_hilbert') {
                ctx.fillStyle = '#e6e6fa';
                let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                gradient.addColorStop(0, '#4b0082');
                gradient.addColorStop(1, '#9370db');
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1.5;
                ctx.shadowColor = 'rgba(0, 0, 139, 0.5)';
                ctx.shadowBlur = 3;
                ctx.translate(0, 0); 
            }
            ctx.fillRect(0, 0, canvas.width, canvas.height);

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
    
    if (dibujo === 'curva_dragon') {
        ctxFinal.fillStyle = '#2c2f33';
        let gradient = ctxFinal.createLinearGradient(0, 0, canvasFinal.width, canvasFinal.height);
        gradient.addColorStop(0, '#ff4500');
        gradient.addColorStop(1, '#ff6347');
        ctxFinal.strokeStyle = gradient;
        ctxFinal.lineWidth = 2;
        ctxFinal.shadowColor = 'rgba(255, 69, 0, 0.5)';
        ctxFinal.shadowBlur = 0;
        ctxFinal.translate(canvasFinal.width / 2, canvasFinal.height / 2);
    } else if (dibujo === 'curva_hilbert') {
        ctxFinal.fillStyle = '#e6e6fa';
        let gradient = ctxFinal.createLinearGradient(0, 0, canvasFinal.width, canvasFinal.height);
        gradient.addColorStop(0, '#4b0082');
        gradient.addColorStop(1, '#9370db');
        ctxFinal.strokeStyle = gradient;
        ctxFinal.lineWidth = 1.5;
        ctxFinal.shadowColor = 'rgba(0, 0, 139, 0.5)';
        ctxFinal.shadowBlur = 3;
        ctxFinal.translate(0, 0);
    }
    ctxFinal.fillRect(0, 0, canvasFinal.width, canvasFinal.height);

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
    window.location.href = "/pagina_de_dibujo";  // Cambia la URL según tu ruta en Flask
}