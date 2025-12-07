let seeGameData = document.querySelector('.gameBtn')
let seeScoreData = document.querySelector('.scoreBtn')
let seeUserData = document.querySelector('.userBtn')
let seePredData = document.querySelector('.predBtn')
let pyodide;

seeGameData.addEventListener('click', showGameMetrics)
seeUserData.addEventListener('click', showPlayerMetrics)
seeScoreData.addEventListener('click', showScoreMetrics)
seePredData.addEventListener('click', loadPrediction)



async function showGameMetrics() {
    let dataContainer = document.querySelector('.dataShown')
    dataContainer.innerHTML = ""

    if (document.querySelector('.test') == null) {
        let loading = document.createElement('p')
        loading.textContent = "Cargando..."
        loading.classList.add("test")
        let dataContainer = document.querySelector('.dataShown')
        dataContainer.append(loading)
    } else {
        text = document.querySelector('.test')
        text.textContent = "Cargando..."
    }

    async function pyTest() {
        let pyodide = await loadPyodide();
        await pyodide.loadPackage("numpy");
        await pyodide.loadPackage("pandas");
        await pyodide.loadPackage("matplotlib");

        const puntuacionesPy = pyodide.toPy(puntuaciones);
        pyodide.globals.set("puntuaciones", puntuacionesPy);

        await pyodide.runPythonAsync(`
        from js import document
        import numpy as np
        import pandas as pd
        import matplotlib.pyplot as plt
        import io, base64

        levelsPlayed = document.createElement("h3")
        levelsPlayed.textContent = "GRÁFICO DE NIVELES JUGADOS"

        text = document.querySelector('.test')
        text.remove()

        df = pd.DataFrame(puntuaciones)
        data_scores = df.dropna()

        dataDiv = document.querySelector('.dataShown')
        dataDiv.append(levelsPlayed)

        scores1 = data_scores[data_scores['id_game'] == "1"]
        scores2 = data_scores[data_scores['id_game'] == "2"]
        scores3 = data_scores[data_scores['id_game'] == "3"]
        scores4 = data_scores[data_scores['id_game'] == "4"]

        fig, ax = plt.subplots(figsize=(12,6))
        ax.bar(['LEVEL 1'], len(scores1), color='skyblue')
        ax.bar(['LEVEL 2'], len(scores2), color='skyblue')
        ax.bar(['LEVEL 3'], len(scores3), color='skyblue')
        ax.bar(['LEVEL 4'], len(scores4), color='skyblue')

        ax.set_ylabel('PARTIDAS REGISTRADAS')
        ax.set_title('PARTIDAS X NIVEL')

        plt.ylim((0,20))
        plt.tight_layout()

        buf = io.BytesIO()
        plt.savefig(buf, format="png")
        buf.seek(0)
        img_base64 = base64.b64encode(buf.read()).decode("utf-8")

        img = document.createElement("img")
        img.src = "data:image/png;base64," + img_base64
        img.style.width = "700px"
        img.style.display = "block"
        img.style.margin = "20px auto"

        dataDiv .append(img)
        `)
    }

    pyTest();
}

