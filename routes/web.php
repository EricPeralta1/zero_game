<?php

use App\Http\Controllers\JuegoController;
use App\Http\Controllers\PuntuacionController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\LandingController;
use Illuminate\Support\Facades\Route;
// REGISTRO
route::post('/Registro', [LoginController::class, 'store'])->name('usuario.store');
route::get('/Registro', [UsuarioController::class, 'index'])->name('templates.Registro');
//LOGIN
route::get('/Login', [LoginController::class, 'showLogin'])->name('login');
route::post('/Login', [LoginController::class, 'Login'])->name('login.submit');

Route::get('/', function () {
    return redirect()->route('login') ;
});

Route::middleware(['auth'])->group(function () {

route::post ('/Registro',[LoginController::class, 'store'])->name('usuario.store');
route:: get ('/Registro',[UsuarioController::class, 'index'])->name('templates.Registro');

/* LANDING PAGE MULTIIDIOMA*/
Route::get("/zero/{lang}", [LandingController::class, 'index'])->name('landing.page');
/* CONFIGURACIÓN DE ADMINS PARA SUPERADMIN*/
Route::get('/config', [LandingController::class, 'config'])->name('superadmin.config');
Route::patch('/config', [UsuarioController::class, 'updateAdmin'])->name("update.admin");

/*RUTAS DE NIVELES Y CLASSIFICACION*/
Route::get('/levels', [JuegoController::class, 'index'])->name('levels.index');
Route::get('/leaderboard', [PuntuacionController::class, 'index'])->name('score.index');
Route::get('/levels/{id_game}', [JuegoController::class, 'introduction'])->name('levels.game');


//CERRAR SESSION
route::get('/logout', [LoginController::class, 'logout'])->name('logout');
});

Route::fallback(function () {
    return redirect('/Login');
});





