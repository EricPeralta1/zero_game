// GAME CONFIG
const gameConfig = {
    errorSpeed: 2,
    spawnInterval: 3000,
    errorSize: 80,
};

// GAME
let activeErrors = [];
let gameRunning = false;
let spawnIntervalId = null;
let animationFrameId = null;

// OPERATIONS
const operations = [
    // EASY
    { problem: "18 _ 9 = 27", answer: "+" },
    { problem: "50 _ 17 = 33", answer: "-" },
    { problem: "12 _ 4 = 48", answer: "x" },
    { problem: "84 _ 7 = 12", answer: "/" },
    { problem: "125 _ 5 = 25", answer: "/" },
    { problem: "3 _ 27 = 81", answer: "x" },
    { problem: "99 _ 33 = 3", answer: "/" },
    { problem: "142 _ 58 = 200", answer: "+" },
    { problem: "200 _ 125 = 75", answer: "-" },
    { problem: "16 _ 2 = 256", answer: "x" },

    // MEDIUM
    { problem: "1/2 _ 3/2 = 2", answer: "+" },
    { problem: "7/3 _ 4/3 = 1", answer: "-" },
    { problem: "5/6 _ 18 = 15", answer: "x" },
    { problem: "12 _ 3/4 = 16", answer: "/" },
    { problem: "9/4 _ 3 = 27/4", answer: "x" },
    { problem: "5 _ 1/5 = 1", answer: "x" },
    { problem: "8/3 _ 4 = 32/3", answer: "x" },
    { problem: "10 _ 5/2 = 4", answer: "/" },

    // MEDIUM HARD
    { problem: "2^4 _ 16 = 32", answer: "+" },
    { problem: "3^3 _ 9 = 18", answer: "x" },
    { problem: "3^3 _ 9 = 36", answer: "+" },
    { problem: "5^2 _ 25 = 0", answer: "-" },
    { problem: "4^3 _ 8 = 64", answer: "/" },
    { problem: "2^5 _ 4 = 32", answer: "+" },
    { problem: "9^2 _ 81 = 0", answer: "-" },
    { problem: "7^2 _ 49 = 2401", answer: "x" },

    // HARD
    { problem: "(2x + 3) _ (x + 1) = 3x + 4", answer: "+" },
    { problem: "(5x - 2) _ (3x + 7) = 2x - 9", answer: "-" },
    { problem: "(x + 4) _ (x - 4) = x^2 - 16", answer: "x" },
    { problem: "(3x - 1) _ (2x + 5) = 6x^2 + 13x - 5", answer: "x" },
    { problem: "(x^2 + 2x) _ x = x^3 + 2x^2", answer: "x" },
    { problem: "(2x + 5) _ (x - 3) = 2x + 5 - x + 3", answer: "-" },
    { problem: "(4x - 8) _ 4 = x - 2", answer: "/" },
    { problem: "(3x^2 - 2x + 1) _ (x^2 + x) = 4x^2 - x + 1", answer: "+" },

    // VERY HARD
    { problem: "(2x^2 + 3x - 5) _ (x^2 - x + 4) = x^2 + 4x - 9", answer: "-" },
    { problem: "(x^3 + 2x) _ (x^2 - 3) = x^5 - 3x^3 + 2x^3 - 6x", answer: "x" },
    { problem: "(5x^2 - x + 7) _ (x - 2) = 5x^2 - x + 7 + x - 2", answer: "+" },
    { problem: "(3x - 4) _ (x^2 + x) = 3x^3 + 3x^2 - 4x^2 - 4x", answer: "x" },
    { problem: "(4x^2 - 6) _ 2 = 2x^2 - 3", answer: "/" },
    {
        problem: "(x^2 + 6x + 9) _ (x^2 - 6x + 9) = x^4 - 36x^2 + 81",
        answer: "x",
    },

    // IMPOSSIBLE
    { problem: "(3/2)x _ (1/2)x = 2x", answer: "+" },
    { problem: "(7x - 3) _ (2x - 9) = 5x + 6", answer: "-" },
    { problem: "(x/3) _ 9 = 3x", answer: "x" },
    { problem: "(5x - 15) _ 5 = x - 3", answer: "/" },
];

// HP
const hp = 5;
let currentHP = hp;
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

const zeroPos = getZeroPosition();

// CREATE ERRORS
function createError() {
    // GET RANDOM ITEM FROM ARRAY OF OPERATIONS
    const operation = operations[Math.floor(Math.random() * operations.length)];

    // CREATE ERROR CONTAINER FOR IMG AND OPERATION
    const errorContainer = document.createElement("div");
    errorContainer.className = "error-container";
    errorContainer.dataset.answer = operation.answer;

    // GET RANDOM SPAWN POINT FOR THE ERROR
    const startX = window.innerWidth - 50;
    const startY = Math.random() * (window.innerHeight - 300) + 50;

    // SET RANDOM SPAWN POINT FOR THE ERROR CONTAINER
    errorContainer.style.left = `${startX}px`;
    errorContainer.style.top = `${startY}px`;

    // CREATE ERROR DIV FOR IMG
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

    return error;
}

// MOVE ERRORS TO ZERO
function moveErrors() {
    // FOR EVERY ACTIVE ERROR:
    activeErrors.forEach((error, index) => {
        // GET DISTANCE BETWEEN ZERO AND ERROR
        const dx = zeroPos.x - error.x;
        const dy = zeroPos.y - error.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // ERROR COLLISION WITH ZERO
        if (distance < 1) {
            loseLife();
            removeError(index);
            return;
        }

        // MOVE ERROR TOWARDS ZERO
        if (distance > 0) {
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

// MAKE GAME OVER SCREEN ACTIVE
function gameOver() {
    gameRunning = false;
    clearInterval(spawnIntervalId);
    cancelAnimationFrame(animationFrameId);

    // CLEAN ALL ERRORS
    activeErrors.forEach((error) => error.element.remove());
    activeErrors = [];
}

// START GAME
function startGame() {
    gameRunning = true;
    currentHP = hp;

    // SPAWN FIRST ERROR
    createError();

    // LOOP TO SPAWN ERRORS
    spawnIntervalId = setInterval(() => {
        if (gameRunning) {
            createError();
        }
    }, gameConfig.spawnInterval);

    // INIT ERROR MOVEMENT
    moveErrors();
}

checkHP();
startGame();
