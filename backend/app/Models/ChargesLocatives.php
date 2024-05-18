<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChargesLocatives extends Model
{
    use HasFactory;

    protected $fillable = [
        'fournisseur',
        'id_fiscale',
        'numero_po',
        'direction',
        'date_facture',
        'montant',
        'delai_paiement',
        'objet',
        'nature_swm',
        'structure_ordinatrice',
        'numero_facture',
        'devise',
        'date_reception',
        'upload_document',
        'motifs',
        'validation',
        'user_id',
        'valide_compt',
        'valide_tres',
        'valide_fisc',
    ];
}
