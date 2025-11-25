let answersList = ["Altura", "1", "2", "Ancho", "Circulo", "Rectangulo", "Triangulo", "2 x π x radio", "Lado x lado", "Ancho x Altura"]

function startGame() {
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
        livesBar.append(lifeIcon)
    }

    let playerIcon = document.createElement("img")
    playerIcon.src = playerIdleImg;
    playerIcon.style.height = "100px"
    playerIcon.style.width = "100px"
    playerIcon.classList.add("ms-3")

    let actionScreen = document.createElement("div")
    actionScreen.classList.add("actionScreen")

    statsBar.append(livesBar, playerIcon)
    playerDiv.append(statsBar, actionScreen)
    gameScreen.append(questionDiv, playerDiv)

    let screenContainer = document.querySelector(".level3background");
    screenContainer.append(gameScreen);

    loadQuestion()
    dropAnswers()
}

function loadQuestion() {
    let question = document.createElement("p")
    question.style.wordBreak = "break-all"
    question.textContent = "Que número va después del 2?"
    question.style.fontSize = "30px"

    let questionCont = document.querySelector(".questionBg")
    questionCont.append(question)
}

function dropAnswers() {
    let gamePanel = document.querySelector(".actionScreen")
    gamePanel.style.color = "#000"

    setInterval(() => {
        let word = document.createElement("p")
        word.classList.add('fallingWord')
        let random = Math.floor(Math.random()*10)
        answer = answersList[random]
        word.textContent = answer
        word.style.top = "0px"
        randomPos = Math.random() * (gamePanel.clientWidth - 80) + "px"
        word.style.left = randomPos


        gamePanel.append(word)

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

function climbTE() {
    let leftPanel = document.querySelector("questionBg")
    let 
}

let start = document.querySelector('.startGame')
start.addEventListener('click', startGame)

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

    let backBtn = document.createElement('button');
    backBtn.classList.add("goback");
    backBtn.textContent = "ATRAS"
    backBtn.addEventListener("click", () => {
        window.location.href = levelRt;
    })
    buttonDiv.append(continueBtn, backBtn);

    gameOverContainer.append(gameOverText, gameOverImg, buttonDiv);

    let gameContainer = document.querySelector(".gameContainer");
    gameContainer.remove();

    let screenContainer = document.querySelector(".level3background");
    screenContainer.append(gameOverContainer);
}

/*CARGA LA PANTALLA DE RESULTADOS EN EL DOM*/
function displayResults() {
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
    time.textContent = "TIEMPO: 02:42s"
    time.style.fontSize = "25px"

    let points = document.createElement('p')
    points.textContent = "PUNTOS: 4753p"
    points.style.fontSize = "25px"

    let backBtn = document.createElement('button')
    backBtn.classList.add("goback")
    backBtn.textContent = "REGRESAR"
    backBtn.addEventListener("click", () => {
        window.location.href = levelRt;
    })

    let gameContainer = document.querySelector(".gameContainer");
    gameContainer.remove();


    scoreContainer.append(winText, stats, sp, time, points, backBtn)
    resultsScreen.append(winImage, scoreContainer)

    let screenContainer = document.querySelector(".level3background");
    screenContainer.append(resultsScreen);

}