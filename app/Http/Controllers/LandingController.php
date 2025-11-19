<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LandingController extends Controller
{
    public function index($lang) {
        $lang = in_array($lang, ["en","es","ca"]) ? $lang : "en";

        $jsonPath = "../resources/data/landingPage.json";
        $jsonContent = file_get_contents($jsonPath);
        $translations = json_decode($jsonContent, true);

        $texts = $translations[$lang] ?? $translations["en"];

        $user = Auth::user();

        return view("landingPage", compact("texts", "lang", "user"));
    }
}
