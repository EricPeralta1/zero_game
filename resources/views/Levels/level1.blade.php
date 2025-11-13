@extends('Templates.navbar')

@section('window_link')
    <img src="images/leaderboard_icon.png" alt="leaderboard" width="55" height="50"
        class="d-inline-block align-text-center">
    <span class="ms-2" style="font-family: VT323; font-size: 30px">Niveles</span>
@endsection

@section('user')
    <div class="d-flex align-items-center gap-3 ">
        <img src="images/zero_icon.png" alt="User Icon" width="65" height="60"
            class="d-inline-block align-text-center">
        <span class="text-white" style="font-family: VT323; font-size: 30px">BRIAN PIGUAVE</span>
        <a class="ms-2">
            <img src="images/exit.png" alt="Logout" width="50" height="50"
                class="d-inline-block align-text-center">
        </a>
    </div>
@endsection


@section('content')
<div class="background-level-container d-flex justify-content-center align-items-center py-4">
    <div class="level-box container p-4">
        
        <div class="level-title-section d-flex align-items-center mb-4">
            {{-- IMAGEN DEL CRISTAL AHORA CON CLASE Y TAMAÑO --}}
            <img src="images/cristal_forest.png" alt="cristal bosque" class="title-icon me-3"> 
            <h2 class="m-0 text-white" style="font-family: VT323; font-size: 28px;">
                NIVEL 1 | BOSQUE DE LA SUMA
            </h2>
        </div>

        <div class="row contenido_introduccion"> 
            <div class="col-12 col-lg-7 text-content text-white">
                
                <p class="description mb-4" style="font-family: 'VT323'; font-size: 18px;">
                    En su búsqueda de los cristales, Zero se encuentra con una bosque en mitad del 
                    "Desierto Avanzado" y sabe que dentro hay un cristal.
                </p>
                {{-- Instrucciones --}}
                <h3 class="mt-4 mb-2 text-white" style="font-family: 'VT323'; font-size: 20px;">INSTRUCCIONES</h3>
                <blockquote class="instructions-quote p-3" style="font-size: 16px;">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua."
                </blockquote>
            </div>
            
            <div class="col-12 col-lg-5 d-flex flex-column align-items-end image-action-container mt-4 mt-lg-0">
                
                <div class="level-image-container w-100 mb-4">
                    <img src="images/forest_levelview.png" alt="Zero en el bosque" class="img-fluid d-block"> 
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