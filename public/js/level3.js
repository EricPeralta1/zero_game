function startGame(){
    let gameContainer = document.querySelector(".gameContainer");
    gameContainer.innerHTML = '';
    
}

let start = document.querySelector('.startGame')
start.addEventListener('click', displayResults)

/*PERMITE VOLVER A LA PANTALLA DE NIVELES*/
function goToLevelScreen(){
    let backbutton = document.querySelector('.goback')
    backbutton.addEventListener('click', ()=> {
        window.location.href = backbutton.dataset.url;
    })
}
goToLevelScreen();

/*CARGA EN EL DOM EL CONTENEDOR DE GAMEOVER*/
function displayGameOver(){
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
    gameOverImg.src =  defeatLvl;

    let buttonDiv = document.createElement('div');
    buttonDiv.classList.add("d-flex", "justify-content-evenly", "mt-3");

    let continueBtn = document.createElement('button');
    continueBtn.classList.add("startGame");
    continueBtn.textContent = "CONTINUAR?"

    let backBtn = document.createElement('button');
    backBtn.classList.add("goback");
    backBtn.textContent = "ATRAS"
    backBtn.addEventListener("click", ()=>{
        window.location.href = levelRt;
    })
    buttonDiv.append(continueBtn, backBtn);

    gameOverContainer.append(gameOverText, gameOverImg, buttonDiv);

    let gameContainer = document.querySelector(".gameContainer");
    gameContainer.remove();

    let screenContainer = document.querySelector(".level3background");
    screenContainer.append(gameOverContainer);
}

/*CARGA LA PANTALLA DE RESULTADOS*/
function displayResults(){
    let resultsScreen = document.createElement('div')
    resultsScreen.classList.add("d-flex", "align-items-center", "justify-content-between")

    let winImage = document.createElement('img')
    winImage.classList.add("winImg", "me-5")
    winImage.src =  winImgLvl;
    
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
    backBtn.addEventListener("click", ()=>{
        window.location.href = levelRt;
    })

    let gameContainer = document.querySelector(".gameContainer");
    gameContainer.remove();

    
    scoreContainer.append(winText, stats, sp, time, points, backBtn)
    resultsScreen.append(winImage, scoreContainer)

    let screenContainer = document.querySelector(".level3background");
    screenContainer.append(resultsScreen);

}