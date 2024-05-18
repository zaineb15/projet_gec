<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Operateur;
use Carbon\Carbon;

class OperateurController extends Controller
{
    public function getCurrentDateFactures(Request $request)
    {
        $dateActuelle = Carbon::now()->format('Y-m-d');
        $user_id = $request->query('user_id');
        $user_profil = $request->query('user_profil');

        if ($user_profil === 'agent tresorerie') {
            // Récupérer les factures validées par l'agent BOF
            $factures = Operateur::whereDate('created_at', $dateActuelle)
                ->where('valide_fisc', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else { if ($user_profil === 'fiscaliste') {
            // Récupérer les factures validées par l'agent BOF
            $factures = Operateur::whereDate('created_at', $dateActuelle)
                ->where('valide_compt', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else {if ($user_profil === 'agent AP') {
            // Récupérer les factures validées par l'agent BOF
            $factures = Operateur::whereDate('created_at', $dateActuelle)
                ->where('validation', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else { if ($user_profil === 'agent BOF') {
            // Récupérer toutes les factures pour l'utilisateur spécifique et la date actuelle
            $factures = Operateur::whereDate('created_at', $dateActuelle)->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else{$factures = Operateur::whereDate('created_at', $dateActuelle)
        ->where('user_id', $user_id)
        ->get();
        return response()->json(['success' => true, 'data' => $factures]);
         } }}}}

    public function getPastDateFactures()
    {
        $dateActuelle = Carbon::now()->format('Y-m-d');
        $factures = Operateur::whereDate('created_at', '<', $dateActuelle)->get();
        return response()->json(['success' => true, 'data' => $factures]);
    }
    public function show($id)
    {
        $Operateur = Operateur::findOrFail($id);
        return response()->json($Operateur);
    }
    public function store(Request $request)
    {
        $user_id = $request->query('user_id');
        // Valider les données de la requête
        $request->validate([
            'date_ordre_paiement' => 'required|date',
            'fournisseur' => 'required|string',
            'date_reception' => 'required|date',
            'objet' => 'required|string',
            'pieces_jointes' => 'required|string',
            'ordre_paiement' => 'required|string',
            'structure_ordinatrice' => 'required|string',
            'devise' => 'required|string',
            'montant' => 'required|string',
            'upload_document' => 'required|file',
        ]);

        // Enregistrer les données dans la base de données
        $operateur = new Operateur();
        $operateur->date_ordre_paiement = $request->date_ordre_paiement;
        $operateur->fournisseur = $request->fournisseur;
        $operateur->date_reception = $request->date_reception;
        $operateur->objet = $request->objet;
        $operateur->pieces_jointes = $request->pieces_jointes;
        $operateur->ordre_paiement = $request->ordre_paiement;
        $operateur->structure_ordinatrice = $request->structure_ordinatrice;
        $operateur->devise = $request->devise;
        $operateur->montant = $request->montant;
        $operateur->upload_document = $request->file('upload_document')->store('public/upload_document');
        $operateur->user_id = $request->user_id;
        $operateur->save();

        // Répondre avec un message de succès
        return response()->json(['success' => true, 'message' => 'Données enregistrées avec succès!']);
    }
    public function update(Request $request, $id)
    {
        // Valider les données de la requête
        $request->validate([
            'date_ordre_paiement' => 'required|date',
            'fournisseur' => 'required|string',
            'date_reception' => 'required|date',
            'objet' => 'required|string',
            'pieces_jointes' => 'required|string',
            'ordre_paiement' => 'required|string',
            'structure_ordinatrice' => 'required|string',
            'devise' => 'required|string',
            'montant' => 'required|string',
            'upload_document' => 'nullable|file',
        ]);

        // Trouver l'opérateur à mettre à jour
        $operateur = Operateur::findOrFail($id);

        // Mettre à jour les attributs de l'opérateur
        $operateur->date_ordre_paiement = $request->input('date_ordre_paiement');
        $operateur->fournisseur = $request->input('fournisseur');
        $operateur->date_reception = $request->input('date_reception');
        $operateur->objet = $request->input('objet');
        $operateur->pieces_jointes = $request->input('pieces_jointes');
        $operateur->ordre_paiement = $request->input('ordre_paiement');
        $operateur->structure_ordinatrice = $request->input('structure_ordinatrice');
        $operateur->devise = $request->input('devise');
        $operateur->montant = $request->input('montant');

        // Gérer le téléchargement des fichiers s'il y a un nouveau document
        if ($request->hasFile('upload_document')) {
            $uploadDocumentPath = $request->file('upload_document')->store('public/upload_document');
            $operateur->upload_document = $uploadDocumentPath;
        }

        // Sauvegarder les modifications apportées à l'opérateur
        $operateur->save();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Opérateur mis à jour avec succès!',
        ]);
    }

    /**
     * Supprime l'opérateur spécifié du stockage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Trouver l'opérateur à supprimer
        $operateur = Operateur::findOrFail($id);

        // Supprimer l'opérateur de la base de données
        $operateur->delete();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Opérateur supprimé avec succès!',
        ]);
    }
    public function countCurrentOperateurs()
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');
        
        // Compter les factures pour la date actuelle
        $count = Operateur::whereDate('created_at', $dateActuelle)->count();
        
        // Retourner le nombre de Operateurs pour la date actuelle sous forme de réponse JSON
        return response()->json(['count' => $count]);
    }
}
