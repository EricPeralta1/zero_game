let gameQuestions = [
    { question: "¿Cuál es el área de un círculo?", answer: "π x r x r" },
    { question: "¿Cuál es el perímetro de un cuadrado?", answer: "4 x lado" },
    { question: "¿Cuál es el área de un cuadrado?", answer: "lado x lado" }
];

let shownQuestions = []
let droppedAnswersIndex = []

let points = 0
let lifes = 3
let streak = 0;
let inputSpeed = 1000
let inputDeleteSpeed = 1750
let startTime
let endTime
let dateToday
let playTime = ""

let start = document.querySelector('.startGame')
start.addEventListener('click', startGame)

function startGame() {

    dateToday = new Date();
    startTime = Date.now()

    let gameContainer = document.querySelector(".gameContainer");
    gameContainer.remove();

    let gameScreen = document.createElement("div");
    gameScreen.classList.add("ingameContainer", "d-flex", "align-items-center")
    gameScreen.style.padding = "20px"

    let questionDiv = document.createElement("div");
    questionDiv.classList.add("d-flex", "questionBg", "align-items-center", "justify-content-center")
    questionDiv.style.color = "#000"
    questionDiv.style.height = "500px"
    questionDiv.style.width = "500px"

    let playerDiv = document.createElement("div");
    playerDiv.classList.add("justify-content-center", "ms-3")

    let statsBar = document.createElement("div");
    statsBar.classList.add("d-flex", "justify-content-evenly", "align-items-center")

    let livesBar = document.createElement("div");
    livesBar.style.width = "350px"
    livesBar.classList.add("d-flex", "justify-content-evenly", "liveBar")


    for (i = 1; i <= 3; i++) {
        let lifeIcon = document.createElement("img")
        lifeIcon.src = playerHp
        lifeIcon.style.height = "80px"
        lifeIcon.style.width = "80px"
        lifeIcon.dataset.numhp = i
        livesBar.append(lifeIcon)
    }

    let playerIcon = document.createElement("img")
    playerIcon.src = playerIdleImg;
    playerIcon.style.height = "100px"
    playerIcon.style.width = "100px"
    playerIcon.classList.add("ms-3", "playerStatus")

    let actionScreen = document.createElement("div")
    actionScreen.classList.add("actionScreen")

    statsBar.append(livesBar, playerIcon)
    playerDiv.append(statsBar, actionScreen)
    gameScreen.append(questionDiv, playerDiv)

    let screenContainer = document.querySelector(".level3background");
    screenContainer.append(gameScreen);

    let random = Math.floor(Math.random() * gameQuestions.length)

    loadQuestion(random)
    dropAnswers(random)
}

function loadQuestion(random) {
    let questionCont = document.querySelector(".questionBg");

    let question = document.createElement("p")
    question.style.wordBreak = "break-word"
    question.textContent = gameQuestions[random].question;
    question.style.fontSize = "30px"
    question.style.maxWidth = "275px"
    question.style.textAlign = "center"

    questionCont.append(question)
}

/* INICIA EL COMPORTAMIENTO DE CAIDA DE RESPUESTAS. COGE LAS RESPUESTAS GUARDADAS, Y ALEATORIAMENTE CADA 1S GENERA UNA EN EL CONTENEDOR,
QUE CADA 0.15S ACTUALIZA SU TOP PARA HACER QUE BAJE HACIA ABAJO PROGRESIVAMENTE. AL LLEGAR EL TOP DEL ELEMENTO A UN VALOR LIMITE, SE ELMINA.*/
function dropAnswers(random) {
    let gamePanel = document.querySelector(".actionScreen")
    gamePanel.style.color = "#000"

    let answersInterval = setInterval(() => {
        let word = document.createElement("p")
        word.classList.add('fallingWord')

        let newAnswer
        let rdAnswer

        do {
            newAnswer = true

            rdAnswer = Math.floor(Math.random() * gameQuestions.length)

            droppedAnswersIndex.forEach(answerIndex => {
                if (rdAnswer == answerIndex) {
                    newAnswer = false;
                }
            });
        } while (!newAnswer)

        answer = gameQuestions[rdAnswer].answer
        word.textContent = answer
        word.style.top = "0px"
        randomPos = Math.random() * (gamePanel.clientWidth - 80) + "px"
        word.style.left = randomPos


        gamePanel.append(word)
        word.addEventListener("click", () => checkQTE(answersInterval, word, random))

        droppedAnswersIndex.push(rdAnswer)

        if (droppedAnswersIndex.length == gameQuestions.length) {
            droppedAnswersIndex.splice(0, droppedAnswersIndex.length)
        }

        setInterval(() => {
            let wordTop = parseInt(window.getComputedStyle(word).getPropertyValue("top"))
            word.style.top = (wordTop + 10) + "px"
            let PanelBottom = parseInt(window.getComputedStyle(gamePanel).getPropertyValue("height"))
            if (parseInt(word.style.top) == PanelBottom - 80) {
                word.remove();
            }
        }, 150)
    }, 1500)
}

