<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/levels', function(){
    return view('Levels.levelscreen');
});
