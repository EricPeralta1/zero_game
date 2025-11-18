<?php

namespace App\Http\Controllers;

use App\Models\juego;
use Illuminate\Http\Request;

class JuegoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $juegos = juego::all();

        return view('Levels.levelscreen', compact('juegos'));
        // No tocar 
    }

    public function introduccion($id_game){

        $juegos = juego::all();
        $juegoEspecifico = $juegos->find($id_game);

        return view('Levels.levelscreen', 
        [
        'juegos' => $juegos, // Aún puedes pasar toda la colección si es necesario
        'juegoSeleccionado' => $juegoEspecifico
    ]);


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
