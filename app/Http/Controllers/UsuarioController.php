<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Classes\UsuarioClass;
use Illuminate\Support\Facades\Auth;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('templates.Registro');
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $usuario=new Usuario();
        $usuario->nom_usuario=$request->input('nom_usuario');
        $usuario->email=$request->input('email');
         $usuario->password=$request->input('password');
        $usuario->id_rol = 1; 

           $usuario->save();
        
        // 5. Redirección después del registro exitoso
        return redirect()->route('usuario.index')->with('success', '¡Registro exitoso! Por favor, inicia sesión con tus nuevas credenciales.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Usuario $usuario)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Usuario $usuario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Usuario $usuario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:usuarios,id_user'
        ]);

        try {
            $user = Usuario::findOrFail($request->id);
            
            if ($user->id === Auth::id()) {
                return back()->with('error', 'No puedes eliminar tu propia cuenta.');
            }

            if ($user->role === 'admin') {
                return back()->with('error', 'No se puede eliminar usuarios administradores.');
            }

            $user->delete();

            return redirect()->route('users.index')->with('success', 'Usuario eliminado correctamente.');
            
        } catch (\Exception $e) {
            return back()->with('error', 'Error al eliminar el usuario: ' . $e->getMessage());
        }
    }

    public function updateUser(Request $request) {
        $user = Usuario::find($request->input('id'));

        if (!$user) {
            return redirect()->back()->with('error', 'Usuario no encontrado');
        }

        $user->nom_usuario = $request->input("username");
        $user->email = $request->input("email");
        $user->id_rol = $request->input("role");

        $user->save();
        return redirect()->back()->with('success', 'Usuario actualizado correctamente');
    }
}
