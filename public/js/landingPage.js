// REDIRIGIR A LA RUTA CON EL IDIOMA SELECCIONADO
const selectLanguage = document.getElementById("select-language");
selectLanguage.addEventListener("change", function () {
    window.location.href = `./${selectLanguage.value}`;
});

// HACER QUE APAREZCA LA NAVABAR CUANDO PASE EL BOTÓN DE PLAY NOW
const playNowBtn = document.getElementById("play-now-btn");
const navbarPositionAppear = playNowBtn.getBoundingClientRect();
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
    if (
        window.scrollY >
        navbarPositionAppear.top + navbarPositionAppear.height
    ) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});
