document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("comenzar");
    if (!btn) return;

    btn.addEventListener("click", iniciarJuego);
});

/* ----------------------------------------
   Función Principal
-----------------------------------------*/
function iniciarJuego(e) {
    e.preventDefault();

    const box = document.querySelector(".level-box");
    if (!box) return;

    const fondo = box.getAttribute("data-bg") || "/images/lvl2_pantalla2.jpg";

    resetBox(box, fondo);

    const heartsContainer = crearCorazones(box);
    const numeroCorrecto = generarNumero();
    const { rightContainer, operacionesMostradas, operacionCorrecta } =
        crearContenido(box, numeroCorrecto);

    activarEventosRespuesta(
        rightContainer,
        operacionesMostradas,
        operacionCorrecta,
        heartsContainer
    );
}

/* ----------------------------------------
   Reset y Estilos Básicos
-----------------------------------------*/
function resetBox(box, bg) {
    box.innerHTML = "";
    Object.assign(box.style, {
        backgroundImage: `url('${bg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "70%",
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 30px",
        position: "relative",
    });
}

/* ----------------------------------------
   Crear Corazones
-----------------------------------------*/
function crearCorazones(box) {
    const container = document.createElement("div");
    Object.assign(container.style, {
        display: "flex",
        gap: "15px",
        marginBottom: "20px",
        position: "absolute",
        top: "20px",
    });

    for (let i = 0; i < 3; i++) {
        const img = document.createElement("img");
        img.src = "../images/heart_lvl2.png";
        img.style.width = "40px";
        img.style.height = "40px";
        container.appendChild(img);
    }

    box.appendChild(container);
    return container;
}

/* ----------------------------------------
   Generar Número Correcto
-----------------------------------------*/
function generarNumero() {
    const resultados = [12, 18, 24, 36, 45, 56, 64, 72];
    return resultados[Math.floor(Math.random() * resultados.length)];
}

/* ----------------------------------------
   Crear Interfaz: número + 3 opciones
-----------------------------------------*/
function crearContenido(box, numeroCorrecto) {
    const resultados = [12, 18, 24, 36, 45, 56, 64, 72];
    const operaciones = [
        "3 * 4", "2 * 9", "6 * 4", "6 * 6",
        "5 * 9", "7 * 8", "8 * 8", "9 * 8",
    ];
    const operacionesFake = [
        "6 * 2", "6 * 1", "2 * 8", "3 * 9",
        "7 * 1", "2 * 4", "3 * 3", "10 * 7"
    ];

    const mainContent = document.createElement("div");
    Object.assign(mainContent.style, {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
        padding: "0 30px",
    });

    /* Número a la izquierda */
    const spanIzq = crearSpan(numeroCorrecto);
    mainContent.appendChild(spanIzq);

    /* Contenedor de opciones */
    const rightContainer = document.createElement("div");
    Object.assign(rightContainer.style, {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    });

    /* Solve correct operation */
    const operacionCorrecta = operaciones[resultados.indexOf(numeroCorrecto)];
    const operacionesMostradas = generarOperaciones(
        operacionCorrecta,
        operacionesFake
    );

    /* Crear spans */
    operacionesMostradas.forEach(op => {
        const span = crearSpan(op);
        rightContainer.appendChild(span);
    });

    mainContent.appendChild(rightContainer);
    box.appendChild(mainContent);

    return { rightContainer, operacionesMostradas, operacionCorrecta };
}

/* ----------------------------------------
   Crear un span estilizado
-----------------------------------------*/
function crearSpan(texto) {
    const span = document.createElement("span");
    span.className = "badge badge-pill badge-light";
    Object.assign(span.style, {
        padding: "30px",
        border: "2px solid #000",
        backgroundColor: "#fff",
        fontSize: "25px",
        fontWeight: "bold",
        color: "#000",
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
    });
    span.textContent = texto;
    
    // Aplicar animación de movimiento
    animarMovimiento(span);
    
    return span;
}

/* ----------------------------------------
   Animar movimiento arriba/abajo
-----------------------------------------*/
function animarMovimiento(span) {
    let posicion = 0;
    let direccion = 1; // 1 para abajo, -1 para arriba
    
    const intervalo = setInterval(() => {
        posicion += direccion;
        span.style.transform = `translateY(${posicion}px)`;
        
        // Cambiar dirección al llegar a ±3 pixels (bucle constante)
        if (posicion >= 10) {
            direccion = -2;
        } else if (posicion <= -10) {
            direccion = 2;
        }
    }, 50); // Ajusta la velocidad (ms)
    
    // Guardar el intervalo para poder detenerlo si es necesario
    span.dataset.animationInterval = intervalo;
}

/* ----------------------------------------
   Generar 3 Operaciones (una correcta)
-----------------------------------------*/
function generarOperaciones(correcta, fakeList) {
    const arr = [];
    const posCorrecta = Math.floor(Math.random() * 3);

    for (let i = 0; i < 3; i++) {
        arr[i] = i === posCorrecta
            ? correcta
            : fakeList[Math.floor(Math.random() * fakeList.length)];
    }

    return arr;
}

/* ----------------------------------------
   Eventos de lógica de respuesta
-----------------------------------------*/
function activarEventosRespuesta(container, ops, correcta, hearts) {
    const spans = container.querySelectorAll("span");

    spans.forEach((span, index) => {
        span.dataset.clicked = "false";

        span.addEventListener("click", () => {
            if (span.dataset.clicked === "true") return;

            span.dataset.clicked = "true";
            span.style.pointerEvents = "none";
            span.style.opacity = "0.6";

            if (ops[index] === correcta) {
                span.style.backgroundColor = "#00ff00";
                span.style.color = "#000";
            } else {
                span.style.backgroundColor = "#ff0000";
                span.style.color = "#fff";

                const heartImgs = hearts.querySelectorAll("img");
                if (heartImgs.length > 0) heartImgs[heartImgs.length - 1].remove();
            }
        });
    });
}
