<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\SeccionController;
use App\Http\Controllers\UsuarioController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/levels', function(){
    return view('Levels.levelscreen');
});

// LOGIN 
route:: get ('/Login',[LoginController::class, 'showLogin'])->name('login');
route::post ('/Login',[LoginController::class, 'Login'])->name('login.submit');


// REGISTRO 
route::post ('/Registro',[LoginController::class, 'store'])->name('usuario.store');
route:: get ('/Registro',[UsuarioController::class, 'index'])->name('templates.Registro');

//NIVELES

route:: get ('/Level1',[SeccionController::class, 'index'])->name('Level.level1');








