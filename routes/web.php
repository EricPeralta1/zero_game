<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JuegoController;
use App\Http\Controllers\UsuarioController;

Route::get('/', function () {
    return view('welcome');
});

Route::resource('/levels', JuegoController::class);

route:: get ('/Login',[UsuarioController::class, 'index'])->name('templates.Login');
route:: get ('/Registro',[UsuarioController::class, 'create'])->name('templates.Registro');
