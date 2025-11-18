<?php

namespace App\Http\Controllers;

use App\Models\juego;
use App\Models\Usuario;
use App\Models\puntuacion;
use Illuminate\Http\Request;

class JuegoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $juegos = juego::all();
        $user = Usuario::find(2);
        $userScores = puntuacion::select('PUNTUACIONES.*')->where('PUNTUACIONES.id_user', $user->id_user)->get();

        return view('Levels.levelscreen', compact('juegos', 'userScores'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(juego $juego)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(juego $juego)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, juego $juego)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(juego $juego)
    {
        //
    }
}
