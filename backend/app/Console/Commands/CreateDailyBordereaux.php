<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\TypeFacture;
use App\Models\Bordereau;
use Carbon\Carbon;

class CreateDailyBordereaux extends Command
{
    protected $signature = 'app:create-daily-bordereaux';

    protected $description = 'Create daily bordereaux for each type of invoice';
    public function handle()
    {
        // Récupérer tous les types de factures
        $typesFactures = TypeFacture::all();
        
        // Modifier le moment de la journée pour la création des bordereaux à minuit
        $dateJour = now()->startOfDay();
    
        // Parcourir chaque type de facture
        foreach ($typesFactures as $typeFacture) {
            // Vérifier si un bordereau existe pour ce type de facture et cette date
            $bordereauExist = Bordereau::where('nature', $typeFacture->nom)
                                        ->whereDate('created_at', $dateJour)
                                        ->exists();
            
            // Si aucun bordereau n'existe pour ce type de facture et cette date, en créer un
            if (!$bordereauExist) {
                // Récupérer l'ID du type de facture
                $typeFactureId = $typeFacture->id;
    
                // Créer le bordereau en utilisant l'ID du type de facture
                $bordereau = new Bordereau();
                $bordereau->reference = "REF_" . $typeFacture->nom . "_" . $dateJour->format('Y-m-d');
                $bordereau->nature = $typeFacture->nom;
                $bordereau->type_facture_id = $typeFactureId; // Utilisation de l'ID récupéré
                // Autres attributs du bordereau à initialiser
                $bordereau->status = 'Votre_statut_par_défaut'; // Statut par défaut
                $bordereau->folder = 'Votre_dossier_par_défaut'; // Dossier par défaut
                $bordereau->sent_at = null; // Si non envoyé
                $bordereau->sent_by = null; // Si non envoyé
                $bordereau->created_by = 'Votre_utilisateur_par_défaut'; // Utilisateur par défaut
                
                $bordereau->save();
            }
        }
    
        $this->info('Daily bordereaux created successfully at midnight!');
    }
    
}


