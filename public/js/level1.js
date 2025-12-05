
//  1. Variables Globales y Datos 

let currentQuestionIndex = 0;
let points = 0;
let lifes = 3;
let errors = 0;
const gameRoot = document.getElementById('dynamic-container');
let rachapoints=0;
let dateToday;
let startTime;
let endTime;
let playTime = ""; 
let questionsToAsk = [];


const difficultyPoints={
  'easy': 50,
  'medium': 100,
  'hard': 150,
}



const puzzleQuestions = [
    {
        equation: '3x + 5 = 11',
        options: [2, 3, 4, 5],
        correctAnswer: 2,
        dificulty:'medium'
    },
    {
        equation: '2^x = 1',
        options: [1, 0, 2, 4],
        correctAnswer: 0,
        dificulty:'extra'
        
    },
    {
        equation: '7 + 2x = 19',
        options: [6, 5, 4, 8],
        correctAnswer: 6,
         dificulty:'hard'
    },

    {
        equation: '3 + x = 9',
        options: [1, 7, 3, 6],
        correctAnswer:6,
        dificulty:'medium'  
    },
    {
        equation: 'x * 30 = 240',
        options: [6, 7, 8, 9],
        correctAnswer:8,
        dificulty:'easy'  
    },

    {
        equation: '(5 + 3) * x - 10 = 30',
        options: [4, 5, 6, 7],
        correctAnswer:5,
        dificulty:'medium'  
    },
    {
        equation: 'x³ = 8',
        options: [8, 5, 1, 2],
        correctAnswer:2,
        dificulty:'medium'  
    },

    {
        equation: '4 + x = 20',
        options: [4, 15, 16, 10],
        correctAnswer: 16,
        dificulty: 'easy'
    },

     {
        equation: '1/2 + 4/2 = x',
        options: ['4/2', '1/2', '5/2', '6/2'],
        correctAnswer: '5/2',
        dificulty: 'easy'
    },

    {
    equation: '(5 * 4) + (2 * 5) = x',
    options: [20, 25, 30, 35],
    correctAnswer: 30,
    dificulty: 'extra'
   },

   {
    equation: '1/3 + 1/2  = x',
    options: ['3/2', '2/3', '2/3', '5/6'],
    correctAnswer: '5/6',
    dificulty: 'hard'
}, 
{
    equation: '10 + 13 + 2 = x',
    options: [38, 25, 42, 45],
    correctAnswer: 25,
    dificulty: 'easy'
}, 
{
    equation: '(150 + 75) - (20 + 30) = x',
    options: [165, 175, 185, 195],
    correctAnswer: 175,
    dificulty: 'hard'
},
{
        equation: '2³ + 4² = x',
        options: [20, 24, 30, 32],
        correctAnswer: 24, 
        dificulty: 'extra'
    },
    {
        equation: '(5 * 10) + (2 * 50) + 10 = x',
        options: [150, 160, 200, 180],
        correctAnswer: 160, 
        dificulty: 'extra'
    },
    {
        equation: '1/2 + 1/4 + 1/8 = x',
        options: ['7/8', '5/8', '3/4', '1'],
        correctAnswer: '7/8', 
        dificulty: 'extra'
    },
    {
        equation: '5 + 5⁵ = x',
        options: [3125, 3130, 5000, 3150],
        correctAnswer: 3130, 
        dificulty: 'extra'
    },
    {
        equation: '1200 + 800 + 50 = x',
        options: [1950, 2000, 2050, 2150],
        correctAnswer: 2050,
        dificulty: 'extra'
    },
    {
        equation: '15 + 20 + 5 = x',
        options: [30, 40, 50, 60],
        correctAnswer: 40,
        dificulty: 'easy'
    },
    {
        equation: '(100 + 50) + 75 = x',
        options: [200, 225, 250, 175],
        correctAnswer: 225,
        dificulty: 'medium'
    },
    {
        equation: '45 + 35 = x',
        options: [70, 80, 90, 100],
        correctAnswer: 80,
        dificulty: 'easy'
    },
    {
        equation: '9 + 11 + 20 = x',
        options: [30, 35, 40, 45],
        correctAnswer: 40,
        dificulty: 'medium'
    },
    {
        equation: '1/4 + 3/4 = x',
        options: ['1/4', '2/4', '3/4', '1'],
        correctAnswer: '1',
        dificulty: 'hard'
    }
 
];

