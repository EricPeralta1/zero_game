// REDIRIGIR A LA RUTA CON EL IDIOMA SELECCIONADO
const selectLanguage = document.getElementById("select-language");
selectLanguage.addEventListener("change", function () {
    window.location.href = `./${selectLanguage.value}`;
});

// HACER QUE APAREZCA LA NAVABAR CUANDO PASE EL BOTÓN DE PLAY NOW
const playNowBtn = document.getElementById("play-now-btn");
const navbarPositionAppear = playNowBtn.offsetTop + playNowBtn.offsetHeight;

window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (window.scrollY > navbarPositionAppear) {
        nav.classList.add("scrolled");
    } else if (window.scrollY < navbarPositionAppear) {
        nav.classList.remove("scrolled");
    }
});
