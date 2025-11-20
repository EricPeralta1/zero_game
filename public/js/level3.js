function startGame(){
    let gameContainer = document.querySelector(".gameContainer");
    gameContainer.innerHTML = '';
    
}

let start = document.querySelector('.startGame')
start.addEventListener('click', displayGameOver)

function goToLevelScreen(){
    let backbutton = document.querySelector('.goback')
    backbutton.addEventListener('click', ()=> {
        window.location.href = backbutton.dataset.url;
    })
}
goToLevelScreen();


function displayGameOver(){
    let gameOverContainer = document.createElement('div');
    gameOverContainer.classList.add("gameContainer", "align-items-center", "justify-content-center");
    gameOverContainer.style.maxWidth = "800px"

    let gameOverText = document.createElement('h3');
    gameOverText.classList.add("text-center")
    gameOverText.textContent = "ZERO HA SIDO DERROTADO...";

    let gameOverImg = document.createElement('img');
    gameOverImg.classList.add("gameOverImg", "mt-3");
    gameOverImg.src =  "images/zero_defeat_lvl3.png"

    let buttonDiv = document.createElement('div');
    buttonDiv.classList.add("d-flex", "justify-content-evenly", "mt-3");

    let continueBtn = document.createElement('button');
    continueBtn.classList.add("startGame");
    continueBtn.textContent = "CONTINUAR?"

    let backBtn = document.createElement('button');
    backBtn.classList.add("goback");
    backBtn.textContent = "ATRAS"

    buttonDiv.append(continueBtn, backBtn);

    gameOverContainer.append(gameOverText, gameOverImg, buttonDiv);

    let gameContainer = document.querySelector(".gameContainer");
    if (gameContainer) gameContainer.remove();

    let screenContainer = document.querySelector(".level3background");
    screenContainer.append(gameOverContainer);
}