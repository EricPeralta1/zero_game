<?php

namespace App\Models;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class puntuacion extends Model
{
    protected $table = 'puntuaciones';
    protected $primaryKey = 'id_puntuacion';
    public $timestamps = false;
    protected $fillable=['puntos','tiempo_nivel','vidas','errores','id_user','id_game'];

    /**
     * Get the user that owns the puntuacion
     *
     * @return BelongsTo
     */
    public function Usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'id_user', );
    }
    /**
     * Get the Juego that owns the puntuacion
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function Juego(): BelongsTo
    {
        return $this->belongsTo(Juego::class, 'id_game', );
    }

}
