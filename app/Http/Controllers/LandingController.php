<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Usuario;

class LandingController extends Controller
{
    /*CARGA LA LANDING PAGE, CON SU CORRESPONDIENTE IDIOMA.*/
    public function index($lang) {
        $lang = in_array($lang, ["en","es","ca"]) ? $lang : "en";

        $jsonPath = "../resources/data/landingPage.json";
        $jsonContent = file_get_contents($jsonPath);
        $translations = json_decode($jsonContent, true);

        $texts = $translations[$lang] ?? $translations["en"];

        $user = Auth::user();

        return view("landingPage", compact("texts", "lang", "user"));
    }

    /*PERMITE MOSTRAR LA VISTA DE CONFIGURACIÓN PARA EDITAR USUARIOS, DE ROL USUARIO O ADMIN, DISPONBILE PARA
    SUPERADMINS*/
    public function config() {
        $users = Usuario::whereIn('id_rol', [1, 2])->get();
        return view("config", compact("users"));
    }

    /*PERMITE MOSTRAR LA VISTA DE CONFIGURACIÓN DE EDITAR PUNTUACIONES, DISPONIBLE PARA ADMINS Y SUPERADMINS.*/
    public function stats() {
        $users = Usuario::all();
        return view("stats", compact("users"));
    }
}