function checkQTE(answersInterval, word, random) {

    if (word.textContent != gameQuestions[random].answer) {
        clearInterval(answersInterval)

        shownQuestions.push(random)
        lifes = lifes - 1

        inputSpeed = 2000
        inputDeleteSpeed = 4000

        if (lifes == 0) {
            displayGameOver()
        } else {
            let life = document.querySelector(`[data-numhp="${lifes}"] `)
            life.remove()

            let playerIcon = document.querySelector(".playerStatus")
            playerIcon.src = playerFailImg

            setTimeout(function () {
                playerIcon.src = playerIdleImg
            }, 3500)

            let leftPanel = document.querySelector(".questionBg")
            leftPanel.innerHTML = '';
            leftPanel.style.backgroundImage = "url('../images/zero_climb.gif')";
            let gamePanel = document.querySelector(".actionScreen")
            gamePanel.innerHTML = '';
            gamePanel.style.backgroundImage = "url('../images/climbing_console.png')"

            climbQTE()
        }


    } else {
        clearInterval(answersInterval)

        shownQuestions.push(random)

        points = points + 500
        streak = streak + 1

        if (streak == 2) {
            inputSpeed = 700
            inputDeleteSpeed = 1000
        } else if (streak == 3) {
            inputSpeed = 400
            inputDeleteSpeed = 850
        }

        let leftPanel = document.querySelector(".questionBg")
        leftPanel.innerHTML = '';
        leftPanel.style.backgroundImage = "url('../images/zero_climb.gif')";
        let gamePanel = document.querySelector(".actionScreen")
        gamePanel.innerHTML = '';
        gamePanel.style.backgroundImage = "url('../images/climbing_console.png')"

        climbQTE()
    }


}

function climbQTE() {
    let gamePanel = document.querySelector(".actionScreen")

    let QTEInterval = setInterval(() => {
        let input = document.createElement("p")

        let allowed = true

        do {

            allowed = true

            input.classList.add('inputBackground')
            let random = Math.floor(Math.random() * 14)
            let keyOptions = ["W", "A", "S", "D", "F", "G", "Y", "I", "L", "Q", "B", "M", "N", "C"]
            inputKey = keyOptions[random]

            let allInputs = document.querySelectorAll(".inputBackground")
            allInputs.forEach(input => {
                if (input.textContent == inputKey) {
                    allowed = false
                }
            });

        } while (!allowed)

        input.textContent = inputKey

        let x = Math.floor(Math.random() * (gamePanel.offsetWidth - 80));
        let y = Math.floor(Math.random() * (gamePanel.offsetHeight - 80));

        input.style.left = x + "px"
        input.style.top = y + "px"

        gamePanel.append(input)


        setTimeout(function () {
            if (input) {
                input.remove()
            }
        }, inputDeleteSpeed)

    }, inputSpeed)

    checkPress()

    setTimeout(function () {
        clearInterval(QTEInterval)

        if (gameQuestions.length == shownQuestions.length) {
            displayResults()
        } else {
            let leftPanel = document.querySelector(".questionBg")
            leftPanel.innerHTML = '';
            leftPanel.style.backgroundImage = "url('../images/question_bkg.png')";
            let gamePanel = document.querySelector(".actionScreen")
            gamePanel.innerHTML = '';
            gamePanel.style.backgroundImage = "url('../images/gamepanel_lvl3.png')"

            let validQuestion
            let random

            do {
                validQuestion = true
                random = Math.floor(Math.random() * gameQuestions.length)

                shownQuestions.forEach(index => {
                    if (index == random) {
                        validQuestion = false
                    }
                });

            } while (!validQuestion)

            loadQuestion(random)
            dropAnswers(random)
        }


    }, 20000)
}

