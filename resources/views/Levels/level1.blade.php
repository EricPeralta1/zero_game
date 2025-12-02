@extends('Templates.navbar')

@section('window_link')
<a class="ms-2 d-flex align-items-center navbar_style" href="{{ route('levels.index') }}">
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

<div id="main-content-area">

 @php
       $juego1 = $juegos->find(1);
       
   @endphp


<div class="background-level-container d-flex justify-content-center align-items-center py-4">
    <div class="level-box container p-4">
        <div class="level-title-section d-flex align-items-center mb-4">
            <img src="{{ asset('/images/gemas/gema_1.png') }}" alt="cristal bosque" class="title-icon me-3"> 
            <h2 class="m-0 text-white" style="font-family: VT323; font-size: 28px;">
                NIVEL {{$juego1->id_game }} | {{ $juego1->nombre_juego }}
            </h2>
        </div>

        <div class="row contenido_introduccion"> 
            <div class="col-12 col-lg-7 text-content text-white">
                
                <p class="description mb-4" style="font-family: 'VT323'; font-size: 18px;">
                    {{ $juego1->descripcion }}
                </p>
                <h3 class="mt-4 mb-2 text-white" style="font-family: 'VT323'; font-size: 20px;">INSTRUCCIONES</h3>
                <blockquote class="instructions-quote p-3" style="font-size: 16px;">
                  {{ $juego1->instrucciones }}
                </blockquote>
            </div>
            
            <div class="col-12 col-lg-5 d-flex flex-column align-items-end image-action-container mt-4 mt-lg-0">
                
                <div class="level-image-container w-100 mb-4">
                    <img src="{{asset('images/level_1.png')}}" alt="Zero en el bosque" class="img-fluid d-block"> 
                </div>
                <div class="action-buttons d-flex gap-3 w-100 justify-content-end">
                    <button class=" btn-orange" id="boton_comenzar" >COMENZAR</button>
                    <button class="btn-red" id="boton_atras" onclick= "history.back()" >ATRÁS</button>
                </div>
            </div>

        </div>
        
    </div>
</div>
</div>

<div id="dynamic-container">
        {{-- ¡Este div estará vacío inicialmente! --}}
    </div>
    <script>
        const DEFEAT_IMAGE_SRC = "{{ asset('images/zero_defeat_forest.png') }}";
        const ZERO_IMAGE_SRC = "{{ asset('images/zero_analize.png') }}";
        const VICTORY_IMAGE_SRC = "{{ asset('images/zero_win _forest.png') }}";
        const id_usuario = "{{ Auth::user()->id_user }}";
        const id_juego =1
        const levelRt = "{{ route('levels.index') }}";
    </script>
<script src="{{ asset('js/introduccion.js') }}"></script>
@endsection