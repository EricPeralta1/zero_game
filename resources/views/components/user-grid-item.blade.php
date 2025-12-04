<div class="user">
    <span>{{ $nombre }}</span>
    <span>{{ $correo }}</span>
    <span>
        @if ($rol == 1)
            Usuario
        @elseif ($rol == 2)
            Admin
        @endif
    </span>
    <span><button class="update-btn" data-id="{{ $id }}" data-username="{{ $nombre }}"
            data-email="{{ $correo }}" data-rol="{{ $rol }}">Modificar</button></span>
    <span><button class="delete-btn" data-id="{{ $id }}"
            data-username="{{ $nombre }}">Eliminar</button></span>
</div>
