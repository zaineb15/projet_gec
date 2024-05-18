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

class MotifsController extends Controller
{
    public function store(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'motifs' => 'required|string',
        ]);

        // Récupérer la facture associée à l'ID
        $steg = Steg::findOrFail($id);
          $steg->motifs = $request->input('motifs');
          $steg->save();

             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Motif enregistré avec succès!',
        ]);
    } 

    public function store1(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'motifs' => 'required|string',
        ]);

$LettreCredit = LettreCredit::findOrFail($id);
$LettreCredit->motifs = $request->input('motifs');
$LettreCredit->save();

             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Motif enregistré avec succès!',
        ]);
    }

    public function store2(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'motifs' => 'required|string',
        ]);


$Ventilation = Ventilation::findOrFail($id);
$Ventilation->motifs = $request->input('motifs');
$Ventilation->save();

             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Motif enregistré avec succès!',
        ]);
    }

    public function store3(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'motifs' => 'required|string',
        ]);

$Operateur = Operateur::findOrFail($id);
$Operateur->motifs = $request->input('motifs');
$Operateur->save();

             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Motif enregistré avec succès!',
        ]);
    }

    public function store4(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'motifs' => 'required|string',
        ]);

$FondRoulement = FondRoulement::findOrFail($id);
$FondRoulement->motifs = $request->input('motifs');
$FondRoulement->save();

             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Motif enregistré avec succès!',
        ]);
    }

    public function store5(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'motifs' => 'required|string',
        ]);

        // Récupérer la facture associée à l'ID
$Fiscalite = Fiscalite::findOrFail($id);
$Fiscalite->motifs = $request->input('motifs');
$Fiscalite->save();

             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Motif enregistré avec succès!',
        ]);
    }

    public function store6(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'motifs' => 'required|string',
        ]);

$Financement = Financement::findOrFail($id);
$Financement->motifs = $request->input('motifs');
$Financement->save();

             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Motif enregistré avec succès!',
        ]);
    }

    public function store7(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'motifs' => 'required|string',
        ]);

$Facture = Facture::findOrFail($id);
$Facture->motifs = $request->input('motifs');
$Facture->save();

             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Motif enregistré avec succès!',
        ]);
    }

    public function store8(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'motifs' => 'required|string',
        ]);

$Devisee = Devisee::findOrFail($id);
$Devisee->motifs = $request->input('motifs');
$Devisee->save();

             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Motif enregistré avec succès!',
        ]);
    }

    public function store9(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'motifs' => 'required|string',
        ]);

$ChargesSociales = ChargesSociales::findOrFail($id);
$ChargesSociales->motifs = $request->input('motifs');
$ChargesSociales->save();

             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Motif enregistré avec succès!',
        ]);
    }

    public function store10(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'motifs' => 'required|string',
        ]);


$ChargesLocatives = ChargesLocatives::findOrFail($id);
$ChargesLocatives->motifs = $request->input('motifs');
$ChargesLocatives->save();

             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Motif enregistré avec succès!',
        ]);
    }

    public function store11(Request $request, $id)
    {
        // Valider les données du formulaire
        $request->validate([
            'motifs' => 'required|string',
        ]);
$CommissionDistribution = CommissionDistribution::findOrFail($id);
$CommissionDistribution->motifs = $request->input('motifs');
$CommissionDistribution->save();

             // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Motif enregistré avec succès!',
        ]);
    }

    ////////////////////////////////////////////////////////////////////////
    public function getAllMotifs(Request $request)
    {
        $user_id = $request->query('user_id');
    
        // Récupérer toutes les factures avec leurs motifs pour l'utilisateur donné
        $factures = Facture::where('user_id', $user_id)->select('num_fact', 'motifs')->get();
    
        // Retourner une réponse JSON avec les motifs et les numéros de facture de toutes les factures
        return response()->json($factures);
    }
    
}
