<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChargesSociales;
use Carbon\Carbon;

class ChargesSocialesController extends Controller
{
    public function getCurrentDateFactures(Request $request)
    {
        $dateActuelle = Carbon::now()->format('Y-m-d');
        $user_id = $request->query('user_id');

        $user_profil = $request->query('user_profil');

        if ($user_profil === 'agent tresorerie') {
            // Récupérer les factures validées par l'agent BOF
            $chargesSociales = ChargesSociales::whereDate('created_at', $dateActuelle)
                ->where('valide_fisc', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $chargesSociales]);
        } else { if ($user_profil === 'fiscaliste') {
            // Récupérer les factures validées par l'agent BOF
            $chargesSociales = ChargesSociales::whereDate('created_at', $dateActuelle)
                ->where('valide_compt', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $chargesSociales]);
        } else {if ($user_profil === 'agent AP') {
            // Récupérer les factures validées par l'agent BOF
            $chargesSociales = ChargesSociales::whereDate('created_at', $dateActuelle)
                ->where('validation', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $chargesSociales]);
        } else { if ($user_profil === 'agent BOF') {
            // Récupérer toutes les factures pour l'utilisateur spécifique et la date actuelle
            $chargesSociales = ChargesSociales::whereDate('created_at', $dateActuelle)->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $chargesSociales]);
        } else{$chargesSociales = ChargesSociales::whereDate('created_at', $dateActuelle)
        ->where('user_id', $user_id)
        ->get();
        return response()->json(['success' => true, 'data' => $chargesSociales]);
    }}}}}

    public function getPastDateFactures()
    {
        $dateActuelle = Carbon::now()->format('Y-m-d');
        $chargesSociales = ChargesSociales::whereDate('created_at', '<', $dateActuelle)->get();
        return response()->json(['success' => true, 'data' => $chargesSociales]);
    }

    public function store(Request $request)
    {
        $user_id = $request->query('user_id');
        $request->validate([
            'fournisseur' => 'required|string',
            'date_reception' => 'required|date',
            'montant' => 'required|string',
            'objet' => 'required|string',
            'dossier_fiscalite' => 'required|string',
            'numero_op' => 'required|string',
            'devise' => 'required|string',
            'date_ordre_paiement' => 'required|date',
            'upload_document' => 'required|file|mimes:pdf,png,jpg',
        ]);

        $file = $request->file('upload_document');
        $fileName = time().'_'.$file->getClientOriginalName();
        $filePath = $file->storeAs('uploads', $fileName);

        $chargesSociales = new ChargesSociales([
            'fournisseur' => $request->input('fournisseur'),
            'date_reception' => $request->input('date_reception'),
            'montant' => $request->input('montant'),
            'objet' => $request->input('objet'),
            'dossier_fiscalite' => $request->input('dossier_fiscalite'),
            'numero_op' => $request->input('numero_op'),
            'devise' => $request->input('devise'),
            'date_ordre_paiement' => $request->input('date_ordre_paiement'),
            'upload_document' => $filePath,
            'user_id' => $request->input('user_id'),
        ]);

        $chargesSociales->save();

        return response()->json(['success' => true, 'message' => 'Charges sociales créées avec succès!']);
    }
    public function show($id)
    {
        $ChargesSociales = ChargesSociales::findOrFail($id);
        return response()->json($ChargesSociales);
    }
    public function update(Request $request, $id)
    {
        // Valider les données de la requête
        $request->validate([
            'fournisseur' => 'required|string',
            'date_reception' => 'required|date',
            'montant' => 'required|string',
            'objet' => 'required|string',
            'dossier_fiscalite' => 'required|string',
            'numero_op' => 'required|string',
            'devise' => 'required|string',
            'date_ordre_paiement' => 'required|date',
            'upload_document' => 'nullable|file|mimes:pdf,png,jpg',
        ]);

        // Trouver les charges sociales à mettre à jour
        $chargesSociales = ChargesSociales::findOrFail($id);

        // Mettre à jour les attributs des charges sociales
        $chargesSociales->fournisseur = $request->input('fournisseur');
        $chargesSociales->date_reception = $request->input('date_reception');
        $chargesSociales->montant = $request->input('montant');
        $chargesSociales->objet = $request->input('objet');
        $chargesSociales->dossier_fiscalite = $request->input('dossier_fiscalite');
        $chargesSociales->numero_op = $request->input('numero_op');
        $chargesSociales->devise = $request->input('devise');
        $chargesSociales->date_ordre_paiement = $request->input('date_ordre_paiement');

        // Gérer le téléchargement des fichiers si un nouveau fichier est fourni
        if ($request->hasFile('upload_document')) {
            $filePath = $request->file('upload_document')->store('uploads');
            $chargesSociales->upload_document = $filePath;
        }

        // Sauvegarder les modifications apportées aux charges sociales
        $chargesSociales->save();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Charges sociales mises à jour avec succès!',
        ]);
    }

    /**
     * Supprime les charges sociales spécifiées du stockage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Trouver les charges sociales à supprimer
        $chargesSociales = ChargesSociales::findOrFail($id);

        // Supprimer les charges sociales de la base de données
        $chargesSociales->delete();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Charges sociales supprimées avec succès!',
        ]);
    }
    public function countCurrentChargesSocialess()
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');
        
        // Compter les factures pour la date actuelle
        $count = ChargesSociales::whereDate('created_at', $dateActuelle)->count();
        
        // Retourner le nombre de ChargesSocialess pour la date actuelle sous forme de réponse JSON
        return response()->json(['count' => $count]);
    }
}
