<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Bordereau;
use Carbon\Carbon;

class UpdateBordereauStatus extends Command
{
    protected $signature = 'app:update-bordereau-status';

    protected $description = 'Update bordereau status';

    public function handle()
    {
        // Récupérer tous les bordereaux
        $bordereaux = Bordereau::all();

        // Parcourir chaque bordereau
        foreach ($bordereaux as $bordereau) {
            // Vérifier si la différence entre la date de création et l'heure actuelle est supérieure à 24 heures
            if ($bordereau->created_at->diffInHours(now()) >= 24) {
                // Mettre à jour le statut à "Clôturé"
                $bordereau->status = 'Clôturé';
            } else {
                // Sinon, mettre à jour le statut à "En cours"
                $bordereau->status = 'En cours';
            }
            
            // Enregistrer les modifications du bordereau
            $bordereau->save();
        }

        $this->info('Bordereau status updated successfully!');
    }
}