async function showPlayerMetrics() {
    let dataContainer = document.querySelector('.dataShown')
    dataContainer.innerHTML = ""

    if (document.querySelector('.test') == null) {
        let loading = document.createElement('p')
        loading.textContent = "Cargando..."
        loading.classList.add("test")
        let dataContainer = document.querySelector('.dataShown')
        dataContainer.append(loading)
    } else {
        text = document.querySelector('.test')
        text.textContent = "Cargando..."
    }

    async function pyTest() {
        let pyodide = await loadPyodide();
        await pyodide.loadPackage("numpy");
        await pyodide.loadPackage("pandas");
        await pyodide.loadPackage("matplotlib");

        const puntuacionesPy = pyodide.toPy(puntuaciones);
        pyodide.globals.set("puntuaciones", puntuacionesPy);

        const usersPy = pyodide.toPy(usuarios);
        pyodide.globals.set("usuarios", usersPy);

        const sesionsPy = pyodide.toPy(sesiones);
        pyodide.globals.set("sesions", sesionsPy);


        await pyodide.runPythonAsync(`
        from js import document
        import numpy as np
        import pandas as pd
        import matplotlib.pyplot as plt
        import io, base64

        dataDiv = document.querySelector('.dataShown')

        levelsPlayed = document.createElement("h3")
        levelsPlayed.textContent = "INFORMACIÓN DE USUARIOS"

        text = document.querySelector('.test')
        text.remove()

        imageDiv = document.createElement("div")
        imageDiv.classList.add("d-flex", "align-items-center", "justify-content-center")
        dataDiv.append(levelsPlayed)
        dataDiv.append(imageDiv)

        df = pd.DataFrame(puntuaciones)
        data_scores = df.dropna()
        df_sesions = pd.DataFrame(sesions)
        data_sesions = df_sesions.dropna()


        uniqueplayers = data_scores['id_user'].unique()

        sesion_counts = data_sesions['id_user'].value_counts()
        returningplayers = sesion_counts[sesion_counts >= 2]

        abandonplayers = len(uniqueplayers) - len(returningplayers)

        fig, playerx = plt.subplots(figsize=(12,6))
        playerx.bar(['TOTAL DE USUARIOS'], len(uniqueplayers), color='skyblue')
        playerx.bar(['USUARIOS QUE VUELVEN'], len(returningplayers), color='skyblue')
        playerx.bar(['USUARIOS QUE ABANDONAN'], abandonplayers, color='skyblue')

        playerx.set_ylabel('JUGADORES')
        playerx.set_title('NÚMERO DE JUGADORES')

        plt.ylim((0,20))
        plt.tight_layout()

        buf = io.BytesIO()
        plt.savefig(buf, format="png")
        buf.seek(0)
        img_base64 = base64.b64encode(buf.read()).decode("utf-8")

        img = document.createElement("img")
        img.src = "data:image/png;base64," + img_base64
        img.style.width = "500px"
        img.style.display = "block"
        img.style.margin = "20px auto"

        imageDiv.append(img)

        returnPlayerText = document.createElement("h4")
        percentatgeReturns = (len(returningplayers) / len(uniqueplayers)) * 100
        returnPlayerText.textContent = "PORCENTAJE DE JUGADORES QUE VUELVEN: " + str(percentatgeReturns) + "%"
        dataDiv.append(returnPlayerText)

        mediumLengthSesionText = document.createElement("h4")
        averageSesion = data_sesions['tiempo'].astype(int).mean()
        
        hours = int(averageSesion // 3600)
        minutes = int((averageSesion % 3600) // 60)
        seconds = int(averageSesion % 60)
        averageSesionStr = f"{hours:02d}:{minutes:02d}:{seconds:02d}"

        mediumLengthSesionText.textContent = "DURACIÓN MEDIA DE SESIÓN: " + averageSesionStr
        dataDiv.append(mediumLengthSesionText)

        data_sesions['fecha_sesion'] = pd.to_datetime(data_sesions['fecha_sesion'])
        data_sesions['mes'] = data_sesions['fecha_sesion'].dt.month

        january = len(data_sesions[data_sesions['mes'] == 1])
        february = len(data_sesions[data_sesions['mes'] == 2])
        march = len(data_sesions[data_sesions['mes'] == 3])
        april = len(data_sesions[data_sesions['mes'] == 4])
        may = len(data_sesions[data_sesions['mes'] == 5])
        june = len(data_sesions[data_sesions['mes'] == 6])
        july = len(data_sesions[data_sesions['mes'] == 7])
        august = len(data_sesions[data_sesions['mes'] == 8])
        september = len(data_sesions[data_sesions['mes'] == 9])
        october = len(data_sesions[data_sesions['mes'] == 10])
        november = len(data_sesions[data_sesions['mes'] == 11])
        december = len(data_sesions[data_sesions['mes'] == 12])

        fig, playerx = plt.subplots(figsize=(12,6))
        playerx.bar(['ENERO'], january, color='skyblue')
        playerx.bar(['FEBRERO'], february, color='skyblue')
        playerx.bar(['MARZO'], march, color='skyblue')
        playerx.bar(['ABRIL'], april, color='skyblue')
        playerx.bar(['MAYO'], may, color='skyblue')
        playerx.bar(['JUNIO'], june, color='skyblue')
        playerx.bar(['JULIO'], july, color='skyblue')
        playerx.bar(['AGOSTO'], august, color='skyblue')
        playerx.bar(['SEPTIEMBRE'], september, color='skyblue')
        playerx.bar(['OCTUBRE'], october, color='skyblue')
        playerx.bar(['NOVIEMBRE'], november, color='skyblue')
        playerx.bar(['DICIEMBRE'], december, color='skyblue')

        playerx.set_ylabel('NUMERO DE SESIONES')
        playerx.set_title('SESIONES POR MES')

        plt.ylim((0,20))
        plt.tight_layout()

        buf = io.BytesIO()
        plt.savefig(buf, format="png")
        buf.seek(0)
        imgmonthly_base64 = base64.b64encode(buf.read()).decode("utf-8")

        imgmonthly = document.createElement("img")
        imgmonthly.src = "data:image/png;base64," + imgmonthly_base64
        imgmonthly.style.width = "500px"
        imgmonthly.style.display = "block"
        imgmonthly.style.margin = "20px auto"
        imgmonthly.classList.add("ms-3")

        imageDiv.append(imgmonthly)
        `)
    }

    pyTest();
}

