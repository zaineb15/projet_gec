<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fiscalite extends Model
{
    use HasFactory;

    protected $fillable = [
        'beneficiaire',
        'date_reception',
        'montant',
        'objet',
        'dossier_fiscalite',
        'num_po',
        'devise',
        'date_ordre_paiement',
        'upload_document',
        'motifs',
        'validation',
        'user_id',
        'valide_compt',
        'valide_tres',
        'valide_fisc',

    ];
}
