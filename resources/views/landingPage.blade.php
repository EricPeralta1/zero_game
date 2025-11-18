<html lang="{{ $lang }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ZERO</title>
    <link rel="stylesheet" href="{{ asset('css/landingPage.css') }}">
</head>

<body>
    <header>
        <nav>
            <div>
                <img src="{{ asset('images/landingPage/zero_logo_nobg.png') }}" alt="zero logo">
                @php
                    $sectionIds = ['inicio', 'historia', 'niveles', 'ranking', 'equipo', 'perfil'];
                @endphp
                <div>
                    @foreach ($texts['navbar'] as $index => $item)
                        <a href="#{{ $sectionIds[$index] }}">{{ $item }}</a>
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
            </div>
        </nav>
        <div id="inicio" style="background-image:url({{ asset('images/landingPage/hero_img.png') }})">
            <div>
                <h1>{{ $texts['hero_title'] }}</h1>
                <img src="{{ asset('images/landingPage/zero_fight.png') }}" alt="zero character">
                @php
                    $user = Auth::user();
                    if ($user) {
                        $route = '/levels';
                    } else {
                        $route = 'templates.Registro';
                    }
                @endphp
                <a href="{{ route($route) }}"><button id="play-now-btn">{{ $texts['hero_btn'] }}</button></a>
            </div>
            <span id="#faded-bg"></span>
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
                <div class="levels-container">
                    <div>
                        <img src="{{ asset('images/landingPage/map.png') }}" alt="Map">
                    </div>
                    <div>
                        <h3>{{ $texts['levels_section']['lvl_titles'][0] }}</h3>
                        <img src="{{ asset('images/landingPage/landing_lvl1.png') }}" alt="Pueblo digito">
                    </div>
                    <div>
                        <h3>{{ $texts['levels_section']['lvl_titles'][1] }}</h3>
                        <img src="{{ asset('images/landingPage/landing_lvl_blocked.png') }}"
                            alt="El Desierto Avanzado">

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
                    <div>
                        <label for="name">{{ $texts['contact_section']['form_labels'][0] }}*</label>
                        <input type="text" name="name" id="name" required maxlength="255">

                        <label for="email">{{ $texts['contact_section']['form_labels'][1] }}*</label>
                        <input type="email" name="email" id="email" required maxlength="255">

                        <label for="message">{{ $texts['contact_section']['form_labels'][2] }}*</label>
                        <textarea name="message" id="message" maxlength="500"></textarea>

                        <button type="submit"
                            id="submit-contact">{{ $texts['contact_section']['form_labels'][3] }}</button>
                    </div>
                </form>
            </section>

        </div>
    </main>
    <footer>
        <div>
            <div>
                <img src="{{ asset('images/landingPage/zero_logo_og.png') }}" alt="Zero logo">
                <ul>
                    @php
                        $sectionIds = ['inicio', 'historia', 'niveles', 'ranking', 'equipo', 'perfil'];
                    @endphp
                    @foreach ($texts['navbar'] as $index => $item)
                        <li><a href="#{{ $sectionIds[$index] }}">{{ $item }}</a></li>
                    @endforeach
                </ul>
            </div>
            <p>{{ $texts['footer_section']['copyright'] }}</p>
        </div>
    </footer>
</body>

</html>
<script src="{{ asset('js/landingPage.js') }}"></script>
