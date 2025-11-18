<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Configuracion Usuarios</title>
    <link rel="stylesheet" href="{{ asset('css/config.css') }}">
</head>

<body>
    <header>
        <nav>
            <p>CONFIGURACIÓN ADMINISTRADORES</p>
            <img src="{{ asset('Images/zero_logo_navbar.png') }}" alt="ZERO Logo">
            <p>SUPERADMINISTRADOR</p>
        </nav>
    </header>
    <main>
        <div>
            <div id="config-titles">
                <span>Nombre</span>
                <span>Correo</span>
                <span>Modificar</span>
                <span>Eliminar</span>
            </div>
            <div>
                @for ($i = 0; $i < 100; $i++)
                    <x-admin-grid-item nombre="Nombre Ejemplo" correo="Correo Ejemplo" id="1" />
                @endfor

            </div>
        </div>
    </main>
</body>

</html>
