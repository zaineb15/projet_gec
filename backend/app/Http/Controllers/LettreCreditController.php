<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LettreCredit;
use Carbon\Carbon;

class LettreCreditController extends Controller
{
    public function getCurrentDateFactures(Request $request)
    {
        $dateActuelle = Carbon::now()->format('Y-m-d');
        $user_id = $request->query('user_id');

        $user_profil = $request->query('user_profil');

        if ($user_profil === 'agent tresorerie') {
            // Récupérer les factures validées par l'agent BOF
            $factures = LettreCredit::whereDate('created_at', $dateActuelle)
                ->where('valide_fisc', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else { if ($user_profil === 'fiscaliste') {
            // Récupérer les factures validées par l'agent BOF
            $factures = LettreCredit::whereDate('created_at', $dateActuelle)
                ->where('valide_compt', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else {if ($user_profil === 'agent AP') {
            // Récupérer les factures validées par l'agent BOF
            $factures = LettreCredit::whereDate('created_at', $dateActuelle)
                ->where('validation', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else { if ($user_profil === 'agent BOF') {
            // Récupérer toutes les factures pour l'utilisateur spécifique et la date actuelle
            $factures = LettreCredit::whereDate('created_at', $dateActuelle)->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else{$factures = LettreCredit::whereDate('created_at', $dateActuelle)
        ->where('user_id', $user_id)
        ->get();
        return response()->json(['success' => true, 'data' => $factures]);
         } }}}}

    public function getPastDateFactures()
    {
        $dateActuelle = Carbon::now()->format('Y-m-d');
        $factures = LettreCredit::whereDate('created_at', '<', $dateActuelle)->get();
        return response()->json(['success' => true, 'data' => $factures]);
    }
    public function show($id)
    {
        $LettreCredit = LettreCredit::findOrFail($id);
        return response()->json($LettreCredit);
    }
    public function store(Request $request)
    {
        $user_id = $request->query('user_id');
        // Valider les données de la requête
        $request->validate([
            'numeroOP' => 'required|string',
            'idFiscale' => 'required|string',
            'dateFacture' => 'required|date',
            'montant' => 'required|string',
            'objet' => 'required|string',
            'nature3WM' => 'required|string',
            'numeroFacture' => 'required|string',
            'devise' => 'required|string',
            'dateReception' => 'required|date',
            'uploadDocument' => 'required|file',
        ]);

        // Enregistrer la Lettre de crédit dans la base de données
        $lettreCredit = new LettreCredit();
        $lettreCredit->numeroOP = $request->numeroOP;
        $lettreCredit->idFiscale = $request->idFiscale;
        $lettreCredit->dateFacture = $request->dateFacture;
        $lettreCredit->montant = $request->montant;
        $lettreCredit->objet = $request->objet;
        $lettreCredit->nature3WM = $request->nature3WM;
        $lettreCredit->numeroFacture = $request->numeroFacture;
        $lettreCredit->devise = $request->devise;
        $lettreCredit->dateReception = $request->dateReception;
        $lettreCredit->uploadDocument = $request->file('uploadDocument')->store('public/uploadDocuments');
        $lettreCredit->user_id = $request->user_id;
        $lettreCredit->save();

        // Répondre avec un message de succès
        return response()->json(['success' => true, 'message' => 'Facture créée avec succès!']);
    }
    public function update(Request $request, $id)
    {
        // Valider les données de la requête
        $request->validate([
            'numeroOP' => 'required|string',
            'idFiscale' => 'required|string',
            'dateFacture' => 'required|date',
            'montant' => 'required|string',
            'objet' => 'required|string',
            'nature3WM' => 'required|string',
            'numeroFacture' => 'required|string',
            'devise' => 'required|string',
            'dateReception' => 'required|date',
            'uploadDocument' => 'nullable|file',
        ]);

        // Trouver la lettre de crédit à mettre à jour
        $lettreCredit = LettreCredit::findOrFail($id);

        // Mettre à jour les attributs de la lettre de crédit
        $lettreCredit->numeroOP = $request->input('numeroOP');
        $lettreCredit->idFiscale = $request->input('idFiscale');
        $lettreCredit->dateFacture = $request->input('dateFacture');
        $lettreCredit->montant = $request->input('montant');
        $lettreCredit->objet = $request->input('objet');
        $lettreCredit->nature3WM = $request->input('nature3WM');
        $lettreCredit->numeroFacture = $request->input('numeroFacture');
        $lettreCredit->devise = $request->input('devise');
        $lettreCredit->dateReception = $request->input('dateReception');

        // Gérer le téléchargement des fichiers s'il y a un nouveau document
        if ($request->hasFile('uploadDocument')) {
            $uploadDocumentPath = $request->file('uploadDocument')->store('public/uploadDocuments');
            $lettreCredit->uploadDocument = $uploadDocumentPath;
        }

        // Sauvegarder les modifications apportées à la lettre de crédit
        $lettreCredit->save();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Lettre de crédit mise à jour avec succès!',
        ]);
    }

    /**
     * Supprime la lettre de crédit spécifiée du stockage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Trouver la lettre de crédit à supprimer
        $lettreCredit = LettreCredit::findOrFail($id);

        // Supprimer la lettre de crédit de la base de données
        $lettreCredit->delete();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Lettre de crédit supprimée avec succès!',
        ]);
    }
    public function countCurrentLettreCredits()
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');
        
        // Compter les factures pour la date actuelle
        $count = LettreCredit::whereDate('created_at', $dateActuelle)->count();
        
        // Retourner le nombre de LettreCredits pour la date actuelle sous forme de réponse JSON
        return response()->json(['count' => $count]);
    }
}
