

// --- 1. Variables Globales y Datos ---
let currentQuestionIndex = 0;
let score = 0;
let lives = 3;
let errors = 0;
const gameRoot = document.getElementById('dynamic-container');

// Datos de las preguntas (Añade 6 preguntas más para llegar a 10)
const puzzleQuestions = [
    {
        equation: '3x + 5 = 11',
        options: [2, 3, 4, 5],
        correctAnswer: 2
    },

    {
        equation: '2x + 9 =21',
        options: [5, 9, 7, 6],
        correctAnswer: 6
    },
    {
        equation: '2x - 1 = 9',
        options: [4, 5, 6, 7],
        correctAnswer: 5
    },
    {
        equation: 'x / 2 + 3 = 7',
        options: [6, 8, 10, 12],
        correctAnswer: 8
    },
    {
        equation: '4x = 24',
        options: [4, 5, 6, 7],
        correctAnswer: 6
    }
];

const totalQuestions = puzzleQuestions.length;

// --- 2. Inicialización del Juego ---
document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('boton_comenzar');
    const introContent = document.getElementById('main-content-area');
    const dynamicContainer = document.getElementById('dynamic-container');

    if (startButton) {
        startButton.addEventListener('click', function () {
            if (introContent) {
                introContent.classList.add('d-none');
            }
            // Reiniciar el estado del juego (por si se juega de nuevo)
            currentQuestionIndex = 0;
            score = 0;
            lives = 3;
            errors = 0;

            createPuzzleScreen(dynamicContainer);
        });
    }
});

// --- 3. Función para Actualizar el HUD (Score y Vidas) ---
function updateHud() {
    const hudScore = document.getElementById('hud-score');
    const hudLives = document.getElementById('hud-lives');
    const hudErrors = document.getElementById('hud-errors');

    if (hudScore) {
        hudScore.innerHTML = `⭐ Puntos: ${score}`;
    }
    if (hudLives) {
        hudLives.innerHTML = `❤️ Vidas: ${lives}`;
    }
    if (hudErrors) {
        hudErrors.innerHTML = `❌ Errores: ${errors}`;
    }
}

// --- 4. Renderizado de la Pantalla del Puzzle ---
function createPuzzleScreen() {
    const currentQuestionData = puzzleQuestions[currentQuestionIndex];

    gameRoot.innerHTML = '';

    
    const puzzleScreen = document.createElement('div');
    puzzleScreen.classList.add('background-level-container', 'd-flex', 'justify-content-center', 'align-items-center', 'py-5');
    puzzleScreen.id = 'puzzle-screen';

    const puzzleBox = document.createElement('div');
    puzzleBox.classList.add('juego_box', 'puzzle-cave-container', 'container', 'text-center');

    const innerPuzzleBox = document.createElement('div');
    innerPuzzleBox.classList.add('inner-puzzle-box', 'puzzle-grid-layout');


  
    const hudContainer = document.createElement('div');
    hudContainer.id = 'game-hud';
    hudContainer.classList.add('hud-container', 'grid-area-hud');
    
    hudContainer.innerHTML = `
        <div id="hud-score" class="hud-item">⭐ Puntos: ${score}</div>
        <div id="hud-lives" class="hud-item">❤️ Vidas: ${lives}</div>
        <div id="hud-errors" class="hud-item">❌ Errores: ${errors}</div>
    `;

    // 2. Contenedor para el Título y la Ecuación (HEADER)
    const headerContent = document.createElement('div');
    headerContent.classList.add('header-content', 'grid-area-header');
    const title = document.createElement('h2');
    title.textContent = 'Encuentra el valor de x';
    title.classList.add('puzzle-title', 'fs-30');

    const equation = document.createElement('p');
    equation.textContent = currentQuestionData.equation;
    equation.classList.add('puzzle-equation', 'fs-40');

    headerContent.appendChild(title);
    headerContent.appendChild(equation);


    // 3. Contenedor de Opciones (WRAPPER)
    const optionsWrapper = document.createElement('div');
    optionsWrapper.id = 'options-container-wrapper';
    optionsWrapper.classList.add('grid-area-options');

    const optionsData = currentQuestionData.options;

    optionsData.forEach(value => {
        const optionDiv = document.createElement('button');
        optionDiv.classList.add('option', 'btn-option-puzzle', `pos-op-${value}`);
        optionDiv.setAttribute('data-value', value);
        optionDiv.textContent = value.toString();
        optionDiv.addEventListener('click', () => handleOptionClick(value));
        optionsWrapper.appendChild(optionDiv);
    });


    // 4. Personaje 
    const characterImage = document.createElement('img');
    characterImage.id = 'puzzle-character';
    characterImage.src = ZERO_IMAGE_SRC;
    characterImage.alt = "Zero pensando";
    characterImage.width = 150;
    characterImage.height = 200;

    characterImage.classList.add(
        'grid-area-character',
        'img-fluid',
        'd-block',
        'mx-auto',
        'zero-puzzle-image'
    );

    // 5. Ensamblar la vista:
    innerPuzzleBox.appendChild(hudContainer); // Añadir el HUD
    innerPuzzleBox.appendChild(headerContent);
    innerPuzzleBox.appendChild(optionsWrapper);
    innerPuzzleBox.appendChild(characterImage);

    puzzleBox.appendChild(innerPuzzleBox);

    puzzleScreen.appendChild(puzzleBox);
    gameRoot.appendChild(puzzleScreen);
}

