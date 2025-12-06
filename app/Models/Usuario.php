<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Usuario extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'usuarios';

    protected $primaryKey = 'id_user';

    public $timestamps = false;

    protected $fillable = ['nom_usuario', 'email', 'password', 'id_rol'];

    public function Rol(): BelongsTo
    {
        return $this->belongsTo(rol::class, 'id_rol');
    }

    /**
     * Get all of the Seccion for the Usuario
     */
    public function Seccion(): HasMany
    {
        return $this->hasMany(Seccion::class, 'id_session');

    }

    /**
     * Get all of the Puntaciones for the Usuario
     */
    public function Puntaciones(): HasMany
    {
        return $this->hasMany(Puntuacion::class, 'id_user');
    }
}
