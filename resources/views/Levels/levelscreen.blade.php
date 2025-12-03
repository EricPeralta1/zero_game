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
        <img src="{{asset('images/zero_icon.png')}}" alt="User Icon" width="65" height="60"
            class="d-inline-block align-text-center">
        <span class="text-white" style="font-family: VT323; font-size: 30px">{{ Auth::user()->nom_usuario }}</span>
        <a class="ms-2" href="{{ route('logout') }}">
            <img src="{{asset('images/exit.png')}}" alt="Logout" width="50" height="50"
                class="d-inline-block align-text-center">
        </a>
    </div>
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
    @php
        $juego1 = $juegos->find(1);
    @endphp
    <div class="d-flex align-items-center mapbackground levelview">
        <div class="levelCard">
            <h3 class="levelTitle">NIVEL {{ $juego1->id_game }} | {{ $juego1->nombre_juego }}</h3>
            <hr style="height:2px;border-width:0;color:rgb(0, 0, 0);background-color:rgb(0, 0, 0)">
            <div>
                <img src="images/level_1.png" alt="Map" height="300" width="600" class="levelImg">
            </div>
            <p class="levelDesc">{{ $juego1->descripcion }}</p>
            <div class="d-flex justify-content-center align-items-center">
                <p class="levelScore">HIGHSCORE: {{ $lvl1Score }}p</p>
                <button class="playButton">COMENZAR</button>
            </div>
            <div class="d-flex justify-content-center align-items-center">
                <p class="ms-2 lvlNum active" style="font-size: 40px" data-level="1" id="lvl1">1</a>
                <p class="ms-2 lvlNum" style="font-size: 40px" data-level="2" id="lvl2">2</a>
                <p class="ms-2 lvlNum" style="font-size: 40px" data-level="3" id="lvl3">3</a>
                <p class="ms-2 lvlNum" style="font-size: 40px" data-level="4" id="lvl4">4</a>
            </div>
        </div>
    </div>


    <script>
        const juegos = @json($juegos);
        const userScores = @json($userScores)
    </script>
    <script src="js/levels.js"></script>
@endsection