function showScoreMetrics() {
    let dataContainer = document.querySelector('.dataShown')
    dataContainer.innerHTML = ""

    if (document.querySelector('.test') == null) {
        let loading = document.createElement('p')
        loading.textContent = "Cargando..."
        loading.classList.add("test")
        let dataContainer = document.querySelector('.dataShown')
        dataContainer.append(loading)
    } else {
        text = document.querySelector('.test')
        text.textContent = "Cargando..."
    }

    let dataDiv = document.querySelector('.dataShown')

    let scoresTitle = document.createElement("h3")
    scoresTitle.textContent = "INFORMACIÓN DE PUNTUACIONES"

    let text = document.querySelector('.test')
    text.remove()


    let showGameData = document.createElement("div")
    showGameData.classList.add("d-flex", "align-items-center",  "justify-content-center")

    let selectGame = document.createElement("select")
    selectGame.classList.add("metricsSelect" , "gameSelect")
    selectGame.className = "metricsSelect";

    selectGame.appendChild(createOption("1", 1, "1. BOSQUE DE LA SUMA"));
    selectGame.appendChild(createOption("2", 2, "2. EL DESIERTO AVANZADO"));
    selectGame.appendChild(createOption("3", 3, "3. LAS MONTAÑAS GEOMÉTRICAS"));
    selectGame.appendChild(createOption("4", 4, "4. LA CIUDAD DEL SABER"));

    let showData = document.createElement('button')
    showData.textContent = "VER"
    showData.classList.add("ms-3", "metricsBtnScores")

    showGameData.append(selectGame)
    showGameData.append(showData)

    let gameDataDiv = document.createElement("div")
    gameDataDiv.classList.add('d-flex', 'flex-column', 'align-items-center')
    gameDataDiv.classList.add("gameData")

    let gameSection = document.createElement("div")
    gameSection.append(scoresTitle, showGameData, gameDataDiv)

    let playerTitle = document.createElement("h3")
    playerTitle.textContent = "ANÁLISIS DE PUNTUACION POR JUGADOR"

    let selectGamePlayer = document.createElement("select")
    selectGamePlayer.classList.add("metricsSelect", "playerGameMetrics")

    let selectPlayer = document.createElement("select")
    selectPlayer.classList.add("metricsSelect", "ms-2", "playerMetric")
    selectGamePlayer.appendChild(createOption("1", 1, "1. BOSQUE DE LA SUMA"));
    selectGamePlayer.appendChild(createOption("2", 2, "2. EL DESIERTO AVANZADO"));
    selectGamePlayer.appendChild(createOption("3", 3, "3. LAS MONTAÑAS GEOMÉTRICAS"));
    selectGamePlayer.appendChild(createOption("4", 4, "4. LA CIUDAD DEL SABER"));

    usuarios.forEach(user => {
        let option = document.createElement("option")
        option.dataset.id = user.id_user
        option.textContent = user.nom_usuario
        option.value = user.id_user
        selectPlayer.add(option)
    });

    let seePlayerData = document.createElement("button")
    seePlayerData.classList.add("ms-3", "metricsBtnScores")
    seePlayerData.textContent = "VER"

    let selectDiv = document.createElement("div")
    selectDiv.classList.add("d-flex", "align-items-center", "justify-content-center")
    selectDiv.append(selectGamePlayer, selectPlayer, seePlayerData)

    let playerDataDiv = document.createElement("div")
    playerDataDiv.classList.add("playerData")

    let playerInfoDiv = document.createElement("div")
    playerInfoDiv.classList.add("ms-5")
    playerInfoDiv.append(playerTitle, selectDiv, playerDataDiv)

    let div = document.createElement("div")
    div.classList.add("d-flex")
    div.append(gameSection, playerInfoDiv)

    dataDiv.append(div)
    
    showData.addEventListener('click', loadGameMetrics)
    seePlayerData.addEventListener('click', loadPlayerGameMetrics)
}

