<?php

namespace App\Http\Controllers;

use App\Models\juego;
use App\Models\Seccion;
use App\Models\Usuario;
use App\Models\puntuacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JuegoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $juegos = juego::all();
        $user = Usuario::find(Auth::user()->id_user);
        $userScores = puntuacion::select('PUNTUACIONES.*')->where('PUNTUACIONES.id_user', $user->id_user)->get();
        $lvl1Score = 0;
        
        if($userScores != null) {
            foreach ($userScores as $score) {
                if($score->id_game ==  1){
                    $lvl1Score = $score->puntos;
                }
            }
        }
        return view('Levels.levelscreen', compact('juegos', 'userScores', 'lvl1Score'));
    }

    /*SEGÚN LA ID DEL JUEGO ELEGIDO EN LA PANTALLA LEVELS, CARGAMOS LA VISTA DEL NIVEL CORRESPONDIENTE.*/
    public function introduction($id_game){

        $juegos = juego::all();
        $juegoespecifico = $juegos->find($id_game);

        if ($juegoespecifico->id_game == 1){
            return view('Levels.level1', compact('juegos', 'juegoespecifico'));
        } else if ($juegoespecifico->id_game == 2){
            return view('Levels.level2', compact('juegos', 'juegoespecifico'));
        } else if ($juegoespecifico->id_game == 3){
            return view('Levels.level3', compact('juegos', 'juegoespecifico'));
        } else if ($juegoespecifico->id_game == 4){
            return view('Levels.level4', compact('juegos', 'juegoespecifico'));
        }
    }

    /*CARGA LA PANTALLA METRICAS*/
    public function metrics(){
        $sessiones = Seccion::all();
        $usuarios = Usuario::all();
        $puntuaciones = puntuacion::all();

        return view('metrics.metrics', compact('sessiones', 'usuarios', 'puntuaciones'));
    }

    public function inicio_juego($id_game){

        $juegos = juego::all();
         $juegoespecifico = $juegos->find($id_game);
         return view('game.game1', compact('juegos','juegoespecifico'));
           
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
