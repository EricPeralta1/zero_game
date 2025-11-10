<?php

namespace App\Models;

use App\Models\rol;
use App\Models\Seccion;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Usuario extends Model
{
     protected $table = 'usuarios';
    protected $primaryKey = 'id_user';
    public $timestamps = false;
    protected $fillable=['nom_usuario','email','password' ,'id_rol'];

    
    
    public function Rol(): BelongsTo
    {
        return $this->belongsTo(rol::class, 'id_rol');
    }

    /**
     * Get all of the Seccion for the Usuario
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function Seccion(): HasMany
    {
        return $this->hasMany(Seccion::class, 'id_session', );

    }
    /**
     * Get all of the Puntaciones for the Usuario
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function Puntaciones(): HasMany
    {
        return $this->hasMany(Puntuacion::class, 'id_puntuacion');
    }    
}
