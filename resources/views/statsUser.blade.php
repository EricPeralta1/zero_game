<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/x-icon" href="{{ asset('images/zero_icon.png') }}">
    <title>Configuracion estadísticas</title>
    <link rel="stylesheet" href="{{ asset('css/statsUser.css') }}">
</head>

<body>
    <header>
        <nav>
            <p>ESTADÍSTICAS DE {{ $user->nom_usuario }}</p>
            <a href="{{ route('landing.page', 'es') }}"><img src="{{ asset('Images/zero_logo_navbar.png') }}"
                    alt="ZERO Logo"></a>
            <p>ADMIN</p>
        </nav>
    </header>
    <main>
        <div id="stats-container">

            @foreach ($games as $game)
                <section class="game-container">
                    <h2>{{ strtoupper($game->nombre_juego) }}</h2>
                    <div class="matches-container">
                        @php
                            $gamePlays = $playsByGame->get($game->id_game, collect());
                        @endphp

                        @forelse($gamePlays as $play)
                            <div class="match-card" data-gameTitle="{{ $game->nombre_juego }}"
                                data-gameId="{{ $play->id_game }}" data-userId="{{ $user->id_user }}"
                                data-scoreId="{{ $play->id_puntuacion }}" data-time="{{ $play->tiempo_nivel }}"
                                data-hp="{{ $play->vidas }}" data-errors="{{ $play->errores }}"
                                data-score="{{ $play->puntos }}">
                                <div class="match-header">
                                    <span class="match-score">{{ $play->puntos }} pts</span>
                                </div>
                                <div class="match-stats">
                                    <div class="stat">
                                        <span class="stat-label">⏱️ Tiempo:</span>
                                        <span class="stat-value">{{ $play->tiempo_nivel }}s</span>
                                    </div>
                                    <div class="stat">
                                        <span class="stat-label">❤️ Vidas:</span>
                                        <span class="stat-value">{{ $play->vidas }}</span>
                                    </div>
                                    <div class="stat">
                                        <span class="stat-label">❌ Errores:</span>
                                        <span class="stat-value">{{ $play->errores }}</span>
                                    </div>
                                </div>
                            </div>
                        @empty
                            <div class="empty-state">
                                <p>No hay partidas registradas para este juego</p>
                            </div>
                        @endforelse
                    </div>
                </section>
            @endforeach
        </div>
    </main>
    <div id="overlay">
        <form action="{{ route('update.stats', $user->id_user) }}" id="update-stats">
            @csrf
            @method('PATCH')
            <h3 id="title-game">TITULO JUEGO</h3>

            <label for="id-user">ID Usuario</label>
            <input type="number" name="id-user" id="id-user" value="" readonly>

            <label for="id-score">ID Puntuacion</label>
            <input type="number" name="id_puntuacion" id="id-score" value="" readonly>

            <label for="id-game">ID Juego</label>
            <input type="number" name="id-game" id="id-game" value="" readonly>

            <label for="score">Puntos</label>
            <input type="number" name="puntos" id="score" required>

            <label for="time">Tiempo</label>
            <input type="text" name="tiempo_nivel" id="time" required>

            <label for="hp">Vidas</label>
            <input type="number" name="vidas" id="hp" min="0" max="5" required>

            <label for="errors">Errores</label>
            <input type="number" name="errores" id="errors" required>
            <span>
                <button id="remove-match-btn" type="button">ELIMINAR</button><button id="update-match-btn"
                    type="submit">MODIFICAR</button>
            </span>

            <svg xmlns="http://www.w3.org/2000/svg" width="17.828" height="17.828" id="quit-btn">
                <path
                    d="m2.828 17.828 6.086-6.086L15 17.828 17.828 15l-6.086-6.086 6.086-6.086L15 0 8.914 6.086 2.828 0 0 2.828l6.085 6.086L0 15l2.828 2.828z" />
            </svg>
        </form>
    </div>
</body>

</html>
<script src="{{ asset('js/updateStats.js') }}"></script>
