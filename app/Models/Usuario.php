<?php

namespace App\Models;

use App\Models\rol;
use Illuminate\Database\Eloquent\Model;
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
    
}
