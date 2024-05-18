<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Devisee;
use Carbon\Carbon;

class DeviseeController extends Controller
{
    public function getCurrentDateFactures(Request $request)
    {
        $dateActuelle = Carbon::now()->format('Y-m-d');
        $user_id = $request->query('user_id');

        $user_profil = $request->query('user_profil');

        if ($user_profil === 'agent tresorerie') {
            // Récupérer les factures validées par l'agent BOF
            $factures = Devisee::whereDate('created_at', $dateActuelle)
                ->where('valide_fisc', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else { if ($user_profil === 'fiscaliste') {
            // Récupérer les factures validées par l'agent BOF
            $factures = Devisee::whereDate('created_at', $dateActuelle)
                ->where('valide_compt', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else {if ($user_profil === 'agent AP') {
            // Récupérer les factures validées par l'agent BOF
            $factures = Devisee::whereDate('created_at', $dateActuelle)
                ->where('validation', 'oui') // Seules les factures validées par l'agent BOF seront récupérées
                ->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else { if ($user_profil === 'agent BOF') {
            // Récupérer toutes les factures pour l'utilisateur spécifique et la date actuelle
            $factures = Devisee::whereDate('created_at', $dateActuelle)->get();
    
            // Retourner les factures en tant que réponse JSON
            return response()->json(['success' => true, 'data' => $factures]);
        } else{$factures = Devisee::whereDate('created_at', $dateActuelle)
        ->where('user_id', $user_id)
        ->get();
        return response()->json(['success' => true, 'data' => $factures]);
    }}}}}

    public function getPastDateFactures()
    {
        $dateActuelle = Carbon::now()->format('Y-m-d');
        $factures = Devisee::whereDate('created_at', '<', $dateActuelle)->get();
        return response()->json(['success' => true, 'data' => $factures]);
    }
    public function show($id){
        $Devisee = Devisee::findOrFail($id);
        return response()->json($Devisee);
    }
    public function store(Request $request)
    {
        $user_id = $request->query('user_id');
        $request->validate([
            'montant' => 'required|string',
            'objet' => 'required|string',
            'idFiscale' => 'required|string',
            'dateFacture' => 'required|date',
            'delaiPaiement' => 'required|string',
            'nature3wm' => 'required|string',
            'fournisseur' => 'required|string',
            'numeroFacture' => 'required|string',
            'devise' => 'required|string',
            'dateReception' => 'required|date',
            'uploadDocument' => 'required|file|mimes:pdf,png,jpg',
        ]);

        $file = $request->file('uploadDocument');
        $fileName = $file->getClientOriginalName();
        $filePath = $file->storeAs('uploads', $fileName);

        $devisee = new Devisee;
        $devisee->montant = $request->montant;
        $devisee->objet = $request->objet;
        $devisee->idFiscale = $request->idFiscale;
        $devisee->dateFacture = $request->dateFacture;
        $devisee->delaiPaiement = $request->delaiPaiement;
        $devisee->nature3wm = $request->nature3wm;
        $devisee->fournisseur = $request->fournisseur;
        $devisee->numeroFacture = $request->numeroFacture;
        $devisee->devise = $request->devise;
        $devisee->dateReception = $request->dateReception;
        $devisee->uploadDocument = $filePath;
        $devisee->user_id = $request->user_id;
        $devisee->save();

        return response()->json(['success' => true, 'message' => 'Données enregistrées avec succès!']);
    }
    public function update(Request $request, $id)
    {
        // Valider les données de la requête
        $request->validate([
            'montant' => 'required|string',
            'objet' => 'required|string',
            'idFiscale' => 'required|string',
            'dateFacture' => 'required|date',
            'delaiPaiement' => 'required|string',
            'nature3wm' => 'required|string',
            'fournisseur' => 'required|string',
            'numeroFacture' => 'required|string',
            'devise' => 'required|string',
            'dateReception' => 'required|date',
            'uploadDocument' => 'nullable|file|mimes:pdf,png,jpg',
        ]);

        // Trouver la facture devisée à mettre à jour
        $devisee = Devisee::findOrFail($id);

        // Mettre à jour les attributs de la facture devisée
        $devisee->montant = $request->input('montant');
        $devisee->objet = $request->input('objet');
        $devisee->idFiscale = $request->input('idFiscale');
        $devisee->dateFacture = $request->input('dateFacture');
        $devisee->delaiPaiement = $request->input('delaiPaiement');
        $devisee->nature3wm = $request->input('nature3wm');
        $devisee->fournisseur = $request->input('fournisseur');
        $devisee->numeroFacture = $request->input('numeroFacture');
        $devisee->devise = $request->input('devise');
        $devisee->dateReception = $request->input('dateReception');

        // Gérer le téléchargement des fichiers si un nouveau fichier est fourni
        if ($request->hasFile('uploadDocument')) {
            $filePath = $request->file('uploadDocument')->store('uploads');
            $devisee->uploadDocument = $filePath;
        }

        // Sauvegarder les modifications apportées à la facture devisée
        $devisee->save();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Facture devisée mise à jour avec succès!',
        ]);
    }

    /**
     * Supprime la facture devisée spécifiée du stockage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Trouver la facture devisée à supprimer
        $devisee = Devisee::findOrFail($id);

        // Supprimer la facture devisée de la base de données
        $devisee->delete();

        // Retourner une réponse JSON en cas de succès
        return response()->json([
            'success' => true,
            'message' => 'Facture devisée supprimée avec succès!',
        ]);
    }
    public function countCurrentDevisees()
    {
        // Récupérer la date actuelle
        $dateActuelle = Carbon::now()->format('Y-m-d');
        
        // Compter les factures pour la date actuelle
        $count = Devisee::whereDate('created_at', $dateActuelle)->count();
        
        // Retourner le nombre de Devisees pour la date actuelle sous forme de réponse JSON
        return response()->json(['count' => $count]);
    }
}
