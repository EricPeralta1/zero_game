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
                    <p>“Zero llega al núcleo del laboratorio del Profesor Kaos.
                        Los Errores se han descontrolado y amenazan con romper la Energía Matemágica para siempre.
                        Para recuperar el último cristal, Zero deberá enfrentarse a Kaos y demostrar el dominio absoluto de
                        las matemáticas.”</p>

                    <h3>INSTRUCCIONES</h3>
                    <hr>
                    <p>"Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed
                        do eiusmod tempor
                        incididunt...”</p>
                </div>
                <div>
                    <img src="{{ asset('Images/level_4.png') }}" alt="Level 4">
                    <span>
                        <button>COMENZAR</button>
                        <a href="{{ route('levels.index') }}">ATRÁS</a>
                    </span>
                </div>
            </div>
            <div id="game-over-container" style="display: none">
                <h2>ZERO FUE DERROTADO...</h2>
                <img src="" alt="Zero dead">
                <span>
                    <button>REINTENTAR</button><button>ABANDONAR</button>
                </span>
            </div>
            <div id="game-win-container" style="display: none">
                <img src="" alt="Zero win">
                <div>
                    <p>¡FELICIDADES! ¡HAS DERROTADO A KAOS Y HAS CONSEGUIDO EL ÚLTIMO CRISTAL!</p>
                    <p>ESTADÍSTICAS</p>
                    <hr>
                    <p>Tiempo: 02:42s</p>
                    <p>Puntos: 5473p</p>
                    <button>CONTINUAR</button>
                </div>
            </div>
        </div>
        <div id="level-container" style="display: none">
            <span></span>
        </div>
    </div>
    <div id="game-complete-container" style="display: none">
        <div>
            <p>¡HAS RESTAURADO EL EQUILIBRIO EN PUEBLO DÍGITO!</p>
            <button>REGRESAR</button>
        </div>
    </div>
@endsection
