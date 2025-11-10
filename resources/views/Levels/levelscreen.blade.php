@extends('Templates.navbar')

@section('window_link')
    <img src="images/leaderboard_icon.png" alt="leaderboard" width="55" height="50"
        class="d-inline-block align-text-center">
    <span class="ms-2" style="font-family: VT323">CLASIFICACIÓN</span>
@endsection

@section('user')
    <div>
        <img src="images/zero_icon.png" alt="User Icon" width="55" height="50" class="d-inline-block align-text-center">
        <p>MATIAS PRATS</p>
        <a>
            <img src="images/exit_icon.png" alt="Logout" width="55" height="50"
                class="d-inline-block align-text-center">
        </a>
    </div>
@endsection
