<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">
    <link href="{{ asset('css/Login.css') }}" rel="stylesheet"> 
    <link href="{{ asset('css/styles.css') }}" rel="stylesheet">
</head>

<body class="imagenfondo">
    <div class="contenedorlogin">
        <div class="login-box">
            <div class="logo-area mb-4">
               <img src="{{ asset('images/zero_logo_full.png') }}" alt="Logo ZERO" class="zero-logo">
            </div>

            <h2 class="text-center acceso-mundo">ACCESO AL MUNDO</h2>
            <form method="post" action="{{ route('login.submit') }}"> 
                @csrf 
                 @if(session('success'))
                <div class="alert alert-success">{{ session('success') }}</div>
                @endif

                @if(session('error'))
                <div class="alert alert-danger">{{ session('error') }}</div>
                @endif
                
                <div class="mb-3">
                    <input type="text" class="form-control custom-input" placeholder="Nombre Usuario" id="nom_usuario" name="nom_usuario" required autofocus>
                    @error('nom_usuario') 
                        <div class="text-danger mt-2 error-message">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-5"> 
                    <input type="password" class="form-control custom-input" placeholder="Contraseña" id="password" name="password" required>
                    @error('password')
                        <div class="text-danger mt-2 error-message">{{ $message }}</div>
                    @enderror
                </div>

                <div class="d-grid gap-2 mb-4">
                    <button type="submit" class="boton">Iniciar Mundo</button>
                </div>

               <div class="text-center register-link">
                   ¿No tienes cuenta? <a href="{{ route('templates.Registro') }}" class="register-text">Regístrate</a>
                     </div>
            </form>
        </div>
    </div>
</body>
</html>

    