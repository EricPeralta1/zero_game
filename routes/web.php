<?php

use Illuminate\Support\Facades\Route;

Route::get("/zero/{lang}", function ($lang) {
    $lang = in_array($lang, ["en","es","ca"]) ? $lang : "en";

    $jsonPath = "../resources/data/landing.json";
    $jsonContent = file_get_contents($jsonPath);
    $translations = json_decode($jsonContent, true);

    $texts = $translations[$lang] ?? $translations["en"];

    return view("landingPage", compact("texts", "lang"));
});