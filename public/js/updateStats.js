const matchCards = document.querySelectorAll(".match-card");
const updateStatsForm = document.getElementById("update-stats");
const overlay = document.getElementById("overlay");
const quitBtn = document.getElementById("quit-btn");
const inputs = document.querySelectorAll("input");

matchCards.forEach((card) => {
    card.addEventListener("click", function (e) {
        const datasets = e.target.closest(".match-card").dataset;

        inputs[2].value = datasets.userid;
        inputs[3].value = datasets.scoreid;
        inputs[4].value = datasets.gameid;
        inputs[5].value = datasets.score;
        inputs[6].value = datasets.time;
        inputs[7].value = datasets.hp;
        inputs[8].value = datasets.errors;

        if (datasets.gameid !== 4) {
            inputs[7].max = 3;
        }

        const titleGame = document.getElementById("title-game");
        titleGame.textContent = datasets.gametitle;

        overlay.style.display = "flex";
        updateStatsForm.style.display = "flex";
    });
});

overlay.addEventListener("click", function () {
    updateStatsForm.style.display = "none";
    overlay.style.display = "none";
});

updateStatsForm.addEventListener("click", function (e) {
    e.stopPropagation();
});

quitBtn.addEventListener("click", function () {
    updateStatsForm.style.display = "none";
    overlay.style.display = "none";
});
