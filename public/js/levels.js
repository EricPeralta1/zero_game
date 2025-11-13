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

    levelTitle.textContent = `NIVEL ${juego.id_game} | ${juego.nombre_juego}`;
    levelDesc.textContent = juego.descripcion;

    levelImage.src = `images/level_${juego.id_game}.png`;
9
    levelButtons.forEach(btn => btn.classList.remove("active"));

    event.target.classList.add("active");
}
