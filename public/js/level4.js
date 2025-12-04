// SOUNDS
const sounds = {
    errorHit: new Audio("../sounds/error_hit.mp3"),
    hitKaos: new Audio("../sounds/hit_kaos.mp3"),
    hitZero: new Audio("../sounds/hit_zero.mp3"),
    kaosDeath: new Audio("../sounds/kaos_death.mp3"),
    streak: new Audio("../sounds/streak.mp3"),
    bgGame: new Audio("../sounds/bg_game.mp3"),
    bgMenu: new Audio("../sounds/bg_menu.mp3"),
    win: new Audio("../sounds/win.mp3"),
};
Object.values(sounds).forEach((sound) => {
    sound.volume = 0.5;
});

const playAudioBtn = document.getElementById("play-audio-btn");
playAudioBtn.addEventListener("click", function () {
    sounds.bgMenu.loop = true;
    sounds.bgMenu.play();
});

// START MENU
const levelContainer = document.getElementById("level-container");
const overlay = document.getElementById("overlay");
const startGameBtn = document.getElementById("start-game-btn");
const instructionsContainer = document.getElementById("instructions-container");

startGameBtn.addEventListener("click", function () {
    sounds.bgMenu.pause();
    instructionsContainer.style.display = "none";
    overlay.style.display = "none";
    levelContainer.style.display = "flex";
    startGame();
});

// GAME CONFIG
const gameConfig = {
    errorSpeed: 3,
    spawnInterval: 2500,
};

