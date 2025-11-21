@extends('Templates.navbar')

@section('window_link')
    <img src="{{asset('images/leaderboard_icon.png')}}" alt="leaderboard" width="55" height="50"
        class="d-inline-block align-text-center">
    <span class="ms-2" style="font-family: VT323; font-size: 30px">Niveles</span>
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

   @section('content')


<div class="game-over-screen d-flex align-items-center justify-content-center" 
     style="background-color: rgba(0, 0, 0, 0.7);">

    {{-- 2. EL CUADRO DE DERROTA --}}
    <div class="defeat-container justify-content-center text-center p-4 rounded shadow-lg" 
         style="background-color: #6C757D; border: 2px solid #495057; max-width: 500px; width: 90%;"> 

        {{-- Título --}}
        <h2 class="text-white mb-4" style="font-family: 'Press Start 2P', cursive; font-size: 24px;">
            ZERO FUE DERROTADO...
        </h2>

        {{-- Imagen --}}
        <div class="image-wrapper mb-4" style="border: 1px solid #495057; padding: 5px; background-color: #343A40;">
            <img src="{{ asset('images/zero_defeat_forest.png') }}"
                alt="Zero Derrotado" 
                class="img-fluid" 
                style="max-height: 200px; object-fit: cover;">
        </div>

        {{-- Botones --}}
        <div class="d-flex justify-content-center gap-3 mt-4">
            <button class="btn btn-warning btn-lg" 
                    style="font-family: 'Press Start 2P', cursive; background-color: #fd7e14; border-color: #e66a00; color: white;">
                CONTINUAR?
            </button>
            <button class="btn btn-danger btn-lg" 
                    style="font-family: 'Press Start 2P', cursive; background-color: #dc3545; border-color: #bd2130; color: white;">
                ABANDONAR
            </button>
        </div>
    </div>
</div>

<style>
    

    .game-over-screen {
        /* PROPIEDADES CLAVE PARA CENTRADO Y SUPERPOSICIÓN */
        height: 100vh; /* Ocupa el 100% de la altura de la ventana */
        position: fixed; /* Lo fija en la posición de la ventana, no del documento */
        top: 0;
        left: 0;
        width: 100%;
        z-index: 9999; /* Asegura que esté por encima de todo */
        /* d-flex, align-items-center, justify-content-center se encarga del centrado */
    }

    /* Estilos para el texto de los botones si no se sobrescriben por Bootstrap */
    .btn {
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5); 
        padding: 10px 20px;
        min-width: 150px; 
        text-transform: uppercase;
    }
</style>

@endsection