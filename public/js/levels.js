

const levelButtons = document.querySelectorAll('.lvlNum');
let nivelActivoId = 1;
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
    levelButtons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
    nivelActivoId = juego.id_game;
    nivelActivoId = parseInt(level);

    function redirectToLevel() {
    // CLAVE: Forzar la navegación a la URL del nivel activo
    window.location.href = `/levels/${nivelActivoId}`;
}

// 4. Agregar el Event Listener al botón COMERZAR
if (playButton) {
    playButton.addEventListener('click', redirectToLevel);
}
}