// --- . Funciones de Preparación y Utilidad ---
/**
 * @function selectRandomQuestions
 * Selecciona un número limitado y aleatorio de preguntas del array fuente.
 * Esto asegura que cada partida tenga un conjunto único de problemas.
 * @param {Array<Object>} questionsArray - El array fuente de todas las preguntas.
 * @param {number} limit - El número máximo de preguntas a seleccionar.
 * @returns {Array<Object>} Un nuevo array con las preguntas seleccionadas.
 */

function selectRandomQuestions(questionsArray, limit) {
    let tempArray = [...questionsArray];
    let selectedQuestions = [];
    const numToSelect = Math.min(limit, tempArray.length);
    for (let i = 0; i < numToSelect; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        selectedQuestions.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
    }

    return selectedQuestions;
}

const totalQuestions = puzzleQuestions.length;

// --- 3. Inicialización del Juego (DOM Ready) ---

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
            rachapoints = 0;
            questionsToAsk = selectRandomQuestions(puzzleQuestions, 10);
            dateToday = new Date();
            startTime = Date.now();

            createPuzzleScreen(dynamicContainer);
        });
    }
});
// --- 4. Funciones de UI/HUD ---

/**
 * @function updateHud
 * Actualiza los contadores de Puntos, Vidas y Errores en la interfaz.
 */


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

/**
 * @function createPuzzleScreen
 * Renderiza la pantalla del puzzle, incluyendo la lógica de selección de preguntas (normal/extra).
 */
 
