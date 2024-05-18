<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Financement extends Model
{
    use HasFactory;

    protected $fillable = [
        'devise',
        'numPO',
        'dest',
        'ech',
        'fncm',
        'montant',
        'objet',
        'dateRec',
        'datepo',
        'file',
        'motifs',
        'validation',
        'user_id',
        'valide_compt',
        'valide_tres',
        'valide_fisc',

    ];
}
