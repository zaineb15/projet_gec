<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Steg;
use App\Models\CommissionDistribution;
use App\Models\ChargesLocatives;
use App\Models\ChargesSociales;
use App\Models\Devisee;
use App\Models\Facture;
use App\Models\Financement;
use App\Models\Fiscalite;
use App\Models\FondRoulement;
use App\Models\LettreCredit;
use App\Models\Operateur;
use App\Models\Ventilation;

class ValidationController extends Controller
{
    public function store(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'validation' => 'string',
            'valide_fisc' => 'string',
            'valide_tres' => 'string',
            'valide_compt'=>'string',
        ]);

        // Récupérer la facture associée à l'ID
        $steg = Steg::findOrFail($id);
        if ($request->has('validation')) {
        $steg->validation = $request->input('validation');
        $steg->save();
        }
        if ($request->has('valide_fisc')) {
        $steg->valide_fisc = $request->input('valide_fisc');
        $steg->save();
        }
        if ($request->has('valide_tres')) {
        $steg->valide_tres = $request->input('valide_tres');
        $steg->save();
        }
        if ($request->has('valide_compt')) {
        $steg->valide_compt = $request->input('valide_compt');
        $steg->save();
        }
             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'validation enregistré avec succès!',
        ]);
    } 

    public function store1(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'validation' => 'string',
            'valide_fisc' => 'string',
            'valide_tres' => 'string',
            'valide_compt'=>'string',        ]);

$LettreCredit = LettreCredit::findOrFail($id);
if ($request->has('validation')) {
$LettreCredit->validation = $request->input('validation');
$LettreCredit->save();
}
if ($request->has('valide_fisc')) {
$LettreCredit->valide_fisc = $request->input('valide_fisc');
$LettreCredit->save();
}
if ($request->has('valide_tres')) {
$LettreCredit->valide_tres = $request->input('valide_tres');
$LettreCredit->save();
}
if ($request->has('valide_compt')) {
$LettreCredit->valide_compt = $request->input('valide_compt');
$LettreCredit->save();
}
             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'validation enregistré avec succès!',
        ]);
    }

    public function store2(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'validation' => 'string',
            'valide_fisc' => 'string',
            'valide_tres' => 'string',
            'valide_compt'=>'string',        ]);


$Ventilation = Ventilation::findOrFail($id);
if ($request->has('validation')) {
$Ventilation->validation = $request->input('validation');
$Ventilation->save();
}
if ($request->has('valide_fisc')) {
$Ventilation->valide_fisc = $request->input('valide_fisc');
$Ventilation->save();
}
if ($request->has('valide_tres')) {
$Ventilation->valide_tres = $request->input('valide_tres');
$Ventilation->save();
}
if ($request->has('valide_compt')) {
$Ventilation->valide_compt = $request->input('valide_compt');
$Ventilation->save();
}
             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'validation enregistré avec succès!',
        ]);
    }

    public function store3(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'validation' => 'string',
            'valide_fisc' => 'string',
            'valide_tres' => 'string',
            'valide_compt'=>'string',        ]);

$Operateur = Operateur::findOrFail($id);
if ($request->has('validation')) {
$Operateur->validation = $request->input('validation');
$Operateur->save();
}
if ($request->has('valide_fisc')) {
$Operateur->valide_fisc = $request->input('valide_fisc');
$Operateur->save();
}
if ($request->has('valide_tres')) {
$Operateur->valide_tres = $request->input('valide_tres');
$Operateur->save();
}
if ($request->has('valide_compt')) {
$Operateur->valide_compt = $request->input('valide_compt');
$Operateur->save();
}
             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'validation enregistré avec succès!',
        ]);
    }

    public function store4(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'validation' => 'string',
            'valide_fisc' => 'string',
            'valide_tres' => 'string',
            'valide_compt'=>'string',        ]);

$FondRoulement = FondRoulement::findOrFail($id);
if ($request->has('validation')) {
$FondRoulement->validation = $request->input('validation');
$FondRoulement->save();
}
if ($request->has('valide_fisc')) {
$FondRoulement->valide_fisc = $request->input('valide_fisc');
$FondRoulement->save();
}
if ($request->has('valide_tres')) {
$FondRoulement->valide_tres = $request->input('valide_tres');
$FondRoulement->save();
}
if ($request->has('valide_compt')) {
$FondRoulement->valide_compt = $request->input('valide_compt');
$FondRoulement->save();
}
             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'validation enregistré avec succès!',
        ]);
    }

    public function store5(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'validation' => 'string',
            'valide_fisc' => 'string',
            'valide_tres' => 'string',
            'valide_compt'=>'string',        ]);

        // Récupérer la facture associée à l'ID
$Fiscalite = Fiscalite::findOrFail($id);
if ($request->has('validation')) {
$Fiscalite->validation = $request->input('validation');
$Fiscalite->save();
}
if ($request->has('valide_fisc')) {
$Fiscalite->valide_fisc = $request->input('valide_fisc');
$Fiscalite->save();
}
if ($request->has('valide_tres')) {
$Fiscalite->valide_tres = $request->input('valide_tres');
$Fiscalite->save();
}
if ($request->has('valide_compt')) {
$Fiscalite->valide_compt = $request->input('valide_compt');
$Fiscalite->save();
}
             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'validation enregistré avec succès!',
        ]);
    }

    public function store6(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'validation' => 'string',
            'valide_fisc' => 'string',
            'valide_tres' => 'string',
            'valide_compt'=>'string',        ]);