// OPERATIONS
const operations = [
    // Operaciones básicas con enteros
    { problem: "18 _ 9 = 27", answer: "+" },
    { problem: "50 _ 17 = 33", answer: "-" },
    { problem: "12 _ 4 = 48", answer: "x" },
    { problem: "84 _ 7 = 12", answer: "/" },
    { problem: "125 _ 5 = 25", answer: "/" },
    { problem: "3 _ 27 = 81", answer: "x" },
    { problem: "99 _ 33 = 3", answer: "/" },
    { problem: "142 _ 58 = 200", answer: "+" },
    { problem: "200 _ 125 = 75", answer: "-" },
    { problem: "15 _ 8 = 120", answer: "x" },
    { problem: "144 _ 12 = 12", answer: "/" },
    { problem: "73 _ 27 = 100", answer: "+" },
    { problem: "156 _ 39 = 4", answer: "/" },
    { problem: "88 _ 44 = 44", answer: "-" },
    { problem: "25 _ 13 = 325", answer: "x" },

    // Más operaciones básicas
    { problem: "45 _ 15 = 60", answer: "+" },
    { problem: "100 _ 25 = 75", answer: "-" },
    { problem: "7 _ 8 = 56", answer: "x" },
    { problem: "63 _ 9 = 7", answer: "/" },
    { problem: "234 _ 66 = 300", answer: "+" },
    { problem: "500 _ 275 = 225", answer: "-" },
    { problem: "16 _ 5 = 80", answer: "x" },
    { problem: "120 _ 8 = 15", answer: "/" },
    { problem: "89 _ 11 = 100", answer: "+" },
    { problem: "150 _ 75 = 75", answer: "-" },
    { problem: "22 _ 4 = 88", answer: "x" },
    { problem: "96 _ 6 = 16", answer: "/" },
    { problem: "37 _ 13 = 50", answer: "+" },
    { problem: "200 _ 88 = 112", answer: "-" },
    { problem: "14 _ 7 = 98", answer: "x" },
    { problem: "108 _ 9 = 12", answer: "/" },
    { problem: "65 _ 35 = 100", answer: "+" },
    { problem: "300 _ 125 = 175", answer: "-" },
    { problem: "11 _ 11 = 121", answer: "x" },
    { problem: "144 _ 16 = 9", answer: "/" },

    // Operaciones con fracciones
    { problem: "1/2 _ 3/2 = 2", answer: "+" },
    { problem: "7/3 _ 4/3 = 1", answer: "-" },
    { problem: "5/6 _ 18 = 15", answer: "x" },
    { problem: "12 _ 3/4 = 16", answer: "/" },
    { problem: "9/4 _ 3 = 27/4", answer: "x" },
    { problem: "5 _ 1/5 = 1", answer: "x" },
    { problem: "8/3 _ 4 = 32/3", answer: "x" },
    { problem: "10 _ 5/2 = 4", answer: "/" },
    { problem: "2/3 _ 1/3 = 1", answer: "+" },
    { problem: "5/4 _ 1/4 = 1", answer: "-" },
    { problem: "3/5 _ 10 = 6", answer: "x" },
    { problem: "8 _ 2/3 = 12", answer: "/" },
    { problem: "7/2 _ 2 = 7", answer: "x" },
    { problem: "15 _ 3/5 = 25", answer: "/" },

    // Más operaciones con fracciones
    { problem: "3/4 _ 1/4 = 1", answer: "+" },
    { problem: "5/6 _ 1/6 = 2/3", answer: "-" },
    { problem: "2/5 _ 15 = 6", answer: "x" },
    { problem: "6 _ 3/2 = 4", answer: "/" },
    { problem: "7/8 _ 1/8 = 1", answer: "+" },
    { problem: "11/5 _ 1/5 = 2", answer: "-" },
    { problem: "4/7 _ 14 = 8", answer: "x" },
    { problem: "20 _ 4/5 = 25", answer: "/" },
    { problem: "1/3 _ 2/3 = 1", answer: "+" },
    { problem: "9/5 _ 4/5 = 1", answer: "-" },
    { problem: "3/8 _ 16 = 6", answer: "x" },
    { problem: "9 _ 3/4 = 12", answer: "/" },
    { problem: "5/6 _ 6 = 5", answer: "x" },
    { problem: "18 _ 2/3 = 27", answer: "/" },
    { problem: "1/4 _ 3/4 = 1", answer: "+" },

    // Operaciones con potencias
    { problem: "2^4 _ 16 = 32", answer: "+" },
    { problem: "3^3 _ 9 = 18", answer: "-" },
    { problem: "3^3 _ 9 = 36", answer: "+" },
    { problem: "5^2 _ 25 = 0", answer: "-" },
    { problem: "4^3 _ 8 = 8", answer: "/" },
    { problem: "2^5 _ 4 = 8", answer: "/" },
    { problem: "9^2 _ 81 = 0", answer: "-" },
    { problem: "7^2 _ 7 = 343", answer: "x" },
    { problem: "6^2 _ 12 = 48", answer: "+" },
    { problem: "10^2 _ 50 = 50", answer: "-" },
    { problem: "4^2 _ 4 = 64", answer: "x" },
    { problem: "8^2 _ 16 = 4", answer: "/" },
    { problem: "3^4 _ 81 = 0", answer: "-" },
    { problem: "5^3 _ 25 = 5", answer: "/" },
    { problem: "2^6 _ 32 = 96", answer: "+" },

    // Más operaciones con potencias
    { problem: "2^3 _ 4 = 12", answer: "+" },
    { problem: "3^2 _ 6 = 3", answer: "-" },
    { problem: "5^2 _ 5 = 125", answer: "x" },
    { problem: "6^2 _ 6 = 6", answer: "/" },
    { problem: "4^2 _ 8 = 24", answer: "+" },
    { problem: "7^2 _ 14 = 35", answer: "-" },
    { problem: "3^3 _ 3 = 81", answer: "x" },
    { problem: "10^2 _ 25 = 4", answer: "/" },
    { problem: "2^5 _ 16 = 48", answer: "+" },
    { problem: "8^2 _ 32 = 32", answer: "-" },
    { problem: "2^4 _ 2 = 32", answer: "x" },
    { problem: "9^2 _ 9 = 9", answer: "/" },
    { problem: "5^2 _ 10 = 35", answer: "+" },
    { problem: "6^3 _ 108 = 108", answer: "-" },
    { problem: "4^3 _ 4 = 256", answer: "x" },

    // Operaciones con números grandes
    { problem: "256 _ 16 = 16", answer: "/" },
    { problem: "13 _ 7 = 91", answer: "x" },
    { problem: "1000 _ 250 = 750", answer: "-" },
    { problem: "999 _ 111 = 9", answer: "/" },
    { problem: "47 _ 53 = 100", answer: "+" },
    { problem: "19 _ 6 = 114", answer: "x" },
    { problem: "500 _ 125 = 4", answer: "/" },
    { problem: "888 _ 444 = 444", answer: "-" },

    // Más operaciones con números grandes
    { problem: "375 _ 125 = 250", answer: "-" },
    { problem: "24 _ 25 = 600", answer: "x" },
    { problem: "720 _ 90 = 8", answer: "/" },
    { problem: "456 _ 234 = 690", answer: "+" },
    { problem: "800 _ 400 = 400", answer: "-" },
    { problem: "17 _ 12 = 204", answer: "x" },
    { problem: "540 _ 60 = 9", answer: "/" },
    { problem: "777 _ 223 = 1000", answer: "+" },
    { problem: "950 _ 450 = 500", answer: "-" },
    { problem: "32 _ 16 = 512", answer: "x" },
    { problem: "1000 _ 40 = 25", answer: "/" },
    { problem: "365 _ 135 = 500", answer: "+" },
    { problem: "600 _ 275 = 325", answer: "-" },
    { problem: "21 _ 15 = 315", answer: "x" },
    { problem: "480 _ 24 = 20", answer: "/" },
    { problem: "625 _ 375 = 1000", answer: "+" },
    { problem: "750 _ 350 = 400", answer: "-" },
    { problem: "28 _ 18 = 504", answer: "x" },
    { problem: "960 _ 32 = 30", answer: "/" },

    // Operaciones mixtas desafiantes
    { problem: "77 _ 11 = 7", answer: "/" },
    { problem: "36 _ 9 = 45", answer: "+" },
    { problem: "95 _ 45 = 50", answer: "-" },
    { problem: "9 _ 13 = 117", answer: "x" },
    { problem: "225 _ 15 = 15", answer: "/" },
    { problem: "128 _ 72 = 200", answer: "+" },
    { problem: "333 _ 111 = 222", answer: "-" },
    { problem: "26 _ 8 = 208", answer: "x" },
    { problem: "144 _ 18 = 8", answer: "/" },
    { problem: "199 _ 101 = 300", answer: "+" },
    { problem: "555 _ 222 = 333", answer: "-" },
    { problem: "35 _ 9 = 315", answer: "x" },
    { problem: "432 _ 36 = 12", answer: "/" },
    { problem: "87 _ 13 = 100", answer: "+" },
    { problem: "400 _ 175 = 225", answer: "-" },
    { problem: "23 _ 11 = 253", answer: "x" },
    { problem: "576 _ 24 = 24", answer: "/" },
    { problem: "445 _ 55 = 500", answer: "+" },
    { problem: "666 _ 333 = 333", answer: "-" },
    { problem: "29 _ 14 = 406", answer: "x" },
];

