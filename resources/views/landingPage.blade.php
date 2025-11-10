<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ZERO</title>
</head>
<style>
    /* GLOBAL CONFIG */
    @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

    .vt323-regular {
        font-family: "VT323", monospace;
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'Pixeloid';
        src: url('../public/fonts/pixeloid.sans-bold.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    :root {
        --color-violet: #220F37;
        --color-orange: #F64A00;
        --color-white: #ffffff;
        --color-black: #000;
    }

    body {
        margin: 0;
        padding: 0;
        background: var(--color-violet)
    }

    h1,
    h2,
    h3 {
        font-family: 'Pixeloid';
        color: var(--color-white)
    }

    h3 {
        color: var(--color-orange)
    }

    p,
    a,
    label,
    ul {
        font-family: "VT323", monospace;
        color: var(--color-white);
    }

    a {
        text-decoration: none;
    }

    img {
        width: 100px;
    }

    ul {
        list-style: none;
    }

    form,
    button {
        background-color: var(--color-orange);
        color: var(--color-white)
    }

    /* NAVBAR */

    /* HERO */
    #inicio {
        background-size: contain;
        background-repeat: no-repeat;
    }

    #inicio>img {}
</style>

<body>
    <header>
        <nav>
            <img src="{{ asset('images/landingPage/zero_logo_nobg.png') }}" alt="zero logo">
            <a href="#inicio">INICIO</a>
            <a href="#historia">HISTORIA</a>
            <a href="#niveles">NIVELES</a>
            <a href="#ranking">RANKING</a>
            <a href="#equipo">EQUIPO</a>
            <a>PERFIL</a>
            <select name="language" id="language">
                <option value="es" selected>ES</option>
                <option value="ca">CA</option>
                <option value="en">EN</option>
            </select>
        </nav>
        <div id="inicio" style="background-image:url({{ asset('images/landingPage/hero_img.png') }})">
            <h1>¡AYUDA A ZERO A SALVAR EL PUEBLO DÍGITO!</h1>
            <img src="{{ asset('images/landingPage/zero_fight.png') }}" alt="zero character">
            <button>JUGAR YA</button>
        </div>
    </header>
    <main>
        <section id="historia">
            <h2>HISTORIA</h2>
            <p>En Pueblo Dígito, la Energía Matemágica mantiene el equilibrio entre números, formas y medidas.
                <br>
                Pero un día, el Profesor Kaos, un inventor brillante pero despistado, libera por accidente a los
                Errores: pequeñas criaturas que devoran números y desordenan las operaciones.
                <br>
                El caos se extiende por todo el reino, y solo Zero, un joven decidido que vive en las afueras, puede
                restaurar la armonía.
                Para lograrlo, deberá recuperar los cuatro Cristales Matemágicos, cada uno protegido en una región
                distinta.
            </p>
            <div>
                <img src="{{ asset('images/gemas/gema_1.png') }}" alt="cristal 1" class="gema">
                <img src="{{ asset('images/gemas/gema_2.png') }}" alt="cristal 2" class="gema">
                <img src="{{ asset('images/gemas/gema_3.png') }}" alt="cristal 3" class="gema">
                <img src="{{ asset('images/gemas/gema_4.png') }}" alt="cristal 4" class="gema">
            </div>
            <p>
                Cada cristal representa un desafío matemático que pondrá a prueba tu lógica, velocidad y habilidad.
                <br>
                ¿Ayudarás a Zero a dominar la Matemágia y salvar Pueblo Dígito del kaos?
            </p>
        </section>
        <section id="niveles">
            <h2>¡DESBLOQUEA TODOS LOS NIVELES!</h2>
            <img src="{{ asset('images/landingPage/landing_lvl1.png') }}" alt="Pueblo digito">
            <div>
                <h3>EL BOSQUE DE LA SUMA</h3>
                <img src="{{ asset('images/landingPage/landing_lvl_blocked.png') }}" alt="El Bosque de la Suma">
            </div>
            <div>
                <h3>EL DESIERTO AVANZADO</h3>
                <img src="{{ asset('images/landingPage/landing_lvl_blocked.png') }}" alt="El Desierto Avanzado">

            </div>
            <div>
                <h3>LAS MONTAÑAS GEOMÉTRICAS</h3>
                <img src="{{ asset('images/landingPage/landing_lvl_blocked.png') }}" alt="Las Montañas Geométricas">

            </div>
            <div>
                <h3>LA CIUDAD DEL SABER</h3>
                <img src="{{ asset('images/landingPage/landing_lvl_blocked.png') }}" alt="La Ciudad del Saber">
            </div>
        </section>
        <section id="ranking">
            <h2>¡SUMA PUNTOS Y ENTRA EN EL RANKING!</h2>
            <img src="" alt="Ejemplo ranking">
        </section>
        <section id="equipo">
            <h2>EQUIPO CREATIVO</h2>
            <div class="card-team">
                <img src="" alt="Ferdinand">
                <p>Ferdinand Pinto</p>
                <p>Rol</p>
                <p>Responsabilidades</p>
            </div>
            <div class="card-team">
                <img src="" alt="Eric">
                <p>Eric Peralta</p>
                <p>Rol</p>
                <p>Responsabilidades</p>
            </div>
            <div class="card-team">
                <img src="" alt="Brian">
                <p>Brian</p>
                <p>Rol</p>
                <p>Responsabilidades</p>
            </div>
            <div class="card-team">
                <img src="" alt="Max">
                <p>Max Vidal</p>
                <p>Rol</p>
                <p>Responsabilidades</p>
            </div>
        </section>
        <section id="contacto">
            <h2>CONTACTO</h2>
            <form action="">
                <label for="name">Nombre</label>
                <input type="text" name="name" id="name">

                <label for="email">Email</label>
                <input type="email" name="email" id="email">

                <label for="message">Mensaje</label>
                <textarea name="message" id="message"></textarea>

                <button type="submit">SUBMIT</button>
            </form>
        </section>
    </main>
    <footer>
        <div>
            <img src="{{ asset('images/landingPage/zero_logo_og.png') }}" alt="Zero logo">
            <ul>
                <li><a href="#inicio">INICIO</a></li>
                <li><a href="#historia">HISTORIA</a></li>
                <li><a href="#niveles">NIVELES</a></li>
                <li><a href="#ranking">RANKING</a></li>
                <li><a href="#equipo">EQUIPO</a></li>
            </ul>
        </div>
        <p>© 2025 ZERO / DAW2 - Todos los derechos reservados</p>
    </footer>
</body>

</html>