$Financement = Financement::findOrFail($id);
if ($request->has('validation')) {
$Financement->validation = $request->input('validation');
$Financement->save();
}
if ($request->has('valide_fisc')) {
$Financement->valide_fisc = $request->input('valide_fisc');
$Financement->save();
}
if ($request->has('valide_tres')) {
$Financement->valide_tres = $request->input('valide_tres');
$Financement->save();
}
if ($request->has('valide_compt')) {
$Financement->valide_compt = $request->input('valide_compt');
$Financement->save();
}
             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'validation enregistré avec succès!',
        ]);
    }

    public function store7(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'validation' => 'string',
            'valide_fisc' => 'string',
            'valide_tres' => 'string',
            'valide_compt'=>'string',        ]);

$Facture = Facture::findOrFail($id);
if ($request->has('validation')) {
$Facture->validation = $request->input('validation');
$Facture->save();
}
if ($request->has('valide_fisc')) {
$Facture->valide_fisc = $request->input('valide_fisc');
$Facture->save();
}
if ($request->has('valide_tres')) {
$Facture->valide_tres = $request->input('valide_tres');
$Facture->save();
}
if ($request->has('valide_compt')) {
$Facture->valide_compt = $request->input('valide_compt');
$Facture->save();
}
             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'validation enregistré avec succès!',
        ]);
    }

    public function store8(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'validation' => 'string',
            'valide_fisc' => 'string',
            'valide_tres' => 'string',
            'valide_compt'=>'string',        ]);

$Devisee = Devisee::findOrFail($id);
if ($request->has('validation')) {
$Devisee->validation = $request->input('validation');
$Devisee->save();
}
if ($request->has('valide_fisc')) {
$Devisee->valide_fisc = $request->input('valide_fisc');
$Devisee->save();
}
if ($request->has('valide_tres')) {
$Devisee->valide_tres = $request->input('valide_tres');
$Devisee->save();
}
if ($request->has('valide_compt')) {
$Devisee->valide_compt = $request->input('valide_compt');
$Devisee->save();
}
             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'validation enregistré avec succès!',
        ]);
    }

    public function store9(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'validation' => 'string',
            'valide_fisc' => 'string',
            'valide_tres' => 'string',
            'valide_compt'=>'string',        ]);

$ChargesSociales = ChargesSociales::findOrFail($id);
if ($request->has('validation')) {
$ChargesSociales->validation = $request->input('validation');
$ChargesSociales->save();
}
if ($request->has('valide_fisc')) {
$ChargesSociales->valide_fisc = $request->input('valide_fisc');
$ChargesSociales->save();
}
if ($request->has('valide_tres')) {
$ChargesSociales->valide_tres = $request->input('valide_tres');
$ChargesSociales->save();
}
if ($request->has('valide_compt')) {
$ChargesSociales->valide_compt = $request->input('valide_compt');
$ChargesSociales->save();
}
             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'validation enregistré avec succès!',
        ]);
    }

    public function store10(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'validation' => 'string',
            'valide_fisc' => 'string',
            'valide_tres' => 'string',
            'valide_compt' => 'string',
        ]);
    
        $ChargesLocatives = ChargesLocatives::findOrFail($id);
    
        // Valider et sauvegarder chaque champ séparément
        if ($request->has('validation')) {
            $ChargesLocatives->validation = $request->input('validation');
            $ChargesLocatives->save();
        }
    
        if ($request->has('valide_fisc')) {
            $ChargesLocatives->valide_fisc = $request->input('valide_fisc');
            $ChargesLocatives->save();
        }
    
        if ($request->has('valide_tres')) {
            $ChargesLocatives->valide_tres = $request->input('valide_tres');
            $ChargesLocatives->save();
        }
    
        if ($request->has('valide_compt')) {
            $ChargesLocatives->valide_compt = $request->input('valide_compt');
            $ChargesLocatives->save();
        }
    
        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Validation enregistrée avec succès!',
        ]);
    }
    

    public function store11(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'validation' => 'string',
            'valide_fisc' => 'string',
            'valide_tres' => 'string',
            'valide_compt'=>'string',        ]);
$CommissionDistribution = CommissionDistribution::findOrFail($id);
if ($request->has('validation')) {
$CommissionDistribution->validation = $request->input('validation');
$CommissionDistribution->save();
}
if ($request->has('valide_fisc')) {
$CommissionDistribution->valide_fisc = $request->input('valide_fisc');
$CommissionDistribution->save();
}
if ($request->has('valide_tres')) {
$CommissionDistribution->valide_tres = $request->input('valide_tres');
$CommissionDistribution->save();
}
if ($request->has('valide_compt')) {
$CommissionDistribution->valide_compt = $request->input('valide_compt');
$CommissionDistribution->save();
}
             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'validation enregistré avec succès!',
        ]);
    }

    
}
