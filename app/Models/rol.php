<?php

namespace App\Models;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class rol extends Model
{
     protected $table = 'roles';
    protected $primaryKey = 'id_rol';
    public $timestamps = false;
    protected $fillable=['nombre_rol'];

    
  /**
   * Get all of thn Usuario for the rol
   *
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function Usuario(): HasMany
  {
      return $this->hasMany(Usuario::class, 'id_user');
  }

}
