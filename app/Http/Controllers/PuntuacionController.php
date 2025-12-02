<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use App\Models\puntuacion;
use Illuminate\Http\Request;

class PuntuacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $puntuaciones = puntuacion::All();
       $usuarios = Usuario::All();

       return view('results.leaderboard', compact('puntuaciones', 'usuarios'));
    }

    public function savescore(){
        $data = $_COOKIE['score3'];
        $score = json_decode($data, true);

        $scores = puntuacion::All();
        $savedScore =  puntuacion::where('id_user', $score['id_user'])->where('id_game', $score['id_game'])->first();

        if ($savedScore != null) {
            if($savedScore->puntos < $score['puntos']){
                $savedScore->puntos = $score['puntos'];
                $savedScore-> tiempo_nivel = $score['tiempo_nivel'];
                $savedScore->save();
            }
        } else {
            $newScore = new puntuacion;
            $newScore->puntos = $score['puntos'];
            $newScore->tiempo_nivel = $score['tiempo_nivel'];
            $newScore->vidas = $score['vidas'];
            $newScore->errores = $score['errores'];
            $newScore->id_user = $score['id_user'];
            $newScore->id_game = $score['id_game'];
            $newScore->fecha = $score['fecha'];
            $newScore->save();
        }
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
    public function show(puntuacion $puntuacion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(puntuacion $puntuacion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, puntuacion $puntuacion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(puntuacion $puntuacion)
    {
        //
    }
}
