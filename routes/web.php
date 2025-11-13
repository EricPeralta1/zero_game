<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JuegoController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UsuarioController;

Route::get('/', function () {
    return view('welcome');
});

Route::resource('/levels', JuegoController::class);


route:: get ('/Login',[LoginController::class, 'showLogin'])->name('login');
route::post ('/Login',[LoginController::class, 'Login'])->name('login.submit');



route::post ('/Registro',[LoginController::class, 'store'])->name('usuario.store');
route:: get ('/Registro',[UsuarioController::class, 'index'])->name('templates.Registro');
