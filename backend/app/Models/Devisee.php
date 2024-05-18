<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devisee extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'montant',
        'objet',
        'idFiscale',
        'dateFacture',
        'delaiPaiement',
        'nature3wm',
        'fournisseur',
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
