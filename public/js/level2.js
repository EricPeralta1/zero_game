document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("comenzar");
    if (!btn) return;

    btn.addEventListener("click", iniciarJuego);
});

// Puntuación global
let puntos = 0;

/* ----------------------------------------
   Función Principal
-----------------------------------------*/
function iniciarJuego(e) {
    e.preventDefault();


    const box = document.querySelector(".level-box");
    if (!box) return;

    const fondo = "../images/lvl2_pantalla2.jpg";

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
        "1 * 1", "6 * 1", "2 * 8", "3 * 9",
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
        border: "5px solid #000",
        backgroundColor: "#fff",
        fontSize: "25px",
        fontWeight: "bold",
        color: "#000",
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
        borderRadius: "35%",
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
   Respuesta correcta: cambio dinámico de fondo
-----------------------------------------*/
function RespuestaCorrecta(box, hearts) {
    if (!box) return;
    let remaining = 1; // tiempo reducido para rapidez

    const countdownInterval = setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) {
            clearInterval(countdownInterval);

            /* ----------------------------
               CAMBIAR FONDO +1
            -----------------------------*/
            let bg = box.style.backgroundImage; 
            bg = bg.replace('url("', '').replace('")', '').replace("url('", "").replace("')", "");

            // Obtener nombre base y número
            const match = bg.match(/(.*?)(\d+)(\.jpg|\.png|\.jpeg)$/);

            if (match) {
                const base = match[1];  // ej: "../images/lvl2_pantalla"
                const num = parseInt(match[2]); // ej: 2
                const ext = match[3];  // ej: ".jpg"

                const newNumber = num + 1;

                if (newNumber > 6 ) {
                    win()
                    return;
                }

                const newBg = `${base}${newNumber}${ext}`;

                box.style.backgroundImage = `url('${newBg}')`;
            }

            // Limpiar contenido sin borrar corazones
            const divs = Array.from(box.querySelectorAll('div'));
            divs.forEach(d => {
                if (!d.querySelector('img')) {
                    d.remove();
                }
            });

            // Generar nuevo número y nuevas opciones
            const nuevoNumero = generarNumero();
            const created = crearContenido(box, nuevoNumero);

            // Activar eventos nuevamente
            activarEventosRespuesta(
                created.rightContainer,
                created.operacionesMostradas,
                created.operacionCorrecta,
                hearts
            );
        }
    }, 1000);
}

function win() {
    const box = document.querySelector(".level-box");

    if (!box) return;

    // Limpiar la div existente
    box.innerHTML = 
    `
         <div class="level-box container p-4">

            <div class="level-title-section d-flex align-items-center mb-4">
                <img src="../images/gemas/gema_2.png" alt="cristal piramide" class="title-icon me-3">
                <h2 class="m-0 text-white" style="font-family: VT323; font-size: 28px;">
                    ¡FELICIDADES! ¡EL CRISTAL ES TUYO!
                </h2>
            </div>

            <div class="row contenido_introduccion">
                <div class="col-12 col-lg-7 text-content text-white">

                    <h3 class="mt-4 mb-2 text-white" style="font-family: 'VT323'; font-size: 30px;">ESTADISTICAS</h3>
                    
                    <h2 class="mt-4 mb-2 text-white" style="font-family: 'VT323'; font-size: 25px;">Has conseguido ${puntos} puntos</h2>
                </div>
                <div class="col-12 col-lg-5 d-flex flex-column align-items-end image-action-container mt-4 mt-lg-0">

                    <div class="level-image-container w-100 mb-4">
                        <img src="../images/lvl2_win.png" alt="win_lvl2" class="img-fluid d-block">
                    </div>
                    <div class="action-buttons d-flex gap-3 w-100 justify-content-end">
                        <button class="btn-orange inicio">VOLVER AL INICIO</button>
                    </div>
                </div>

            </div>

        </div>
    `;

    // Añadir evento al botón de inicio (win)
    const btnInicio = box.querySelector('.inicio');
    if (btnInicio) {
        btnInicio.addEventListener('click', () => {
            saveScore(); // Guardar puntuación al terminar nivel
            window.location.href = '../levels';
        });
    }
};

