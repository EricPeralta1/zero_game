<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/x-icon" href="{{ asset('images/zero_icon.png') }}">
    <title>Configuracion</title>
    <link rel="stylesheet" href="{{ asset('css/config.css') }}">
</head>

<body>
    <header>
        <nav>
            <p>CONFIGURACIÓN DE USUARIOS</p>
            <a href="{{ route('landing.page', 'es') }}"><img src="{{ asset('Images/zero_logo_navbar.png') }}"
                    alt="ZERO Logo"></a>
            <p>SUPERADMIN</p>
        </nav>
    </header>
    <main>
        <div>
            <div id="config-titles">
                <span>Nombre</span>
                <span>Correo</span>
                <span>Rol</span>
                <span>Modificar</span>
                <span>Eliminar</span>
            </div>
            <div>
                @foreach ($users as $user)
                    <x-user-grid-item :nombre="$user->nom_usuario" :correo="$user->email" :id="$user->id_user" :rol="$user->id_rol" />
                @endforeach
            </div>
        </div>
    </main>
    <span id="popup">
        <form action="{{ route('update.user') }}" method="POST" id="update-user-form">
            @method('patch')
            @csrf

            <input type="hidden" name="id" id="id-update">

            <label for="username">Nombre usuario</label>
            <input type="text" name="username" id="username" minlength="5" maxlength="255" required>

            <label for="email">Correo</label>
            <input type="email" name="email" id="email" minlength="10" maxlength="255" required>

            <label for="rol">Rol</label>
            <select name="role" id="role">
                <option value="1">Usuario</option>
                <option value="2">Admin</option>
                <option value="3">Superadmin</option>
            </select>
            <div>
                <button type="button" class="cancel-btn">Cancelar</button>
                <button type="submit">Modificar</button>
            </div>
        </form>
        <form action="{{ route('delete.user') }}" method="POST" id="delete-user-form">
            @method('delete')
            @csrf
            <input type="hidden" name="id" id="id-delete">
            <p id="delete-text"></p>
            <span>
                <button type="button" class="cancel-btn">Cancelar</button><button type="submit">Eliminar</button>
            </span>
        </form>
    </span>
</body>

</html>
<script src="{{ asset('js/config.js') }}"></script>