// HP
const hpContainer = document.getElementById("hp-container");
const hpImg = `<img src="../Images/heart.png" alt="HP">`;

function checkHP() {
    hpContainer.innerHTML = "";
    for (let i = 0; i < currentHP; i++) {
        hpContainer.insertAdjacentHTML("beforeend", hpImg);
    }
}

// ZERO POSITION
function getZeroPosition() {
    const zeroImg = document.querySelector("#zero-fighting");
    const rect = zeroImg.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
    };
}

// INITIALIZE DRAGGABLE SYMBOLS
function initDraggableSymbols() {
    const symbols = document.querySelectorAll('p[draggable="true"]');

    symbols.forEach((symbol) => {
        symbol.addEventListener("dragstart", (e) => {
            // ALLOW COPY OF THE DATA SPECIFIED
            e.dataTransfer.effectAllowed = "copy";

            // SET IN dataTransfer THE SYMBOL DATASET
            e.dataTransfer.setData("text/plain", e.target.dataset.symbol);
            e.target.style.opacity = "0.5";
        });

        symbol.addEventListener("dragend", (e) => {
            e.target.style.opacity = "1";
        });
    });
}

// CREATE ERRORS
function createError() {
    // GET RANDOM ITEM FROM ARRAY OF OPERATIONS
    const operation = operations[Math.floor(Math.random() * operations.length)];

    // CREATE ERROR CONTAINER FOR ERROR IMG AND OPERATION
    const errorContainer = document.createElement("div");
    errorContainer.className = "error-container";
    errorContainer.dataset.answer = operation.answer;

    // GET RANDOM SPAWN POINT FOR THE ERROR
    const startX = window.innerWidth - 50;
    const startY = Math.random() * (window.innerHeight - 300) + 50;

    // SET RANDOM SPAWN POINT FOR THE ERROR CONTAINER
    errorContainer.style.left = `${startX}px`;
    errorContainer.style.top = `${startY}px`;

    // CREATE DIV FOR ERROR IMG
    const errorEnemy = document.createElement("div");
    errorEnemy.className = "error-enemy";

    // CREATE ERROR PROBLEM CONTAINER
    const errorContent = document.createElement("div");
    errorContent.className = "error-content";

    // CREATE ERROR PROBLEM WITH OPERATION
    const errorProblem = document.createElement("span");
    errorProblem.className = "error-problem";
    errorProblem.textContent = operation.problem;

    // APPEND SPAN TO CONTENT
    errorContent.appendChild(errorProblem);

    // APPEND BOTH DIVS TO CONTAINER
    errorContainer.appendChild(errorEnemy);
    errorEnemy.appendChild(errorContent);

    // APPEND ERROR CONTAINER TO BODY
    document.body.appendChild(errorContainer);
    const zeroPos = getZeroPosition();

    const error = {
        element: errorContainer,
        x: startX,
        y: startY,
        answer: operation.answer,
        // ZERO POSITION
        targetX: zeroPos.x,
        targetY: zeroPos.y,
    };

    activeErrors.push(error);
    checkAnswer(errorContainer);

    return error;
}

