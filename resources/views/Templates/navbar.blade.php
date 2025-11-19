<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/x-icon" href="images/zero_icon.png">
     <link rel="stylesheet" href="{{ asset('css/Levels.css') }}" />
    <title>ZERO</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">
    

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous">
    </script>
    </script>

    <link rel="stylesheet" href="{{ asset('css/styles.css') }}" />
</head>

<body>
    <nav class="navbar" style="background-color: #372358; padding: 0px" data-bs-theme="dark">
        <div class="container-fluid d-flex justify-content-around">

            <div class="navbar-brand d-flex align-items-center" href="#"
                style="font-family: 'VT323', sans-serif">
                @yield('window_link')
            </div>
            <div>
                <img src="{{ asset('Images/zero_logo_navbar.png') }}" alt="leaderboard" width="auto" height=75px>
            </div>
            <div>
                @yield('user')
            </div>
        </div>
    </nav>
    <div>
        @yield('content')
    </div>
</body>

</html>
