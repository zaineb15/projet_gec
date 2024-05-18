<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ventilation extends Model
{
    use HasFactory;

    protected $fillable = [
        'beneficiaire',
        'date_ordre_paiement',
        'direction',
        'date_reception',
        'objet',
        'pieces_jointes',
        'ventilation_direct',
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
