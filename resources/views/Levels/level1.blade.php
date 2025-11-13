@extends('Templates.navbar')

@section('window_link')
    <img src="images/leaderboard_icon.png" alt="leaderboard" width="55" height="50"
        class="d-inline-block align-text-center">
    <span class="ms-2" style="font-family: VT323; font-size: 30px">Niveles</span>
@endsection

@section('user')
    <div class="d-flex align-items-center gap-3 ">
        <img src="images/zero_icon.png" alt="User Icon" width="65" height="60"
            class="d-inline-block align-text-center">
        <span class="text-white" style="font-family: VT323; font-size: 30px">BRIAN PIGUAVE</span>
        <a class="ms-2">
            <img src="images/exit.png" alt="Logout" width="50" height="50"
                class="d-inline-block align-text-center">
        </a>
    </div>
@endsection
