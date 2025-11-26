// HP
const hp = 5;
let currentHP = hp;
const hpContainer = document.getElementById("hp-container");
const hpImg = `<img src="../Images/heart.png" alt="HP">`;

function checkHP() {
    for (let i = 0; i < currentHP; i++) {
        hpContainer.insertAdjacentHTML("beforeend", hpImg);
    }
}
checkHP();

// GAME CONFIG
const gameConfig = {
    errorSpeed: 2,
    spawnInterval: 3000,
    errorSize: 80,
};

// GAME 