// MOVE ERRORS TO ZERO
function moveErrors() {
    // FOR EVERY ACTIVE ERROR:
    activeErrors.forEach((error, index) => {
        const zeroPos = getZeroPosition();

        // GET DISTANCE BETWEEN ZERO AND ERROR
        // horizontal distance
        const dx = zeroPos.x - error.x;
        // vertical distance
        const dy = zeroPos.y - error.y;
        // pythagoras theorem
        const distance = Math.sqrt(dx * dx + dy * dy);

        // ERROR COLLISION WITH ZERO
        if (distance < 10) {
            sounds.hitZero.play();
            score -= 10;
            scoreText.textContent = `PUNTOS: ${score}`;
            loseLife();
            removeError(index);
            return;
        }

        // MOVE ERROR TOWARDS ZERO
        if (distance > 0) {
            // normalized directions
            error.x += (dx / distance) * gameConfig.errorSpeed;
            error.y += (dy / distance) * gameConfig.errorSpeed;

            error.element.style.left = `${error.x}px`;
            error.element.style.top = `${error.y}px`;
        }
    });

    // CALL moveErrors FOR EVERY REPAINT
    if (gameRunning) {
        animationFrameId = requestAnimationFrame(moveErrors);
    }
}

// CHECK ANSWER ON DROP
const scoreText = document.getElementById("points-text");
const kaosHPText = document.getElementById("kaos-hp");

function checkAnswer(errorElement) {
    // CHANGE STYLES WHEN DRAGGABLE IS ON ERROR
    errorElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        // MAKE A COPY OF THE DATA IN dataTransfer
        e.dataTransfer.dropEffect = "copy";
        errorElement.style.transform = "scale(1.05)";
    });

    errorElement.addEventListener("dragleave", (e) => {
        errorElement.style.transform = "";
    });

    // LOGIC ON ERROR DROP
    errorElement.addEventListener("drop", (e) => {
        e.preventDefault();
        errorElement.style.transform = "";

        // GET THE COPY OF THE DATA IN dataTransfer
        const droppedSymbol = e.dataTransfer.getData("text/plain");
        const correctAnswer = errorElement.dataset.answer;

        // FIND INDEX OF ERROR IN ACTIVEERRORS
        const errorIndex = activeErrors.findIndex(
            (err) => err.element === errorElement
        );

        // COMPARE CORRECT ANSWER WITH P DATASET
        if (droppedSymbol === correctAnswer) {
            answerStreak++;
            sounds.errorHit.play();
            sounds.hitKaos.play();

            if (answerStreak > 3) {
                const total = (answerStreak - 2) * 100;
                score = score + total;
                kaosHP = kaosHP - total;

                sounds.streak.play();
            } else {
                score += 100;
                kaosHP -= 100;
            }

            if (kaosHP <= 1000) {
                gameConfig.errorSpeed = 4;
                gameConfig.spawnInterval = 2;
            }

            if (kaosHP <= 0) {
                gameWin();
            }
            removeError(errorIndex);
            scoreText.textContent = `PUNTOS: ${score}`;
            kaosHPText.textContent = `${kaosHP} HP`;
            errorElement.remove();
        } else {
            score -= 5;
            scoreText.textContent = `PUNTOS: ${score}`;
            answerStreak = 0;
        }
    });
}

// REMOVE ERROR
function removeError(index) {
    if (activeErrors[index]) {
        activeErrors[index].element.remove();
        activeErrors.splice(index, 1);
    }
}

