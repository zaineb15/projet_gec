<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FondRoulement;
use Carbon\Carbon;

class FondRoulementController extends Controller
{
    public function getCurrentDateFactures(Request $request)
    {
        $dateActuelle = Carbon::now()->format('Y-m-d');
        $user_id = $request->query('user_id');
        $user_profil = $request->query('user_profil');

        if ($user_profil === 'agent tresorerie') {
            // Récupérer les factures validées par l'agent BOF
            $factures = FondRoulement::whereDate('created_at', $dateActuelle)
                ->where('valide_fisc', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else { if ($user_profil === 'fiscaliste') {
            // Récupérer les factures validées par l'agent BOF
            $factures = FondRoulement::whereDate('created_at', $dateActuelle)
                ->where('valide_compt', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else {if ($user_profil === 'agent AP') {
            // Récupérer les factures validées par l'agent BOF
            $factures = FondRoulement::whereDate('created_at', $dateActuelle)
                ->where('validation', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else { if ($user_profil === 'agent BOF') {
            // Récupérer toutes les factures pour l'utilisateur spécifique et la date actuelle
            $factures = FondRoulement::whereDate('created_at', $dateActuelle)->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else{$factures = FondRoulement::whereDate('created_at', $dateActuelle)
        ->where('user_id', $user_id)
        ->get();
        return response()->json(['success' => true, 'data' => $factures]);
    }}}}}

    public function getPastDateFactures()
    {
        $dateActuelle = Carbon::now()->format('Y-m-d');
        $factures = FondRoulement::whereDate('created_at', '<', $dateActuelle)->get();
        return response()->json(['success' => true, 'data' => $factures]);
    }
    public function show($id)
    {
        $FondRoulement = FondRoulement::findOrFail($id);
        return response()->json($FondRoulement);
    }
    public function store(Request $request)
    {
        $user_id = $request->query('user_id');
        $request->validate([
            'num_facture' => 'required|string',
            'date_facture' => 'required|date',
            'montant' => 'required|numeric',
            'devise' => 'required|string',
            'file' => 'required|file|mimes:pdf,png,jpg',
            'num_po' => 'nullable|string',
            'objet' => 'required|string',
            'pieces_jointes' => 'required|string',
        ]);

        $file = $request->file('file');
        $fileName = $file->getClientOriginalName();
        $filePath = $file->storeAs('uploads', $fileName);

        $fondRoulement = new FondRoulement;
        $fondRoulement->num_facture = $request->num_facture;
        $fondRoulement->num_po = $request->num_po;
        $fondRoulement->date_facture = $request->date_facture;
        $fondRoulement->montant = $request->montant;
        $fondRoulement->devise = $request->devise;
        $fondRoulement->file_path = $filePath;
        $fondRoulement->user_id = $request->user_id;
        $fondRoulement->save();

        return response()->json(['success' => true, 'message' => 'Fond de roulement créé avec succès']);
    }
    public function update(Request $request, $id)
    {
        // Valider les données de la requête
        $request->validate([
            'num_facture' => 'required|string',
            'date_facture' => 'required|date',
            'montant' => 'required|numeric',
            'devise' => 'required|string',
            'num_po' => 'nullable|string',
            'objet' => 'required|string',
            'pieces_jointes' => 'required|string',
        ]);

        // Trouver le fond de roulement à mettre à jour
        $fondRoulement = FondRoulement::findOrFail($id);

        // Mettre à jour les attributs du fond de roulement
        $fondRoulement->num_facture = $request->input('num_facture');
        $fondRoulement->num_po = $request->input('num_po');
        $fondRoulement->date_facture = $request->input('date_facture');
        $fondRoulement->montant = $request->input('montant');
        $fondRoulement->devise = $request->input('devise');
        $fondRoulement->objet = $request->input('objet');
        $fondRoulement->pieces_jointes = $request->input('pieces_jointes');

        // Sauvegarder les modifications apportées au fond de roulement
        $fondRoulement->save();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Fond de roulement mis à jour avec succès!',
        ]);
    }

    /**
     * Supprime le fond de roulement spécifié du stockage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Trouver le fond de roulement à supprimer
        $fondRoulement = FondRoulement::findOrFail($id);

        // Supprimer le fond de roulement de la base de données
        $fondRoulement->delete();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Fond de roulement supprimé avec succès!',
        ]);
    }
    public function countCurrentFondRoulements()
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');
        
        // Compter les factures pour la date actuelle
        $count = FondRoulement::whereDate('created_at', $dateActuelle)->count();
        
        // Retourner le nombre de FondRoulements pour la date actuelle sous forme de réponse JSON
        return response()->json(['count' => $count]);
    }
}