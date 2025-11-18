const levelButtons = document.querySelectorAll('.lvlNum');

levelButtons.forEach(btn => {
    btn.addEventListener('click', changeLevelView);
});

function changeLevelView(event) {

    const level = event.target.getAttribute('data-level');
    const juego = juegos.find(j => j.id_game == level);

    let levelTitle = document.querySelector('.levelTitle')
    let levelDesc = document.querySelector('.levelDesc')
    let levelImage = document.querySelector('.levelImg')
    let hiscore = document.querySelector('.levelScore')

    levelTitle.textContent = `NIVEL ${juego.id_game} | ${juego.nombre_juego}`;
    levelDesc.textContent = juego.descripcion;

    levelImage.src = `images/level_${juego.id_game}.png`;

    let highestscore = 0

    if (userScores != null) {
        userScores.forEach(score => {
            if (score.id_game == juego.id_game && score.puntos>highestscore) {
                highestscore = score.puntos;
            }
        });
    }

    hiscore.textContent = `HIGHSCORE: ${highestscore}p`

    levelButtons.forEach(btn => btn.classList.remove("active"));

    event.target.classList.add("active");
}

function lockLevels() {
    let highestUnlockedLevel = 1

    if (userScores != null) {
        userScores.forEach(score => {
            if (score.id_game >= highestUnlockedLevel && score.id_game != 4) {
                highestUnlockedLevel++;
            }
        })
        levelButtons.forEach(btn => {
            if (btn.getAttribute('data-level') > highestUnlockedLevel) {
                btn.style.pointerEvents = "none";
                btn.style.color = "#431806";
            }
        })
    } else {
        levelButtons.forEach(btn => {
            if (btn.getAttribute('data-level') != highestUnlockedLevel) {
                btn.style.pointerEvents = "none";
                btn.style.color = "#431806";
            }
        })
    }
}

lockLevels()