// --- 5. Lógica del Click (Con Vidas) ---
function handleOptionClick(selectedValue) {
    // Desactivar botones temporalmente para evitar doble clic
    document.querySelectorAll('.btn-option-puzzle').forEach(btn => btn.disabled = true);

    const currentQuestionData = puzzleQuestions[currentQuestionIndex];
    const correctAnswer = currentQuestionData.correctAnswer;

    // 1. Verificar la respuesta
    if (selectedValue === correctAnswer) {
        score++;
        alert('✅ ¡Respuesta Correcta! Puntos: ' + score);

    } else {
        lives--;
        errors++;
        alert(`❌ ¡Incorrecto! La respuesta correcta era ${correctAnswer}. Vidas restantes: ${lives}.`);

    }

    // 2. Actualizar el HUD inmediatamente
    updateHud();

    // 3. Verificar si el juego terminó (Por Derrota o Victoria)
    if (lives <= 0) {

        showDefeatScreen(gameRoot);
        return;
    }

    // Avanzar a la siguiente pregunta
    currentQuestionIndex++;

    if (currentQuestionIndex < totalQuestions) {
        // Cargar la siguiente pregunta después de un breve retraso
        setTimeout(() => {
            createPuzzleScreen();
        }, 1000);
    } else {

        showGameEndScreen();
    }
}

// --- 6. Funciones de Pantalla Final --- Modificar el front y el back
function showGameEndScreen() {
    
    const finalScore = score;
    const finalErrors = errors;
    const totalTimeSeconds = 90; // SIMULADO: Reemplazar con el cálculo real del juego (endTime - startTime)

  
    const minutes = Math.floor(totalTimeSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalTimeSeconds % 60).toString().padStart(2, '0');
    const formattedTime = `${minutes}:${seconds}s`;


    gameRoot.innerHTML = ''; 
    
    
    const victoryScreen = document.createElement('div');
    victoryScreen.classList.add('background-level-container', 'd-flex', 'justify-content-center', 'align-items-center', 'victory-screen');


    
    const contentWrapper = document.createElement('div');
    // Usaremos una clase flexible para el diseño de dos columnas
    contentWrapper.classList.add('d-flex', 'victory-content-wrapper'); 

    // --- Columna Izquierda: Imagen del Cristal ---
    const imageColumn = document.createElement('div');
    imageColumn.classList.add('victory-image-column');
    
    const crystalImage = document.createElement('img');
    crystalImage.src = VICTORY_IMAGE_SRC;
    crystalImage.alt = "Zero encuentra el cristal";
    crystalImage.classList.add('img-fluid', 'crystal-image');
    crystalImage.width = 500;
    crystalImage.height = 400;
    
    imageColumn.appendChild(crystalImage);


    // --- Columna Derecha: Estadísticas ---
    const statsColumn = document.createElement('div');
    statsColumn.classList.add('victory-stats-column', 'text-center');
    
    statsColumn.innerHTML = `
        <h2 class="puzzle-title fs-30 text-success">¡FELICIDADES! ¡EL CRISTAL ES TUYO!</h2>
        
        <div class="stats-box">
            <h3 class="puzzle-title fs-25 my-4">ESTADÍSTICAS</h3>
            <p class="fs-20">TIEMPO: <span class="stat-value">${formattedTime}</span></p>
            <p class="fs-20">PUNTOS: <span class="stat-value">${finalScore * 100}p</span></p>
            <p class="fs-20">ERRORES: <span class="stat-value">${finalErrors}</span></p>
        </div>
        
        <button id="btn-regresar" class="btn btn-danger btn-lg mt-5">REGRESAR</button>
    `;

    // 3. Ensamblar y añadir eventos
    
    // Evento para el botón REGRESAR
    const regresarButton = statsColumn.querySelector('#btn-regresar');
    regresarButton.addEventListener('click', () => {
      
        window.location.reload(); 
    });

    contentWrapper.appendChild(imageColumn);
    contentWrapper.appendChild(statsColumn);
    victoryScreen.appendChild(contentWrapper);
    gameRoot.appendChild(victoryScreen);
    
     
}


function showDefeatScreen(container) {
    // Función de Derrota (usa tu código original)
    container.innerHTML = '';
    const gameOverScreen = document.createElement('div');
    gameOverScreen.className = 'background-level-container d-flex align-items-center justify-content-center';

    const defeatContainer = document.createElement('div');
    defeatContainer.className = 'defeat-container justify-content-center text-center p-4 rounded shadow-lg';

    const title = document.createElement('h2');
    title.className = 'text-white mb-4';
    title.textContent = 'ZERO FUE DERROTADO...';

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'image-wrapper mb-4';

    const image = document.createElement('img');
    image.src = DEFEAT_IMAGE_SRC; // Usa la imagen de derrota
    image.alt = 'Zero Derrotado';
    image.className = 'img-fluid';

    imageWrapper.appendChild(image);

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'd-flex justify-content-center gap-3 mt-4';

    const btnContinue = document.createElement('button');
    btnContinue.className = 'btn btn-warning btn-lg';
    btnContinue.textContent = 'REINTENTAR';

    btnContinue.addEventListener('click', () => {
        // Vuelve a cargar la página para reiniciar el juego
        window.location.reload();
    });

    const btnAbandon = document.createElement('button');
    btnAbandon.className = 'btn btn-danger btn-lg';
    btnAbandon.textContent = 'ABANDONAR';

    btnAbandon.addEventListener('click', () => {
        history.back();
    });

    buttonsDiv.appendChild(btnContinue);
    buttonsDiv.appendChild(btnAbandon);

    defeatContainer.appendChild(title);
    defeatContainer.appendChild(imageWrapper);
    defeatContainer.appendChild(buttonsDiv);

    gameOverScreen.appendChild(defeatContainer);
    container.appendChild(gameOverScreen);
}