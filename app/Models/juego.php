<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class juego extends Model
{
    protected $table = 'juegos';
    protected $primaryKey = 'id_game';
    public $timestamps = false;

    /**
     * Get all of the juego for the juego
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function juego(): HasMany
    {
        return $this->hasMany(juego::class, 'id_puntuacion');
    }
}
