@extends('Templates.navbar')

@section('window_link')
    <a class="d-flex align-items-center navbar_style" href="{{ route('score.index') }}">
        <img src="{{ asset('images/leaderboard_icon.png') }}" alt="leaderboard" width="55" height="50"
            class="d-inline-block align-text-center">
        <span class="ms-2" style="font-family: VT323; font-size: 30px">CLASIFICACIÓN</span>
    </a>
@endsection

@section('user')
    <div class="d-flex align-items-center gap-3 ">
        <img src="{{ asset('images/zero_icon.png') }}" alt="User Icon" width="65" height="60"
            class="d-inline-block align-text-center">
        <span class="text-white" style="font-family: VT323; font-size: 30px">{{ Auth::user()->nom_usuario }} </span>
        <a class="ms-2" href="{{ route('logout') }}">
            <img src="{{ asset('images/exit.png') }}" alt="Logout" width="50" height="50"
                class="d-inline-block align-text-center">
        </a>
    </div>
@endsection

@section('content')
    <div class="d-flex align-items-center justify-content-center level3background">
        <div class="gameContainer">
            <div class="d-flex align-items-center levelT">
                <img src="{{ asset('images/gemas/gema_3.png') }}" alt="GEM3" width="50" height="50"
                    class="d-inline-block align-text-center" style="image-rendering: pixelated">
                <h2 class="ms-3">NIVEL 3 | LAS MONTAÑAS GEOMÉTRICAS</h2>
            </div>
            <div class="d-flex gameData">
                <div class="gameInfo w-25">
                    <p>"Zero ha obtenido 2 de las 4 gemas. Su aventura lo lleva hasta las Montañas Geométricas. Deberá encontrar el camino hasta la cima sin perderse, siguiendo piedras guía.”</p>
                    <h3>INSTRUCCIONES</h3>
                    <hr style="margin-top: 0px">
                    <p> Al comenzar cada ronda, aparecerá una pregunta a la izquierda. Encuentra la respuesta correcta en el panel inferior derecho.
                        Si lo haces bien, no perderás ninguna vida. Tras acertar o fallar, deberás completar un pequeño minijuego.
                        En este, aparecerán teclas con letras. Clica la tecla adecudada según vayan apareciendo.
                        Las teclas desaparecen tras un corto periodo, pero no hay penalización. ¡Consigue todos los puntos que puedas!
                    </p>
                    <div class="d-flex justify-content-evenly">
                        <button class="startGame">COMENZAR</button>
                        <button class="goback ms-2" data-url="{{ route('levels.index') }}">ATRAS</button>
                    </div>
                </div>
                <div class="gameImage">
                    <img src="{{ asset('images/level_3.png') }}" alt="GEM3" width="700" height="400"
                        class="d-inline-block align-text-center" style="border-style: solid; border-radius: 5px; border-color: #000">
                </div>
            </div>
        </div>
    </div>
    <script>
        const defeatLvl = "{{ asset('images/zero_defeat_lvl3.png') }}";
        const winImgLvl = "{{ asset('images/zero_win3.png') }}";
        const levelRt = "{{ route('levels.index') }}";
        const playerIdleImg = "{{ asset('images/zero_icon.png') }}";
        const playerHp = "{{ asset('images/zero_hp.png') }}";
        const playerFailImg = "{{ asset('images/zero_gameover.png') }}";
        const fallWord = "{{ asset('images/falling_word.png') }}";
    </script>
    <script src="{{ asset('js/level3.js') }}"></script>
@endsection
