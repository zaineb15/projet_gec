<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Financement;
use Carbon\Carbon;

class FinancementController extends Controller
{
    public function getCurrentDateFactures(Request $request)
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');
        $user_id = $request->query('user_id');
        $user_profil = $request->query('user_profil');

        if ($user_profil === 'agent tresorerie') {
            // Récupérer les factures validées par l'agent BOF
            $financements = Financement::whereDate('created_at', $dateActuelle)
                ->where('valide_fisc', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $financements]);
        } else { if ($user_profil === 'fiscaliste') {
            // Récupérer les factures validées par l'agent BOF
            $financements = Financement::whereDate('created_at', $dateActuelle)
                ->where('valide_compt', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $financements]);
        } else {if ($user_profil === 'agent AP') {
            // Récupérer les factures validées par l'agent BOF
            $financements = Financement::whereDate('created_at', $dateActuelle)
                ->where('validation', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $financements]);
        } else {if ($user_profil === 'agent BOF') {
            // Récupérer toutes les factures pour l'utilisateur spécifique et la date actuelle
            $financements = Financement::whereDate('created_at', $dateActuelle)->get();
    
            // Retourner les financements en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $financements]);
        } else{$financements = Financement::whereDate('created_at', $dateActuelle)
        ->where('user_id', $user_id)
        ->get();

        // Retourner les financements en tant que réponse JSON
        return response()->json(['success' => true, 'data' => $financements]);
    }}}}}

    public function getPastDateFactures()
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');

        // Récupérer les financements antérieurs à la date actuelle
        $financements = Financement::whereDate('created_at', '<', $dateActuelle)->get();

        // Retourner les financements en tant que réponse JSON
        return response()->json(['success' => true, 'data' => $financements]);
    }
    public function show($id){
        $Financement = Financement::findOrFail($id);
        return response()->json($Financement);
    }
    public function store(Request $request)
    {
        $user_id = $request->query('user_id');
        $request->validate([
            'devise' => 'required|string',
            'numPO' => 'required|string',
            'dest' => 'required|string',
            'ech' => 'required|string',
            'fncm' => 'required|string',
            'montant' => 'required|string',
            'objet' => 'required|string',
            'dateRec' => 'required|date',
            'datepo' => 'required|date',
            'file' => 'required|file|mimes:pdf,png,jpg',
        ]);

        $file = $request->file('file');
        $fileName = time().'_'.$file->getClientOriginalName();
        $filePath = $file->storeAs('uploads', $fileName);

        $financement = new Financement([
            'devise' => $request->input('devise'),
            'numPO' => $request->input('numPO'),
            'dest' => $request->input('dest'),
            'ech' => $request->input('ech'),
            'fncm' => $request->input('fncm'),
            'montant' => $request->input('montant'),
            'objet' => $request->input('objet'), // Stockez directement la chaîne JSON
            'dateRec' => $request->input('dateRec'),
            'datepo' => $request->input('datepo'),
            'file' => $filePath,
            'user_id' => $request->input('user_id'),
        ]);

        $financement->save();

        return response()->json(['success' => true, 'message' => 'Facture créée avec succès!']);
    }
    public function update(Request $request, $id)
    {
        // Valider les données de la requête
        $request->validate([
            'devise' => 'required|string',
            'numPO' => 'required|string',
            'dest' => 'required|string',
            'ech' => 'required|string',
            'fncm' => 'required|string',
            'montant' => 'required|string',
            'objet' => 'required|string',
            'dateRec' => 'required|date',
            'datepo' => 'required|date',
            'file' => 'nullable|file|mimes:pdf,png,jpg',
        ]);

        // Trouver le financement à mettre à jour
        $financement = Financement::findOrFail($id);

        // Mettre à jour les attributs du financement
        $financement->devise = $request->input('devise');
        $financement->numPO = $request->input('numPO');
        $financement->dest = $request->input('dest');
        $financement->ech = $request->input('ech');
        $financement->fncm = $request->input('fncm');
        $financement->montant = $request->input('montant');
        $financement->objet = $request->input('objet');
        $financement->dateRec = $request->input('dateRec');
        $financement->datepo = $request->input('datepo');

        // Gérer le téléchargement des fichiers si un nouveau fichier est fourni
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('uploads');
            $financement->file = $filePath;
        }

        // Sauvegarder les modifications apportées au financement
        $financement->save();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Financement mis à jour avec succès!',
        ]);
    }

    /**
     * Supprime le financement spécifié du stockage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Trouver le financement à supprimer
        $financement = Financement::findOrFail($id);

        // Supprimer le financement de la base de données
        $financement->delete();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Financement supprimé avec succès!',
        ]);
    }
    public function countCurrentFinancements()
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');
        
        // Compter les factures pour la date actuelle
        $count = Financement::whereDate('created_at', $dateActuelle)->count();
        
        // Retourner le nombre de Financements pour la date actuelle sous forme de réponse JSON
        return response()->json(['count' => $count]);
    }
}
