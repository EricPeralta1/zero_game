<?php

use App\Http\Controllers\JuegoController;
use App\Http\Controllers\PuntuacionController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UsuarioController;
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

Route::get("/zero/{lang}", function ($lang) {
    $lang = in_array($lang, ["en","es","ca"]) ? $lang : "en";

    $jsonPath = "../resources/data/landingPage.json";
    $jsonContent = file_get_contents($jsonPath);
    $translations = json_decode($jsonContent, true);

    $texts = $translations[$lang] ?? $translations["en"];

    return view("landingPage", compact("texts", "lang"));
});

/*RUTAS DE NIVELES Y CLASSIFICACION*/
Route::get('/levels', [JuegoController::class, 'index'])->name('levels.index');
Route::get('/leaderboard', [PuntuacionController::class, 'index'])->name('score.index');
Route::get('/levels/{id_game}', [JuegoController::class, 'introduction'])->name('levels.introduction');
//CERRAR SESSION
route::get('/logout', [LoginController::class, 'logout'])->name('logout');
});

Route::fallback(function () {
    return redirect('/Login');
});





