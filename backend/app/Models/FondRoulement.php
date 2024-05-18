<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FondRoulement extends Model
{
    protected $fillable = [
        'num_facture',
        'num_po',
        'date_facture',
        'montant',
        'devise',
        'file_path',
        'objet',
        'pieces_jointes',
        'motifs',
        'validation',
        'user_id',
        'valide_compt',
        'valide_tres',
        'valide_fisc',

    ];
}

  