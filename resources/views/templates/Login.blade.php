<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    
    <link href="{{ asset('css/Login.css') }}" rel="stylesheet"> 
</head>
<body class="imagenfondo">
    <div class="contenedorlogin">
            <div class="col-md-8 col-lg-6 login-container bg-white">
                <h2 class="text-center mb-4">Iniciar Sesión</h2>
                    <div class="mb-3">
                        <label for="email" class="form-label"> Correo Electrónico</label>
                        <input type="email" class="form-control" id="email" name="email" required autofocus>
                        @error('email')
                            <div class="text-danger mt-2">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="password" name="password" required>
                        @error('password')
                            <div class="text-danger mt-2">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="remember" name="remember">
                        <label class="form-check-label" for="remember">Recordarme</label>
                    </div>

                    <div class="d-grid gap-2 mb-3">
                        <button type="submit" class="btn btn-primary">Entrar</button>
                    </div>

                   
                        <div class="text-center">
                            <a class="text-muted" >¿Olvidaste tu contraseña?</a>
                        </div>
                    
                </form>

            </div>
        
    </div>

</body>

    