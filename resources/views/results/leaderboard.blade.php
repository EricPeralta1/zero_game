@extends('Templates.navbar')

@section('window_link')
    <a class="ms-2 d-flex align-items-center navbar_style" href="{{ route('levels.index') }}">
        <img src="images/zero_fight.png" alt="leaderboard" width="40" height="50"
            class="d-inline-block align-text-center">
        <span class="ms-2" style="font-family: VT323; font-size: 30px">NIVELES</span>
    </a>
@endsection
@section('user')
    <div class="d-flex align-items-center gap-3 ">
        <img src="{{asset('images/zero_icon.png')}}" alt="User Icon" width="65" height="60"
            class="d-inline-block align-text-center">
        <span class="text-white" style="font-family: VT323; font-size: 30px">{{ Auth::user()->nom_usuario }}</span>
        <img src="images/exit.png" alt="Logout" width="50" height="50" class="d-inline-block align-text-center">
    </div>
@endsection
@section('content')
    <div class="flex-column align-items-center vw-100 lbbackground" style="font-family: VT323">
        <div class="d-flex align-items-center vw-100 justify-content-center">
            <img src="images/zero_leaderboard.png" alt="leaderboard" width="190px" height="200px"
                class="d-inline-block align-text-center">
            <p class="mx-4 justify-content-center lbTitle">TABLA DE CLASIFICACIÓN</p>
            <select name="levels" class="levelDataSelect">
                <option value="lvl1" data-level="1">1. BOSQUE DE LA SUMA</option>
                <option value="lvl2" data-level="2">2. EL DESIERTO AVANZADO</option>
                <option value="lvl3" data-level="3">3. LAS MONTAÑAS GEOMÉTRICAS</option>
                <option value="lvl4" data-level="4">4. LA CIUDAD DEL SABER</option>
            </select>
            <button class="ms-3 btnLb">VER</button>
        </div>
        <div class="d-flex align-items-center vw-100 justify-content-center">
            <table class="table  table-striped" style="border-style: solid; border-color: black" id="tablePt">
                <tbody class="tablebody">
                    <tr class="table-primary">
                        <th class="table-dark">JUGADOR</th>
                        <th class="table-dark">PUNTOS</th>
                        <th class="table-dark">TIEMPO</th>
                        <th class="table-dark">VIDAS</th>
                        <th class="table-dark">ERRORES</th>
                    </tr>
                    @foreach ($puntuaciones as $puntuacion)
                        @if ($puntuacion->id_game == 1)
                            <tr class="table-dark" id="scorePlayer">
                                @foreach ($usuarios as $usuario)
                                    @if ($usuario->id_user == $puntuacion->id_user)
                                        <td>{{ $usuario->nom_usuario }}</td>
                                    @endif
                                @endforeach
                                <td>{{ $puntuacion->puntos }}</td>
                                <td>{{ $puntuacion->tiempo_nivel }}</td>
                                <td>{{ $puntuacion->vidas }}</td>
                                <td>{{ $puntuacion->id_user }}</td>
                            </tr>
                        @endif
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    <script src="js/leaderboard.js"></script>
    <script>
        const puntuaciones = @json($puntuaciones);
        const usuarios = @json($usuarios);
    </script>
@endsection
