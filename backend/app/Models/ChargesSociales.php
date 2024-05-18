<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChargesSociales extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'fournisseur',
        'date_reception',
        'montant',
        'objet',
        'dossier_fiscalite',
        'numero_op',
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