const levelButtons = document.querySelectorAll('.lvlNum');
let nivelActivoId = 1;

// 1. Función para la redirección (definida fuera de changeLevelView)
function redirectToLevel() {
    // Usa la variable global nivelActivoId
    window.location.href = `/levels${nivelActivoId}`;
}

// 2. Event Listener para el botón COMENZAR (adjuntado una sola vez)
const playButton = document.querySelector('.playButton');
if (playButton) {
    playButton.addEventListener('click', redirectToLevel);
}

// 3. Event Listeners para los botones de Nivel
levelButtons.forEach(btn => {
    btn.addEventListener('click', changeLevelView);
});


function changeLevelView(event) {
    const level = event.target.getAttribute('data-level');
    const juego = juegos.find(j => j.id_game == level);

    let levelTitle = document.querySelector('.levelTitle')
    let levelDesc = document.querySelector('.levelDesc')
    let levelImage = document.querySelector('.levelImg')
    let hiscore = document.querySelector('.levelScore')

    levelTitle.textContent = `NIVEL ${juego.id_game} | ${juego.nombre_juego}`;
    levelDesc.textContent = juego.descripcion;
    levelImage.src = `images/level_${juego.id_game}.png`;

    let highestscore = 0

    if (userScores != null) {
        userScores.forEach(score => {
            if (score.id_game == juego.id_game && score.puntos > highestscore) {
                highestscore = score.puntos;
            }
        });
    }

    hiscore.textContent = `HIGHSCORE: ${highestscore}p`

    levelButtons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
    
    // 4. Actualiza la variable global nivelActivoId para que redirectToLevel la use
    nivelActivoId = parseInt(level);



    let playButton = document.querySelector(".playButton")
    playButton.addEventListener('click', () => {
        redirectToLevel(juego);
    });
}

function redirectToLevel(juego) {
    window.location.href = `http://localhost:8080/zero_game/public/levels/${juego.id_game}`;
}

/*SEGUN LAS PUNTUACIONES DEL USUARIO, VA MIRANDO LA ID JUEGO DE CADA UNA, SI ES MAS GRANDE QUE EL NUMERO GUARDADO, SE ACTUALIZA, HASTA LLEGAR A 4.*/
function lockLevels() {
    let highestUnlockedLevel = 1

    if (userScores != null) {
        userScores.forEach(score => {
            // Lógica para determinar el siguiente nivel a desbloquear
            if (score.id_game == highestUnlockedLevel && score.id_game != 4) {
                 highestUnlockedLevel++;
            }
        })
        levelButtons.forEach(btn => {
            if (parseInt(btn.getAttribute('data-level')) > highestUnlockedLevel) {
                btn.style.pointerEvents = "none";
                btn.style.color = "#431806";
            }
        })
    } else {
        // Si no hay scores, solo el nivel 1 está activo
        levelButtons.forEach(btn => {
            if (btn.getAttribute('data-level') != highestUnlockedLevel) {
                btn.style.pointerEvents = "none";
                btn.style.color = "#431806";
            }
        })
    }
}

lockLevels()