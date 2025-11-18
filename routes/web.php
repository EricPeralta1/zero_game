<?php

use App\Http\Controllers\JuegoController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;
// REGISTRO
route::post('/Registro', [LoginController::class, 'store'])->name('usuario.store');
route::get('/Registro', [UsuarioController::class, 'index'])->name('templates.Registro');
//LOGIN
route::get('/Login', [LoginController::class, 'showLogin'])->name('login');
route::post('/Login', [LoginController::class, 'Login'])->name('login.submit');

Route::middleware(['auth'])->group(function () {

Route::resource('/levels', JuegoController::class);
route::resource('/levels', JuegoController::class);
Route::get('/levels/{id_game}', [JuegoController::class, 'introduction'])->name('levels.introduction');
//CERRAR SESSION
route::get('/logout', [LoginController::class, 'logout'])->name('logout');
});

Route::fallback(function () {
    return redirect('/Login');
});


