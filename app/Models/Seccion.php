<?php

namespace App\Models;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Seccion extends Model
{
   protected $table = 'sesiones';
    protected $primaryKey = 'id_session';
    public $timestamps = false;
    protected $fillable=['fecha_sesion','id_user', 'tiempo'];



/**
 * Get the Usuario that owns the Seccion
 *
 * @return BelongsTo
 */
public function Usuario(): BelongsTo
{
    return $this->belongsTo(Usuario::class, 'id_user');
}

}
