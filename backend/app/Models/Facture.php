<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    use HasFactory;
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    protected $fillable = [
        'num_fact',
        'date_fact',
        'montant',
        'devise',
        'file',
        'objet', // Ajouter le champ "Objet"
        'pieces_jointes', // Ajouter le champ "Pièces jointes"
        'status',
        'motifs',
        'validation',
        'user_id',
        'valide_compt',
        'valide_tres',
        'valide_fisc',
    ];
}
