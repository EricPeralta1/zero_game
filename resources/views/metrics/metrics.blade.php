@extends('Templates.navbar')

@section('window_link')
    <a class="d-flex align-items-center navbar_style" href="{{ route('score.index') }}">
        <img src="images/leaderboard_icon.png" alt="leaderboard" width="55" height="50"
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
    <div class="d-flex lbbackground align-items-center justify-content-center" style="font-family: VT323">
        <div class="d-flex flex-column border border-dark rounded-3 bg-secondary p-4 ms-5" style="font-family: VT323">
        <button class="metricsButton gameBtn">JUEGOS</button>
        <button class="metricsButton scoreBtn">PUNTUACIONES</button>
        <button class="metricsButton userBtn">JUGADORES</button>
        <button class="metricsButton predBtn">PREDDICCIÓN</button>
        </div>
        <div class="ms-5 bg-secondary dataShown text-white p-5 align-items-center border border-dark rounded-3" style="font-size: 30px">
            <p class="test">PRESIONA UN BOTÓN PARA EMPEZAR</p>
        </div>
    </div>

     <script>
        const usuarios = @json($usuarios);
        const puntuaciones = @json($puntuaciones);
        const sesiones = @json($sessiones);
    </script>
    <script src="js/metrics.js"></script>
@endsection