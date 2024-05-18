<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeFacture extends Model
{
    protected $fillable = ['nom'];

    public function bordereaux()
    {
        return $this->hasMany(Bordereau::class, 'nature', 'nom');
    }
}
