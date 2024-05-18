<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChargesLocatives;
use Carbon\Carbon;

class ChargesLocativesController extends Controller
{
    public function getCurrentDateFactures(Request $request)
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');
        $user_id = $request->query('user_id');
        $user_profil = $request->query('user_profil');
      // Vérifier si le profil est celui d'un "agent AP"
      if ($user_profil === 'agent tresorerie') {
        // Récupérer les factures validées par l'agent BOF
        $chargesLocatives = ChargesLocatives::whereDate('created_at', $dateActuelle)
            ->where('valide_fisc', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
            ->get();

        // Retourner les factures en tant que réponse JSON
        return response()->json(['success' => true, 'data' => $chargesLocatives]);
    } else { if ($user_profil === 'fiscaliste') {
        // Récupérer les factures validées par l'agent BOF
        $chargesLocatives = ChargesLocatives::whereDate('created_at', $dateActuelle)
            ->where('valide_compt', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
            ->get();

        // Retourner les factures en tant que réponse JSON
        return response()->json(['success' => true, 'data' => $chargesLocatives]);
    } else {if ($user_profil === 'agent AP') {
        // Récupérer les factures validées par l'agent BOF
        $chargesLocatives = ChargesLocatives::whereDate('created_at', $dateActuelle)
            ->where('validation', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
            ->get();

        // Retourner les factures en tant que réponse JSON
        return response()->json(['success' => true, 'data' => $chargesLocatives]);
    } else {if ($user_profil === 'agent BOF') {
        // Récupérer toutes les factures pour l'utilisateur spécifique et la date actuelle
        $chargesLocatives = ChargesLocatives::whereDate('created_at', $dateActuelle)->get();

        // Retourner les factures en tant que réponse JSON
        return response()->json(['success' => true, 'data' => $chargesLocatives]);
    } else{ $chargesLocatives = ChargesLocatives::whereDate('created_at', $dateActuelle)
    ->where('user_id', $user_id)
    ->get();

// Retourner les charges locatives en tant que réponse JSON
return response()->json(['success' => true, 'data' => $chargesLocatives]);
       
    }}}}}

    public function getPastDateFactures()
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');

        // Récupérer les charges locatives antérieures à la date actuelle
        $chargesLocatives = ChargesLocatives::whereDate('created_at', '<', $dateActuelle)->get();

        // Retourner les charges locatives en tant que réponse JSON
        return response()->json(['success' => true, 'data' => $chargesLocatives]);
    }
    public function store(Request $request)
    {
        $user_id = $request->query('user_id');
        // Validez les données
        $request->validate([
            'fournisseur' => 'required|string',
            'id_fiscale' => 'required|string',
            'numero_po' => 'required|string',
            'direction' => 'required|string',
            'date_facture' => 'required|date',
            'montant' => 'required|numeric',
            'delai_paiement' => 'nullable|string',
            'objet' => 'nullable|string',
            'nature_swm' => 'required|string',
            'structure_ordinatrice' => 'required|string',
            'numero_facture' => 'required|string',
            'devise' => 'required|string',
            'date_reception' => 'required|date',
            'upload_document' => 'nullable|file|mimes:pdf,png,jpg',
        ]);

        // Gérez le fichier téléchargé
        $file = $request->file('upload_document');
        $fileName = $file->getClientOriginalName();
        $filePath = $file->storeAs('uploads', $fileName);

        // Créez une nouvelle instance de la charge locative
        $chargeLocative = new ChargesLocatives;
        $chargeLocative->fournisseur = $request->fournisseur;
        $chargeLocative->id_fiscale = $request->id_fiscale;
        $chargeLocative->numero_po = $request->numero_po;
        $chargeLocative->direction = $request->direction;
        $chargeLocative->date_facture = $request->date_facture;
        $chargeLocative->montant = $request->montant;
        $chargeLocative->delai_paiement = $request->delai_paiement;
        $chargeLocative->objet = $request->objet;
        $chargeLocative->nature_swm = $request->nature_swm;
        $chargeLocative->structure_ordinatrice = $request->structure_ordinatrice;
        $chargeLocative->numero_facture = $request->numero_facture;
        $chargeLocative->devise = $request->devise;
        $chargeLocative->date_reception = $request->date_reception;
        $chargeLocative->upload_document = $filePath;
        $chargeLocative->user_id = $request->user_id;
        $chargeLocative->save();

        return response()->json(['success' => true, 'message' => 'Charge locative créée avec succès']);
    }
    public function show($id)
    {
        $ChargesLocatives = ChargesLocatives::findOrFail($id);
        return response()->json($ChargesLocatives);
    }
    public function update(Request $request, $id)
    {
        // Valider les données de la requête
        $request->validate([
            'fournisseur' => 'required|string',
            'id_fiscale' => 'required|string',
            'numero_po' => 'required|string',
            'direction' => 'required|string',
            'date_facture' => 'required|date',
            'montant' => 'required|numeric',
            'delai_paiement' => 'required|string',
            'objet' => 'nullable|string',
            'nature_swm' => 'required|string',
            'structure_ordinatrice' => 'nullable|string',
            'numero_facture' => 'required|string',
            'devise' => 'required|string',
            'date_reception' => 'required|date',
            'upload_document' => 'nullable|file|mimes:pdf,png,jpg',
        ]);

        // Trouver la charge locative à mettre à jour
        $chargeLocative = ChargesLocatives::findOrFail($id);
        $chargeLocative->fournisseur = $request->input('fournisseur');
        $chargeLocative->id_fiscale = $request->input('id_fiscale');
        $chargeLocative->numero_po = $request->input('numero_po');
        $chargeLocative->direction = $request->input('direction');
        $chargeLocative->date_facture = $request->input('date_facture');
        $chargeLocative->montant = $request->input('montant');
        $chargeLocative->delai_paiement = $request->input('delai_paiement');
        $chargeLocative->objet = $request->input('objet');
        $chargeLocative->nature_swm = $request->input('nature_swm');
        $chargeLocative->structure_ordinatrice = $request->input('structure_ordinatrice');
        $chargeLocative->numero_facture = $request->input('numero_facture');
        $chargeLocative->devise = $request->input('devise');
        $chargeLocative->date_reception = $request->input('date_reception');

        // Gérer le téléchargement des fichiers si un nouveau fichier est fourni
        if ($request->hasFile('upload_document')) {
            $filePath = $request->file('upload_document')->store('uploads');
            $chargeLocative->upload_document = $filePath;
        }

        // Sauvegarder les modifications apportées à la charge locative
        $chargeLocative->save();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Charge locative mise à jour avec succès!',
        ]);
    }


    public function destroy($id)
    {
        // Trouver la charge locative à supprimer
        $chargeLocative = ChargesLocatives::findOrFail($id);

        // Supprimer la charge locative de la base de données
        $chargeLocative->delete();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Charge locative supprimée avec succès!',
        ]);
    }
    public function countCurrentChargesLocatives()
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');
        
        // Compter les factures pour la date actuelle
        $count = ChargesLocatives::whereDate('created_at', $dateActuelle)->count();
        
        // Retourner le nombre de ChargesLocativess pour la date actuelle sous forme de réponse JSON
        return response()->json(['count' => $count]);
    }
}