async function loadGameMetrics() {
    let dataContainer = document.querySelector('.gameData')
    dataContainer.innerHTML = ""

    let loading = document.createElement('p')
    loading.textContent = "Cargando..."
    loading.classList.add("test")
    dataContainer.append(loading)

    let game = document.querySelector('.metricsSelect').value

    async function pyTest() {
        let pyodide = await loadPyodide();
        await pyodide.loadPackage("numpy");
        await pyodide.loadPackage("pandas");
        await pyodide.loadPackage("matplotlib");

        const puntuacionesPy = pyodide.toPy(puntuaciones);
        pyodide.globals.set("puntuaciones", puntuacionesPy);

        const gamePy = pyodide.toPy(game);
        pyodide.globals.set("game_id", gamePy);

        await pyodide.runPythonAsync(`
        from js import document
        import numpy as np
        import pandas as pd
        import matplotlib.pyplot as plt
        import io, base64

        dataDiv = document.querySelector('.dataShown')

        text = document.querySelector('.test')
        text.remove()

        df = pd.DataFrame(puntuaciones)  
        data_scores = df.dropna()

        game_scores =  data_scores[data_scores['id_game'] == game_id]
        avg_score = game_scores['puntos'].astype(int).mean()
        avg_lifes = game_scores['vidas'].astype(int).mean()
        avg_errors = game_scores['errores'].astype(int).mean()

        fig, ax = plt.subplots(figsize=(12,6))
        ax.bar(['VIDAS'], avg_lifes, color='skyblue')
        ax.bar(['ERRORES'], avg_errors, color='skyblue')

        ax.set_ylabel('CANTIDAD')
        ax.set_title('MEDIA DE DATOS')

        plt.ylim((0,20))
        plt.tight_layout()

        buf = io.BytesIO()
        plt.savefig(buf, format="png")
        buf.seek(0)
        img_base64 = base64.b64encode(buf.read()).decode("utf-8")

        img = document.createElement("img")
        img.src = "data:image/png;base64," + img_base64
        img.style.width = "500px"
        img.style.display = "block"
        img.style.margin = "20px auto"

        puntos = document.createElement('h4')
        puntos.textContent = "PUNTOS: " + str(avg_score)

        gameDataDiv = document.querySelector(".gameData")
        gameDataDiv.append(img)
        gameDataDiv.append(puntos)
        
        `)
    }

    pyTest();
}

async function loadPlayerGameMetrics() {
    let dataContainer = document.querySelector('.playerData')
    dataContainer.innerHTML = ""

    let loading = document.createElement('p')
    loading.textContent = "Cargando..."
    loading.classList.add("test")
    dataContainer.append(loading)

    let game_player = document.querySelector('.playerGameMetrics').value
    let player = document.querySelector('.playerMetric').value

    async function pyTest() {
        let pyodide = await loadPyodide();
        await pyodide.loadPackage("numpy");
        await pyodide.loadPackage("pandas");
        await pyodide.loadPackage("matplotlib");

        const puntuacionesPy = pyodide.toPy(puntuaciones);
        pyodide.globals.set("puntuaciones", puntuacionesPy);

        const gamePy = pyodide.toPy(game_player);
        pyodide.globals.set("game_id", gamePy);

        console.log(player)
        const playerPy = pyodide.toPy(player);
        pyodide.globals.set("player_id", playerPy);

        await pyodide.runPythonAsync(`
        from js import document
        import numpy as np
        import pandas as pd

        dataDiv = document.querySelector('.dataShown')

        text = document.querySelector('.test')
        text.remove()

        df = pd.DataFrame(puntuaciones)
        data_scores = df.dropna()

        scores_player = data_scores[data_scores['id_game'] == game_id]
        scores_player_game = scores_player[scores_player['id_user'] == player_id]

        playerDataDiv = document.querySelector('.playerData')

        if not scores_player_game.empty:
            lifes = scores_player_game['vidas'].iloc[0]
            errors = scores_player_game['errores'].iloc[0]
            puntos_val = scores_player_game['puntos'].iloc[0]
            vidas = document.createElement('h4')
            vidas.textContent = "VIDAS: " + str(lifes)
            errores = document.createElement('h4')
            errores.textContent = "ERRORES: " + str(errors)
            puntos = document.createElement('h4')
            puntos.textContent = "PUNTOS: " + str(puntos_val)
            playerDataDiv.append(vidas, errores, puntos)
        else:
            nodata = document.createElement('h4')
            nodata.textContent = "No hay datos de puntuación registrados."
            playerDataDiv.append(nodata)
        
        `)
    }

    pyTest();
}

