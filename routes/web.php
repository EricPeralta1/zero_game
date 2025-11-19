<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JuegoController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\PuntuacionController;
use App\Http\Controllers\LandingController;

Route::get('/', function () {
    return view('welcome');
});

/*LOGIN Y REGISTRO*/
route:: get ('/Login',[LoginController::class, 'showLogin'])->name('login');
route::post ('/Login',[LoginController::class, 'Login'])->name('login.submit');

route::post ('/Registro',[LoginController::class, 'store'])->name('usuario.store');
route:: get ('/Registro',[UsuarioController::class, 'index'])->name('templates.Registro');

/* LANDING PAGE MULTIIDIOMA*/
Route::get("/zero/{lang}", [LandingController::class, 'index'])->name('landing.page');
/* CONFIGURACIÓN DE ADMINS PARA SUPERADMIN*/
Route::get('/config', function() {
    return view('config');
})->name('superadmin.config');

/*RUTAS DE NIVELES Y CLASSIFICACION*/
Route::get('/levels', [JuegoController::class, 'index'])->name('levels.index');
Route::get('/leaderboard', [PuntuacionController::class, 'index'])->name('score.index');



