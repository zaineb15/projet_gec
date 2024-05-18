<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Operateur extends Model
{
    use HasFactory;

    protected $fillable = [
        'date_ordre_paiement',
        'fournisseur',
        'date_reception',
        'objet',
        'pieces_jointes',
        'ordre_paiement',
        'structure_ordinatrice',
        'devise',
        'montant',
        'upload_document',
        'motifs',
        'validation',
        'user_id',
        'valide_compt',
        'valide_tres',
        'valide_fisc',
    ];
}