async function loadPrediction() {
    let dataContainer = document.querySelector('.dataShown')
    dataContainer.innerHTML = ""

    let loading = document.createElement('p')
    loading.textContent = "Cargando..."
    loading.classList.add("test")
    dataContainer.append(loading)

    async function pyTest() {
        let pyodide = await loadPyodide();
        await pyodide.loadPackage("numpy");
        await pyodide.loadPackage("pandas");
        await pyodide.loadPackage("matplotlib");
        await pyodide.loadPackage("scikit-learn");

        const puntuacionesPy = pyodide.toPy(puntuaciones);
        pyodide.globals.set("puntuaciones", puntuacionesPy);

        const playersPy = pyodide.toPy(usuarios);
        pyodide.globals.set("players", playersPy);

        await pyodide.runPythonAsync(`
        from js import document
        import numpy as np
        import pandas as pd
        import matplotlib.pyplot as plt
        from sklearn.tree import DecisionTreeClassifier, plot_tree
        from sklearn.model_selection import train_test_split
        import io, base64

        dataDiv = document.querySelector('.dataShown')

        text = document.querySelector('.test')
        text.remove()

        df_scores = pd.DataFrame(puntuaciones)
        df_users = pd.DataFrame(players)

        df_scores["id_user"] = df_scores["id_user"].astype(int)
        df_users["id_user"] = df_users["id_user"].astype(int)   

        df_data = pd.merge(df_scores, df_users, on="id_user")
        df_data = df_data[['puntos', 'vidas', 'errores', 'returning_player']]
        df_data = df_data.dropna()

        x = df_data[['puntos', 'vidas', 'errores']]
        y = df_data[['returning_player']]
        features = ['puntos', 'vidas', 'errores']

        x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

        clf = DecisionTreeClassifier(max_depth=3, random_state=0)
        clf.fit(x_train, y_train)
        error_test = 1-clf.score(x_test, y_test)
        print(error_test)

        plt.figure(figsize=(12,8))
        plot_tree(clf, feature_names=features,class_names=['Returning Player', 'Leaver Player'], filled=True)

        buf = io.BytesIO()
        plt.savefig(buf, format="png")
        buf.seek(0)
        img_base64 = base64.b64encode(buf.read()).decode("utf-8")

        img = document.createElement("img")
        img.src = "data:image/png;base64," + img_base64
        img.style.width = "500px"
        img.style.display = "block"
        img.style.margin = "20px auto"

        title = document.createElement('h3')
        title.textContent = "PREDICCIÓN DE VUELTA/ABANDONO DE USUARIOS SEGÚN PUNTOS, VIDAS Y ERRORES"
        dataDiv.append(title)

        imageDiv = document.createElement("div")
        imageDiv.classList.add("d-flex", "align-items-center", "justify-content-center")
        dataDiv.append(imageDiv)
        imageDiv.append(img)

        valores_importancia = clf.feature_importances_
        nombres_valores = x.columns

        plt.clf()

        plt.figure(figsize=(6,4))
        plt.bar(nombres_valores, valores_importancia, color="skyblue")
        plt.xlabel("Variables")
        plt.ylabel("Importancia")
        plt.title("Importancia de las variables")
        
        buf = io.BytesIO()
        plt.savefig(buf, format="png")
        buf.seek(0)
        imgimportance_base64 = base64.b64encode(buf.read()).decode("utf-8")

        imgimportance = document.createElement("img")
        imgimportance.src = "data:image/png;base64," + imgimportance_base64
        imgimportance.style.width = "500px"
        imgimportance.style.display = "block"
        imgimportance.style.margin = "20px auto"
        imgimportance.classList.add("ms-3")
        imageDiv.append(imgimportance)

        errorText = document.createElement('h3')
        errorText.textContent = "El error del modelo es de: " + str(error_test)

        dataDiv.append(errorText)
        `)
    }

    pyTest();
}

function createOption(value, level, text) {
    let option = document.createElement("option");
    option.value = value;
    option.dataset.level = level;
    option.textContent = text;
    return option;
}