function createPuzzleScreen() {
    let randomIndex;
    let currentQuestionData;

    //  Lógica de la Pregunta 'Extra' ---
    const extraQuestionIndex = questionsToAsk.findIndex(q => q.dificulty === 'extra');
    
    
    if (rachapoints == 3 && extraQuestionIndex !== -1) {
        randomIndex = extraQuestionIndex;
        currentQuestionData = questionsToAsk[randomIndex];
        
        console.log("¡Racha de 3 aciertos! Mostrando pregunta 'extra'.");

    } else {
        // Si no hay racha de 3 O no hay 'extra' disponibles, seleccionar una pregunta no-'extra' aleatoria.
        
        // 1. Filtrar solo preguntas que NO sean 'extra' para la selección aleatoria
        const nonExtraQuestions = questionsToAsk.filter(q => q.dificulty !== 'extra');
        
        if (nonExtraQuestions.length > 0) {
            
            // 2. Seleccionar un índice aleatorio DENTRO del array de preguntas no-'extra'
            const randomNonExtraIndex = Math.floor(Math.random() * nonExtraQuestions.length);
            const selectedNonExtraQuestion = nonExtraQuestions[randomNonExtraIndex];
            
            // 3. Encontrar el índice original de esa pregunta en el array questionsToAsk
            // Esto es crucial para poder eliminarla correctamente después de responderla
            randomIndex = questionsToAsk.findIndex(q => q === selectedNonExtraQuestion);
            currentQuestionData = selectedNonExtraQuestion;
            
        } else if (questionsToAsk.length > 0) {
            // Caso de respaldo: solo quedan preguntas 'extra' y no hay racha de 3.
            // Para evitar un loop o bloqueo, simplemente selecciona la primera restante.
            randomIndex = 0;
            currentQuestionData = questionsToAsk[randomIndex];
            console.warn("Solo quedan preguntas 'extra' y no se alcanzó la racha. Mostrando una 'extra' como pregunta normal.");

        } else {
             // Esto no debería pasar si el juego se detiene al acabar preguntas
            return; 
        }
    }




    gameRoot.setAttribute('data-current-random-index', randomIndex);


    
      gameRoot.innerHTML = '';
    
  
    const puzzleScreen = document.createElement('div');
    puzzleScreen.classList.add('background-level-container', 'd-flex', 'justify-content-center', 'align-items-center', 'py-5');
    puzzleScreen.id = 'puzzle-screen';

    const puzzleBox = document.createElement('div');
    puzzleBox.classList.add('juego_box', 'puzzle-cave-container', 'container', 'text-center');

    const innerPuzzleBox = document.createElement('div');
    innerPuzzleBox.classList.add('inner-puzzle-box', 'puzzle-grid-layout');

   
const notificationArea = document.createElement('div');
notificationArea.id = 'game-notification-area';
notificationArea.classList.add('notification-message', 'grid-area-message');
innerPuzzleBox.appendChild(notificationArea);


 
    const hudContainer = document.createElement('div');
    hudContainer.id = 'game-hud';
    hudContainer.classList.add('hud-container', 'grid-area-hud',);
    
    hudContainer.innerHTML = `
        <div id="hud-score" class="hud-item"> Puntos: ${points }</div>
        <div id="hud-lives" class="hud-item"> Vidas: ${lifes}</div>
        <div id="hud-errors" class="hud-item"> Errores: ${errors}</div>
    `;

    // Contenedor para el Título y la Ecuación 
    const headerContent = document.createElement('div');
    headerContent.classList.add('header-content', 'grid-area-header');
   const title = document.createElement('h2');
    if (currentQuestionData.dificulty === 'extra') {
         title.textContent = ' BONUS: ¡DOBLE PUNTAJE!';  
         title.classList.add('puzzle-title', 'fs-30', 'text-warning');
    } else {
         title.textContent = 'Encuentra el valor de x';
         title.classList.add('puzzle-title', 'fs-30');
    }
    const equation = document.createElement('p');
    equation.textContent = currentQuestionData.equation;
    equation.classList.add('puzzle-equation', 'fs-40');

   

    headerContent.appendChild(title);
    headerContent.appendChild(equation);


    //  Contenedor de Opciones 
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


    //  Personaje 
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

    //  Ensamblar la vista
    innerPuzzleBox.appendChild(hudContainer); 
    innerPuzzleBox.appendChild(headerContent);
    innerPuzzleBox.appendChild(optionsWrapper);
    innerPuzzleBox.appendChild(characterImage);

    puzzleBox.appendChild(innerPuzzleBox);

    puzzleScreen.appendChild(puzzleBox);
    gameRoot.appendChild(puzzleScreen);
}

/**
 * @function showNotification
 * Muestra un mensaje temporal de retroalimentación (Correcto/Incorrecto/Extra).
 * @param {string} message - El texto del mensaje.
 * @param {boolean|string} isCorrect - `true` para correcto, `false` para incorrecto, o 'extra' para bonus.
 */

function showNotification(message, isCorrect) {
    const notificationArea = document.getElementById('game-notification-area');
    if (!notificationArea) return;

    notificationArea.textContent = message;
    notificationArea.classList.remove('msg-correct', 'msg-incorrect', 'msg-extra');
    
    if (isCorrect === true) {
        notificationArea.classList.add('msg-correct');
    } else if (isCorrect === false) {
        notificationArea.classList.add('msg-incorrect');
    } else {
       
        notificationArea.classList.add('msg-extra'); 
    }
    
    notificationArea.style.opacity = 1; 

    
    setTimeout(() => {
        notificationArea.style.opacity = 0;
    }, 2000); 
}


/**
 * @function handleOptionClick
 * Gestiona el evento de clic en una opción de respuesta.
 * @param {number|string} selectedValue - El valor de la opción seleccionada.
 */

