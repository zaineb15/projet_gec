<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    use HasFactory;

    protected $fillable = [
        'num_fact',
        'date_fact',
        'montant',
        'devise',
        'file',
        'objet', // Ajouter le champ "Objet"
        'pieces_jointes', // Ajouter le champ "Pièces jointes"
    ];
}
