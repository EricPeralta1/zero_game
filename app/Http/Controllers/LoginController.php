<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Seccion;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    /*PERMITE MOSTRAR EL LOGIN, EN CASO DE DEJAR LA SESIÓN ABIERTA REDIRIGE A LA LANDING PAGE */
    public function showLogin() {
        if(Auth::check()){
            return redirect()->route('landing.page', ['lang' => 'es']); 
        } else {
            return view ('Templates.Login');
        }
    }

    
    /*PROCESA EL LOGIN DEL USUARIO*/
        public function login(Request $request) {
            $Usuario = Usuario::where('nom_usuario', $request->input('nom_usuario'))->first();
            
            if($Usuario && Hash::check($request->input('password'), $Usuario->password)){
                Auth::login($Usuario);
                
                return redirect()->route('landing.page', ['lang' => 'es']);
            } else {
                session()->flash('error','Credenciales incorrectas');
                return redirect()->back()->withInput();
            }
        } 
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $usuario=new Usuario();
        $usuario->nom_usuario=$request->input('nom_usuario');
        $usuario->email=$request->input('email');
        $hashedPassword = Hash::make($request->input('password'));
        $usuario->password = $hashedPassword;
          $usuario->id_rol = 1; 
          $usuario->returning_player = 0;
           $usuario->save();
        // 5. Redirección después del registro exitoso
        return redirect()->route('login')->with('success', '¡Registro exitoso! Por favor, inicia sesión con tus nuevas credenciales.');
    }

    /*CIERRA LA SESIÓN DEL USUARIO*/
    public function logout(Request $request){

        $userId = Auth::user()->id_user;

        $cookie = $_COOKIE['fechaini'];

        if ($cookie){
            $data = json_decode($cookie, true);

            $fechaFin = Carbon::now('UTC');
            $fechaInicio = Carbon::parse($data['fechaini'])->setTimezone('UTC');
            $tiempo_sesion = (int) $fechaInicio->diffInSeconds($fechaFin);

            $sesion = new Seccion();
            $sesion->fecha_sesion = $fechaFin;
            $sesion->id_user = $userId;
            $sesion->tiempo = $tiempo_sesion;

            $sesion->save();
        }

        $usuario = Usuario::find($userId);
        $userSesions = Seccion::where('id_user', $userId)->count();

        if ($userSesions > 2) {
            $usuario->returning_player = 1;
            $usuario->save();
        }

        Auth::logout();
        return redirect('/');
    }

}