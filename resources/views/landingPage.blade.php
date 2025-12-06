<html lang="{{ $lang }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/x-icon" href="{{ asset('images/zero_icon.png') }}">
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
                    @if (Auth::check() && Auth::user()->id_rol == 3)
                        <a href="{{ route('superadmin.config') }}"><svg class="w-6 h-6 text-gray-800 dark:text-white"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd"
                                    d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </a>
                    @endif
                    @if ((Auth::check() && Auth::user()->id_rol == 3) || (Auth::check() && Auth::user()->id_rol == 2))
                        <a href="{{ route('admin.stats') }}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                class="s-icon s-icon-icon-stats" viewBox="0 0 16 16">
                                <path
                                    d="M8 14c-.4 0-.667-.267-.667-.667V6.667C7.333 6.267 7.6 6 8 6s.667.267.667.667v6.666c0 .4-.267.667-.667.667Zm4.667-.667V2.667c0-.4-.267-.667-.667-.667s-.666.267-.666.667v10.666c0 .4.266.667.666.667s.667-.267.667-.667Zm-8 0v-2.666c0-.4-.267-.667-.667-.667s-.667.267-.667.667v2.666c0 .4.267.667.667.667s.667-.267.667-.667Z" />
                            </svg>
                        </a>
                    @endif
                </div>
            </div>
        </nav>
        <div id="inicio" style="background-image:url({{ asset('images/landingPage/hero_img.png') }})">
            <div>
                <h1>{{ $texts['hero_title'] }}</h1>
                <img src="{{ asset('images/landingPage/zero_fight.png') }}" alt="zero character">
                @php
                    if (Auth::user()) {
                        $route = route('levels.index');
                    } else {
                        $route = route('templates.Registro');
                    }
                @endphp
                <a href="{{ $route }}"><button id="play-now-btn">{{ $texts['hero_btn'] }}</button></a>
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