function defeat() {
    const box = document.querySelector(".level-box");

    if (!box) return;

    // Limpiar la div existente
    box.innerHTML = "";
    box.innerHTML = 
    `
         <div class="level-box container p-4">

            <div class="level-title-section d-flex align-items-center mb-4">
                <img src="../images/gemas/gema_2.png" alt="cristal piramide" class="title-icon me-3">
                <h2 class="m-0 text-white" style="font-family: VT323; font-size: 28px;">
                    ZERO FUE DERROTADO... INTENTA DE NUEVO!
                </h2>
            </div>

            <div class="row contenido_introduccion" style="justify-content: center;">
                <div class="col-12 col-lg-5 image-action-container mt-4 mt-lg-0">

                    <div class="level-image-container w-100 mb-4">
                        <img src="../images/zero_defeat.png" alt="defeat_lvl2" class="img-fluid d-block">
                    </div>
                    <div class="action-buttons d-flex gap-3 w-100 justify-content-end">
                        <button class="btn-orange inicio">VOLVER AL INICIO</button>
                        <button class="btn-red reintentar">REINTENTAR</button>
                    </div>
                </div>

            </div>

        </div>
    `;

    // Añadir evento al botón de inicio (defeat)
    const btnInicio = box.querySelector('.inicio');
    if (btnInicio) {
        btnInicio.addEventListener('click', () => {
            saveScore(); // Guardar puntuación al terminar nivel
            window.location.href = '../levels';
        });
    }

    // Añadir evento al botón reintentar (defeat)
    const btnReintentar = box.querySelector('.reintentar');
    if (btnReintentar) {
        btnReintentar.addEventListener('click', () => {
            puntos = 0; // Resetear puntos al reintentar
            window.location.reload();
        });
    }
};

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

                // Sumar puntos por respuesta correcta
                puntos += 100;
                console.log(puntos);
                
                // Bloquear las otras opciones para que no se puedan clicar
                const allSpans = container.querySelectorAll('span');
                allSpans.forEach(s => {
                    if (s !== span) {
                        s.dataset.clicked = "true";
                        s.style.pointerEvents = "none";
                        s.style.opacity = "0.6";
                        
                        // intentar parar la animación si existe
                        if (s.dataset.animationInterval) {
                            try {
                                clearInterval(Number(s.dataset.animationInterval));
                            } catch (e) {
                                // ignore
                            }
                        }
                    }
                });

                

                RespuestaCorrecta(document.querySelector('.level-box'), hearts);

            } else {
                span.style.backgroundColor = "#ff0000";
                span.style.color = "#fff";

                const heartImgs = hearts.querySelectorAll("img");
                if (heartImgs.length > 0) {
                    heartImgs[heartImgs.length - 1].remove();
                    // Restar puntos por respuesta incorrecta
                    puntos -= 50;
                    console.log('Puntos:', puntos);

                    const remaining = hearts.querySelectorAll('img').length;
                    if (remaining === 0) {
                        setTimeout(() => {
                            defeat();
                        }, 1000);
                    }
                }
            }
        });
    });
}


function saveScore() {
    const dateToday = new Date().toISOString().split('T')[0];
    
    const scoreGame2 = { 
        puntuacion: puntos,
        id_user: id_usuario,
        id_game: id_juego,
        fecha: dateToday
    };
    
    const score2Str = JSON.stringify(scoreGame2);
    document.cookie = `score2=${score2Str}; path=/; max-age=3600`;

    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    fetch(`http://localhost:8080/zero_game/public/saveScore`, {
        method: 'PUT',
        headers: {
            'X-CSRF-TOKEN': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(scoreGame2)
    })
}
