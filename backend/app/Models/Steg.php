<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Steg extends Model
{
    use HasFactory;

    protected $fillable = [
        'montant',
        'devise',
        'date_facture',
        'objet',
        'numero_po',
        'id_fiscale',
        'direction',
        'fournisseur',
        'delai_paiement',
        'structure_ordinatrice',
        'numero_facture',
        'date_reception',
        'upload_document',
        'nature_3wm',
        'motifs',
        'validation',
        'user_id',
        'valide_compt',
        'valide_tres',
        'valide_fisc',
    ];
}
