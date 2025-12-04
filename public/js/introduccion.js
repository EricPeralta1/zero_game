
//  1. Variables Globales y Datos 

let currentQuestionIndex = 0;
let points = 0;
let lifes = 3;
let errors = 0;
const gameRoot = document.getElementById('dynamic-container');
let dateToday;
let startTime;
let endTime;
let playTime = ""; 
let questionsToAsk = [];

const puzzleQuestions = [
    {
        equation: '3x + 5 = 11',
        options: [2, 3, 4, 5],
        correctAnswer: 2
    },
    {
        equation: '2^x = 1',
        options: [1, 0, 2, 4],
        correctAnswer: 0
    },
    {
        equation: '7 + 2x = 19',
        options: [6, 5, 4, 8],
        correctAnswer: 6 
    },

    
    {
        equation: '3 + x = 9',
        options: [1, 7, 3, 6],
        correctAnswer:6  
    }

    
];

const totalQuestions = puzzleQuestions.length;

// Inicialización del Juego

document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('boton_comenzar');
    const introContent = document.getElementById('main-content-area');
    const dynamicContainer = document.getElementById('dynamic-container');

    if (startButton) {
        startButton.addEventListener('click', function () {
            if (introContent) {
                introContent.classList.add('d-none');
            }
            
            currentQuestionIndex = 0;
            points = 0;
            lifes = 3;
            errors = 0;
            questionsToAsk = [...puzzleQuestions];
            dateToday = new Date();
            startTime = Date.now();

            createPuzzleScreen(dynamicContainer);
        });
    }
});


//  3. Función para Actualizar 

function updateHud() {
    const hudScore = document.getElementById('hud-score');
    const hudLives = document.getElementById('hud-lives');
    const hudErrors = document.getElementById('hud-errors');

    if (hudScore) {
        
        hudScore.innerHTML = ` Puntos: ${points }`; 
    }
    if (hudLives) {
        hudLives.innerHTML = ` Vidas: ${lifes}`;
    }
    if (hudErrors) {
        hudErrors.innerHTML = ` Errores: ${errors}`;
    }
}


//  4. Renderizado de la Pantalla del Puzzle 
function createPuzzleScreen() {
    const randomIndex = Math.floor(Math.random() * questionsToAsk.length);
    const currentQuestionData = questionsToAsk[randomIndex];  
    gameRoot.setAttribute('data-current-random-index', randomIndex);
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
    hudContainer.classList.add('hud-container', 'grid-area-hud',);
    
    hudContainer.innerHTML = `
        <div id="hud-score" class="hud-item">⭐ Puntos: ${points }</div>
        <div id="hud-lives" class="hud-item">❤️ Vidas: ${lifes}</div>
        <div id="hud-errors" class="hud-item">❌ Errores: ${errors}</div>
    `;

    // 2. Contenedor para el Título y la Ecuación (
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


    // 3. Contenedor de Opciones 
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

    // 5. Ensamblar la vista
    innerPuzzleBox.appendChild(hudContainer); 
    innerPuzzleBox.appendChild(headerContent);
    innerPuzzleBox.appendChild(optionsWrapper);
    innerPuzzleBox.appendChild(characterImage);

    puzzleBox.appendChild(innerPuzzleBox);

    puzzleScreen.appendChild(puzzleBox);
    gameRoot.appendChild(puzzleScreen);
}

// === 5. Lógica del Click 

function handleOptionClick(selectedValue) {
    
    document.querySelectorAll('.btn-option-puzzle').forEach(btn => btn.disabled = true);
    const randomIndex = parseInt(gameRoot.getAttribute('data-current-random-index'));

    const currentQuestionData = questionsToAsk[randomIndex]; 
    const correctAnswer = currentQuestionData.correctAnswer;

    // 1. Verificar la respuesta
    if (selectedValue === correctAnswer) {
        points = points + 100
        alert(' ¡Respuesta Correcta! Puntos: ' + points);

    } else {
        lifes--;
        errors++;
        alert(` ¡Incorrecto! La respuesta correcta era ${correctAnswer}. Vidas restantes: ${lifes}.`);
    }

    
    updateHud();

    
    if (lifes <= 0) {
        showDefeatScreen(gameRoot);
        return;
    }

   questionsToAsk.splice(randomIndex, 1);

    if (questionsToAsk.length > 0) {
        setTimeout(() => {
            createPuzzleScreen(); // Llama a la siguiente pregunta aleatoria
        }, 1000);
    } else {
        showGameEndScreen();
    }
}

