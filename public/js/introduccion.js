
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
         equation: '2x +1=3',
        options: [1, 2, 6, 0],
        correctAnswer: 1
    },

    {
         equation: '2^x=1',
        options: [1, 2, 3, 0],
        correctAnswer: 0
    },
    
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
        
        hudScore.innerHTML = ` Puntos: ${points * 100}`; 
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
        <div id="hud-score" class="hud-item">⭐ Puntos: ${points * 100}</div>
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

    // 5. Ensamblar la vista:
    innerPuzzleBox.appendChild(hudContainer); 
    innerPuzzleBox.appendChild(headerContent);
    innerPuzzleBox.appendChild(optionsWrapper);
    innerPuzzleBox.appendChild(characterImage);

    puzzleBox.appendChild(innerPuzzleBox);

    puzzleScreen.appendChild(puzzleBox);
    gameRoot.appendChild(puzzleScreen);
}

// === 5. Lógica del Click (SIN CAMBIOS FUNCIONALES)

function handleOptionClick(selectedValue) {
    
    document.querySelectorAll('.btn-option-puzzle').forEach(btn => btn.disabled = true);

    const currentQuestionData = puzzleQuestions[currentQuestionIndex];
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

    currentQuestionIndex++;

    if (currentQuestionIndex < totalQuestions) {
        
        setTimeout(() => {
            createPuzzleScreen();
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


function saveScore() {
    const scoreGame1 = { puntos: points, tiempo_nivel: playTime, vidas: lifes, errores: 3 - lifes, id_user: id_usuario, id_game: id_juego, fecha: dateToday }
    const score1Str = JSON.stringify(scoreGame1)
    document.cookie = `score3=${score1Str}; path=/; max-age=3600 `;

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    fetch(`http://localhost:8080/zero_game/public/saveScore`, {
        method: 'PUT',
        headers: {
            'X-CSRF-TOKEN': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
}
//  7. Funciones de Pantalla Final 

function showGameEndScreen() {
    
    endTime = Date.now(); 
    calculateTimePuzzle(); 
    const finalScore = points;
    const finalErrors = errors;
    gameRoot.innerHTML = ''; 
    const victoryScreen = document.createElement('div');
    victoryScreen.classList.add('background-level-container', 'd-flex', 'justify-content-center', 'align-items-center', 'victory-screen');
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('d-flex', 'victory-content-wrapper'); 
    const imageColumn = document.createElement('div');
    imageColumn.classList.add('victory-image-column');
    const crystalImage = document.createElement('img');
    crystalImage.src = VICTORY_IMAGE_SRC;
    crystalImage.alt = "Zero encuentra el cristal";
    crystalImage.classList.add('img-fluid', 'crystal-image');
    crystalImage.width = 500;
    crystalImage.height = 400;
    
    imageColumn.appendChild(crystalImage);
    const statsColumn = document.createElement('div');
    statsColumn.classList.add('victory-stats-column', 'text-center');
    
    statsColumn.innerHTML = `
        <h2 class="puzzle-title fs-30 text-success">¡FELICIDADES! ¡EL CRISTAL ES TUYO!</h2>
        
        <div class="stats-box">
            <h3 class="puzzle-title fs-25 my-4">ESTADÍSTICAS</h3>
            <p class="fs-20">TIEMPO: <span class="stat-value">${playTime}s</span></p>
            <p class="fs-20">PUNTOS: <span class="stat-value">${finalScore * 100}p</span></p>
            <p class="fs-20">ERRORES: <span class="stat-value">${finalErrors}</span></p>
        </div>
        
        <button id="btn-regresar" class="btn btn-danger btn-lg mt-5">REGRESAR</button>
    `;

    saveScore()
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