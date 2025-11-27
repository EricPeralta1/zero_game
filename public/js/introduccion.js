// ==========================================================
// ARCHIVO: introduccion.js
// ==========================================================

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
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('boton_comenzar');
    const introContent = document.getElementById('main-content-area');
    const dynamicContainer = document.getElementById('dynamic-container');

    if (startButton) {
        startButton.addEventListener('click', function() {
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
    
    // Contenedores principales (como en tu código original)
    const puzzleScreen = document.createElement('div');
    puzzleScreen.classList.add('background-level-container', 'd-flex', 'justify-content-center', 'align-items-center', 'py-5');
    puzzleScreen.id = 'puzzle-screen';
    
    const puzzleBox = document.createElement('div');
    puzzleBox.classList.add('juego_box', 'puzzle-cave-container', 'container', 'text-center'); 
    
    const innerPuzzleBox = document.createElement('div');
    innerPuzzleBox.classList.add('inner-puzzle-box', 'puzzle-grid-layout'); 
    
    
    // --- Creación del HUD (CRÍTICO) ---
    const hudContainer = document.createElement('div');
    hudContainer.id = 'game-hud';
    hudContainer.classList.add('hud-container', 'grid-area-hud'); 
    // Los valores iniciales se toman de las variables globales
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


    // 4. Personaje (CHARACTER)
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
        // Aquí podrías añadir una animación de éxito
    } else {
        lives--;
        errors++;
        alert(`❌ ¡Incorrecto! La respuesta correcta era ${correctAnswer}. Vidas restantes: ${lives}.`);
        // Aquí podrías añadir una animación de error
    }

    // 2. Actualizar el HUD inmediatamente
    updateHud();

    // 3. Verificar si el juego terminó (Por Derrota o Victoria)
    if (lives <= 0) {
        // DERROTA: Invocar showDefeatScreen
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
        // VICTORIA: Terminan las 10 preguntas
        showGameEndScreen(); 
    }
}

// --- 6. Funciones de Pantalla Final ---
function showGameEndScreen() {
    gameRoot.innerHTML = ''; 
    const endScreen = document.createElement('div');
    endScreen.classList.add('background-level-container', 'd-flex', 'justify-content-center', 'align-items-center');
    endScreen.innerHTML = `
        <div class="defeat-container justify-content-center text-center p-4 rounded shadow-lg">
            <h2 class="text-white mb-4 puzzle-title">🥳 ¡NIVEL COMPLETADO!</h2>
            <p class="fs-4 text-white">¡Has completado las ${totalQuestions} preguntas!</p>
            <p class="fs-2 text-warning">Tu Puntuación Final es: ${score} / ${totalQuestions}</p>
            <p class="fs-4 text-info">Errores Totales: ${errors}</p>
            <button class="btn btn-warning btn-lg mt-4" onclick="window.location.reload()">VOLVER A JUGAR</button>
        </div>
    `;
    gameRoot.appendChild(endScreen);
}

// Asegúrate de que esta función exista, ya que es la que invocas al perder
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