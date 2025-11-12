<style>
    /* GLOBAL CONFIG */
    @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

    .vt323-regular {
        font-family: "VT323", monospace;
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pixeloid';
        src: url('../fonts/pixeloid.sans-bold.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    :root {
        --color-violet: #220F37;
        --color-orange: #F64A00;
        --color-white: #ffffff;
        --color-black: #000;
    }

    * {

        padding: 0;
        margin: 0;
    }

    body {
        background: var(--color-violet)
    }

    h1,
    h2,
    h3 {
        font-family: 'Pixeloid', sans-serif;
        color: var(--color-white);
        text-align: center;
    }

    h2 {
        margin: 40px 0;
    }

    h3 {
        color: var(--color-orange);
        text-align: center;
    }

    p,
    a,
    label,
    ul {
        font-family: "VT323", monospace;
        color: var(--color-white);
        font-size: 1.3rem;
    }

    a {
        text-decoration: none;
    }

    img {
        width: 100px;
    }

    ul {
        list-style: none;
    }

    form,
    button {
        background-color: var(--color-orange);
        color: var(--color-white)
    }

    /* NAVBAR */
    nav {
        width: 100%;
        display: flex;
        align-content: center;
        justify-content: center;
        position: fixed;
    }

    nav>div {
        width: 100%;
        max-width: 1200px;
        padding: 10px 20px;

        display: flex;
        align-content: center;
        gap: 20px;
    }

    nav>div>img {
        width: 120px;
        height: auto;
    }

    nav>div a {
        margin-top: auto;
        margin-bottom: auto;
        font-size: 1.8rem;
    }

    nav>div a:nth-child(2) {
        margin-left: auto;
    }

    nav>div select {
        margin-top: auto;
        margin-bottom: auto;
        height: max-content;
        font-family: 'VT323';
        font-size: 1.5rem;
    }

    /* HERO */
    #inicio {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        height: 100%;
        width: 100%;
        width: auto;

        display: flex;
        justify-content: center;
        align-content: center;
    }

    #inicio>div {
        display: flex;
        flex-direction: column;
        max-width: 1200px;

        justify-content: start;
        align-content: center;
        margin: auto 0 auto 0
    }

    #inicio>div>h1 {
        font-size: 3rem;
        text-align: start;
    }

    #inicio>div>button {
        cursor: pointer;
        max-width: 300px;
        padding: 15px 60px;
        font-size: 1.5rem;
        border: 5px solid black;
        font-family: 'Pixeloid', sans-serif;

        transition: all 400ms;
    }

    #inicio>div>button:hover {
        background: #c53b00;
    }

    #inicio img,
    #inicio button {
        margin-left: auto;
        margin-right: auto;
    }

    #inicio img {
        width: 200px;
        height: auto;
        z-index: 100;
    }

    /* MAIN */
    main {
        display: flex;
        justify-content: center;
    }

    main>div {
        max-width: 1200px;
        width: 100%;
        padding: 20px
    }

    /* STORY SECTION */
    #historia>div {
        display: flex;
        justify-content: center;
        align-content: center;
        gap: 20px;
        margin: 50px 0;
    }

    #historia>div>img {
        height: 100px;
        width: auto;
    }

    /* LEVELS SECTION*/
    #niveles {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    #niveles>div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        margin: 0 0 80px 0;
    }

    #niveles>div>img {
        width: 100%;
        max-width: 1100px;
        height: auto;
        margin: 0 auto 0 auto;
    }

    #niveles>div:nth-child(2)>img {
        width: 100%;
        max-width: 800px;
        height: auto;
    }

    #niveles>div>img:last-child {
        margin: 0 auto 40px auto;
    }

    #niveles>div>h3 {
        margin: 0;
        font-size: 1.5rem;
    }

    /* RANKING SECTION */
    #ranking {
        text-align: center;
    }

    #ranking img {
        width: 100%;
        max-width: 800px;
    }

    /* TEAM SECTION */
    #equipo {
        display: flex;
        flex-direction: column;
    }

    #equipo>div {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        max-width: fit-content;
        margin: 0 auto;
        gap: 20px;
        padding: 20px;
    }

    .card-team {
        background-color: var(--color-black);

        max-width: fit-content;
        padding: 30px;
        text-align: center;

        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .card-team img {
        width: 100%;
        max-width: 200px;
        margin: 0 auto;
    }

    .card-team>p:nth-child(2) {
        font-family: 'Pixeloid', sans-serif;
        font-size: 1rem;
    }

    /* CONTACT FORM */
    #contacto>form {
        display: flex;
        flex-direction: column;
    }

    @media (max-width: 600px) {
        #inicio {
            height: 60dvh;
        }
    }
</style>

