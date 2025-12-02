@extends('Templates.navbar')

@push('styles')
    <link rel="stylesheet" href="{{ asset('css/level4.css') }}">
@endpush

@section('window_link')
    <a class="d-flex align-items-center navbar_style" href="{{ route('score.index') }}">
        <img src="{{ asset('Images/leaderboard_icon.png') }}" alt="leaderboard" width="55" height="50"
            class="d-inline-block align-text-center">
        <span class="ms-2" style="font-family: VT323; font-size: 30px">CLASIFICACIÓN</span>
    </a>
@endsection

@section('content')
    <div id="game-container">
        <div id="overlay">
            <div id="instructions-container">
                <div>
                    <img src="{{ asset('Images/gemas/gema_4.png') }}" alt="Cristal 4">
                </div>
                <div>
                    <h2>NIVEL 4 | LA CIUDAD DEL SABER</h2>
                    <hr>
                    <p>Zero llega al núcleo del laboratorio del Profesor Kaos.
                        Los Errores se han descontrolado y amenazan con romper la Energía Matemágica para siempre.
                        Para recuperar el último cristal, Zero deberá enfrentarse a Kaos y demostrar el dominio absoluto de
                        las matemáticas.</p>

                    <h3 id="instructions-h3">INSTRUCCIONES</h3>
                    <hr>
                    <p>¡Los Errores avanzan hacia Zero!</p>
                    <p> Cada uno trae una operación matemática incompleta.</p>
                    <ul>
                        <img src="{{ asset('Images/error_example.png') }}" alt="Error example" id="error-example">
                        <li>Arrastra el símbolo correcto (+, –, × o ÷) al Error.</li>
                        <li>Suélta el símbolo sobre el Error para completar la operación.</li>
                        <li>Si aciertas, el Error se desvanece y KAOS pierde poder.</li>
                        <li>Si fallas, pierdes 5 puntos.</li>
                        <li>A partir del tercer acierto seguido, ganas más puntos y debilitas más rápido a Zero.</li>
                        <li>Si el Error llega hasta Zero, pierdes una vida y 10 puntos.</li>
                    </ul>
                    <h5>!COMPLETA LAS OPERACIONES PARA ACABAR CON KAOS!</h4>
                </div>
                <div>
                    <img src="{{ asset('Images/level_4.png') }}" alt="Level 4">
                    <span>
                        <button id="start-game-btn">COMENZAR</button>
                        <a href="{{ route('levels.index') }}">ATRÁS</a>
                    </span>
                </div>
            </div>
            <div id="game-over-container" style="display: none">
                <h2>ZERO FUE DERROTADO...</h2>
                <img src="{{ asset('Images/zero_defeat_lvl4.png') }}" alt="Zero dead">
                <span>
                    <button id="restart-btn">REINTENTAR</button>
                    <a href="{{ route('levels.index') }}">ABANDONAR</a>
                </span>
            </div>
            <div id="game-win-container" style="display: none">
                <img src="{{ asset('Images/level4_complete.png') }}" alt="Zero win">
                <div>
                    <p>¡FELICIDADES! ¡HAS DERROTADO A KAOS Y HAS CONSEGUIDO EL ÚLTIMO CRISTAL!</p>
                    <p>ESTADÍSTICAS</p>
                    <p id="time-win-text">Tiempo:</p>
                    <p id="score-win-text">Puntos:</p>
                    <button id="continue-btn">CONTINUAR</button>
                </div>
            </div>
        </div>
        <div id="level-container" style="display: none">
            <span>
                <span id="hp-container">
                </span>
                <span id="points-container">
                    <p id="points-text"></p>
                </span>
                <span id="time-container">
                    <p id="time-text"></p>
                </span>
            </span>
            <div>
                <img src="{{ asset('Images/zero_fight.png') }}" alt="Zero fighting pose" id="zero-fighting">
                <div>
                    <p draggable="true" data-symbol="+">+</p>
                    <p draggable="true" data-symbol="-">-</p>
                    <p draggable="true" data-symbol="x">x</p>
                    <p draggable="true" data-symbol="/">÷</p>
                </div>
                <div id="kaos-container">
                    <p id="kaos-hp"></p>
                    <img src="{{ asset('Images/Kaos.png') }}" alt="Kaos fighting pose" id="kaos-fighting">
                </div>
            </div>
        </div>
    </div>
    <div id="game-complete-container" style="display: none">
        <div>
            <p>¡HAS RESTAURADO EL EQUILIBRIO EN PUEBLO DÍGITO!</p>
            <a href="{{ route('levels.index') }}">REGRESAR</a>
        </div>
    </div>
    <script>
        const id_usuario = {{ Auth::id() }}
    </script>
    <script src="{{ asset('js/level4.js') }}"></script>
@endsection