// === 6. Funciones de Persistencia 

function calculateTimePuzzle() {
    let diff = endTime - startTime;

    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor((seconds % 3600) / 60);
    seconds = seconds % 60;

    let mm = String(minutes).padStart(2, '0');
    let ss = String(seconds).padStart(2, '0');

    playTime = `${mm}:${ss}`; 
}



//  7. Funciones de Pantalla Final 
function showGameEndScreen() {
    // 1. CÁLCULO Y VARIABLES
    endTime = Date.now(); 
    calculateTimePuzzle(); 
    const finalScore = points;
    const finalErrors = errors;
    
    // Crear el contenedor principal
    gameRoot.innerHTML = ''; 
    const victoryScreen = document.createElement('div');
    victoryScreen.classList.add('background-level-container', 'd-flex', 'justify-content-center', 'align-items-center', 'victory-screen');

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('d-flex','gap-2', 'victory-content-wrapper'); 

    // 2. COLUMNA DE IMAGEN
    const imageColumn = document.createElement('div');
    imageColumn.classList.add('victory-image-column');
    
    const crystalImage = document.createElement('img');
    crystalImage.src = VICTORY_IMAGE_SRC;
    crystalImage.alt = "Zero encuentra el cristal";
    crystalImage.classList.add('img-fluid', 'crystal-image', 'winImg'); 
    imageColumn.appendChild(crystalImage);

    // 3. COLUMNA DE ESTADÍSTICAS (Limpia de clases de presentación)
    const statsColumn = document.createElement('div');
    statsColumn.classList.add('victory-stats-column', 'text-center');

    statsColumn.innerHTML = `
        <div class="statsContainer">
         <h2 class="puzzle-title fs-30  mb-5">¡FELICIDADES! ¡EL CRISTAL ES TUYO!</h2>
            <h3 class="puzzle-title fs-25"> PUNTUACION FINAL</h3>
            
            <p>
                 TIEMPO: <span class="stat-value">${playTime}s</span>
            </p>
            
            <p>
                 PUNTOS: <span class="stat-value">${finalScore}p</span>
            </p>
            
            <p>
                 ERRORES: <span class="stat-value">${finalErrors}</span>
            </p>
            <button id="btn-regresar" class="btn btn-danger btn-lg mt-5">REGRESAR</button>
        </div>
        
        
    `;

    // 4. LÓGICA DE BOTÓN Y ENSAMBLAJE
    saveScore(); 

    const regresarButton = statsColumn.querySelector('#btn-regresar');
    regresarButton.addEventListener('click', () => {  
        window.location.href = levelRt;
    });
    
    contentWrapper.appendChild(imageColumn);
    contentWrapper.appendChild(statsColumn);
    victoryScreen.appendChild(contentWrapper);
    gameRoot.appendChild(victoryScreen);
}
function showDefeatScreen(container) {
    endTime = Date.now(); 
    calculateTimePuzzle(); 
    saveScore();
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
    image.src = DEFEAT_IMAGE_SRC; 
    image.alt = 'Zero Derrotado';
    image.className = 'img-fluid';

    imageWrapper.appendChild(image);

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'd-flex justify-content-center gap-3 mt-4';

    const btnContinue = document.createElement('button');
    btnContinue.className = 'btn btn-warning btn-lg';
    btnContinue.textContent = 'REINTENTAR';

    btnContinue.addEventListener('click', () => {
       
        window.location.reload();
    });

    const btnAbandon = document.createElement('button');
    btnAbandon.className = 'btn btn-danger btn-lg';
    btnAbandon.textContent = 'ABANDONAR';

    btnAbandon.addEventListener('click', () => {
        
        window.location.href = levelRt;
    });

    buttonsDiv.appendChild(btnContinue);
    buttonsDiv.appendChild(btnAbandon);

    defeatContainer.appendChild(title);
    defeatContainer.appendChild(imageWrapper);
    defeatContainer.appendChild(buttonsDiv);

    gameOverScreen.appendChild(defeatContainer);
    container.appendChild(gameOverScreen);
}

function saveScore() {
    const scoreGame1 = { puntos: points, tiempo_nivel: playTime, vidas: lifes, errores: 3 - lifes, id_user: id_usuario, id_game: id_juego, fecha: dateToday }
    const score1Str = JSON.stringify(scoreGame1)
    document.cookie = `score3=${score1Str}; path=/; max-age=3600 `;

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    fetch(`http://localhost/zero_game/public/saveScore`, {
        method: 'PUT',
        headers: {
            'X-CSRF-TOKEN': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
}