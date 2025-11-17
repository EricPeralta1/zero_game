<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JuegoController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\PuntuacionController;

Route::get('/', function () {
    return view('welcome');
});

/*LOGIN Y REGISTRO*/
route:: get ('/Login',[LoginController::class, 'showLogin'])->name('login');
route::post ('/Login',[LoginController::class, 'Login'])->name('login.submit');

route::post ('/Registro',[LoginController::class, 'store'])->name('usuario.store');
route:: get ('/Registro',[UsuarioController::class, 'index'])->name('templates.Registro');
Route::get("/zero/{lang}", function ($lang) {
    $lang = in_array($lang, ["en","es","ca"]) ? $lang : "en";

    $jsonPath = "../resources/data/landing.json";
    $jsonContent = file_get_contents($jsonPath);
    $translations = json_decode($jsonContent, true);

    $texts = $translations[$lang] ?? $translations["en"];

    return view("landingPage", compact("texts", "lang"));
});

/*RUTAS DE NIVELES Y CLASSIFICACION*/
Route::get('/levels', [JuegoController::class, 'index'])->name('levels.index');
Route::get('/leaderboard', [PuntuacionController::class, 'index'])->name('score.index');



