@extends('Templates.navbar')

@section('window_link')
    <img src={{ asset("images/leaderboard_icon.png") }} alt="leaderboard" width="55" height="50"
        class="d-inline-block align-text-center">
    <span class="ms-2" style="font-family: VT323; font-size: 30px">Niveles</span>
@endsection

@section('user')
    <div class="d-flex align-items-center gap-3 ">
        <img src={{ asset("images/zero_icon.png")}} alt="User Icon" width="65" height="60"
            class="d-inline-block align-text-center">
        <span class="text-white" style="font-family: VT323; font-size: 30px">MAX VIDAL</span>
        <a class="ms-2">
            <img src={{ asset("images/exit.png")}} alt="Logout" width="50" height="50"
                class="d-inline-block align-text-center">
        </a>
    </div>
@endsection


@section('content')

    @php
        $juego2 = $juegos->find(2);

    @endphp


    <div class="background-level-container2 d-flex justify-content-center align-items-center py-4">
        <div class="level-box container p-4">

            <div class="level-title-section d-flex align-items-center mb-4">
                <img src={{ asset("images/gemas/gema_2.png")}} alt="cristal piramide" class="title-icon me-3">
                <h2 class="m-0 text-white" style="font-family: VT323; font-size: 28px;">
                    NIVEL {{$juego2->id_game }} | {{ $juego2->nombre_juego }}
                </h2>
            </div>

            <div class="row contenido_introduccion">
                <div class="col-12 col-lg-7 text-content text-white">

                    <p class="description mb-4" style="font-family: 'VT323'; font-size: 25px;">
                        {{ $juego2->descripcion }}
                    </p>
                    <h3 class="mt-4 mb-2 text-white" style="font-family: 'VT323'; font-size: 30px;">INSTRUCCIONES</h3>
                    <blockquote class="instructions-quote p-3" style="font-size: 23px;">
                        {{ $juego2->instrucciones }}
                    </blockquote>
                </div>

                <div class="col-12 col-lg-5 d-flex flex-column align-items-end image-action-container mt-4 mt-lg-0">

                    <div class="level-image-container w-100 mb-4">
                        <img src={{ asset("images/level_2.png")}} alt="Piramide pixel" class="img-fluid d-block">
                    </div>
                    <div class="action-buttons d-flex gap-3 w-100 justify-content-end">
                        <button class=" btn-orange">COMENZAR</button>
                        <button class="btn-red">ATRÁS</button>
                    </div>
                </div>

            </div>

        </div>
    </div>

@endsection