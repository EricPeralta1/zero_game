<?php

use Illuminate\Support\Facades\Route;

Route::get('/zero', function () {
    return view('landingPage');
});