function handleOptionClick(selectedValue) {
    document.querySelectorAll('.btn-option-puzzle').forEach(btn => btn.disabled = true);
    const randomIndex = parseInt(gameRoot.getAttribute('data-current-random-index'));

    const currentQuestionData = questionsToAsk[randomIndex]; 
    const correctAnswer = currentQuestionData.correctAnswer;
    const dificulty = currentQuestionData.dificulty; 
    let pointsAwarded = 0;
    let notificationMessage = "";

    //  Verificar la respuesta
    if (selectedValue === correctAnswer) {
        if (dificulty === 'extra') {
            pointsAwarded = difficultyPoints['hard'] * 2;
            notificationMessage = `¡BONUS! ¡Doble Puntos! Ganaste ${pointsAwarded}p.`;
            rachapoints = 0; 
        } 
        else {
            pointsAwarded = difficultyPoints[dificulty] || 50; 
            rachapoints++; 
            notificationMessage = `¡Correcto! Ganaste ${pointsAwarded}p. Racha: ${rachapoints}`;
            console.log('correcto')
        }
        points += pointsAwarded; 
        showNotification(notificationMessage, dificulty === 'extra' ? 'extra' : true);

    } 
       else {
        rachapoints = 0; 
        const correctMsg = currentQuestionData.correctAnswer;
        if (dificulty !== 'extra') {
            lifes--;
            notificationMessage = `¡Incorrecto!  -1 Vida. La respuesta correcta era ${correctMsg}.`;
            showNotification(notificationMessage, false);
            console.log('incorrecto')
        } else {
            
            notificationMessage = `¡Incorrecto en la pregunta Extra! La respuesta correcta era ${correctMsg}. No pierdes vidas.`;
            showNotification(notificationMessage, false); 
        }
        
        errors++;
    }
    
    updateHud();
    
    if (lifes <= 0) {
        showDefeatScreen(gameRoot);
        return;
    }

    // Eliminar la pregunta ya usada
    questionsToAsk.splice(randomIndex, 1);

    if (questionsToAsk.length > 0) {
        setTimeout(() => {
            createPuzzleScreen(); 
        }, 1000);
    } else {
        showGameEndScreen();
    }
}

/**
 * @function calculateTimePuzzle
 * Calcula el tiempo total de juego y lo formatea a MM:SS.
 */ 

function calculateTimePuzzle() {
    let diff = endTime - startTime;
    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor((seconds % 3600) / 60);
    seconds = seconds % 60;
    let mm = String(minutes).padStart(2, '0');
    let ss = String(seconds).padStart(2, '0');
    playTime = `${mm}:${ss}`; 
}
/**
 * @function showGameEndScreen
 * Muestra la pantalla de victoria/fin del juego exitoso.
 */
function showGameEndScreen() {
    endTime = Date.now(); 
    calculateTimePuzzle(); 
    const finalScore = points;
    const finalErrors = errors;
    gameRoot.innerHTML = ''; 
    const victoryScreen = document.createElement('div');
    victoryScreen.classList.add('background-level-container', 'd-flex', 'justify-content-center', 'align-items-center', 'victory-screen');

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('d-flex','gap-2', 'victory-content-wrapper'); 

    //  COLUMNA DE IMAGEN
    const imageColumn = document.createElement('div');
    imageColumn.classList.add('victory-image-column');
    
    const crystalImage = document.createElement('img');
    crystalImage.src = VICTORY_IMAGE_SRC;
    crystalImage.alt = "Zero encuentra el cristal";
    crystalImage.classList.add('img-fluid', 'crystal-image', 'winImg'); 
    imageColumn.appendChild(crystalImage);

    //. COLUMNA DE ESTADÍSTICAS (Limpia de clases de presentación)
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

    // Guarda la puntuación antes de que el usuario se vaya
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

/**
 * @function showDefeatScreen
 * Muestra la pantalla de derrota (Game Over).
 * @param {HTMLElement} container - El contenedor donde se renderizará la pantalla.
 */
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

/**
 * @function saveScore
 * Almacena la puntuación final de la partida, tanto en una cookie como en el servidor.
 */
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