<body>
    <header>
        <nav>
            <div>
                <img src="{{ asset('images/landingPage/zero_logo_nobg.png') }}" alt="zero logo">

                @foreach ($texts['navbar'] as $item)
                    <a href="#">{{ $item }}</a>
                @endforeach


                <select name="language" id="select-language">
                    @php
                        $languages = ['es', 'ca', 'en'];
                    @endphp
                    @foreach ($languages as $language)
                        <option value="{{ $language }}" @if ($language === $lang) selected @endif>
                            {{ Str::upper($language) }}</option>
                    @endforeach
                </select>
            </div>
        </nav>
        <div id="inicio" style="background-image:url({{ asset('images/landingPage/hero_img.png') }})">
            <div>
                <h1>{{ $texts['hero_title'] }}</h1>
                <img src="{{ asset('images/landingPage/zero_fight.png') }}" alt="zero character">
                <button>{{ $texts['hero_btn'] }}</button>
            </div>
        </div>
    </header>
    <main>
        <div>

            <section id="historia">
                <h2>{{ $texts['story_section']['title'] }}</h2>
                {!! $texts['story_section']['text'][0] !!}

                <div>
                    <img src="{{ asset('images/gemas/gema_1.png') }}" alt="cristal 1" class="gema">
                    <img src="{{ asset('images/gemas/gema_2.png') }}" alt="cristal 2" class="gema">
                    <img src="{{ asset('images/gemas/gema_3.png') }}" alt="cristal 3" class="gema">
                    <img src="{{ asset('images/gemas/gema_4.png') }}" alt="cristal 4" class="gema">
                </div>

                {!! $texts['story_section']['text'][1] !!}
            </section>
            <section id="niveles">
                <h2>{{ $texts['levels_section']['title'] }}</h2>
                <div>
                    <h3>{{ $texts['levels_section']['lvl_titles'][0] }}</h3>
                    <img src="{{ asset('images/landingPage/landing_lvl1.png') }}" alt="Pueblo digito">
                </div>
                <div>
                    <h3>{{ $texts['levels_section']['lvl_titles'][1] }}</h3>
                    <img src="{{ asset('images/landingPage/landing_lvl_blocked.png') }}" alt="El Desierto Avanzado">

                </div>
                <div>
                    <h3>{{ $texts['levels_section']['lvl_titles'][2] }}</h3>
                    <img src="{{ asset('images/landingPage/landing_lvl_blocked.png') }}"
                        alt="Las Montañas Geométricas">

                </div>
                <div>
                    <h3>{{ $texts['levels_section']['lvl_titles'][3] }}</h3>
                    <img src="{{ asset('images/landingPage/landing_lvl_blocked.png') }}" alt="La Ciudad del Saber">
                </div>
            </section>
            <section id="ranking">
                <h2>{{ $texts['ranking_section']['title'] }}</h2>
                <img src="{{ asset('images/landingPage/landing_ranking.png') }}" alt="Ejemplo ranking">
            </section>
            <section id="equipo">
                <h2>{{ $texts['team_section']['title'] }}</h2>
                <div>
                    <div class="card-team">
                        <img src="{{ asset('images/landingPage/default_avatar.jpg') }}" alt="Ferdinand">
                        <p>Ferdinand Pinto</p>
                        <p>{{ $texts['team_section']['team']['max']['role'] }}</p>
                        <p>{{ $texts['team_section']['team']['tasks_title'] }}</p>
                    </div>
                    <div class="card-team">
                        <img src="{{ asset('images/landingPage/default_avatar.jpg') }}" alt="Eric">
                        <p>Eric Peralta</p>
                        <p>{{ $texts['team_section']['team']['max']['role'] }}</p>
                        <p>{{ $texts['team_section']['team']['tasks_title'] }}</p>
                    </div>
                    <div class="card-team">
                        <img src="{{ asset('images/landingPage/default_avatar.jpg') }}" alt="Brian">
                        <p>Brian</p>
                        <p>{{ $texts['team_section']['team']['max']['role'] }}</p>
                        <p>{{ $texts['team_section']['team']['tasks_title'] }}</p>
                    </div>
                    <div class="card-team">
                        <img src="{{ asset('images/landingPage/default_avatar.jpg') }}" alt="Max">
                        <p>Max Vidal</p>
                        <p>{{ $texts['team_section']['team']['max']['role'] }}</p>
                        <p>{{ $texts['team_section']['team']['tasks_title'] }}</p>
                    </div>
                </div>
            </section>
            <section id="contacto">
                <h2>{{ $texts['contact_section']['title'] }}</h2>
                <form action="">
                    <label for="name">{{ $texts['contact_section']['form_labels'][0] }}</label>
                    <input type="text" name="name" id="name">

                    <label for="email">{{ $texts['contact_section']['form_labels'][1] }}</label>
                    <input type="email" name="email" id="email">

                    <label for="message">{{ $texts['contact_section']['form_labels'][2] }}</label>
                    <textarea name="message" id="message"></textarea>

                    <button type="submit">{{ $texts['contact_section']['form_labels'][3] }}</button>
                </form>
            </section>
        </div>
    </main>
    <footer>
        <div>
            <div>
                <img src="{{ asset('images/landingPage/zero_logo_og.png') }}" alt="Zero logo">
                <ul>
                    @foreach ($texts['navbar'] as $item)
                        <li><a href="#">{{ $item }}</a></li>
                    @endforeach
                </ul>
            </div>
            <p>{{ $texts['footer_section']['copyright'] }}</p>
        </div>
    </footer>
</body>

</html>
<script>
    const selectLanguage = document.getElementById("select-language");
    selectLanguage.addEventListener("change", function() {
        window.location.href = `./${selectLanguage.value}`
    })
</script>
