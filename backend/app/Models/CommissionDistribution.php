<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommissionDistribution extends Model
{
    use HasFactory;

    protected $fillable = [
        'commission',
        'fournisseur',
        'id_fiscale',
        'date_facture',
        'date_rec',
        'objet',
        'pieces_jointes',
        'montant',
        'devise',
        'num_facture',
        'delai_paiement',
        'upload_document', // Champ ajouté pour gérer le fichier téléchargé
        'motifs',
        'validation',
        'user_id',
        'valide_compt',
        'valide_tres',
        'valide_fisc',

    ];
}