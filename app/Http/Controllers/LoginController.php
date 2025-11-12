<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function showLogin() {

        return view ('templates.Login');
    }

    public function login(Request $request ){

           $Usuario = Usuario::where('nom_usuario',$request-> input('nom_usuario'))->first();
            if($Usuario && Hash::check($request->input('password'),$Usuario->password)){

              $response = redirect('/levels') ;
              
            }

            else{
                session()->flash('error','credenciales incorrectos');
                 $response= redirect()->back()->withInput();
            }


         return $response;
    } /**
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

           $usuario->save();
        
        // 5. Redirección después del registro exitoso
        return redirect()->route('login')->with('success', '¡Registro exitoso! Por favor, inicia sesión con tus nuevas credenciales.');
    }
}