<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro al Mundo - ZERO</title> 
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&family=VT323&display=swap" rel="stylesheet">
    
    <link href="{{ asset('css/Login.css') }}" rel="stylesheet"> 
</head>
<body class="imagenfondo">
    <div class="contenedorlogin">
        <div class="login-box">
            
            <div class="logo-area mb-4">
               <img src="{{ asset('images/zero_logo_full.png') }}" alt="Logo ZERO" class="zero-logo">
            </div>

            <h2 class="text-center acceso-mundo">REGISTRO AL MUNDO</h2>

            <form method="post" action="{{ route('usuario.store') }}"> 
                @csrf 
                <div class="row mb-3 gx-3">
                    <div class="col-md-6">
                        <input type="text" class="form-control custom-input" placeholder="Nombre Usuario" id="nom_usuario" name="nom_usuario" required autofocus>
                        @error('username') 
                            <div class="text-danger mt-2 error-message">{{ $message }}</div>
                        @enderror
                    </div>
                    
                    <div class="col-md-6">
                        <input type="email" class="form-control custom-input" placeholder="Correo electronico" id="email" name="email" required>
                        @error('email') 
                            <div class="text-danger mt-2 error-message">{{ $message }}</div>
                        @enderror
                    </div>
                </div>
                
                <div class="row mb-5 gx-3">
                    <div class="col-md-6">
                        <input type="password" class="form-control custom-input" placeholder="Contraseña" id="password" name="password" required>
                        @error('password')
                            <div class="text-danger mt-2 error-message">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="col-md-6">
                        <input type="password" class="form-control custom-input" placeholder="Confirmar Contraseña" id="password_confirmation" name="password_confirmation" required>
                        </div>
                </div>

                <div class="d-grid gap-2 mb-4">
                    <button type="submit" class="boton">Registrar Jugador</button>
                </div>

                <div class="text-center register-link">
                    ¿Ya tienes cuenta? <a href="{{ route('login') }}" class="register-text">Acceder</a>
                </div>
            </form>
        </div>
    </div>
    <script src="{{ asset('js/Registro.js') }}"></script>
</body>
</html>