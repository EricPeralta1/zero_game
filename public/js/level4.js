// START MENU
const levelContainer = document.getElementById("level-container");
const overlay = document.getElementById("overlay");
const startGameBtn = document.getElementById("start-game-btn");
const instructionsContainer = document.getElementById("instructions-container");

startGameBtn.addEventListener("click", function () {
    instructionsContainer.style.display = "none";
    overlay.style.display = "none";
    levelContainer.style.display = "flex";
    startGame();
});

// GAME CONFIG
const gameConfig = {
    errorSpeed: 2,
    spawnInterval: 3000,
};

// OPERATIONS
const operations = [
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
    { problem: "156 _ 39 = 6", answer: "/" },
    { problem: "88 _ 44 = 44", answer: "-" },
    { problem: "25 _ 13 = 325", answer: "x" },

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

    { problem: "256 _ 16 = 16", answer: "/" },
    { problem: "13 _ 7 = 91", answer: "x" },
    { problem: "1000 _ 250 = 750", answer: "-" },
    { problem: "999 _ 111 = 9", answer: "/" },
    { problem: "47 _ 53 = 100", answer: "+" },
    { problem: "19 _ 6 = 114", answer: "x" },
    { problem: "500 _ 125 = 4", answer: "/" },
    { problem: "888 _ 444 = 444", answer: "-" },
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

            if (answerStreak > 3) {
                const total = (answerStreak - 2) * 100;
                score = score + total;
                kaosHP = kaosHP - total;
            } else {
                score += 100;
                kaosHP -= 100;
            }

            if (kaosHP < 0) {
            }
            removeError(errorIndex);
            scoreText.textContent = `PUNTOS: ${score}`;
            kaosHPText.textContent = `${kaosHP} HP`;
            errorElement.remove();
        } else {
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
}

// WIN GAME
const gameWinContainer = document.getElementById("game-win-container");
const continueBtn = document.getElementById("continue-btn");
function gameWin() {
    gameRunning = false;
    clearInterval(spawnIntervalId);
    clearInterval(timeId);
    cancelAnimationFrame(animationFrameId);

    // CLEAN ALL ERRORS
    activeErrors.forEach((error) => error.element.remove());
    activeErrors = [];

    levelContainer.style.display = "none";
    overlay.style.display = "flex";
    gameWinContainer.style.display = "flex";
}

// RESTART GAME
restartButton.addEventListener("click", function () {
    gameOverContainer.style.display = "none";
    instructionsContainer.style.display = "flex";
    overlay.style.display = "flex";
});

// TIME
const timeText = document.getElementById("time-text");

let timeId = null;
function initTime() {
    timeId = setInterval(() => {
        time++;
        timeText.textContent = `TIEMPO: ${time}`;
    }, 1000);
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
    kaosHP = 3000;
    timeText.textContent = `TIEMPO: ${time}`;
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
}
