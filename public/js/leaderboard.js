let table = document.querySelector(".tablebody")
let updateTable = document.querySelector(".btnLb")
let option = document.querySelector(".levelDataSelect")

updateTable.addEventListener("click", updateScoreView)

function updateScoreView(event) {
    const oldScores = document.querySelectorAll("#scorePlayer");

    oldScores.forEach(score => {
        score.remove()
    });


    let selectedOption = option.options[option.selectedIndex];
    let level = selectedOption.getAttribute("data-level");

    const puntuacionesOrdenadas = puntuaciones
    .filter(score => score.id_game == level)
    .sort((a, b) => parseInt(b.puntos) - parseInt(a.puntos));

    puntuacionesOrdenadas.forEach(score => {
            const tableRow = document.createElement("tr")
            tableRow.classList.add("table-dark")
            tableRow.id = "scorePlayer"

            let nameTd = document.createElement("td")
            let scoreTd = document.createElement("td")
            let tiempoTd = document.createElement("td")
            let vidasTd = document.createElement("td")
            let erroresTd = document.createElement("td")

            let player = usuarios.find((usuario) => checkUser(usuario, score))
            nameTd.textContent = `${player.nom_usuario}`;
            scoreTd.textContent = `${score.puntos}`;
            tiempoTd.textContent = `${score.tiempo_nivel}`;
            vidasTd.textContent = `${score.vidas}`;
            erroresTd.textContent = `${score.errores}`;

            tableRow.append(nameTd)
            tableRow.append(scoreTd)
            tableRow.append(tiempoTd)
            tableRow.append(vidasTd)
            tableRow.append(erroresTd)

            console.log(tableRow)

            table.append(tableRow)
    });
}

function checkUser(usuario, score) {
    return usuario.id_user == score.id_user
}