// LOSE ONE LIFE
function loseLife() {
    sounds.hitZero.play();
    currentHP--;
    checkHP();

    if (currentHP <= 0) {
        gameOver();
    }
}

const gameOverContainer = document.getElementById("game-over-container");
const restartButton = document.getElementById("restart-btn");

// GAME OVER
function gameOver() {
    gameRunning = false;
    clearInterval(spawnIntervalId);
    clearInterval(timeId);
    cancelAnimationFrame(animationFrameId);

    // CLEAN ALL ERRORS
    activeErrors.forEach((error) => error.element.remove());
    activeErrors = [];

    levelContainer.style.display = "none";
    overlay.style.display = "flex";
    gameOverContainer.style.display = "flex";

    setCookies();
}

// WIN GAME
const gameWinContainer = document.getElementById("game-win-container");
const continueBtn = document.getElementById("continue-btn");
function gameWin() {
    sounds.kaosDeath.play();
    sounds.win.play();
    sounds.bgGame.pause();

    gameRunning = false;
    clearInterval(spawnIntervalId);
    clearInterval(timeId);
    cancelAnimationFrame(animationFrameId);

    // CLEAN ALL ERRORS
    activeErrors.forEach((error) => error.element.remove());
    activeErrors = [];

    // SHOW WIN SCREEN
    levelContainer.style.display = "none";
    overlay.style.display = "flex";
    gameWinContainer.style.display = "flex";

    // DISPLAY GAME STATS
    const timeWinText = document.getElementById("time-win-text");
    const scoreWinText = document.getElementById("score-win-text");
    timeWinText.textContent = `TIEMPO: ${time}s`;
    scoreWinText.textContent = `PUNTOS: ${score}`;

    // NAVIGATE
    const gameCompleteContainer = document.getElementById(
        "game-complete-container"
    );
    const gameContainer = document.getElementById("game-container");
    continueBtn.addEventListener("click", function () {
        levelContainer.style.display = "none";
        gameWinContainer.style.display = "none";
        gameContainer.style.display = "none";
        gameCompleteContainer.style.display = "flex";
    });

    setCookies();
}

// RESTART GAME
restartButton.addEventListener("click", function () {
    sounds.bgMenu.play();
    gameOverContainer.style.display = "none";
    instructionsContainer.style.display = "flex";
    overlay.style.display = "flex";
    sounds.bgGame.pause();
});

// TIME
const timeText = document.getElementById("time-text");

let timeId = null;
function initTime() {
    timeId = setInterval(() => {
        time++;
        timeText.textContent = `TIEMPO: ${time}s`;
    }, 1000);
}

// STORE STATS IN COOKIES
function setCookies() {
    const score4 = {
        puntos: score,
        tiempo_nivel: time,
        vidas: hp,
        errores: 5 - hp,
        id_user: id_usuario,
        id_game: 4,
        fecha: new Date(),
    };
    const score4String = JSON.stringify(score4);
    document.cookie = `score4=${score4String}; path=/; max-age=3600 `;

    const token = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    fetch(`http://localhost/zero_game/public/saveScore`, {
        method: "PUT",
        headers: {
            "X-CSRF-TOKEN": token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });

    console.log(document.cookie);
}

// START GAME DEFAULT VALUES
let activeErrors = [];
let gameRunning = false;
let spawnIntervalId = null;
let animationFrameId = null;

let score;
let time;
const hp = 5;
let currentHP;
let kaosHP;
let answerStreak;

function startGame() {
    activeErrors = [];
    score = 0;
    time = 0;
    answerStreak = 0;
    currentHP = hp;
    kaosHP = 5000;
    timeText.textContent = `TIEMPO: ${time}s`;
    scoreText.textContent = `PUNTOS: ${score}`;
    kaosHPText.textContent = `${kaosHP} HP`;

    gameRunning = true;

    // DISPLAY HP
    checkHP();

    // INTERVAL TO SPAWN ERRORS
    spawnIntervalId = setInterval(() => {
        if (gameRunning) {
            createError();
        }
    }, gameConfig.spawnInterval);

    // SPAWN FIRST ERROR
    createError();
    // INIT ERRORS MOVEMENT
    moveErrors();
    // INIT SYMBOLS DRAGGABLE
    initDraggableSymbols();
    // INIT TIME
    initTime();
    //INIT AUDIO
    sounds.bgMenu.pause();
    sounds.bgGame.loop = true;
    sounds.bgGame.play();
}
