<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LettreCredit extends Model
{
    use HasFactory;

    protected $fillable = [
        'numeroOP',
        'idFiscale',
        'dateFacture',
        'montant',
        'objet',
        'nature3WM',
        'numeroFacture',
        'devise',
        'dateReception',
        'uploadDocument',
        'motifs',
        'validation',
        'user_id',
        'valide_compt',
        'valide_tres',
        'valide_fisc',
    ];

}
