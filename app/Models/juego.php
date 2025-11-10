<?php

namespace App\Models;

use App\Models\puntuacion;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class juego extends Model
{
      protected $table = 'juegos';
    protected $primaryKey = 'id_game';
    public $timestamps = false;
    protected $fillable=['nombre_juego'];

    /**
     * Get all of the Usuario for the juego
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function Usuario(): HasMany
    {
        return $this->hasMany(puntuacion::class, 'id_puntuacion',);
    }
}