function checkPress() {
    document.addEventListener("keydown", event => {
        let currKeys = document.querySelectorAll(".inputBackground")
        if (currKeys != null) {
            currKeys.forEach(inputKey => {
                if (event.key.toUpperCase() == inputKey.textContent) {
                    points = points + 100
                    console.log(points)
                    inputKey.remove()
                }
            });
        }
    })
}

/*PERMITE VOLVER A LA PANTALLA DE NIVELES*/
function goToLevelScreen() {
    let backbutton = document.querySelector('.goback')
    backbutton.addEventListener('click', () => {
        window.location.href = backbutton.dataset.url;
    })
}
goToLevelScreen();

/*CARGA EN EL DOM EL CONTENEDOR DE GAMEOVER*/
function displayGameOver() {
    let gameOverContainer = document.createElement('div');
    gameOverContainer.classList.add("gameContainer", "align-items-center", "justify-content-center");
    gameOverContainer.style.maxWidth = "800px"
    gameOverContainer.style.borderRadius = "50px"

    let gameOverText = document.createElement('h3');
    gameOverText.classList.add("text-center")
    gameOverText.textContent = "ZERO FUE DERROTADO...";

    let gameOverImg = document.createElement('img');
    gameOverImg.classList.add("gameOverImg", "mt-3");
    gameOverImg.style.display = "block";
    gameOverImg.style.margin = "0 auto";
    gameOverImg.src = defeatLvl;

    let buttonDiv = document.createElement('div');
    buttonDiv.classList.add("d-flex", "justify-content-evenly", "mt-3");

    let continueBtn = document.createElement('button');
    continueBtn.classList.add("startGame");
    continueBtn.textContent = "CONTINUAR?"
    continueBtn.addEventListener("click", () => {
        window.location.href = window.location.href
    })


    let backBtn = document.createElement('button');
    backBtn.classList.add("goback");
    backBtn.textContent = "ATRAS"
    backBtn.addEventListener("click", () => {
        window.location.href = levelRt;
    })
    buttonDiv.append(continueBtn, backBtn);

    gameOverContainer.append(gameOverText, gameOverImg, buttonDiv);

    let gameContainer = document.querySelector(".ingameContainer");
    gameContainer.remove();

    let screenContainer = document.querySelector(".level3background");
    screenContainer.append(gameOverContainer);
}

/*CARGA LA PANTALLA DE RESULTADOS EN EL DOM*/
function displayResults() {
    endTime = Date.now()
    calculateTime()

    let resultsScreen = document.createElement('div')
    resultsScreen.classList.add("d-flex", "align-items-center", "justify-content-between")

    let winImage = document.createElement('img')
    winImage.classList.add("winImg", "me-5")
    winImage.src = winImgLvl;

    let scoreContainer = document.createElement('div')
    scoreContainer.classList.add("text-center", "justify-content-center", "p-3", "statsContainer")

    let winText = document.createElement('h3')
    winText.textContent = "¡FELICIDADES! EL CRISTAL ES TUYO"

    let stats = document.createElement('h4')
    stats.textContent = "ESTADÍSTICAS"

    let sp = document.createElement('hr')

    let time = document.createElement('p')
    time.textContent = "TIEMPO:" + playTime + "s"
    time.style.fontSize = "25px"

    let pointsText = document.createElement('p')
    pointsText.textContent = "PUNTOS:" + points + "p"
    pointsText.style.fontSize = "25px"

    let backBtn = document.createElement('button')
    backBtn.classList.add("goback")
    backBtn.textContent = "REGRESAR"
    backBtn.addEventListener("click", () => {
        window.location.href = levelRt;
    })

    let gameContainer = document.querySelector(".ingameContainer");
    gameContainer.remove();


    scoreContainer.append(winText, stats, sp, time, pointsText, backBtn)
    resultsScreen.append(winImage, scoreContainer)

    let screenContainer = document.querySelector(".level3background");
    screenContainer.append(resultsScreen);

    saveScore();
}

function calculateTime() {
    let diff = endTime - startTime;

    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor((seconds % 3600) / 60);
    seconds = seconds % 60;

    let mm = String(minutes).padStart(2, '0');
    let ss = String(seconds).padStart(2, '0');

    playTime = `${mm}:${ss}`; 
}

function saveScore() {
    const scoreGame3 = { puntos: points, tiempo_nivel: playTime, vidas: lifes, errores: 3 - lifes, id_user: id_usuario, id_game: id_juego, fecha: dateToday }
    const score3Str = JSON.stringify(scoreGame3)
    document.cookie = `score3=${score3Str}; path=/; max-age=3600 `;

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