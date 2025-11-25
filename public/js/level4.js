const hp = 5;
const hpContainer = document.getElementById("hp-container");
const hpImg = `<img src="../Images/heart.png" alt="HP">`;

function checkHP() {
    for (let i = 0; i < hp; i++) {
        hpContainer.insertAdjacentHTML("beforeend", hpImg);
    }
}
checkHP();
